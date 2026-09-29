# NFSMW-NX Installer

The installer page of [NFSMW-NX](https://github.com/StevensND/nfsmw-nx), the native Nintendo Switch port of Need for
Speed: Most Wanted: **https://stevensnd.github.io/nfsmw-nx-installer/**

You give it your own copy of the Xbox 360 game (an ISO, or the extracted disc with its `default.xex`) and it gives you
a zip ready to extract into `sdmc:/switch/`. Everything runs in your browser: the game files never leave your
computer.

## What it does

1. Identifies the edition by the SHA-256 of `default.xex` and picks its build from `release/manifest.json`. Every
   edition is a different program and has its own NRO.
2. Downloads that NRO and checks its SHA-256.
3. Copies the game files into the zip (first installation), or only reads them (update: program, settings and shaders).
4. Finds the shader containers in the disc files and in the executable, translates the Xbox 360 microcode to HLSL
   (XenosRecomp), compiles it to SPIR-V (DXC) and packs the shader library. The library must match, byte for byte,
   the one the NRO was tested with.
5. Streams the zip to disk through the service worker, so a package of several GB never has to fit in memory.

The page and the downloaded program are cached by the service worker: after the first visit it also works without a
connection.

## Layout

| Path | Contents |
|---|---|
| `index.html`, `app.js` | The page and its interface (seven languages, `lib/i18n.js`) |
| `worker.js` | Builds the package off the main thread |
| `sw.js` | Offline cache and the download stream |
| `lib/` | ISO and XEX readers, shader container scanner, shader library, zip writer |
| `wasm/` | WebAssembly builds of the shader translator, DXC, the library packer and the LZX decoder |
| `release/` | The list of builds, the configuration file that goes into the zip, and the licenses of the NRO |
| `test/` | Node scripts that run the same code as the page |

The WebAssembly modules are built from `shaders/` of the source repository (`shaders/wasm/build_wasm_tools.bat` and
`link_dxc_wasm.bat`).

## Deployment

The NROs are not stored here. They are the assets of a release of
[StevensND/nfsmw-nx](https://github.com/StevensND/nfsmw-nx/releases), named as in `release/manifest.json`
(`nfsmw-nx-pal-es.nro`, `nfsmw-nx-usa.nro`...). The workflow in `.github/workflows/deploy.yml` downloads them from
the latest release, checks their SHA-256 against the list, and publishes the page on GitHub Pages. It runs on every
push to `main`; after publishing a new release, run it by hand from the Actions tab. Pages must be set to deploy
from GitHub Actions (Settings > Pages > Source).

To publish a new build, add or update its entry in `release/manifest.json`: the SHA-256 of the executable it is for,
the NRO name and SHA-256, and the SHA-256 and size of the shader library it was tested with.

## Testing locally

Put the NROs in `release/` and serve the folder (any static server works; this one sets the right MIME types):

```sh
python serve.py 8193
```

Then open http://127.0.0.1:8193/. The same code runs in Node:

```sh
node test/package_node.mjs <extracted game folder> <output zip>
node test/update_node.mjs <game ISO> <output zip>
```

## License

GPL-3.0 (see [LICENSE](LICENSE)). Third-party components are listed in [NOTICES.md](NOTICES.md).

Need for Speed and Need for Speed: Most Wanted are trademarks of Electronic Arts Inc. This project is not affiliated
with or endorsed by Electronic Arts, Nintendo or Microsoft.
