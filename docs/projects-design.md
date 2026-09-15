# 프로젝트 카테고리 · 상세 페이지 설계

> 상태: 제안(구현 전). 결정이 필요한 항목은 마지막 절에 모아 뒀다.
> 대상 버전: Next.js 16.3.4 / React 19.2 / motion 13.2 / lenis 1.3.26

## 1. 목표

지금 사이트는 한 페이지 스크롤로 "누구고, 뭘 했고, 뭘 잘하는지"를 60초에 전달한다.
글로는 전달되지 않는 것이 하나 남는다 — **만든 것의 생김새**다.
관리 콘솔 화면, 권한 모델 다이어그램, 확장 프로그램 UI는 문장 세 줄보다 스크린샷 한 장이 빠르다.

그래서 추가하는 것:

- 프로젝트를 **카테고리**로 묶어 홈에 한 섹션으로 보여준다.
- 프로젝트마다 **개별 페이지**(`/projects/<slug>`)를 만들어 이미지 · 구조 · 긴 설명을 둔다.

안 하는 것:

- 블로그 기능 (`../devlog`의 역할).
- 내용이 없는 프로젝트의 빈 상세 페이지. 채울 게 없으면 목록에도 올리지 않는다.
- 카테고리별 인덱스 라우트 (1단계에서는 안 만든다 — 5절, 15절 참고).

## 2. 가장 중요한 결정: Career와 Projects의 역할을 나눈다

현재 `resume.ts`의 성과 6개(`mssp-platform`, `ai-export-dlp`, `dlp-mcp-server`,
`approval-workflow`, `mssp-report-server`, `gws-security-agent`)는 이미 경력 섹션에서
"상황 → 행동 → 결과(수치)"로 다 설명된다. 여기에 프로젝트 섹션을 그냥 얹으면
**같은 일을 두 번 쓰게 되고**, 페이지만 두 배로 길어진다. 60초 목표에 정면으로 어긋난다.

역할을 이렇게 가른다.

| | 경력 (Career) | 프로젝트 (Projects) |
|---|---|---|
| 단위 | 회사 안에서의 **성과** | 하나의 **산출물** |
| 주인공 | 문장과 수치 | 화면과 구조 |
| 내용 | 상황 · 행동 · 결과 | 무엇을 만들었나, 어떻게 생겼나, 왜 그렇게 설계했나 |
| 위치 | 홈 섹션 (본문) | 홈 섹션은 카드만, 본문은 개별 페이지 |
| 문체 | `~했다` | `~했다` (경력기술서와 같은 계열) |

같은 대상을 가리킬 때는 `Project.relatedAchievementId`로 연결하고 **본문을 복사하지 않는다.**
경력 카드는 결과와 수치를, 프로젝트 페이지는 화면과 설계 판단을 맡는다.
독자는 경력에서 "이 사람이 뭘 해냈나"를, 프로젝트에서 "그게 실제로 뭐였나"를 읽는다.

따라서 프로젝트 목록은 경력의 6개를 그대로 옮긴 것이 **아니다.**
- 보여줄 화면/다이어그램이 있는 것만 프로젝트로 승격한다.
- 회사 밖 작업(이 포트폴리오 사이트, 개발일지, 챌린지 출품작)은 경력에 없으므로 프로젝트에만 있다.

## 3. 카테고리 설계

카테고리는 **주제(domain)**다. 기존 `ProjectKind`(`work` / `side` / `oss`)는 **성격**이고 둘은 다른 질문에 답한다.
둘을 하나로 합치지 않는다 — 카테고리는 목록을 나누는 축, `kind`는 카드에 붙는 배지다.

초기 4개:

| id | label | 들어갈 것 |
|---|---|---|
| `platform` | 보안 운영 플랫폼 | 멀티테넌트 MSSP 플랫폼, 승인 워크플로 |
| `ai` | AI · 에이전트 | DLP MCP 서버, GWS 보안 에이전트 |
| `automation` | 자동화 · 운영 | 월간 보안 리포트 서버 |
| `personal` | 개인 작업 | 이 포트폴리오, 개발일지 |

