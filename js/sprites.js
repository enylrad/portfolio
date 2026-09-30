// Sprites pixel art definidos como matrices de caracteres.
// Cada letra es un color de PALETTE; '.' es transparente.
// Se usan tanto en la página (SVG) como en el minijuego (canvas).

export const PALETTE = {
  G: '#3ddc84', // verde Android
  W: '#ffffff',
  K: '#10131a',
  R: '#ff5c7a',
  P: '#8b6cff',
  Y: '#ffd166',
  O: '#f59e0b',
  C: '#0891b2',
  c: '#67e8f9',
  N: '#1b1f4b',
  n: '#2d3170',
  M: '#f4f1de',
  B: '#0b0d1a',
  L: '#ffb703',
  H: '#ff5c8a',
  D: '#3a4252',
  E: '#cbd5e1',
  F: '#a16207',
  U: '#3b82f6',
  u: '#93c5fd',
};

// Iconos de los proyectos (etiqueta de cada cartucho).
const PROJECT_ICONS = {
  'p-mercurio': [
    '................',
    '.......KK.......',
    '.....KKPPKK.....',
    '...KKPPPPPPKK...',
    '.KKPPPPPPPPPPKK.',
    'KPPPPPPPPPPPPPPK',
    '.KKPPPPPPPPPPKKY',
    '...KKPPPPPPKK.Y.',
    '...KDKKPPKKDK.Y.',
    '...KDDDKKDDDK.Y.',
    '...KDDDDDDDDK.YY',
    '...KDDDDDDDDK...',
    '....KKDDDDKK....',
    '......KKKK......',
  ],
  'p-bliver': [
    '................',
    '....K......K....',
    '..RRKRRRRRRKRR..',
    '..RRKRRRRRRKRR..',
    '..RRRRRRRRRRRR..',
    '..WWWWWWWWWWWW..',
    '..WEEWEEWEEWEW..',
    '..WWWWWWWWWWWW..',
    '..WEEWEEWRRWEW..',
    '..WWWWWWWWWWWW..',
    '..WEEWEEWEEWEW..',
    '..WWWWWWWWWWWW..',
    '..EEEEEEEEEEEE..',
    '................',
  ],
  'p-istobal': [
    '....u.....u.....',
    '...uWu...uWu..u.',
    '....u.....u..uWu',
    '..............u.',
    '....RRRRRRR.....',
    '...RuuRuuuRR....',
    '..RRuuRuuuRRR...',
    '.RRRRRRRRRRRRRR.',
    '.RYRRRRRRRRRRYR.',
    '.RRRRRRRRRRRRRR.',
    '..KKK.....KKK...',
    '..KEK.....KEK...',
    '..KKK.....KKK...',
  ],
  'p-smartstation': [
    '................',
    '..GGGGGGGG......',
    '..GWWWWWWG.K....',
    '..GWKKKKWG..K...',
    '..GWWWWWWG..K...',
    '..GGGGGGGGK.K...',
    '..GGGGGGGG.KK...',
    '..GGGGGGGG..K...',
    '..GGYYYYGG..K...',
    '..GGGGGGGG..K...',
    '..GGGGGGGG.KK...',
    '..GGGGGGGGK.....',
    '.KKKKKKKKKK.....',
    '.KKKKKKKKKK.....',
  ],
  'p-haulap': [
    '................',
    '...FFFFFFFFFF...',
    '..FOOOOYYOOOOF..',
    '..FOOOOYYOOOOF..',
    '..FFFFFYYFFFFF..',
    '..FOOOOYYOOOOF..',
    '..FOOOOYYOOOOF..',
    '..FOOOOOOOOOOF..',
    '..FOOKKKOOOOOF..',
    '..FOOOOOOOOOOF..',
    '..FOOOOOOOOOOF..',
    '..FFFFFFFFFFFF..',
    '................',
  ],
  'p-vouzzer': [
    '.......Y........',
    '.......Y........',
    '......YYY.......',
    '......YYY.......',
    'YYYYYYYWYYYYYYY.',
    '.YYYYYWYYYYYYY..',
    '..YYYYYYYYYYY...',
    '...YYYYYYYYY....',
    '...YYYYYYYYY....',
    '..YYYYY.YYYYY...',
    '..YYYY...YYYY...',
    '.YYY.......YYY..',
    '.Y...........Y..',
  ],
  'p-solidalis': [
    '................',
    '...RRR....RRR...',
    '..RRRRR..RRRRR..',
    '.RRWWRRRRRRRRRR.',
    '.RRWRRRRRRRRRRR.',
    '.RRRRRRRRRRRRRR.',
    '.RRRRRRRRRRRRRR.',
    '..RRRRRRRRRRRR..',
    '...RRRRRRRRRR...',
    '....RRRRRRRR....',
    '.....RRRRRR.....',
    '......RRRR......',
    '.......RR.......',
  ],
  'p-falomir': [
    '.....KKKKKK.....',
    '...KKOOOOOOKK...',
    '..KOOOOOOOOOOK..',
    '.KOOOWWWWWWOOOK.',
    '.KOOWWKKKKWWOOK.',
    'KOOWWWWWWKWWWOOK',
    'KOOWWWWWKWWWWOOK',
    'KOOWWWWKWWWWWOOK',
    'KOOWWWWKWWWWWOOK',
    '.KOOWWWKWWWWOOK.',
    '.KOOOWWWWWWOOOK.',
    '..KOOOOOOOOOOK..',
    '...KKOOOOOOKK...',
    '.....KKKKKK.....',
  ],
  'p-heregallery': [
    'FFFFFFFFFFFFFFFF',
    'FYYYYYYYYYYYYYYF',
    'FYuuuuuuuuuuuuYF',
    'FYuuuuuuuuWWuuYF',
    'FYuuuuuuuuWWuuYF',
    'FYuuuuGuuuuuuuYF',
    'FYuuuGGGuuuuuuYF',
    'FYuuGGGGGuuGuuYF',
    'FYuGGGGGGGGGGuYF',
    'FYGGGGGGGGGGGGYF',
    'FYYYYYYYYYYYYYYF',
    'FFFFFFFFFFFFFFFF',
  ],
  'p-styloo': [
    '.E............E.',
    '.EE..........EE.',
    '..EE........EE..',
    '...EE......EE...',
    '....EE....EE....',
    '.....EE..EE.....',
    '......EKKE......',
    '......HKKH......',
    '.....HH..HH.....',
    '...HHHH..HHHH...',
    '..HH..H..H..HH..',
    '..H...H..H...H..',
    '..HH.HH..HH.HH..',
    '...HHH....HHH...',
  ],
  'p-iobi': [
    '................',
    '......UUUU......',
    '.....UuuuuU.....',
    '..UUUuuuuuuU....',
    '.UuuuuuuuuuuUU..',
    '.UuuuuuuuuuuuuU.',
    'UuuuuuuuuuuuuuuU',
    'UuuuuuuuuuuuuuuU',
    '.UUUUUUUUUUUUUU.',
    '................',
    '.....E..E..E....',
    '.....E..E..E....',
    '....EEEEEEEEE...',
  ],
  'p-padeltrack': [
    '....KKKKK.......',
    '...KUUUUUK......',
    '..KUUWUWUUK.....',
    '..KUUUUUUUK.....',
    '..KUWUWUWUK.....',
    '..KUUUUUUUK.....',
    '..KUUWUWUUK.....',
    '...KUUUUUK......',
    '....KKKKK.......',
    '......KK.....YY.',
    '......KK....YYYY',
    '......EE....YYYY',
    '......EE.....YY.',
    '......EE........',
  ],
  'p-fantasy': [
    '.....KKKKKK.....',
    '...KKWWWWWWKK...',
    '..KWWWWKKWWWWK..',
    '.KWWWWKKKKWWWWK.',
    '.KWWWWWKKWWWWWK.',
    'KKKWWWWWWWWWWKKK',
    'KKWWWWWWWWWWWWKK',
    'KWWWWWWWWWWWWWWK',
    'KWWWKKWWWWKKWWWK',
    '.KWKKKKWWKKKKWK.',
    '.KWWKKWWWWKKWWK.',
    '..KWWWWWWWWWWK..',
    '...KKWWWWWWKK...',
    '.....KKKKKK.....',
  ],
  'p-trivial': [
    '..WWWWWWWWWWWW..',
    '.WWWWWWWWWWWWWW.',
    'WWWWWPPPPPWWWWWW',
    'WWWWPPWWWPPWWWWW',
    'WWWWWWWWWPPWWWWW',
    'WWWWWWWWPPWWWWWW',
    'WWWWWWWPPWWWWWWW',
    'WWWWWWWPPWWWWWWW',
    'WWWWWWWWWWWWWWWW',
    '.WWWWWWPPWWWWWW.',
    '..WWWWWWWWWWWW..',
    '...WWW..........',
    '..WW............',
    '.W..............',
  ],
};

