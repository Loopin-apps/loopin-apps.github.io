// 공유 미리보기(OG) 이미지 생성: 1200x630 JPG
// 사이트 대표 이미지 1장(site.jpg) + 앱별 1장(<toss-inapp 폴더명>.jpg) → assets/og/
//
// 실행:
//   npm i -D playwright pretendard   (한 번만, 저장소 밖 아무 폴더에서 해도 됨)
//   TOSS_INAPP=<toss-inapp 경로> FONT=<PretendardVariable.woff2 경로> node tools/make-og.js
// TOSS_INAPP 가 있으면 앱 원본 600px 로고를, 없으면 assets/icons 의 192px 아이콘을 씀.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '..');
const OUT = path.join(SITE_DIR, 'assets/og');
const FONT = process.env.FONT || require.resolve('pretendard/dist/web/variable/woff2/PretendardVariable.woff2');
fs.mkdirSync(OUT, { recursive: true });

const fontCss = `@font-face{font-family:P;src:url(data:font/woff2;base64,${fs.readFileSync(FONT).toString('base64')}) format('woff2');font-weight:100 900;}`;
const img = (rel) => `data:image/png;base64,${fs.readFileSync(path.join(SITE_DIR, rel)).toString('base64')}`;

// apps.js 를 그대로 읽어 같은 데이터 사용
const ctx = { window: {} };
new Function('window', fs.readFileSync(path.join(SITE_DIR, 'apps.js'), 'utf8'))(ctx.window);
const { SITE, APPS } = ctx.window;

const base = `
${fontCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:P,sans-serif;color:#f5f3ff;background:#07060f;position:relative;word-break:keep-all;-webkit-font-smoothing:antialiased}
.bg{position:absolute;inset:0;overflow:hidden}
.bg i{position:absolute;border-radius:50%;}
.stars{position:absolute;inset:0;background-image:
  radial-gradient(1.5px 1.5px at 8% 20%,#fff9,transparent),radial-gradient(1px 1px at 22% 78%,#fff8,transparent),
  radial-gradient(1.5px 1.5px at 41% 12%,#fff7,transparent),radial-gradient(1px 1px at 63% 88%,#fff8,transparent),
  radial-gradient(1.5px 1.5px at 78% 30%,#fff9,transparent),radial-gradient(1px 1px at 92% 64%,#fff7,transparent),
  radial-gradient(1px 1px at 52% 52%,#fff6,transparent),radial-gradient(1.5px 1.5px at 33% 44%,#fff6,transparent)}
.brand{position:absolute;right:56px;bottom:44px;display:flex;align-items:center;gap:12px;font-size:28px;font-weight:800;letter-spacing:.02em;opacity:.9}
.dot{width:22px;height:22px;border-radius:50%;background:conic-gradient(#3182f6,#a855f7,#ec4899,#22d3ee,#3182f6);box-shadow:0 0 18px #a855f7}
`;
// 앱 아이콘은 toss-inapp 의 원본 600px 로고를 우선 사용(없으면 사이트의 192px)
const hiRes = (a) => {
  const src = process.env.TOSS_INAPP && path.join(process.env.TOSS_INAPP, path.basename(a.icon, '.png'), 'assets/logo.png');
  return src && fs.existsSync(src) ? `data:image/png;base64,${fs.readFileSync(src).toString('base64')}` : img(a.icon);
};
const blobs = (a, b) => `<div class="bg">
  <i style="width:900px;height:900px;left:-300px;top:-420px;background:radial-gradient(circle closest-side,${a}cc,${a}55 45%,transparent)"></i>
  <i style="width:820px;height:820px;right:-260px;bottom:-460px;background:radial-gradient(circle closest-side,${b}bb,${b}44 45%,transparent)"></i>
  <i style="width:600px;height:600px;left:380px;top:120px;background:radial-gradient(circle closest-side,#a855f733,transparent)"></i>
  <div class="stars"></div></div>`;

