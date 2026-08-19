
var createDotnetRuntime = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(moduleArg = {}) {

var Module = moduleArg;

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise((resolve, reject) => {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
});

if (_nativeModuleLoaded) throw new Error("Native module already loaded");

_nativeModuleLoaded = true;

createDotnetRuntime = Module = moduleArg(Module);

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = true;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary;

if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.startsWith("blob:")) {
  scriptDirectory = "";
 } else {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 }
 {
  read_ = url => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
} else  {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

function intArrayFromBase64(s) {
 var decoded = atob(s);
 var bytes = new Uint8Array(decoded.length);
 for (var i = 0; i < decoded.length; ++i) {
  bytes[i] = decoded.charCodeAt(i);
 }
 return bytes;
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

var wasmMemory;

var ABORT = false;

var EXITSTATUS;

/** @type {function(*, string=)} */ function assert(condition, text) {
 if (!condition) {
  abort(text);
 }
}

var HEAP, /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /* BigInt64Array type is not correctly defined in closure
/** not-@type {!BigInt64Array} */ HEAP64, /* BigUInt64Array type is not correctly defined in closure
/** not-t@type {!BigUint64Array} */ HEAPU64, /** @type {!Float64Array} */ HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
 Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
 Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 callRuntimeCallbacks(__ATINIT__);
}

function exitRuntime() {
 ___funcs_on_exit();
 callRuntimeCallbacks(__ATEXIT__);
 runtimeExited = true;
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnExit(cb) {
 __ATEXIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 Module["monitorRunDependencies"]?.(runDependencies);
}

function removeRunDependency(id) {
 runDependencies--;
 Module["monitorRunDependencies"]?.(runDependencies);
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

/** @param {string|number=} what */ function abort(what) {
 Module["onAbort"]?.(what);
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what += ". Build with -sASSERTIONS for more info.";
 if (runtimeInitialized) {
  ___trap();
 }
 /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
 readyPromiseReject(e);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */ var isDataURI = filename => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

var wasmBinaryFile;

if (Module["locateFile"]) {
 wasmBinaryFile = "dotnet.native.wasm";
 if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
 }
} else {
 wasmBinaryFile = new URL("dotnet.native.wasm", import.meta.url).href;
}

function getBinarySync(file) {
 if (file == wasmBinaryFile && wasmBinary) {
  return new Uint8Array(wasmBinary);
 }
 if (readBinary) {
  return readBinary(file);
 }
 throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function") {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(response => {
    if (!response["ok"]) {
     throw `failed to load wasm binary file at '${binaryFile}'`;
    }
    return response["arrayBuffer"]();
   }).catch(() => getBinarySync(binaryFile));
  }
 }
 return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(receiver, reason => {
  err(`failed to asynchronously prepare wasm: ${reason}`);
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(response => {
   /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, function(reason) {
    err(`wasm streaming compile failed: ${reason}`);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 }
 return instantiateArrayBuffer(binaryFile, imports, callback);
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
  wasmExports = instance.exports;
  wasmExports = applySignatureConversions(wasmExports);
  Module["wasmExports"] = wasmExports;
  wasmMemory = wasmExports["memory"];
  updateMemoryViews();
  wasmTable = wasmExports["__indirect_function_table"];
  addOnInit(wasmExports["__wasm_call_ctors"]);
  removeRunDependency("wasm-instantiate");
  return wasmExports;
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiationResult(result) {
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err(`Module.instantiateWasm callback failed with error: ${e}`);
   readyPromiseReject(e);
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
 return {};
}

var ASM_CONSTS = {
 7067052: ($0, $1) => {
  var data = new Uint8Array(HEAPU8.buffer, $0, $1).slice();
  globalThis._stardewOpfsPendingWrites = (globalThis._stardewOpfsPendingWrites || 0) + 1;
  globalThis._stardewOpfsLastError = null;
  var prior = globalThis._stardewOpfsWriteQueue || Promise.resolve();
  var operation = prior.catch(function() {}).then(async function() {
   var root = await navigator.storage.getDirectory();
   var fh = await root.getFileHandle("Saves.tar", {
    create: true
   });
   var w = await fh.createWritable();
   await w.write(data);
   await w.close();
  });
  globalThis._stardewOpfsWriteQueue = operation.then(function() {
   globalThis._stardewOpfsPendingWrites--;
  }, function(e) {
   globalThis._stardewOpfsPendingWrites--;
   globalThis._stardewOpfsLastError = String(e && (e.stack || e.message) || e);
   console.error("Failed to persist saves:", e);
  });
 },
 7067858: ($0, $1) => {
  var data = new Uint8Array(HEAPU8.buffer, $0, $1).slice();
  globalThis._stardewOpfsPendingWrites = (globalThis._stardewOpfsPendingWrites || 0) + 1;
  globalThis._stardewOpfsLastError = null;
  var prior = globalThis._stardewOpfsWriteQueue || Promise.resolve();
  var operation = prior.catch(function() {}).then(async function() {
   var root = await navigator.storage.getDirectory();
   var fh = await root.getFileHandle("DevicePreferences.tar", {
    create: true
   });
   var w = await fh.createWritable();
   await w.write(data);
   await w.close();
  });
  globalThis._stardewOpfsWriteQueue = operation.then(function() {
   globalThis._stardewOpfsPendingWrites--;
  }, function(e) {
   globalThis._stardewOpfsPendingWrites--;
   globalThis._stardewOpfsLastError = String(e && (e.stack || e.message) || e);
   console.error("Failed to persist device preferences:", e);
  });
 },
 7068689: () => {
  if ((globalThis._stardewOpfsPendingWrites || 0) > 0) return 1;
  return globalThis._stardewOpfsLastError ? -1 : 0;
 },
 7068806: ($0, $1, $2) => {
  var filename = UTF8ToString($0);
  var data = new Uint8Array(HEAPU8.buffer, $1, $2).slice();
  var blob = new Blob([ data ], {
   type: "application/octet-stream"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
  }, 1e3);
 },
 7069208: () => {
  if (!globalThis._saveImportInput) {
   var input = document.createElement("input");
   input.type = "file";
   input.accept = ".tar";
   input.style.display = "none";
   input.addEventListener("change", function() {
    if (input.files.length > 0) {
     input.files[0].arrayBuffer().then(function(buf) {
      globalThis._importedSaveData = new Uint8Array(buf);
     });
    }
    input.value = "";
   });
   document.body.appendChild(input);
   globalThis._saveImportInput = input;
  }
  globalThis._importedSaveData = null;
  globalThis._saveImportInput.click();
 },
 7069720: () => {
  if (!globalThis._saveFolderInput) {
   var input = document.createElement("input");
   input.type = "file";
   input.setAttribute("webkitdirectory", "");
   input.style.display = "none";
   input.addEventListener("change", function() {
    if (input.files.length === 0) return;
    var files = Array.from(input.files);
    Promise.all(files.map(function(f) {
     return f.arrayBuffer().then(function(buf) {
      return {
       path: f.webkitRelativePath,
       data: new Uint8Array(buf)
      };
     });
    })).then(function(entries) {
     var parts = [];
     for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      var nameBytes = (new TextEncoder).encode(e.path);
      var header = new Uint8Array(512);
      header.set(nameBytes.subarray(0, 100));
      var mode = "0000644\0";
      for (var j = 0; j < mode.length; j++) header[100 + j] = mode.charCodeAt(j);
      var sizeStr = e.data.length.toString(8);
      var sizeField = ("00000000000" + sizeStr).slice(-11) + "\0";
      for (var j = 0; j < sizeField.length; j++) header[124 + j] = sizeField.charCodeAt(j);
      header[156] = 48;
      var magic = "ustar\0";
      for (var j = 0; j < magic.length; j++) header[257 + j] = magic.charCodeAt(j);
      header[263] = 48;
      header[264] = 48;
      for (var j = 148; j < 156; j++) header[j] = 32;
      var sum = 0;
      for (var j = 0; j < 512; j++) sum += header[j];
      var csStr = ("000000" + sum.toString(8)).slice(-6) + "\0 ";
      for (var j = 0; j < csStr.length; j++) header[148 + j] = csStr.charCodeAt(j);
      parts.push(header);
      parts.push(e.data);
      var pad = (512 - (e.data.length % 512)) % 512;
      if (pad > 0) parts.push(new Uint8Array(pad));
     }
     parts.push(new Uint8Array(1024));
     var total = 0;
     for (var i = 0; i < parts.length; i++) total += parts[i].length;
     var tar = new Uint8Array(total);
     var off = 0;
     for (var i = 0; i < parts.length; i++) {
      tar.set(parts[i], off);
      off += parts[i].length;
     }
     globalThis._importedSaveData = tar;
    });
    input.value = "";
   });
   document.body.appendChild(input);
   globalThis._saveFolderInput = input;
  }
  globalThis._importedSaveData = null;
  globalThis._saveFolderInput.click();
 },
 7071679: () => globalThis._importedSaveData ? 1 : 0,
 7071728: () => globalThis._importedSaveData ? globalThis._importedSaveData.length : 0,
 7071811: ($0, $1) => {
  var data = globalThis._importedSaveData;
  if (data) {
   var len = Math.min(data.length, $1);
   HEAPU8.set(data.subarray(0, len), $0 >>> 0);
   globalThis._importedSaveData = null;
  }
 },
 7071983: () => {
  if (typeof (AudioContext) !== "undefined") {
   return true;
  } else if (typeof (webkitAudioContext) !== "undefined") {
   return true;
  }
  return false;
 },
 7072130: () => {
  if ((typeof (navigator.mediaDevices) !== "undefined") && (typeof (navigator.mediaDevices.getUserMedia) !== "undefined")) {
   return true;
  } else if (typeof (navigator.webkitGetUserMedia) !== "undefined") {
   return true;
  }
  return false;
 },
 7072364: () => {
  var SDL3 = Module["SDL3"];
  if (typeof (SDL3.audio_playback) === "undefined") {
   SDL3.audio_playback = {};
  }
  if (typeof (SDL3.audio_recording) === "undefined") {
   SDL3.audio_recording = {};
  }
  if (!SDL3.audioContext) {
   if (typeof (AudioContext) !== "undefined") {
    SDL3.audioContext = new AudioContext;
   } else if (typeof (webkitAudioContext) !== "undefined") {
    SDL3.audioContext = new webkitAudioContext;
   }
   if (SDL3.audioContext) {
    if ((typeof navigator.userActivation) === "undefined") {
     autoResumeAudioContext(SDL3.audioContext);
    }
   }
  }
  return (SDL3.audioContext !== undefined);
 },
 7072943: () => Module["SDL3"].audioContext.sampleRate,
 7072994: ($0, $1, $2, $3) => {
  var SDL3 = Module["SDL3"];
  var have_microphone = function(stream) {
   if (SDL3.audio_recording.silenceTimer !== undefined) {
    clearInterval(SDL3.audio_recording.silenceTimer);
    SDL3.audio_recording.silenceTimer = undefined;
    SDL3.audio_recording.silenceBuffer = undefined;
   }
   SDL3.audio_recording.mediaStreamNode = SDL3.audioContext.createMediaStreamSource(stream);
   SDL3.audio_recording.scriptProcessorNode = SDL3.audioContext.createScriptProcessor($1, $0, 1);
   SDL3.audio_recording.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
    if ((SDL3 === undefined) || (SDL3.audio_recording === undefined)) {
     return;
    }
    audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
    SDL3.audio_recording.currentRecordingBuffer = audioProcessingEvent.inputBuffer;
    dynCall("ip", $2, [ $3 ]);
   };
   SDL3.audio_recording.mediaStreamNode.connect(SDL3.audio_recording.scriptProcessorNode);
   SDL3.audio_recording.scriptProcessorNode.connect(SDL3.audioContext.destination);
   SDL3.audio_recording.stream = stream;
  };
  var no_microphone = function(error) {};
  SDL3.audio_recording.silenceBuffer = SDL3.audioContext.createBuffer($0, $1, SDL3.audioContext.sampleRate);
  SDL3.audio_recording.silenceBuffer.getChannelData(0).fill(0);
  var silence_callback = function() {
   SDL3.audio_recording.currentRecordingBuffer = SDL3.audio_recording.silenceBuffer;
   dynCall("ip", $2, [ $3 ]);
  };
  SDL3.audio_recording.silenceTimer = setInterval(silence_callback, ($1 / SDL3.audioContext.sampleRate) * 1e3);
  if ((navigator.mediaDevices !== undefined) && (navigator.mediaDevices.getUserMedia !== undefined)) {
   navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
   }).then(have_microphone).catch(no_microphone);
  } else if (navigator.webkitGetUserMedia !== undefined) {
   navigator.webkitGetUserMedia({
    audio: true,
    video: false
   }, have_microphone, no_microphone);
  }
 },
 7074835: ($0, $1, $2, $3) => {
  var SDL3 = Module["SDL3"];
  SDL3.audio_playback.scriptProcessorNode = SDL3.audioContext["createScriptProcessor"]($1, 0, $0);
  SDL3.audio_playback.scriptProcessorNode["onaudioprocess"] = function(e) {
   if ((SDL3 === undefined) || (SDL3.audio_playback === undefined)) {
    return;
   }
   if (SDL3.audio_playback.silenceTimer !== undefined) {
    clearInterval(SDL3.audio_playback.silenceTimer);
    SDL3.audio_playback.silenceTimer = undefined;
    SDL3.audio_playback.silenceBuffer = undefined;
   }
   SDL3.audio_playback.currentPlaybackBuffer = e["outputBuffer"];
   dynCall("ip", $2, [ $3 ]);
  };
  SDL3.audio_playback.scriptProcessorNode["connect"](SDL3.audioContext["destination"]);
  if (SDL3.audioContext.state === "suspended") {
   SDL3.audio_playback.silenceBuffer = SDL3.audioContext.createBuffer($0, $1, SDL3.audioContext.sampleRate);
   SDL3.audio_playback.silenceBuffer.getChannelData(0).fill(0);
   var silence_callback = function() {
    if ((typeof navigator.userActivation) !== "undefined") {
     if (navigator.userActivation.hasBeenActive) {
      SDL3.audioContext.resume();
     }
    }
    SDL3.audio_playback.currentPlaybackBuffer = SDL3.audio_playback.silenceBuffer;
    dynCall("ip", $2, [ $3 ]);
    SDL3.audio_playback.currentPlaybackBuffer = undefined;
   };
   SDL3.audio_playback.silenceTimer = setInterval(silence_callback, ($1 / SDL3.audioContext.sampleRate) * 1e3);
  }
 },
 7076151: $0 => {
  var SDL3 = Module["SDL3"];
  if ($0) {
   if (SDL3.audio_recording.silenceTimer !== undefined) {
    clearInterval(SDL3.audio_recording.silenceTimer);
   }
   if (SDL3.audio_recording.stream !== undefined) {
    var tracks = SDL3.audio_recording.stream.getAudioTracks();
    for (var i = 0; i < tracks.length; i++) {
     SDL3.audio_recording.stream.removeTrack(tracks[i]);
    }
   }
   if (SDL3.audio_recording.scriptProcessorNode !== undefined) {
    SDL3.audio_recording.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {};
    SDL3.audio_recording.scriptProcessorNode.disconnect();
   }
   if (SDL3.audio_recording.mediaStreamNode !== undefined) {
    SDL3.audio_recording.mediaStreamNode.disconnect();
   }
   SDL3.audio_recording = undefined;
  } else {
   if (SDL3.audio_playback.scriptProcessorNode != undefined) {
    SDL3.audio_playback.scriptProcessorNode.disconnect();
   }
   if (SDL3.audio_playback.silenceTimer !== undefined) {
    clearInterval(SDL3.audio_playback.silenceTimer);
   }
   SDL3.audio_playback = undefined;
  }
  if ((SDL3.audioContext !== undefined) && (SDL3.audio_playback === undefined) && (SDL3.audio_recording === undefined)) {
   SDL3.audioContext.close();
   SDL3.audioContext = undefined;
  }
 },
 7077307: ($0, $1) => {
  var SDL3 = Module["SDL3"];
  var buf = SDL3.CPtrToHeap32Index($0);
  var numChannels = SDL3.audio_playback.currentPlaybackBuffer["numberOfChannels"];
  for (var c = 0; c < numChannels; ++c) {
   var channelData = SDL3.audio_playback.currentPlaybackBuffer["getChannelData"](c);
   if (channelData.length != $1) {
    throw "Web Audio playback buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
   }
   for (var j = 0; j < $1; ++j) {
    channelData[j] = HEAPF32[buf + (j * numChannels + c) >>> 0];
   }
  }
 },
 7077840: ($0, $1) => {
  var SDL3 = Module["SDL3"];
  var numChannels = SDL3.audio_recording.currentRecordingBuffer.numberOfChannels;
  for (var c = 0; c < numChannels; ++c) {
   var channelData = SDL3.audio_recording.currentRecordingBuffer.getChannelData(c);
   if (channelData.length != $1) {
    throw "Web Audio recording buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
   }
   if (numChannels == 1) {
    for (var j = 0; j < $1; ++j) {
     setValue($0 + (j * 4), channelData[j], "float");
    }
   } else {
    for (var j = 0; j < $1; ++j) {
     setValue($0 + (((j * numChannels) + c) * 4), channelData[j], "float");
    }
   }
  }
 },
 7078467: () => {
  Module["SDL3"].dummy_audio = {};
  Module["SDL3"].dummy_audio.timers = [];
  Module["SDL3"].dummy_audio.timers[0] = undefined;
  Module["SDL3"].dummy_audio.timers[1] = undefined;
 },
 7078644: ($0, $1, $2, $3, $4) => {
  var a = Module["SDL3"].dummy_audio;
  if (a.timers[$0] !== undefined) {
   clearInterval(a.timers[$0]);
  }
  a.timers[$0] = setInterval(function() {
   dynCall("vi", $3, [ $4 ]);
  }, ($1 / $2) * 1e3);
 },
 7078836: $0 => {
  var a = Module["SDL3"].dummy_audio;
  if (a.timers[$0] !== undefined) {
   clearInterval(a.timers[$0]);
  }
  a.timers[$0] = undefined;
 },
 7078967: () => {
  Module["SDL3"].camera = {};
 },
 7078999: () => (navigator.mediaDevices === undefined) ? 0 : 1,
 7079058: ($0, $1, $2, $3, $4) => {
  const device = $0;
  const w = $1;
  const h = $2;
  const framerate_numerator = $3;
  const framerate_denominator = $4;
  const outcome = Module._SDLEmscriptenCameraPermissionOutcome;
  const iterate = Module._SDLEmscriptenThreadIterate;
  const constraints = {};
  if ((w <= 0) || (h <= 0)) {
   constraints.video = true;
  } else {
   constraints.video = {};
   constraints.video.width = w;
   constraints.video.height = h;
  }
  if ((framerate_numerator > 0) && (framerate_denominator > 0)) {
   var fps = framerate_numerator / framerate_denominator;
   constraints.video.frameRate = {
    ideal: fps
   };
  }
  function grabNextCameraFrame() {
   const SDL3 = Module["SDL3"];
   if ((typeof (SDL3) === "undefined") || (typeof (SDL3.camera) === "undefined") || (typeof (SDL3.camera.stream) === "undefined")) {
    return;
   }
   const nextframems = SDL3.camera.next_frame_time;
   const now = performance.now();
   if (now >= nextframems) {
    iterate(device);
    while (SDL3.camera.next_frame_time < now) {
     SDL3.camera.next_frame_time += SDL3.camera.fpsincrms;
    }
   }
   requestAnimationFrame(grabNextCameraFrame);
  }
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
   const settings = stream.getVideoTracks()[0].getSettings();
   const actualw = settings.width;
   const actualh = settings.height;
   const actualfps = settings.frameRate;
   console.log("Camera is opened! Actual spec: (" + actualw + "x" + actualh + "), fps=" + actualfps);
   if (outcome(device, 1, actualw, actualh, actualfps)) {
    const video = document.createElement("video");
    video.width = actualw;
    video.height = actualh;
    video.style.display = "none";
    video.srcObject = stream;
    const canvas = document.createElement("canvas");
    canvas.width = actualw;
    canvas.height = actualh;
    canvas.style.display = "none";
    const ctx2d = canvas.getContext("2d");
    const SDL3 = Module["SDL3"];
    SDL3.camera.width = actualw;
    SDL3.camera.height = actualh;
    SDL3.camera.fps = actualfps;
    SDL3.camera.fpsincrms = 1e3 / actualfps;
    SDL3.camera.stream = stream;
    SDL3.camera.video = video;
    SDL3.camera.canvas = canvas;
    SDL3.camera.ctx2d = ctx2d;
    SDL3.camera.next_frame_time = performance.now();
    video.play();
    video.addEventListener("loadedmetadata", () => {
     grabNextCameraFrame();
    });
   }
  }).catch(err => {
   console.error("Tried to open camera but it threw an error! " + err.name + ": " + err.message);
   outcome(device, 0, 0, 0, 0);
  });
 },
 7081364: () => {
  const SDL3 = Module["SDL3"];
  if ((typeof (SDL3) === "undefined") || (typeof (SDL3.camera) === "undefined") || (typeof (SDL3.camera.stream) === "undefined")) {
   return;
  }
  SDL3.camera.stream.getTracks().forEach(track => track.stop());
  SDL3.camera = {};
 },
 7081615: ($0, $1, $2) => {
  const w = $0;
  const h = $1;
  const rgba = $2;
  const SDL3 = Module["SDL3"];
  if ((typeof (SDL3) === "undefined") || (typeof (SDL3.camera) === "undefined") || (typeof (SDL3.camera.ctx2d) === "undefined")) {
   return 0;
  }
  SDL3.camera.ctx2d.drawImage(SDL3.camera.video, 0, 0, w, h);
  const imgrgba = SDL3.camera.ctx2d.getImageData(0, 0, w, h).data;
  HEAPU8.set(imgrgba, rgba >>> 0);
  return 1;
 },
 7081993: () => {
  if (typeof (Module["SDL3"]) !== "undefined") {
   Module["SDL3"].camera = undefined;
  }
 },
 7082080: $0 => {
  var str = UTF8ToString($0) + "\n\n" + "Abort/Retry/Ignore/AlwaysIgnore? [ariA] :";
  var reply = window.prompt(str, "i");
  if (reply === null) {
   reply = "i";
  }
  return reply.length === 1 ? reply.charCodeAt(0) : -1;
 },
 7082295: () => {
  if (typeof (Module["SDL3"]) === "undefined") {
   Module["SDL3"] = {};
  }
  var SDL3 = Module["SDL3"];
  if (typeof (SDL3.JSVarToCPtr) === "undefined") {
   SDL3.JSVarToCPtr = function(v) {
    return v;
   };
  }
  if (typeof (SDL3.CPtrToHeap32Index) === "undefined") {
   SDL3.CPtrToHeap32Index = function(ptr) {
    return ptr >>> 2;
   };
  }
 },
 7082609: $0 => {
  let gamepads = navigator["getGamepads"]();
  if (!gamepads) {
   return 0;
  }
  let gamepad = gamepads[$0];
  if (!gamepad || !gamepad["vibrationActuator"]) {
   return 0;
  }
  return 1;
 },
 7082784: ($0, $1, $2) => {
  let gamepads = navigator["getGamepads"]();
  if (!gamepads) {
   return 0;
  }
  let gamepad = gamepads[$0];
  if (!gamepad || !gamepad["vibrationActuator"]) {
   return 0;
  }
  gamepad["vibrationActuator"]["playEffect"]("dual-rumble", {
   "startDelay": 0,
   "duration": 3e3,
   "weakMagnitude": $2 / 65535,
   "strongMagnitude": $1 / 65535
  });
  return 1;
 },
 7083120: ($0, $1, $2, $3) => {
  var w = $0;
  var h = $1;
  var pixels = $2;
  var canvasId = UTF8ToString($3);
  var canvas = document.querySelector(canvasId);
  var SDL3 = Module["SDL3"];
  if (SDL3.ctxCanvas !== canvas) {
   SDL3.ctx = Browser.createContext(canvas, false, true);
   if (!SDL3.ctx) {
    return false;
   }
   SDL3.ctxCanvas = canvas;
  }
  if (SDL3.w !== w || SDL3.h !== h || SDL3.imageCtx !== SDL3.ctx) {
   SDL3.image = SDL3.ctx.createImageData(w, h);
   SDL3.w = w;
   SDL3.h = h;
   SDL3.imageCtx = SDL3.ctx;
  }
  var data = SDL3.image.data;
  var src = pixels / 4;
  if (SDL3.data32Data !== data) {
   SDL3.data32 = new Int32Array(data.buffer);
   SDL3.data32Data = data;
  }
  var data32 = SDL3.data32;
  data32.set(HEAP32.subarray(src >>> 0, src + data32.length >>> 0));
  SDL3.ctx.putImageData(SDL3.image, 0, 0);
  return true;
 },
 7083869: () => {
  var SDL3 = Module["SDL3"];
  SDL3["mouse_x"] = 0;
  SDL3["mouse_y"] = 0;
  SDL3["mouse_buttons"] = [];
  for (var i = 0; i < 5; ++i) {
   SDL3["mouse_buttons"][i] = false;
  }
  document.addEventListener("mousemove", function(e) {
   var SDL3 = Module["SDL3"];
   SDL3["mouse_x"] = e.clientX;
   SDL3["mouse_y"] = e.clientY;
  });
  document.addEventListener("mousedown", function(e) {
   var SDL3 = Module["SDL3"];
   if (0 <= e.button && e.button < SDL3["mouse_buttons"].length) {
    SDL3["mouse_buttons"][e.button] = true;
   }
  });
  document.addEventListener("mouseup", function(e) {
   var SDL3 = Module["SDL3"];
   if (0 <= e.button && e.button < SDL3["mouse_buttons"].length) {
    SDL3["mouse_buttons"][e.button] = false;
   }
  });
 },
 7084557: ($0, $1, $2, $3, $4) => {
  var w = $0;
  var h = $1;
  var hot_x = $2;
  var hot_y = $3;
  var pixels = $4;
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  var image = ctx.createImageData(w, h);
  var data = image.data;
  var src = pixels / 4;
  var data32 = new Int32Array(data.buffer);
  data32.set(HEAP32.subarray(src >>> 0, src + data32.length >>> 0));
  ctx.putImageData(image, 0, 0);
  var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
  var urlBuf = _SDL_malloc(url.length + 1);
  stringToUTF8(url, urlBuf, url.length + 1);
  return urlBuf;
 },
 7085215: $0 => {
  if (Module["canvas"]) {
   Module["canvas"].style["cursor"] = UTF8ToString($0);
  }
 },
 7085298: () => {
  if (Module["canvas"]) {
   Module["canvas"].style["cursor"] = "none";
  }
 },
 7085367: () => Module["SDL3"]["mouse_x"],
 7085405: () => Module["SDL3"]["mouse_y"],
 7085443: $0 => Module["SDL3"]["mouse_buttons"][$0],
 7085491: $0 => {
  var data = $0;
  document.sdlEventHandlerLockKeysCheck = function(event) {
   if ((event.key != "CapsLock") && (event.key != "NumLock") && (event.key != "ScrollLock")) {
    _Emscripten_HandleLockKeysCheck(Module["SDL3"].JSVarToCPtr(data), event.getModifierState("CapsLock"), event.getModifierState("NumLock"), event.getModifierState("ScrollLock"));
   }
  };
  document.addEventListener("keydown", document.sdlEventHandlerLockKeysCheck);
 },
 7085918: () => {
  document.removeEventListener("keydown", document.sdlEventHandlerLockKeysCheck);
 },
 7086002: $0 => {
  var target = document;
  if (target) {
   target.sdlEventHandlerMouseButtonUpGlobal = function(event) {
    var SDL3 = Module["SDL3"];
    var d = SDL3.makePointerEventCStruct(0, 0, event);
    if (d != 0) {
     _Emscripten_HandleMouseButtonUpGlobal(SDL3.JSVarToCPtr($0), d);
     _SDL_free(d);
    }
   };
   target.addEventListener("pointerup", target.sdlEventHandlerMouseButtonUpGlobal);
  }
 },
 7086363: $0 => {
  var SDL3 = Module["SDL3"];
  if (SDL3.makePointerEventCStruct === undefined) {
   SDL3.makePointerEventCStruct = function(left, top, event) {
    var ptrtype = 0;
    if (event.pointerType == "mouse") {
     ptrtype = 1;
    } else if (event.pointerType == "touch") {
     ptrtype = 2;
    } else if (event.pointerType == "pen") {
     ptrtype = 3;
    } else {
     return 0;
    }
    var ptr = _SDL_malloc($0);
    if (ptr != 0) {
     var idx = SDL3.CPtrToHeap32Index(ptr);
     HEAP32[idx++ >>> 0] = ptrtype;
     HEAP32[idx++ >>> 0] = event.pointerId;
     HEAP32[idx++ >>> 0] = (typeof (event.button) !== "undefined") ? event.button : -1;
     HEAP32[idx++ >>> 0] = event.buttons;
     HEAP32[idx++ >>> 0] = (event.type == "pointerdown") ? 1 : 0;
     HEAPF32[idx++ >>> 0] = event.movementX;
     HEAPF32[idx++ >>> 0] = event.movementY;
     HEAPF32[idx++ >>> 0] = event.clientX - left;
     HEAPF32[idx++ >>> 0] = event.clientY - top;
     if (ptrtype == 3) {
      HEAPF32[idx++ >>> 0] = event.pressure;
      HEAPF32[idx++ >>> 0] = event.tangentialPressure;
      HEAPF32[idx++ >>> 0] = event.tiltX;
      HEAPF32[idx++ >>> 0] = event.tiltY;
      HEAPF32[idx++ >>> 0] = event.twist;
     }
    }
    return ptr;
   };
  }
 },
 7087355: $0 => {
  var id = UTF8ToString($0);
  try {
   var canvas = document.querySelector(id);
   if (canvas) {
    return canvas === document.activeElement;
   }
  } catch (e) {}
  return false;
 },
 7087521: () => document.hasFocus(),
 7087553: () => {
  var target = document;
  if (target) {
   target.removeEventListener("pointerup", target.sdlEventHandlerMouseButtonUpGlobal);
   target.sdlEventHandlerMouseButtonUpGlobal = undefined;
  }
 },
 7087735: () => document.body.clientWidth,
 7087773: () => document.body.clientHeight,
 7087812: () => window.innerWidth,
 7087842: () => window.innerHeight,
 7087873: () => window.outerWidth,
 7087903: () => window.outerHeight,
 7087934: () => window.pageXOffset,
 7087965: () => window.pageYOffset,
 7087996: ($0, $1) => {
  var target = document.querySelector(UTF8ToString($1));
  if (target) {
   var SDL3 = Module["SDL3"];
   var data = $0;
   target.sdlEventHandlerPointerEnter = function(event) {
    var rect = target.getBoundingClientRect();
    var d = SDL3.makePointerEventCStruct(rect.left, rect.top, event);
    if (d != 0) {
     _Emscripten_HandlePointerEnter(SDL3.JSVarToCPtr(data), d);
     _SDL_free(d);
    }
   };
   target.sdlEventHandlerPointerLeave = function(event) {
    var rect = target.getBoundingClientRect();
    var d = SDL3.makePointerEventCStruct(rect.left, rect.top, event);
    if (d != 0) {
     _Emscripten_HandlePointerLeave(SDL3.JSVarToCPtr(data), d);
     _SDL_free(d);
    }
   };
   target.sdlEventHandlerPointerGeneric = function(event) {
    var rect = target.getBoundingClientRect();
    var d = SDL3.makePointerEventCStruct(rect.left, rect.top, event);
    if (d != 0) {
     _Emscripten_HandlePointerGeneric(SDL3.JSVarToCPtr(data), d);
     _SDL_free(d);
    }
   };
   target.style.touchAction = "none";
   target.addEventListener("pointerenter", target.sdlEventHandlerPointerEnter);
   target.addEventListener("pointerleave", target.sdlEventHandlerPointerLeave);
   target.addEventListener("pointercancel", target.sdlEventHandlerPointerLeave);
   target.addEventListener("pointerdown", target.sdlEventHandlerPointerGeneric);
   target.addEventListener("pointermove", target.sdlEventHandlerPointerGeneric);
   target.addEventListener("pointerup", target.sdlEventHandlerPointerGeneric);
  }
 },
 7089384: ($0, $1, $2) => {
  var target = document.querySelector(UTF8ToString($1));
  if (target) {
   var data = $0;
   var SDL3 = Module["SDL3"];
   var makeDropEventCStruct = function(event) {
    var ptr = 0;
    ptr = _SDL_malloc($2);
    if (ptr != 0) {
     var idx = ptr >> 2;
     var rect = target.getBoundingClientRect();
     HEAP32[idx++ >>> 0] = event.clientX - rect.left;
     HEAP32[idx++ >>> 0] = event.clientY - rect.top;
    }
    return ptr;
   };
   SDL3.eventHandlerDropDragover = function(event) {
    event.preventDefault();
    var d = makeDropEventCStruct(event);
    if (d != 0) {
     _Emscripten_SendDragEvent(data, d);
     _SDL_free(d);
    }
   };
   target.addEventListener("dragover", SDL3.eventHandlerDropDragover);
   SDL3.drop_count = 0;
   try {
    FS.mkdir("/tmp/filedrop");
   } catch (e) {}
   SDL3.eventHandlerDropDrop = function(event) {
    event.preventDefault();
    if (event.dataTransfer.types.includes("text/plain")) {
     let plain_text = stringToNewUTF8(event.dataTransfer.getData("text/plain"));
     _Emscripten_SendDragTextEvent(data, plain_text);
     _Emscripten_force_free(plain_text);
    } else if (event.dataTransfer.types.includes("Files")) {
     let files_read = 0;
     const files_to_read = event.dataTransfer.files.length;
     for (let i = 0; i < files_to_read; i++) {
      const file = event.dataTransfer.files.item(i);
      const file_reader = new FileReader;
      file_reader.readAsArrayBuffer(file);
      file_reader.onload = function(event) {
       const fs_dropdir = `/tmp/filedrop/${SDL3.drop_count}`;
       SDL3.drop_count += 1;
       const fs_filepath = `${fs_dropdir}/${file.name}`;
       const c_fs_filepath = stringToNewUTF8(fs_filepath);
       const contents_array8 = new Uint8Array(event.target.result);
       try {
        FS.mkdir(fs_dropdir);
        var stream = FS.open(fs_filepath, "w");
        FS.write(stream, contents_array8, 0, contents_array8.length, 0);
        FS.close(stream);
        _Emscripten_SendDragFileEvent(data, c_fs_filepath);
       } catch (e) {}
       _Emscripten_force_free(c_fs_filepath);
       onFileRead();
      };
      file_reader.onerror = function(event) {
       onFileRead();
      };
     }
     function onFileRead() {
      ++files_read;
      if (files_read === files_to_read) {
       _Emscripten_SendDragCompleteEvent(data);
      }
     }
    }
    _Emscripten_SendDragCompleteEvent(data);
   };
   target.addEventListener("drop", SDL3.eventHandlerDropDrop);
   SDL3.eventHandlerDropDragend = function(event) {
    event.preventDefault();
    _Emscripten_SendDragCompleteEvent(data);
   };
   target.addEventListener("dragend", SDL3.eventHandlerDropDragend);
   target.addEventListener("dragleave", SDL3.eventHandlerDropDragend);
  }
 },
 7091751: $0 => {
  var target = document.querySelector(UTF8ToString($0));
  if (target) {
   var SDL3 = Module["SDL3"];
   target.removeEventListener("dragleave", SDL3.eventHandlerDropDragend);
   target.removeEventListener("dragend", SDL3.eventHandlerDropDragend);
   target.removeEventListener("drop", SDL3.eventHandlerDropDrop);
   SDL3.drop_count = undefined;
   function recursive_remove(dirpath) {
    FS.readdir(dirpath).forEach(filename => {
     const p = `${dirpath}/${filename}`;
     const p_s = FS.stat(p);
     if (FS.isFile(p_s.mode)) {
      FS.unlink(p);
     } else if (FS.isDir(p)) {
      recursive_remove(p);
     }
    });
    FS.rmdir(dirpath);
   }
   ("/tmp/filedrop");
   FS.rmdir("/tmp/filedrop");
   target.removeEventListener("dragover", SDL3.eventHandlerDropDragover);
   SDL3.eventHandlerDropDragover = undefined;
   SDL3.eventHandlerDropDrop = undefined;
   SDL3.eventHandlerDropDragend = undefined;
  }
 },
 7092581: $0 => {
  var target = document.querySelector(UTF8ToString($0));
  if (target) {
   target.removeEventListener("pointerenter", target.sdlEventHandlerPointerEnter);
   target.removeEventListener("pointerleave", target.sdlEventHandlerPointerLeave);
   target.removeEventListener("pointercancel", target.sdlEventHandlerPointerLeave);
   target.removeEventListener("pointerdown", target.sdlEventHandlerPointerGeneric);
   target.removeEventListener("pointermove", target.sdlEventHandlerPointerGeneric);
   target.removeEventListener("pointerup", target.sdlEventHandlerPointerGeneric);
   target.style.touchAction = "";
   target.sdlEventHandlerPointerEnter = undefined;
   target.sdlEventHandlerPointerLeave = undefined;
   target.sdlEventHandlerPointerGeneric = undefined;
  }
 },
 7093315: () => {
  if (!window.matchMedia) {
   return -1;
  }
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
   return 0;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
   return 1;
  }
  return -1;
 },
 7093524: () => {
  if (typeof (Module["SDL3"]) !== "undefined") {
   var SDL3 = Module["SDL3"];
   SDL3.themeChangedMatchMedia.removeEventListener("change", SDL3.eventHandlerThemeChanged);
   SDL3.themeChangedMatchMedia = undefined;
   SDL3.eventHandlerThemeChanged = undefined;
  }
 },
 7093777: () => window.innerWidth,
 7093807: () => window.innerHeight,
 7093838: $0 => {
  Module["requestFullscreen"] = function(lockPointer, resizeCanvas) {
   _requestFullscreenThroughSDL($0);
  };
 },
 7093947: ($0, $1) => {
  var pngData = HEAPU8.buffer instanceof ArrayBuffer ? HEAPU8.subarray($0 >>> 0, $0 + $1 >>> 0) : HEAPU8.slice($0, $0 + $1);
  var blob = new Blob([ pngData ], {
   type: "image/png"
  });
  var url = URL.createObjectURL(blob);
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
   link = document.createElement("link");
   link.rel = "icon";
   link.type = "image/png";
   document.head.appendChild(link);
  }
  if (link.href && link.href.startsWith("blob:")) {
   URL.revokeObjectURL(link.href);
  }
  link.href = url;
 },
 7094440: () => {
  Module["requestFullscreen"] = function(lockPointer, resizeCanvas) {};
 },
 7094514: () => window.innerWidth,
 7094544: () => window.innerHeight,
 7094575: $0 => {
  var canvas = document.querySelector(UTF8ToString($0));
  canvas.SDL3_original_position = canvas.style.position;
  canvas.SDL3_original_top = canvas.style.top;
  canvas.SDL3_original_left = canvas.style.left;
  var div = document.createElement("div");
  div.id = "SDL3_fill_document_background_elements";
  div.SDL3_canvas = canvas;
  div.SDL3_canvas_parent = canvas.parentNode;
  div.SDL3_canvas_nextsib = canvas.nextSibling;
  var children = Array.from(document.body.children);
  for (var child of children) {
   div.appendChild(child);
  }
  document.body.appendChild(div);
  div.style.display = "none";
  document.body.appendChild(canvas);
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
 },
 7095273: () => {
  var div = document.getElementById("SDL3_fill_document_background_elements");
  if (div) {
   if (div.SDL3_canvas_nextsib) {
    div.SDL3_canvas_parent.insertBefore(div.SDL3_canvas, div.SDL3_canvas_nextsib);
   } else {
    div.SDL3_canvas_parent.appendChild(div.SDL3_canvas);
   }
   while (div.firstChild) {
    document.body.insertBefore(div.firstChild, div);
   }
   div.SDL3_canvas.style.position = div.SDL3_canvas.SDL3_original_position;
   div.SDL3_canvas.style.top = div.SDL3_canvas.SDL3_original_top;
   div.SDL3_canvas.style.left = div.SDL3_canvas.SDL3_original_left;
   div.remove();
  }
 },
 7095832: () => {
  if (window.matchMedia) {
   var SDL3 = Module["SDL3"];
   SDL3.eventHandlerThemeChanged = function(event) {
    _Emscripten_SendSystemThemeChangedEvent();
   };
   SDL3.themeChangedMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");
   SDL3.themeChangedMatchMedia.addEventListener("change", SDL3.eventHandlerThemeChanged);
  }
 },
 7096154: ($0, $1, $2, $3, $4) => {
  var title = UTF8ToString($0);
  var message = UTF8ToString($1);
  var background = UTF8ToString($2);
  var color = UTF8ToString($3);
  var id = UTF8ToString($4);
  var dialog = document.createElement("dialog");
  dialog.classList.add("SDL3_messagebox");
  dialog.id = id;
  dialog.style.color = color;
  dialog.style.backgroundColor = background;
  document.body.append(dialog);
  var h1 = document.createElement("h1");
  h1.innerText = title;
  dialog.append(h1);
  var p = document.createElement("p");
  p.innerText = message;
  dialog.append(p);
  dialog.showModal();
 },
 7096695: ($0, $1, $2, $3, $4, $5, $6, $7) => {
  var dialog_id = UTF8ToString($0);
  var text = UTF8ToString($1);
  var responseId = $2;
  var clickOnReturn = $3;
  var clickOnEscape = $4;
  var border = UTF8ToString($5);
  var background = UTF8ToString($6);
  var hovered = UTF8ToString($7);
  var dialog = document.getElementById(dialog_id);
  if (!dialog) {
   return false;
  }
  var button = document.createElement("button");
  button.innerText = text;
  button.style.borderColor = border;
  button.style.backgroundColor = background;
  dialog.addEventListener("keydown", function(e) {
   if (clickOnReturn && e.key === "Enter") {
    e.preventDefault();
    button.click();
   } else if (clickOnEscape && e.key === "Escape") {
    e.preventDefault();
    button.click();
   }
  });
  dialog.addEventListener("cancel", function(e) {
   e.preventDefault();
  });
  button.onmouseenter = function(e) {
   button.style.backgroundColor = hovered;
  };
  button.onmouseleave = function(e) {
   button.style.backgroundColor = background;
  };
  button.onclick = function(e) {
   dialog.close(responseId);
  };
  dialog.append(button);
  return true;
 },
 7097704: $0 => {
  var dialog_id = UTF8ToString($0);
  var dialog = document.getElementById(dialog_id);
  if (!dialog) {
   return false;
  }
  return dialog.open;
 },
 7097842: $0 => {
  var dialog_id = UTF8ToString($0);
  var dialog = document.getElementById(dialog_id);
  if (!dialog) {
   return 0;
  }
  try {
   return parseInt(dialog.returnValue);
  } catch (e) {
   return 0;
  }
 },
 7098024: ($0, $1) => {
  alert(UTF8ToString($0) + "\n\n" + UTF8ToString($1));
 },
 7098081: ($0, $1) => {
  var SDL3 = Module["SDL3"];
  if (!SDL3 || !SDL3.audioContext) return;
  var bufSize = 0;
  if (SDL3.audio_playback && SDL3.audio_playback.scriptProcessorNode) {
   bufSize = SDL3.audio_playback.scriptProcessorNode.bufferSize;
   SDL3.audio_playback.scriptProcessorNode.disconnect();
   SDL3.audio_playback.scriptProcessorNode.onaudioprocess = null;
   if (SDL3.audio_playback.silenceTimer !== undefined) {
    clearInterval(SDL3.audio_playback.silenceTimer);
    SDL3.audio_playback.silenceTimer = undefined;
   }
  }
  bufSize = 4096;
  var channels = $0;
  var mixRate = $1;
  var ctxRate = SDL3.audioContext.sampleRate;
  var ratio = mixRate / ctxRate;
  var proc = SDL3.audioContext.createScriptProcessor(bufSize, 0, channels);
  SDL3._fwrapProc = proc;
  proc.onaudioprocess = function(e) {
   var outLen = e.outputBuffer.length;
   var srcFrames = Math.ceil(outLen * ratio);
   var ptr = Module._faudio_emscripten_mix(srcFrames);
   if (!ptr) return;
   var f32 = ptr >> 2;
   for (var c = 0; c < channels; c++) {
    var data = e.outputBuffer.getChannelData(c);
    for (var j = 0; j < outLen; j++) {
     var srcPos = j * ratio;
     var idx = srcPos | 0;
     var frac = srcPos - idx;
     var s0 = Module.HEAPF32[f32 + (idx * channels + c)];
     var s1 = (idx + 1 < srcFrames) ? Module.HEAPF32[f32 + ((idx + 1) * channels + c)] : s0;
     data[j] = s0 + frac * (s1 - s0);
    }
   }
  };
  var gain = SDL3.audioContext.createGain();
  gain.gain.value = .5;
  proc.connect(gain);
  gain.connect(SDL3.audioContext.destination);
  if (SDL3.audioContext.state === "suspended") {
   var resumeFn = function() {
    SDL3.audioContext.resume();
    document.removeEventListener("pointerdown", resumeFn);
    document.removeEventListener("keydown", resumeFn);
   };
   document.addEventListener("pointerdown", resumeFn);
   document.addEventListener("keydown", resumeFn);
  }
 },
 7099817: ($0, $1) => {
  var buf = $0;
  var buflen = $1;
  var list = undefined;
  if (navigator.languages && navigator.languages.length) {
   list = navigator.languages;
  } else {
   var oneOfThese = navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage;
   if (oneOfThese !== undefined) {
    list = [ oneOfThese ];
   }
  }
  if (list === undefined) {
   return;
  }
  var str = "";
  for (var i = 0; i < list.length; i++) {
   var item = list[i];
   if ((str.length + item.length + 1) > buflen) {
    break;
   }
   if (str.length > 0) {
    str += ",";
   }
   str += item;
  }
  str = str.replace(/-/g, "_");
  if (buflen > str.length) {
   buflen = str.length;
  }
  for (var i = 0; i < buflen; i++) {
   setValue(buf + i, str.charCodeAt(i), "i8");
  }
 },
 7100525: $0 => {
  window.open(UTF8ToString($0), "_blank");
 },
 7100565: $0 => {
  var parms = new URLSearchParams(window.location.search);
  for (const [key, value] of parms) {
   if (key.startsWith("SDL_")) {
    var ckey = stringToNewUTF8(key);
    var cvalue = stringToNewUTF8(value);
    if ((ckey != 0) && (cvalue != 0)) {
     dynCall("iiii", $0, [ ckey, cvalue, 1 ]);
    }
    _Emscripten_force_free(ckey);
    _Emscripten_force_free(cvalue);
   }
  }
 }
};