const droidBody = [
  '...G........G...',
  '....G......G....',
  '.....GGGGGG.....',
  '...GGGGGGGGGG...',
  '..GGGWGGGGWGGG..',
  '..GGGGGGGGGGGG..',
  '................',
  'G.GGGGGGGGGGGG.G',
  'G.GGGGGGGGGGGG.G',
  'G.GGGGGGGGGGGG.G',
  'G.GGGGGGGGGGGG.G',
  '..GGGGGGGGGGGG..',
  '..GGGGGGGGGGGG..',
];

const mirror = (rows) => rows.map((r) => [...r].reverse().join(''));

export const SPRITES = {
  droid: [...droidBody, '....GG....GG....', '....GG....GG....'],
  droidRunA: [...droidBody, '....GG....GG....', '...GG......GG...'],
  droidRunB: [...droidBody, '....GG....GG....', '.....GG..GG.....'],
  droidDuck: [
    '..G..........G..',
    '...GGGGGGGGGG...',
    '..GGGWGGGGWGGG..',
    '..GGGGGGGGGGGG..',
    'G.GGGGGGGGGGGG.G',
    'G.GGGGGGGGGGGG.G',
    '..GGGGGGGGGGGG..',
    '...GG......GG...',
  ],
  robot: [
    '.....O......',
    '.....K......',
    '..RRRRRRRR..',
    '..RWWRRWWR..',
    '..RWKRRWKR..',
    '..RRRRRRRR..',
    '..RRKKKKRR..',
    '............',
    '.RRRRRRRRRR.',
    'K.RRRRRRRR.K',
    '..RRRRRRRR..',
    '..KK....KK..',
  ],
  droneA: [
    'KKKKK....KKKKK',
    '..K........K..',
    '..PPPPPPPPPP..',
    '.PPWWPPPPWWPP.',
    '.PPWKPPPPWKPP.',
    '..PPPPPPPPPP..',
    '...P......P...',
    '..PP......PP..',
  ],
  droneB: [
    '.KKK......KKK.',
    '..K........K..',
    '..PPPPPPPPPP..',
    '.PPWWPPPPWWPP.',
    '.PPWKPPPPWKPP.',
    '..PPPPPPPPPP..',
    '...P......P...',
    '..PP......PP..',
  ],
  sparkA: [
    '...Y....',
    '..YY..Y.',
    '.YYWY.Y.',
    'YYWWWYY.',
    '.YWWWY..',
    '..YWY.Y.',
    '.Y.Y.YY.',
    'OOOOOOOO',
  ],
  coin: [
    '..CCCCC..',
    '.CcccccC.',
    'CccCCCccC',
    'CcCcccccC',
    'CcCcccccC',
    'CcCcccccC',
    'CccCCCccC',
    '.CcccccC.',
    '..CCCCC..',
  ],
  bluetooth: [
    '....W....',
    '....WW...',
    '....W.W..',
    '.W..W..W.',
    '..W.W.W..',
    '...WWW...',
    '....W....',
    '...WWW...',
    '..W.W.W..',
    '.W..W..W.',
    '....W.W..',
    '....WW...',
    '....W....',
  ],
  // Portada nocturna para el «Now playing» del head unit.
  cover: [
    'NNNNNNNNNNNNNNNN',
    'NNYNNNNNNNNMMNNN',
    'NNNNNNNNNNMMMMNN',
    'NNNNNNYNNNMMMMNN',
    'NNNNNNNNNNNMMNNN',
    'NYNNNNNNNNNNNNYN',
    'nnnnnnnnnnnnnnnn',
    'nnnnnnnnnnnnnnnn',
    'HHHHHHHHHHHHHHHH',
    'HHBBHHHHHBBBHHHH',
    'HBBBHBBHHBLBHBBH',
    'BBLBBBBBHBBBBBLB',
    'BBBBBLBBBBBLBBBB',
    'BLBBBBBBBBBBBLBB',
    'BBBBLBBBLBBBBBBB',
    'BBBBBBBBBBBBBBBB',
  ],
};
SPRITES.sparkB = [...mirror(SPRITES.sparkA.slice(0, 7)), SPRITES.sparkA[7]];
Object.assign(SPRITES, PROJECT_ICONS);

