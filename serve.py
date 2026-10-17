#!/usr/bin/env python3
"""Serve the prebuilt Stardew Valley wasm bundle locally.

The bundle is plain static files; no build step is involved. The only
server-side requirement is the correct MIME type for .wasm (streaming
WebAssembly compilation rejects anything else).
"""

from __future__ import annotations

import argparse
import functools
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".wasm": "application/wasm",
        ".dat": "application/octet-stream",
        ".count": "text/plain; charset=utf-8",
        ".tar": "application/x-tar",
    }

    def end_headers(self) -> None:
        # The game caches content in OPFS, so HTTP caching only gets in the way
        # of local edits.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt: str, *args: object) -> None:
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    handler = functools.partial(Handler, directory=ROOT)
    with http.server.ThreadingHTTPServer((args.host, args.port), handler) as server:
        print(f"Serving {ROOT} at http://{args.host}:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
