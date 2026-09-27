// For every USA container without an identical PAL twin, finds the closest PAL container and reports where bytes differ.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import createLzxModule from '../wasm/lzx.mjs';
import { listIsoFiles } from '../lib/iso.js';
import { ContainerScanner } from '../lib/containers.js';
const [iso, reference] = process.argv.slice(2);
const sha = (b) => createHash('sha256').update(b).digest('hex');
const files = await listIsoFiles(await fs.openAsBlob(iso));
const disc = new ContainerScanner('');
const z = files.find((f) => /zzdata0\.bin$/i.test(f.path));
disc.scanWhole(z.path, await z.read(0, z.size));
const refs = fs.readdirSync(reference).filter((n) => n.endsWith('.bin') && !n.includes('xex')).map((n) => ({ n, b: new Uint8Array(fs.readFileSync(path.join(reference, n))) }));
const refHashes = new Set(refs.map((r) => sha(r.b)));
const be = (b, o) => ((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;
let n = 0; const summary = [];
for (const c of disc.found) {
  if (refHashes.has(sha(c.bytes))) continue;
  n++;
  let best = null;
  for (const r of refs) {
    if (r.b.length !== c.bytes.length) continue;
    let d = 0; for (let i = 0; i < r.b.length; i++) if (r.b[i] !== c.bytes[i]) d++;
    if (!best || d < best.d) best = { r, d };
  }
  if (!best) { summary.push(`${c.name}: ${c.bytes.length} bytes, no PAL container of the same size`); continue; }
  const v = be(c.bytes, 4);
  const where = [];
  for (let i = 0; i < c.bytes.length; i++) if (c.bytes[i] !== best.r.b[i]) where.push(i);
  const inVirtual = where.filter((i) => i < v).length;
  summary.push(`${c.name} ~ ${best.r.n}: ${best.d} bytes differ of ${c.bytes.length} (header/constants part ${inVirtual}, microcode part ${where.length - inVirtual}); first at ${where.slice(0, 6).join(',')}`);
}
console.log(`${n} USA containers without an identical PAL twin`);
for (const s of summary.slice(0, 25)) console.log('  ' + s);
