// Language names and simple SVG flags for the languages found in the movie file names.

const stripesH = (colors) =>
  `<svg viewBox="0 0 3 2" preserveAspectRatio="none">${colors
    .map((c, i) => `<rect y="${(2 / colors.length) * i}" width="3" height="${2 / colors.length}" fill="${c}"/>`)
    .join('')}</svg>`;
const stripesV = (colors) =>
  `<svg viewBox="0 0 3 2" preserveAspectRatio="none">${colors
    .map((c, i) => `<rect x="${(3 / colors.length) * i}" width="${3 / colors.length}" height="2" fill="${c}"/>`)
    .join('')}</svg>`;
const nordic = (bg, cross, inner) =>
  `<svg viewBox="0 0 22 16"><rect width="22" height="16" fill="${bg}"/>` +
  `<rect x="6" width="4" height="16" fill="${cross}"/><rect y="6" width="22" height="4" fill="${cross}"/>` +
  (inner ? `<rect x="7" width="2" height="16" fill="${inner}"/><rect y="7" width="22" height="2" fill="${inner}"/>` : '') +
  '</svg>';

export const FLAGS = {
  spain:
    '<svg viewBox="0 0 750 500"><rect width="750" height="500" fill="#c60b1e"/>' +
    '<rect y="125" width="750" height="250" fill="#ffc400"/></svg>',
  uk:
    '<svg viewBox="0 0 60 30"><clipPath id="uk-clip"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>' +
    '<rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>' +
    '<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#uk-clip)" stroke="#c8102e" stroke-width="4"/>' +
    '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#c8102e" stroke-width="6"/></svg>',
  usa:
    '<svg viewBox="0 0 19 10">' +
    [...Array(13)].map((_, i) => `<rect y="${(10 / 13) * i}" width="19" height="${10 / 13}" fill="${i % 2 ? '#fff' : '#b22234'}"/>`).join('') +
    '<rect width="7.6" height="5.385" fill="#3c3b6e"/></svg>',
  france: stripesV(['#0055a4', '#fff', '#ef4135']),
  germany: stripesH(['#000', '#dd0000', '#ffce00']),
  italy: stripesV(['#009246', '#fff', '#ce2b37']),
  netherlands: stripesH(['#ae1c28', '#fff', '#21468b']),
  poland: stripesH(['#fff', '#dc143c']),
  russia: stripesH(['#fff', '#0039a6', '#d52b1e']),
  sweden: nordic('#006aa7', '#fecc00'),
  denmark: nordic('#c8102e', '#fff'),
  norway: nordic('#ba0c2f', '#fff', '#00205b'),
  finland: nordic('#fff', '#002f6c'),
  portugal: '<svg viewBox="0 0 5 3"><rect width="5" height="3" fill="#ff0000"/><rect width="2" height="3" fill="#006600"/></svg>',
  brazil:
    '<svg viewBox="0 0 21 14"><rect width="21" height="14" fill="#009c3b"/>' +
    '<path d="M10.5,1.7 L18.8,7 L10.5,12.3 L2.2,7 z" fill="#ffdf00"/><circle cx="10.5" cy="7" r="3.5" fill="#002776"/></svg>',
  czech:
    '<svg viewBox="0 0 6 4"><rect width="6" height="4" fill="#d7141a"/><rect width="6" height="2" fill="#fff"/>' +
    '<path d="M0,0 L3,2 L0,4 z" fill="#11457e"/></svg>',
  japan: '<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#fff"/><circle cx="1.5" cy="1" r="0.6" fill="#bc002d"/></svg>',
  korea:
    '<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#fff"/><circle cx="1.5" cy="1" r="0.5" fill="#0047a0"/>' +
    '<path d="M1,1 a0.5,0.5 0 0 1 1,0 a0.25,0.25 0 0 1 -0.5,0 a0.25,0.25 0 0 0 -0.5,0" fill="#cd2e3a"/></svg>',
  china:
    '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/>' +
    '<polygon points="5,2 6.2,5.6 10,5.6 7,7.9 8.1,11.5 5,9.3 1.9,11.5 3,7.9 0,5.6 3.8,5.6" fill="#ffde00"/></svg>',
};

const LANGUAGES = {
  spanish: { name: 'Spanish', flag: 'spain' },
  english: { name: 'English', flag: 'uk', ntscFlag: 'usa' },
  french: { name: 'French', flag: 'france' },
  german: { name: 'German', flag: 'germany' },
  italian: { name: 'Italian', flag: 'italy' },
  dutch: { name: 'Dutch', flag: 'netherlands' },
  polish: { name: 'Polish', flag: 'poland' },
  russian: { name: 'Russian', flag: 'russia' },
  swedish: { name: 'Swedish', flag: 'sweden' },
  danish: { name: 'Danish', flag: 'denmark' },
  norwegian: { name: 'Norwegian', flag: 'norway' },
  finnish: { name: 'Finnish', flag: 'finland' },
  portuguese: { name: 'Portuguese', flag: 'portugal' },
  brazilian: { name: 'Brazilian Portuguese', flag: 'brazil' },
  czech: { name: 'Czech', flag: 'czech' },
  japanese: { name: 'Japanese', flag: 'japan' },
  korean: { name: 'Korean', flag: 'korea' },
  chinese: { name: 'Chinese', flag: 'china' },
};

// "spanish (PAL)" -> { key: 'spanish', name: 'Spanish', region: 'PAL', translation: false, svg }
// "russian (translation)" -> { key: 'russian', name: 'Russian (fan translation)', region: '', translation: true, svg }
// name is English; lib/i18n.js (languageName) gives it in the language of the page.
export function describeLanguage(detected) {
  const m = /^([a-z]+) \((pal|ntsc|translation)\)$/i.exec(detected || '');
  if (!m) {
    return { key: '', name: 'Unknown', region: '', translation: false, svg: '' };
  }
  const key = m[1].toLowerCase();
  const region = m[2].toUpperCase();
  const info = LANGUAGES[key];
  if (!info) {
    return { key, name: key.charAt(0).toUpperCase() + key.slice(1), region, translation: false, svg: '' };
  }
  if (region === 'TRANSLATION') {
    return { key, name: `${info.name} (fan translation)`, region: '', translation: true, svg: FLAGS[info.flag] };
  }
  const flag = region === 'NTSC' && info.ntscFlag ? info.ntscFlag : info.flag;
  return { key, name: info.name, region, translation: false, svg: FLAGS[flag] };
}
