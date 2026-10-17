## stardew valley web port
pls report issues here. give credits if you add to your site. play at [degloved.net](https://degloved.net/games/public/gms/stardew-valley/index.html)

one day ill re-port this and make it open source

## run locally

The repo is a prebuilt static bundle: no build step, no dependencies beyond Python 3.

```sh
./serve.py            # http://127.0.0.1:8000/
./serve.py --port 9000 --host 0.0.0.0   # expose on the LAN
```

Open the URL in a Chromium/Firefox build with OPFS support, pick "Play without
music" (~64 MB) or "Play with music" (~540 MB), and wait for the title screen.
The archives are cached in OPFS after the first load, so later launches skip the
download; saves also live there.

A plain `file://` open does not work: ES modules, streaming WebAssembly
compilation, and OPFS all require an HTTP origin. Any static server works as
long as it serves `.wasm` as `application/wasm` and `.count` as text.

## rendering

The game renders at CSS resolution with the backing store capped at ~1920x1080
pixels, which is what keeps the frame budget at 60 fps; `devicePixelRatio` is
deliberately ignored because the art is pixel art. Query parameters override it:

- `?scale=0.5` — render at half CSS size (fastest)
- `?scale=2` — render at 2x CSS size (supersampling, 4x the pixels)
- `?preserve=1` — restore `preserveDrawingBuffer: true`, needed only if you read
  pixels back from the canvas (e.g. screenshots); it costs a per-frame copy.
