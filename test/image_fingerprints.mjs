// Prints the image fingerprints of executables and, with --write, stores them in release/manifest.json: every build
// whose xex_sha256 is one of these files gets "image_sha256" (the image with its known patches put back) and, when
// it has any, "patches". Then the page also recognises the same program rebuilt by another tool.
// Usage: node image_fingerprints.mjs <default.xex>... [--write]
import fs from 'node:fs';
import crypto from 'node:crypto';
import createLzxModule from '../wasm/lzx.mjs';
import { codeFingerprint, fingerprintImage, imageBlocks, lzxStep } from '../lib/installer.js';
import { readXexImage } from '../lib/xex.js';

const args = process.argv.slice(2);
const write = args.includes('--write');
const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
const byFile = new Map();
for (const path of args.filter((a) => a !== '--write')) {
  const xex = new Uint8Array(fs.readFileSync(path));
  const fileHash = crypto.createHash('sha256').update(xex).digest('hex');
  const { image } = await readXexImage(xex, lzxStep(lzx));
  const prints = await fingerprintImage(image);
  const code = await codeFingerprint(image);
  prints.code = code ? code.sha256 : null;
  prints.blocks = await imageBlocks(image);
  byFile.set(fileHash, prints);
  console.log(`${path}\n  file ${fileHash}\n  image ${prints.asIs}\n  patches ${prints.patches.join(', ') || 'none'}` +
    (prints.patches.length ? `\n  image without them ${prints.base}` : '') + `\n  code ${prints.code}`);
}

if (write) {
  const url = new URL('../release/manifest.json', import.meta.url);
  const manifest = JSON.parse(fs.readFileSync(url, 'utf8'));
  let changed = 0;
  manifest.builds = manifest.builds.map((build) => {
    const prints = byFile.get(build.xex_sha256);
    if (!prints) {
      return build;
    }
    changed++;
    // the new keys go right after xex_sha256, so every entry keeps the same order
    const out = {};
    for (const [key, value] of Object.entries(build)) {
      if (key === 'image_sha256' || key === 'patches' || key === 'code_sha256' || key === 'image_blocks') {
        continue;
      }
      out[key] = value;
      if (key === 'xex_sha256') {
        out.image_sha256 = prints.base;
        if (prints.patches.length) {
          out.patches = prints.patches;
        }
        // the executable sections only (codeFingerprint): fan translations that change data keep it
        if (prints.code) {
          out.code_sha256 = prints.code;
        }
        // 64 KiB blocks of the image (imageBlocks): the report of an unknown executable lists those that differ
        out.image_blocks = prints.blocks;
      }
    }
    return out;
  });
  fs.writeFileSync(url, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`manifest: ${changed} of ${manifest.builds.length} builds updated`);
}
