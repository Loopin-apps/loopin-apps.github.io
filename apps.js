/**
 * ✏️  여기만 수정하면 사이트 전체가 바뀝니다.
 *
 * appName: 앱인토스 콘솔에 등록된 appName. 링크(intoss://<appName>)가 자동으로 만들어집니다.
 * link   : 토스 공식 공유 링크(앱 안 공유 버튼으로 만든 https://tossminiapp.com/s/...).
 *          토스가 없으면 스토어로 보내 줌. 비우면 intoss://<appName> 을 쓰고 main.js가 대신 처리
 * name   : 토스에서 검색되는 앱 이름 (링크가 안 열릴 때 "토스에서 검색" 안내에 쓰임)
 * icon   : 아이콘 이미지 경로
 * emoji  : 띠(마키)에 함께 표시할 이모지
 * colors : 카드 그라디언트 두 색
 * tag    : 카테고리 (필터 버튼이 자동으로 만들어집니다)
 * badge  : (선택) "NEW", "HOT" 등
 * note   : (선택) 카드 아래 작게 붙는 안내 문구
 */
window.SITE = {
  name: "Loopin",
  tagline: "매일 여는 토스 미니앱 모음",
  description:
    "운세, 퀴즈, 습관 기록까지. 설치 없이 토스 안에서 바로 열리는 미니앱 15개를 만들고 있어요.",
  contact: "", // 예: "mailto:hello@example.com" (비워두면 숨김)
};

