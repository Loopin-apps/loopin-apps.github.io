# Loopin 사이트 — 작업 안내

앱인토스 미니앱을 모아 소개하고 토스로 유입시키는 정적 웹사이트. 사용자는 한국어로 대화한다.
날짜별 작업 내역과 결정 이유는 `WORKLOG.md`.

- 사이트: https://loopin-apps.github.io
- 저장소: `Loopin-apps/loopin-apps.github.io` (public, GitHub 조직 소유)
- 앱 소스: `toss-inapp` (개인 계정의 비공개 저장소, 앱별 폴더)
- **사이트·문서·커밋 메시지·PR에 개인 계정 이름을 쓰지 않는다**(주소 노출을 피하려고 조직으로 옮김, 2026-11-15).

## 구조 (빌드 없음, HTML/CSS/JS만)
| 파일 | 역할 |
|---|---|
| `apps.js` | **여기만 고치면 되는 설정.** `window.SITE`(이름·설명·연락처)와 `window.APPS`(앱 목록) |
| `index.html` | 페이지 뼈대, 메타 태그(탭 제목·공유 미리보기는 여기에 직접 적혀 있음) |
| `main.js` | 카드·필터·폰 목업·마키 렌더, 앱 열기(모바일 링크 / PC QR 모달), 별 배경 |
| `style.css` | 기본 스타일과 반응형 |
| `fx.js` / `fx.css` | 화려한 효과(인트로, 글자 등장, 도는 아이콘, 클릭 폭죽, 커서 링 등). 동작 줄이기 설정이면 모두 꺼짐 |
| `assets/logo.svg`, `assets/favicon.svg` | 회사 로고(열린 고리 + 점, "loop + in", 사이트 그라디언트). 파비콘은 어두운 둥근 사각형 배경 위 고리. **∞ 무한대 모양이나 "oo"를 ∞로 바꾸는 표기는 쓰지 않는다**(같은 이름의 다른 회사 로고와 겹침, 2026-11-18). 인트로·상단 메뉴·미리보기 이미지에는 같은 모양을 SVG로 직접 넣어 둠 |
| `assets/icons/` | 앱 로고 192px (`toss-inapp/<폴더>/assets/logo.png`를 줄인 것) |
| `assets/og/` | 공유 미리보기 이미지 1200×630 JPG. `site.jpg`(사이트) + `<폴더명>.jpg`(앱별). `tools/make-og.js`로 생성 |
| `tools/make-og.js` | 미리보기 이미지 생성 스크립트(`apps.js`를 읽음). 앱을 추가·수정하면 다시 실행 |

## 앱 추가·수정
1. `toss-inapp`에서 정보 확인:
   - `appName`: `<폴더>/apps-in-toss.config.ts`
   - 이름: `<폴더>/src/services/shareService.ts`의 `APP_TITLE`
   - 설명: `<폴더>/PRD.md`의 한 줄 정의
   - 로고: `<폴더>/assets/logo.png` → 192px로 줄여 `assets/icons/<폴더>.png`
2. `apps.js`의 `APPS`에 항목 추가. `link`를 비우면 `intoss://<appName>`이 자동으로 쓰임.
3. 미리보기 이미지 다시 만들기: `TOSS_INAPP=<toss-inapp 경로> FONT=<PretendardVariable.woff2 경로> node tools/make-og.js` (Pretendard는 npm `pretendard` 패키지에 있음. jsdelivr는 작업 환경에서 막혀 있음)

## 토스 링크 처리 (`main.js`)
- `intoss://`는 토스가 없으면 브라우저 오류가 난다. 그래서:
  - Android: `intent://<appName>#Intent;scheme=intoss;package=viva.republica.toss;S.browser_fallback_url=<Play 스토어>;end`
  - iOS: `intoss://`로 시도 → 1.8초 뒤에도 페이지가 보이면 "토스 설치하기" 안내 창(App Store `id839333328`)
  - PC QR·링크 복사: `?open=<appName>`이 붙은 사이트 주소. 이 주소로 들어오면 열기 버튼 창을 띄운다(터치 없이 앱 주소로 이동하면 막히는 브라우저가 있어서).
