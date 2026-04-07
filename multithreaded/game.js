const loading = document.getElementById("loading");
const canvas = document.getElementById("canvas");
const musicChoice = document.getElementById("music-choice");

const wantMusic = await new Promise(async (resolve) => {
	const root = await navigator.storage.getDirectory();
	let hasAudio = false;
	try { await root.getFileHandle("ContentAudio.tar.cache", { create: false }); hasAudio = true; } catch {}

	if (hasAudio) {
		document.getElementById("btn-no-music").innerHTML =
			'Play without music <span class="hint">(~64 MB)</span>';
		document.getElementById("btn-with-music").innerHTML =
			'Play with music <span class="hint">(cached)</span>';
	}

	musicChoice.style.display = "";
	document.getElementById("btn-no-music").onclick = () => {
		musicChoice.style.display = "none";
		resolve(false);
	};
	document.getElementById("btn-with-music").onclick = () => {
		musicChoice.style.display = "none";
		resolve(true);
	};
});
musicChoice.style.display = "none";

async function getTar(baseName, label) {
	const root = await navigator.storage.getDirectory();
	const cacheKey = baseName + ".cache";

	try {
		const fh = await root.getFileHandle(cacheKey, { create: false });
		const file = await fh.getFile();
		loading.textContent = `Reading cached ${label}...`;
		return new Uint8Array(await file.arrayBuffer());
	} catch {}

	loading.textContent = `Downloading ${label}...`;
	const countRes = await fetch(baseName + ".count");
	const chunkCount = parseInt(await countRes.text());
	const chunks = [];
	let received = 0;

	for (let i = 0; i < chunkCount; i++) {
		const url = `${baseName}${String(i).padStart(2, "0")}`;
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
		const reader = res.body.getReader();
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
			received += value.length;
			loading.textContent = `Downloading ${label}... ${(received / 1048576) | 0} MB`;
		}
	}

	const tar = new Uint8Array(received);
	let offset = 0;
	for (const chunk of chunks) {
		tar.set(chunk, offset);
		offset += chunk.length;
	}

	loading.textContent = `Caching ${label}...`;
	const fh = await root.getFileHandle(cacheKey, { create: true });
	const writable = await fh.createWritable();
	await writable.write(tar);
	await writable.close();

	return tar;
}

async function extractTarToOPFS(tar, label) {
	const root = await navigator.storage.getDirectory();
	let pos = 0;
	let fileCount = 0;

	function readString(buf, off, len) {
		let end = off;
		while (end < off + len && buf[end] !== 0) end++;
		return new TextDecoder().decode(buf.subarray(off, end));
	}

	function readOctal(buf, off, len) {
		const s = readString(buf, off, len).trim();
		return s ? parseInt(s, 8) : 0;
	}

	async function getDir(base, parts) {
		let dir = base;
		for (const p of parts) {
			if (p) dir = await dir.getDirectoryHandle(p, { create: true });
		}
		return dir;
	}

	while (pos + 512 <= tar.length) {
		const header = tar.subarray(pos, pos + 512);
		if (header.every(b => b === 0)) break;

		const name = readString(header, 0, 100);
		const size = readOctal(header, 124, 12);
		const typeFlag = header[156];
		const prefix = readString(header, 345, 155);
		const fullName = prefix ? prefix + "/" + name : name;

		pos += 512;

		const parts = fullName.split("/").filter(Boolean);

		if (typeFlag === 53 || typeFlag === 0x35 || name.endsWith("/")) {
			await getDir(root, parts);
		} else if (typeFlag === 48 || typeFlag === 0 || typeFlag === 0x30) {
			const dirParts = parts.slice(0, -1);
			const fileName = parts[parts.length - 1];
			const dir = await getDir(root, dirParts);
			const fileHandle = await dir.getFileHandle(fileName, { create: true });
			const writable = await fileHandle.createWritable();
			await writable.write(tar.subarray(pos, pos + size));
			await writable.close();
			fileCount++;
			if (fileCount % 100 === 0) {
				loading.textContent = `Extracting ${label}... ${fileCount} files`;
			}
		}

		pos += Math.ceil(size / 512) * 512;
	}

	return fileCount;
}

