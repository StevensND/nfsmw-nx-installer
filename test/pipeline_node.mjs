// End-to-end check of the shader library pipeline in Node, using an extracted game folder.
// Usage: node pipeline_node.mjs <game folder with default.xex and NFS/> <reference containers folder>
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { readXexImage } from '../lib/xex.js';
import { ContainerScanner } from '../lib/containers.js';
import { buildShaderLibrary } from '../lib/shaders.js';

const require = createRequire(import.meta.url);
const wasm = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../wasm');
const load = (file) => require(path.join(wasm, file));

const game = process.argv[2];
const reference = process.argv[3];
// Each Emscripten module uses the object it receives as its own Module object: never share one.
const quiet = () => ({ print: () => {}, printErr: () => {} });
const [hlsl, dxc, pack, lzx] = await Promise.all([
  load('hlsl.js')({ print: (t) => { if (!/: OK|^  w/.test(t)) console.log('[hlsl] ' + t); }, printErr: (t) => console.log('[hlsl!] ' + t) }), load('dxc_web.js')({ print: () => {}, printErr: (t) => { if (!/warning|^|^s*$|oTexCoord/.test(t)) console.log('[dxc!] ' + t); } }), load('pack.js')({ print: (t) => console.log(t) }), load('lzx.js')(quiet()),
]);

const started = Date.now();
const xexBytes = new Uint8Array(fs.readFileSync(path.join(game, 'default.xex')));
const { image, blocks } = await readXexImage(xexBytes, async (compressed, bits, size) => {
  lzx.FS.writeFile('/image.lzx', compressed);
  const rc = lzx.callMain(['/image.lzx', '/image.bin', String(bits), String(size)]);
  if (rc) throw new Error(`LZX failed (${rc})`);
  return lzx.FS.readFile('/image.bin');
});
console.log(`XEX: ${blocks} blocks, image ${image.length} bytes, SHA-256 ${createHash('sha256').update(image).digest('hex')}`);

const disc = new ContainerScanner('');
if (process.env.SKIP_SCAN) {
  for (const name of fs.readdirSync(reference).filter((n) => n.endsWith('.bin') && !n.includes('_xex_')).sort()) {
    disc.found.push({ name, bytes: new Uint8Array(fs.readFileSync(path.join(reference, name))) });
  }
}

const nfs = path.join(game, 'NFS');
if (!process.env.SKIP_SCAN) for (const name of fs.readdirSync(nfs).filter((n) => /\.bin$/i.test(n)).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))) {
  const file = path.join(nfs, name);
  const size = fs.statSync(file).size;
  if (size < 24 || size > 1024 * 1024 * 1024) continue;
  disc.beginFile(name, size);
  const fd = fs.openSync(file, 'r');
  const chunk = Buffer.alloc(16 * 1024 * 1024);
  let done = 0;
  while (done < size) {
    const n = fs.readSync(fd, chunk, 0, chunk.length, done);
    done += n;
    disc.push(new Uint8Array(chunk.buffer, 0, n).slice(), done >= size);
  }
  fs.closeSync(fd);
}
const exe = new ContainerScanner('xex_');
exe.scanWhole('default.xex', image);
const containers = [...disc.found, ...exe.found];
console.log(`containers: ${disc.found.length} on disc + ${exe.found.length} in the XEX (${((Date.now() - started) / 1000).toFixed(1)} s)`);

let same = 0;
for (const c of containers) {
  const ref = path.join(reference, c.name);
  if (fs.existsSync(ref) && Buffer.compare(fs.readFileSync(ref), Buffer.from(c.bytes)) === 0) same++;
  else console.log(`  differs from the reference: ${c.name}`);
}
console.log(`identical to the reference containers: ${same} of ${containers.length} (reference has ${fs.readdirSync(reference).filter((n) => n.endsWith('.bin')).length})`);

const shaderCommon = new Uint8Array(fs.readFileSync(path.join(path.dirname(wasm), 'shader_common.h')));
const library = await buildShaderLibrary(containers, { hlsl, dxc, pack }, shaderCommon, (t) => console.log(t));
console.log(`library: ${library.length} bytes, SHA-256 ${createHash('sha256').update(library).digest('hex')} (${((Date.now() - started) / 1000).toFixed(1)} s)`);
