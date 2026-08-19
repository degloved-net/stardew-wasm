const loading = document.getElementById("loading");
const canvas = document.getElementById("canvas");
const musicChoice = document.getElementById("music-choice");

// --- OPFS helpers ---
const opfs = await navigator.storage.getDirectory();
// Ask the browser not to evict the cached content or save archive under storage
// pressure. Browsers may decline, so this is deliberately best-effort.
void navigator.storage.persist?.().catch(() => false);

async function opfsHas(name) {
	try { await opfs.getFileHandle(name); return true; } catch { return false; }
}
async function opfsRead(name) {
	return new Uint8Array(await (await (await opfs.getFileHandle(name)).getFile()).arrayBuffer());
}

async function fetchChunkCount(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
	const text = (await response.text()).trim();
	if (!/^\d+$/.test(text) || Number(text) < 1)
		throw new Error(`Invalid chunk count in ${url}: ${JSON.stringify(text)}`);
	return Number(text);
}

// --- Chunked tar download ---
async function readTarChunks(base, label, writeChunk) {
	loading.textContent = `Downloading ${label}...`;
	const count = await fetchChunkCount(base + ".count");
	let total = 0;
	for (let i = 0; i < count; i++) {
		const res = await fetch(`${base}${String(i).padStart(2, "0")}`);
		if (!res.ok) throw new Error(`Failed to fetch ${res.url}: HTTP ${res.status}`);
		if (!res.body) throw new Error(`Streaming response body unavailable for ${res.url}`);
		const reader = res.body.getReader();
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			await writeChunk(value);
			total += value.length;
			loading.textContent = `Downloading ${label}... ${(total / 1048576) | 0} MB`;
		}
	}
	return total;
}

async function downloadTarToMemory(base, label) {
	const chunks = [];
	const total = await readTarChunks(base, label, (chunk) => { chunks.push(chunk); });
	const tar = new Uint8Array(total);
	let off = 0;
	for (const c of chunks) { tar.set(c, off); off += c.length; }
	return tar;
}

async function downloadAndCacheTar(base, label, key) {
	let writer;
	try {
		writer = await (await opfs.getFileHandle(key, { create: true })).createWritable();
		await readTarChunks(base, label, (chunk) => writer.write(chunk));
		loading.textContent = `Caching ${label}...`;
		await writer.close();
		return await opfsRead(key);
	} catch {
		try { await writer?.abort(); } catch {}
		// A failed OPFS write can leave a newly-created zero-byte handle. Never let
		// that masquerade as a valid cached archive on the next launch.
		try { await opfs.removeEntry(key); } catch {}
		return await downloadTarToMemory(base, label);
	}
}

async function getTar(base, label, key) {
	try {
		loading.textContent = `Loading cached ${label}...`;
		return await opfsRead(key);
	} catch {
		return await downloadAndCacheTar(base, label, key);
	}
}

// --- Music choice (skip if audio already cached) ---
const audioCached = await opfsHas("ContentAudio.tar");
const wantMusic = audioCached || await new Promise((resolve) => {
	musicChoice.style.display = "";
	document.getElementById("btn-no-music").onclick = () => { musicChoice.style.display = "none"; resolve(false); };
	document.getElementById("btn-with-music").onclick = () => { musicChoice.style.display = "none"; resolve(true); };
});
musicChoice.style.display = "none";

