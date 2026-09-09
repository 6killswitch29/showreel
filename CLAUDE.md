# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 프로젝트 목적

김용현의 이력서(Resume), 자기소개서(About), 경력기술서(Career)를 한 페이지 스크롤 경험으로 보여주는
포트폴리오 사이트. 채용 담당자가 60초 안에 "누구고, 뭘 했고, 뭘 잘하는지"를 파악하게 만드는 것이 목표다.
애니메이션은 내용을 돋보이게 하는 수단이지 목적이 아니다.

## 스택

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` 방식 — v3식 `tailwind.config.js` 없음)
- 애니메이션: `motion` 13 (구 framer-motion; `import { motion } from "motion/react"`)
- 스무스 스크롤: `lenis`
- 패키지 매니저: pnpm, Node 22

## 환경 주의사항 (중요)

`/usr/local/bin/node`는 Node 20이다. 명령 실행 전에 Node 22를 PATH 앞에 둔다:

```bash
export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"
```

Next.js 16은 학습 데이터와 다른 부분이 많다. 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 읽는다 (AGENTS.md 참고).

`motion` 13도 마찬가지다. `motion/react`는 `framer-motion`을 재수출하는 얇은 래퍼일 뿐이라
실제 구현과 타입은 `node_modules/.pnpm/framer-motion@*/…/dist/framer-motion.dev.js`(비압축)와
`dist/index.d.ts`에 있다. 훅 동작이 의심되면 여기를 읽는다.

## 자주 쓰는 명령

```bash
pnpm dev                  # http://localhost:3000
pnpm build
pnpm lint
pnpm exec tsc --noEmit    # 타입 검사 (lint에 포함되지 않음)

