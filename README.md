# showreel

이력서 · 자기소개서 · 경력기술서를 스크롤 애니메이션으로 보여주는 포트폴리오 사이트. 이름은 애니메이터가 작업물을 모아 보여주는 "쇼릴(showreel)"에서 왔다.

## 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · motion · lenis

## 요구 사항

- Node 22 (nvm: `nvm use 22`)
- pnpm

## 시작하기

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/app/` | 라우트, 레이아웃, 전역 스타일 |
| `src/data/resume.ts` | 이력 데이터 (단일 소스) — 예정 |
| `src/components/sections/` | Hero / About / Career / Projects / Skills / Contact — 예정 |
| `src/components/motion/` | 재사용 애니메이션 프리미티브 — 예정 |

이력 내용은 `src/data/resume.ts` 한 곳에서만 수정한다. 컴포넌트는 데이터를 렌더링만 한다.

## 배포

Vercel 권장. 정적 호스팅이 필요하면 `next.config.ts`에 `output: "export"`를 켠다.

## 관련 프로젝트

- [`../devlog`](../devlog) — 개발일지 블로그
- [`../cofounder`](../cofounder) — 1인 창업자를 위한 AI 코파운더 서비스