// --- Parallel: download tars + boot runtime ---
const contentP = getTar("Content.tar", "game content", "Content.tar");
const audioP = wantMusic ? getTar("ContentAudio.tar", "music", "ContentAudio.tar") : Promise.resolve(null);
const runtimeP = (async () => {
	const { dotnet } = await import("./_framework/dotnet.js");
	return dotnet
		.withModuleConfig({ canvas })
		.withEnvironmentVariable("MONO_SLEEP_ABORT_LIMIT", "99999")
		.withRuntimeOptions([
			`--jiterpreter-minimum-trace-hit-count=${500}`,
			`--jiterpreter-trace-monitoring-period=${100}`,
			`--jiterpreter-trace-monitoring-max-average-penalty=${150}`,
			`--jiterpreter-wasm-bytes-limit=${64 * 1024 * 1024}`,
			`--jiterpreter-table-size=${32 * 1024}`,
		])
		.withResourceLoader((type, _name, defaultUri, _integrity, behavior) => {
			if (type === "dotnetwasm" && behavior === "dotnetwasm") {
				return (async () => {
					const count = await fetchChunkCount(defaultUri + ".count");
					let idx = 0;
					const fetchNext = async () => {
						if (idx >= count) return null;
						const uri = defaultUri + idx;
						const res = await fetch(uri);
						idx++;
						if (!res.ok) throw new Error(`Failed to fetch ${uri}: HTTP ${res.status}`);
						if (!res.body) throw new Error(`Streaming response body unavailable for ${uri}`);
						return res.body.getReader();
					};
					let current = await fetchNext();
					if (!current) throw new Error("failed to fetch first wasm chunk");
					return new Response(new ReadableStream({
						async pull(controller) {
							const { value, done } = await current.read();
							if (done || !value) {
								current = await fetchNext();
								if (current) await this.pull(controller);
								else controller.close();
							} else controller.enqueue(value);
						},
					}), { headers: { "Content-Type": "application/wasm" } });
				})();
			}
		})
		.create();
})();

const [contentTar, audioTar, runtime] = await Promise.all([contentP, audioP, runtimeP]);
const exports = await runtime.getAssemblyExports(runtime.getConfig().mainAssemblyName);

// --- Validate and extract tar into WasmFS ---
// Validation is deliberately a separate first pass: a truncated/partial OPFS
// archive must never write half a farm before the parser notices corruption.
function parseTar(tar) {
	if (!(tar instanceof Uint8Array)) throw new TypeError("Tar archive isn't a Uint8Array");
	const entries = [];
	const paths = new Set();
	const decoder = new TextDecoder("utf-8", { fatal: true });
	const readString = (buf, offset, length) => {
		let end = offset;
		while (end < offset + length && buf[end] !== 0) end++;
		return decoder.decode(buf.subarray(offset, end));
	};
	const readOctal = (buf, offset, length, field) => {
		const value = readString(buf, offset, length).trim();
		if (!/^[0-7]+$/.test(value)) throw new Error(`Invalid tar ${field}: ${JSON.stringify(value)}`);
		const parsed = Number.parseInt(value, 8);
		if (!Number.isSafeInteger(parsed) || parsed < 0) throw new Error(`Tar ${field} is out of range`);
		return parsed;
	};
	let pos = 0;
	let foundEnd = false;
	while (pos + 512 <= tar.length) {
		const header = tar.subarray(pos, pos + 512);
		if (header.every((value) => value === 0)) {
			foundEnd = true;
			break;
		}

		const storedChecksum = readOctal(header, 148, 8, "checksum");
		let actualChecksum = 0;
		for (let index = 0; index < 512; index++)
			actualChecksum += index >= 148 && index < 156 ? 32 : header[index];
		if (storedChecksum !== actualChecksum)
			throw new Error(`Tar checksum mismatch at byte ${pos}`);

		const name = readString(header, 0, 100);
		const headerPrefix = readString(header, 345, 155);
		const fullName = headerPrefix ? `${headerPrefix}/${name}` : name;
		const size = readOctal(header, 124, 12, "size");
		const type = header[156];
		const isFile = type === 0 || type === 48;
		const isDirectory = type === 53;
		if (!isFile && !isDirectory) throw new Error(`Unsupported tar entry type ${type} for ${fullName}`);
		if (isDirectory && size !== 0) throw new Error(`Tar directory has data: ${fullName}`);
		if (isFile && fullName.endsWith("/")) throw new Error(`Tar file has a directory path: ${fullName}`);

		const path = fullName.endsWith("/") ? fullName.slice(0, -1) : fullName;
		const segments = path.split("/");
		if (!path || path.startsWith("/") || path.includes("\\") ||
			segments.some((segment) => !segment || segment === "." || segment === ".."))
			throw new Error(`Unsafe tar path: ${JSON.stringify(fullName)}`);
		if (paths.has(path)) throw new Error(`Duplicate tar path: ${JSON.stringify(path)}`);
		paths.add(path);

		const dataStart = pos + 512;
		const dataEnd = dataStart + size;
		const next = dataStart + Math.ceil(size / 512) * 512;
		if (!Number.isSafeInteger(next) || dataEnd > tar.length || next > tar.length)
			throw new Error(`Truncated tar entry: ${fullName}`);
		entries.push({ fullName: path, isDirectory, dataStart, dataEnd });
		pos = next;
	}
	if (!foundEnd) throw new Error("Tar archive has no complete end marker");
	for (let index = pos; index < tar.length; index++)
		if (tar[index] !== 0) throw new Error("Tar archive contains data after its end marker");
	return entries;
}