PORT=3001 pnpm start      # 빌드 후 프로덕션 확인
```

**테스트 프레임워크는 없다.** 검증 수단은 `tsc --noEmit` + `pnpm lint` + `pnpm build`,
그리고 실제로 띄워서 보는 것이다.

**스크롤 애니메이션은 반드시 프로덕션 빌드에서 확인한다.** `pnpm dev`에서 데이터/컴포넌트를 고치면
Fast Refresh가 motion의 `whileInView` 상태를 어중간하게 남겨서, 일부 요소가 `opacity: 0`으로
멈춘 것처럼 보인다. 실제 버그가 아니다. 의심되면 `pnpm build && PORT=3001 pnpm start`로 확인한다.

## 구조

```
src/
├── app/                    layout.tsx(폰트·메타데이터·Provider), page.tsx(섹션 조립), globals.css
├── data/
│   ├── resume.types.ts     ★ 스키마만
│   └── resume.ts           ★ 이력 내용만 — 단일 데이터 소스
├── components/
│   ├── layout/             Nav, sections.ts
│   ├── motion/             Reveal · Stagger · Counter · ScrollProgress · ScrollCue · config
│   ├── sections/           Hero · About · Career · Skills · Contact
│   └── ui/                 Section(제목 포함) · Tag · ContactLinks
└── lib/                    format.ts · lenis.tsx · motion-provider.tsx
```

핵심 원칙: **내용(`src/data/resume.ts`)과 표현(components)을 분리한다.** 이력 내용을 바꿀 때 컴포넌트를 건드리지 않아야 한다.

### 알아둘 것

- **`src/components/layout/sections.ts`가 섹션의 단일 출처다.** 네비게이션 항목과 각 섹션의
  번호·제목이 모두 여기서 나온다. `<Section id="career">`만 쓰면 `02 경력`이 자동으로 붙는다.
  섹션을 추가·삭제·재정렬하려면 이 배열만 고친다.
- **`Experience.achievements`는 날짜순이 아니라 중요도순이다.** 날짜순으로 두면 2024년에 시작해
  지금도 운영 중인 주력 제품이 아래로 밀린다. `experiences`·`education`은 최신순.
- **`formatDuration()`은 서버 컴포넌트 전용이다.** 진행 중인 기간을 `new Date()` 기준으로 계산해서,
  클라이언트에서 부르면 달이 바뀔 때 하이드레이션이 어긋난다. 타입으로는 막히지 않는다.
- **`Counter`는 SSR에서 최종값을 렌더링한다.** 자바스크립트 없이도 숫자가 보이고 크롤러도 실제 값을
  읽는다. 애니메이션은 마운트 후에 덧입힌다.
- 섹션 컴포넌트는 서버 컴포넌트다. `"use client"`는 `motion/`, `Nav`, `lib/`의 Provider에만 있다.

## 애니메이션 규칙

- 스크롤 진입은 `whileInView` + `viewport={{ once: true, margin: "-10%" }}`.
  값은 `components/motion/config.ts`의 `VIEWPORT`에 있다. 여기 값만 바꾸면 사이트 전체가 바뀐다.
- 지속시간·이징도 같은 파일(`DURATION`, `EASE = [0.22, 1, 0.36, 1]`). 컴포넌트에 숫자를 직접 쓰지 않는다.
- 레이아웃 시프트 금지: `opacity`/`transform`만 애니메이션한다.
- Lighthouse 성능 90+ 유지. 큰 이미지는 `next/image`.

### reduced-motion (실수하기 쉬움)

**컴포넌트 렌더 출력에서 `useReducedMotion()`으로 분기하지 않는다.**
이 훅은 서버에서 `null`, 클라이언트에서는 **첫 렌더부터** 실제 값을 준다
(렌더 중 동기로 `matchMedia`를 읽고 이후 갱신하지 않는다). 그래서 그 값이 `initial`처럼
인라인 스타일로 나가는 곳에 쓰이면, reduced-motion 사용자에게만 서버 HTML과 클라이언트가 어긋난다.
실제로 이 실수로 30곳에서 하이드레이션이 깨진 적이 있다.

대신 `src/lib/motion-provider.tsx`의 `<MotionConfig reducedMotion="user">`가 처리한다.
transform 계열의 트랜지션만 꺼서 즉시 도달시키고 opacity는 그대로 애니메이션한다.

훅을 직접 써야 하는 경우는 `MotionConfig`가 닿지 않는 곳뿐이고, **렌더 출력이 아니라 effect나
트랜지션에서만** 쓴다. 현재 세 군데다 — `Counter`(명령형 `animate()`), `lenis.tsx`(Lenis 자체를 끔),
`ScrollCue`(무한 반복은 `MotionConfig`가 못 다룸 — `initial`은 고정하고 `animate`만 분기).

### 앵커 이동

`lib/lenis.tsx`의 `anchors: { offset: -NAV_OFFSET }`을 끄면 안 된다. Lenis는 자기 목표 위치를
따로 들고 있어서, `anchors`가 꺼져 있으면 앵커 이동이나 `scrollIntoView()`가 먹은 직후
원래 자리로 되돌려 버린다. 또 Lenis가 이동을 가로채면 CSS `scroll-margin-top`을 보지 않으므로
`offset`으로 고정 네비 높이만큼 비켜줘야 한다.
`NAV_OFFSET`(80)과 `globals.css`의 `:target { scroll-margin-top }`은 **같은 값으로 유지한다.**

## 콘텐츠 규칙

- 기본 언어 한국어. 영문 토글은 나중에. 필드마다 `{ko, en}`을 다는 대신 `resume.en.ts`가
  같은 `Resume`를 하나 더 export 하고 로케일 단위로 통째로 교체하는 방식으로 설계돼 있다.
- 경력기술서는 "상황 → 행동 → 결과(수치)" 형식으로 작성한다. `Achievement` 타입이 이를 강제한다.
- 문체를 나눈다: 경력기술서는 `~했다`, 자기소개(About)는 읽는 사람에게 말하는 `~습니다`.
- **개인정보(전화번호, 상세 주소)는 사이트에 올리지 않는다.** 이력서 원본에 있어도 `resume.ts`에
  넣지 않는다. 연락은 이메일/링크만. PDF에만 필요하면 나중에 `/resume` 라우트에서 따로 처리한다.
- 수치를 지어내지 않는다. 측정 기록이 없으면 정성 문장으로 두고, 채울 수 없다고 판단되면
  `TODO`를 남기지 말고 지우되 왜 뺐는지 주석으로 남긴다.

## 할 일 / 결정 필요

- [ ] 폰트: Geist 유지 vs Pretendard — 본문이 한글이라 지금은 시스템 폰트로 폴백된다(`globals.css`).
- [ ] 배포: Vercel(권장, 기본 SSR 유지) vs `output: "export"` 정적 호스팅.
- [ ] OG 이미지 (`src/app/opengraph-image.tsx` + `ImageResponse`). 도메인 정해지면 `metadataBase`도 필요.
- [ ] 경력 섹션이 길다 — `Achievement.featured` 3개만 펼치고 나머지는 접는 안.
- [ ] PDF 이력서 다운로드 (`/resume` 인쇄 스타일).
- [ ] `resume.ts`에 남은 `TODO`: 블로그 URL, 리포트 서버 월 발행 건수, `Skill.level`.

## 하지 말 것

- 블로그 기능을 여기에 넣지 않는다 (`../devlog`의 역할). 포트폴리오에서 블로그 글로 링크만 건다.
- `AGENTS.md`의 nextjs-agent-rules 블록은 `next dev`가 관리한다. 직접 수정하지 않는다.