// Recorre la matriz agrupando píxeles contiguos del mismo color en tramos horizontales.
function runs(rows, cb) {
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let len = 1;
      while (row[x + len] === ch) len++;
      if (ch !== '.') cb(ch, x, y, len);
      x += len;
    }
  });
}

export function spriteSVG(name) {
  const rows = SPRITES[name];
  let rects = '';
  runs(rows, (ch, x, y, len) => {
    rects += `<rect x="${x}" y="${y}" width="${len}" height="1" fill="${PALETTE[ch]}"/>`;
  });
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
}

// Dibuja un sprite en un canvas. `swap` permite recolorear (p. ej. { G: '#ff5c7a' }).
export function drawSprite(ctx, name, x, y, swap) {
  runs(SPRITES[name], (ch, px, py, len) => {
    ctx.fillStyle = swap?.[ch] ?? PALETTE[ch];
    ctx.fillRect(Math.round(x) + px, Math.round(y) + py, len, 1);
  });
}

export const spriteSize = (name) => ({ w: SPRITES[name][0].length, h: SPRITES[name].length });

// Rellena los <span data-sprite="nombre"> de la página.
export function mountSprites(scope = document) {
  scope.querySelectorAll('[data-sprite]').forEach((el) => {
    if (!el.firstChild) el.innerHTML = spriteSVG(el.dataset.sprite);
  });
}