규칙 두 개:

- **한 카테고리에 프로젝트가 1개뿐이면 카테고리를 합친다.** 항목 하나짜리 그룹이 늘어서면
  분류가 아니라 목차 장식이 된다. 위 표도 실제 내용이 채워지면 3개로 줄 수 있다.
- 카테고리 배열의 **순서가 화면 순서**다. `sections.ts`와 같은 원칙 — 정렬은 데이터가 정하고
  컴포넌트는 받은 순서대로 그린다.

## 4. URL 설계

```
/                         홈 — 프로젝트 섹션(카드 목록)이 유일한 인덱스
/projects/<slug>          프로젝트 상세
/projects                 → /#projects 로 리다이렉트 (직접 입력한 사람 구제)
/projects/category/<id>   (2단계, 필요해지면)
```

**`/projects/<slug>` 평면 구조를 쓴다.** `/projects/<category>/<slug>`도 가능하지만,
이력서 URL은 지원서에 붙여 보내는 물건이라 **안 깨지는 게 계층보다 중요하다.**
카테고리를 옮기면 URL이 죽는다.

카테고리 인덱스가 나중에 필요해지면 `/projects/category/<id>`에 둔다.
정적 세그먼트가 동적 세그먼트보다 우선하므로 `[slug]`와 충돌하지 않는다.
대신 **`category`는 예약어**가 되므로 `lib/projects.ts`의 무결성 검사에서 막는다(7절).

slug는 `Project.id`를 그대로 쓴다. id를 두 개(내부 키 + URL) 두면 어긋날 자리만 늘어난다.
대신 타입 주석에 "kebab-case ASCII, URL에 그대로 나간다"를 명시한다.

## 5. 왜 `/projects` 인덱스 페이지를 따로 안 만드나

프로젝트가 10개 미만인 동안, 홈의 프로젝트 섹션과 `/projects` 인덱스는 같은 내용이다.
중복 페이지는 검색에서 서로를 갉아먹고, 유지할 화면만 둘이 된다.
사이트의 정체성도 "한 페이지 스크롤"이다(CLAUDE.md).

그래서 1단계에서는:

- 홈 섹션이 **유일한 목록**이다.
- 상세 페이지의 "뒤로"는 `/#projects`로 돌아간다.
- `/projects`는 `redirect("/#projects")` 한 줄짜리 페이지로 404만 막는다.

프로젝트가 10개를 넘거나 카테고리별로 훑고 싶어지면 그때 진짜 인덱스를 만든다(15절 결정 항목).

## 6. 데이터 모델

### 6.1 `resume.types.ts` 변경

