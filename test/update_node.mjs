// Builds nfsmw-nx-update.zip in Node from an ISO, with the same code the page runs, and checks what is inside:
// only the program, its settings, the licenses and the shaders, each one the file the list of builds names.
// Usage: node update_node.mjs <iso> <output zip>
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import createHlslModule from '../wasm/hlsl.mjs';
import createDxcModule from '../wasm/dxc_web.mjs';
import createPackModule from '../wasm/pack.mjs';
import createLzxModule from '../wasm/lzx.mjs';
import { listIsoFiles } from '../lib/iso.js';
import { createPackage, identifyGame } from '../lib/installer.js';

const [iso, output] = process.argv.slice(2);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');

// fs.openAsBlob reports the size of files over 4 GB modulo 2^32 on Windows, so the disc is read by position instead.
const fd = fs.openSync(iso, 'r');
const disc = {
  size: fs.fstatSync(fd).size,
  slice(start, end) {
    const length = Math.max(0, Math.min(end, disc.size) - start);
    return {
      arrayBuffer: async () => {
        const bytes = Buffer.alloc(length);
        fs.readSync(fd, bytes, 0, length, start);
        return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + length);
      },
    };
  },
};
const files = await listIsoFiles(disc);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'release/manifest.json'), 'utf8'));
const { build } = await identifyGame(files, manifest);
if (!build) {
  throw new Error('this disc has no build in the list');
}
const quiet = () => ({ print: () => {}, printErr: () => {} });
const modules = {
  hlsl: await createHlslModule(quiet()),
  dxc: await createDxcModule(quiet()),
  pack: await createPackModule(quiet()),
  lzx: await createLzxModule(quiet()),
};
const release = {
  manifest,
  nro: new Uint8Array(fs.readFileSync(path.join(root, 'release', build.nro))),
  toml: new Uint8Array(fs.readFileSync(path.join(root, 'release/nfsmw.toml'))),
  licenses: new Uint8Array(fs.readFileSync(path.join(root, 'release/LICENSES.txt'))),
  shaderCommon: new Uint8Array(fs.readFileSync(path.join(root, 'shader_common.h'))),
};
const out = fs.openSync(output, 'w');
const sink = { write: async (b) => { fs.writeSync(out, b); }, close: async () => fs.closeSync(out) };
let announced = 0;
const started = Date.now();
await createPackage(files, release, modules, sink, (text) => {
  if (!/^(Read|compiled)/.test(text)) {
    console.log(text);
  }
}, () => {}, (size) => { announced = size; }, { update: true });
const seconds = ((Date.now() - started) / 1000).toFixed(1);

// Reads the central directory back and checks every entry against the list of builds.
const zip = fs.readFileSync(output);
if (zip.length !== announced) {
  throw new Error(`zip is ${zip.length} bytes, ${announced} were announced`);
}
const end = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
const count = zip.readUInt16LE(end + 10);
let at = zip.readUInt32LE(end + 16);
const entries = {};
for (let i = 0; i < count; i++) {
  const size = zip.readUInt32LE(at + 24);
  const nameLength = zip.readUInt16LE(at + 28);
  const extra = zip.readUInt16LE(at + 30);
  const comment = zip.readUInt16LE(at + 32);
  const local = zip.readUInt32LE(at + 42);
  const name = zip.toString('utf8', at + 46, at + 46 + nameLength);
  const data = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
  entries[name] = sha(zip.subarray(data, data + size));
  at += 46 + nameLength + extra + comment;
}
const expected = {
  'nfsmw-nx/nfsmw-nx.nro': build.nro_sha256,
  'nfsmw-nx/nfsmw.toml': sha(release.toml),
  'nfsmw-nx/LICENSES.txt': sha(release.licenses),
  'nfsmw-nx/nfsmw_shaders.nfsp': build.library_sha256,
};
const wrong = Object.keys(expected).filter((name) => entries[name] !== expected[name]);
const extra = Object.keys(entries).filter((name) => !(name in expected));
console.log(`${build.edition}: ${count} entries, ${zip.length} bytes, ${seconds} s`);
if (wrong.length || extra.length) {
  throw new Error(`wrong: ${wrong.join(', ') || 'none'}; unexpected: ${extra.join(', ') || 'none'}`);
}
console.log('the update package holds exactly the program, the settings, the licenses and the shaders of the list of builds');
