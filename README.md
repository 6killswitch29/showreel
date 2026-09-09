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
pnpm dev                  # http://localhost:3000
pnpm build
pnpm lint
pnpm exec tsc --noEmit    # 타입 검사 (lint에 포함되지 않음)
```

테스트 프레임워크는 없다. 위 세 가지가 검증 수단이다.

스크롤 애니메이션을 확인할 때는 프로덕션 빌드로 본다. `pnpm dev`에서 파일을 고치면 Fast Refresh가
진입 애니메이션 상태를 어중간하게 남겨 요소가 안 보이는 것처럼 나온다.

```bash
pnpm build && PORT=3001 pnpm start
```

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/data/resume.types.ts` | 이력 데이터 스키마 |
| `src/data/resume.ts` | **이력 내용 (단일 소스)** |
| `src/app/` | 라우트, 레이아웃, 전역 스타일 |
| `src/components/sections/` | Hero / About / Career / Skills / Contact |
| `src/components/layout/` | 상단 네비게이션, 섹션 목록(`sections.ts`) |
| `src/components/motion/` | Reveal · Stagger · Counter · ScrollProgress · ScrollCue |
| `src/components/ui/` | Section · Tag · ContactLinks |
| `src/lib/` | 기간 포맷터, Lenis · motion Provider |

이력 내용은 `src/data/resume.ts` 한 곳에서만 수정한다. 컴포넌트는 데이터를 렌더링만 한다.

섹션의 번호·제목·네비게이션 항목은 `src/components/layout/sections.ts`에서 모두 나온다.
섹션을 추가하거나 순서를 바꾸려면 이 배열만 고친다.

애니메이션 지속시간 · 이징 · 스크롤 진입 기준값은 `src/components/motion/config.ts`에 모여 있다.

구현 시 지켜야 할 제약(reduced-motion 처리, Lenis 앵커 오프셋 등)은 [`CLAUDE.md`](./CLAUDE.md) 참고.

## 배포

Vercel 권장. 정적 호스팅이 필요하면 `next.config.ts`에 `output: "export"`를 켠다.

## 관련 프로젝트

- [`../devlog`](../devlog) — 개발일지 블로그
- [`../cofounder`](../cofounder) — 1인 창업자를 위한 AI 코파운더 서비스
