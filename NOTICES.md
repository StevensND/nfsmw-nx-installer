# Third-party notices

| Component | Where | License |
|---|---|---|
| [DirectXShaderCompiler](https://github.com/microsoft/DirectXShaderCompiler) v2025.1, unmodified, with its bundled SPIRV-Tools and SPIRV-Headers | `wasm/dxc_web.*` | University of Illinois/NCSA Open Source License (LLVM); SPIRV-Tools: Apache-2.0; SPIRV-Headers: MIT |
| [XenosRecomp](https://github.com/hedge-dev/XenosRecomp) by hedge-dev and contributors, with the changes of NFSMW-NX | `wasm/hlsl.*`, `shader_common.h` | MIT |
| [libmspack](https://www.cabextract.org.uk/libmspack/) by Stuart Caie (LZX decoder) | `wasm/lzx.*` | LGPL-2.1 |
| [fmt](https://github.com/fmtlib/fmt) | `wasm/hlsl.*` | MIT |
| [xxHash](https://github.com/Cyan4973/xxHash) by Yann Collet | `wasm/hlsl.*`, `wasm/pack.*` | BSD-2-Clause |
| Shader library code of [NFSMW-NX](https://github.com/StevensND/nfsmw-nx) | `wasm/pack.*` | GPL-3.0 |
| Most Wasted font by Magique Fonts (Koczman Balint) | `fonts/MostWasted.ttf` | Free for personal and commercial use, not for sale (`fonts/MostWasted-LICENSE.txt`) |

libmspack is covered by the GNU Lesser General Public License 2.1. `wasm/lzx.wasm` is built from the unmodified
libmspack sources (`lzxd.c` and `system.c`, at the commit pinned by ReXGlue SDK v0.10.0) and `shaders/nfsmw_lzx.cpp` of
the NFSMW-NX repository, with `shaders/wasm/build_wasm_tools.bat`; with those sources it can be rebuilt and replaced
by a modified version.

The licenses of the software inside the package (the NRO and its libraries) are in `release/LICENSES.txt`, which is
also copied into every zip.