```ts
/** 본문에 들어가는 그림. 캡션이 붙는다는 점에서 `Media`(아바타·커버)와 다르다. */
export interface Figure {
  /**
   * `src/content/projects/` 아래의 상대 경로. 예: `"mcp-server/console.png"`
   * width/height/blurDataURL은 빌드 때 정적 import로 자동 계산한다(10절).
   * 손으로 적지 않는다 — 틀리면 그게 곧 레이아웃 시프트다.
   */
  file: string;
  alt: string;
  /** 그림 아래 한 줄. 무엇을 보고 있는지 모를 만한 화면이면 꼭 채운다. */
  caption?: string;
}

/** 주제별 분류. 성격 분류인 `ProjectKind`와 다른 축이다. */
export type ProjectCategoryId = "platform" | "ai" | "automation" | "personal";

export interface ProjectCategory {
  id: ProjectCategoryId;
  /** 예: "보안 운영 플랫폼" */
  label: string;
  /** 이 묶음이 뭔지 한 줄. 그룹 머리에 작게 들어간다. */
  note?: string;
}

export interface Project {
  /** URL slug로 그대로 쓴다. kebab-case ASCII. 한번 공개하면 바꾸지 않는다. */
  id: string;
  name: string;
  /** 한 줄 설명. 카드와 상세 머리에 함께 쓴다. */
  tagline: string;
  categoryId: ProjectCategoryId;
  kind: ProjectKind;
  period?: Period;
  /** 기여 범위. 예: "단독", "설계 · 구현 담당" */
  contribution?: string;

  /** 개요 문단. 카드에는 안 쓰고 상세 상단에만 쓴다. */
  overview: string[];
  /** 왜 만들었나 — 문제/제약. */
  problem?: string;
  /** 어떻게 풀었나. 항목당 한 문장. */
  approach?: string[];
  /** 무엇이 달라졌나. */
  results?: string[];
  /** 기술적으로 내세울 점. `approach`보다 짧고 목록형. */
  highlights?: string[];
  metrics?: Metric[];

  stack: string[];
  links?: Link[];
  /** 카드와 상세 맨 위에 쓰는 대표 이미지. 16:9 권장. */
  cover?: Figure;
  /** 본문 사이사이의 그림. 순서대로 나온다. */
  gallery?: Figure[];

  /**
   * 같은 일을 다룬 경력 성과의 id. 상세 페이지 → 경력 섹션 링크에 쓴다.
   * 역방향(경력 → 프로젝트) 링크는 `lib/projects.ts`에서 이 필드로 역인덱스를 만든다.
   * 타입으로 검증되지 않으니 id를 바꾸면 여기도 같이 고친다.
   */
  relatedAchievementId?: string;
  /** 홈 섹션에서 크게 보여줄 것. */
  featured?: boolean;
}

export interface Resume {
  // ...기존 필드
  /** 표시 순서대로. */
  projectCategories: ProjectCategory[];
  projects: Project[];
}
```

기존 `Project`에서 바뀌는 것: `description` → `overview`, `role` → `contribution`
(경력의 `Achievement.contribution`과 이름을 맞춘다), `cover: Media` → `cover: Figure`.
`projects`가 아직 빈 배열이라 호환 부담이 없다. **지금이 스키마를 고칠 마지막 타이밍이다.**

### 6.2 왜 MDX나 블록 배열이 아닌가

긴 설명을 담는 방법은 세 가지가 있었다.

1. **MDX** — 의존성이 늘고, "내용은 `resume.ts` 한 곳"이라는 원칙이 깨진다. 기각.
2. **블록 배열** (`{kind:"text"} | {kind:"figure"} | ...`) — 자유롭지만 사실상 미니 CMS다.
   렌더러가 switch 덩어리가 되고, 타입이 내용을 강제하지 못한다. 기각.
3. **고정 슬롯** (`overview` / `problem` / `approach` / `results` / `gallery`) — 채택.
   `Achievement`가 이미 "상황 → 행동 → 결과"를 타입으로 강제하는 것과 같은 방식이다.
   빈칸이 보이면 뭘 안 썼는지 드러난다. 자유도가 낮은 게 이 사이트에서는 장점이다.

이미지가 문단 사이에 정확히 끼어야 하는 경우는 `gallery`를 본문 뒤에 한 줄로 두고,
그래도 부족하면 그때 블록 배열을 고민한다. 지금 필요하지 않다.

## 7. `src/lib/projects.ts` — 조회와 무결성 검사

이 저장소에는 테스트 프레임워크가 없다. 검증은 `tsc` · `lint` · `build`뿐이다.
그래서 **타입으로 못 막는 규칙은 빌드가 깨지게 만든다.** 이 모듈이 그 자리다.

```ts
// 조회
getProject(slug: string): Project | undefined
projectsByCategory(): { category: ProjectCategory; projects: Project[] }[]  // 카테고리 순서대로, 빈 그룹 제외
projectSlugs(): string[]                      // generateStaticParams용
neighbors(slug): { prev?: Project; next?: Project }   // 같은 카테고리 안에서 이전/다음
projectForAchievement(achievementId): Project | undefined  // 역인덱스
```