function SDL_GetEmscriptenJoystickVendor(device_index) {
 let gamepad = navigator["getGamepads"]()[device_index];
 let vendor_str = "Vendor: ";
 if (gamepad["id"]["indexOf"](vendor_str) > 0) {
  let vendor_str_index = gamepad["id"]["indexOf"](vendor_str) + vendor_str["length"];
  return parseInt(gamepad["id"]["substr"](vendor_str_index, 4), 16);
 }
 let id_split = gamepad["id"]["split"]("-");
 if (id_split["length"] > 1 && !isNaN(parseInt(id_split[0], 16))) {
  return parseInt(id_split[0], 16);
 }
 return 0;
}

function SDL_GetEmscriptenJoystickProduct(device_index) {
 let gamepad = navigator["getGamepads"]()[device_index];
 let product_str = "Product: ";
 if (gamepad["id"]["indexOf"](product_str) > 0) {
  let product_str_index = gamepad["id"]["indexOf"](product_str) + product_str["length"];
  return parseInt(gamepad["id"]["substr"](product_str_index, 4), 16);
 }
 let id_split = gamepad["id"]["split"]("-");
 if (id_split["length"] > 1 && !isNaN(parseInt(id_split[1], 16))) {
  return parseInt(id_split[1], 16);
 }
 return 0;
}

function SDL_IsEmscriptenJoystickXInput(device_index) {
 let gamepad = navigator["getGamepads"]()[device_index];
 return gamepad["id"]["toLowerCase"]()["indexOf"]("xinput") >= 0;
}

/** @constructor */ function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

var getCppExceptionTag = () =>  wasmExports["__cpp_exception"];

var getCppExceptionThrownObjectFromWebAssemblyException = ex => {
 var unwind_header = ex.getArg(getCppExceptionTag(), 0);
 return ___thrown_object_from_unwind_exception(unwind_header);
};

var decrementExceptionRefcount = ex => {
 var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
 ___cxa_decrement_exception_refcount(ptr);
};

var withStackSave = f => {
 var stack = stackSave();
 var ret = f();
 stackRestore(stack);
 return ret;
};

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

/**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */ var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 idx >>>= 0;
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode(((u0 & 31) << 6) | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
  } else {
   u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
  }
 }
 return str;
};

/**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */ var UTF8ToString = (ptr, maxBytesToRead) => {
 ptr >>>= 0;
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

var getExceptionMessageCommon = ptr => withStackSave(() => {
 var type_addr_addr = stackAlloc(4);
 var message_addr_addr = stackAlloc(4);
 ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
 var type_addr = HEAPU32[((type_addr_addr) >>> 2) >>> 0];
 var message_addr = HEAPU32[((message_addr_addr) >>> 2) >>> 0];
 var type = UTF8ToString(type_addr);
 _free(type_addr);
 var message;
 if (message_addr) {
  message = UTF8ToString(message_addr);
  _free(message_addr);
 }
 return [ type, message ];
});

var getExceptionMessage = ex => {
 var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
 return getExceptionMessageCommon(ptr);
};

Module["getExceptionMessage"] = getExceptionMessage;

/**
     * @param {number} ptr
     * @param {string} type
     */ function getValue(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return HEAP8[ptr >>> 0];

 case "i8":
  return HEAP8[ptr >>> 0];

 case "i16":
  return HEAP16[((ptr) >>> 1) >>> 0];

 case "i32":
  return HEAP32[((ptr) >>> 2) >>> 0];

 case "i64":
  return HEAP64[((ptr) >>> 3)];

 case "float":
  return HEAPF32[((ptr) >>> 2) >>> 0];

 case "double":
  return HEAPF64[((ptr) >>> 3) >>> 0];

 case "*":
  return HEAPU32[((ptr) >>> 2) >>> 0];

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

var incrementExceptionRefcount = ex => {
 var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
 ___cxa_increment_exception_refcount(ptr);
};

var noExitRuntime = Module["noExitRuntime"] || false;

/**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */ function setValue(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  HEAP8[ptr >>> 0] = value;
  break;

 case "i8":
  HEAP8[ptr >>> 0] = value;
  break;

 case "i16":
  HEAP16[((ptr) >>> 1) >>> 0] = value;
  break;

 case "i32":
  HEAP32[((ptr) >>> 2) >>> 0] = value;
  break;

 case "i64":
  HEAP64[((ptr) >>> 3)] = BigInt(value);
  break;

 case "float":
  HEAPF32[((ptr) >>> 2) >>> 0] = value;
  break;

 case "double":
  HEAPF64[((ptr) >>> 3) >>> 0] = value;
  break;

 case "*":
  HEAPU32[((ptr) >>> 2) >>> 0] = value;
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

var MAX_INT53 = 9007199254740992;

var MIN_INT53 = -9007199254740992;

var bigintToI53Checked = num => (num < MIN_INT53 || num > MAX_INT53) ? NaN : Number(num);

function ___assert_fail(condition, filename, line, func) {
 condition >>>= 0;
 filename >>>= 0;
 func >>>= 0;
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

var nowIsMonotonic = 1;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

function __gmtime_js(time, tmPtr) {
 time = bigintToI53Checked(time);
 tmPtr >>>= 0;
 var date = new Date(time * 1e3);
 HEAP32[((tmPtr) >>> 2) >>> 0] = date.getUTCSeconds();
 HEAP32[(((tmPtr) + (4)) >>> 2) >>> 0] = date.getUTCMinutes();
 HEAP32[(((tmPtr) + (8)) >>> 2) >>> 0] = date.getUTCHours();
 HEAP32[(((tmPtr) + (12)) >>> 2) >>> 0] = date.getUTCDate();
 HEAP32[(((tmPtr) + (16)) >>> 2) >>> 0] = date.getUTCMonth();
 HEAP32[(((tmPtr) + (20)) >>> 2) >>> 0] = date.getUTCFullYear() - 1900;
 HEAP32[(((tmPtr) + (24)) >>> 2) >>> 0] = date.getUTCDay();
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
 HEAP32[(((tmPtr) + (28)) >>> 2) >>> 0] = yday;
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
 var leap = isLeapYear(date.getFullYear());
 var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
 var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
 return yday;
};

function __localtime_js(time, tmPtr) {
 time = bigintToI53Checked(time);
 tmPtr >>>= 0;
 var date = new Date(time * 1e3);
 HEAP32[((tmPtr) >>> 2) >>> 0] = date.getSeconds();
 HEAP32[(((tmPtr) + (4)) >>> 2) >>> 0] = date.getMinutes();
 HEAP32[(((tmPtr) + (8)) >>> 2) >>> 0] = date.getHours();
 HEAP32[(((tmPtr) + (12)) >>> 2) >>> 0] = date.getDate();
 HEAP32[(((tmPtr) + (16)) >>> 2) >>> 0] = date.getMonth();
 HEAP32[(((tmPtr) + (20)) >>> 2) >>> 0] = date.getFullYear() - 1900;
 HEAP32[(((tmPtr) + (24)) >>> 2) >>> 0] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 HEAP32[(((tmPtr) + (28)) >>> 2) >>> 0] = yday;
 HEAP32[(((tmPtr) + (36)) >>> 2) >>> 0] = -(date.getTimezoneOffset() * 60);
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 HEAP32[(((tmPtr) + (32)) >>> 2) >>> 0] = dst;
}

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 outIdx >>>= 0;
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++ >>> 0] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++ >>> 0] = 192 | (u >> 6);
   heap[outIdx++ >>> 0] = 128 | (u & 63);
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++ >>> 0] = 224 | (u >> 12);
   heap[outIdx++ >>> 0] = 128 | ((u >> 6) & 63);
   heap[outIdx++ >>> 0] = 128 | (u & 63);
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++ >>> 0] = 240 | (u >> 18);
   heap[outIdx++ >>> 0] = 128 | ((u >> 12) & 63);
   heap[outIdx++ >>> 0] = 128 | ((u >> 6) & 63);
   heap[outIdx++ >>> 0] = 128 | (u & 63);
  }
 }
 heap[outIdx >>> 0] = 0;
 return outIdx - startIdx;
};

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);

function __tzset_js(timezone, daylight, std_name, dst_name) {
 timezone >>>= 0;
 daylight >>>= 0;
 std_name >>>= 0;
 dst_name >>>= 0;
 var currentYear = (new Date).getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 var winterOffset = winter.getTimezoneOffset();
 var summerOffset = summer.getTimezoneOffset();
 var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
 HEAPU32[((timezone) >>> 2) >>> 0] = stdTimezoneOffset * 60;
 HEAP32[((daylight) >>> 2) >>> 0] = Number(winterOffset != summerOffset);
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 if (summerOffset < winterOffset) {
  stringToUTF8(winterName, std_name, 7);
  stringToUTF8(summerName, dst_name, 7);
 } else {
  stringToUTF8(winterName, dst_name, 7);
  stringToUTF8(summerName, std_name, 7);
 }
}

function __wasmfs_copy_preloaded_file_data(index, buffer) {
 buffer >>>= 0;
 return HEAPU8.set(wasmFSPreloadedFiles[index].fileData, buffer >>> 0);
}

var wasmFSPreloadedDirs = [];

var __wasmfs_get_num_preloaded_dirs = () => wasmFSPreloadedDirs.length;

var wasmFSPreloadedFiles = [];

var wasmFSPreloadingFlushed = false;

var __wasmfs_get_num_preloaded_files = () => {
 wasmFSPreloadingFlushed = true;
 return wasmFSPreloadedFiles.length;
};

function __wasmfs_get_preloaded_child_path(index, childNameBuffer) {
 childNameBuffer >>>= 0;
 var s = wasmFSPreloadedDirs[index].childName;
 var len = lengthBytesUTF8(s) + 1;
 stringToUTF8(s, childNameBuffer, len);
}

var __wasmfs_get_preloaded_file_mode = index => wasmFSPreloadedFiles[index].mode;

function __wasmfs_get_preloaded_file_size(index) {
 return wasmFSPreloadedFiles[index].fileData.length;
}

function __wasmfs_get_preloaded_parent_path(index, parentPathBuffer) {
 parentPathBuffer >>>= 0;
 var s = wasmFSPreloadedDirs[index].parentPath;
 var len = lengthBytesUTF8(s) + 1;
 stringToUTF8(s, parentPathBuffer, len);
}

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

function __wasmfs_get_preloaded_path_name(index, fileNameBuffer) {
 fileNameBuffer >>>= 0;
 var s = wasmFSPreloadedFiles[index].pathName;
 var len = lengthBytesUTF8(s) + 1;
 stringToUTF8(s, fileNameBuffer, len);
}

function __wasmfs_jsimpl_alloc_file(backend, file) {
 backend >>>= 0;
 file >>>= 0;
 return wasmFS$backends[backend].allocFile(file);
}

function __wasmfs_jsimpl_free_file(backend, file) {
 backend >>>= 0;
 file >>>= 0;
 return wasmFS$backends[backend].freeFile(file);
}

function __wasmfs_jsimpl_get_size(backend, file) {
 backend >>>= 0;
 file >>>= 0;
 return wasmFS$backends[backend].getSize(file);
}

function __wasmfs_jsimpl_read(backend, file, buffer, length, offset) {
 backend >>>= 0;
 file >>>= 0;
 buffer >>>= 0;
 length >>>= 0;
 offset = bigintToI53Checked(offset);
 if (!wasmFS$backends[backend].read) {
  return -28;
 }
 return wasmFS$backends[backend].read(file, buffer, length, offset);
}

function __wasmfs_jsimpl_write(backend, file, buffer, length, offset) {
 backend >>>= 0;
 file >>>= 0;
 buffer >>>= 0;
 length >>>= 0;
 offset = bigintToI53Checked(offset);
 if (!wasmFS$backends[backend].write) {
  return -28;
 }
 return wasmFS$backends[backend].write(file, buffer, length, offset);
}

var FS_stdin_getChar_buffer = [];

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var FS_stdin_getChar = () => {
 if (!FS_stdin_getChar_buffer.length) {
  var result = null;
  if (typeof window != "undefined" && typeof window.prompt == "function") {
   result = window.prompt("Input: ");
   if (result !== null) {
    result += "\n";
   }
  } else if (typeof readline == "function") {
   result = readline();
   if (result !== null) {
    result += "\n";
   }
  }
  if (!result) {
   return null;
  }
  FS_stdin_getChar_buffer = intArrayFromString(result, true);
 }
 return FS_stdin_getChar_buffer.shift();
};

var __wasmfs_stdin_get_char = () => {
 var c = FS_stdin_getChar();
 if (typeof c === "number") {
  return c;
 }
 return -1;
};

var _abort = () => {
 abort("");
};

var readEmAsmArgsArray = [];

var readEmAsmArgs = (sigPtr, buf) => {
 readEmAsmArgsArray.length = 0;
 var ch;
 while (ch = HEAPU8[sigPtr++ >>> 0]) {
  var wide = (ch != 105);
  wide &= (ch != 112);
  buf += wide && (buf % 8) ? 4 : 0;
  readEmAsmArgsArray.push( ch == 112 ? HEAPU32[((buf) >>> 2) >>> 0] : ch == 106 ? HEAP64[((buf) >>> 3)] : ch == 105 ? HEAP32[((buf) >>> 2) >>> 0] : HEAPF64[((buf) >>> 3) >>> 0]);
  buf += wide ? 8 : 4;
 }
 return readEmAsmArgsArray;
};

var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
 var args = readEmAsmArgs(sigPtr, argbuf);
 return ASM_CONSTS[emAsmAddr](...args);
};

/** @suppress {duplicate } */ function _emscripten_asm_const_int_sync_on_main_thread(emAsmAddr, sigPtr, argbuf) {
 emAsmAddr >>>= 0;
 sigPtr >>>= 0;
 argbuf >>>= 0;
 return runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
}

var _emscripten_asm_const_double_sync_on_main_thread = _emscripten_asm_const_int_sync_on_main_thread;

var runEmAsmFunction = (code, sigPtr, argbuf) => {
 var args = readEmAsmArgs(sigPtr, argbuf);
 return ASM_CONSTS[code](...args);
};

function _emscripten_asm_const_int(code, sigPtr, argbuf) {
 code >>>= 0;
 sigPtr >>>= 0;
 argbuf >>>= 0;
 return runEmAsmFunction(code, sigPtr, argbuf);
}

function _emscripten_asm_const_ptr_sync_on_main_thread(emAsmAddr, sigPtr, argbuf) {
 emAsmAddr >>>= 0;
 sigPtr >>>= 0;
 argbuf >>>= 0;
 return runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
}

var runtimeKeepaliveCounter = 0;

var runtimeKeepalivePush = () => {
 runtimeKeepaliveCounter += 1;
};

var _emscripten_set_main_loop_timing = (mode, value) => {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  return 1;
 }
 if (!Browser.mainLoop.running) {
  runtimeKeepalivePush();
  Browser.mainLoop.running = true;
 }
 if (mode == 0) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
   var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
   setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
  };
  Browser.mainLoop.method = "timeout";
 } else if (mode == 1) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
   Browser.requestAnimationFrame(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "rAF";
 } else if (mode == 2) {
  if (typeof Browser.setImmediate == "undefined") {
   if (typeof setImmediate == "undefined") {
    var setImmediates = [];
    var emscriptenMainLoopMessageId = "setimmediate";
    /** @param {Event} event */ var Browser_setImmediate_messageHandler = event => {
     if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
      event.stopPropagation();
      setImmediates.shift()();
     }
    };
    addEventListener("message", Browser_setImmediate_messageHandler, true);
    Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */ (function Browser_emulated_setImmediate(func) {
     setImmediates.push(func);
     if (ENVIRONMENT_IS_WORKER) {
      if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
      Module["setImmediates"].push(func);
      postMessage({
       target: emscriptenMainLoopMessageId
      });
     } else postMessage(emscriptenMainLoopMessageId, "*");
    });
   } else {
    Browser.setImmediate = setImmediate;
   }
  }
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
   Browser.setImmediate(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "immediate";
 }
 return 0;
};

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;

var _proc_exit = code => {
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  Module["onExit"]?.(code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
};

/** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
 EXITSTATUS = status;
 if (!keepRuntimeAlive()) {
  exitRuntime();
 }
 _proc_exit(status);
};

var _exit = exitJS;

var handleException = e => {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 quit_(1, e);
};

var maybeExit = () => {
 if (runtimeExited) {
  return;
 }
 if (!keepRuntimeAlive()) {
  try {
   _exit(EXITSTATUS);
  } catch (e) {
   handleException(e);
  }
 }
};

var runtimeKeepalivePop = () => {
 runtimeKeepaliveCounter -= 1;
};

/**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */ var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
 Browser.mainLoop.func = browserIterationFunc;
 Browser.mainLoop.arg = arg;
 /** @type{number} */ var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
 function checkIsRunning() {
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
   runtimeKeepalivePop();
   maybeExit();
   return false;
  }
  return true;
 }
 Browser.mainLoop.running = false;
 Browser.mainLoop.runner = function Browser_mainLoop_runner() {
  if (ABORT) return;
  if (Browser.mainLoop.queue.length > 0) {
   var start = Date.now();
   var blocker = Browser.mainLoop.queue.shift();
   blocker.func(blocker.arg);
   if (Browser.mainLoop.remainingBlockers) {
    var remaining = Browser.mainLoop.remainingBlockers;
    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
    if (blocker.counted) {
     Browser.mainLoop.remainingBlockers = next;
    } else {
     next = next + .5;
     Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
    }
   }
   Browser.mainLoop.updateStatus();
   if (!checkIsRunning()) return;
   setTimeout(Browser.mainLoop.runner, 0);
   return;
  }
  if (!checkIsRunning()) return;
  Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
  if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
   Browser.mainLoop.scheduler();
   return;
  } else if (Browser.mainLoop.timingMode == 0) {
   Browser.mainLoop.tickStartTime = _emscripten_get_now();
  }
  Browser.mainLoop.runIter(browserIterationFunc);
  if (!checkIsRunning()) return;
  if (typeof SDL == "object") SDL.audio?.queueNewAudioData?.();
  Browser.mainLoop.scheduler();
 };
 if (!noSetTiming) {
  if (fps && fps > 0) {
   _emscripten_set_main_loop_timing(0, 1e3 / fps);
  } else {
   _emscripten_set_main_loop_timing(1, 1);
  }
  Browser.mainLoop.scheduler();
 }
 if (simulateInfiniteLoop) {
  throw "unwind";
 }
};

var callUserCallback = func => {
 if (runtimeExited || ABORT) {
  return;
 }
 try {
  func();
  maybeExit();
 } catch (e) {
  handleException(e);
 }
};

/** @param {number=} timeout */ var safeSetTimeout = (func, timeout) => {
 runtimeKeepalivePush();
 return setTimeout(() => {
  runtimeKeepalivePop();
  callUserCallback(func);
 }, timeout);
};

var warnOnce = text => {
 warnOnce.shown ||= {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
};

var preloadPlugins = Module["preloadPlugins"] || [];

var Browser = {
 mainLoop: {
  running: false,
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   callUserCallback(func);
   Module["postMainLoop"]?.();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init() {
  if (Browser.initted) return;
  Browser.initted = true;
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   if (b.size !== byteArray.length) {
    b = new Blob([ (new Uint8Array(byteArray)).buffer ], {
     type: Browser.getMimetype(name)
    });
   }
   var url = URL.createObjectURL(b);
   var img = new Image;
   img.onload = () => {
    var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement("canvas"));
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    preloadedImages[name] = canvas;
    URL.revokeObjectURL(url);
    onload?.(byteArray);
   };
   img.onerror = event => {
    err(`Image ${url} could not be decoded`);
    onerror?.();
   };
   img.src = url;
  };
  preloadPlugins.push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    preloadedAudios[name] = audio;
    onload?.(byteArray);
   }
   function fail() {
    if (done) return;
    done = true;
    preloadedAudios[name] = new Audio;
    onerror?.();
   }
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   var url = URL.createObjectURL(b);
   var audio = new Audio;
   audio.addEventListener("canplaythrough", () => finish(audio), false);
   audio.onerror = function audio_onerror(event) {
    if (done) return;
    err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
    function encode64(data) {
     var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
     var PAD = "=";
     var ret = "";
     var leftchar = 0;
     var leftbits = 0;
     for (var i = 0; i < data.length; i++) {
      leftchar = (leftchar << 8) | data[i];
      leftbits += 8;
      while (leftbits >= 6) {
       var curr = (leftchar >> (leftbits - 6)) & 63;
       leftbits -= 6;
       ret += BASE[curr];
      }
     }
     if (leftbits == 2) {
      ret += BASE[(leftchar & 3) << 4];
      ret += PAD + PAD;
     } else if (leftbits == 4) {
      ret += BASE[(leftchar & 15) << 2];
      ret += PAD;
     }
     return ret;
    }
    audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
    finish(audio);
   };
   audio.src = url;
   safeSetTimeout(() => {
    finish(audio);
   },  1e4);
  };
  preloadPlugins.push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {});
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {});
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", ev => {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: 2
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL != "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
   Browser.init();
  }
  return ctx;
 },
 destroyContext(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen(lockPointer, resizeCanvas) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   Module["onFullScreen"]?.(Browser.isFullscreen);
   Module["onFullscreen"]?.(Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
  canvasContainer.requestFullscreen();
 },
 exitFullscreen() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {});
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame(func) {
  if (typeof requestAnimationFrame == "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeSetTimeout(func, timeout) {
  return safeSetTimeout(func, timeout);
 },
 safeRequestAnimationFrame(func) {
  runtimeKeepalivePush();
  return Browser.requestAnimationFrame(() => {
   runtimeKeepalivePop();
   callUserCallback(func);
  });
 },
 getMimetype(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia(func) {
  window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  window.getUserMedia(func);
 },
 getMovementX(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseCoords(pageX, pageY) {
  var rect = Module["canvas"].getBoundingClientRect();
  var cw = Module["canvas"].width;
  var ch = Module["canvas"].height;
  var scrollX = ((typeof window.scrollX != "undefined") ? window.scrollX : window.pageXOffset);
  var scrollY = ((typeof window.scrollY != "undefined") ? window.scrollY : window.pageYOffset);
  var adjustedX = pageX - (scrollX + rect.left);
  var adjustedY = pageY - (scrollY + rect.top);
  adjustedX = adjustedX * (cw / rect.width);
  adjustedY = adjustedY * (ch / rect.height);
  return {
   x: adjustedX,
   y: adjustedY
  };
 },
 setMouseCoords(pageX, pageY) {
  const {x: x, y: y} = Browser.calculateMouseCoords(pageX, pageY);
  Browser.mouseMovementX = x - Browser.mouseX;
  Browser.mouseMovementY = y - Browser.mouseY;
  Browser.mouseX = x;
  Browser.mouseY = y;
 },
 calculateMouseEvent(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && ("mozMovementX" in event)) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   if (typeof SDL != "undefined") {
    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
   } else {
    Browser.mouseX += Browser.mouseMovementX;
    Browser.mouseY += Browser.mouseMovementY;
   }
  } else {
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     last ||= coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   Browser.setMouseCoords(event.pageX, event.pageY);
  }
 },
 resizeListeners: [],
 updateResizeListeners() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height));
 },
 setCanvasSize(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[((SDL.screen) >>> 2) >>> 0];
   flags = flags | 8388608;
   HEAP32[((SDL.screen) >>> 2) >>> 0] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[((SDL.screen) >>> 2) >>> 0];
   flags = flags & ~8388608;
   HEAP32[((SDL.screen) >>> 2) >>> 0] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if (((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode) && (typeof screen != "undefined")) {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 }
};

var _emscripten_cancel_main_loop = () => {
 Browser.mainLoop.pause();
 Browser.mainLoop.func = null;
};

var _emscripten_clear_timeout = clearTimeout;

function _emscripten_console_error(str) {
 str >>>= 0;
 console.error(UTF8ToString(str));
}

var _emscripten_date_now = () => Date.now();

function _emscripten_err(str) {
 str >>>= 0;
 return err(UTF8ToString(str));
}

var JSEvents = {
 removeAllEventListeners() {
  while (JSEvents.eventHandlers.length) {
   JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
  }
  JSEvents.deferredCalls = [];
 },
 registerRemoveEventListeners() {
  if (!JSEvents.removeEventListenersRegistered) {
   __ATEXIT__.push(JSEvents.removeAllEventListeners);
   JSEvents.removeEventListenersRegistered = true;
  }
 },
 inEventHandler: 0,
 deferredCalls: [],
 deferCall(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
 },
 removeDeferredCalls(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 },
 canPerformEventHandlerRequests() {
  if (navigator.userActivation) {
   return navigator.userActivation.isActive;
  }
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 },
 runDeferredCalls() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction(...call.argsList);
  }
 },
 eventHandlers: [],
 removeAllHandlersOnTarget: (target, eventTypeString) => {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 },
 _removeHandler(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 },
 registerOrRemoveHandler(eventHandler) {
  if (!eventHandler.target) {
   return -4;
  }
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = function(event) {
    ++JSEvents.inEventHandler;
    JSEvents.currentEventHandler = eventHandler;
    JSEvents.runDeferredCalls();
    eventHandler.handlerFunc(event);
    JSEvents.runDeferredCalls();
    --JSEvents.inEventHandler;
   };
   eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
   JSEvents.registerRemoveEventListeners();
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
  return 0;
 },
 getNodeNameForTarget(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target?.nodeName || "";
 },
 fullscreenEnabled() {
  return document.fullscreenEnabled ||  document.webkitFullscreenEnabled;
 }
};

var currentFullscreenStrategy = {};

var maybeCStringToJsString = cString => cString > 2 ? UTF8ToString(cString) : cString;

/** @type {Object} */ var specialHTMLTargets = [ 0, document, window ];

/** @suppress {duplicate } */ var findEventTarget = target => {
 target = maybeCStringToJsString(target);
 var domElement = specialHTMLTargets[target] || document.querySelector(target);
 return domElement;
};

var findCanvasEventTarget = findEventTarget;

function _emscripten_get_canvas_element_size(target, width, height) {
 target >>>= 0;
 width >>>= 0;
 height >>>= 0;
 var canvas = findCanvasEventTarget(target);
 if (!canvas) return -4;
 HEAP32[((width) >>> 2) >>> 0] = canvas.width;
 HEAP32[((height) >>> 2) >>> 0] = canvas.height;
}

var stringToUTF8OnStack = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
};

var getCanvasElementSize = target => withStackSave(() => {
 var w = stackAlloc(8);
 var h = w + 4;
 var targetInt = stringToUTF8OnStack(target.id);
 var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
 var size = [ HEAP32[((w) >>> 2) >>> 0], HEAP32[((h) >>> 2) >>> 0] ];
 return size;
});

function _emscripten_set_canvas_element_size(target, width, height) {
 target >>>= 0;
 var canvas = findCanvasEventTarget(target);
 if (!canvas) return -4;
 canvas.width = width;
 canvas.height = height;
 return 0;
}

var setCanvasElementSize = (target, width, height) => {
 if (!target.controlTransferredOffscreen) {
  target.width = width;
  target.height = height;
 } else {
  withStackSave(() => {
   var targetInt = stringToUTF8OnStack(target.id);
   _emscripten_set_canvas_element_size(targetInt, width, height);
  });
 }
};

var wasmTableMirror = [];

var wasmTable;

var getWasmTableEntry = funcPtr => {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 return func;
};

var registerRestoreOldStyle = canvas => {
 var canvasSize = getCanvasElementSize(canvas);
 var oldWidth = canvasSize[0];
 var oldHeight = canvasSize[1];
 var oldCssWidth = canvas.style.width;
 var oldCssHeight = canvas.style.height;
 var oldBackgroundColor = canvas.style.backgroundColor;
 var oldDocumentBackgroundColor = document.body.style.backgroundColor;
 var oldPaddingLeft = canvas.style.paddingLeft;
 var oldPaddingRight = canvas.style.paddingRight;
 var oldPaddingTop = canvas.style.paddingTop;
 var oldPaddingBottom = canvas.style.paddingBottom;
 var oldMarginLeft = canvas.style.marginLeft;
 var oldMarginRight = canvas.style.marginRight;
 var oldMarginTop = canvas.style.marginTop;
 var oldMarginBottom = canvas.style.marginBottom;
 var oldDocumentBodyMargin = document.body.style.margin;
 var oldDocumentOverflow = document.documentElement.style.overflow;
 var oldDocumentScroll = document.body.scroll;
 var oldImageRendering = canvas.style.imageRendering;
 function restoreOldStyle() {
  var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
   document.removeEventListener("fullscreenchange", restoreOldStyle);
   document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
   setCanvasElementSize(canvas, oldWidth, oldHeight);
   canvas.style.width = oldCssWidth;
   canvas.style.height = oldCssHeight;
   canvas.style.backgroundColor = oldBackgroundColor;
   if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = "white";
   document.body.style.backgroundColor = oldDocumentBackgroundColor;
   canvas.style.paddingLeft = oldPaddingLeft;
   canvas.style.paddingRight = oldPaddingRight;
   canvas.style.paddingTop = oldPaddingTop;
   canvas.style.paddingBottom = oldPaddingBottom;
   canvas.style.marginLeft = oldMarginLeft;
   canvas.style.marginRight = oldMarginRight;
   canvas.style.marginTop = oldMarginTop;
   canvas.style.marginBottom = oldMarginBottom;
   document.body.style.margin = oldDocumentBodyMargin;
   document.documentElement.style.overflow = oldDocumentOverflow;
   document.body.scroll = oldDocumentScroll;
   canvas.style.imageRendering = oldImageRendering;
   if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
   if (currentFullscreenStrategy.canvasResizedCallback) {
    getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
   }
  }
 }
 document.addEventListener("fullscreenchange", restoreOldStyle);
 document.addEventListener("webkitfullscreenchange", restoreOldStyle);
 return restoreOldStyle;
};

var setLetterbox = (element, topBottom, leftRight) => {
 element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
 element.style.paddingTop = element.style.paddingBottom = topBottom + "px";
};

var getBoundingClientRect = e => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
 "left": 0,
 "top": 0
};