const appHtml = (a) => {
  const [c1, c2] = a.colors || ['#7c3aed', '#ec4899'];
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
.wrap{position:absolute;inset:0;display:flex;align-items:center;gap:64px;padding:0 80px}
.icon{flex:none;width:280px;height:280px;border-radius:72px;overflow:hidden;
  box-shadow:0 30px 80px -10px ${c1}cc,0 0 0 2px #ffffff26;transform:rotate(-4deg)}
.icon img{width:100%;height:100%;display:block}
.txt{flex:1;min-width:0}
.chip{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;font-size:24px;font-weight:700;
  color:#e9e3ff;background:#ffffff14;border:1.5px solid #ffffff2a}
.chip b{width:10px;height:10px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80}
h1{font-size:${a.name.length > 7 ? 76 : 92}px;font-weight:850;letter-spacing:-.045em;line-height:1.08;margin:22px 0 18px}
p{font-size:32px;line-height:1.45;color:#cdc7e8;font-weight:500;letter-spacing:-.01em;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-width:700px}
.cta{display:inline-flex;align-items:center;gap:12px;margin-top:30px;padding:16px 30px;border-radius:999px;font-size:28px;font-weight:800;
  background:linear-gradient(110deg,${c1},${c2});box-shadow:0 14px 40px -10px ${c2}}
.note{display:inline-block;margin-left:14px;font-size:20px;font-weight:600;color:#cfc9ea;padding:6px 14px;border-radius:999px;border:1.5px solid #ffffff2a;vertical-align:middle}
</style></head><body>${blobs(c1, c2)}
<div class="wrap">
  <div class="icon"><img src="${hiRes(a)}"></div>
  <div class="txt">
    <span class="chip"><b></b>설치·가입 없이 토스에서 바로</span>
    <h1>${a.name}</h1>
    <p>${a.desc}</p>
    <span class="cta">토스에서 바로 써보기 →</span>${a.note ? `<span class="note">${a.note}</span>` : ''}
  </div>
</div>
<div class="brand"><span class="dot"></span>${SITE.name}</div>
</body></html>`;
};

const siteHtml = () => {
  const icons = APPS.filter((a) => a.icon);
  const n = icons.length;
  const tiles = icons.map((a, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = col * 108 + (row % 2) * 54, y = row * 108;
    return `<img src="${img(a.icon)}" style="left:${x}px;top:${y}px;transform:rotate(${(i % 3 - 1) * 6}deg)">`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
.wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 72px 0 84px}
.left{max-width:560px}
.chip{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;font-size:22px;font-weight:700;letter-spacing:.12em;
  color:#d8ccff;background:#a855f71f;border:1.5px solid #a855f759}
.chip b{width:10px;height:10px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80}
h1{font-size:78px;font-weight:850;letter-spacing:-.05em;line-height:1.1;margin:24px 0 20px}
.g{background:linear-gradient(100deg,#60a5fa,#c084fc 45%,#f472b6);-webkit-background-clip:text;background-clip:text;color:transparent}
p{font-size:30px;color:#cdc7e8;line-height:1.45;font-weight:500}
.grid{position:relative;width:${4 * 108 + 54 + 96}px;height:${2 * 108 + 96}px;transform:rotate(-8deg)}
.grid img{position:absolute;width:96px;height:96px;border-radius:26px;box-shadow:0 16px 36px -10px #7c3aedcc,0 0 0 1.5px #ffffff22}
</style></head><body>${blobs('#3182f6', '#ec4899')}
<div class="wrap">
  <div class="left">
    <span class="chip"><b></b>APPS IN TOSS</span>
    <h1>토스 안에서<br><span class="g">바로 실행</span>되는<br>작은 앱들</h1>
    <p>미니앱 ${n}개, 설치·가입 없이 바로<br>기록은 내 휴대폰에만 저장돼요</p>
  </div>
  <div class="grid">${tiles}</div>
</div>
<div class="brand"><span class="dot"></span>${SITE.name}</div>
</body></html>`;
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const shot = async (html, name) => {
    await p.setContent(html, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    const file = path.join(OUT, name);
    await p.screenshot({ path: file, type: 'jpeg', quality: 88 });
    console.log(name, Math.round(fs.statSync(file).size / 1024) + 'KB');
  };
  await shot(siteHtml(), 'site.jpg');
  for (const a of APPS) {
    const folder = path.basename(a.icon, '.png'); // 아이콘 파일명 = toss-inapp 폴더명
    await shot(appHtml(a), `${folder}.jpg`);
  }
  await b.close();
})();