모듈 최상단에서 한 번 검사하고, 어기면 `throw`한다. 서버 컴포넌트가 import 하므로
`next build`가 그 자리에서 실패한다.

- slug 중복
- slug 형식 (`/^[a-z0-9]+(-[a-z0-9]+)*$/`)
- 예약 slug (`category`, `index`) 사용
- `projectCategories`에 없는 `categoryId`
  (그냥 두면 그 프로젝트가 목록에서 **조용히 사라진다** — 가장 잡기 어려운 버그다)
- `relatedAchievementId`가 실제 `Achievement.id`에 있는지

## 8. 화면 설계

### 8.1 홈 — 프로젝트 섹션

`sections.ts`에 `{ id: "projects", label: "프로젝트" }`를 **경력 다음**에 넣는다.
번호는 자동으로 다시 매겨진다: `01 소개 / 02 경력 / 03 프로젝트 / 04 기술 / 05 그 밖에`.
네비게이션 항목도 같이 따라온다. 고칠 파일은 이 배열 하나다.

```
03  프로젝트
─────────────────────────────────────────
보안 운영 플랫폼                    2개      ← 카테고리 머리 (label + 개수)
┌───────────────────────┐ ┌───────────────────────┐
│ [커버 16:9]           │ │ [커버 16:9]           │
│ MSSP 플랫폼      work │ │ 승인 워크플로    work │   ← kind 배지
│ 30개 도메인이 쓰는…   │ │ 테넌트 간 조회 경로…  │   ← tagline
│ Spring · MySQL · GCP  │ │ Spring · React        │   ← stack 3개까지
└───────────────────────┘ └───────────────────────┘
AI · 에이전트                       2개
...
```

- 카드 격자: 모바일 1열, `sm` 이상 2열. 커버가 없으면 이름과 tagline만 있는 납작한 카드.
- 카드 전체가 `<Link href={"/projects/" + id}>`. 카드 안에 또 링크를 넣지 않는다(중첩 `<a>` 금지).
- 커버는 `aspect-[16/9]` 컨테이너에 넣어 **로딩 전에도 자리를 잡는다.** 레이아웃 시프트 금지 규칙.
- 진입 애니메이션은 카테고리 그룹 단위로 `Stagger` + `StaggerItem`. 새 모션 컴포넌트는 만들지 않는다.

### 8.2 상세 페이지

```
← 프로젝트                                    ← 상단 바 (sticky, 얇게)
─────────────────────────────────────────
AI · 에이전트 · 2025.03 – 현재 · 단독          ← mono, 작게
DLP MCP 서버                                  ← h1
OAuth 2.1로 …                                 ← tagline
[Spring Boot] [OAuth 2.1] [MCP]               ← Tag 재사용
데모 ↗   리포지터리 ↗                          ← ContactLinks와 같은 계열

[ 커버 이미지 16:9, priority ]

개요
문단 …

  −75%        30+                             ← Counter 재사용
  빌드 시간   고객 도메인

문제    …
접근    — …
        — …
결과    — …

[ 갤러리: 그림 + 캡션 ]

이 작업의 성과는 경력 02에서 →                ← relatedAchievementId 있을 때만
─────────────────────────────────────────
← 이전: GWS 보안 에이전트     다음: … →        ← 같은 카테고리 안에서
```

**재사용을 위한 리팩터링 하나.** `Career.tsx` 안의 `Metrics`와 `LabelledList`는
지금 파일 로컬 컴포넌트인데, 상세 페이지가 똑같은 걸 필요로 한다.
`src/components/ui/`로 올리고 `Career.tsx`는 import 하게 바꾼다.
(복사하지 않는다 — 수치 표기 규칙이 두 군데로 갈라지면 반드시 어긋난다.)

### 8.3 네비게이션: 상세 페이지는 `Nav`를 쓰지 않는다