var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
 var restoreOldStyle = registerRestoreOldStyle(target);
 var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
 var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
 var rect = getBoundingClientRect(target);
 var windowedCssWidth = rect.width;
 var windowedCssHeight = rect.height;
 var canvasSize = getCanvasElementSize(target);
 var windowedRttWidth = canvasSize[0];
 var windowedRttHeight = canvasSize[1];
 if (strategy.scaleMode == 3) {
  setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
  cssWidth = windowedCssWidth;
  cssHeight = windowedCssHeight;
 } else if (strategy.scaleMode == 2) {
  if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
   var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
   setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
   cssHeight = desiredCssHeight;
  } else {
   var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
   setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
   cssWidth = desiredCssWidth;
  }
 }
 if (!target.style.backgroundColor) target.style.backgroundColor = "black";
 if (!document.body.style.backgroundColor) document.body.style.backgroundColor = "black";
 target.style.width = cssWidth + "px";
 target.style.height = cssHeight + "px";
 if (strategy.filteringMode == 1) {
  target.style.imageRendering = "optimizeSpeed";
  target.style.imageRendering = "-moz-crisp-edges";
  target.style.imageRendering = "-o-crisp-edges";
  target.style.imageRendering = "-webkit-optimize-contrast";
  target.style.imageRendering = "optimize-contrast";
  target.style.imageRendering = "crisp-edges";
  target.style.imageRendering = "pixelated";
 }
 var dpiScale = (strategy.canvasResolutionScaleMode == 2) ? devicePixelRatio : 1;
 if (strategy.canvasResolutionScaleMode != 0) {
  var newWidth = (cssWidth * dpiScale) | 0;
  var newHeight = (cssHeight * dpiScale) | 0;
  setCanvasElementSize(target, newWidth, newHeight);
  if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
 }
 return restoreOldStyle;
};

var JSEvents_requestFullscreen = (target, strategy) => {
 if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
  JSEvents_resizeCanvasForFullscreen(target, strategy);
 }
 if (target.requestFullscreen) {
  target.requestFullscreen();
 } else if (target.webkitRequestFullscreen) {
  target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
 } else {
  return JSEvents.fullscreenEnabled() ? -3 : -1;
 }
 currentFullscreenStrategy = strategy;
 if (strategy.canvasResizedCallback) {
  getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
 }
 return 0;
};

var _emscripten_exit_fullscreen = () => {
 if (!JSEvents.fullscreenEnabled()) return -1;
 JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
 var d = specialHTMLTargets[1];
 if (d.exitFullscreen) {
  d.fullscreenElement && d.exitFullscreen();
 } else if (d.webkitExitFullscreen) {
  d.webkitFullscreenElement && d.webkitExitFullscreen();
 } else {
  return -1;
 }
 return 0;
};

var requestPointerLock = target => {
 if (target.requestPointerLock) {
  target.requestPointerLock();
 } else {
  if (document.body.requestPointerLock) {
   return -3;
  }
  return -1;
 }
 return 0;
};

var _emscripten_exit_pointerlock = () => {
 JSEvents.removeDeferredCalls(requestPointerLock);
 if (document.exitPointerLock) {
  document.exitPointerLock();
 } else {
  return -1;
 }
 return 0;
};

var __emscripten_runtime_keepalive_clear = () => {
 noExitRuntime = false;
 runtimeKeepaliveCounter = 0;
};

var _emscripten_force_exit = status => {
 __emscripten_runtime_keepalive_clear();
 _exit(status);
};

Module["_emscripten_force_exit"] = _emscripten_force_exit;

var fillBatteryEventData = (eventStruct, e) => {
 HEAPF64[((eventStruct) >>> 3) >>> 0] = e.chargingTime;
 HEAPF64[(((eventStruct) + (8)) >>> 3) >>> 0] = e.dischargingTime;
 HEAPF64[(((eventStruct) + (16)) >>> 3) >>> 0] = e.level;
 HEAP32[(((eventStruct) + (24)) >>> 2) >>> 0] = e.charging;
};

var battery = () => navigator.battery || navigator.mozBattery || navigator.webkitBattery;

function _emscripten_get_battery_status(batteryState) {
 batteryState >>>= 0;
 if (!battery()) return -1;
 fillBatteryEventData(batteryState, battery());
 return 0;
}

var _emscripten_get_device_pixel_ratio = () => devicePixelRatio;

function _emscripten_get_element_css_size(target, width, height) {
 target >>>= 0;
 width >>>= 0;
 height >>>= 0;
 target = findEventTarget(target);
 if (!target) return -4;
 var rect = getBoundingClientRect(target);
 HEAPF64[((width) >>> 3) >>> 0] = rect.width;
 HEAPF64[((height) >>> 3) >>> 0] = rect.height;
 return 0;
}

var fillFullscreenChangeEventData = eventStruct => {
 var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
 var isFullscreen = !!fullscreenElement;
 /** @suppress{checkTypes} */ HEAP32[((eventStruct) >>> 2) >>> 0] = isFullscreen;
 HEAP32[(((eventStruct) + (4)) >>> 2) >>> 0] = JSEvents.fullscreenEnabled();
 var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
 var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
 var id = reportedElement?.id || "";
 stringToUTF8(nodeName, eventStruct + 8, 128);
 stringToUTF8(id, eventStruct + 136, 128);
 HEAP32[(((eventStruct) + (264)) >>> 2) >>> 0] = reportedElement ? reportedElement.clientWidth : 0;
 HEAP32[(((eventStruct) + (268)) >>> 2) >>> 0] = reportedElement ? reportedElement.clientHeight : 0;
 HEAP32[(((eventStruct) + (272)) >>> 2) >>> 0] = screen.width;
 HEAP32[(((eventStruct) + (276)) >>> 2) >>> 0] = screen.height;
 if (isFullscreen) {
  JSEvents.previousFullscreenElement = fullscreenElement;
 }
};

function _emscripten_get_fullscreen_status(fullscreenStatus) {
 fullscreenStatus >>>= 0;
 if (!JSEvents.fullscreenEnabled()) return -1;
 fillFullscreenChangeEventData(fullscreenStatus);
 return 0;
}

var fillGamepadEventData = (eventStruct, e) => {
 HEAPF64[((eventStruct) >>> 3) >>> 0] = e.timestamp;
 for (var i = 0; i < e.axes.length; ++i) {
  HEAPF64[(((eventStruct + i * 8) + (16)) >>> 3) >>> 0] = e.axes[i];
 }
 for (var i = 0; i < e.buttons.length; ++i) {
  if (typeof e.buttons[i] == "object") {
   HEAPF64[(((eventStruct + i * 8) + (528)) >>> 3) >>> 0] = e.buttons[i].value;
  } else {
   HEAPF64[(((eventStruct + i * 8) + (528)) >>> 3) >>> 0] = e.buttons[i];
  }
 }
 for (var i = 0; i < e.buttons.length; ++i) {
  if (typeof e.buttons[i] == "object") {
   HEAP32[(((eventStruct + i * 4) + (1040)) >>> 2) >>> 0] = e.buttons[i].pressed;
  } else {
   /** @suppress {checkTypes} */ HEAP32[(((eventStruct + i * 4) + (1040)) >>> 2) >>> 0] = e.buttons[i] == 1;
  }
 }
 HEAP32[(((eventStruct) + (1296)) >>> 2) >>> 0] = e.connected;
 HEAP32[(((eventStruct) + (1300)) >>> 2) >>> 0] = e.index;
 HEAP32[(((eventStruct) + (8)) >>> 2) >>> 0] = e.axes.length;
 HEAP32[(((eventStruct) + (12)) >>> 2) >>> 0] = e.buttons.length;
 stringToUTF8(e.id, eventStruct + 1304, 64);
 stringToUTF8(e.mapping, eventStruct + 1368, 64);
};

function _emscripten_get_gamepad_status(index, gamepadState) {
 gamepadState >>>= 0;
 if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
 if (!JSEvents.lastGamepadState[index]) return -7;
 fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
 return 0;
}

var getHeapMax = () =>  4294901760;

function _emscripten_get_heap_max() {
 return getHeapMax();
}

function _emscripten_get_main_loop_timing(mode, value) {
 mode >>>= 0;
 value >>>= 0;
 if (mode) HEAP32[((mode) >>> 2) >>> 0] = Browser.mainLoop.timingMode;
 if (value) HEAP32[((value) >>> 2) >>> 0] = Browser.mainLoop.timingValue;
}

var _emscripten_get_now_res = () => 1e3;

var _emscripten_get_num_gamepads = () => JSEvents.lastGamepadState.length;

function _emscripten_get_screen_size(width, height) {
 width >>>= 0;
 height >>>= 0;
 HEAP32[((width) >>> 2) >>> 0] = screen.width;
 HEAP32[((height) >>> 2) >>> 0] = screen.height;
}

var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = ctx =>  !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = ctx => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw = ctx => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));

var getEmscriptenSupportedExtensions = ctx => {
 var supportedExtensions = [  "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance",  "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw" ];
 return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
};

var GL = {
 counter: 1,
 buffers: [],
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 shaders: [],
 vaos: [],
 contexts: [],
 offscreenCanvases: {},
 queries: [],
 samplers: [],
 transformFeedbacks: [],
 syncs: [],
 stringCache: {},
 stringiCache: {},
 unpackAlignment: 4,
 recordError: errorCode => {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: table => {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 genObject: (n, buffers, createFunction, objectTable) => {
  for (var i = 0; i < n; i++) {
   var buffer = GLctx[createFunction]();
   var id = buffer && GL.getNewId(objectTable);
   if (buffer) {
    buffer.name = id;
    objectTable[id] = buffer;
   } else {
    GL.recordError(1282);
   }
   HEAP32[(((buffers) + (i * 4)) >>> 2) >>> 0] = id;
  }
 },
 getSource: (shader, count, string, length) => {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? HEAPU32[(((length) + (i * 4)) >>> 2) >>> 0] : undefined;
   source += UTF8ToString(HEAPU32[(((string) + (i * 4)) >>> 2) >>> 0], len);
  }
  return source;
 },
 createContext: (/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  if (!canvas.getContextSafariWebGL2Fixed) {
   canvas.getContextSafariWebGL2Fixed = canvas.getContext;
   /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */ function fixedGetContext(ver, attrs) {
    var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
    return ((ver == "webgl") == (gl instanceof WebGLRenderingContext)) ? gl : null;
   }
   canvas.getContext = fixedGetContext;
  }
  var ctx = canvas.getContext("webgl2", webGLContextAttributes);
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 },
 registerContext: (ctx, webGLContextAttributes) => {
  var handle = GL.getNewId(GL.contexts);
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  return handle;
 },
 makeContextCurrent: contextHandle => {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext?.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: contextHandle => GL.contexts[contextHandle],
 deleteContext: contextHandle => {
  if (GL.currentContext === GL.contexts[contextHandle]) {
   GL.currentContext = null;
  }
  if (typeof JSEvents == "object") {
   JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  }
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
   GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  }
  GL.contexts[contextHandle] = null;
 },
 initExtensions: context => {
  context ||= GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
  webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  if (context.version >= 2) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
  }
  if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  }
  webgl_enable_WEBGL_multi_draw(GLctx);
  getEmscriptenSupportedExtensions(GLctx).forEach(ext => {
   if (!ext.includes("lose_context") && !ext.includes("debug")) {
    GLctx.getExtension(ext);
   }
  });
 }
};

/** @suppress {duplicate } */ var _glActiveTexture = x0 => GLctx.activeTexture(x0);

var _emscripten_glActiveTexture = _glActiveTexture;

/** @suppress {duplicate } */ var _glAttachShader = (program, shader) => {
 GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glAttachShader = _glAttachShader;

/** @suppress {duplicate } */ var _glBeginQuery = (target, id) => {
 GLctx.beginQuery(target, GL.queries[id]);
};

var _emscripten_glBeginQuery = _glBeginQuery;

/** @suppress {duplicate } */ var _glBeginQueryEXT = (target, id) => {
 GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
};

var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;

/** @suppress {duplicate } */ var _glBeginTransformFeedback = x0 => GLctx.beginTransformFeedback(x0);

var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;

/** @suppress {duplicate } */ function _glBindAttribLocation(program, index, name) {
 name >>>= 0;
 GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
}

var _emscripten_glBindAttribLocation = _glBindAttribLocation;

/** @suppress {duplicate } */ var _glBindBuffer = (target, buffer) => {
 if (target == 35051) /*GL_PIXEL_PACK_BUFFER*/ {
  GLctx.currentPixelPackBufferBinding = buffer;
 } else if (target == 35052) /*GL_PIXEL_UNPACK_BUFFER*/ {
  GLctx.currentPixelUnpackBufferBinding = buffer;
 }
 GLctx.bindBuffer(target, GL.buffers[buffer]);
};

var _emscripten_glBindBuffer = _glBindBuffer;

/** @suppress {duplicate } */ var _glBindBufferBase = (target, index, buffer) => {
 GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
};

var _emscripten_glBindBufferBase = _glBindBufferBase;

/** @suppress {duplicate } */ function _glBindBufferRange(target, index, buffer, offset, ptrsize) {
 offset >>>= 0;
 ptrsize >>>= 0;
 GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
}

var _emscripten_glBindBufferRange = _glBindBufferRange;

/** @suppress {duplicate } */ var _glBindFramebuffer = (target, framebuffer) => {
 GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
};

var _emscripten_glBindFramebuffer = _glBindFramebuffer;

/** @suppress {duplicate } */ var _glBindRenderbuffer = (target, renderbuffer) => {
 GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;

/** @suppress {duplicate } */ var _glBindSampler = (unit, sampler) => {
 GLctx.bindSampler(unit, GL.samplers[sampler]);
};

var _emscripten_glBindSampler = _glBindSampler;

/** @suppress {duplicate } */ var _glBindTexture = (target, texture) => {
 GLctx.bindTexture(target, GL.textures[texture]);
};

var _emscripten_glBindTexture = _glBindTexture;

/** @suppress {duplicate } */ var _glBindTransformFeedback = (target, id) => {
 GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
};

var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;

/** @suppress {duplicate } */ var _glBindVertexArray = vao => {
 GLctx.bindVertexArray(GL.vaos[vao]);
};

var _emscripten_glBindVertexArray = _glBindVertexArray;

/** @suppress {duplicate } */ var _glBindVertexArrayOES = _glBindVertexArray;

var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;

/** @suppress {duplicate } */ var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

var _emscripten_glBlendColor = _glBlendColor;

/** @suppress {duplicate } */ var _glBlendEquation = x0 => GLctx.blendEquation(x0);

var _emscripten_glBlendEquation = _glBlendEquation;

/** @suppress {duplicate } */ var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;

/** @suppress {duplicate } */ var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);

var _emscripten_glBlendFunc = _glBlendFunc;

/** @suppress {duplicate } */ var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;

/** @suppress {duplicate } */ var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;

/** @suppress {duplicate } */ function _glBufferData(target, size, data, usage) {
 size >>>= 0;
 data >>>= 0;
 GLctx.bufferData(target, data ? HEAPU8.subarray(data >>> 0, data + size >>> 0) : size, usage);
}

var _emscripten_glBufferData = _glBufferData;

/** @suppress {duplicate } */ function _glBufferSubData(target, offset, size, data) {
 offset >>>= 0;
 size >>>= 0;
 data >>>= 0;
 GLctx.bufferSubData(target, offset, HEAPU8.subarray(data >>> 0, data + size >>> 0));
}

var _emscripten_glBufferSubData = _glBufferSubData;

/** @suppress {duplicate } */ var _glCheckFramebufferStatus = x0 => GLctx.checkFramebufferStatus(x0);

var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;

/** @suppress {duplicate } */ var _glClear = x0 => GLctx.clear(x0);

var _emscripten_glClear = _glClear;

/** @suppress {duplicate } */ var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);

var _emscripten_glClearBufferfi = _glClearBufferfi;

/** @suppress {duplicate } */ function _glClearBufferfv(buffer, drawbuffer, value) {
 value >>>= 0;
 GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value) >>> 2));
}

var _emscripten_glClearBufferfv = _glClearBufferfv;

/** @suppress {duplicate } */ function _glClearBufferiv(buffer, drawbuffer, value) {
 value >>>= 0;
 GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value) >>> 2));
}

var _emscripten_glClearBufferiv = _glClearBufferiv;

/** @suppress {duplicate } */ function _glClearBufferuiv(buffer, drawbuffer, value) {
 value >>>= 0;
 GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, ((value) >>> 2));
}

var _emscripten_glClearBufferuiv = _glClearBufferuiv;

/** @suppress {duplicate } */ var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);

var _emscripten_glClearColor = _glClearColor;

/** @suppress {duplicate } */ var _glClearDepthf = x0 => GLctx.clearDepth(x0);

var _emscripten_glClearDepthf = _glClearDepthf;

/** @suppress {duplicate } */ var _glClearStencil = x0 => GLctx.clearStencil(x0);

var _emscripten_glClearStencil = _glClearStencil;

/** @suppress {duplicate } */ function _glClientWaitSync(sync, flags, timeout) {
 sync >>>= 0;
 timeout = Number(timeout);
 return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
}

var _emscripten_glClientWaitSync = _glClientWaitSync;

/** @suppress {duplicate } */ var _glColorMask = (red, green, blue, alpha) => {
 GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};

var _emscripten_glColorMask = _glColorMask;

/** @suppress {duplicate } */ var _glCompileShader = shader => {
 GLctx.compileShader(GL.shaders[shader]);
};

var _emscripten_glCompileShader = _glCompileShader;

/** @suppress {duplicate } */ function _glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
 data >>>= 0;
 if (true) {
  if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
   GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
   return;
  }
 }
 GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, data ? HEAPU8.subarray((data) >>> 0, data + imageSize >>> 0) : null);
}

var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;

/** @suppress {duplicate } */ function _glCompressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data) {
 data >>>= 0;
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
 } else {
  GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
 }
}

var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;

/** @suppress {duplicate } */ function _glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data) {
 data >>>= 0;
 if (true) {
  if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
   GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
   return;
  }
 }
 GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, data ? HEAPU8.subarray((data) >>> 0, data + imageSize >>> 0) : null);
}

var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;

/** @suppress {duplicate } */ function _glCompressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) {
 data >>>= 0;
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
 } else {
  GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize);
 }
}

var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;

/** @suppress {duplicate } */ function _glCopyBufferSubData(x0, x1, x2, x3, x4) {
 x2 >>>= 0;
 x3 >>>= 0;
 x4 >>>= 0;
 return GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
}

var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;

/** @suppress {duplicate } */ var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);

var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;

/** @suppress {duplicate } */ var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);

var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;

/** @suppress {duplicate } */ var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);

var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;

/** @suppress {duplicate } */ var _glCreateProgram = () => {
 var id = GL.getNewId(GL.programs);
 var program = GLctx.createProgram();
 program.name = id;
 program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
 program.uniformIdCounter = 1;
 GL.programs[id] = program;
 return id;
};

var _emscripten_glCreateProgram = _glCreateProgram;

/** @suppress {duplicate } */ var _glCreateShader = shaderType => {
 var id = GL.getNewId(GL.shaders);
 GL.shaders[id] = GLctx.createShader(shaderType);
 return id;
};

var _emscripten_glCreateShader = _glCreateShader;

/** @suppress {duplicate } */ var _glCullFace = x0 => GLctx.cullFace(x0);

var _emscripten_glCullFace = _glCullFace;

/** @suppress {duplicate } */ function _glDeleteBuffers(n, buffers) {
 buffers >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((buffers) + (i * 4)) >>> 2) >>> 0];
  var buffer = GL.buffers[id];
  if (!buffer) continue;
  GLctx.deleteBuffer(buffer);
  buffer.name = 0;
  GL.buffers[id] = null;
  if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
  if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
 }
}

var _emscripten_glDeleteBuffers = _glDeleteBuffers;

/** @suppress {duplicate } */ function _glDeleteFramebuffers(n, framebuffers) {
 framebuffers >>>= 0;
 for (var i = 0; i < n; ++i) {
  var id = HEAP32[(((framebuffers) + (i * 4)) >>> 2) >>> 0];
  var framebuffer = GL.framebuffers[id];
  if (!framebuffer) continue;
  GLctx.deleteFramebuffer(framebuffer);
  framebuffer.name = 0;
  GL.framebuffers[id] = null;
 }
}

var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;

/** @suppress {duplicate } */ var _glDeleteProgram = id => {
 if (!id) return;
 var program = GL.programs[id];
 if (!program) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteProgram(program);
 program.name = 0;
 GL.programs[id] = null;
};

var _emscripten_glDeleteProgram = _glDeleteProgram;

/** @suppress {duplicate } */ function _glDeleteQueries(n, ids) {
 ids >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0];
  var query = GL.queries[id];
  if (!query) continue;
  GLctx.deleteQuery(query);
  GL.queries[id] = null;
 }
}

var _emscripten_glDeleteQueries = _glDeleteQueries;

/** @suppress {duplicate } */ function _glDeleteQueriesEXT(n, ids) {
 ids >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0];
  var query = GL.queries[id];
  if (!query) continue;
  GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
  GL.queries[id] = null;
 }
}

var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;

/** @suppress {duplicate } */ function _glDeleteRenderbuffers(n, renderbuffers) {
 renderbuffers >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((renderbuffers) + (i * 4)) >>> 2) >>> 0];
  var renderbuffer = GL.renderbuffers[id];
  if (!renderbuffer) continue;
  GLctx.deleteRenderbuffer(renderbuffer);
  renderbuffer.name = 0;
  GL.renderbuffers[id] = null;
 }
}

var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;

/** @suppress {duplicate } */ function _glDeleteSamplers(n, samplers) {
 samplers >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((samplers) + (i * 4)) >>> 2) >>> 0];
  var sampler = GL.samplers[id];
  if (!sampler) continue;
  GLctx.deleteSampler(sampler);
  sampler.name = 0;
  GL.samplers[id] = null;
 }
}

var _emscripten_glDeleteSamplers = _glDeleteSamplers;

/** @suppress {duplicate } */ var _glDeleteShader = id => {
 if (!id) return;
 var shader = GL.shaders[id];
 if (!shader) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteShader(shader);
 GL.shaders[id] = null;
};

var _emscripten_glDeleteShader = _glDeleteShader;

/** @suppress {duplicate } */ function _glDeleteSync(id) {
 id >>>= 0;
 if (!id) return;
 var sync = GL.syncs[id];
 if (!sync) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteSync(sync);
 sync.name = 0;
 GL.syncs[id] = null;
}

var _emscripten_glDeleteSync = _glDeleteSync;

/** @suppress {duplicate } */ function _glDeleteTextures(n, textures) {
 textures >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((textures) + (i * 4)) >>> 2) >>> 0];
  var texture = GL.textures[id];
  if (!texture) continue;
  GLctx.deleteTexture(texture);
  texture.name = 0;
  GL.textures[id] = null;
 }
}

var _emscripten_glDeleteTextures = _glDeleteTextures;

/** @suppress {duplicate } */ function _glDeleteTransformFeedbacks(n, ids) {
 ids >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0];
  var transformFeedback = GL.transformFeedbacks[id];
  if (!transformFeedback) continue;
  GLctx.deleteTransformFeedback(transformFeedback);
  transformFeedback.name = 0;
  GL.transformFeedbacks[id] = null;
 }
}

var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;

/** @suppress {duplicate } */ function _glDeleteVertexArrays(n, vaos) {
 vaos >>>= 0;
 for (var i = 0; i < n; i++) {
  var id = HEAP32[(((vaos) + (i * 4)) >>> 2) >>> 0];
  GLctx.deleteVertexArray(GL.vaos[id]);
  GL.vaos[id] = null;
 }
}

var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;

/** @suppress {duplicate } */ var _glDeleteVertexArraysOES = _glDeleteVertexArrays;

var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;

/** @suppress {duplicate } */ var _glDepthFunc = x0 => GLctx.depthFunc(x0);

var _emscripten_glDepthFunc = _glDepthFunc;

/** @suppress {duplicate } */ var _glDepthMask = flag => {
 GLctx.depthMask(!!flag);
};

var _emscripten_glDepthMask = _glDepthMask;

/** @suppress {duplicate } */ var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);

var _emscripten_glDepthRangef = _glDepthRangef;

/** @suppress {duplicate } */ var _glDetachShader = (program, shader) => {
 GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glDetachShader = _glDetachShader;

/** @suppress {duplicate } */ var _glDisable = x0 => GLctx.disable(x0);

var _emscripten_glDisable = _glDisable;

/** @suppress {duplicate } */ var _glDisableVertexAttribArray = index => {
 GLctx.disableVertexAttribArray(index);
};

var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;

/** @suppress {duplicate } */ var _glDrawArrays = (mode, first, count) => {
 GLctx.drawArrays(mode, first, count);
};

var _emscripten_glDrawArrays = _glDrawArrays;

/** @suppress {duplicate } */ var _glDrawArraysInstanced = (mode, first, count, primcount) => {
 GLctx.drawArraysInstanced(mode, first, count, primcount);
};

var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;

/** @suppress {duplicate } */ var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;

/** @suppress {duplicate } */ var _glDrawArraysInstancedARB = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedARB = _glDrawArraysInstancedARB;

/** @suppress {duplicate } */ var _glDrawArraysInstancedEXT = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedEXT = _glDrawArraysInstancedEXT;

/** @suppress {duplicate } */ var _glDrawArraysInstancedNV = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedNV = _glDrawArraysInstancedNV;

var tempFixedLengthArray = [];

/** @suppress {duplicate } */ function _glDrawBuffers(n, bufs) {
 bufs >>>= 0;
 var bufArray = tempFixedLengthArray[n];
 for (var i = 0; i < n; i++) {
  bufArray[i] = HEAP32[(((bufs) + (i * 4)) >>> 2) >>> 0];
 }
 GLctx.drawBuffers(bufArray);
}

var _emscripten_glDrawBuffers = _glDrawBuffers;

/** @suppress {duplicate } */ var _glDrawBuffersEXT = _glDrawBuffers;

var _emscripten_glDrawBuffersEXT = _glDrawBuffersEXT;

/** @suppress {duplicate } */ var _glDrawBuffersWEBGL = _glDrawBuffers;

var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;

/** @suppress {duplicate } */ function _glDrawElements(mode, count, type, indices) {
 indices >>>= 0;
 GLctx.drawElements(mode, count, type, indices);
}

var _emscripten_glDrawElements = _glDrawElements;

/** @suppress {duplicate } */ function _glDrawElementsInstanced(mode, count, type, indices, primcount) {
 indices >>>= 0;
 GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
}

var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;

/** @suppress {duplicate } */ var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;

/** @suppress {duplicate } */ var _glDrawElementsInstancedARB = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedARB = _glDrawElementsInstancedARB;

/** @suppress {duplicate } */ var _glDrawElementsInstancedEXT = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedEXT = _glDrawElementsInstancedEXT;

/** @suppress {duplicate } */ var _glDrawElementsInstancedNV = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedNV = _glDrawElementsInstancedNV;

/** @suppress {duplicate } */ function _glDrawRangeElements(mode, start, end, count, type, indices) {
 indices >>>= 0;
 _glDrawElements(mode, count, type, indices);
}

var _emscripten_glDrawRangeElements = _glDrawRangeElements;

/** @suppress {duplicate } */ var _glEnable = x0 => GLctx.enable(x0);

var _emscripten_glEnable = _glEnable;

/** @suppress {duplicate } */ var _glEnableVertexAttribArray = index => {
 GLctx.enableVertexAttribArray(index);
};

var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;

/** @suppress {duplicate } */ var _glEndQuery = x0 => GLctx.endQuery(x0);

var _emscripten_glEndQuery = _glEndQuery;

/** @suppress {duplicate } */ var _glEndQueryEXT = target => {
 GLctx.disjointTimerQueryExt["endQueryEXT"](target);
};

var _emscripten_glEndQueryEXT = _glEndQueryEXT;

/** @suppress {duplicate } */ var _glEndTransformFeedback = () => GLctx.endTransformFeedback();

var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;

/** @suppress {duplicate } */ function _glFenceSync(condition, flags) {
 var sync = GLctx.fenceSync(condition, flags);
 if (sync) {
  var id = GL.getNewId(GL.syncs);
  sync.name = id;
  GL.syncs[id] = sync;
  return id;
 }
 return 0;
}

var _emscripten_glFenceSync = _glFenceSync;

/** @suppress {duplicate } */ var _glFinish = () => GLctx.finish();

var _emscripten_glFinish = _glFinish;

/** @suppress {duplicate } */ var _glFlush = () => GLctx.flush();

var _emscripten_glFlush = _glFlush;

/** @suppress {duplicate } */ var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
 GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;

/** @suppress {duplicate } */ var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
 GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
};

var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;

/** @suppress {duplicate } */ var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
 GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
};

var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;

/** @suppress {duplicate } */ var _glFrontFace = x0 => GLctx.frontFace(x0);

var _emscripten_glFrontFace = _glFrontFace;

/** @suppress {duplicate } */ function _glGenBuffers(n, buffers) {
 buffers >>>= 0;
 GL.genObject(n, buffers, "createBuffer", GL.buffers);
}

var _emscripten_glGenBuffers = _glGenBuffers;

/** @suppress {duplicate } */ function _glGenFramebuffers(n, ids) {
 ids >>>= 0;
 GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
}

var _emscripten_glGenFramebuffers = _glGenFramebuffers;

/** @suppress {duplicate } */ function _glGenQueries(n, ids) {
 ids >>>= 0;
 GL.genObject(n, ids, "createQuery", GL.queries);
}

var _emscripten_glGenQueries = _glGenQueries;

/** @suppress {duplicate } */ function _glGenQueriesEXT(n, ids) {
 ids >>>= 0;
 for (var i = 0; i < n; i++) {
  var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
  if (!query) {
   GL.recordError(1282);
   /* GL_INVALID_OPERATION */ while (i < n) HEAP32[(((ids) + (i++ * 4)) >>> 2) >>> 0] = 0;
   return;
  }
  var id = GL.getNewId(GL.queries);
  query.name = id;
  GL.queries[id] = query;
  HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0] = id;
 }
}

var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;

/** @suppress {duplicate } */ function _glGenRenderbuffers(n, renderbuffers) {
 renderbuffers >>>= 0;
 GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
}

var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;

/** @suppress {duplicate } */ function _glGenSamplers(n, samplers) {
 samplers >>>= 0;
 GL.genObject(n, samplers, "createSampler", GL.samplers);
}

var _emscripten_glGenSamplers = _glGenSamplers;

/** @suppress {duplicate } */ function _glGenTextures(n, textures) {
 textures >>>= 0;
 GL.genObject(n, textures, "createTexture", GL.textures);
}

var _emscripten_glGenTextures = _glGenTextures;

/** @suppress {duplicate } */ function _glGenTransformFeedbacks(n, ids) {
 ids >>>= 0;
 GL.genObject(n, ids, "createTransformFeedback", GL.transformFeedbacks);
}

var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;

/** @suppress {duplicate } */ function _glGenVertexArrays(n, arrays) {
 arrays >>>= 0;
 GL.genObject(n, arrays, "createVertexArray", GL.vaos);
}

var _emscripten_glGenVertexArrays = _glGenVertexArrays;

/** @suppress {duplicate } */ var _glGenVertexArraysOES = _glGenVertexArrays;

var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;

/** @suppress {duplicate } */ var _glGenerateMipmap = x0 => GLctx.generateMipmap(x0);

var _emscripten_glGenerateMipmap = _glGenerateMipmap;

var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
 program = GL.programs[program];
 var info = GLctx[funcName](program, index);
 if (info) {
  var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
  if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
  if (size) HEAP32[((size) >>> 2) >>> 0] = info.size;
  if (type) HEAP32[((type) >>> 2) >>> 0] = info.type;
 }
};

/** @suppress {duplicate } */ function _glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
 length >>>= 0;
 size >>>= 0;
 type >>>= 0;
 name >>>= 0;
 __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
}

var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;

/** @suppress {duplicate } */ function _glGetActiveUniform(program, index, bufSize, length, size, type, name) {
 length >>>= 0;
 size >>>= 0;
 type >>>= 0;
 name >>>= 0;
 __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
}

var _emscripten_glGetActiveUniform = _glGetActiveUniform;

/** @suppress {duplicate } */ function _glGetActiveUniformBlockName(program, uniformBlockIndex, bufSize, length, uniformBlockName) {
 length >>>= 0;
 uniformBlockName >>>= 0;
 program = GL.programs[program];
 var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
 if (!result) return;
 if (uniformBlockName && bufSize > 0) {
  var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
  if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
 } else {
  if (length) HEAP32[((length) >>> 2) >>> 0] = 0;
 }
}

var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;

/** @suppress {duplicate } */ function _glGetActiveUniformBlockiv(program, uniformBlockIndex, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 if (pname == 35393) /* GL_UNIFORM_BLOCK_NAME_LENGTH */ {
  var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
  HEAP32[((params) >>> 2) >>> 0] = name.length + 1;
  return;
 }
 var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
 if (result === null) return;
 if (pname == 35395) /*GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES*/ {
  for (var i = 0; i < result.length; i++) {
   HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = result[i];
  }
 } else {
  HEAP32[((params) >>> 2) >>> 0] = result;
 }
}

var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;

/** @suppress {duplicate } */ function _glGetActiveUniformsiv(program, uniformCount, uniformIndices, pname, params) {
 uniformIndices >>>= 0;
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (uniformCount > 0 && uniformIndices == 0) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 var ids = [];
 for (var i = 0; i < uniformCount; i++) {
  ids.push(HEAP32[(((uniformIndices) + (i * 4)) >>> 2) >>> 0]);
 }
 var result = GLctx.getActiveUniforms(program, ids, pname);
 if (!result) return;
 var len = result.length;
 for (var i = 0; i < len; i++) {
  HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = result[i];
 }
}

var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;

/** @suppress {duplicate } */ function _glGetAttachedShaders(program, maxCount, count, shaders) {
 count >>>= 0;
 shaders >>>= 0;
 var result = GLctx.getAttachedShaders(GL.programs[program]);
 var len = result.length;
 if (len > maxCount) {
  len = maxCount;
 }
 HEAP32[((count) >>> 2) >>> 0] = len;
 for (var i = 0; i < len; ++i) {
  var id = GL.shaders.indexOf(result[i]);
  HEAP32[(((shaders) + (i * 4)) >>> 2) >>> 0] = id;
 }
}

var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;

/** @suppress {duplicate } */ function _glGetAttribLocation(program, name) {
 name >>>= 0;
 return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
}

var _emscripten_glGetAttribLocation = _glGetAttribLocation;

var writeI53ToI64 = (ptr, num) => {
 HEAPU32[((ptr) >>> 2) >>> 0] = num;
 var lower = HEAPU32[((ptr) >>> 2) >>> 0];
 HEAPU32[(((ptr) + (4)) >>> 2) >>> 0] = (num - lower) / 4294967296;
};

var webglGetExtensions = function $webglGetExtensions() {
 var exts = getEmscriptenSupportedExtensions(GLctx);
 exts = exts.concat(exts.map(e => "GL_" + e));
 return exts;
};