window.APPS = [
  // ── 운세·재미 ──
  {
    name: "오늘의 운세",
    appName: "myfortune100",
    link: "https://tossminiapp.com/s/lRWp02z7", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "띠나 별자리를 고르면 매일 새로운 총운·애정운·금전운을 보여주고, 한 달 흐름을 캘린더로 돌아봐요.",
    tag: "운세·재미",
    icon: "assets/icons/daily-fortune.png",
    emoji: "🔮",
    colors: ["#7c3aed", "#ec4899"],
    badge: "HOT",
  },
  {
    name: "오늘의 타로",
    appName: "todaytarot100",
    link: "https://tossminiapp.com/s/fTtPUXu", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "끌리는 카드 한 장을 뒤집으면 오늘의 전체·연애·금전·직장 해석이 나와요.",
    tag: "운세·재미",
    icon: "assets/icons/tarot-draw.png",
    emoji: "🃏",
    colors: ["#6d28d9", "#c026d3"],
  },
  {
    name: "오늘의 달",
    appName: "moon-today",
    link: "https://tossminiapp.com/s/xfQ2jdzg", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "날짜마다 실제 모양대로 그린 달과 음력·보름·절기를 보고, 달에게 소원도 빌어요.",
    tag: "운세·재미",
    icon: "assets/icons/moon-today.png",
    emoji: "🌕",
    colors: ["#1e3a8a", "#6366f1"],
    badge: "NEW",
  },
  {
    name: "로또 추첨기",
    appName: "lottopick100",
    link: "https://tossminiapp.com/s/fMBahuYs", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "진짜 추첨기처럼 공이 섞이고 하나씩 나와요. 8가지 방식으로 뽑고 역대 당첨번호 통계도 봐요.",
    tag: "운세·재미",
    icon: "assets/icons/lotto-pick.png",
    emoji: "🎱",
    colors: ["#3b5bdb", "#f59f00"],
    badge: "NEW",
    note: "재미용 · 만 19세 이상",
  },
  {
    name: "오늘 뭐 먹지",
    appName: "whattoeat100",
    link: "https://tossminiapp.com/s/LzqRj7qB", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "식사 시간과 기분만 고르면 97개 메뉴 중 하나를 룰렛으로 골라줘요.",
    tag: "운세·재미",
    icon: "assets/icons/what-to-eat.png",
    emoji: "🍜",
    colors: ["#f97316", "#facc15"],
  },

  // ── 테스트 ──
  {
    name: "내 유형은",
    appName: "mytype100",
    link: "https://tossminiapp.com/s/rBiRqvXe", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "1~2분이면 끝나는 질문에 답하고 나의 성격 유형을 바로 알아봐요.",
    tag: "테스트",
    icon: "assets/icons/personality-quiz.png",
    emoji: "🧩",
    colors: ["#0ea5e9", "#8b5cf6"],
  },
  {
    name: "우리 궁합",
    appName: "wechemi",
    link: "https://tossminiapp.com/s/v613meuw", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "8개 질문에 답해 만든 코드를 친구·연인에게 보내면, 둘의 궁합 점수가 바로 나와요.",
    tag: "테스트",
    icon: "assets/icons/compat-test.png",
    emoji: "💞",
    colors: ["#ec4899", "#f43f5e"],
  },
  {
    name: "나의 취향 월드컵",
    appName: "worldcup100",
    link: "https://tossminiapp.com/s/zGu9zyfn", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "음식·여행지·동물 등 주제별 16강 토너먼트로 나만의 1위를 찾아요.",
    tag: "테스트",
    icon: "assets/icons/worldcup.png",
    emoji: "🏆",
    colors: ["#eab308", "#f97316"],
  },

  // ── 퀴즈·두뇌 ──
  {
    name: "초성 퀴즈",
    appName: "chosung-quiz",
    link: "https://tossminiapp.com/s/1bEfniCh", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "초성만 보고 단어 맞히기. 8개 카테고리 240문제에 매일 바뀌는 오늘의 문제까지.",
    tag: "퀴즈·두뇌",
    icon: "assets/icons/chosung-quiz.png",
    emoji: "🔤",
    colors: ["#22c55e", "#14b8a6"],
  },
  {
    name: "맞춤법 퀴즈",
    appName: "spelling-quiz100",
    link: "https://tossminiapp.com/s/nPQc83hb", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "며칠/몇일, 안 돼요/안 되요… 헷갈리는 맞춤법을 둘 중 하나로 골라 풀어요.",
    tag: "퀴즈·두뇌",
    icon: "assets/icons/spelling-quiz.png",
    emoji: "✍️",
    colors: ["#06b6d4", "#3b82f6"],
  },
  {
    name: "두뇌 체크",
    appName: "braincheck100",
    link: "https://tossminiapp.com/s/5ui3xQR3", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "기억력·집중력·계산력 게임 4가지를 하루 5분, 점수 변화를 기록으로 봐요.",
    tag: "퀴즈·두뇌",
    icon: "assets/icons/brain-check.png",
    emoji: "🧠",
    colors: ["#a855f7", "#6366f1"],
    note: "재미용 · 의학적 진단이 아니에요",
  },

  // ── 생활·습관 ──
  {
    name: "다녀왔어",
    appName: "checkin-habit",
    link: "https://tossminiapp.com/s/h6nwF8f2", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "헬스장·도서관·카페… 자주 가는 장소에 다녀온 날을 체크하고 연속 기록을 쌓아요.",
    tag: "생활·습관",
    icon: "assets/icons/checkin-habit.png",
    emoji: "📍",
    colors: ["#10b981", "#84cc16"],
  },
  {
    name: "감정일기",
    appName: "mooddiary",
    link: "https://tossminiapp.com/s/dUr8OZmm", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "이모지 하나와 한 줄 메모로 오늘 기분을 남기면, 캘린더가 감정 색으로 채워져요.",
    tag: "생활·습관",
    icon: "assets/icons/mood-diary.png",
    emoji: "😊",
    colors: ["#f472b6", "#fb923c"],
  },
  {
    name: "디지털 디톡스",
    appName: "unplugged",
    link: "https://tossminiapp.com/s/BitxefNi", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "폰을 내려놓고 얼마나 버티는지 재는 타이머. 최고 기록과 연속 도전일이 쌓여요.",
    tag: "생활·습관",
    icon: "assets/icons/detox-timer.png",
    emoji: "⏱️",
    colors: ["#64748b", "#0ea5e9"],
  },
  {
    name: "약 챙김",
    appName: "pillcheck100",
    link: "https://tossminiapp.com/s/tR4bA17D", // 토스 공식 공유 링크(토스가 없으면 스토어로 이동)
    desc: "아침·점심·저녁·자기 전, 먹었는지 한 번 눌러 체크만 하면 되는 복용 기록.",
    tag: "생활·습관",
    icon: "assets/icons/pill-check.png",
    emoji: "💊",
    colors: ["#3182f6", "#22d3ee"],
  },
];
