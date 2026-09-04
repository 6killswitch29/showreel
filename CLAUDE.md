# showreel — 애니메이션 포트폴리오 사이트

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

## 자주 쓰는 명령

```bash
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## 계획된 구조 (아직 대부분 미구현)

```
src/
├── app/
│   ├── layout.tsx            # 폰트, 메타데이터, LenisProvider
│   ├── page.tsx              # 섹션들을 순서대로 조립
│   └── resume/page.tsx       # 인쇄/PDF용 무장식 이력서 (나중)
├── data/
│   └── resume.ts             # ★ 단일 데이터 소스: profile, experiences, projects, skills, education
├── components/
│   ├── sections/             # Hero, About(자기소개), Career(경력기술서), Projects, Skills, Contact
│   ├── motion/               # Reveal, Stagger, ScrollProgress, Counter 등 재사용 애니메이션 프리미티브
│   └── ui/                   # Button, Tag, SectionTitle 등
└── lib/
    └── lenis.tsx             # "use client" LenisProvider
```

핵심 원칙: **내용(`src/data/resume.ts`)과 표현(components)을 분리한다.** 이력 내용을 바꿀 때 컴포넌트를 건드리지 않아야 한다.

## 애니메이션 규칙

- 애니메이션 컴포넌트는 `"use client"`로 분리하고, 섹션 자체는 서버 컴포넌트로 유지한다.
- `useReducedMotion()`을 존중한다. reduced-motion이면 페이드만 남기거나 즉시 표시한다.
- 스크롤 진입 애니메이션은 `whileInView` + `viewport={{ once: true, margin: "-10%" }}` 기본값.
- 지속시간: 일반 0.4–0.6s, 히어로만 최대 1.2s. easing은 `[0.22, 1, 0.36, 1]` 계열 통일.
- 스크롤 연동(패럴랙스, 진행바)은 `useScroll` + `useTransform`. GSAP은 정말 필요할 때만 추가.
- 레이아웃 시프트 금지: 애니메이션 전 요소의 공간을 미리 확보한다 (`opacity`/`transform`만 애니메이션).
- Lighthouse 성능 90+ 유지. 큰 이미지는 `next/image`.

## 콘텐츠 규칙

- 기본 언어 한국어. 영문 토글은 나중에 (`data/resume.ts`에 `ko`/`en` 필드로 확장 가능하게 설계).
- 경력기술서는 "상황 → 행동 → 결과(수치)" 형식으로 작성한다.
- 개인정보(전화번호, 상세 주소)는 사이트에 올리지 않는다. 연락은 이메일/링크만.

## 할 일 / 결정 필요

- [ ] `src/app/layout.tsx` 메타데이터(title, description, OG 이미지) 실제 값으로 교체.
- [ ] `src/data/resume.ts` 타입 설계 후 실제 이력 채우기.
- [ ] 폰트: Geist 유지 vs Pretendard(한글) — 한글 본문이 대부분이므로 Pretendard 권장.
- [ ] 배포: Vercel(권장, 기본 SSR 유지) vs `output: "export"` 정적 호스팅.
- [ ] PDF 이력서 다운로드 (`/resume` 인쇄 스타일 → 브라우저 인쇄 또는 빌드 시 생성).

## 하지 말 것

- 블로그 기능을 여기에 넣지 않는다 (`../devlog`의 역할). 포트폴리오에서 블로그 글로 링크만 건다.
- `AGENTS.md`의 nextjs-agent-rules 블록은 `next dev`가 관리한다. 직접 수정하지 않는다.