var emscriptenWebGLGet = (name_, p, type) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var ret = undefined;
 switch (name_) {
 case 36346:
  ret = 1;
  break;

 case 36344:
  if (type != 0 && type != 1) {
   GL.recordError(1280);
  }
  return;

 case 34814:
 case 36345:
  ret = 0;
  break;

 case 34466:
  var formats = GLctx.getParameter(34467);
  /*GL_COMPRESSED_TEXTURE_FORMATS*/ ret = formats ? formats.length : 0;
  break;

 case 33309:
  if (GL.currentContext.version < 2) {
   GL.recordError(1282);
   /* GL_INVALID_OPERATION */ return;
  }
  ret = webglGetExtensions().length;
  break;

 case 33307:
 case 33308:
  if (GL.currentContext.version < 2) {
   GL.recordError(1280);
   return;
  }
  ret = name_ == 33307 ? 3 : 0;
  break;
 }
 if (ret === undefined) {
  var result = GLctx.getParameter(name_);
  switch (typeof result) {
  case "number":
   ret = result;
   break;

  case "boolean":
   ret = result ? 1 : 0;
   break;

  case "string":
   GL.recordError(1280);
   return;

  case "object":
   if (result === null) {
    switch (name_) {
    case 34964:
    case 35725:
    case 34965:
    case 36006:
    case 36007:
    case 32873:
    case 34229:
    case 36662:
    case 36663:
    case 35053:
    case 35055:
    case 36010:
    case 35097:
    case 35869:
    case 32874:
    case 36389:
    case 35983:
    case 35368:
    case 34068:
     {
      ret = 0;
      break;
     }

    default:
     {
      GL.recordError(1280);
      return;
     }
    }
   } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
    for (var i = 0; i < result.length; ++i) {
     switch (type) {
     case 0:
      HEAP32[(((p) + (i * 4)) >>> 2) >>> 0] = result[i];
      break;

     case 2:
      HEAPF32[(((p) + (i * 4)) >>> 2) >>> 0] = result[i];
      break;

     case 4:
      HEAP8[(p) + (i) >>> 0] = result[i] ? 1 : 0;
      break;
     }
    }
    return;
   } else {
    try {
     ret = result.name | 0;
    } catch (e) {
     GL.recordError(1280);
     err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
     return;
    }
   }
   break;

  default:
   GL.recordError(1280);
   err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof (result)}!`);
   return;
  }
 }
 switch (type) {
 case 1:
  writeI53ToI64(p, ret);
  break;

 case 0:
  HEAP32[((p) >>> 2) >>> 0] = ret;
  break;

 case 2:
  HEAPF32[((p) >>> 2) >>> 0] = ret;
  break;

 case 4:
  HEAP8[p >>> 0] = ret ? 1 : 0;
  break;
 }
};

/** @suppress {duplicate } */ function _glGetBooleanv(name_, p) {
 p >>>= 0;
 return emscriptenWebGLGet(name_, p, 4);
}

var _emscripten_glGetBooleanv = _glGetBooleanv;

/** @suppress {duplicate } */ function _glGetBufferParameteri64v(target, value, data) {
 data >>>= 0;
 if (!data) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 writeI53ToI64(data, GLctx.getBufferParameter(target, value));
}

var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;

/** @suppress {duplicate } */ function _glGetBufferParameteriv(target, value, data) {
 data >>>= 0;
 if (!data) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((data) >>> 2) >>> 0] = GLctx.getBufferParameter(target, value);
}

var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;

/** @suppress {duplicate } */ var _glGetError = () => {
 var error = GLctx.getError() || GL.lastError;
 GL.lastError = 0;
 /*GL_NO_ERROR*/ return error;
};

var _emscripten_glGetError = _glGetError;

/** @suppress {duplicate } */ function _glGetFloatv(name_, p) {
 p >>>= 0;
 return emscriptenWebGLGet(name_, p, 2);
}

var _emscripten_glGetFloatv = _glGetFloatv;

/** @suppress {duplicate } */ function _glGetFragDataLocation(program, name) {
 name >>>= 0;
 return GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
}

var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;

/** @suppress {duplicate } */ function _glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
 params >>>= 0;
 var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
 if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
  result = result.name | 0;
 }
 HEAP32[((params) >>> 2) >>> 0] = result;
}

var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;

var emscriptenWebGLGetIndexed = (target, index, data, type) => {
 if (!data) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var result = GLctx.getIndexedParameter(target, index);
 var ret;
 switch (typeof result) {
 case "boolean":
  ret = result ? 1 : 0;
  break;

 case "number":
  ret = result;
  break;

 case "object":
  if (result === null) {
   switch (target) {
   case 35983:
   case 35368:
    ret = 0;
    break;

   default:
    {
     GL.recordError(1280);
     return;
    }
   }
  } else if (result instanceof WebGLBuffer) {
   ret = result.name | 0;
  } else {
   GL.recordError(1280);
   return;
  }
  break;

 default:
  GL.recordError(1280);
  return;
 }
 switch (type) {
 case 1:
  writeI53ToI64(data, ret);
  break;

 case 0:
  HEAP32[((data) >>> 2) >>> 0] = ret;
  break;

 case 2:
  HEAPF32[((data) >>> 2) >>> 0] = ret;
  break;

 case 4:
  HEAP8[data >>> 0] = ret ? 1 : 0;
  break;

 default:
  throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type;
 }
};

/** @suppress {duplicate } */ function _glGetInteger64i_v(target, index, data) {
 data >>>= 0;
 return emscriptenWebGLGetIndexed(target, index, data, 1);
}

var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;

/** @suppress {duplicate } */ function _glGetInteger64v(name_, p) {
 p >>>= 0;
 emscriptenWebGLGet(name_, p, 1);
}

var _emscripten_glGetInteger64v = _glGetInteger64v;

/** @suppress {duplicate } */ function _glGetIntegeri_v(target, index, data) {
 data >>>= 0;
 return emscriptenWebGLGetIndexed(target, index, data, 0);
}

var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;

/** @suppress {duplicate } */ function _glGetIntegerv(name_, p) {
 p >>>= 0;
 return emscriptenWebGLGet(name_, p, 0);
}

var _emscripten_glGetIntegerv = _glGetIntegerv;

/** @suppress {duplicate } */ function _glGetInternalformativ(target, internalformat, pname, bufSize, params) {
 params >>>= 0;
 if (bufSize < 0) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (target === 36161 && (internalformat === 33777 || internalformat === 33778 || internalformat === 33779 || internalformat === 6406 || internalformat === 33324 || internalformat === 32859)) return;
 var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
 if (ret === null) return;
 for (var i = 0; i < ret.length && i < bufSize; ++i) {
  HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = ret[i];
 }
}

var _emscripten_glGetInternalformativ = _glGetInternalformativ;

/** @suppress {duplicate } */ function _glGetProgramBinary(program, bufSize, length, binaryFormat, binary) {
 length >>>= 0;
 binaryFormat >>>= 0;
 binary >>>= 0;
 GL.recordError(1282);
}

var _emscripten_glGetProgramBinary = _glGetProgramBinary;

/** @suppress {duplicate } */ function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
 length >>>= 0;
 infoLog >>>= 0;
 var log = GLctx.getProgramInfoLog(GL.programs[program]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
}

var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;

/** @suppress {duplicate } */ function _glGetProgramiv(program, pname, p) {
 p >>>= 0;
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (program >= GL.counter) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 if (pname == 35716) {
  var log = GLctx.getProgramInfoLog(program);
  if (log === null) log = "(unknown error)";
  HEAP32[((p) >>> 2) >>> 0] = log.length + 1;
 } else if (pname == 35719) /* GL_ACTIVE_UNIFORM_MAX_LENGTH */ {
  if (!program.maxUniformLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35718); /*GL_ACTIVE_UNIFORMS*/ ++i) {
    program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
   }
  }
  HEAP32[((p) >>> 2) >>> 0] = program.maxUniformLength;
 } else if (pname == 35722) /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */ {
  if (!program.maxAttributeLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35721); /*GL_ACTIVE_ATTRIBUTES*/ ++i) {
    program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
   }
  }
  HEAP32[((p) >>> 2) >>> 0] = program.maxAttributeLength;
 } else if (pname == 35381) /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */ {
  if (!program.maxUniformBlockNameLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35382); /*GL_ACTIVE_UNIFORM_BLOCKS*/ ++i) {
    program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
   }
  }
  HEAP32[((p) >>> 2) >>> 0] = program.maxUniformBlockNameLength;
 } else {
  HEAP32[((p) >>> 2) >>> 0] = GLctx.getProgramParameter(program, pname);
 }
}

var _emscripten_glGetProgramiv = _glGetProgramiv;

/** @suppress {duplicate } */ function _glGetQueryObjecti64vEXT(id, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var query = GL.queries[id];
 var param;
 if (GL.currentContext.version < 2) {
  param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
 } else {
  param = GLctx.getQueryParameter(query, pname);
 }
 var ret;
 if (typeof param == "boolean") {
  ret = param ? 1 : 0;
 } else {
  ret = param;
 }
 writeI53ToI64(params, ret);
}

var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;

/** @suppress {duplicate } */ function _glGetQueryObjectivEXT(id, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var query = GL.queries[id];
 var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
 var ret;
 if (typeof param == "boolean") {
  ret = param ? 1 : 0;
 } else {
  ret = param;
 }
 HEAP32[((params) >>> 2) >>> 0] = ret;
}

var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;

/** @suppress {duplicate } */ var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;

var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;

/** @suppress {duplicate } */ function _glGetQueryObjectuiv(id, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var query = GL.queries[id];
 var param = GLctx.getQueryParameter(query, pname);
 var ret;
 if (typeof param == "boolean") {
  ret = param ? 1 : 0;
 } else {
  ret = param;
 }
 HEAP32[((params) >>> 2) >>> 0] = ret;
}

var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;

/** @suppress {duplicate } */ var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;

var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;

/** @suppress {duplicate } */ function _glGetQueryiv(target, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((params) >>> 2) >>> 0] = GLctx.getQuery(target, pname);
}

var _emscripten_glGetQueryiv = _glGetQueryiv;

/** @suppress {duplicate } */ function _glGetQueryivEXT(target, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((params) >>> 2) >>> 0] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
}

var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;

/** @suppress {duplicate } */ function _glGetRenderbufferParameteriv(target, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((params) >>> 2) >>> 0] = GLctx.getRenderbufferParameter(target, pname);
}

var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;

/** @suppress {duplicate } */ function _glGetSamplerParameterfv(sampler, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAPF32[((params) >>> 2) >>> 0] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
}

var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;

/** @suppress {duplicate } */ function _glGetSamplerParameteriv(sampler, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((params) >>> 2) >>> 0] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
}

var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;

/** @suppress {duplicate } */ function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
 length >>>= 0;
 infoLog >>>= 0;
 var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
}

var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;

/** @suppress {duplicate } */ function _glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
 range >>>= 0;
 precision >>>= 0;
 var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
 HEAP32[((range) >>> 2) >>> 0] = result.rangeMin;
 HEAP32[(((range) + (4)) >>> 2) >>> 0] = result.rangeMax;
 HEAP32[((precision) >>> 2) >>> 0] = result.precision;
}

var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;

/** @suppress {duplicate } */ function _glGetShaderSource(shader, bufSize, length, source) {
 length >>>= 0;
 source >>>= 0;
 var result = GLctx.getShaderSource(GL.shaders[shader]);
 if (!result) return;
 var numBytesWrittenExclNull = (bufSize > 0 && source) ? stringToUTF8(result, source, bufSize) : 0;
 if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
}

var _emscripten_glGetShaderSource = _glGetShaderSource;

/** @suppress {duplicate } */ function _glGetShaderiv(shader, pname, p) {
 p >>>= 0;
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (pname == 35716) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var logLength = log ? log.length + 1 : 0;
  HEAP32[((p) >>> 2) >>> 0] = logLength;
 } else if (pname == 35720) {
  var source = GLctx.getShaderSource(GL.shaders[shader]);
  var sourceLength = source ? source.length + 1 : 0;
  HEAP32[((p) >>> 2) >>> 0] = sourceLength;
 } else {
  HEAP32[((p) >>> 2) >>> 0] = GLctx.getShaderParameter(GL.shaders[shader], pname);
 }
}

var _emscripten_glGetShaderiv = _glGetShaderiv;

var stringToNewUTF8 = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
};

/** @suppress {duplicate } */ function _glGetString(name_) {
 var ret = GL.stringCache[name_];
 if (!ret) {
  switch (name_) {
  case 7939:
   /* GL_EXTENSIONS */ ret = stringToNewUTF8(webglGetExtensions().join(" "));
   break;

  case 7936:
  /* GL_VENDOR */ case 7937:
  /* GL_RENDERER */ case 37445:
  /* UNMASKED_VENDOR_WEBGL */ case 37446:
   /* UNMASKED_RENDERER_WEBGL */ var s = GLctx.getParameter(name_);
   if (!s) {
    GL.recordError(1280);
   }
   ret = s ? stringToNewUTF8(s) : 0;
   break;

  case 7938:
   /* GL_VERSION */ var glVersion = GLctx.getParameter(7938);
   if (true) glVersion = `OpenGL ES 3.0 (${glVersion})`; else {
    glVersion = `OpenGL ES 2.0 (${glVersion})`;
   }
   ret = stringToNewUTF8(glVersion);
   break;

  case 35724:
   /* GL_SHADING_LANGUAGE_VERSION */ var glslVersion = GLctx.getParameter(35724);
   var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
   var ver_num = glslVersion.match(ver_re);
   if (ver_num !== null) {
    if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
    glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
   }
   ret = stringToNewUTF8(glslVersion);
   break;

  default:
   GL.recordError(1280);
  }
  GL.stringCache[name_] = ret;
 }
 return ret;
}

var _emscripten_glGetString = _glGetString;

/** @suppress {duplicate } */ function _glGetStringi(name, index) {
 if (GL.currentContext.version < 2) {
  GL.recordError(1282);
  return 0;
 }
 var stringiCache = GL.stringiCache[name];
 if (stringiCache) {
  if (index < 0 || index >= stringiCache.length) {
   GL.recordError(1281);
   /*GL_INVALID_VALUE*/ return 0;
  }
  return stringiCache[index];
 }
 switch (name) {
 case 7939:
  /* GL_EXTENSIONS */ var exts = webglGetExtensions().map(stringToNewUTF8);
  stringiCache = GL.stringiCache[name] = exts;
  if (index < 0 || index >= stringiCache.length) {
   GL.recordError(1281);
   /*GL_INVALID_VALUE*/ return 0;
  }
  return stringiCache[index];

 default:
  GL.recordError(1280);
  /*GL_INVALID_ENUM*/ return 0;
 }
}

var _emscripten_glGetStringi = _glGetStringi;

/** @suppress {duplicate } */ function _glGetSynciv(sync, pname, bufSize, length, values) {
 sync >>>= 0;
 length >>>= 0;
 values >>>= 0;
 if (bufSize < 0) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (!values) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
 if (ret !== null) {
  HEAP32[((values) >>> 2) >>> 0] = ret;
  if (length) HEAP32[((length) >>> 2) >>> 0] = 1;
 }
}

var _emscripten_glGetSynciv = _glGetSynciv;

/** @suppress {duplicate } */ function _glGetTexParameterfv(target, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAPF32[((params) >>> 2) >>> 0] = GLctx.getTexParameter(target, pname);
}

var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;

/** @suppress {duplicate } */ function _glGetTexParameteriv(target, pname, params) {
 params >>>= 0;
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((params) >>> 2) >>> 0] = GLctx.getTexParameter(target, pname);
}

var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;

/** @suppress {duplicate } */ function _glGetTransformFeedbackVarying(program, index, bufSize, length, size, type, name) {
 length >>>= 0;
 size >>>= 0;
 type >>>= 0;
 name >>>= 0;
 program = GL.programs[program];
 var info = GLctx.getTransformFeedbackVarying(program, index);
 if (!info) return;
 if (name && bufSize > 0) {
  var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
  if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
 } else {
  if (length) HEAP32[((length) >>> 2) >>> 0] = 0;
 }
 if (size) HEAP32[((size) >>> 2) >>> 0] = info.size;
 if (type) HEAP32[((type) >>> 2) >>> 0] = info.type;
}

var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;

/** @suppress {duplicate } */ function _glGetUniformBlockIndex(program, uniformBlockName) {
 uniformBlockName >>>= 0;
 return GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
}

var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;

/** @suppress {duplicate } */ function _glGetUniformIndices(program, uniformCount, uniformNames, uniformIndices) {
 uniformNames >>>= 0;
 uniformIndices >>>= 0;
 if (!uniformIndices) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 var names = [];
 for (var i = 0; i < uniformCount; i++) names.push(UTF8ToString(HEAP32[(((uniformNames) + (i * 4)) >>> 2) >>> 0]));
 var result = GLctx.getUniformIndices(program, names);
 if (!result) return;
 var len = result.length;
 for (var i = 0; i < len; i++) {
  HEAP32[(((uniformIndices) + (i * 4)) >>> 2) >>> 0] = result[i];
 }
}

var _emscripten_glGetUniformIndices = _glGetUniformIndices;

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

/** @noinline */ var webglGetLeftBracePos = name => name.slice(-1) == "]" && name.lastIndexOf("[");

var webglPrepareUniformLocationsBeforeFirstUse = program => {
 var uniformLocsById = program.uniformLocsById,  uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,  i, j;
 if (!uniformLocsById) {
  program.uniformLocsById = uniformLocsById = {};
  program.uniformArrayNamesById = {};
  for (i = 0; i < GLctx.getProgramParameter(program, 35718); /*GL_ACTIVE_UNIFORMS*/ ++i) {
   var u = GLctx.getActiveUniform(program, i);
   var nm = u.name;
   var sz = u.size;
   var lb = webglGetLeftBracePos(nm);
   var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
   var id = program.uniformIdCounter;
   program.uniformIdCounter += sz;
   uniformSizeAndIdsByName[arrayName] = [ sz, id ];
   for (j = 0; j < sz; ++j) {
    uniformLocsById[id] = j;
    program.uniformArrayNamesById[id++] = arrayName;
   }
  }
 }
};

/** @suppress {duplicate } */ function _glGetUniformLocation(program, name) {
 name >>>= 0;
 name = UTF8ToString(name);
 if (program = GL.programs[program]) {
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var uniformLocsById = program.uniformLocsById;
  var arrayIndex = 0;
  var uniformBaseName = name;
  var leftBrace = webglGetLeftBracePos(name);
  if (leftBrace > 0) {
   arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
   uniformBaseName = name.slice(0, leftBrace);
  }
  var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  if (sizeAndId && arrayIndex < sizeAndId[0]) {
   arrayIndex += sizeAndId[1];
   if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
    return arrayIndex;
   }
  }
 } else {
  GL.recordError(1281);
 }
 /* GL_INVALID_VALUE */ return -1;
}

var _emscripten_glGetUniformLocation = _glGetUniformLocation;

var webglGetUniformLocation = location => {
 var p = GLctx.currentProgram;
 if (p) {
  var webglLoc = p.uniformLocsById[location];
  if (typeof webglLoc == "number") {
   p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
  }
  return webglLoc;
 } else {
  GL.recordError(1282);
 }
};

/** @suppress{checkTypes} */ var emscriptenWebGLGetUniform = (program, location, params, type) => {
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 webglPrepareUniformLocationsBeforeFirstUse(program);
 var data = GLctx.getUniform(program, webglGetUniformLocation(location));
 if (typeof data == "number" || typeof data == "boolean") {
  switch (type) {
  case 0:
   HEAP32[((params) >>> 2) >>> 0] = data;
   break;

  case 2:
   HEAPF32[((params) >>> 2) >>> 0] = data;
   break;
  }
 } else {
  for (var i = 0; i < data.length; i++) {
   switch (type) {
   case 0:
    HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
    break;

   case 2:
    HEAPF32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
    break;
   }
  }
 }
};

/** @suppress {duplicate } */ function _glGetUniformfv(program, location, params) {
 params >>>= 0;
 emscriptenWebGLGetUniform(program, location, params, 2);
}

var _emscripten_glGetUniformfv = _glGetUniformfv;

/** @suppress {duplicate } */ function _glGetUniformiv(program, location, params) {
 params >>>= 0;
 emscriptenWebGLGetUniform(program, location, params, 0);
}

var _emscripten_glGetUniformiv = _glGetUniformiv;

/** @suppress {duplicate } */ function _glGetUniformuiv(program, location, params) {
 params >>>= 0;
 return emscriptenWebGLGetUniform(program, location, params, 0);
}

var _emscripten_glGetUniformuiv = _glGetUniformuiv;

/** @suppress{checkTypes} */ var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
 if (!params) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var data = GLctx.getVertexAttrib(index, pname);
 if (pname == 34975) /*VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/ {
  HEAP32[((params) >>> 2) >>> 0] = data && data["name"];
 } else if (typeof data == "number" || typeof data == "boolean") {
  switch (type) {
  case 0:
   HEAP32[((params) >>> 2) >>> 0] = data;
   break;

  case 2:
   HEAPF32[((params) >>> 2) >>> 0] = data;
   break;

  case 5:
   HEAP32[((params) >>> 2) >>> 0] = Math.fround(data);
   break;
  }
 } else {
  for (var i = 0; i < data.length; i++) {
   switch (type) {
   case 0:
    HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
    break;

   case 2:
    HEAPF32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
    break;

   case 5:
    HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = Math.fround(data[i]);
    break;
   }
  }
 }
};

/** @suppress {duplicate } */ function _glGetVertexAttribIiv(index, pname, params) {
 params >>>= 0;
 emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
}

var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;

/** @suppress {duplicate } */ var _glGetVertexAttribIuiv = _glGetVertexAttribIiv;

var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIuiv;

/** @suppress {duplicate } */ function _glGetVertexAttribPointerv(index, pname, pointer) {
 pointer >>>= 0;
 if (!pointer) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 HEAP32[((pointer) >>> 2) >>> 0] = GLctx.getVertexAttribOffset(index, pname);
}

var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;

/** @suppress {duplicate } */ function _glGetVertexAttribfv(index, pname, params) {
 params >>>= 0;
 emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
}

var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;

/** @suppress {duplicate } */ function _glGetVertexAttribiv(index, pname, params) {
 params >>>= 0;
 emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
}

var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;

/** @suppress {duplicate } */ var _glHint = (x0, x1) => GLctx.hint(x0, x1);

var _emscripten_glHint = _glHint;

/** @suppress {duplicate } */ function _glInvalidateFramebuffer(target, numAttachments, attachments) {
 attachments >>>= 0;
 var list = tempFixedLengthArray[numAttachments];
 for (var i = 0; i < numAttachments; i++) {
  list[i] = HEAP32[(((attachments) + (i * 4)) >>> 2) >>> 0];
 }
 GLctx.invalidateFramebuffer(target, list);
}

var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;

/** @suppress {duplicate } */ function _glInvalidateSubFramebuffer(target, numAttachments, attachments, x, y, width, height) {
 attachments >>>= 0;
 var list = tempFixedLengthArray[numAttachments];
 for (var i = 0; i < numAttachments; i++) {
  list[i] = HEAP32[(((attachments) + (i * 4)) >>> 2) >>> 0];
 }
 GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
}

var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;

/** @suppress {duplicate } */ var _glIsBuffer = buffer => {
 var b = GL.buffers[buffer];
 if (!b) return 0;
 return GLctx.isBuffer(b);
};

var _emscripten_glIsBuffer = _glIsBuffer;

/** @suppress {duplicate } */ var _glIsEnabled = x0 => GLctx.isEnabled(x0);

var _emscripten_glIsEnabled = _glIsEnabled;

/** @suppress {duplicate } */ var _glIsFramebuffer = framebuffer => {
 var fb = GL.framebuffers[framebuffer];
 if (!fb) return 0;
 return GLctx.isFramebuffer(fb);
};

var _emscripten_glIsFramebuffer = _glIsFramebuffer;

/** @suppress {duplicate } */ var _glIsProgram = program => {
 program = GL.programs[program];
 if (!program) return 0;
 return GLctx.isProgram(program);
};

var _emscripten_glIsProgram = _glIsProgram;

/** @suppress {duplicate } */ var _glIsQuery = id => {
 var query = GL.queries[id];
 if (!query) return 0;
 return GLctx.isQuery(query);
};

var _emscripten_glIsQuery = _glIsQuery;

/** @suppress {duplicate } */ var _glIsQueryEXT = id => {
 var query = GL.queries[id];
 if (!query) return 0;
 return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
};

var _emscripten_glIsQueryEXT = _glIsQueryEXT;

/** @suppress {duplicate } */ var _glIsRenderbuffer = renderbuffer => {
 var rb = GL.renderbuffers[renderbuffer];
 if (!rb) return 0;
 return GLctx.isRenderbuffer(rb);
};

var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;

/** @suppress {duplicate } */ var _glIsSampler = id => {
 var sampler = GL.samplers[id];
 if (!sampler) return 0;
 return GLctx.isSampler(sampler);
};

var _emscripten_glIsSampler = _glIsSampler;

/** @suppress {duplicate } */ var _glIsShader = shader => {
 var s = GL.shaders[shader];
 if (!s) return 0;
 return GLctx.isShader(s);
};

var _emscripten_glIsShader = _glIsShader;

/** @suppress {duplicate } */ function _glIsSync(sync) {
 sync >>>= 0;
 return GLctx.isSync(GL.syncs[sync]);
}

var _emscripten_glIsSync = _glIsSync;

/** @suppress {duplicate } */ var _glIsTexture = id => {
 var texture = GL.textures[id];
 if (!texture) return 0;
 return GLctx.isTexture(texture);
};

var _emscripten_glIsTexture = _glIsTexture;

/** @suppress {duplicate } */ var _glIsTransformFeedback = id => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);

var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;

/** @suppress {duplicate } */ var _glIsVertexArray = array => {
 var vao = GL.vaos[array];
 if (!vao) return 0;
 return GLctx.isVertexArray(vao);
};

var _emscripten_glIsVertexArray = _glIsVertexArray;

/** @suppress {duplicate } */ var _glIsVertexArrayOES = _glIsVertexArray;

var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;

/** @suppress {duplicate } */ var _glLineWidth = x0 => GLctx.lineWidth(x0);

var _emscripten_glLineWidth = _glLineWidth;

/** @suppress {duplicate } */ var _glLinkProgram = program => {
 program = GL.programs[program];
 GLctx.linkProgram(program);
 program.uniformLocsById = 0;
 program.uniformSizeAndIdsByName = {};
};

var _emscripten_glLinkProgram = _glLinkProgram;

/** @suppress {duplicate } */ var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();

var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;

/** @suppress {duplicate } */ var _glPixelStorei = (pname, param) => {
 if (pname == 3317) /* GL_UNPACK_ALIGNMENT */ {
  GL.unpackAlignment = param;
 }
 GLctx.pixelStorei(pname, param);
};

var _emscripten_glPixelStorei = _glPixelStorei;

/** @suppress {duplicate } */ var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

var _emscripten_glPolygonOffset = _glPolygonOffset;

/** @suppress {duplicate } */ function _glProgramBinary(program, binaryFormat, binary, length) {
 binary >>>= 0;
 GL.recordError(1280);
}

var _emscripten_glProgramBinary = _glProgramBinary;

/** @suppress {duplicate } */ var _glProgramParameteri = (program, pname, value) => {
 GL.recordError(1280);
};

/*GL_INVALID_ENUM*/ var _emscripten_glProgramParameteri = _glProgramParameteri;

/** @suppress {duplicate } */ var _glQueryCounterEXT = (id, target) => {
 GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
};

var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;

/** @suppress {duplicate } */ var _glReadBuffer = x0 => GLctx.readBuffer(x0);

var _emscripten_glReadBuffer = _glReadBuffer;

var computeUnpackAlignedImageSize = (width, height, sizePerPixel, alignment) => {
 function roundedToNextMultipleOf(x, y) {
  return (x + y - 1) & -y;
 }
 var plainRowSize = width * sizePerPixel;
 var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
 return height * alignedRowSize;
};

var colorChannelsInGlTextureFormat = format => {
 var colorChannels = {
  5: 3,
  6: 4,
  8: 2,
  29502: 3,
  29504: 4,
  26917: 2,
  26918: 2,
  29846: 3,
  29847: 4
 };
 return colorChannels[format - 6402] || 1;
};

var heapObjectForWebGLType = type => {
 type -= 5120;
 if (type == 0) return HEAP8;
 if (type == 1) return HEAPU8;
 if (type == 2) return HEAP16;
 if (type == 4) return HEAP32;
 if (type == 6) return HEAPF32;
 if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
 return HEAPU16;
};

var toTypedArrayIndex = (pointer, heap) => pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));

var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
 var heap = heapObjectForWebGLType(type);
 var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
 var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
 return heap.subarray(toTypedArrayIndex(pixels, heap) >>> 0, toTypedArrayIndex(pixels + bytes, heap) >>> 0);
};

/** @suppress {duplicate } */ function _glReadPixels(x, y, width, height, format, type, pixels) {
 pixels >>>= 0;
 if (true) {
  if (GLctx.currentPixelPackBufferBinding) {
   GLctx.readPixels(x, y, width, height, format, type, pixels);
   return;
  }
 }
 var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
 if (!pixelData) {
  GL.recordError(1280);
  /*GL_INVALID_ENUM*/ return;
 }
 GLctx.readPixels(x, y, width, height, format, type, pixelData);
}

var _emscripten_glReadPixels = _glReadPixels;

/** @suppress {duplicate } */ var _glReleaseShaderCompiler = () => {};

var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;

/** @suppress {duplicate } */ var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);

var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;

/** @suppress {duplicate } */ var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);

var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;

/** @suppress {duplicate } */ var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();

var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;

/** @suppress {duplicate } */ var _glSampleCoverage = (value, invert) => {
 GLctx.sampleCoverage(value, !!invert);
};

var _emscripten_glSampleCoverage = _glSampleCoverage;

/** @suppress {duplicate } */ var _glSamplerParameterf = (sampler, pname, param) => {
 GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
};

var _emscripten_glSamplerParameterf = _glSamplerParameterf;

/** @suppress {duplicate } */ function _glSamplerParameterfv(sampler, pname, params) {
 params >>>= 0;
 var param = HEAPF32[((params) >>> 2) >>> 0];
 GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
}

var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;

/** @suppress {duplicate } */ var _glSamplerParameteri = (sampler, pname, param) => {
 GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
};

var _emscripten_glSamplerParameteri = _glSamplerParameteri;

/** @suppress {duplicate } */ function _glSamplerParameteriv(sampler, pname, params) {
 params >>>= 0;
 var param = HEAP32[((params) >>> 2) >>> 0];
 GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
}

var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;

/** @suppress {duplicate } */ var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

var _emscripten_glScissor = _glScissor;

/** @suppress {duplicate } */ function _glShaderBinary(count, shaders, binaryformat, binary, length) {
 shaders >>>= 0;
 binary >>>= 0;
 GL.recordError(1280);
}

var _emscripten_glShaderBinary = _glShaderBinary;

/** @suppress {duplicate } */ function _glShaderSource(shader, count, string, length) {
 string >>>= 0;
 length >>>= 0;
 var source = GL.getSource(shader, count, string, length);
 GLctx.shaderSource(GL.shaders[shader], source);
}

var _emscripten_glShaderSource = _glShaderSource;

/** @suppress {duplicate } */ var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

var _emscripten_glStencilFunc = _glStencilFunc;

/** @suppress {duplicate } */ var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;

/** @suppress {duplicate } */ var _glStencilMask = x0 => GLctx.stencilMask(x0);

var _emscripten_glStencilMask = _glStencilMask;

/** @suppress {duplicate } */ var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);

var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;

/** @suppress {duplicate } */ var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

var _emscripten_glStencilOp = _glStencilOp;

/** @suppress {duplicate } */ var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;

/** @suppress {duplicate } */ function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
 pixels >>>= 0;
 if (true) {
  if (GLctx.currentPixelUnpackBufferBinding) {
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
   return;
  }
 }
 var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
 GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
}

var _emscripten_glTexImage2D = _glTexImage2D;

/** @suppress {duplicate } */ function _glTexImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels) {
 pixels >>>= 0;
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
 } else if (pixels) {
  var heap = heapObjectForWebGLType(type);
  var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height * depth, pixels, internalFormat);
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixelData);
 } else {
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
 }
}

var _emscripten_glTexImage3D = _glTexImage3D;

/** @suppress {duplicate } */ var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);

var _emscripten_glTexParameterf = _glTexParameterf;

/** @suppress {duplicate } */ function _glTexParameterfv(target, pname, params) {
 params >>>= 0;
 var param = HEAPF32[((params) >>> 2) >>> 0];
 GLctx.texParameterf(target, pname, param);
}

var _emscripten_glTexParameterfv = _glTexParameterfv;

/** @suppress {duplicate } */ var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

var _emscripten_glTexParameteri = _glTexParameteri;

/** @suppress {duplicate } */ function _glTexParameteriv(target, pname, params) {
 params >>>= 0;
 var param = HEAP32[((params) >>> 2) >>> 0];
 GLctx.texParameteri(target, pname, param);
}

var _emscripten_glTexParameteriv = _glTexParameteriv;

/** @suppress {duplicate } */ var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);

var _emscripten_glTexStorage2D = _glTexStorage2D;

/** @suppress {duplicate } */ var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);

var _emscripten_glTexStorage3D = _glTexStorage3D;

/** @suppress {duplicate } */ function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
 pixels >>>= 0;
 if (true) {
  if (GLctx.currentPixelUnpackBufferBinding) {
   GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
   return;
  }
 }
 var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
 GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
}

var _emscripten_glTexSubImage2D = _glTexSubImage2D;

/** @suppress {duplicate } */ function _glTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) {
 pixels >>>= 0;
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
 } else if (pixels) {
  var heap = heapObjectForWebGLType(type);
  GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
 } else {
  GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
 }
}

var _emscripten_glTexSubImage3D = _glTexSubImage3D;

/** @suppress {duplicate } */ function _glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
 varyings >>>= 0;
 program = GL.programs[program];
 var vars = [];
 for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAP32[(((varyings) + (i * 4)) >>> 2) >>> 0]));
 GLctx.transformFeedbackVaryings(program, vars, bufferMode);
}

var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;

/** @suppress {duplicate } */ var _glUniform1f = (location, v0) => {
 GLctx.uniform1f(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1f = _glUniform1f;

/** @suppress {duplicate } */ function _glUniform1fv(location, count, value) {
 value >>>= 0;
 if (count <= 288) {
  var view = miniTempWebGLFloatBuffers[count - 1];
  for (var i = 0; i < count; ++i) {
   view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 4) >>> 2) >>> 0);
 }
 GLctx.uniform1fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform1fv = _glUniform1fv;

/** @suppress {duplicate } */ var _glUniform1i = (location, v0) => {
 GLctx.uniform1i(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1i = _glUniform1i;

/** @suppress {duplicate } */ function _glUniform1iv(location, count, value) {
 value >>>= 0;
 if (count <= 288) {
  var view = miniTempWebGLIntBuffers[count - 1];
  for (var i = 0; i < count; ++i) {
   view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 4) >>> 2) >>> 0);
 }
 GLctx.uniform1iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform1iv = _glUniform1iv;

/** @suppress {duplicate } */ var _glUniform1ui = (location, v0) => {
 GLctx.uniform1ui(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1ui = _glUniform1ui;

/** @suppress {duplicate } */ function _glUniform1uiv(location, count, value) {
 value >>>= 0;
 count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count);
}

var _emscripten_glUniform1uiv = _glUniform1uiv;

/** @suppress {duplicate } */ var _glUniform2f = (location, v0, v1) => {
 GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2f = _glUniform2f;

/** @suppress {duplicate } */ function _glUniform2fv(location, count, value) {
 value >>>= 0;
 if (count <= 144) {
  var view = miniTempWebGLFloatBuffers[2 * count - 1];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 8) >>> 2) >>> 0);
 }
 GLctx.uniform2fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform2fv = _glUniform2fv;

/** @suppress {duplicate } */ var _glUniform2i = (location, v0, v1) => {
 GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2i = _glUniform2i;

/** @suppress {duplicate } */ function _glUniform2iv(location, count, value) {
 value >>>= 0;
 if (count <= 144) {
  var view = miniTempWebGLIntBuffers[2 * count - 1];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 8) >>> 2) >>> 0);
 }
 GLctx.uniform2iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform2iv = _glUniform2iv;

/** @suppress {duplicate } */ var _glUniform2ui = (location, v0, v1) => {
 GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2ui = _glUniform2ui;

/** @suppress {duplicate } */ function _glUniform2uiv(location, count, value) {
 value >>>= 0;
 count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count * 2);
}

var _emscripten_glUniform2uiv = _glUniform2uiv;

/** @suppress {duplicate } */ var _glUniform3f = (location, v0, v1, v2) => {
 GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3f = _glUniform3f;

var miniTempWebGLFloatBuffers = [];

/** @suppress {duplicate } */ function _glUniform3fv(location, count, value) {
 value >>>= 0;
 if (count <= 96) {
  var view = miniTempWebGLFloatBuffers[3 * count - 1];
  for (var i = 0; i < 3 * count; i += 3) {
   view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
   view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 12) >>> 2) >>> 0);
 }
 GLctx.uniform3fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform3fv = _glUniform3fv;

/** @suppress {duplicate } */ var _glUniform3i = (location, v0, v1, v2) => {
 GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3i = _glUniform3i;

/** @suppress {duplicate } */ function _glUniform3iv(location, count, value) {
 value >>>= 0;
 if (count <= 96) {
  var view = miniTempWebGLIntBuffers[3 * count - 1];
  for (var i = 0; i < 3 * count; i += 3) {
   view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
   view[i + 2] = HEAP32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 12) >>> 2) >>> 0);
 }
 GLctx.uniform3iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform3iv = _glUniform3iv;

/** @suppress {duplicate } */ var _glUniform3ui = (location, v0, v1, v2) => {
 GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3ui = _glUniform3ui;

/** @suppress {duplicate } */ function _glUniform3uiv(location, count, value) {
 value >>>= 0;
 count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count * 3);
}

var _emscripten_glUniform3uiv = _glUniform3uiv;

/** @suppress {duplicate } */ var _glUniform4f = (location, v0, v1, v2, v3) => {
 GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4f = _glUniform4f;

/** @suppress {duplicate } */ function _glUniform4fv(location, count, value) {
 value >>>= 0;
 if (count <= 72) {
  var view = miniTempWebGLFloatBuffers[4 * count - 1];
  var heap = HEAPF32;
  value = ((value) >>> 2);
  for (var i = 0; i < 4 * count; i += 4) {
   var dst = value + i;
   view[i] = heap[dst >>> 0];
   view[i + 1] = heap[dst + 1 >>> 0];
   view[i + 2] = heap[dst + 2 >>> 0];
   view[i + 3] = heap[dst + 3 >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 16) >>> 2) >>> 0);
 }
 GLctx.uniform4fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform4fv = _glUniform4fv;

/** @suppress {duplicate } */ var _glUniform4i = (location, v0, v1, v2, v3) => {
 GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4i = _glUniform4i;

/** @suppress {duplicate } */ function _glUniform4iv(location, count, value) {
 value >>>= 0;
 if (count <= 72) {
  var view = miniTempWebGLIntBuffers[4 * count - 1];
  for (var i = 0; i < 4 * count; i += 4) {
   view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
   view[i + 2] = HEAP32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
   view[i + 3] = HEAP32[(((value) + (4 * i + 12)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 16) >>> 2) >>> 0);
 }
 GLctx.uniform4iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform4iv = _glUniform4iv;

/** @suppress {duplicate } */ var _glUniform4ui = (location, v0, v1, v2, v3) => {
 GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4ui = _glUniform4ui;

/** @suppress {duplicate } */ function _glUniform4uiv(location, count, value) {
 value >>>= 0;
 count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count * 4);
}

var _emscripten_glUniform4uiv = _glUniform4uiv;

/** @suppress {duplicate } */ var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
 program = GL.programs[program];
 GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
};

var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;

/** @suppress {duplicate } */ function _glUniformMatrix2fv(location, count, transpose, value) {
 value >>>= 0;
 if (count <= 72) {
  var view = miniTempWebGLFloatBuffers[4 * count - 1];
  for (var i = 0; i < 4 * count; i += 4) {
   view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
   view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
   view[i + 3] = HEAPF32[(((value) + (4 * i + 12)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 16) >>> 2) >>> 0);
 }
 GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
}

var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;

/** @suppress {duplicate } */ function _glUniformMatrix2x3fv(location, count, transpose, value) {
 value >>>= 0;
 count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 6);
}

var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;

/** @suppress {duplicate } */ function _glUniformMatrix2x4fv(location, count, transpose, value) {
 value >>>= 0;
 count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 8);
}

var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;

/** @suppress {duplicate } */ function _glUniformMatrix3fv(location, count, transpose, value) {
 value >>>= 0;
 if (count <= 32) {
  var view = miniTempWebGLFloatBuffers[9 * count - 1];
  for (var i = 0; i < 9 * count; i += 9) {
   view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
   view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
   view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
   view[i + 3] = HEAPF32[(((value) + (4 * i + 12)) >>> 2) >>> 0];
   view[i + 4] = HEAPF32[(((value) + (4 * i + 16)) >>> 2) >>> 0];
   view[i + 5] = HEAPF32[(((value) + (4 * i + 20)) >>> 2) >>> 0];
   view[i + 6] = HEAPF32[(((value) + (4 * i + 24)) >>> 2) >>> 0];
   view[i + 7] = HEAPF32[(((value) + (4 * i + 28)) >>> 2) >>> 0];
   view[i + 8] = HEAPF32[(((value) + (4 * i + 32)) >>> 2) >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 36) >>> 2) >>> 0);
 }
 GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
}

var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;

/** @suppress {duplicate } */ function _glUniformMatrix3x2fv(location, count, transpose, value) {
 value >>>= 0;
 count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 6);
}

var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;

/** @suppress {duplicate } */ function _glUniformMatrix3x4fv(location, count, transpose, value) {
 value >>>= 0;
 count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 12);
}

var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;

/** @suppress {duplicate } */ function _glUniformMatrix4fv(location, count, transpose, value) {
 value >>>= 0;
 if (count <= 18) {
  var view = miniTempWebGLFloatBuffers[16 * count - 1];
  var heap = HEAPF32;
  value = ((value) >>> 2);
  for (var i = 0; i < 16 * count; i += 16) {
   var dst = value + i;
   view[i] = heap[dst >>> 0];
   view[i + 1] = heap[dst + 1 >>> 0];
   view[i + 2] = heap[dst + 2 >>> 0];
   view[i + 3] = heap[dst + 3 >>> 0];
   view[i + 4] = heap[dst + 4 >>> 0];
   view[i + 5] = heap[dst + 5 >>> 0];
   view[i + 6] = heap[dst + 6 >>> 0];
   view[i + 7] = heap[dst + 7 >>> 0];
   view[i + 8] = heap[dst + 8 >>> 0];
   view[i + 9] = heap[dst + 9 >>> 0];
   view[i + 10] = heap[dst + 10 >>> 0];
   view[i + 11] = heap[dst + 11 >>> 0];
   view[i + 12] = heap[dst + 12 >>> 0];
   view[i + 13] = heap[dst + 13 >>> 0];
   view[i + 14] = heap[dst + 14 >>> 0];
   view[i + 15] = heap[dst + 15 >>> 0];
  }
 } else {
  var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 64) >>> 2) >>> 0);
 }
 GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
}

var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;

/** @suppress {duplicate } */ function _glUniformMatrix4x2fv(location, count, transpose, value) {
 value >>>= 0;
 count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 8);
}

var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;

/** @suppress {duplicate } */ function _glUniformMatrix4x3fv(location, count, transpose, value) {
 value >>>= 0;
 count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 12);
}

var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;

/** @suppress {duplicate } */ var _glUseProgram = program => {
 program = GL.programs[program];
 GLctx.useProgram(program);
 GLctx.currentProgram = program;
};

var _emscripten_glUseProgram = _glUseProgram;

/** @suppress {duplicate } */ var _glValidateProgram = program => {
 GLctx.validateProgram(GL.programs[program]);
};

var _emscripten_glValidateProgram = _glValidateProgram;

/** @suppress {duplicate } */ var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);

var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;

/** @suppress {duplicate } */ function _glVertexAttrib1fv(index, v) {
 v >>>= 0;
 GLctx.vertexAttrib1f(index, HEAPF32[v >>> 2]);
}

var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;

/** @suppress {duplicate } */ var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);

var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;

/** @suppress {duplicate } */ function _glVertexAttrib2fv(index, v) {
 v >>>= 0;
 GLctx.vertexAttrib2f(index, HEAPF32[v >>> 2], HEAPF32[v + 4 >>> 2]);
}

var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;

/** @suppress {duplicate } */ var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);

var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;

/** @suppress {duplicate } */ function _glVertexAttrib3fv(index, v) {
 v >>>= 0;
 GLctx.vertexAttrib3f(index, HEAPF32[v >>> 2], HEAPF32[v + 4 >>> 2], HEAPF32[v + 8 >>> 2]);
}

var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;

/** @suppress {duplicate } */ var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;

/** @suppress {duplicate } */ function _glVertexAttrib4fv(index, v) {
 v >>>= 0;
 GLctx.vertexAttrib4f(index, HEAPF32[v >>> 2], HEAPF32[v + 4 >>> 2], HEAPF32[v + 8 >>> 2], HEAPF32[v + 12 >>> 2]);
}

var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;

/** @suppress {duplicate } */ var _glVertexAttribDivisor = (index, divisor) => {
 GLctx.vertexAttribDivisor(index, divisor);
};

var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;

/** @suppress {duplicate } */ var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;

/** @suppress {duplicate } */ var _glVertexAttribDivisorARB = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorARB = _glVertexAttribDivisorARB;

/** @suppress {duplicate } */ var _glVertexAttribDivisorEXT = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorEXT = _glVertexAttribDivisorEXT;

/** @suppress {duplicate } */ var _glVertexAttribDivisorNV = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorNV = _glVertexAttribDivisorNV;

/** @suppress {duplicate } */ var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;

/** @suppress {duplicate } */ function _glVertexAttribI4iv(index, v) {
 v >>>= 0;
 GLctx.vertexAttribI4i(index, HEAP32[v >>> 2], HEAP32[v + 4 >>> 2], HEAP32[v + 8 >>> 2], HEAP32[v + 12 >>> 2]);
}

var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;

/** @suppress {duplicate } */ var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;

/** @suppress {duplicate } */ function _glVertexAttribI4uiv(index, v) {
 v >>>= 0;
 GLctx.vertexAttribI4ui(index, HEAPU32[v >>> 2], HEAPU32[v + 4 >>> 2], HEAPU32[v + 8 >>> 2], HEAPU32[v + 12 >>> 2]);
}

var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;

/** @suppress {duplicate } */ function _glVertexAttribIPointer(index, size, type, stride, ptr) {
 ptr >>>= 0;
 GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
}

var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;

/** @suppress {duplicate } */ function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
 ptr >>>= 0;
 GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
}

var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;

/** @suppress {duplicate } */ var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);

var _emscripten_glViewport = _glViewport;

/** @suppress {duplicate } */ function _glWaitSync(sync, flags, timeout) {
 sync >>>= 0;
 timeout = Number(timeout);
 GLctx.waitSync(GL.syncs[sync], flags, timeout);
}

var _emscripten_glWaitSync = _glWaitSync;

var _emscripten_has_asyncify = () => 0;

function _emscripten_out(str) {
 str >>>= 0;
 return out(UTF8ToString(str));
}

var doRequestFullscreen = (target, strategy) => {
 if (!JSEvents.fullscreenEnabled()) return -1;
 target = findEventTarget(target);
 if (!target) return -4;
 if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
  return -3;
 }
 var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
 if (!canPerformRequests) {
  if (strategy.deferUntilInEventHandler) {
   JSEvents.deferCall(JSEvents_requestFullscreen, 1, /* priority over pointer lock */ [ target, strategy ]);
   return 1;
  }
  return -2;
 }
 return JSEvents_requestFullscreen(target, strategy);
};

function _emscripten_request_fullscreen_strategy(target, deferUntilInEventHandler, fullscreenStrategy) {
 target >>>= 0;
 fullscreenStrategy >>>= 0;
 var strategy = {
  scaleMode: HEAP32[((fullscreenStrategy) >>> 2) >>> 0],
  canvasResolutionScaleMode: HEAP32[(((fullscreenStrategy) + (4)) >>> 2) >>> 0],
  filteringMode: HEAP32[(((fullscreenStrategy) + (8)) >>> 2) >>> 0],
  deferUntilInEventHandler: deferUntilInEventHandler,
  canvasResizedCallback: HEAP32[(((fullscreenStrategy) + (12)) >>> 2) >>> 0],
  canvasResizedCallbackUserData: HEAP32[(((fullscreenStrategy) + (16)) >>> 2) >>> 0]
 };
 return doRequestFullscreen(target, strategy);
}

function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
 target >>>= 0;
 target = findEventTarget(target);
 if (!target) return -4;
 if (!target.requestPointerLock) {
  return -1;
 }
 var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
 if (!canPerformRequests) {
  if (deferUntilInEventHandler) {
   JSEvents.deferCall(requestPointerLock, 2, /* priority below fullscreen */ [ target ]);
   return 1;
  }
  return -2;
 }
 return requestPointerLock(target);
}

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = (size - b.byteLength + 65535) / 65536;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } /*success*/ catch (e) {}
};

function _emscripten_resize_heap(requestedSize) {
 requestedSize >>>= 0;
 var oldSize = HEAPU8.length;
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = growMemory(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
}

/** @suppress {checkTypes} */ var _emscripten_sample_gamepad_data = () => {
 try {
  if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1;
 } catch (e) {
  navigator.getGamepads = null;
 }
 return -1;
};

var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
 var beforeUnloadEventHandlerFunc = (e = event) => {
  var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
  if (confirmationMessage) {
   confirmationMessage = UTF8ToString(confirmationMessage);
  }
  if (confirmationMessage) {
   e.preventDefault();
   e.returnValue = confirmationMessage;
   return confirmationMessage;
  }
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: beforeUnloadEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_beforeunload_callback_on_thread(userData, callbackfunc, targetThread) {
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 if (typeof onbeforeunload == "undefined") return -1;
 if (targetThread !== 1) return -5;
 return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
}

var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc(256);
 var focusEventHandlerFunc = (e = event) => {
  var nodeName = JSEvents.getNodeNameForTarget(e.target);
  var id = e.target.id ? e.target.id : "";
  var focusEvent = JSEvents.focusEvent;
  stringToUTF8(nodeName, focusEvent + 0, 128);
  stringToUTF8(id, focusEvent + 128, 128);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: focusEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
}

var fillDeviceMotionEventData = (eventStruct, e, target) => {
 var supportedFields = 0;
 var a = e["acceleration"];
 supportedFields |= a && 1;
 var ag = e["accelerationIncludingGravity"];
 supportedFields |= ag && 2;
 var rr = e["rotationRate"];
 supportedFields |= rr && 4;
 a = a || {};
 ag = ag || {};
 rr = rr || {};
 HEAPF64[((eventStruct) >>> 3) >>> 0] = a["x"];
 HEAPF64[(((eventStruct) + (8)) >>> 3) >>> 0] = a["y"];
 HEAPF64[(((eventStruct) + (16)) >>> 3) >>> 0] = a["z"];
 HEAPF64[(((eventStruct) + (24)) >>> 3) >>> 0] = ag["x"];
 HEAPF64[(((eventStruct) + (32)) >>> 3) >>> 0] = ag["y"];
 HEAPF64[(((eventStruct) + (40)) >>> 3) >>> 0] = ag["z"];
 HEAPF64[(((eventStruct) + (48)) >>> 3) >>> 0] = rr["alpha"];
 HEAPF64[(((eventStruct) + (56)) >>> 3) >>> 0] = rr["beta"];
 HEAPF64[(((eventStruct) + (64)) >>> 3) >>> 0] = rr["gamma"];
};

var registerDeviceMotionEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.deviceMotionEvent) JSEvents.deviceMotionEvent = _malloc(80);
 var deviceMotionEventHandlerFunc = (e = event) => {
  fillDeviceMotionEventData(JSEvents.deviceMotionEvent, e, target);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.deviceMotionEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: deviceMotionEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_devicemotion_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerDeviceMotionEventCallback(2, userData, useCapture, callbackfunc, 17, "devicemotion", targetThread);
}

function _emscripten_set_element_css_size(target, width, height) {
 target >>>= 0;
 target = findEventTarget(target);
 if (!target) return -4;
 target.style.width = width + "px";
 target.style.height = height + "px";
 return 0;
}

function _emscripten_set_focus_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
}

var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.fullscreenChangeEvent) JSEvents.fullscreenChangeEvent = _malloc(280);
 var fullscreenChangeEventhandlerFunc = (e = event) => {
  var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
  fillFullscreenChangeEventData(fullscreenChangeEvent);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: fullscreenChangeEventhandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 if (!JSEvents.fullscreenEnabled()) return -1;
 target = findEventTarget(target);
 if (!target) return -4;
 registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
 return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
}

var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.gamepadEvent) JSEvents.gamepadEvent = _malloc(1432);
 var gamepadEventHandlerFunc = (e = event) => {
  var gamepadEvent = JSEvents.gamepadEvent;
  fillGamepadEventData(gamepadEvent, e["gamepad"]);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  allowsDeferredCalls: true,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: gamepadEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 if (_emscripten_sample_gamepad_data()) return -1;
 return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
}

function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 if (_emscripten_sample_gamepad_data()) return -1;
 return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
}

var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(176);
 var keyEventHandlerFunc = e => {
  var keyEventData = JSEvents.keyEvent;
  HEAPF64[((keyEventData) >>> 3) >>> 0] = e.timeStamp;
  var idx = ((keyEventData) >>> 2);
  HEAP32[idx + 2 >>> 0] = e.location;
  HEAP32[idx + 3 >>> 0] = e.ctrlKey;
  HEAP32[idx + 4 >>> 0] = e.shiftKey;
  HEAP32[idx + 5 >>> 0] = e.altKey;
  HEAP32[idx + 6 >>> 0] = e.metaKey;
  HEAP32[idx + 7 >>> 0] = e.repeat;
  HEAP32[idx + 8 >>> 0] = e.charCode;
  HEAP32[idx + 9 >>> 0] = e.keyCode;
  HEAP32[idx + 10 >>> 0] = e.which;
  stringToUTF8(e.key || "", keyEventData + 44, 32);
  stringToUTF8(e.code || "", keyEventData + 76, 32);
  stringToUTF8(e.char || "", keyEventData + 108, 32);
  stringToUTF8(e.locale || "", keyEventData + 140, 32);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: keyEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
}

function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
}

function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
}

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
 func >>>= 0;
 var browserIterationFunc = getWasmTableEntry(func);
 setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
}

var screenOrientation = () => {
 if (!window.screen) return undefined;
 return screen.orientation || screen["mozOrientation"] || screen["webkitOrientation"];
};

var fillOrientationChangeEventData = eventStruct => {
 var orientationsType1 = [ "portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary" ];
 var orientationsType2 = [ "portrait", "portrait", "landscape", "landscape" ];
 var orientationIndex = 0;
 var orientationAngle = 0;
 var screenOrientObj = screenOrientation();
 if (typeof screenOrientObj === "object") {
  orientationIndex = orientationsType1.indexOf(screenOrientObj.type);
  if (orientationIndex < 0) {
   orientationIndex = orientationsType2.indexOf(screenOrientObj.type);
  }
  if (orientationIndex >= 0) {
   orientationIndex = 1 << orientationIndex;
  }
  orientationAngle = screenOrientObj.angle;
 } else {
  orientationAngle = window.orientation;
 }
 HEAP32[((eventStruct) >>> 2) >>> 0] = orientationIndex;
 HEAP32[(((eventStruct) + (4)) >>> 2) >>> 0] = orientationAngle;
};

var registerOrientationChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.orientationChangeEvent) JSEvents.orientationChangeEvent = _malloc(8);
 var orientationChangeEventHandlerFunc = (e = event) => {
  var orientationChangeEvent = JSEvents.orientationChangeEvent;
  fillOrientationChangeEventData(orientationChangeEvent);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, orientationChangeEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: orientationChangeEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_orientationchange_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 if (!window.screen || !screen.orientation) return -1;
 return registerOrientationChangeEventCallback(screen.orientation, userData, useCapture, callbackfunc, 18, "change", targetThread);
}

var fillPointerlockChangeEventData = eventStruct => {
 var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
 var isPointerlocked = !!pointerLockElement;
 /** @suppress{checkTypes} */ HEAP32[((eventStruct) >>> 2) >>> 0] = isPointerlocked;
 var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
 var id = pointerLockElement?.id || "";
 stringToUTF8(nodeName, eventStruct + 4, 128);
 stringToUTF8(id, eventStruct + 132, 128);
};

var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.pointerlockChangeEvent) JSEvents.pointerlockChangeEvent = _malloc(260);
 var pointerlockChangeEventHandlerFunc = (e = event) => {
  var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
  fillPointerlockChangeEventData(pointerlockChangeEvent);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: pointerlockChangeEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

/** @suppress {missingProperties} */ function _emscripten_set_pointerlockchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
  return -1;
 }
 target = findEventTarget(target);
 if (!target) return -4;
 registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
 registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
 registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
 return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
}

var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.uiEvent) JSEvents.uiEvent = _malloc(36);
 target = findEventTarget(target);
 var uiEventHandlerFunc = (e = event) => {
  if (e.target != target) {
   return;
  }
  var b = document.body;
  if (!b) {
   return;
  }
  var uiEvent = JSEvents.uiEvent;
  HEAP32[((uiEvent) >>> 2) >>> 0] = 0;
  HEAP32[(((uiEvent) + (4)) >>> 2) >>> 0] = b.clientWidth;
  HEAP32[(((uiEvent) + (8)) >>> 2) >>> 0] = b.clientHeight;
  HEAP32[(((uiEvent) + (12)) >>> 2) >>> 0] = innerWidth;
  HEAP32[(((uiEvent) + (16)) >>> 2) >>> 0] = innerHeight;
  HEAP32[(((uiEvent) + (20)) >>> 2) >>> 0] = outerWidth;
  HEAP32[(((uiEvent) + (24)) >>> 2) >>> 0] = outerHeight;
  HEAP32[(((uiEvent) + (28)) >>> 2) >>> 0] = pageXOffset | 0;
  HEAP32[(((uiEvent) + (32)) >>> 2) >>> 0] = pageYOffset | 0;
  if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: uiEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_resize_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
}

var _emscripten_set_timeout = function(cb, msecs, userData) {
 cb >>>= 0;
 userData >>>= 0;
 return safeSetTimeout(() => getWasmTableEntry(cb)(userData), msecs);
};

var fillVisibilityChangeEventData = eventStruct => {
 var visibilityStates = [ "hidden", "visible", "prerender", "unloaded" ];
 var visibilityState = visibilityStates.indexOf(document.visibilityState);
 /** @suppress{checkTypes} */ HEAP32[((eventStruct) >>> 2) >>> 0] = document.hidden;
 HEAP32[(((eventStruct) + (4)) >>> 2) >>> 0] = visibilityState;
};

var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.visibilityChangeEvent) JSEvents.visibilityChangeEvent = _malloc(8);
 var visibilityChangeEventHandlerFunc = (e = event) => {
  var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
  fillVisibilityChangeEventData(visibilityChangeEvent);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: visibilityChangeEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_visibilitychange_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 return registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
}

var fillMouseEventData = (eventStruct, e, target) => {
 HEAPF64[((eventStruct) >>> 3) >>> 0] = e.timeStamp;
 var idx = ((eventStruct) >>> 2);
 HEAP32[idx + 2 >>> 0] = e.screenX;
 HEAP32[idx + 3 >>> 0] = e.screenY;
 HEAP32[idx + 4 >>> 0] = e.clientX;
 HEAP32[idx + 5 >>> 0] = e.clientY;
 HEAP32[idx + 6 >>> 0] = e.ctrlKey;
 HEAP32[idx + 7 >>> 0] = e.shiftKey;
 HEAP32[idx + 8 >>> 0] = e.altKey;
 HEAP32[idx + 9 >>> 0] = e.metaKey;
 HEAP16[idx * 2 + 20 >>> 0] = e.button;
 HEAP16[idx * 2 + 21 >>> 0] = e.buttons;
 HEAP32[idx + 11 >>> 0] = e["movementX"];
 HEAP32[idx + 12 >>> 0] = e["movementY"];
 var rect = getBoundingClientRect(target);
 HEAP32[idx + 13 >>> 0] = e.clientX - (rect.left | 0);
 HEAP32[idx + 14 >>> 0] = e.clientY - (rect.top | 0);
};

var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(104);
 var wheelHandlerFunc = (e = event) => {
  var wheelEvent = JSEvents.wheelEvent;
  fillMouseEventData(wheelEvent, e, target);
  HEAPF64[(((wheelEvent) + (72)) >>> 3) >>> 0] = e["deltaX"];
  HEAPF64[(((wheelEvent) + (80)) >>> 3) >>> 0] = e["deltaY"];
  HEAPF64[(((wheelEvent) + (88)) >>> 3) >>> 0] = e["deltaZ"];
  HEAP32[(((wheelEvent) + (96)) >>> 2) >>> 0] = e["deltaMode"];
  if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  allowsDeferredCalls: true,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: wheelHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
 target >>>= 0;
 userData >>>= 0;
 callbackfunc >>>= 0;
 targetThread >>>= 0;
 target = findEventTarget(target);
 if (!target) return -4;
 if (typeof target.onwheel != "undefined") {
  return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
 } else {
  return -1;
 }
}

function _emscripten_set_window_title(title) {
 title >>>= 0;
 return document.title = UTF8ToString(title);
}

var _emscripten_sleep = () => {
 throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep";
};

var webglPowerPreferences = [ "default", "low-power", "high-performance" ];

/** @suppress {duplicate } */ function _emscripten_webgl_do_create_context(target, attributes) {
 target >>>= 0;
 attributes >>>= 0;
 var a = ((attributes) >>> 2);
 var powerPreference = HEAP32[a + (24 >> 2) >>> 0];
 var contextAttributes = {
  "alpha": !!HEAP32[a + (0 >> 2) >>> 0],
  "depth": !!HEAP32[a + (4 >> 2) >>> 0],
  "stencil": !!HEAP32[a + (8 >> 2) >>> 0],
  "antialias": !!HEAP32[a + (12 >> 2) >>> 0],
  "premultipliedAlpha": !!HEAP32[a + (16 >> 2) >>> 0],
  "preserveDrawingBuffer": true,
  "powerPreference": webglPowerPreferences[powerPreference],
  "failIfMajorPerformanceCaveat": !!HEAP32[a + (28 >> 2) >>> 0],
  majorVersion: HEAP32[a + (32 >> 2) >>> 0],
  minorVersion: HEAP32[a + (36 >> 2) >>> 0],
  enableExtensionsByDefault: HEAP32[a + (40 >> 2) >>> 0],
  explicitSwapControl: HEAP32[a + (44 >> 2) >>> 0],
  proxyContextToMainThread: HEAP32[a + (48 >> 2) >>> 0],
  renderViaOffscreenBackBuffer: HEAP32[a + (52 >> 2) >>> 0]
 };
 var canvas = findCanvasEventTarget(target);
 if (!canvas) {
  return 0;
 }
 if (contextAttributes.explicitSwapControl) {
  return 0;
 }
 var contextHandle = GL.createContext(canvas, contextAttributes);
 return contextHandle;
}

var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

function _emscripten_webgl_destroy_context(contextHandle) {
 contextHandle >>>= 0;
 if (GL.currentContext == contextHandle) GL.currentContext = 0;
 GL.deleteContext(contextHandle);
}

function _emscripten_webgl_make_context_current(contextHandle) {
 contextHandle >>>= 0;
 var success = GL.makeContextCurrent(contextHandle);
 return success ? 0 : -5;
}

var ENV = {};

var getExecutableName = () => thisProgram || "./this.program";

var getEnvStrings = () => {
 if (!getEnvStrings.strings) {
  var lang = ((typeof navigator == "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(`${x}=${env[x]}`);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
 for (var i = 0; i < str.length; ++i) {
  HEAP8[buffer++ >>> 0] = str.charCodeAt(i);
 }
 HEAP8[buffer >>> 0] = 0;
};

var _environ_get = function(__environ, environ_buf) {
 __environ >>>= 0;
 environ_buf >>>= 0;
 var bufSize = 0;
 getEnvStrings().forEach((string, i) => {
  var ptr = environ_buf + bufSize;
  HEAPU32[(((__environ) + (i * 4)) >>> 2) >>> 0] = ptr;
  stringToAscii(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
};

var _environ_sizes_get = function(penviron_count, penviron_buf_size) {
 penviron_count >>>= 0;
 penviron_buf_size >>>= 0;
 var strings = getEnvStrings();
 HEAPU32[((penviron_count) >>> 2) >>> 0] = strings.length;
 var bufSize = 0;
 strings.forEach(string => bufSize += string.length + 1);
 HEAPU32[((penviron_buf_size) >>> 2) >>> 0] = bufSize;
 return 0;
};

var initRandomFill = () => {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => crypto.getRandomValues(view);
 } else  abort("initRandomDevice");
};

var randomFill = view => (randomFill = initRandomFill())(view);

function _getentropy(buffer, size) {
 buffer >>>= 0;
 size >>>= 0;
 randomFill(HEAPU8.subarray(buffer >>> 0, buffer + size >>> 0));
 return 0;
}

var DOTNET = {
 setup: function setup(emscriptenBuildOptions) {
  const modulePThread = {};
  const ENVIRONMENT_IS_PTHREAD = false;
  const dotnet_replacements = {
   fetch: globalThis.fetch,
   ENVIRONMENT_IS_WORKER: ENVIRONMENT_IS_WORKER,
   require: require,
   modulePThread: modulePThread,
   scriptDirectory: scriptDirectory
  };
  ENVIRONMENT_IS_WORKER = dotnet_replacements.ENVIRONMENT_IS_WORKER;
  Module.__dotnet_runtime.initializeReplacements(dotnet_replacements);
  noExitRuntime = dotnet_replacements.noExitRuntime;
  fetch = dotnet_replacements.fetch;
  require = dotnet_replacements.require;
  _scriptDir = __dirname = scriptDirectory = dotnet_replacements.scriptDirectory;
  Module.__dotnet_runtime.passEmscriptenInternals({
   isPThread: ENVIRONMENT_IS_PTHREAD,
   quit_: quit_,
   ExitStatus: ExitStatus,
   updateMemoryViews: updateMemoryViews,
   getMemory: () => wasmMemory,
   getWasmIndirectFunctionTable: () => wasmTable
  }, emscriptenBuildOptions);
  Module.__dotnet_runtime.configureEmscriptenStartup(Module);
 }
};

function _mono_interp_flush_jitcall_queue() {
 return {
  runtime_idx: 12
 };
}

function _mono_interp_invoke_wasm_jit_call_trampoline() {
 return {
  runtime_idx: 11
 };
}

function _mono_interp_jit_wasm_entry_trampoline() {
 return {
  runtime_idx: 9
 };
}

function _mono_interp_jit_wasm_jit_call_trampoline() {
 return {
  runtime_idx: 10
 };
}

function _mono_interp_record_interp_entry() {
 return {
  runtime_idx: 8
 };
}

function _mono_interp_tier_prepare_jiterpreter() {
 return {
  runtime_idx: 7
 };
}

function _mono_jiterp_free_method_data_js() {
 return {
  runtime_idx: 13
 };
}

function _mono_wasm_bind_js_import_ST() {
 return {
  runtime_idx: 22
 };
}

function _mono_wasm_browser_entropy() {
 return {
  runtime_idx: 19
 };
}

function _mono_wasm_cancel_promise() {
 return {
  runtime_idx: 26
 };
}

function _mono_wasm_change_case() {
 return {
  runtime_idx: 27
 };
}

function _mono_wasm_compare_string() {
 return {
  runtime_idx: 28
 };
}

function _mono_wasm_console_clear() {
 return {
  runtime_idx: 20
 };
}

function _mono_wasm_ends_with() {
 return {
  runtime_idx: 30
 };
}

function _mono_wasm_get_calendar_info() {
 return {
  runtime_idx: 32
 };
}

function _mono_wasm_get_culture_info() {
 return {
  runtime_idx: 33
 };
}

function _mono_wasm_get_first_day_of_week() {
 return {
  runtime_idx: 34
 };
}

function _mono_wasm_get_first_week_of_year() {
 return {
  runtime_idx: 35
 };
}

function _mono_wasm_get_locale_info() {
 return {
  runtime_idx: 36
 };
}

function _mono_wasm_index_of() {
 return {
  runtime_idx: 31
 };
}

function _mono_wasm_invoke_js_function() {
 return {
  runtime_idx: 23
 };
}

function _mono_wasm_invoke_jsimport_ST() {
 return {
  runtime_idx: 24
 };
}

function _mono_wasm_release_cs_owned_object() {
 return {
  runtime_idx: 21
 };
}

function _mono_wasm_resolve_or_reject_promise() {
 return {
  runtime_idx: 25
 };
}

function _mono_wasm_schedule_timer() {
 return {
  runtime_idx: 0
 };
}

function _mono_wasm_set_entrypoint_breakpoint() {
 return {
  runtime_idx: 17
 };
}

function _mono_wasm_starts_with() {
 return {
  runtime_idx: 29
 };
}

function _mono_wasm_trace_logger() {
 return {
  runtime_idx: 16
 };
}

function _schedule_background_exec() {
 return {
  runtime_idx: 6
 };
}

var arraySum = (array, index) => {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
};

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var addDays = (date, days) => {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= (daysInCurrentMonth - newDate.getDate() + 1);
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
};

var writeArrayToMemory = (array, buffer) => {
 HEAP8.set(array, buffer >>> 0);
};

function _strftime(s, maxsize, format, tm) {
 s >>>= 0;
 maxsize >>>= 0;
 format >>>= 0;
 tm >>>= 0;
 var tm_zone = HEAPU32[(((tm) + (40)) >>> 2) >>> 0];
 var date = {
  tm_sec: HEAP32[((tm) >>> 2) >>> 0],
  tm_min: HEAP32[(((tm) + (4)) >>> 2) >>> 0],
  tm_hour: HEAP32[(((tm) + (8)) >>> 2) >>> 0],
  tm_mday: HEAP32[(((tm) + (12)) >>> 2) >>> 0],
  tm_mon: HEAP32[(((tm) + (16)) >>> 2) >>> 0],
  tm_year: HEAP32[(((tm) + (20)) >>> 2) >>> 0],
  tm_wday: HEAP32[(((tm) + (24)) >>> 2) >>> 0],
  tm_yday: HEAP32[(((tm) + (28)) >>> 2) >>> 0],
  tm_isdst: HEAP32[(((tm) + (32)) >>> 2) >>> 0],
  tm_gmtoff: HEAP32[(((tm) + (36)) >>> 2) >>> 0],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value == "number" ? value.toString() : (value || "");
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : (value > 0 ? 1 : 0);
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   }
   return thisDate.getFullYear();
  }
  return thisDate.getFullYear() - 1;
 }
 var EXPANSION_RULES_2 = {
  "%a": date => WEEKDAYS[date.tm_wday].substring(0, 3),
  "%A": date => WEEKDAYS[date.tm_wday],
  "%b": date => MONTHS[date.tm_mon].substring(0, 3),
  "%B": date => MONTHS[date.tm_mon],
  "%C": date => {
   var year = date.tm_year + 1900;
   return leadingNulls((year / 100) | 0, 2);
  },
  "%d": date => leadingNulls(date.tm_mday, 2),
  "%e": date => leadingSomething(date.tm_mday, 2, " "),
  "%g": date => getWeekBasedYear(date).toString().substring(2),
  "%G": getWeekBasedYear,
  "%H": date => leadingNulls(date.tm_hour, 2),
  "%I": date => {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": date => leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3),
  "%m": date => leadingNulls(date.tm_mon + 1, 2),
  "%M": date => leadingNulls(date.tm_min, 2),
  "%n": () => "\n",
  "%p": date => {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   }
   return "PM";
  },
  "%S": date => leadingNulls(date.tm_sec, 2),
  "%t": () => "\t",
  "%u": date => date.tm_wday || 7,
  "%U": date => {
   var days = date.tm_yday + 7 - date.tm_wday;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%V": date => {
   var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
   if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
    val++;
   }
   if (!val) {
    val = 52;
    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
    if (dec31 == 4 || (dec31 == 5 && isLeapYear(date.tm_year % 400 - 1))) {
     val++;
    }
   } else if (val == 53) {
    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1;
   }
   return leadingNulls(val, 2);
  },
  "%w": date => date.tm_wday,
  "%W": date => {
   var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%y": date => (date.tm_year + 1900).toString().substring(2),
  "%Y": date => date.tm_year + 1900,
  "%z": date => {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = (off / 60) * 100 + (off % 60);
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": date => date.tm_zone,
  "%%": () => "%"
 };
 pattern = pattern.replace(/%%/g, "\0\0");
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.includes(rule)) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 pattern = pattern.replace(/\0\0/g, "%");
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
}

var listenOnce = (object, event, func) => {
 object.addEventListener(event, func, {
  "once": true
 });
};

/** @param {Object=} elements */ var autoResumeAudioContext = (ctx, elements) => {
 if (!elements) {
  elements = [ document, document.getElementById("canvas") ];
 }
 [ "keydown", "mousedown", "touchstart" ].forEach(event => {
  elements.forEach(element => {
   if (element) {
    listenOnce(element, event, () => {
     if (ctx.state === "suspended") ctx.resume();
    });
   }
  });
 });
};

var dynCall = (sig, ptr, args = []) => {
 var rtn = getWasmTableEntry(ptr)(...args);
 return rtn;
};

var MEMFS = {
 createBackend(opts) {
  return _wasmfs_create_memory_backend();
 }
};

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: (...paths) => PATH.normalize(paths.join("/")),
 join2: (l, r) => PATH.normalize(l + "/" + r)
};

var readI53FromI64 = ptr => HEAPU32[((ptr) >>> 2) >>> 0] + HEAP32[(((ptr) + (4)) >>> 2) >>> 0] * 4294967296;

var readI53FromU64 = ptr => HEAPU32[((ptr) >>> 2) >>> 0] + HEAPU32[(((ptr) + (4)) >>> 2) >>> 0] * 4294967296;

var FS_mknod = (path, mode, dev) => FS.handleError(withStackSave(() => {
 var pathBuffer = stringToUTF8OnStack(path);
 return __wasmfs_mknod(pathBuffer, mode, dev);
}));

var FS_create = (path, mode = 438) => {
 /* 0666 */ mode &= 4095;
 mode |= 32768;
 return FS_mknod(path, mode, 0);
};

var FS_writeFile = (path, data) => withStackSave(() => {
 var pathBuffer = stringToUTF8OnStack(path);
 if (typeof data == "string") {
  var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
  var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
  data = buf.slice(0, actualNumBytes);
 }
 var dataBuffer = _malloc(data.length);
 for (var i = 0; i < data.length; i++) {
  HEAP8[(dataBuffer) + (i) >>> 0] = data[i];
 }
 var ret = __wasmfs_write_file(pathBuffer, dataBuffer, data.length);
 _free(dataBuffer);
 return ret;
});

var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
 var pathName = name ? parent + "/" + name : parent;
 var mode = FS_getMode(canRead, canWrite);
 if (!wasmFSPreloadingFlushed) {
  wasmFSPreloadedFiles.push({
   pathName: pathName,
   fileData: fileData,
   mode: mode
  });
 } else {
  FS_create(pathName, mode);
  FS_writeFile(pathName, fileData);
 }
};

/** @param {boolean=} noRunDep */ var asyncLoad = (url, onload, onerror, noRunDep) => {
 var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
 readAsync(url, arrayBuffer => {
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw `Loading data file "${url}" failed.`;
  }
 });
 if (dep) addRunDependency(dep);
};

var PATH_FS = {
 resolve: (...args) => {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = (i >= 0) ? args[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
 if (typeof Browser != "undefined") Browser.init();
 var handled = false;
 preloadPlugins.forEach(plugin => {
  if (handled) return;
  if (plugin["canHandle"](fullname)) {
   plugin["handle"](byteArray, fullname, finish, onerror);
   handled = true;
  }
 });
 return handled;
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
 var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
 var dep = getUniqueRunDependency(`cp ${fullname}`);
 function processData(byteArray) {
  function finish(byteArray) {
   preFinish?.();
   if (!dontCreateFile) {
    FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
   }
   onload?.();
   removeRunDependency(dep);
  }
  if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
   onerror?.();
   removeRunDependency(dep);
  })) {
   return;
  }
  finish(byteArray);
 }
 addRunDependency(dep);
 if (typeof url == "string") {
  asyncLoad(url, processData, onerror);
 } else {
  processData(url);
 }
};

var FS_getMode = (canRead, canWrite) => {
 var mode = 0;
 if (canRead) mode |= 292 | 73;
 if (canWrite) mode |= 146;
 return mode;
};

var FS_modeStringToFlags = str => {
 var flagModes = {
  "r": 0,
  "r+": 2,
  "w": 512 | 64 | 1,
  "w+": 512 | 64 | 2,
  "a": 1024 | 64 | 1,
  "a+": 1024 | 64 | 2
 };
 var flags = flagModes[str];
 if (typeof flags == "undefined") {
  throw new Error(`Unknown file open mode: ${str}`);
 }
 return flags;
};

var FS_mkdir = (path, mode = 511) => /* 0777 */ { try { FS.handleError(withStackSave(() => {
 var buffer = stringToUTF8OnStack(path);
 return __wasmfs_mkdir(buffer, mode);
})); } catch(e) { if (e.errno !== 20) throw e; } };

/**
     * @param {number=} mode Optionally, the mode to create in. Uses mkdir's
     *                       default if not set.
     */ var FS_mkdirTree = (path, mode) => {
 var dirs = path.split("/");
 var d = "";
 for (var i = 0; i < dirs.length; ++i) {
  if (!dirs[i]) continue;
  d += "/" + dirs[i];
  try {
   FS_mkdir(d, mode);
  } catch (e) {
   if (e.errno != 20) throw e;
  }
 }
};

var FS_unlink = path => withStackSave(() => {
 var buffer = stringToUTF8OnStack(path);
 return __wasmfs_unlink(buffer);
});

var wasmFS$backends = {};

var wasmFSDevices = {};

var wasmFSDeviceStreams = {};

var FS = {
 init() {
  FS.ensureErrnoError();
 },
 ErrnoError: null,
 handleError(returnValue) {
  if (returnValue < 0) {
   throw new FS.ErrnoError(-returnValue);
  }
  return returnValue;
 },
 ensureErrnoError() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = /** @this{Object} */ function ErrnoError(code) {
   this.errno = code;
   this.message = "FS error";
   this.name = "ErrnoError";
  };
  FS.ErrnoError.prototype = new Error;
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
 },
 createDataFile(parent, name, fileData, canRead, canWrite, canOwn) {
  FS_createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
 },
 createPath(parent, path, canRead, canWrite) {
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   if (!wasmFSPreloadingFlushed) {
    wasmFSPreloadedDirs.push({
     parentPath: parent,
     childName: part
    });
   } else {
    try{FS.mkdir(current)}catch(e){if(e.errno!==20)throw e};
   }
   parent = current;
  }
  return current;
 },
 createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  return FS_createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish);
 },
 readFile(path, opts = {}) {
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var buf = withStackSave(() => __wasmfs_read_file(stringToUTF8OnStack(path)));
  var length = readI53FromI64(buf);
  var ret = new Uint8Array(HEAPU8.subarray(buf + 8 >>> 0, buf + 8 + length >>> 0));
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(ret, 0);
  }
  return ret;
 },
 cwd: () => UTF8ToString(__wasmfs_get_cwd()),
 analyzePath(path) {
  var exists = !!FS.findObject(path);
  return {
   exists: exists,
   object: {
    contents: exists ? FS.readFile(path) : null
   }
  };
 },
 mkdir: (path, mode) => FS_mkdir(path, mode),
 mkdirTree: (path, mode) => FS_mkdirTree(path, mode),
 rmdir: path => FS.handleError(withStackSave(() => __wasmfs_rmdir(stringToUTF8OnStack(path)))),
 open: (path, flags, mode) => withStackSave(() => {
  flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : /* 0666 */ mode;
  var buffer = stringToUTF8OnStack(path);
  var fd = FS.handleError(__wasmfs_open(buffer, flags, mode));
  return {
   fd: fd
  };
 }),
 create: (path, mode) => FS_create(path, mode),
 close: stream => FS.handleError(-__wasmfs_close(stream.fd)),
 unlink: path => FS_unlink(path),
 chdir: path => withStackSave(() => {
  var buffer = stringToUTF8OnStack(path);
  return __wasmfs_chdir(buffer);
 }),
 read(stream, buffer, offset, length, position) {
  var seeking = typeof position != "undefined";
  var dataBuffer = _malloc(length);
  var bytesRead;
  if (seeking) {
   bytesRead = __wasmfs_pread(stream.fd, dataBuffer, length, position);
  } else {
   bytesRead = __wasmfs_read(stream.fd, dataBuffer, length);
  }
  bytesRead = FS.handleError(bytesRead);
  for (var i = 0; i < length; i++) {
   buffer[offset + i] = HEAP8[(dataBuffer) + (i) >>> 0];
  }
  _free(dataBuffer);
  return bytesRead;
 },
 write(stream, buffer, offset, length, position, canOwn) {
  var seeking = typeof position != "undefined";
  var dataBuffer = _malloc(length);
  for (var i = 0; i < length; i++) {
   HEAP8[(dataBuffer) + (i) >>> 0] = buffer[offset + i];
  }
  var bytesRead;
  if (seeking) {
   bytesRead = __wasmfs_pwrite(stream.fd, dataBuffer, length, position);
  } else {
   bytesRead = __wasmfs_write(stream.fd, dataBuffer, length);
  }
  bytesRead = FS.handleError(bytesRead);
  _free(dataBuffer);
  return bytesRead;
 },
 allocate(stream, offset, length) {
  return FS.handleError(__wasmfs_allocate(stream.fd, BigInt(offset), BigInt(length)));
 },
 writeFile: (path, data) => FS_writeFile(path, data),
 mmap: (stream, length, offset, prot, flags) => {
  var buf = FS.handleError(__wasmfs_mmap(length, prot, flags, stream.fd, BigInt(offset)));
  return {
   ptr: buf,
   allocated: true
  };
 },
 msync: (stream, bufferPtr, offset, length, mmapFlags) => {
  assert(offset === 0);
  return FS.handleError(__wasmfs_msync(bufferPtr, length, mmapFlags));
 },
 munmap: (addr, length) => (FS.handleError(__wasmfs_munmap(addr, length))),
 symlink: (target, linkpath) => withStackSave(() => (__wasmfs_symlink(stringToUTF8OnStack(target), stringToUTF8OnStack(linkpath)))),
 readlink(path) {
  var readBuffer = FS.handleError(withStackSave(() => __wasmfs_readlink(stringToUTF8OnStack(path))));
  return UTF8ToString(readBuffer);
 },
 statBufToObject(statBuf) {
  return {
   dev: HEAPU32[((statBuf) >>> 2) >>> 0],
   mode: HEAPU32[(((statBuf) + (4)) >>> 2) >>> 0],
   nlink: HEAPU32[(((statBuf) + (8)) >>> 2) >>> 0],
   uid: HEAPU32[(((statBuf) + (12)) >>> 2) >>> 0],
   gid: HEAPU32[(((statBuf) + (16)) >>> 2) >>> 0],
   rdev: HEAPU32[(((statBuf) + (20)) >>> 2) >>> 0],
   size: readI53FromI64((statBuf) + (24)),
   blksize: HEAPU32[(((statBuf) + (32)) >>> 2) >>> 0],
   blocks: HEAPU32[(((statBuf) + (36)) >>> 2) >>> 0],
   atime: readI53FromI64((statBuf) + (40)),
   mtime: readI53FromI64((statBuf) + (56)),
   ctime: readI53FromI64((statBuf) + (72)),
   ino: readI53FromU64((statBuf) + (88))
  };
 },
 stat(path) {
  var statBuf = _malloc(96);
  FS.handleError(withStackSave(() => __wasmfs_stat(stringToUTF8OnStack(path), statBuf)));
  var stats = FS.statBufToObject(statBuf);
  _free(statBuf);
  return stats;
 },
 lstat(path) {
  var statBuf = _malloc(96);
  FS.handleError(withStackSave(() => __wasmfs_lstat(stringToUTF8OnStack(path), statBuf)));
  var stats = FS.statBufToObject(statBuf);
  _free(statBuf);
  return stats;
 },
 chmod(path, mode) {
  return FS.handleError(withStackSave(() => {
   var buffer = stringToUTF8OnStack(path);
   return __wasmfs_chmod(buffer, mode);
  }));
 },
 lchmod(path, mode) {
  return FS.handleError(withStackSave(() => {
   var buffer = stringToUTF8OnStack(path);
   return __wasmfs_lchmod(buffer, mode);
  }));
 },
 fchmod(fd, mode) {
  return FS.handleError(__wasmfs_fchmod(fd, mode));
 },
 utime: (path, atime, mtime) => (FS.handleError(withStackSave(() => (__wasmfs_utime(stringToUTF8OnStack(path), atime, mtime))))),
 truncate(path, len) {
  return FS.handleError(withStackSave(() => (__wasmfs_truncate(stringToUTF8OnStack(path), BigInt(len)))));
 },
 ftruncate(fd, len) {
  return FS.handleError(__wasmfs_ftruncate(fd, BigInt(len)));
 },
 findObject(path) {
  var result = withStackSave(() => __wasmfs_identify(stringToUTF8OnStack(path)));
  if (result == 44) {
   return null;
  }
  return {
   isFolder: result == 31,
   isDevice: false
  };
 },
 readdir: path => withStackSave(() => {
  var pathBuffer = stringToUTF8OnStack(path);
  var entries = [];
  var state = __wasmfs_readdir_start(pathBuffer);
  if (!state) {
   throw new Error("No such directory");
  }
  var entry;
  while (entry = __wasmfs_readdir_get(state)) {
   entries.push(UTF8ToString(entry));
  }
  __wasmfs_readdir_finish(state);
  return entries;
 }),
 mount: (type, opts, mountpoint) => {
  var backendPointer = type.createBackend(opts);
  return FS.handleError(withStackSave(() => __wasmfs_mount(stringToUTF8OnStack(mountpoint), backendPointer)));
 },
 unmount: mountpoint => (FS.handleError(withStackSave(() => __wasmfs_unmount(stringToUTF8OnStack(mountpoint))))),
 mknod: (path, mode, dev) => FS_mknod(path, mode, dev),
 makedev: (ma, mi) => ((ma) << 8 | (mi)),
 registerDevice(dev, ops) {
  var backendPointer = _wasmfs_create_jsimpl_backend();
  var definedOps = {
   userRead: ops.read,
   userWrite: ops.write,
   allocFile: file => {
    wasmFSDeviceStreams[file] = {};
   },
   freeFile: file => {
    wasmFSDeviceStreams[file] = undefined;
   },
   getSize: file => {},
   read: (file, buffer, length, offset) => {
    var bufferArray = Module.HEAP8.subarray(buffer, buffer + length);
    try {
     var bytesRead = definedOps.userRead(wasmFSDeviceStreams[file], bufferArray, 0, length, offset);
    } catch (e) {
     return -e.errno;
    }
    Module.HEAP8.set(bufferArray, buffer);
    return bytesRead;
   },
   write: (file, buffer, length, offset) => {
    var bufferArray = Module.HEAP8.subarray(buffer, buffer + length);
    try {
     var bytesWritten = definedOps.userWrite(wasmFSDeviceStreams[file], bufferArray, 0, length, offset);
    } catch (e) {
     return -e.errno;
    }
    Module.HEAP8.set(bufferArray, buffer);
    return bytesWritten;
   }
  };
  wasmFS$backends[backendPointer] = definedOps;
  wasmFSDevices[dev] = backendPointer;
 },
 createDevice(parent, name, input, output) {
  if (typeof parent != "string") {
   throw new Error("Only string paths are accepted");
  }
  var path = PATH.join2(parent, name);
  var mode = FS_getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   read(stream, buffer, offset, length, pos) {
    /* ignored */ var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    return bytesRead;
   },
   write(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 mkdev(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  var deviceBackend = wasmFSDevices[dev];
  if (!deviceBackend) {
   throw new Error("Invalid device ID.");
  }
  return FS.handleError(withStackSave(() => (_wasmfs_create_file(stringToUTF8OnStack(path), mode, deviceBackend))));
 },
 rename(oldPath, newPath) {
  return FS.handleError(withStackSave(() => {
   var oldPathBuffer = stringToUTF8OnStack(oldPath);
   var newPathBuffer = stringToUTF8OnStack(newPath);
   return __wasmfs_rename(oldPathBuffer, newPathBuffer);
  }));
 },
 llseek(stream, offset, whence) {
  return FS.handleError(__wasmfs_llseek(stream.fd, BigInt(offset), whence));
 }
};

var getCFunc = ident => {
 var func = Module["_" + ident];
 return func;
};

/**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */ var ccall = (ident, returnType, argTypes, args, opts) => {
 var toC = {
  "string": str => {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    ret = stringToUTF8OnStack(str);
   }
   return ret;
  },
  "array": arr => {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") {
   return UTF8ToString(ret);
  }
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var ret = func(...cArgs);
 function onDone(ret) {
  if (stack !== 0) stackRestore(stack);
  return convertReturnValue(ret);
 }
 ret = onDone(ret);
 return ret;
};

/**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */ var cwrap = (ident, returnType, argTypes, opts) => {
 var numericArgs = !argTypes || argTypes.every(type => type === "number" || type === "boolean");
 var numericRet = returnType !== "string";
 if (numericRet && numericArgs && !opts) {
  return getCFunc(ident);
 }
 return (...args) => ccall(ident, returnType, argTypes, args, opts);
};

var uleb128Encode = (n, target) => {
 if (n < 128) {
  target.push(n);
 } else {
  target.push((n % 128) | 128, n >> 7);
 }
};

var sigToWasmTypes = sig => {
 var typeNames = {
  "i": "i32",
  "j": "i64",
  "f": "f32",
  "d": "f64",
  "e": "externref",
  "p": "i32"
 };
 var type = {
  parameters: [],
  results: sig[0] == "v" ? [] : [ typeNames[sig[0]] ]
 };
 for (var i = 1; i < sig.length; ++i) {
  type.parameters.push(typeNames[sig[i]]);
 }
 return type;
};

var generateFuncType = (sig, target) => {
 var sigRet = sig.slice(0, 1);
 var sigParam = sig.slice(1);
 var typeCodes = {
  "i": 127,
  "p": 127,
  "j": 126,
  "f": 125,
  "d": 124,
  "e": 111
 };
 target.push(96);
 /* form: func */ uleb128Encode(sigParam.length, target);
 for (var i = 0; i < sigParam.length; ++i) {
  target.push(typeCodes[sigParam[i]]);
 }
 if (sigRet == "v") {
  target.push(0);
 } else {
  target.push(1, typeCodes[sigRet]);
 }
};

var convertJsFunctionToWasm = (func, sig) => {
 if (typeof WebAssembly.Function == "function") {
  return new WebAssembly.Function(sigToWasmTypes(sig), func);
 }
 var typeSectionBody = [ 1 ];
 generateFuncType(sig, typeSectionBody);
 var bytes = [ 0, 97, 115, 109,  1, 0, 0, 0,  1 ];
 uleb128Encode(typeSectionBody.length, bytes);
 bytes.push(...typeSectionBody);
 bytes.push(2, 7,  1, 1, 101, 1, 102, 0, 0, 7, 5,  1, 1, 102, 0, 0);
 var module = new WebAssembly.Module(new Uint8Array(bytes));
 var instance = new WebAssembly.Instance(module, {
  "e": {
   "f": func
  }
 });
 var wrappedFunc = instance.exports["f"];
 return wrappedFunc;
};

var updateTableMap = (offset, count) => {
 if (functionsInTableMap) {
  for (var i = offset; i < offset + count; i++) {
   var item = getWasmTableEntry(i);
   if (item) {
    functionsInTableMap.set(item, i);
   }
  }
 }
};

var functionsInTableMap;

var getFunctionAddress = func => {
 if (!functionsInTableMap) {
  functionsInTableMap = new WeakMap;
  updateTableMap(0, wasmTable.length);
 }
 return functionsInTableMap.get(func) || 0;
};

var freeTableIndexes = [];

var getEmptyTableSlot = () => {
 if (freeTableIndexes.length) {
  return freeTableIndexes.pop();
 }
 try {
  wasmTable.grow(1);
 } catch (err) {
  if (!(err instanceof RangeError)) {
   throw err;
  }
  throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
 }
 return wasmTable.length - 1;
};

var setWasmTableEntry = (idx, func) => {
 wasmTable.set(idx, func);
 wasmTableMirror[idx] = wasmTable.get(idx);
};

/** @param {string=} sig */ var addFunction = (func, sig) => {
 var rtn = getFunctionAddress(func);
 if (rtn) {
  return rtn;
 }
 var ret = getEmptyTableSlot();
 try {
  setWasmTableEntry(ret, func);
 } catch (err) {
  if (!(err instanceof TypeError)) {
   throw err;
  }
  var wrapped = convertJsFunctionToWasm(func, sig);
  setWasmTableEntry(ret, wrapped);
 }
 functionsInTableMap.set(func, ret);
 return ret;
};

Module["requestFullscreen"] = Browser.requestFullscreen;

Module["requestAnimationFrame"] = Browser.requestAnimationFrame;

Module["setCanvasSize"] = Browser.setCanvasSize;

Module["pauseMainLoop"] = Browser.mainLoop.pause;

Module["resumeMainLoop"] = Browser.mainLoop.resume;

Module["getUserMedia"] = Browser.getUserMedia;

Module["createContext"] = Browser.createContext;

var preloadedImages = {};

var preloadedAudios = {};

var GLctx;

for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

for (/**@suppress{duplicate}*/ var i = 0; i < 288; ++i) {
 miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i + 1);
}

DOTNET.setup({
 wasmEnableSIMD: true,
 wasmEnableEH: true,
 enableAotProfiler: false,
 enableBrowserProfiler: false,
 enableLogProfiler: false,
 runAOTCompilation: true,
 wasmEnableThreads: false,
 gitHash: "f2c8152eed158e72950025393fde498c90a57a6b"
});

FS.init();

var wasmImports = {
 /** @export */ SDL_GetEmscriptenJoystickProduct: SDL_GetEmscriptenJoystickProduct,
 /** @export */ SDL_GetEmscriptenJoystickVendor: SDL_GetEmscriptenJoystickVendor,
 /** @export */ SDL_IsEmscriptenJoystickXInput: SDL_IsEmscriptenJoystickXInput,
 /** @export */ __assert_fail: ___assert_fail,
 /** @export */ _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
 /** @export */ _gmtime_js: __gmtime_js,
 /** @export */ _localtime_js: __localtime_js,
 /** @export */ _tzset_js: __tzset_js,
 /** @export */ _wasmfs_copy_preloaded_file_data: __wasmfs_copy_preloaded_file_data,
 /** @export */ _wasmfs_get_num_preloaded_dirs: __wasmfs_get_num_preloaded_dirs,
 /** @export */ _wasmfs_get_num_preloaded_files: __wasmfs_get_num_preloaded_files,
 /** @export */ _wasmfs_get_preloaded_child_path: __wasmfs_get_preloaded_child_path,
 /** @export */ _wasmfs_get_preloaded_file_mode: __wasmfs_get_preloaded_file_mode,
 /** @export */ _wasmfs_get_preloaded_file_size: __wasmfs_get_preloaded_file_size,
 /** @export */ _wasmfs_get_preloaded_parent_path: __wasmfs_get_preloaded_parent_path,
 /** @export */ _wasmfs_get_preloaded_path_name: __wasmfs_get_preloaded_path_name,
 /** @export */ _wasmfs_jsimpl_alloc_file: __wasmfs_jsimpl_alloc_file,
 /** @export */ _wasmfs_jsimpl_free_file: __wasmfs_jsimpl_free_file,
 /** @export */ _wasmfs_jsimpl_get_size: __wasmfs_jsimpl_get_size,
 /** @export */ _wasmfs_jsimpl_read: __wasmfs_jsimpl_read,
 /** @export */ _wasmfs_jsimpl_write: __wasmfs_jsimpl_write,
 /** @export */ _wasmfs_stdin_get_char: __wasmfs_stdin_get_char,
 /** @export */ abort: _abort,
 /** @export */ emscripten_asm_const_double_sync_on_main_thread: _emscripten_asm_const_double_sync_on_main_thread,
 /** @export */ emscripten_asm_const_int: _emscripten_asm_const_int,
 /** @export */ emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
 /** @export */ emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
 /** @export */ emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
 /** @export */ emscripten_clear_timeout: _emscripten_clear_timeout,
 /** @export */ emscripten_console_error: _emscripten_console_error,
 /** @export */ emscripten_date_now: _emscripten_date_now,
 /** @export */ emscripten_err: _emscripten_err,
 /** @export */ emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
 /** @export */ emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
 /** @export */ emscripten_force_exit: _emscripten_force_exit,
 /** @export */ emscripten_get_battery_status: _emscripten_get_battery_status,
 /** @export */ emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
 /** @export */ emscripten_get_element_css_size: _emscripten_get_element_css_size,
 /** @export */ emscripten_get_fullscreen_status: _emscripten_get_fullscreen_status,
 /** @export */ emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
 /** @export */ emscripten_get_heap_max: _emscripten_get_heap_max,
 /** @export */ emscripten_get_main_loop_timing: _emscripten_get_main_loop_timing,
 /** @export */ emscripten_get_now: _emscripten_get_now,
 /** @export */ emscripten_get_now_res: _emscripten_get_now_res,
 /** @export */ emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
 /** @export */ emscripten_get_screen_size: _emscripten_get_screen_size,
 /** @export */ emscripten_glActiveTexture: _emscripten_glActiveTexture,
 /** @export */ emscripten_glAttachShader: _emscripten_glAttachShader,
 /** @export */ emscripten_glBeginQuery: _emscripten_glBeginQuery,
 /** @export */ emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
 /** @export */ emscripten_glBeginTransformFeedback: _emscripten_glBeginTransformFeedback,
 /** @export */ emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
 /** @export */ emscripten_glBindBuffer: _emscripten_glBindBuffer,
 /** @export */ emscripten_glBindBufferBase: _emscripten_glBindBufferBase,
 /** @export */ emscripten_glBindBufferRange: _emscripten_glBindBufferRange,
 /** @export */ emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
 /** @export */ emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
 /** @export */ emscripten_glBindSampler: _emscripten_glBindSampler,
 /** @export */ emscripten_glBindTexture: _emscripten_glBindTexture,
 /** @export */ emscripten_glBindTransformFeedback: _emscripten_glBindTransformFeedback,
 /** @export */ emscripten_glBindVertexArray: _emscripten_glBindVertexArray,
 /** @export */ emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
 /** @export */ emscripten_glBlendColor: _emscripten_glBlendColor,
 /** @export */ emscripten_glBlendEquation: _emscripten_glBlendEquation,
 /** @export */ emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
 /** @export */ emscripten_glBlendFunc: _emscripten_glBlendFunc,
 /** @export */ emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
 /** @export */ emscripten_glBlitFramebuffer: _emscripten_glBlitFramebuffer,
 /** @export */ emscripten_glBufferData: _emscripten_glBufferData,
 /** @export */ emscripten_glBufferSubData: _emscripten_glBufferSubData,
 /** @export */ emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
 /** @export */ emscripten_glClear: _emscripten_glClear,
 /** @export */ emscripten_glClearBufferfi: _emscripten_glClearBufferfi,
 /** @export */ emscripten_glClearBufferfv: _emscripten_glClearBufferfv,
 /** @export */ emscripten_glClearBufferiv: _emscripten_glClearBufferiv,
 /** @export */ emscripten_glClearBufferuiv: _emscripten_glClearBufferuiv,
 /** @export */ emscripten_glClearColor: _emscripten_glClearColor,
 /** @export */ emscripten_glClearDepthf: _emscripten_glClearDepthf,
 /** @export */ emscripten_glClearStencil: _emscripten_glClearStencil,
 /** @export */ emscripten_glClientWaitSync: _emscripten_glClientWaitSync,
 /** @export */ emscripten_glColorMask: _emscripten_glColorMask,
 /** @export */ emscripten_glCompileShader: _emscripten_glCompileShader,
 /** @export */ emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
 /** @export */ emscripten_glCompressedTexImage3D: _emscripten_glCompressedTexImage3D,
 /** @export */ emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
 /** @export */ emscripten_glCompressedTexSubImage3D: _emscripten_glCompressedTexSubImage3D,
 /** @export */ emscripten_glCopyBufferSubData: _emscripten_glCopyBufferSubData,
 /** @export */ emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
 /** @export */ emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
 /** @export */ emscripten_glCopyTexSubImage3D: _emscripten_glCopyTexSubImage3D,
 /** @export */ emscripten_glCreateProgram: _emscripten_glCreateProgram,
 /** @export */ emscripten_glCreateShader: _emscripten_glCreateShader,
 /** @export */ emscripten_glCullFace: _emscripten_glCullFace,
 /** @export */ emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
 /** @export */ emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
 /** @export */ emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
 /** @export */ emscripten_glDeleteQueries: _emscripten_glDeleteQueries,
 /** @export */ emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
 /** @export */ emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
 /** @export */ emscripten_glDeleteSamplers: _emscripten_glDeleteSamplers,
 /** @export */ emscripten_glDeleteShader: _emscripten_glDeleteShader,
 /** @export */ emscripten_glDeleteSync: _emscripten_glDeleteSync,
 /** @export */ emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
 /** @export */ emscripten_glDeleteTransformFeedbacks: _emscripten_glDeleteTransformFeedbacks,
 /** @export */ emscripten_glDeleteVertexArrays: _emscripten_glDeleteVertexArrays,
 /** @export */ emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
 /** @export */ emscripten_glDepthFunc: _emscripten_glDepthFunc,
 /** @export */ emscripten_glDepthMask: _emscripten_glDepthMask,
 /** @export */ emscripten_glDepthRangef: _emscripten_glDepthRangef,
 /** @export */ emscripten_glDetachShader: _emscripten_glDetachShader,
 /** @export */ emscripten_glDisable: _emscripten_glDisable,
 /** @export */ emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
 /** @export */ emscripten_glDrawArrays: _emscripten_glDrawArrays,
 /** @export */ emscripten_glDrawArraysInstanced: _emscripten_glDrawArraysInstanced,
 /** @export */ emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
 /** @export */ emscripten_glDrawArraysInstancedARB: _emscripten_glDrawArraysInstancedARB,
 /** @export */ emscripten_glDrawArraysInstancedEXT: _emscripten_glDrawArraysInstancedEXT,
 /** @export */ emscripten_glDrawArraysInstancedNV: _emscripten_glDrawArraysInstancedNV,
 /** @export */ emscripten_glDrawBuffers: _emscripten_glDrawBuffers,
 /** @export */ emscripten_glDrawBuffersEXT: _emscripten_glDrawBuffersEXT,
 /** @export */ emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
 /** @export */ emscripten_glDrawElements: _emscripten_glDrawElements,
 /** @export */ emscripten_glDrawElementsInstanced: _emscripten_glDrawElementsInstanced,
 /** @export */ emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
 /** @export */ emscripten_glDrawElementsInstancedARB: _emscripten_glDrawElementsInstancedARB,
 /** @export */ emscripten_glDrawElementsInstancedEXT: _emscripten_glDrawElementsInstancedEXT,
 /** @export */ emscripten_glDrawElementsInstancedNV: _emscripten_glDrawElementsInstancedNV,
 /** @export */ emscripten_glDrawRangeElements: _emscripten_glDrawRangeElements,
 /** @export */ emscripten_glEnable: _emscripten_glEnable,
 /** @export */ emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
 /** @export */ emscripten_glEndQuery: _emscripten_glEndQuery,
 /** @export */ emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
 /** @export */ emscripten_glEndTransformFeedback: _emscripten_glEndTransformFeedback,
 /** @export */ emscripten_glFenceSync: _emscripten_glFenceSync,
 /** @export */ emscripten_glFinish: _emscripten_glFinish,
 /** @export */ emscripten_glFlush: _emscripten_glFlush,
 /** @export */ emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
 /** @export */ emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
 /** @export */ emscripten_glFramebufferTextureLayer: _emscripten_glFramebufferTextureLayer,
 /** @export */ emscripten_glFrontFace: _emscripten_glFrontFace,
 /** @export */ emscripten_glGenBuffers: _emscripten_glGenBuffers,
 /** @export */ emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
 /** @export */ emscripten_glGenQueries: _emscripten_glGenQueries,
 /** @export */ emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
 /** @export */ emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
 /** @export */ emscripten_glGenSamplers: _emscripten_glGenSamplers,
 /** @export */ emscripten_glGenTextures: _emscripten_glGenTextures,
 /** @export */ emscripten_glGenTransformFeedbacks: _emscripten_glGenTransformFeedbacks,
 /** @export */ emscripten_glGenVertexArrays: _emscripten_glGenVertexArrays,
 /** @export */ emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
 /** @export */ emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
 /** @export */ emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
 /** @export */ emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
 /** @export */ emscripten_glGetActiveUniformBlockName: _emscripten_glGetActiveUniformBlockName,
 /** @export */ emscripten_glGetActiveUniformBlockiv: _emscripten_glGetActiveUniformBlockiv,
 /** @export */ emscripten_glGetActiveUniformsiv: _emscripten_glGetActiveUniformsiv,
 /** @export */ emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
 /** @export */ emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
 /** @export */ emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
 /** @export */ emscripten_glGetBufferParameteri64v: _emscripten_glGetBufferParameteri64v,
 /** @export */ emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
 /** @export */ emscripten_glGetError: _emscripten_glGetError,
 /** @export */ emscripten_glGetFloatv: _emscripten_glGetFloatv,
 /** @export */ emscripten_glGetFragDataLocation: _emscripten_glGetFragDataLocation,
 /** @export */ emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
 /** @export */ emscripten_glGetInteger64i_v: _emscripten_glGetInteger64i_v,
 /** @export */ emscripten_glGetInteger64v: _emscripten_glGetInteger64v,
 /** @export */ emscripten_glGetIntegeri_v: _emscripten_glGetIntegeri_v,
 /** @export */ emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
 /** @export */ emscripten_glGetInternalformativ: _emscripten_glGetInternalformativ,
 /** @export */ emscripten_glGetProgramBinary: _emscripten_glGetProgramBinary,
 /** @export */ emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
 /** @export */ emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
 /** @export */ emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
 /** @export */ emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
 /** @export */ emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
 /** @export */ emscripten_glGetQueryObjectuiv: _emscripten_glGetQueryObjectuiv,
 /** @export */ emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
 /** @export */ emscripten_glGetQueryiv: _emscripten_glGetQueryiv,
 /** @export */ emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
 /** @export */ emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
 /** @export */ emscripten_glGetSamplerParameterfv: _emscripten_glGetSamplerParameterfv,
 /** @export */ emscripten_glGetSamplerParameteriv: _emscripten_glGetSamplerParameteriv,
 /** @export */ emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
 /** @export */ emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
 /** @export */ emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
 /** @export */ emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
 /** @export */ emscripten_glGetString: _emscripten_glGetString,
 /** @export */ emscripten_glGetStringi: _emscripten_glGetStringi,
 /** @export */ emscripten_glGetSynciv: _emscripten_glGetSynciv,
 /** @export */ emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
 /** @export */ emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
 /** @export */ emscripten_glGetTransformFeedbackVarying: _emscripten_glGetTransformFeedbackVarying,
 /** @export */ emscripten_glGetUniformBlockIndex: _emscripten_glGetUniformBlockIndex,
 /** @export */ emscripten_glGetUniformIndices: _emscripten_glGetUniformIndices,
 /** @export */ emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
 /** @export */ emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
 /** @export */ emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
 /** @export */ emscripten_glGetUniformuiv: _emscripten_glGetUniformuiv,
 /** @export */ emscripten_glGetVertexAttribIiv: _emscripten_glGetVertexAttribIiv,
 /** @export */ emscripten_glGetVertexAttribIuiv: _emscripten_glGetVertexAttribIuiv,
 /** @export */ emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
 /** @export */ emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
 /** @export */ emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
 /** @export */ emscripten_glHint: _emscripten_glHint,
 /** @export */ emscripten_glInvalidateFramebuffer: _emscripten_glInvalidateFramebuffer,
 /** @export */ emscripten_glInvalidateSubFramebuffer: _emscripten_glInvalidateSubFramebuffer,
 /** @export */ emscripten_glIsBuffer: _emscripten_glIsBuffer,
 /** @export */ emscripten_glIsEnabled: _emscripten_glIsEnabled,
 /** @export */ emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
 /** @export */ emscripten_glIsProgram: _emscripten_glIsProgram,
 /** @export */ emscripten_glIsQuery: _emscripten_glIsQuery,
 /** @export */ emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
 /** @export */ emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
 /** @export */ emscripten_glIsSampler: _emscripten_glIsSampler,
 /** @export */ emscripten_glIsShader: _emscripten_glIsShader,
 /** @export */ emscripten_glIsSync: _emscripten_glIsSync,
 /** @export */ emscripten_glIsTexture: _emscripten_glIsTexture,
 /** @export */ emscripten_glIsTransformFeedback: _emscripten_glIsTransformFeedback,
 /** @export */ emscripten_glIsVertexArray: _emscripten_glIsVertexArray,
 /** @export */ emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
 /** @export */ emscripten_glLineWidth: _emscripten_glLineWidth,
 /** @export */ emscripten_glLinkProgram: _emscripten_glLinkProgram,
 /** @export */ emscripten_glPauseTransformFeedback: _emscripten_glPauseTransformFeedback,
 /** @export */ emscripten_glPixelStorei: _emscripten_glPixelStorei,
 /** @export */ emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
 /** @export */ emscripten_glProgramBinary: _emscripten_glProgramBinary,
 /** @export */ emscripten_glProgramParameteri: _emscripten_glProgramParameteri,
 /** @export */ emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
 /** @export */ emscripten_glReadBuffer: _emscripten_glReadBuffer,
 /** @export */ emscripten_glReadPixels: _emscripten_glReadPixels,
 /** @export */ emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
 /** @export */ emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
 /** @export */ emscripten_glRenderbufferStorageMultisample: _emscripten_glRenderbufferStorageMultisample,
 /** @export */ emscripten_glResumeTransformFeedback: _emscripten_glResumeTransformFeedback,
 /** @export */ emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
 /** @export */ emscripten_glSamplerParameterf: _emscripten_glSamplerParameterf,
 /** @export */ emscripten_glSamplerParameterfv: _emscripten_glSamplerParameterfv,
 /** @export */ emscripten_glSamplerParameteri: _emscripten_glSamplerParameteri,
 /** @export */ emscripten_glSamplerParameteriv: _emscripten_glSamplerParameteriv,
 /** @export */ emscripten_glScissor: _emscripten_glScissor,
 /** @export */ emscripten_glShaderBinary: _emscripten_glShaderBinary,
 /** @export */ emscripten_glShaderSource: _emscripten_glShaderSource,
 /** @export */ emscripten_glStencilFunc: _emscripten_glStencilFunc,
 /** @export */ emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
 /** @export */ emscripten_glStencilMask: _emscripten_glStencilMask,
 /** @export */ emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
 /** @export */ emscripten_glStencilOp: _emscripten_glStencilOp,
 /** @export */ emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
 /** @export */ emscripten_glTexImage2D: _emscripten_glTexImage2D,
 /** @export */ emscripten_glTexImage3D: _emscripten_glTexImage3D,
 /** @export */ emscripten_glTexParameterf: _emscripten_glTexParameterf,
 /** @export */ emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
 /** @export */ emscripten_glTexParameteri: _emscripten_glTexParameteri,
 /** @export */ emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
 /** @export */ emscripten_glTexStorage2D: _emscripten_glTexStorage2D,
 /** @export */ emscripten_glTexStorage3D: _emscripten_glTexStorage3D,
 /** @export */ emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
 /** @export */ emscripten_glTexSubImage3D: _emscripten_glTexSubImage3D,
 /** @export */ emscripten_glTransformFeedbackVaryings: _emscripten_glTransformFeedbackVaryings,
 /** @export */ emscripten_glUniform1f: _emscripten_glUniform1f,
 /** @export */ emscripten_glUniform1fv: _emscripten_glUniform1fv,
 /** @export */ emscripten_glUniform1i: _emscripten_glUniform1i,
 /** @export */ emscripten_glUniform1iv: _emscripten_glUniform1iv,
 /** @export */ emscripten_glUniform1ui: _emscripten_glUniform1ui,
 /** @export */ emscripten_glUniform1uiv: _emscripten_glUniform1uiv,
 /** @export */ emscripten_glUniform2f: _emscripten_glUniform2f,
 /** @export */ emscripten_glUniform2fv: _emscripten_glUniform2fv,
 /** @export */ emscripten_glUniform2i: _emscripten_glUniform2i,
 /** @export */ emscripten_glUniform2iv: _emscripten_glUniform2iv,
 /** @export */ emscripten_glUniform2ui: _emscripten_glUniform2ui,
 /** @export */ emscripten_glUniform2uiv: _emscripten_glUniform2uiv,
 /** @export */ emscripten_glUniform3f: _emscripten_glUniform3f,
 /** @export */ emscripten_glUniform3fv: _emscripten_glUniform3fv,
 /** @export */ emscripten_glUniform3i: _emscripten_glUniform3i,
 /** @export */ emscripten_glUniform3iv: _emscripten_glUniform3iv,
 /** @export */ emscripten_glUniform3ui: _emscripten_glUniform3ui,
 /** @export */ emscripten_glUniform3uiv: _emscripten_glUniform3uiv,
 /** @export */ emscripten_glUniform4f: _emscripten_glUniform4f,
 /** @export */ emscripten_glUniform4fv: _emscripten_glUniform4fv,
 /** @export */ emscripten_glUniform4i: _emscripten_glUniform4i,
 /** @export */ emscripten_glUniform4iv: _emscripten_glUniform4iv,
 /** @export */ emscripten_glUniform4ui: _emscripten_glUniform4ui,
 /** @export */ emscripten_glUniform4uiv: _emscripten_glUniform4uiv,
 /** @export */ emscripten_glUniformBlockBinding: _emscripten_glUniformBlockBinding,
 /** @export */ emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
 /** @export */ emscripten_glUniformMatrix2x3fv: _emscripten_glUniformMatrix2x3fv,
 /** @export */ emscripten_glUniformMatrix2x4fv: _emscripten_glUniformMatrix2x4fv,
 /** @export */ emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
 /** @export */ emscripten_glUniformMatrix3x2fv: _emscripten_glUniformMatrix3x2fv,
 /** @export */ emscripten_glUniformMatrix3x4fv: _emscripten_glUniformMatrix3x4fv,
 /** @export */ emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
 /** @export */ emscripten_glUniformMatrix4x2fv: _emscripten_glUniformMatrix4x2fv,
 /** @export */ emscripten_glUniformMatrix4x3fv: _emscripten_glUniformMatrix4x3fv,
 /** @export */ emscripten_glUseProgram: _emscripten_glUseProgram,
 /** @export */ emscripten_glValidateProgram: _emscripten_glValidateProgram,
 /** @export */ emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
 /** @export */ emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
 /** @export */ emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
 /** @export */ emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
 /** @export */ emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
 /** @export */ emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
 /** @export */ emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
 /** @export */ emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
 /** @export */ emscripten_glVertexAttribDivisor: _emscripten_glVertexAttribDivisor,
 /** @export */ emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
 /** @export */ emscripten_glVertexAttribDivisorARB: _emscripten_glVertexAttribDivisorARB,
 /** @export */ emscripten_glVertexAttribDivisorEXT: _emscripten_glVertexAttribDivisorEXT,
 /** @export */ emscripten_glVertexAttribDivisorNV: _emscripten_glVertexAttribDivisorNV,
 /** @export */ emscripten_glVertexAttribI4i: _emscripten_glVertexAttribI4i,
 /** @export */ emscripten_glVertexAttribI4iv: _emscripten_glVertexAttribI4iv,
 /** @export */ emscripten_glVertexAttribI4ui: _emscripten_glVertexAttribI4ui,
 /** @export */ emscripten_glVertexAttribI4uiv: _emscripten_glVertexAttribI4uiv,
 /** @export */ emscripten_glVertexAttribIPointer: _emscripten_glVertexAttribIPointer,
 /** @export */ emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
 /** @export */ emscripten_glViewport: _emscripten_glViewport,
 /** @export */ emscripten_glWaitSync: _emscripten_glWaitSync,
 /** @export */ emscripten_has_asyncify: _emscripten_has_asyncify,
 /** @export */ emscripten_out: _emscripten_out,
 /** @export */ emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
 /** @export */ emscripten_request_pointerlock: _emscripten_request_pointerlock,
 /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
 /** @export */ emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
 /** @export */ emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
 /** @export */ emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
 /** @export */ emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
 /** @export */ emscripten_set_devicemotion_callback_on_thread: _emscripten_set_devicemotion_callback_on_thread,
 /** @export */ emscripten_set_element_css_size: _emscripten_set_element_css_size,
 /** @export */ emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
 /** @export */ emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
 /** @export */ emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
 /** @export */ emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
 /** @export */ emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
 /** @export */ emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
 /** @export */ emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
 /** @export */ emscripten_set_main_loop: _emscripten_set_main_loop,
 /** @export */ emscripten_set_main_loop_timing: _emscripten_set_main_loop_timing,
 /** @export */ emscripten_set_orientationchange_callback_on_thread: _emscripten_set_orientationchange_callback_on_thread,
 /** @export */ emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
 /** @export */ emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
 /** @export */ emscripten_set_timeout: _emscripten_set_timeout,
 /** @export */ emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
 /** @export */ emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
 /** @export */ emscripten_set_window_title: _emscripten_set_window_title,
 /** @export */ emscripten_sleep: _emscripten_sleep,
 /** @export */ emscripten_webgl_create_context: _emscripten_webgl_create_context,
 /** @export */ emscripten_webgl_destroy_context: _emscripten_webgl_destroy_context,
 /** @export */ emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
 /** @export */ environ_get: _environ_get,
 /** @export */ environ_sizes_get: _environ_sizes_get,
 /** @export */ exit: _exit,
 /** @export */ getentropy: _getentropy,
 /** @export */ mono_interp_flush_jitcall_queue: _mono_interp_flush_jitcall_queue,
 /** @export */ mono_interp_invoke_wasm_jit_call_trampoline: _mono_interp_invoke_wasm_jit_call_trampoline,
 /** @export */ mono_interp_jit_wasm_entry_trampoline: _mono_interp_jit_wasm_entry_trampoline,
 /** @export */ mono_interp_jit_wasm_jit_call_trampoline: _mono_interp_jit_wasm_jit_call_trampoline,
 /** @export */ mono_interp_record_interp_entry: _mono_interp_record_interp_entry,
 /** @export */ mono_interp_tier_prepare_jiterpreter: _mono_interp_tier_prepare_jiterpreter,
 /** @export */ mono_jiterp_free_method_data_js: _mono_jiterp_free_method_data_js,
 /** @export */ mono_wasm_bind_js_import_ST: _mono_wasm_bind_js_import_ST,
 /** @export */ mono_wasm_browser_entropy: _mono_wasm_browser_entropy,
 /** @export */ mono_wasm_cancel_promise: _mono_wasm_cancel_promise,
 /** @export */ mono_wasm_change_case: _mono_wasm_change_case,
 /** @export */ mono_wasm_compare_string: _mono_wasm_compare_string,
 /** @export */ mono_wasm_console_clear: _mono_wasm_console_clear,
 /** @export */ mono_wasm_ends_with: _mono_wasm_ends_with,
 /** @export */ mono_wasm_get_calendar_info: _mono_wasm_get_calendar_info,
 /** @export */ mono_wasm_get_culture_info: _mono_wasm_get_culture_info,
 /** @export */ mono_wasm_get_first_day_of_week: _mono_wasm_get_first_day_of_week,
 /** @export */ mono_wasm_get_first_week_of_year: _mono_wasm_get_first_week_of_year,
 /** @export */ mono_wasm_get_locale_info: _mono_wasm_get_locale_info,
 /** @export */ mono_wasm_index_of: _mono_wasm_index_of,
 /** @export */ mono_wasm_invoke_js_function: _mono_wasm_invoke_js_function,
 /** @export */ mono_wasm_invoke_jsimport_ST: _mono_wasm_invoke_jsimport_ST,
 /** @export */ mono_wasm_release_cs_owned_object: _mono_wasm_release_cs_owned_object,
 /** @export */ mono_wasm_resolve_or_reject_promise: _mono_wasm_resolve_or_reject_promise,
 /** @export */ mono_wasm_schedule_timer: _mono_wasm_schedule_timer,
 /** @export */ mono_wasm_set_entrypoint_breakpoint: _mono_wasm_set_entrypoint_breakpoint,
 /** @export */ mono_wasm_starts_with: _mono_wasm_starts_with,
 /** @export */ mono_wasm_trace_logger: _mono_wasm_trace_logger,
 /** @export */ schedule_background_exec: _schedule_background_exec,
 /** @export */ strftime: _strftime
};

var wasmExports = createWasm();

var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports["__wasm_call_ctors"])();

var _Emscripten_force_free = Module["_Emscripten_force_free"] = a0 => (_Emscripten_force_free = Module["_Emscripten_force_free"] = wasmExports["Emscripten_force_free"])(a0);

var _SDL_malloc = Module["_SDL_malloc"] = a0 => (_SDL_malloc = Module["_SDL_malloc"] = wasmExports["SDL_malloc"])(a0);

var _SDL_calloc = Module["_SDL_calloc"] = (a0, a1) => (_SDL_calloc = Module["_SDL_calloc"] = wasmExports["SDL_calloc"])(a0, a1);

var _SDL_realloc = Module["_SDL_realloc"] = (a0, a1) => (_SDL_realloc = Module["_SDL_realloc"] = wasmExports["SDL_realloc"])(a0, a1);

var _SDL_free = Module["_SDL_free"] = a0 => (_SDL_free = Module["_SDL_free"] = wasmExports["SDL_free"])(a0);

var _SDLEmscriptenCameraPermissionOutcome = Module["_SDLEmscriptenCameraPermissionOutcome"] = (a0, a1, a2, a3, a4) => (_SDLEmscriptenCameraPermissionOutcome = Module["_SDLEmscriptenCameraPermissionOutcome"] = wasmExports["SDLEmscriptenCameraPermissionOutcome"])(a0, a1, a2, a3, a4);

var _SDLEmscriptenThreadIterate = Module["_SDLEmscriptenThreadIterate"] = a0 => (_SDLEmscriptenThreadIterate = Module["_SDLEmscriptenThreadIterate"] = wasmExports["SDLEmscriptenThreadIterate"])(a0);

var _Emscripten_HandlePointerEnter = Module["_Emscripten_HandlePointerEnter"] = (a0, a1) => (_Emscripten_HandlePointerEnter = Module["_Emscripten_HandlePointerEnter"] = wasmExports["Emscripten_HandlePointerEnter"])(a0, a1);

var _Emscripten_HandlePointerLeave = Module["_Emscripten_HandlePointerLeave"] = (a0, a1) => (_Emscripten_HandlePointerLeave = Module["_Emscripten_HandlePointerLeave"] = wasmExports["Emscripten_HandlePointerLeave"])(a0, a1);

var _Emscripten_HandlePointerGeneric = Module["_Emscripten_HandlePointerGeneric"] = (a0, a1) => (_Emscripten_HandlePointerGeneric = Module["_Emscripten_HandlePointerGeneric"] = wasmExports["Emscripten_HandlePointerGeneric"])(a0, a1);

var _Emscripten_HandleMouseButtonUpGlobal = Module["_Emscripten_HandleMouseButtonUpGlobal"] = (a0, a1) => (_Emscripten_HandleMouseButtonUpGlobal = Module["_Emscripten_HandleMouseButtonUpGlobal"] = wasmExports["Emscripten_HandleMouseButtonUpGlobal"])(a0, a1);

var _Emscripten_SendDragEvent = Module["_Emscripten_SendDragEvent"] = (a0, a1) => (_Emscripten_SendDragEvent = Module["_Emscripten_SendDragEvent"] = wasmExports["Emscripten_SendDragEvent"])(a0, a1);

var _Emscripten_SendDragCompleteEvent = Module["_Emscripten_SendDragCompleteEvent"] = a0 => (_Emscripten_SendDragCompleteEvent = Module["_Emscripten_SendDragCompleteEvent"] = wasmExports["Emscripten_SendDragCompleteEvent"])(a0);

var _Emscripten_SendDragTextEvent = Module["_Emscripten_SendDragTextEvent"] = (a0, a1) => (_Emscripten_SendDragTextEvent = Module["_Emscripten_SendDragTextEvent"] = wasmExports["Emscripten_SendDragTextEvent"])(a0, a1);

var _Emscripten_SendDragFileEvent = Module["_Emscripten_SendDragFileEvent"] = (a0, a1) => (_Emscripten_SendDragFileEvent = Module["_Emscripten_SendDragFileEvent"] = wasmExports["Emscripten_SendDragFileEvent"])(a0, a1);

var _Emscripten_HandleLockKeysCheck = Module["_Emscripten_HandleLockKeysCheck"] = (a0, a1, a2, a3) => (_Emscripten_HandleLockKeysCheck = Module["_Emscripten_HandleLockKeysCheck"] = wasmExports["Emscripten_HandleLockKeysCheck"])(a0, a1, a2, a3);

var _Emscripten_SendSystemThemeChangedEvent = Module["_Emscripten_SendSystemThemeChangedEvent"] = () => (_Emscripten_SendSystemThemeChangedEvent = Module["_Emscripten_SendSystemThemeChangedEvent"] = wasmExports["Emscripten_SendSystemThemeChangedEvent"])();

var _requestFullscreenThroughSDL = Module["_requestFullscreenThroughSDL"] = a0 => (_requestFullscreenThroughSDL = Module["_requestFullscreenThroughSDL"] = wasmExports["requestFullscreenThroughSDL"])(a0);

var _malloc = Module["_malloc"] = a0 => (_malloc = Module["_malloc"] = wasmExports["malloc"])(a0);

var _calloc = Module["_calloc"] = (a0, a1) => (_calloc = Module["_calloc"] = wasmExports["calloc"])(a0, a1);

var _realloc = Module["_realloc"] = (a0, a1) => (_realloc = Module["_realloc"] = wasmExports["realloc"])(a0, a1);

var _free = Module["_free"] = a0 => (_free = Module["_free"] = wasmExports["free"])(a0);

var _atan = Module["_atan"] = a0 => (_atan = Module["_atan"] = wasmExports["atan"])(a0);

var _atanf = Module["_atanf"] = a0 => (_atanf = Module["_atanf"] = wasmExports["atanf"])(a0);

var _atan2 = Module["_atan2"] = (a0, a1) => (_atan2 = Module["_atan2"] = wasmExports["atan2"])(a0, a1);

var _atan2f = Module["_atan2f"] = (a0, a1) => (_atan2f = Module["_atan2f"] = wasmExports["atan2f"])(a0, a1);

var _acos = Module["_acos"] = a0 => (_acos = Module["_acos"] = wasmExports["acos"])(a0);

var _acosf = Module["_acosf"] = a0 => (_acosf = Module["_acosf"] = wasmExports["acosf"])(a0);

var _asin = Module["_asin"] = a0 => (_asin = Module["_asin"] = wasmExports["asin"])(a0);

var _asinf = Module["_asinf"] = a0 => (_asinf = Module["_asinf"] = wasmExports["asinf"])(a0);

var _cos = Module["_cos"] = a0 => (_cos = Module["_cos"] = wasmExports["cos"])(a0);

var _cosf = Module["_cosf"] = a0 => (_cosf = Module["_cosf"] = wasmExports["cosf"])(a0);

var _exp = Module["_exp"] = a0 => (_exp = Module["_exp"] = wasmExports["exp"])(a0);

var _expf = Module["_expf"] = a0 => (_expf = Module["_expf"] = wasmExports["expf"])(a0);

var _fmod = Module["_fmod"] = (a0, a1) => (_fmod = Module["_fmod"] = wasmExports["fmod"])(a0, a1);

var _fmodf = Module["_fmodf"] = (a0, a1) => (_fmodf = Module["_fmodf"] = wasmExports["fmodf"])(a0, a1);

var _log = Module["_log"] = a0 => (_log = Module["_log"] = wasmExports["log"])(a0);

var _logf = Module["_logf"] = a0 => (_logf = Module["_logf"] = wasmExports["logf"])(a0);

var _log10 = Module["_log10"] = a0 => (_log10 = Module["_log10"] = wasmExports["log10"])(a0);

var _log10f = Module["_log10f"] = a0 => (_log10f = Module["_log10f"] = wasmExports["log10f"])(a0);

var _pow = Module["_pow"] = (a0, a1) => (_pow = Module["_pow"] = wasmExports["pow"])(a0, a1);

var _powf = Module["_powf"] = (a0, a1) => (_powf = Module["_powf"] = wasmExports["powf"])(a0, a1);

var _sin = Module["_sin"] = a0 => (_sin = Module["_sin"] = wasmExports["sin"])(a0);

var _sinf = Module["_sinf"] = a0 => (_sinf = Module["_sinf"] = wasmExports["sinf"])(a0);

var _tan = Module["_tan"] = a0 => (_tan = Module["_tan"] = wasmExports["tan"])(a0);

var _tanf = Module["_tanf"] = a0 => (_tanf = Module["_tanf"] = wasmExports["tanf"])(a0);

var _memset = Module["_memset"] = (a0, a1, a2) => (_memset = Module["_memset"] = wasmExports["memset"])(a0, a1, a2);

var _fflush = a0 => (_fflush = wasmExports["fflush"])(a0);

var _faudio_emscripten_mix = Module["_faudio_emscripten_mix"] = a0 => (_faudio_emscripten_mix = Module["_faudio_emscripten_mix"] = wasmExports["faudio_emscripten_mix"])(a0);

var _mono_wasm_register_root = Module["_mono_wasm_register_root"] = (a0, a1, a2) => (_mono_wasm_register_root = Module["_mono_wasm_register_root"] = wasmExports["mono_wasm_register_root"])(a0, a1, a2);

var _mono_wasm_deregister_root = Module["_mono_wasm_deregister_root"] = a0 => (_mono_wasm_deregister_root = Module["_mono_wasm_deregister_root"] = wasmExports["mono_wasm_deregister_root"])(a0);

var _mono_wasm_add_assembly = Module["_mono_wasm_add_assembly"] = (a0, a1, a2) => (_mono_wasm_add_assembly = Module["_mono_wasm_add_assembly"] = wasmExports["mono_wasm_add_assembly"])(a0, a1, a2);

var _mono_wasm_add_satellite_assembly = Module["_mono_wasm_add_satellite_assembly"] = (a0, a1, a2, a3) => (_mono_wasm_add_satellite_assembly = Module["_mono_wasm_add_satellite_assembly"] = wasmExports["mono_wasm_add_satellite_assembly"])(a0, a1, a2, a3);

var _mono_wasm_setenv = Module["_mono_wasm_setenv"] = (a0, a1) => (_mono_wasm_setenv = Module["_mono_wasm_setenv"] = wasmExports["mono_wasm_setenv"])(a0, a1);

var _mono_wasm_getenv = Module["_mono_wasm_getenv"] = a0 => (_mono_wasm_getenv = Module["_mono_wasm_getenv"] = wasmExports["mono_wasm_getenv"])(a0);

var _mono_wasm_load_runtime = Module["_mono_wasm_load_runtime"] = a0 => (_mono_wasm_load_runtime = Module["_mono_wasm_load_runtime"] = wasmExports["mono_wasm_load_runtime"])(a0);

var _mono_wasm_invoke_jsexport = Module["_mono_wasm_invoke_jsexport"] = (a0, a1) => (_mono_wasm_invoke_jsexport = Module["_mono_wasm_invoke_jsexport"] = wasmExports["mono_wasm_invoke_jsexport"])(a0, a1);

var _mono_wasm_string_from_utf16_ref = Module["_mono_wasm_string_from_utf16_ref"] = (a0, a1, a2) => (_mono_wasm_string_from_utf16_ref = Module["_mono_wasm_string_from_utf16_ref"] = wasmExports["mono_wasm_string_from_utf16_ref"])(a0, a1, a2);

var _mono_wasm_exec_regression = Module["_mono_wasm_exec_regression"] = (a0, a1) => (_mono_wasm_exec_regression = Module["_mono_wasm_exec_regression"] = wasmExports["mono_wasm_exec_regression"])(a0, a1);

var _mono_wasm_exit = Module["_mono_wasm_exit"] = a0 => (_mono_wasm_exit = Module["_mono_wasm_exit"] = wasmExports["mono_wasm_exit"])(a0);

var _mono_wasm_set_main_args = Module["_mono_wasm_set_main_args"] = (a0, a1) => (_mono_wasm_set_main_args = Module["_mono_wasm_set_main_args"] = wasmExports["mono_wasm_set_main_args"])(a0, a1);

var _mono_wasm_strdup = Module["_mono_wasm_strdup"] = a0 => (_mono_wasm_strdup = Module["_mono_wasm_strdup"] = wasmExports["mono_wasm_strdup"])(a0);

var _mono_wasm_parse_runtime_options = Module["_mono_wasm_parse_runtime_options"] = (a0, a1) => (_mono_wasm_parse_runtime_options = Module["_mono_wasm_parse_runtime_options"] = wasmExports["mono_wasm_parse_runtime_options"])(a0, a1);

var _mono_wasm_intern_string_ref = Module["_mono_wasm_intern_string_ref"] = a0 => (_mono_wasm_intern_string_ref = Module["_mono_wasm_intern_string_ref"] = wasmExports["mono_wasm_intern_string_ref"])(a0);

var _mono_wasm_string_get_data_ref = Module["_mono_wasm_string_get_data_ref"] = (a0, a1, a2, a3) => (_mono_wasm_string_get_data_ref = Module["_mono_wasm_string_get_data_ref"] = wasmExports["mono_wasm_string_get_data_ref"])(a0, a1, a2, a3);

var _mono_wasm_write_managed_pointer_unsafe = Module["_mono_wasm_write_managed_pointer_unsafe"] = (a0, a1) => (_mono_wasm_write_managed_pointer_unsafe = Module["_mono_wasm_write_managed_pointer_unsafe"] = wasmExports["mono_wasm_write_managed_pointer_unsafe"])(a0, a1);

var _mono_wasm_copy_managed_pointer = Module["_mono_wasm_copy_managed_pointer"] = (a0, a1) => (_mono_wasm_copy_managed_pointer = Module["_mono_wasm_copy_managed_pointer"] = wasmExports["mono_wasm_copy_managed_pointer"])(a0, a1);

var _mono_wasm_init_finalizer_thread = Module["_mono_wasm_init_finalizer_thread"] = () => (_mono_wasm_init_finalizer_thread = Module["_mono_wasm_init_finalizer_thread"] = wasmExports["mono_wasm_init_finalizer_thread"])();

var _mono_wasm_i52_to_f64 = Module["_mono_wasm_i52_to_f64"] = (a0, a1) => (_mono_wasm_i52_to_f64 = Module["_mono_wasm_i52_to_f64"] = wasmExports["mono_wasm_i52_to_f64"])(a0, a1);

var _mono_wasm_u52_to_f64 = Module["_mono_wasm_u52_to_f64"] = (a0, a1) => (_mono_wasm_u52_to_f64 = Module["_mono_wasm_u52_to_f64"] = wasmExports["mono_wasm_u52_to_f64"])(a0, a1);

var _mono_wasm_f64_to_u52 = Module["_mono_wasm_f64_to_u52"] = (a0, a1) => (_mono_wasm_f64_to_u52 = Module["_mono_wasm_f64_to_u52"] = wasmExports["mono_wasm_f64_to_u52"])(a0, a1);

var _mono_wasm_f64_to_i52 = Module["_mono_wasm_f64_to_i52"] = (a0, a1) => (_mono_wasm_f64_to_i52 = Module["_mono_wasm_f64_to_i52"] = wasmExports["mono_wasm_f64_to_i52"])(a0, a1);

var _mono_wasm_method_get_full_name = Module["_mono_wasm_method_get_full_name"] = a0 => (_mono_wasm_method_get_full_name = Module["_mono_wasm_method_get_full_name"] = wasmExports["mono_wasm_method_get_full_name"])(a0);

var _mono_wasm_method_get_name = Module["_mono_wasm_method_get_name"] = a0 => (_mono_wasm_method_get_name = Module["_mono_wasm_method_get_name"] = wasmExports["mono_wasm_method_get_name"])(a0);

var _mono_wasm_get_f32_unaligned = Module["_mono_wasm_get_f32_unaligned"] = a0 => (_mono_wasm_get_f32_unaligned = Module["_mono_wasm_get_f32_unaligned"] = wasmExports["mono_wasm_get_f32_unaligned"])(a0);

var _mono_wasm_get_f64_unaligned = Module["_mono_wasm_get_f64_unaligned"] = a0 => (_mono_wasm_get_f64_unaligned = Module["_mono_wasm_get_f64_unaligned"] = wasmExports["mono_wasm_get_f64_unaligned"])(a0);

var _mono_wasm_get_i32_unaligned = Module["_mono_wasm_get_i32_unaligned"] = a0 => (_mono_wasm_get_i32_unaligned = Module["_mono_wasm_get_i32_unaligned"] = wasmExports["mono_wasm_get_i32_unaligned"])(a0);

var _mono_wasm_is_zero_page_reserved = Module["_mono_wasm_is_zero_page_reserved"] = () => (_mono_wasm_is_zero_page_reserved = Module["_mono_wasm_is_zero_page_reserved"] = wasmExports["mono_wasm_is_zero_page_reserved"])();

var _mono_wasm_read_as_bool_or_null_unsafe = Module["_mono_wasm_read_as_bool_or_null_unsafe"] = a0 => (_mono_wasm_read_as_bool_or_null_unsafe = Module["_mono_wasm_read_as_bool_or_null_unsafe"] = wasmExports["mono_wasm_read_as_bool_or_null_unsafe"])(a0);

var _mono_wasm_assembly_load = Module["_mono_wasm_assembly_load"] = a0 => (_mono_wasm_assembly_load = Module["_mono_wasm_assembly_load"] = wasmExports["mono_wasm_assembly_load"])(a0);

var _mono_wasm_assembly_find_class = Module["_mono_wasm_assembly_find_class"] = (a0, a1, a2) => (_mono_wasm_assembly_find_class = Module["_mono_wasm_assembly_find_class"] = wasmExports["mono_wasm_assembly_find_class"])(a0, a1, a2);

var _mono_wasm_assembly_find_method = Module["_mono_wasm_assembly_find_method"] = (a0, a1, a2) => (_mono_wasm_assembly_find_method = Module["_mono_wasm_assembly_find_method"] = wasmExports["mono_wasm_assembly_find_method"])(a0, a1, a2);

var _mono_aot_System_Data_HashFunction_Core_get_method = Module["_mono_aot_System_Data_HashFunction_Core_get_method"] = a0 => (_mono_aot_System_Data_HashFunction_Core_get_method = Module["_mono_aot_System_Data_HashFunction_Core_get_method"] = wasmExports["mono_aot_System_Data_HashFunction_Core_get_method"])(a0);

var _mono_aot_System_Data_HashFunction_Interfaces_get_method = Module["_mono_aot_System_Data_HashFunction_Interfaces_get_method"] = a0 => (_mono_aot_System_Data_HashFunction_Interfaces_get_method = Module["_mono_aot_System_Data_HashFunction_Interfaces_get_method"] = wasmExports["mono_aot_System_Data_HashFunction_Interfaces_get_method"])(a0);

var _mono_aot_System_Data_HashFunction_xxHash_get_method = Module["_mono_aot_System_Data_HashFunction_xxHash_get_method"] = a0 => (_mono_aot_System_Data_HashFunction_xxHash_get_method = Module["_mono_aot_System_Data_HashFunction_xxHash_get_method"] = wasmExports["mono_aot_System_Data_HashFunction_xxHash_get_method"])(a0);

var _mono_aot_FNA_get_method = Module["_mono_aot_FNA_get_method"] = a0 => (_mono_aot_FNA_get_method = Module["_mono_aot_FNA_get_method"] = wasmExports["mono_aot_FNA_get_method"])(a0);

var _mono_aot_stardew_get_method = Module["_mono_aot_stardew_get_method"] = a0 => (_mono_aot_stardew_get_method = Module["_mono_aot_stardew_get_method"] = wasmExports["mono_aot_stardew_get_method"])(a0);

var _mono_aot_System_Collections_Concurrent_get_method = Module["_mono_aot_System_Collections_Concurrent_get_method"] = a0 => (_mono_aot_System_Collections_Concurrent_get_method = Module["_mono_aot_System_Collections_Concurrent_get_method"] = wasmExports["mono_aot_System_Collections_Concurrent_get_method"])(a0);

var _mono_aot_System_Collections_NonGeneric_get_method = Module["_mono_aot_System_Collections_NonGeneric_get_method"] = a0 => (_mono_aot_System_Collections_NonGeneric_get_method = Module["_mono_aot_System_Collections_NonGeneric_get_method"] = wasmExports["mono_aot_System_Collections_NonGeneric_get_method"])(a0);

var _mono_aot_System_Collections_Specialized_get_method = Module["_mono_aot_System_Collections_Specialized_get_method"] = a0 => (_mono_aot_System_Collections_Specialized_get_method = Module["_mono_aot_System_Collections_Specialized_get_method"] = wasmExports["mono_aot_System_Collections_Specialized_get_method"])(a0);

var _mono_aot_System_Collections_get_method = Module["_mono_aot_System_Collections_get_method"] = a0 => (_mono_aot_System_Collections_get_method = Module["_mono_aot_System_Collections_get_method"] = wasmExports["mono_aot_System_Collections_get_method"])(a0);

var _mono_aot_System_ComponentModel_Primitives_get_method = Module["_mono_aot_System_ComponentModel_Primitives_get_method"] = a0 => (_mono_aot_System_ComponentModel_Primitives_get_method = Module["_mono_aot_System_ComponentModel_Primitives_get_method"] = wasmExports["mono_aot_System_ComponentModel_Primitives_get_method"])(a0);

var _mono_aot_System_ComponentModel_TypeConverter_get_method = Module["_mono_aot_System_ComponentModel_TypeConverter_get_method"] = a0 => (_mono_aot_System_ComponentModel_TypeConverter_get_method = Module["_mono_aot_System_ComponentModel_TypeConverter_get_method"] = wasmExports["mono_aot_System_ComponentModel_TypeConverter_get_method"])(a0);

var _mono_aot_System_ComponentModel_get_method = Module["_mono_aot_System_ComponentModel_get_method"] = a0 => (_mono_aot_System_ComponentModel_get_method = Module["_mono_aot_System_ComponentModel_get_method"] = wasmExports["mono_aot_System_ComponentModel_get_method"])(a0);

var _mono_aot_System_Console_get_method = Module["_mono_aot_System_Console_get_method"] = a0 => (_mono_aot_System_Console_get_method = Module["_mono_aot_System_Console_get_method"] = wasmExports["mono_aot_System_Console_get_method"])(a0);

var _mono_aot_System_Core_get_method = Module["_mono_aot_System_Core_get_method"] = a0 => (_mono_aot_System_Core_get_method = Module["_mono_aot_System_Core_get_method"] = wasmExports["mono_aot_System_Core_get_method"])(a0);

var _mono_aot_System_Diagnostics_DiagnosticSource_get_method = Module["_mono_aot_System_Diagnostics_DiagnosticSource_get_method"] = a0 => (_mono_aot_System_Diagnostics_DiagnosticSource_get_method = Module["_mono_aot_System_Diagnostics_DiagnosticSource_get_method"] = wasmExports["mono_aot_System_Diagnostics_DiagnosticSource_get_method"])(a0);

var _mono_aot_System_Diagnostics_StackTrace_get_method = Module["_mono_aot_System_Diagnostics_StackTrace_get_method"] = a0 => (_mono_aot_System_Diagnostics_StackTrace_get_method = Module["_mono_aot_System_Diagnostics_StackTrace_get_method"] = wasmExports["mono_aot_System_Diagnostics_StackTrace_get_method"])(a0);

var _mono_aot_System_Diagnostics_TraceSource_get_method = Module["_mono_aot_System_Diagnostics_TraceSource_get_method"] = a0 => (_mono_aot_System_Diagnostics_TraceSource_get_method = Module["_mono_aot_System_Diagnostics_TraceSource_get_method"] = wasmExports["mono_aot_System_Diagnostics_TraceSource_get_method"])(a0);

var _mono_aot_System_IO_FileSystem_DriveInfo_get_method = Module["_mono_aot_System_IO_FileSystem_DriveInfo_get_method"] = a0 => (_mono_aot_System_IO_FileSystem_DriveInfo_get_method = Module["_mono_aot_System_IO_FileSystem_DriveInfo_get_method"] = wasmExports["mono_aot_System_IO_FileSystem_DriveInfo_get_method"])(a0);

var _mono_aot_System_Linq_Expressions_get_method = Module["_mono_aot_System_Linq_Expressions_get_method"] = a0 => (_mono_aot_System_Linq_Expressions_get_method = Module["_mono_aot_System_Linq_Expressions_get_method"] = wasmExports["mono_aot_System_Linq_Expressions_get_method"])(a0);

var _mono_aot_System_Linq_get_method = Module["_mono_aot_System_Linq_get_method"] = a0 => (_mono_aot_System_Linq_get_method = Module["_mono_aot_System_Linq_get_method"] = wasmExports["mono_aot_System_Linq_get_method"])(a0);

var _mono_aot_System_Net_Http_get_method = Module["_mono_aot_System_Net_Http_get_method"] = a0 => (_mono_aot_System_Net_Http_get_method = Module["_mono_aot_System_Net_Http_get_method"] = wasmExports["mono_aot_System_Net_Http_get_method"])(a0);

var _mono_aot_System_Net_NameResolution_get_method = Module["_mono_aot_System_Net_NameResolution_get_method"] = a0 => (_mono_aot_System_Net_NameResolution_get_method = Module["_mono_aot_System_Net_NameResolution_get_method"] = wasmExports["mono_aot_System_Net_NameResolution_get_method"])(a0);

var _mono_aot_System_Net_NetworkInformation_get_method = Module["_mono_aot_System_Net_NetworkInformation_get_method"] = a0 => (_mono_aot_System_Net_NetworkInformation_get_method = Module["_mono_aot_System_Net_NetworkInformation_get_method"] = wasmExports["mono_aot_System_Net_NetworkInformation_get_method"])(a0);

var _mono_aot_System_Net_Primitives_get_method = Module["_mono_aot_System_Net_Primitives_get_method"] = a0 => (_mono_aot_System_Net_Primitives_get_method = Module["_mono_aot_System_Net_Primitives_get_method"] = wasmExports["mono_aot_System_Net_Primitives_get_method"])(a0);

var _mono_aot_System_Net_Requests_get_method = Module["_mono_aot_System_Net_Requests_get_method"] = a0 => (_mono_aot_System_Net_Requests_get_method = Module["_mono_aot_System_Net_Requests_get_method"] = wasmExports["mono_aot_System_Net_Requests_get_method"])(a0);

var _mono_aot_System_Net_Sockets_get_method = Module["_mono_aot_System_Net_Sockets_get_method"] = a0 => (_mono_aot_System_Net_Sockets_get_method = Module["_mono_aot_System_Net_Sockets_get_method"] = wasmExports["mono_aot_System_Net_Sockets_get_method"])(a0);

var _mono_aot_System_Net_WebHeaderCollection_get_method = Module["_mono_aot_System_Net_WebHeaderCollection_get_method"] = a0 => (_mono_aot_System_Net_WebHeaderCollection_get_method = Module["_mono_aot_System_Net_WebHeaderCollection_get_method"] = wasmExports["mono_aot_System_Net_WebHeaderCollection_get_method"])(a0);

var _mono_aot_System_Numerics_get_method = Module["_mono_aot_System_Numerics_get_method"] = a0 => (_mono_aot_System_Numerics_get_method = Module["_mono_aot_System_Numerics_get_method"] = wasmExports["mono_aot_System_Numerics_get_method"])(a0);

var _mono_aot_System_ObjectModel_get_method = Module["_mono_aot_System_ObjectModel_get_method"] = a0 => (_mono_aot_System_ObjectModel_get_method = Module["_mono_aot_System_ObjectModel_get_method"] = wasmExports["mono_aot_System_ObjectModel_get_method"])(a0);

var _mono_aot_System_Private_Uri_get_method = Module["_mono_aot_System_Private_Uri_get_method"] = a0 => (_mono_aot_System_Private_Uri_get_method = Module["_mono_aot_System_Private_Uri_get_method"] = wasmExports["mono_aot_System_Private_Uri_get_method"])(a0);

var _mono_aot_System_Private_Xml_get_method = Module["_mono_aot_System_Private_Xml_get_method"] = a0 => (_mono_aot_System_Private_Xml_get_method = Module["_mono_aot_System_Private_Xml_get_method"] = wasmExports["mono_aot_System_Private_Xml_get_method"])(a0);

var _mono_aot_System_Reflection_Emit_Lightweight_get_method = Module["_mono_aot_System_Reflection_Emit_Lightweight_get_method"] = a0 => (_mono_aot_System_Reflection_Emit_Lightweight_get_method = Module["_mono_aot_System_Reflection_Emit_Lightweight_get_method"] = wasmExports["mono_aot_System_Reflection_Emit_Lightweight_get_method"])(a0);

var _mono_aot_System_Runtime_InteropServices_JavaScript_get_method = Module["_mono_aot_System_Runtime_InteropServices_JavaScript_get_method"] = a0 => (_mono_aot_System_Runtime_InteropServices_JavaScript_get_method = Module["_mono_aot_System_Runtime_InteropServices_JavaScript_get_method"] = wasmExports["mono_aot_System_Runtime_InteropServices_JavaScript_get_method"])(a0);

var _mono_aot_System_Runtime_InteropServices_get_method = Module["_mono_aot_System_Runtime_InteropServices_get_method"] = a0 => (_mono_aot_System_Runtime_InteropServices_get_method = Module["_mono_aot_System_Runtime_InteropServices_get_method"] = wasmExports["mono_aot_System_Runtime_InteropServices_get_method"])(a0);

var _mono_aot_System_Runtime_Numerics_get_method = Module["_mono_aot_System_Runtime_Numerics_get_method"] = a0 => (_mono_aot_System_Runtime_Numerics_get_method = Module["_mono_aot_System_Runtime_Numerics_get_method"] = wasmExports["mono_aot_System_Runtime_Numerics_get_method"])(a0);

var _mono_aot_System_Runtime_Serialization_Formatters_get_method = Module["_mono_aot_System_Runtime_Serialization_Formatters_get_method"] = a0 => (_mono_aot_System_Runtime_Serialization_Formatters_get_method = Module["_mono_aot_System_Runtime_Serialization_Formatters_get_method"] = wasmExports["mono_aot_System_Runtime_Serialization_Formatters_get_method"])(a0);

var _mono_aot_System_Runtime_get_method = Module["_mono_aot_System_Runtime_get_method"] = a0 => (_mono_aot_System_Runtime_get_method = Module["_mono_aot_System_Runtime_get_method"] = wasmExports["mono_aot_System_Runtime_get_method"])(a0);

var _mono_aot_System_Security_Cryptography_get_method = Module["_mono_aot_System_Security_Cryptography_get_method"] = a0 => (_mono_aot_System_Security_Cryptography_get_method = Module["_mono_aot_System_Security_Cryptography_get_method"] = wasmExports["mono_aot_System_Security_Cryptography_get_method"])(a0);

var _mono_aot_System_Text_Encoding_Extensions_get_method = Module["_mono_aot_System_Text_Encoding_Extensions_get_method"] = a0 => (_mono_aot_System_Text_Encoding_Extensions_get_method = Module["_mono_aot_System_Text_Encoding_Extensions_get_method"] = wasmExports["mono_aot_System_Text_Encoding_Extensions_get_method"])(a0);

var _mono_aot_System_Text_RegularExpressions_get_method = Module["_mono_aot_System_Text_RegularExpressions_get_method"] = a0 => (_mono_aot_System_Text_RegularExpressions_get_method = Module["_mono_aot_System_Text_RegularExpressions_get_method"] = wasmExports["mono_aot_System_Text_RegularExpressions_get_method"])(a0);

var _mono_aot_System_Threading_Thread_get_method = Module["_mono_aot_System_Threading_Thread_get_method"] = a0 => (_mono_aot_System_Threading_Thread_get_method = Module["_mono_aot_System_Threading_Thread_get_method"] = wasmExports["mono_aot_System_Threading_Thread_get_method"])(a0);

var _mono_aot_System_Threading_get_method = Module["_mono_aot_System_Threading_get_method"] = a0 => (_mono_aot_System_Threading_get_method = Module["_mono_aot_System_Threading_get_method"] = wasmExports["mono_aot_System_Threading_get_method"])(a0);

var _mono_aot_System_Xml_ReaderWriter_get_method = Module["_mono_aot_System_Xml_ReaderWriter_get_method"] = a0 => (_mono_aot_System_Xml_ReaderWriter_get_method = Module["_mono_aot_System_Xml_ReaderWriter_get_method"] = wasmExports["mono_aot_System_Xml_ReaderWriter_get_method"])(a0);

var _mono_aot_System_Xml_XmlSerializer_get_method = Module["_mono_aot_System_Xml_XmlSerializer_get_method"] = a0 => (_mono_aot_System_Xml_XmlSerializer_get_method = Module["_mono_aot_System_Xml_XmlSerializer_get_method"] = wasmExports["mono_aot_System_Xml_XmlSerializer_get_method"])(a0);

var _mono_aot_System_get_method = Module["_mono_aot_System_get_method"] = a0 => (_mono_aot_System_get_method = Module["_mono_aot_System_get_method"] = wasmExports["mono_aot_System_get_method"])(a0);

var _mono_aot_mscorlib_get_method = Module["_mono_aot_mscorlib_get_method"] = a0 => (_mono_aot_mscorlib_get_method = Module["_mono_aot_mscorlib_get_method"] = wasmExports["mono_aot_mscorlib_get_method"])(a0);

var _log2 = Module["_log2"] = a0 => (_log2 = Module["_log2"] = wasmExports["log2"])(a0);

var _fma = Module["_fma"] = (a0, a1, a2) => (_fma = Module["_fma"] = wasmExports["fma"])(a0, a1, a2);

var _log2f = Module["_log2f"] = a0 => (_log2f = Module["_log2f"] = wasmExports["log2f"])(a0);

var _fmaf = Module["_fmaf"] = (a0, a1, a2) => (_fmaf = Module["_fmaf"] = wasmExports["fmaf"])(a0, a1, a2);

var _mono_aot_corlib_get_method = Module["_mono_aot_corlib_get_method"] = a0 => (_mono_aot_corlib_get_method = Module["_mono_aot_corlib_get_method"] = wasmExports["mono_aot_corlib_get_method"])(a0);

var _mono_aot_aot_instances_get_method = Module["_mono_aot_aot_instances_get_method"] = a0 => (_mono_aot_aot_instances_get_method = Module["_mono_aot_aot_instances_get_method"] = wasmExports["mono_aot_aot_instances_get_method"])(a0);

var _mono_wasm_send_dbg_command_with_parms = Module["_mono_wasm_send_dbg_command_with_parms"] = (a0, a1, a2, a3, a4, a5, a6) => (_mono_wasm_send_dbg_command_with_parms = Module["_mono_wasm_send_dbg_command_with_parms"] = wasmExports["mono_wasm_send_dbg_command_with_parms"])(a0, a1, a2, a3, a4, a5, a6);

var _mono_wasm_send_dbg_command = Module["_mono_wasm_send_dbg_command"] = (a0, a1, a2, a3, a4) => (_mono_wasm_send_dbg_command = Module["_mono_wasm_send_dbg_command"] = wasmExports["mono_wasm_send_dbg_command"])(a0, a1, a2, a3, a4);

var _mono_wasm_event_pipe_enable = Module["_mono_wasm_event_pipe_enable"] = (a0, a1, a2, a3, a4, a5) => (_mono_wasm_event_pipe_enable = Module["_mono_wasm_event_pipe_enable"] = wasmExports["mono_wasm_event_pipe_enable"])(a0, a1, a2, a3, a4, a5);

var _mono_wasm_event_pipe_session_start_streaming = Module["_mono_wasm_event_pipe_session_start_streaming"] = a0 => (_mono_wasm_event_pipe_session_start_streaming = Module["_mono_wasm_event_pipe_session_start_streaming"] = wasmExports["mono_wasm_event_pipe_session_start_streaming"])(a0);

var _mono_wasm_event_pipe_session_disable = Module["_mono_wasm_event_pipe_session_disable"] = a0 => (_mono_wasm_event_pipe_session_disable = Module["_mono_wasm_event_pipe_session_disable"] = wasmExports["mono_wasm_event_pipe_session_disable"])(a0);

var _mono_jiterp_register_jit_call_thunk = Module["_mono_jiterp_register_jit_call_thunk"] = (a0, a1) => (_mono_jiterp_register_jit_call_thunk = Module["_mono_jiterp_register_jit_call_thunk"] = wasmExports["mono_jiterp_register_jit_call_thunk"])(a0, a1);

var _mono_jiterp_stackval_to_data = Module["_mono_jiterp_stackval_to_data"] = (a0, a1, a2) => (_mono_jiterp_stackval_to_data = Module["_mono_jiterp_stackval_to_data"] = wasmExports["mono_jiterp_stackval_to_data"])(a0, a1, a2);

var _mono_jiterp_stackval_from_data = Module["_mono_jiterp_stackval_from_data"] = (a0, a1, a2) => (_mono_jiterp_stackval_from_data = Module["_mono_jiterp_stackval_from_data"] = wasmExports["mono_jiterp_stackval_from_data"])(a0, a1, a2);

var _mono_jiterp_get_arg_offset = Module["_mono_jiterp_get_arg_offset"] = (a0, a1, a2) => (_mono_jiterp_get_arg_offset = Module["_mono_jiterp_get_arg_offset"] = wasmExports["mono_jiterp_get_arg_offset"])(a0, a1, a2);

var _mono_jiterp_overflow_check_i4 = Module["_mono_jiterp_overflow_check_i4"] = (a0, a1, a2) => (_mono_jiterp_overflow_check_i4 = Module["_mono_jiterp_overflow_check_i4"] = wasmExports["mono_jiterp_overflow_check_i4"])(a0, a1, a2);

var _mono_jiterp_overflow_check_u4 = Module["_mono_jiterp_overflow_check_u4"] = (a0, a1, a2) => (_mono_jiterp_overflow_check_u4 = Module["_mono_jiterp_overflow_check_u4"] = wasmExports["mono_jiterp_overflow_check_u4"])(a0, a1, a2);

var _mono_jiterp_ld_delegate_method_ptr = Module["_mono_jiterp_ld_delegate_method_ptr"] = (a0, a1) => (_mono_jiterp_ld_delegate_method_ptr = Module["_mono_jiterp_ld_delegate_method_ptr"] = wasmExports["mono_jiterp_ld_delegate_method_ptr"])(a0, a1);

var _mono_jiterp_interp_entry = Module["_mono_jiterp_interp_entry"] = (a0, a1) => (_mono_jiterp_interp_entry = Module["_mono_jiterp_interp_entry"] = wasmExports["mono_jiterp_interp_entry"])(a0, a1);

var _asinh = Module["_asinh"] = a0 => (_asinh = Module["_asinh"] = wasmExports["asinh"])(a0);

var _acosh = Module["_acosh"] = a0 => (_acosh = Module["_acosh"] = wasmExports["acosh"])(a0);

var _atanh = Module["_atanh"] = a0 => (_atanh = Module["_atanh"] = wasmExports["atanh"])(a0);

var _cbrt = Module["_cbrt"] = a0 => (_cbrt = Module["_cbrt"] = wasmExports["cbrt"])(a0);

var _cosh = Module["_cosh"] = a0 => (_cosh = Module["_cosh"] = wasmExports["cosh"])(a0);

var _sinh = Module["_sinh"] = a0 => (_sinh = Module["_sinh"] = wasmExports["sinh"])(a0);

var _tanh = Module["_tanh"] = a0 => (_tanh = Module["_tanh"] = wasmExports["tanh"])(a0);

var _asinhf = Module["_asinhf"] = a0 => (_asinhf = Module["_asinhf"] = wasmExports["asinhf"])(a0);

var _acoshf = Module["_acoshf"] = a0 => (_acoshf = Module["_acoshf"] = wasmExports["acoshf"])(a0);

var _atanhf = Module["_atanhf"] = a0 => (_atanhf = Module["_atanhf"] = wasmExports["atanhf"])(a0);

var _cbrtf = Module["_cbrtf"] = a0 => (_cbrtf = Module["_cbrtf"] = wasmExports["cbrtf"])(a0);

var _coshf = Module["_coshf"] = a0 => (_coshf = Module["_coshf"] = wasmExports["coshf"])(a0);

var _sinhf = Module["_sinhf"] = a0 => (_sinhf = Module["_sinhf"] = wasmExports["sinhf"])(a0);

var _tanhf = Module["_tanhf"] = a0 => (_tanhf = Module["_tanhf"] = wasmExports["tanhf"])(a0);

var _mono_jiterp_get_polling_required_address = Module["_mono_jiterp_get_polling_required_address"] = () => (_mono_jiterp_get_polling_required_address = Module["_mono_jiterp_get_polling_required_address"] = wasmExports["mono_jiterp_get_polling_required_address"])();

var _mono_jiterp_do_safepoint = Module["_mono_jiterp_do_safepoint"] = (a0, a1) => (_mono_jiterp_do_safepoint = Module["_mono_jiterp_do_safepoint"] = wasmExports["mono_jiterp_do_safepoint"])(a0, a1);

var _mono_jiterp_imethod_to_ftnptr = Module["_mono_jiterp_imethod_to_ftnptr"] = a0 => (_mono_jiterp_imethod_to_ftnptr = Module["_mono_jiterp_imethod_to_ftnptr"] = wasmExports["mono_jiterp_imethod_to_ftnptr"])(a0);

var _mono_jiterp_enum_hasflag = Module["_mono_jiterp_enum_hasflag"] = (a0, a1, a2, a3) => (_mono_jiterp_enum_hasflag = Module["_mono_jiterp_enum_hasflag"] = wasmExports["mono_jiterp_enum_hasflag"])(a0, a1, a2, a3);

var _mono_jiterp_get_simd_intrinsic = Module["_mono_jiterp_get_simd_intrinsic"] = (a0, a1) => (_mono_jiterp_get_simd_intrinsic = Module["_mono_jiterp_get_simd_intrinsic"] = wasmExports["mono_jiterp_get_simd_intrinsic"])(a0, a1);

var _mono_jiterp_get_simd_opcode = Module["_mono_jiterp_get_simd_opcode"] = (a0, a1) => (_mono_jiterp_get_simd_opcode = Module["_mono_jiterp_get_simd_opcode"] = wasmExports["mono_jiterp_get_simd_opcode"])(a0, a1);

var _mono_jiterp_get_opcode_info = Module["_mono_jiterp_get_opcode_info"] = (a0, a1) => (_mono_jiterp_get_opcode_info = Module["_mono_jiterp_get_opcode_info"] = wasmExports["mono_jiterp_get_opcode_info"])(a0, a1);

var _mono_jiterp_placeholder_trace = Module["_mono_jiterp_placeholder_trace"] = (a0, a1, a2, a3) => (_mono_jiterp_placeholder_trace = Module["_mono_jiterp_placeholder_trace"] = wasmExports["mono_jiterp_placeholder_trace"])(a0, a1, a2, a3);

var _mono_jiterp_placeholder_jit_call = Module["_mono_jiterp_placeholder_jit_call"] = (a0, a1, a2, a3) => (_mono_jiterp_placeholder_jit_call = Module["_mono_jiterp_placeholder_jit_call"] = wasmExports["mono_jiterp_placeholder_jit_call"])(a0, a1, a2, a3);

var _mono_jiterp_get_interp_entry_func = Module["_mono_jiterp_get_interp_entry_func"] = a0 => (_mono_jiterp_get_interp_entry_func = Module["_mono_jiterp_get_interp_entry_func"] = wasmExports["mono_jiterp_get_interp_entry_func"])(a0);

var _mono_jiterp_is_enabled = Module["_mono_jiterp_is_enabled"] = () => (_mono_jiterp_is_enabled = Module["_mono_jiterp_is_enabled"] = wasmExports["mono_jiterp_is_enabled"])();

var _mono_jiterp_encode_leb64_ref = Module["_mono_jiterp_encode_leb64_ref"] = (a0, a1, a2) => (_mono_jiterp_encode_leb64_ref = Module["_mono_jiterp_encode_leb64_ref"] = wasmExports["mono_jiterp_encode_leb64_ref"])(a0, a1, a2);

var _mono_jiterp_encode_leb52 = Module["_mono_jiterp_encode_leb52"] = (a0, a1, a2) => (_mono_jiterp_encode_leb52 = Module["_mono_jiterp_encode_leb52"] = wasmExports["mono_jiterp_encode_leb52"])(a0, a1, a2);

var _mono_jiterp_encode_leb_signed_boundary = Module["_mono_jiterp_encode_leb_signed_boundary"] = (a0, a1, a2) => (_mono_jiterp_encode_leb_signed_boundary = Module["_mono_jiterp_encode_leb_signed_boundary"] = wasmExports["mono_jiterp_encode_leb_signed_boundary"])(a0, a1, a2);

var _mono_jiterp_increase_entry_count = Module["_mono_jiterp_increase_entry_count"] = a0 => (_mono_jiterp_increase_entry_count = Module["_mono_jiterp_increase_entry_count"] = wasmExports["mono_jiterp_increase_entry_count"])(a0);

var _mono_jiterp_object_unbox = Module["_mono_jiterp_object_unbox"] = a0 => (_mono_jiterp_object_unbox = Module["_mono_jiterp_object_unbox"] = wasmExports["mono_jiterp_object_unbox"])(a0);

var _mono_jiterp_type_is_byref = Module["_mono_jiterp_type_is_byref"] = a0 => (_mono_jiterp_type_is_byref = Module["_mono_jiterp_type_is_byref"] = wasmExports["mono_jiterp_type_is_byref"])(a0);

var _mono_jiterp_value_copy = Module["_mono_jiterp_value_copy"] = (a0, a1, a2) => (_mono_jiterp_value_copy = Module["_mono_jiterp_value_copy"] = wasmExports["mono_jiterp_value_copy"])(a0, a1, a2);

var _mono_jiterp_try_newobj_inlined = Module["_mono_jiterp_try_newobj_inlined"] = (a0, a1) => (_mono_jiterp_try_newobj_inlined = Module["_mono_jiterp_try_newobj_inlined"] = wasmExports["mono_jiterp_try_newobj_inlined"])(a0, a1);

var _mono_jiterp_try_newstr = Module["_mono_jiterp_try_newstr"] = (a0, a1) => (_mono_jiterp_try_newstr = Module["_mono_jiterp_try_newstr"] = wasmExports["mono_jiterp_try_newstr"])(a0, a1);

var _mono_jiterp_gettype_ref = Module["_mono_jiterp_gettype_ref"] = (a0, a1) => (_mono_jiterp_gettype_ref = Module["_mono_jiterp_gettype_ref"] = wasmExports["mono_jiterp_gettype_ref"])(a0, a1);

var _mono_jiterp_has_parent_fast = Module["_mono_jiterp_has_parent_fast"] = (a0, a1) => (_mono_jiterp_has_parent_fast = Module["_mono_jiterp_has_parent_fast"] = wasmExports["mono_jiterp_has_parent_fast"])(a0, a1);

var _mono_jiterp_implements_interface = Module["_mono_jiterp_implements_interface"] = (a0, a1) => (_mono_jiterp_implements_interface = Module["_mono_jiterp_implements_interface"] = wasmExports["mono_jiterp_implements_interface"])(a0, a1);

var _mono_jiterp_is_special_interface = Module["_mono_jiterp_is_special_interface"] = a0 => (_mono_jiterp_is_special_interface = Module["_mono_jiterp_is_special_interface"] = wasmExports["mono_jiterp_is_special_interface"])(a0);

var _mono_jiterp_implements_special_interface = Module["_mono_jiterp_implements_special_interface"] = (a0, a1, a2) => (_mono_jiterp_implements_special_interface = Module["_mono_jiterp_implements_special_interface"] = wasmExports["mono_jiterp_implements_special_interface"])(a0, a1, a2);

var _mono_jiterp_cast_v2 = Module["_mono_jiterp_cast_v2"] = (a0, a1, a2, a3) => (_mono_jiterp_cast_v2 = Module["_mono_jiterp_cast_v2"] = wasmExports["mono_jiterp_cast_v2"])(a0, a1, a2, a3);

var _mono_jiterp_localloc = Module["_mono_jiterp_localloc"] = (a0, a1, a2) => (_mono_jiterp_localloc = Module["_mono_jiterp_localloc"] = wasmExports["mono_jiterp_localloc"])(a0, a1, a2);

var _mono_jiterp_ldtsflda = Module["_mono_jiterp_ldtsflda"] = (a0, a1) => (_mono_jiterp_ldtsflda = Module["_mono_jiterp_ldtsflda"] = wasmExports["mono_jiterp_ldtsflda"])(a0, a1);

var _mono_jiterp_box_ref = Module["_mono_jiterp_box_ref"] = (a0, a1, a2, a3) => (_mono_jiterp_box_ref = Module["_mono_jiterp_box_ref"] = wasmExports["mono_jiterp_box_ref"])(a0, a1, a2, a3);

var _mono_jiterp_conv = Module["_mono_jiterp_conv"] = (a0, a1, a2) => (_mono_jiterp_conv = Module["_mono_jiterp_conv"] = wasmExports["mono_jiterp_conv"])(a0, a1, a2);

var _mono_jiterp_relop_fp = Module["_mono_jiterp_relop_fp"] = (a0, a1, a2) => (_mono_jiterp_relop_fp = Module["_mono_jiterp_relop_fp"] = wasmExports["mono_jiterp_relop_fp"])(a0, a1, a2);

var _mono_jiterp_get_size_of_stackval = Module["_mono_jiterp_get_size_of_stackval"] = () => (_mono_jiterp_get_size_of_stackval = Module["_mono_jiterp_get_size_of_stackval"] = wasmExports["mono_jiterp_get_size_of_stackval"])();

var _mono_jiterp_type_get_raw_value_size = Module["_mono_jiterp_type_get_raw_value_size"] = a0 => (_mono_jiterp_type_get_raw_value_size = Module["_mono_jiterp_type_get_raw_value_size"] = wasmExports["mono_jiterp_type_get_raw_value_size"])(a0);

var _mono_jiterp_trace_bailout = Module["_mono_jiterp_trace_bailout"] = a0 => (_mono_jiterp_trace_bailout = Module["_mono_jiterp_trace_bailout"] = wasmExports["mono_jiterp_trace_bailout"])(a0);

var _mono_jiterp_get_trace_bailout_count = Module["_mono_jiterp_get_trace_bailout_count"] = a0 => (_mono_jiterp_get_trace_bailout_count = Module["_mono_jiterp_get_trace_bailout_count"] = wasmExports["mono_jiterp_get_trace_bailout_count"])(a0);

var _mono_jiterp_adjust_abort_count = Module["_mono_jiterp_adjust_abort_count"] = (a0, a1) => (_mono_jiterp_adjust_abort_count = Module["_mono_jiterp_adjust_abort_count"] = wasmExports["mono_jiterp_adjust_abort_count"])(a0, a1);

var _mono_jiterp_interp_entry_prologue = Module["_mono_jiterp_interp_entry_prologue"] = (a0, a1) => (_mono_jiterp_interp_entry_prologue = Module["_mono_jiterp_interp_entry_prologue"] = wasmExports["mono_jiterp_interp_entry_prologue"])(a0, a1);

var _mono_jiterp_get_opcode_value_table_entry = Module["_mono_jiterp_get_opcode_value_table_entry"] = a0 => (_mono_jiterp_get_opcode_value_table_entry = Module["_mono_jiterp_get_opcode_value_table_entry"] = wasmExports["mono_jiterp_get_opcode_value_table_entry"])(a0);

var _mono_jiterp_get_trace_hit_count = Module["_mono_jiterp_get_trace_hit_count"] = a0 => (_mono_jiterp_get_trace_hit_count = Module["_mono_jiterp_get_trace_hit_count"] = wasmExports["mono_jiterp_get_trace_hit_count"])(a0);

var _mono_jiterp_parse_option = Module["_mono_jiterp_parse_option"] = a0 => (_mono_jiterp_parse_option = Module["_mono_jiterp_parse_option"] = wasmExports["mono_jiterp_parse_option"])(a0);

var _mono_jiterp_get_options_version = Module["_mono_jiterp_get_options_version"] = () => (_mono_jiterp_get_options_version = Module["_mono_jiterp_get_options_version"] = wasmExports["mono_jiterp_get_options_version"])();

var _mono_jiterp_get_options_as_json = Module["_mono_jiterp_get_options_as_json"] = () => (_mono_jiterp_get_options_as_json = Module["_mono_jiterp_get_options_as_json"] = wasmExports["mono_jiterp_get_options_as_json"])();

var _mono_jiterp_get_option_as_int = Module["_mono_jiterp_get_option_as_int"] = a0 => (_mono_jiterp_get_option_as_int = Module["_mono_jiterp_get_option_as_int"] = wasmExports["mono_jiterp_get_option_as_int"])(a0);

var _mono_jiterp_object_has_component_size = Module["_mono_jiterp_object_has_component_size"] = a0 => (_mono_jiterp_object_has_component_size = Module["_mono_jiterp_object_has_component_size"] = wasmExports["mono_jiterp_object_has_component_size"])(a0);

var _mono_jiterp_get_hashcode = Module["_mono_jiterp_get_hashcode"] = a0 => (_mono_jiterp_get_hashcode = Module["_mono_jiterp_get_hashcode"] = wasmExports["mono_jiterp_get_hashcode"])(a0);

var _mono_jiterp_try_get_hashcode = Module["_mono_jiterp_try_get_hashcode"] = a0 => (_mono_jiterp_try_get_hashcode = Module["_mono_jiterp_try_get_hashcode"] = wasmExports["mono_jiterp_try_get_hashcode"])(a0);

var _mono_jiterp_get_signature_has_this = Module["_mono_jiterp_get_signature_has_this"] = a0 => (_mono_jiterp_get_signature_has_this = Module["_mono_jiterp_get_signature_has_this"] = wasmExports["mono_jiterp_get_signature_has_this"])(a0);

var _mono_jiterp_get_signature_return_type = Module["_mono_jiterp_get_signature_return_type"] = a0 => (_mono_jiterp_get_signature_return_type = Module["_mono_jiterp_get_signature_return_type"] = wasmExports["mono_jiterp_get_signature_return_type"])(a0);

var _mono_jiterp_get_signature_param_count = Module["_mono_jiterp_get_signature_param_count"] = a0 => (_mono_jiterp_get_signature_param_count = Module["_mono_jiterp_get_signature_param_count"] = wasmExports["mono_jiterp_get_signature_param_count"])(a0);

var _mono_jiterp_get_signature_params = Module["_mono_jiterp_get_signature_params"] = a0 => (_mono_jiterp_get_signature_params = Module["_mono_jiterp_get_signature_params"] = wasmExports["mono_jiterp_get_signature_params"])(a0);

var _mono_jiterp_type_to_ldind = Module["_mono_jiterp_type_to_ldind"] = a0 => (_mono_jiterp_type_to_ldind = Module["_mono_jiterp_type_to_ldind"] = wasmExports["mono_jiterp_type_to_ldind"])(a0);

var _mono_jiterp_type_to_stind = Module["_mono_jiterp_type_to_stind"] = a0 => (_mono_jiterp_type_to_stind = Module["_mono_jiterp_type_to_stind"] = wasmExports["mono_jiterp_type_to_stind"])(a0);

var _mono_jiterp_get_array_rank = Module["_mono_jiterp_get_array_rank"] = (a0, a1) => (_mono_jiterp_get_array_rank = Module["_mono_jiterp_get_array_rank"] = wasmExports["mono_jiterp_get_array_rank"])(a0, a1);

var _mono_jiterp_get_array_element_size = Module["_mono_jiterp_get_array_element_size"] = (a0, a1) => (_mono_jiterp_get_array_element_size = Module["_mono_jiterp_get_array_element_size"] = wasmExports["mono_jiterp_get_array_element_size"])(a0, a1);

var _mono_jiterp_set_object_field = Module["_mono_jiterp_set_object_field"] = (a0, a1, a2, a3) => (_mono_jiterp_set_object_field = Module["_mono_jiterp_set_object_field"] = wasmExports["mono_jiterp_set_object_field"])(a0, a1, a2, a3);

var _mono_jiterp_debug_count = Module["_mono_jiterp_debug_count"] = () => (_mono_jiterp_debug_count = Module["_mono_jiterp_debug_count"] = wasmExports["mono_jiterp_debug_count"])();

var _mono_jiterp_stelem_ref = Module["_mono_jiterp_stelem_ref"] = (a0, a1, a2) => (_mono_jiterp_stelem_ref = Module["_mono_jiterp_stelem_ref"] = wasmExports["mono_jiterp_stelem_ref"])(a0, a1, a2);

var _mono_jiterp_get_member_offset = Module["_mono_jiterp_get_member_offset"] = a0 => (_mono_jiterp_get_member_offset = Module["_mono_jiterp_get_member_offset"] = wasmExports["mono_jiterp_get_member_offset"])(a0);

var _mono_jiterp_get_counter = Module["_mono_jiterp_get_counter"] = a0 => (_mono_jiterp_get_counter = Module["_mono_jiterp_get_counter"] = wasmExports["mono_jiterp_get_counter"])(a0);

var _mono_jiterp_modify_counter = Module["_mono_jiterp_modify_counter"] = (a0, a1) => (_mono_jiterp_modify_counter = Module["_mono_jiterp_modify_counter"] = wasmExports["mono_jiterp_modify_counter"])(a0, a1);

var _mono_jiterp_write_number_unaligned = Module["_mono_jiterp_write_number_unaligned"] = (a0, a1, a2) => (_mono_jiterp_write_number_unaligned = Module["_mono_jiterp_write_number_unaligned"] = wasmExports["mono_jiterp_write_number_unaligned"])(a0, a1, a2);

var _mono_jiterp_get_rejected_trace_count = Module["_mono_jiterp_get_rejected_trace_count"] = () => (_mono_jiterp_get_rejected_trace_count = Module["_mono_jiterp_get_rejected_trace_count"] = wasmExports["mono_jiterp_get_rejected_trace_count"])();

var _mono_jiterp_boost_back_branch_target = Module["_mono_jiterp_boost_back_branch_target"] = a0 => (_mono_jiterp_boost_back_branch_target = Module["_mono_jiterp_boost_back_branch_target"] = wasmExports["mono_jiterp_boost_back_branch_target"])(a0);

var _mono_jiterp_is_imethod_var_address_taken = Module["_mono_jiterp_is_imethod_var_address_taken"] = (a0, a1) => (_mono_jiterp_is_imethod_var_address_taken = Module["_mono_jiterp_is_imethod_var_address_taken"] = wasmExports["mono_jiterp_is_imethod_var_address_taken"])(a0, a1);

var _mono_jiterp_initialize_table = Module["_mono_jiterp_initialize_table"] = (a0, a1, a2) => (_mono_jiterp_initialize_table = Module["_mono_jiterp_initialize_table"] = wasmExports["mono_jiterp_initialize_table"])(a0, a1, a2);

var _mono_jiterp_allocate_table_entry = Module["_mono_jiterp_allocate_table_entry"] = a0 => (_mono_jiterp_allocate_table_entry = Module["_mono_jiterp_allocate_table_entry"] = wasmExports["mono_jiterp_allocate_table_entry"])(a0);

var _mono_jiterp_tlqueue_next = Module["_mono_jiterp_tlqueue_next"] = a0 => (_mono_jiterp_tlqueue_next = Module["_mono_jiterp_tlqueue_next"] = wasmExports["mono_jiterp_tlqueue_next"])(a0);

var _mono_jiterp_tlqueue_add = Module["_mono_jiterp_tlqueue_add"] = (a0, a1) => (_mono_jiterp_tlqueue_add = Module["_mono_jiterp_tlqueue_add"] = wasmExports["mono_jiterp_tlqueue_add"])(a0, a1);

var _mono_jiterp_tlqueue_clear = Module["_mono_jiterp_tlqueue_clear"] = a0 => (_mono_jiterp_tlqueue_clear = Module["_mono_jiterp_tlqueue_clear"] = wasmExports["mono_jiterp_tlqueue_clear"])(a0);

var _mono_interp_pgo_load_table = Module["_mono_interp_pgo_load_table"] = (a0, a1) => (_mono_interp_pgo_load_table = Module["_mono_interp_pgo_load_table"] = wasmExports["mono_interp_pgo_load_table"])(a0, a1);

var _mono_interp_pgo_save_table = Module["_mono_interp_pgo_save_table"] = (a0, a1) => (_mono_interp_pgo_save_table = Module["_mono_interp_pgo_save_table"] = wasmExports["mono_interp_pgo_save_table"])(a0, a1);

var _mono_llvm_cpp_catch_exception = Module["_mono_llvm_cpp_catch_exception"] = (a0, a1, a2) => (_mono_llvm_cpp_catch_exception = Module["_mono_llvm_cpp_catch_exception"] = wasmExports["mono_llvm_cpp_catch_exception"])(a0, a1, a2);

var _mono_jiterp_begin_catch = Module["_mono_jiterp_begin_catch"] = a0 => (_mono_jiterp_begin_catch = Module["_mono_jiterp_begin_catch"] = wasmExports["mono_jiterp_begin_catch"])(a0);

var _mono_jiterp_end_catch = Module["_mono_jiterp_end_catch"] = () => (_mono_jiterp_end_catch = Module["_mono_jiterp_end_catch"] = wasmExports["mono_jiterp_end_catch"])();

var _sbrk = Module["_sbrk"] = a0 => (_sbrk = Module["_sbrk"] = wasmExports["sbrk"])(a0);

var _mono_background_exec = Module["_mono_background_exec"] = () => (_mono_background_exec = Module["_mono_background_exec"] = wasmExports["mono_background_exec"])();

var _mono_wasm_gc_lock = Module["_mono_wasm_gc_lock"] = () => (_mono_wasm_gc_lock = Module["_mono_wasm_gc_lock"] = wasmExports["mono_wasm_gc_lock"])();

var _mono_wasm_gc_unlock = Module["_mono_wasm_gc_unlock"] = () => (_mono_wasm_gc_unlock = Module["_mono_wasm_gc_unlock"] = wasmExports["mono_wasm_gc_unlock"])();

var _mono_print_method_from_ip = Module["_mono_print_method_from_ip"] = a0 => (_mono_print_method_from_ip = Module["_mono_print_method_from_ip"] = wasmExports["mono_print_method_from_ip"])(a0);

var _mono_wasm_execute_timer = Module["_mono_wasm_execute_timer"] = () => (_mono_wasm_execute_timer = Module["_mono_wasm_execute_timer"] = wasmExports["mono_wasm_execute_timer"])();

var __ZdlPv = Module["__ZdlPv"] = a0 => (__ZdlPv = Module["__ZdlPv"] = wasmExports["_ZdlPv"])(a0);

var _mono_wasm_load_icu_data = Module["_mono_wasm_load_icu_data"] = a0 => (_mono_wasm_load_icu_data = Module["_mono_wasm_load_icu_data"] = wasmExports["mono_wasm_load_icu_data"])(a0);

var _malloc_usable_size = Module["_malloc_usable_size"] = a0 => (_malloc_usable_size = Module["_malloc_usable_size"] = wasmExports["malloc_usable_size"])(a0);

var _emscripten_builtin_malloc = Module["_emscripten_builtin_malloc"] = a0 => (_emscripten_builtin_malloc = Module["_emscripten_builtin_malloc"] = wasmExports["emscripten_builtin_malloc"])(a0);

var ___funcs_on_exit = () => (___funcs_on_exit = wasmExports["__funcs_on_exit"])();

var ___libc_free = Module["___libc_free"] = a0 => (___libc_free = Module["___libc_free"] = wasmExports["__libc_free"])(a0);

var ___libc_malloc = Module["___libc_malloc"] = a0 => (___libc_malloc = Module["___libc_malloc"] = wasmExports["__libc_malloc"])(a0);

var _htons = Module["_htons"] = a0 => (_htons = Module["_htons"] = wasmExports["htons"])(a0);

var _emscripten_builtin_free = Module["_emscripten_builtin_free"] = a0 => (_emscripten_builtin_free = Module["_emscripten_builtin_free"] = wasmExports["emscripten_builtin_free"])(a0);

var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["emscripten_builtin_memalign"])(a0, a1);

var _ntohs = Module["_ntohs"] = a0 => (_ntohs = Module["_ntohs"] = wasmExports["ntohs"])(a0);

var _memalign = Module["_memalign"] = (a0, a1) => (_memalign = Module["_memalign"] = wasmExports["memalign"])(a0, a1);

var __ZdaPv = Module["__ZdaPv"] = a0 => (__ZdaPv = Module["__ZdaPv"] = wasmExports["_ZdaPv"])(a0);

var __ZdaPvm = Module["__ZdaPvm"] = (a0, a1) => (__ZdaPvm = Module["__ZdaPvm"] = wasmExports["_ZdaPvm"])(a0, a1);

var __ZdlPvm = Module["__ZdlPvm"] = (a0, a1) => (__ZdlPvm = Module["__ZdlPvm"] = wasmExports["_ZdlPvm"])(a0, a1);

var __Znaj = Module["__Znaj"] = a0 => (__Znaj = Module["__Znaj"] = wasmExports["_Znaj"])(a0);

var __ZnajSt11align_val_t = Module["__ZnajSt11align_val_t"] = (a0, a1) => (__ZnajSt11align_val_t = Module["__ZnajSt11align_val_t"] = wasmExports["_ZnajSt11align_val_t"])(a0, a1);

var __Znwj = Module["__Znwj"] = a0 => (__Znwj = Module["__Znwj"] = wasmExports["_Znwj"])(a0);

var __ZnwjSt11align_val_t = Module["__ZnwjSt11align_val_t"] = (a0, a1) => (__ZnwjSt11align_val_t = Module["__ZnwjSt11align_val_t"] = wasmExports["_ZnwjSt11align_val_t"])(a0, a1);

var ___libc_calloc = Module["___libc_calloc"] = (a0, a1) => (___libc_calloc = Module["___libc_calloc"] = wasmExports["__libc_calloc"])(a0, a1);

var ___libc_realloc = Module["___libc_realloc"] = (a0, a1) => (___libc_realloc = Module["___libc_realloc"] = wasmExports["__libc_realloc"])(a0, a1);

var _malloc_size = Module["_malloc_size"] = a0 => (_malloc_size = Module["_malloc_size"] = wasmExports["malloc_size"])(a0);

var _reallocf = Module["_reallocf"] = (a0, a1) => (_reallocf = Module["_reallocf"] = wasmExports["reallocf"])(a0, a1);

var ___trap = () => (___trap = wasmExports["__trap"])();

var stackSave = Module["stackSave"] = () => (stackSave = Module["stackSave"] = wasmExports["stackSave"])();

var stackRestore = Module["stackRestore"] = a0 => (stackRestore = Module["stackRestore"] = wasmExports["stackRestore"])(a0);

var stackAlloc = Module["stackAlloc"] = a0 => (stackAlloc = Module["stackAlloc"] = wasmExports["stackAlloc"])(a0);

var ___cxa_decrement_exception_refcount = a0 => (___cxa_decrement_exception_refcount = wasmExports["__cxa_decrement_exception_refcount"])(a0);

var ___cxa_increment_exception_refcount = a0 => (___cxa_increment_exception_refcount = wasmExports["__cxa_increment_exception_refcount"])(a0);

var ___thrown_object_from_unwind_exception = a0 => (___thrown_object_from_unwind_exception = wasmExports["__thrown_object_from_unwind_exception"])(a0);

var ___get_exception_message = (a0, a1, a2) => (___get_exception_message = wasmExports["__get_exception_message"])(a0, a1, a2);

var __wasmfs_read_file = a0 => (__wasmfs_read_file = wasmExports["_wasmfs_read_file"])(a0);

var __wasmfs_write_file = (a0, a1, a2) => (__wasmfs_write_file = wasmExports["_wasmfs_write_file"])(a0, a1, a2);

var __wasmfs_mkdir = (a0, a1) => (__wasmfs_mkdir = wasmExports["_wasmfs_mkdir"])(a0, a1);

var __wasmfs_rmdir = a0 => (__wasmfs_rmdir = wasmExports["_wasmfs_rmdir"])(a0);

var __wasmfs_open = (a0, a1, a2) => (__wasmfs_open = wasmExports["_wasmfs_open"])(a0, a1, a2);

var __wasmfs_allocate = (a0, a1, a2) => (__wasmfs_allocate = wasmExports["_wasmfs_allocate"])(a0, a1, a2);

var __wasmfs_mknod = (a0, a1, a2) => (__wasmfs_mknod = wasmExports["_wasmfs_mknod"])(a0, a1, a2);

var __wasmfs_unlink = a0 => (__wasmfs_unlink = wasmExports["_wasmfs_unlink"])(a0);

var __wasmfs_chdir = a0 => (__wasmfs_chdir = wasmExports["_wasmfs_chdir"])(a0);

var __wasmfs_symlink = (a0, a1) => (__wasmfs_symlink = wasmExports["_wasmfs_symlink"])(a0, a1);

var __wasmfs_readlink = a0 => (__wasmfs_readlink = wasmExports["_wasmfs_readlink"])(a0);

var __wasmfs_write = (a0, a1, a2) => (__wasmfs_write = wasmExports["_wasmfs_write"])(a0, a1, a2);

var __wasmfs_pwrite = (a0, a1, a2, a3) => (__wasmfs_pwrite = wasmExports["_wasmfs_pwrite"])(a0, a1, a2, a3);

var __wasmfs_chmod = (a0, a1) => (__wasmfs_chmod = wasmExports["_wasmfs_chmod"])(a0, a1);

var __wasmfs_fchmod = (a0, a1) => (__wasmfs_fchmod = wasmExports["_wasmfs_fchmod"])(a0, a1);

var __wasmfs_lchmod = (a0, a1) => (__wasmfs_lchmod = wasmExports["_wasmfs_lchmod"])(a0, a1);

var __wasmfs_llseek = (a0, a1, a2) => (__wasmfs_llseek = wasmExports["_wasmfs_llseek"])(a0, a1, a2);

var __wasmfs_rename = (a0, a1) => (__wasmfs_rename = wasmExports["_wasmfs_rename"])(a0, a1);

var __wasmfs_read = (a0, a1, a2) => (__wasmfs_read = wasmExports["_wasmfs_read"])(a0, a1, a2);

var __wasmfs_pread = (a0, a1, a2, a3) => (__wasmfs_pread = wasmExports["_wasmfs_pread"])(a0, a1, a2, a3);

var __wasmfs_truncate = (a0, a1) => (__wasmfs_truncate = wasmExports["_wasmfs_truncate"])(a0, a1);

var __wasmfs_ftruncate = (a0, a1) => (__wasmfs_ftruncate = wasmExports["_wasmfs_ftruncate"])(a0, a1);

var __wasmfs_close = a0 => (__wasmfs_close = wasmExports["_wasmfs_close"])(a0);

var __wasmfs_mmap = (a0, a1, a2, a3, a4) => (__wasmfs_mmap = wasmExports["_wasmfs_mmap"])(a0, a1, a2, a3, a4);

var __wasmfs_msync = (a0, a1, a2) => (__wasmfs_msync = wasmExports["_wasmfs_msync"])(a0, a1, a2);

var __wasmfs_munmap = (a0, a1) => (__wasmfs_munmap = wasmExports["_wasmfs_munmap"])(a0, a1);

var __wasmfs_utime = (a0, a1, a2) => (__wasmfs_utime = wasmExports["_wasmfs_utime"])(a0, a1, a2);

var __wasmfs_stat = (a0, a1) => (__wasmfs_stat = wasmExports["_wasmfs_stat"])(a0, a1);

var __wasmfs_lstat = (a0, a1) => (__wasmfs_lstat = wasmExports["_wasmfs_lstat"])(a0, a1);

var __wasmfs_mount = (a0, a1) => (__wasmfs_mount = wasmExports["_wasmfs_mount"])(a0, a1);

var __wasmfs_unmount = a0 => (__wasmfs_unmount = wasmExports["_wasmfs_unmount"])(a0);

var __wasmfs_identify = a0 => (__wasmfs_identify = wasmExports["_wasmfs_identify"])(a0);

var __wasmfs_readdir_start = a0 => (__wasmfs_readdir_start = wasmExports["_wasmfs_readdir_start"])(a0);

var __wasmfs_readdir_get = a0 => (__wasmfs_readdir_get = wasmExports["_wasmfs_readdir_get"])(a0);

var __wasmfs_readdir_finish = a0 => (__wasmfs_readdir_finish = wasmExports["_wasmfs_readdir_finish"])(a0);

var __wasmfs_get_cwd = () => (__wasmfs_get_cwd = wasmExports["_wasmfs_get_cwd"])();

var _wasmfs_create_jsimpl_backend = () => (_wasmfs_create_jsimpl_backend = wasmExports["wasmfs_create_jsimpl_backend"])();

var _wasmfs_create_memory_backend = () => (_wasmfs_create_memory_backend = wasmExports["wasmfs_create_memory_backend"])();

var _wasmfs_create_file = (a0, a1, a2) => (_wasmfs_create_file = wasmExports["wasmfs_create_file"])(a0, a1, a2);

var ___start_em_js = Module["___start_em_js"] = 7101027;

var ___stop_em_js = Module["___stop_em_js"] = 7102119;

function applySignatureConversions(wasmExports) {
 wasmExports = Object.assign({}, wasmExports);
 var makeWrapper_pp = f => a0 => f(a0) >>> 0;
 var makeWrapper_pP = f => a0 => f(a0) >>> 0;
 var makeWrapper_ppp = f => (a0, a1) => f(a0, a1) >>> 0;
 var makeWrapper_p = f => () => f() >>> 0;
 var makeWrapper_p_ = f => a0 => f(a0) >>> 0;
 wasmExports["malloc"] = makeWrapper_pp(wasmExports["malloc"]);
 wasmExports["sbrk"] = makeWrapper_pP(wasmExports["sbrk"]);
 wasmExports["emscripten_builtin_malloc"] = makeWrapper_pp(wasmExports["emscripten_builtin_malloc"]);
 wasmExports["emscripten_builtin_memalign"] = makeWrapper_ppp(wasmExports["emscripten_builtin_memalign"]);
 wasmExports["memalign"] = makeWrapper_ppp(wasmExports["memalign"]);
 wasmExports["stackSave"] = makeWrapper_p(wasmExports["stackSave"]);
 wasmExports["stackAlloc"] = makeWrapper_pp(wasmExports["stackAlloc"]);
 wasmExports["_wasmfs_read_file"] = makeWrapper_pp(wasmExports["_wasmfs_read_file"]);
 wasmExports["_wasmfs_get_cwd"] = makeWrapper_p_(wasmExports["_wasmfs_get_cwd"]);
 return wasmExports;
}

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createPath"] = FS.createPath;

Module["out"] = out;

Module["err"] = err;

Module["abort"] = abort;

Module["wasmExports"] = wasmExports;

Module["runtimeKeepalivePush"] = runtimeKeepalivePush;

Module["runtimeKeepalivePop"] = runtimeKeepalivePop;

Module["maybeExit"] = maybeExit;

Module["ccall"] = ccall;

Module["cwrap"] = cwrap;

Module["addFunction"] = addFunction;

Module["setValue"] = setValue;

Module["getValue"] = getValue;

Module["UTF8ArrayToString"] = UTF8ArrayToString;

Module["UTF8ToString"] = UTF8ToString;

Module["stringToUTF8Array"] = stringToUTF8Array;

Module["lengthBytesUTF8"] = lengthBytesUTF8;

Module["safeSetTimeout"] = safeSetTimeout;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS"] = FS;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_unlink"] = FS.unlink;

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function run() {
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

run();


  return moduleArg.ready
}
);
})();
export default createDotnetRuntime;
var fetch = fetch || undefined; var require = require || undefined; var __dirname = __dirname || ''; var _nativeModuleLoaded = false;