- `link`에 공식 공유 링크(`https://tossminiapp.com/s/<코드>`, 각 앱 안 공유 버튼으로 생성)를 넣으면 그 링크를 그대로 쓴다. 토스가 없으면 스토어로 보내 주는 공식 링크라 가장 확실하다. **현재 15개 앱 모두 넣어 둠(2026-11-15).** 새 앱도 출시 후 공유 버튼으로 링크를 받아 넣는다.

## 배포
- **CSS·JS를 고치면 `index.html`의 `?v=` 버전을 올린다**(예: `style.css?v=20261116b`). 안 올리면 일부 브라우저(네이버 앱 등)가 옛 파일을 계속 써서 새 화면이 깨져 보인다.
- `main`에 머지하면 GitHub Pages가 자동 배포(1~2분).
- 작업 흐름: 작업 브랜치에서 커밋·푸시 → PR → 사용자가 머지 → Actions의 `pages build and deployment` 결과 확인.
- 이 클라우드 작업 환경에서는 `*.github.io`에 직접 접속이 막혀 있다. 배포 확인은 GitHub Actions 실행 기록과 `main`의 파일 내용으로 한다.

## 지켜야 할 것
- **사업자 정보는 사이트에 넣지 않는다**(사용자 결정, 2026-11-15에 상호·대표도 뺌). 사업자등록번호·주소(집 주소)·생년월일·대표자명·연락처 모두 해당.
- **토스 공식처럼 보이는 표현 금지**("토스 공식 파트너" 등). 하단의 "공식 사이트가 아니에요" 문구 유지.
- 로또 추첨기는 당첨 확률·예측 표현 금지, "재미용 · 만 19세 이상" 유지. 두뇌 체크·약 챙김은 의료 표현("치매/예방/진단/치료") 금지.
- 오늘의 운세에 유료 결제가 있으니 "전부 무료" 같은 표현을 쓰지 않는다.
- **편의성·안심 문구는 확인된 사실만**(2026-11-16 앱 코드 확인): 15개 앱 모두 로그인·자체 서버 없음, 기록은 휴대폰 `localStorage`에만 저장. 예외는 두 곳 — 다녀왔어는 주소를 찾을 때 위치 좌표를 OpenStreetMap에 보내고, 로또 추첨기는 공개 당첨번호만 내려받음(사용자 데이터 전송 없음). "보안 걱정 없음", "완벽한 보안" 같은 단정은 쓰지 않는다. `#why` 섹션의 작은 안내 문구(기기 변경 시 기록 안 옮겨짐)는 유지한다. 다녀왔어 예외 문장은 사용자 요청으로 사이트에서 뺐다(2026-11-16) — 그래도 "어떤 데이터도 밖으로 나가지 않는다" 같은 문장은 쓰지 않는다. 앱에 서버 전송·로그인이 생기면 이 문구부터 고친다.
- **성능**: 화면 전체 크기 요소에 `filter: blur`/`backdrop-filter`/`mix-blend-mode`를 쓰지 않는다. `body`·`html`에 자주 바뀌는 CSS 변수를 쓰지 않는다. `requestAnimationFrame` 루프는 멈추거나 화면 밖이면 쉬게 한다. 움직임은 `transform`/`opacity`로만. **끝없이 반복되는 애니메이션은 최소로**: `background-position`(글자·버튼 그라디언트 흐르기), `box-shadow`, `filter`, `@property` 각도처럼 매 프레임 다시 그리는 속성은 반복시키지 않는다. 반복이 필요하면 화면 밖에서 멈춘다(`fx.js`가 `.hero`·`.marquee`·`.cta-card`에 `.off`를 붙임). 스크롤 등장 효과에 `blur` 필터를 쓰지 않는다. 성능 측정은 휴대폰 화면 + CPU 4배 느리게 + 스크롤로 한다(2026-11-19 기준 약 44fps).
- 효과를 바꾼 뒤에는 데스크톱(1440px)과 휴대폰(iPhone 13) 화면, 페이지 오류, 모바일 가로 스크롤(`scrollWidth`가 화면 폭과 같은지)을 확인한다.

## 미리보기
```bash
python3 -m http.server 8000
```
