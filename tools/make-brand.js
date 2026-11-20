// Loopin 로고 파일 묶음 생성 → assets/brand/
// 실행: FONT=<PretendardVariable.woff2 경로> node tools/make-brand.js
// (Pretendard는 npm `pretendard` 패키지에 있음. 로고 모양을 바꾸면 assets/logo.svg·favicon.svg와 같이 고친다)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '../assets/brand');
fs.mkdirSync(OUT, { recursive: true });
const FONT = process.env.FONT || require.resolve('pretendard/dist/web/variable/woff2/PretendardVariable.woff2');
const font = `@font-face{font-family:P;src:url(data:font/woff2;base64,${fs.readFileSync(FONT).toString('base64')}) format('woff2');font-weight:100 900}`;

const STOPS = '<stop offset="0" stop-color="#3182f6"/><stop offset=".45" stop-color="#a855f7"/><stop offset=".75" stop-color="#ec4899"/><stop offset="1" stop-color="#22d3ee"/>';
const ARC = 'M82.84 41.20 A34 34 0 1 1 58.80 17.16';
const symbol = (dot, id = 'g') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${STOPS}</linearGradient></defs>` +
  `<path d="${ARC}" fill="none" stroke="url(#${id})" stroke-width="15" stroke-linecap="round"/><circle cx="74.04" cy="25.96" r="8.5" fill="${dot}"/></svg>`;

const DARK_DOT = '#ffffff', LIGHT_DOT = '#7c3aed', DARK_BG = '#0e0c1d', INK = '#191f28';

// SVG 파일
fs.writeFileSync(path.join(OUT, 'loopin-symbol-for-dark-bg.svg'), symbol(DARK_DOT) + '\n');
fs.writeFileSync(path.join(OUT, 'loopin-symbol-for-light-bg.svg'), symbol(LIGHT_DOT) + '\n');
const icon = (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">${STOPS}</linearGradient></defs>` +
  `<rect width="100" height="100" rx="${radius}" fill="${DARK_BG}"/><g transform="translate(50 50) scale(.72) translate(-50 -50)">` +
  `<path d="${ARC}" fill="none" stroke="url(#g)" stroke-width="15" stroke-linecap="round"/><circle cx="74.04" cy="25.96" r="8.5" fill="#fff"/></g></svg>`;
fs.writeFileSync(path.join(OUT, 'loopin-app-icon.svg'), icon(22) + '\n');

const page = (body, w, h, bg = 'transparent') => `<!doctype html><html><head><meta charset="utf-8"><style>${font}
*{margin:0;padding:0}html,body{width:${w}px;height:${h}px;background:${bg};overflow:hidden}
body{display:flex;align-items:center;justify-content:center;font-family:P}svg{display:block}</style></head><body>${body}</body></html>`;
const wordmark = (dot, ink, h) => `<div style="display:flex;align-items:center;gap:${h * 0.22}px">
  <div style="width:${h}px;height:${h}px">${symbol(dot, 'w' + Math.random().toString(36).slice(2))}</div>
  <div style="font-size:${h * 0.82}px;font-weight:800;letter-spacing:-0.03em;color:${ink};line-height:1">Loopin</div></div>`;

const shots = [
  ['loopin-symbol-for-dark-bg-1024.png', page(`<div style="width:1024px;height:1024px">${symbol(DARK_DOT)}</div>`, 1024, 1024)],
  ['loopin-symbol-for-light-bg-1024.png', page(`<div style="width:1024px;height:1024px">${symbol(LIGHT_DOT)}</div>`, 1024, 1024)],
  ['loopin-app-icon-1024.png', page(`<div style="width:1024px;height:1024px">${icon(22)}</div>`, 1024, 1024)],
  ['loopin-profile-1080.png', page(`<div style="width:1080px;height:1080px">${icon(0)}</div>`, 1080, 1080)],
  ['loopin-wordmark-for-dark-bg.png', page(wordmark(DARK_DOT, '#ffffff', 300), 1500, 440)],
  ['loopin-wordmark-for-light-bg.png', page(wordmark(LIGHT_DOT, INK, 300), 1500, 440)],
];

(async () => {
  const b = await chromium.launch();
  for (const [name, html] of shots) {
    const m = html.match(/html,body\{width:(\d+)px;height:(\d+)px/);
    const p = await b.newPage({ viewport: { width: +m[1], height: +m[2] }, deviceScaleFactor: 1 });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, name), omitBackground: true });
    await p.close();
  }
  // 미리보기(어두운·밝은 배경 위에 배치)
  const prev = await b.newPage({ viewport: { width: 1400, height: 760 }, deviceScaleFactor: 1 });
  const img = (f) => `data:image/png;base64,${fs.readFileSync(path.join(OUT, f)).toString('base64')}`;
  await prev.setContent(page(`<div style="display:grid;grid-template-columns:1fr 1fr;width:1400px;height:760px">
    <div style="background:#07060f;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:50px">
      <img src="${img('loopin-wordmark-for-dark-bg.png')}" style="width:560px">
      <div style="display:flex;gap:40px;align-items:center"><img src="${img('loopin-symbol-for-dark-bg-1024.png')}" style="width:140px"><img src="${img('loopin-app-icon-1024.png')}" style="width:140px"></div></div>
    <div style="background:#f7f8fa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:50px">
      <img src="${img('loopin-wordmark-for-light-bg.png')}" style="width:560px">
      <div style="display:flex;gap:40px;align-items:center"><img src="${img('loopin-symbol-for-light-bg-1024.png')}" style="width:140px"><img src="${img('loopin-profile-1080.png')}" style="width:140px;border-radius:50%"></div></div>
  </div>`, 1400, 760));
  await prev.waitForTimeout(300);
  await prev.screenshot({ path: path.join(OUT, 'preview.png') });
  await b.close();
})();