`Nav`는 한 페이지 구성을 전제로 만들어졌다. `IntersectionObserver`로 `SECTIONS`의 id를
관찰하고, `#about` 같은 같은-문서 앵커를 건다. 상세 페이지에는 그 섹션들이 없으므로
**관찰 대상이 0개가 되고 링크는 전부 죽는다.**

그래서 `src/app/projects/layout.tsx`에 **별도의 얇은 상단 바**를 둔다.
`← 프로젝트`(`/#projects`)와 이름(`/`) 두 개면 충분하다. `Nav`를 라우트 인식형으로
일반화하는 것보다 코드가 적고, 각자 하는 일이 분명해진다.

`ScrollProgress`는 window 스크롤 기반이라 그대로 재사용할 수 있다.

## 9. 라우팅 · 메타데이터 (Next 16)

```
src/app/projects/
├── layout.tsx                상단 바 + 푸터 셸
├── page.tsx                  redirect("/#projects")
├── not-found.tsx             없는 프로젝트
└── [slug]/
    ├── page.tsx
    └── opengraph-image.tsx   (3단계)
```

```tsx
// src/app/projects/[slug]/page.tsx
export const dynamicParams = false;          // 목록에 없는 slug는 404

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} | ${resume.profile.name}`,
    description: project.tagline,
    openGraph: { title: project.name, description: project.tagline, type: "article" },
  };
}

