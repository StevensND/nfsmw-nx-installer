// Prints what the page shows for an ISO: language, flag and edition. Usage: node detect_node.mjs <iso>
import fs from 'node:fs';
import { listIsoFiles } from '../lib/iso.js';
import { identifyGame } from '../lib/installer.js';
import { describeLanguage } from '../lib/flags.js';

const manifest = JSON.parse(fs.readFileSync(new URL('../release/manifest.json', import.meta.url)));
const game = await identifyGame(await listIsoFiles(await fs.openAsBlob(process.argv[2])), manifest);
const lang = describeLanguage(game.languages[0]);
console.log(`${lang.name} | flag ${lang.svg ? 'yes' : 'no'} | ${game.build ? game.build.edition : 'unsupported'} | ${game.xexHash.slice(0, 16)}`);
