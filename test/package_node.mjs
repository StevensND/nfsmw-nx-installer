// Builds nfsmw-nx.zip in Node from an extracted game folder, with the same code the page runs.
// Usage: node package_node.mjs <extracted game folder> <output zip>
import fs from 'node:fs';
import path from 'node:path';
import createHlslModule from '../wasm/hlsl.mjs';
import createDxcModule from '../wasm/dxc_web.mjs';
import createPackModule from '../wasm/pack.mjs';
import createLzxModule from '../wasm/lzx.mjs';
import { createPackage, identifyGame } from '../lib/installer.js';

const [game, output] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const root = path.resolve(here, '..');

const files = [];
const walk = async (dir, prefix) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (fs.statSync(full).isDirectory()) {
      await walk(full, rel);
    } else {
      const blob = await fs.openAsBlob(full);
      files.push({ path: rel, size: blob.size, read: async (o, n) => new Uint8Array(await blob.slice(o, o + n).arrayBuffer()) });
    }
  }
};
await walk(game, '');

const quiet = () => ({ print: () => {}, printErr: () => {} });
const modules = {
  hlsl: await createHlslModule(quiet()),
  dxc: await createDxcModule(quiet()),
  pack: await createPackModule(quiet()),
  lzx: await createLzxModule(quiet()),
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'release/manifest.json'), 'utf8'));
const { build } = await identifyGame(files, manifest);
if (!build) {
  throw new Error('this game has no build in the list');
}
const release = {
  manifest,
  nro: new Uint8Array(fs.readFileSync(path.join(root, 'release', build.nro))),
  toml: new Uint8Array(fs.readFileSync(path.join(root, 'release/nfsmw.toml'))),
  licenses: new Uint8Array(fs.readFileSync(path.join(root, 'release/LICENSES.txt'))),
  shaderCommon: new Uint8Array(fs.readFileSync(path.join(root, 'shader_common.h'))),
};
const out = fs.openSync(output, 'w');
const sink = { write: async (b) => { fs.writeSync(out, b); }, close: async () => fs.closeSync(out) };
const started = Date.now();
let last = -1;
const result = await createPackage(files, release, modules, sink, (t) => { if (!t.startsWith('Copied') && !t.startsWith('compiled')) console.log(t); }, (f) => {
  const p = Math.floor(f * 10);
  if (p !== last) { last = p; console.log(`  ${p * 10} %`); }
});
console.log(JSON.stringify(result), `${((Date.now() - started) / 1000).toFixed(1)} s`);