export default async function Page(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;          // Next 16에서 params는 Promise다
  const project = getProject(slug);
  if (!project) notFound();
  // ...
}
```

메모:

- `PageProps<"/projects/[slug]">`는 전역 헬퍼다. import 하지 않는다.
  `next dev` / `next build` / `next typegen`이 생성한다. 루트 레이아웃이 이미 `LayoutProps<"/">`를 쓰고 있다.
- **`params`는 Promise**다. `await` 없이 구조 분해하면 안 된다.
- `dynamicParams = false` + `generateStaticParams`면 전부 빌드 타임 정적 생성이다.
  그래서 **`loading.tsx`가 필요 없다.** (동적 라우트에 `loading.tsx`를 권하는 문서는
  요청 시점에 렌더되는 경우 얘기다.)
- `notFound()`는 렌더 경로에서 호출해야 한다. await 하지 않는 promise 안에서 부르면 아무 일도 안 일어난다.
- OG 이미지에 절대 URL이 필요하므로 `metadataBase`가 선행 조건이다.
  이미 CLAUDE.md의 미결 항목인데, 프로젝트 페이지가 생기면 미루기 어려워진다.

## 10. 이미지 파이프라인

이미지는 `src/content/projects/<slug>/*.png`에 둔다 (`public/`이 아니다).

```tsx
// src/components/ui/ProjectFigure.tsx  — 서버 컴포넌트
export async function ProjectFigure({ figure, priority }: { figure: Figure; priority?: boolean }) {
  const { default: img } = await import(`@/content/projects/${figure.file}`);
  return (
    <figure>
      <Image src={img} alt={figure.alt} placeholder="blur" priority={priority}
             sizes="(min-width: 768px) 48rem, 100vw" className="rounded-lg" />
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}
```

`public/` + 손으로 적은 width/height 대신 **정적 import**를 쓰는 이유:

- width / height / `blurDataURL`을 Next가 계산한다. 손으로 적은 숫자가 틀리면
  그게 곧 레이아웃 시프트고, 이 저장소가 명시적으로 금지한 것이다.
- 블러 플레이스홀더가 공짜로 따라온다.

주의: 동적 `import()`의 경로는 **정적 접두사**(`@/content/projects/`)를 포함해야 하고,
그 접두사 아래 파일이 **전부 번들에 들어간다.** 그래서 그 디렉터리에는 실제로 쓰는 이미지만 둔다.
(원본 PSD나 크롭 전 스크린샷을 같이 두지 않는다.)

용량 기준: 커버 1600×900 이하, 갤러리 장당 300KB 이하. Lighthouse 90+ 유지.

### 스크린샷 검토 체크리스트 (건너뛰지 않는다)

보안 제품 화면이다. 공개 전에 매번 확인한다.

- 고객사 도메인 · 이메일 주소 · 사용자 이름
- 토큰, 키, 세션 ID, 내부 호스트명
- 실제 위반 로그 / 탐지 내역
- 내부 이슈 번호, 사내 URL

가릴 게 많으면 스크린샷 대신 **구조 다이어그램**을 그린다. 대개 그쪽이 더 잘 읽힌다.

## 11. 스크롤 · 모션에서 깨질 곳

한 페이지에서 여러 페이지로 넘어가면서 새로 생기는 문제들이다. 미리 막는다.

### 11.1 Lenis 관성이 라우트 이동을 되돌린다 ★

이게 제일 크다. Lenis는 자기 목표 위치(`targetScroll`)를 따로 들고 있고,
네이티브 스크롤 이벤트를 `isScrolling`이 `false`거나 `"native"`일 때만 동기화한다.
**부드러운 스크롤이 도는 중에** 프로젝트 카드를 클릭하면, Next가 새 페이지를 맨 위로 올려도
Lenis가 예전 위치로 다시 끌어내린다.

lenis 1.3.26에 이걸 위한 옵션이 있다:

```ts
// src/lib/lenis.tsx
options={{
  lerp: 0.1,
  smoothWheel: true,
  anchors: { offset: -NAV_OFFSET },
  stopInertiaOnNavigate: true,   // ← 추가
}}
```

내부 링크 중 **pathname이 다른** 링크를 클릭하면 Lenis가 `reset()`해서 관성을 버린다.
`<Link>`도 결국 `<a>`를 렌더하므로 그대로 걸린다.
뒤로가기(popstate)는 이 경로를 타지 않지만, 그때는 Lenis가 idle이라 네이티브 동기화가 처리한다.

`anchors`는 **끄지 않는다.** 같은 pathname일 때만 동작하도록 이미 구현돼 있어서
(`currentUrl.pathname === targetUrl.pathname`) 라우트 이동을 가로채지 않는다.

### 11.2 `/#projects`로 돌아올 때 고정 바가 제목을 덮는다

지금 `globals.css`에는 `:target { scroll-margin-top: 5rem }`만 있다.
다른 라우트에서 해시로 들어오는 경우까지 확실히 덮으려면 같은 값으로 하나 더 둔다.

```css
html { scroll-padding-top: 5rem; }   /* NAV_OFFSET(80) 과 같은 값 */
```

`NAV_OFFSET`(lenis.tsx) · `:target` · `scroll-padding-top` 세 값은 **항상 같이 움직인다.**
CLAUDE.md의 "같은 값으로 유지한다" 규칙에 세 번째 항목이 추가되는 셈이다.

### 11.3 서버 컴포넌트를 유지한다

- 상세 페이지 · 카드 · `ProjectFigure`는 전부 서버 컴포넌트다.
  `"use client"`는 지금처럼 `motion/`, `Nav`, `lib/`의 Provider에만 둔다.
- `formatDuration()`은 서버 전용이다. 카드가 기간을 보여준다면 그 카드는 클라이언트가 되면 안 된다.
- `Counter`는 SSR에서 최종값을 렌더한다. 상세 페이지에서도 그대로 쓴다.
- reduced-motion은 `MotionConfig`가 처리한다. 새 컴포넌트에서 `useReducedMotion()`으로
  렌더 출력을 분기하지 않는다.

### 11.4 확인은 프로덕션 빌드에서

`pnpm dev`의 Fast Refresh는 `whileInView` 상태를 어중간하게 남긴다.
카드가 `opacity: 0`으로 멈춰 보이면 먼저 `pnpm build && PORT=3001 pnpm start`로 확인한다.

## 12. 파일 변경 목록

새로 만드는 것:

```
src/lib/projects.ts                        조회 + 무결성 검사
src/components/sections/Projects.tsx       홈 섹션
src/components/ui/ProjectCard.tsx          카드
src/components/ui/ProjectFigure.tsx        이미지 + 캡션
src/components/ui/Metrics.tsx              Career에서 승격
src/components/ui/LabelledList.tsx         Career에서 승격
src/app/projects/layout.tsx                상단 바 셸
src/app/projects/page.tsx                  redirect("/#projects")
src/app/projects/not-found.tsx
src/app/projects/[slug]/page.tsx
src/content/projects/<slug>/*.png          이미지
docs/projects-design.md                    이 문서
```

고치는 것:

```
src/data/resume.types.ts        Figure · ProjectCategory · Project 개정
src/data/resume.ts              projectCategories + projects 내용
src/components/layout/sections.ts   projects 항목 추가 (번호 자동 재계산)
src/app/page.tsx                <Projects /> 배치
src/components/sections/Career.tsx  Metrics·LabelledList를 import로 교체 + 프로젝트 링크
src/lib/lenis.tsx               stopInertiaOnNavigate: true
src/app/globals.css             html { scroll-padding-top }
CLAUDE.md                       구조 · 라우팅 · 이미지 규칙 반영
```

## 13. 구현 단계

**1단계 — 뼈대 (콘텐츠 없이 동작)**
스키마 개정 → `lib/projects.ts` → 카테고리 정의 + 프로젝트 1개(이 포트폴리오 사이트) →
홈 섹션 → 상세 라우트 → lenis/css 수정. 이 단계에서 `pnpm build`가 통과해야 한다.

**2단계 — 콘텐츠**
프로젝트 3~5개를 글로 채우고, 스크린샷·다이어그램을 찍어 마스킹한 뒤 넣는다.
경력 ↔ 프로젝트 교차 링크를 연결한다. 실제로 시간이 드는 건 여기다.

**3단계 — 마감**
프로젝트별 `opengraph-image.tsx`(`metadataBase` 선행), 이전/다음 네비게이션,
필요하면 `/projects/category/<id>`.

## 14. 검증

```bash
export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"
pnpm exec tsc --noEmit
pnpm lint
pnpm build            # lib/projects.ts의 무결성 검사가 여기서 터진다
PORT=3001 pnpm start  # 스크롤 애니메이션과 라우트 이동은 여기서 본다
```

손으로 확인할 것:

- 홈 → 카드 클릭 → 상세가 **맨 위에서** 열린다 (스크롤 도중에 눌러도).
- 상세 → `← 프로젝트` → 홈의 프로젝트 섹션이 고정 바에 안 가리고 나온다.
- 뒤로가기로 돌아왔을 때 스크롤 위치가 복원된다.
- 없는 slug(`/projects/nope`)가 404다.
- reduced-motion을 켜고 두 페이지 다 확인 (하이드레이션 경고 0).
- 이미지가 로드되기 전/후에 자리가 흔들리지 않는다.

## 15. 결정이 필요한 것

- [ ] **카테고리 4개가 맞나.** 실제 채울 프로젝트를 세어 보고 1개짜리 그룹이 생기면 합친다.
- [ ] **`/projects` 인덱스를 지금 만들 것인가.** 이 설계는 "홈 섹션이 유일한 목록"을 택했다.
      카테고리별로 훑는 경험을 원하면 인덱스부터 만드는 쪽으로 뒤집어야 한다.
- [ ] **프로젝트로 승격할 대상.** 경력 6개 전부인지, 보여줄 화면이 있는 것만인지.
      전부라면 경력 카드 본문을 줄여 중복을 없애는 작업이 같이 따라온다.
- [ ] **배포 방식.** `output: "export"`를 택하면 `next/image` 최적화가 빠진다
      (`images.unoptimized` 또는 별도 로더). 이미지가 많아지는 이 변경 이후로는
      Vercel(기본 SSR) 쪽 이점이 커진다. CLAUDE.md의 기존 미결 항목과 묶여 있다.
- [ ] **`metadataBase` / 도메인.** 3단계의 선행 조건.
