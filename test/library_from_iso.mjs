// Builds the shader library of an edition straight from its ISO and compares its containers with a reference set.
// Usage: node library_from_iso.mjs <iso> <reference containers folder> [output .nfsp] [composition container SHA-256]
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import createHlslModule from '../wasm/hlsl.mjs';
import createDxcModule from '../wasm/dxc_web.mjs';
import createPackModule from '../wasm/pack.mjs';
import createLzxModule from '../wasm/lzx.mjs';
import { listIsoFiles } from '../lib/iso.js';
import { readXexImage } from '../lib/xex.js';
import { ContainerScanner } from '../lib/containers.js';
import { buildShaderLibrary } from '../lib/shaders.js';

const [iso, reference, output, blurSha = 'e80cca037bd4becd8a192daa4583e3a3a9281e06436015746583f30701a296f9'] = process.argv.slice(2);
const quiet = () => ({ print: () => {}, printErr: () => {} });
const modules = { hlsl: await createHlslModule(quiet()), dxc: await createDxcModule(quiet()), pack: await createPackModule(quiet()), lzx: await createLzxModule(quiet()) };
const sha = (b) => createHash('sha256').update(b).digest('hex');

const files = await listIsoFiles(await fs.openAsBlob(iso));
const xexFile = files.find((f) => f.path.toLowerCase() === 'default.xex');
const { image } = await readXexImage(await xexFile.read(0, xexFile.size), async (c, bits, size) => {
  modules.lzx.FS.writeFile('/i.lzx', c);
  if (modules.lzx.callMain(['/i.lzx', '/i.bin', String(bits), String(size)])) throw new Error('LZX failed');
  return modules.lzx.FS.readFile('/i.bin');
});
const exe = new ContainerScanner('xex_');
exe.scanWhole('default.xex', image);
const disc = new ContainerScanner('');
for (const f of files.filter((x) => /^nfs\/[^/]+\.bin$/i.test(x.path)).sort((a, b) => a.path.toLowerCase().localeCompare(b.path.toLowerCase()))) {
  disc.beginFile(f.path, f.size);
  for (let o = 0; o < f.size; o += 16 << 20) {
    const chunk = await f.read(o, Math.min(16 << 20, f.size - o));
    disc.push(chunk, o + chunk.length >= f.size);
  }
}
const containers = [...disc.found, ...exe.found];
const byHash = new Map(fs.readdirSync(reference).filter((n) => n.endsWith('.bin')).map((n) => [sha(fs.readFileSync(path.join(reference, n))), n]));
let same = 0;
let sameName = 0;
const origins = new Map();
for (const c of containers) {
  const ref = byHash.get(sha(c.bytes));
  if (ref) same++;
  if (ref === c.name) sameName++;
  origins.set(c.file, (origins.get(c.file) || 0) + 1);
}
console.log(`containers: ${disc.found.length} on disc + ${exe.found.length} in the XEX; origins ${JSON.stringify([...origins])}`);
console.log(`same content as a reference container: ${same}; same content and name: ${sameName} (reference ${byHash.size} unique)`);
const blur = containers.find((c) => c.name === 'p_000139.bin');
console.log(`p_000139 is the reference composition shader: ${blur ? byHash.get(sha(blur.bytes)) === 'p_000139.bin' : 'missing'}`);
try {
  const target = containers.find((c) => sha(c.bytes) === blurSha);
  console.log(`composition shader on this disc: ${target ? target.name : 'NOT FOUND'}`);
  const library = await buildShaderLibrary(containers, modules, new Uint8Array(fs.readFileSync(new URL('../shader_common.h', import.meta.url))), () => {}, target.name.slice(0, -4));
  console.log(`library: ${library.length} bytes, SHA-256 ${sha(library)}`);
  if (output) {
    fs.writeFileSync(output, library);
    console.log(`written to ${output}`);
  }
} catch (error) {
  console.log(`library failed: ${error.message}`);
}