function extractTar(tar, prefix) {
	const entries = parseTar(tar);
	let count = 0;
	for (const entry of entries) {
		// Legacy full-save archives stored top-level device files under this sentinel.
		const target = entry.fullName.startsWith("__prefs__/")
			? "/libsdl/saves/" + entry.fullName.slice("__prefs__/".length)
			: prefix + entry.fullName;
		if (entry.isDirectory) {
			exports.WasmBootstrap.CreateContentDirectory(target);
		} else {
			exports.WasmBootstrap.WriteContentFile(target, tar.subarray(entry.dataStart, entry.dataEnd));
			count++;
		}
	}
	return count;
}

await runtime.runMain();
await exports.WasmBootstrap.PreInit();

// Restore saves from OPFS
try {
	const savesTar = await opfsRead("Saves.tar");
	exports.WasmBootstrap.CreateContentDirectory("/libsdl/saves/Saves");
	extractTar(savesTar, "/libsdl/saves/Saves/");
} catch (error) {
	if (error?.name !== "NotFoundError") console.error("Couldn't restore Saves.tar; archive was ignored:", error);
}
// Preferences are also persisted separately from the much larger save archive.
// Overlay them last so a slow/stale archive write can't roll back zoom, UI scale,
// language, audio, or other device settings.
try {
	const preferencesTar = await opfsRead("DevicePreferences.tar");
	extractTar(preferencesTar, "/libsdl/saves/");
} catch (error) {
	if (error?.name !== "NotFoundError") console.error("Couldn't restore DevicePreferences.tar; archive was ignored:", error);
}

loading.textContent = "Loading game files...";
extractTar(contentTar, "/libsdl/");
if (audioTar) { loading.textContent = "Loading music..."; extractTar(audioTar, "/libsdl/"); }

loading.classList.add("hidden");

const dpr = window.devicePixelRatio || 1;
const w = Math.round(canvas.clientWidth * dpr) || 1280;
const h = Math.round(canvas.clientHeight * dpr) || 720;
await exports.WasmBootstrap.Init(w, h);

new ResizeObserver(() => {
	const dpr = window.devicePixelRatio || 1;
	const nw = Math.round(canvas.clientWidth * dpr);
	const nh = Math.round(canvas.clientHeight * dpr);
	if (nw > 0 && nh > 0) try { exports.WasmBootstrap.Resize(nw, nh); } catch {}
}).observe(canvas);

try { void navigator.keyboard?.lock().catch(() => {}); } catch {}
document.addEventListener("keydown", (e) => {
	if (["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(e.code))
		e.preventDefault();
});

try {
	await exports.WasmBootstrap.MainLoop();
} catch (error) {
	// Emscripten throws this sentinel to unwind after installing its browser
	// main loop. It isn't a game failure and shouldn't surface as one.
	if (error !== "unwind" && error?.message !== "unwind") throw error;
}