async function ensureContent() {
	const root = await navigator.storage.getDirectory();
	let needsExtract = false;
	try {
		const content = await root.getDirectoryHandle("Content", { create: false });
		await content.getDirectoryHandle("Data", { create: false });
	} catch {
		needsExtract = true;
	}

	if (needsExtract) {
		const tar = await getTar("Content.tar", "game content");
		loading.textContent = "Extracting game content...";
		await extractTarToOPFS(tar, "game content");
	}

	if (wantMusic) {
		let needsAudio = false;
		try {
			const content = await root.getDirectoryHandle("Content", { create: false });
			await content.getDirectoryHandle("XACT", { create: false });
		} catch {
			needsAudio = true;
		}

		if (needsAudio) {
			const tar = await getTar("ContentAudio.tar", "music");
			loading.textContent = "Extracting music...";
			await extractTarToOPFS(tar, "music");
		}
	}

	loading.textContent = "Loading...";
}

await ensureContent();

console.log("importing dotnet.js");
const { dotnet } = await import("./_framework/dotnet.js");
console.log("dotnet imported, creating runtime");

const runtime = await dotnet
	.withModuleConfig({ canvas })
	.withConfig({ pthreadPoolInitialSize: 16 })
	.withEnvironmentVariable("MONO_SLEEP_ABORT_LIMIT", "99999")
	.withRuntimeOptions([
		`--jiterpreter-minimum-trace-hit-count=${500}`,
		`--jiterpreter-trace-monitoring-period=${100}`,
		`--jiterpreter-trace-monitoring-max-average-penalty=${150}`,
		`--jiterpreter-wasm-bytes-limit=${64 * 1024 * 1024}`,
		`--jiterpreter-table-size=${32 * 1024}`,
		"--jiterpreter-stats-enabled",
	])
	.withResourceLoader((type, _name, defaultUri, _integrity, behavior) => {
		console.log("resourceLoader:", type, _name, defaultUri, behavior);
		if (type === "dotnetwasm" && behavior === "dotnetwasm") {
			return (async () => {
				let idx = 0;
				let chunkCount = -1;
				const fetchNext = async () => {
					if (chunkCount >= 0 && idx >= chunkCount) return null;
					const res = await fetch(defaultUri + idx);
					idx++;
					if (!res.ok) return null;
					if (chunkCount < 0) {
						const total = res.headers.get("X-Chunk-Count");
						if (!total) {
							const countRes = await fetch(defaultUri.replace(/\.wasm$/, ".wasm.count"));
							chunkCount = countRes.ok ? parseInt(await countRes.text()) : -1;
						} else {
							chunkCount = parseInt(total);
						}
					}
					return res.body.getReader();
				};

				let current = await fetchNext();
				if (!current) throw new Error("failed to fetch first wasm chunk");

				const stream = new ReadableStream({
					async pull(controller) {
						const { value, done } = await current.read();
						if (done || !value) {
							current = await fetchNext();
							if (current) {
								await this.pull(controller);
							} else {
								controller.close();
							}
						} else {
							controller.enqueue(value);
						}
					},
				});

				return new Response(stream, {
					headers: { "Content-Type": "application/wasm" },
				});
			})();
		}
	})
	.create().catch(e => { console.error("create failed:", e); throw e; });

console.log("runtime created");
const config = runtime.getConfig();
const exports = await runtime.getAssemblyExports(config.mainAssemblyName);
console.log("exports loaded");

await runtime.runMain();
await exports.WasmBootstrap.PreInit();

loading.classList.add("hidden");

const dpr = window.devicePixelRatio || 1;
let w = Math.round(canvas.clientWidth * dpr);
let h = Math.round(canvas.clientHeight * dpr);
if (w === 0 || h === 0) { w = 1280; h = 720; }

await exports.WasmBootstrap.Init(w, h);

new ResizeObserver(() => {
	const dpr = window.devicePixelRatio || 1;
	const nw = Math.round(canvas.clientWidth * dpr);
	const nh = Math.round(canvas.clientHeight * dpr);
	if (nw > 0 && nh > 0) {
		try { exports.WasmBootstrap.Resize(nw, nh); } catch {}
	}
}).observe(canvas);

try { navigator.keyboard?.lock(); } catch {}
document.addEventListener("keydown", (e) => {
	if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(e.code)) {
		e.preventDefault();
	}
});

await exports.WasmBootstrap.MainLoop();
