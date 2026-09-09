/**
 * 이력 데이터 스키마.
 *
 * 이 파일에는 타입만 둔다. 실제 내용은 `resume.ts` 한 곳에서만 고친다.
 *
 * 다국어: 지금은 한국어만 쓴다. 타입에는 언어 개념이 없고, 영문을 추가할 때는
 * 필드마다 `{ ko, en }`을 다는 대신 `resume.en.ts`가 같은 `Resume`를 하나 더
 * export 하고 로케일 단위로 통째로 교체한다. 스키마 변경 없이 파일만 늘어난다.
 *
 * 정렬: 배열은 직접 정렬해 둔다. 컴포넌트는 받은 순서대로 렌더링만 하고 정렬하지 않는다.
 * - `experiences` · `education` · `certifications`: 최신순
 * - `Experience.achievements`: **중요도순**. 한 회사 안의 프로젝트는 날짜순으로 두면
 *   가장 오래 끌고 온 주력 제품이 아래로 밀린다.
 */

/** "YYYY-MM" 형식. 예: `"2024-03"` */
export type YearMonth = `${number}-${number}`;

export interface Period {
  start: YearMonth;
  /** 생략하면 "현재" — 재직 중이거나 진행 중이라는 뜻. */
  end?: YearMonth;
}

/** 아이콘은 `kind`로 고른다. 데이터는 종류만 말하고 표현은 컴포넌트가 정한다. */
export type LinkKind =
  | "github"
  | "linkedin"
  | "blog"
  | "website"
  | "email"
  | "demo"
  | "repo"
  | "article"
  | "download";

export interface Link {
  kind: LinkKind;
  /** 화면에 보이는 텍스트. 예: "GitHub", "라이브 데모" */
  label: string;
  href: string;
}

/**
 * `next/image`에 그대로 넘길 수 있는 형태.
 * 레이아웃 시프트를 막기 위해 width/height는 필수다.
 */
export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * 숫자로 강조할 성과. Counter 애니메이션(0 → value)의 입력이다.
 *
 * @example
 * { label: "배포 리드타임", prefix: "-", value: 75, unit: "%", note: "40분 → 10분" }
 */
export interface Metric {
  label: string;
  /** Counter의 목표값. */
  value: number;
  /** value 뒤에 붙는 단위. 예: `"%"`, `"배"`, `"ms"`, `"만 명"` */
  unit?: string;
  /** value 앞에 붙는 기호. 예: `"-"`, `"+"`, `"×"` */
  prefix?: string;
  /** 수치의 근거나 맥락 한 줄. 예: `"40분 → 10분"` */
  note?: string;
}

/**
 * 경력기술서의 최소 단위. "상황 → 행동 → 결과(수치)" 한 덩어리.
 *
 * @example
 * {
 *   id: "ci-pipeline",
 *   title: "CI 파이프라인 재구성으로 배포 주기를 주 1회에서 매일로",
 *   situation: "빌드가 40분 걸려 배포가 주 1회로 묶여 있었고, 실패 원인 파악에도 시간이 들었다.",
 *   actions: [
 *     "의존성 설치와 테스트를 캐시 레이어로 분리해 재사용률을 높였다.",
 *     "테스트를 4개 워커로 분할하고 변경 영향 범위만 돌리도록 바꿨다.",
 *   ],
 *   results: ["배포가 매일 가능해지면서 긴급 수정 반영이 당일로 줄었다."],
 *   metrics: [{ label: "빌드 시간", prefix: "-", value: 75, unit: "%", note: "40분 → 10분" }],
 * }
 */
export interface Achievement {
  id: string;
  /** 결과가 드러나는 한 줄 헤드라인. 이것만 읽어도 뭘 했는지 알게 쓴다. */
  title: string;
  /** 기여도. 예: `"단독"`, `"설계 · 구현 담당"`. 팀 작업일 때는 꼭 채운다. */
  contribution?: string;
  /** 대표작. 목록이 길 때 기본으로 펼쳐 보여줄 것만 표시한다. */
  featured?: boolean;
  /** 이 성과의 기간. 재직 기간 안의 구간. */
  period?: Period;
  /** 상황 — 어떤 문제/제약이 있었나. */
  situation: string;
  /** 행동 — 내가 한 일. 항목당 한 문장. */
  actions: string[];
  /** 결과 — 문장으로 쓴 변화. */
  results: string[];
  /** 결과 중 숫자로 강조할 것. `results`와 중복돼도 된다. */
  metrics?: Metric[];
  stack?: string[];
  links?: Link[];
}

export type EmploymentType = "fulltime" | "contract" | "intern" | "freelance";

export interface Experience {
  id: string;
  company: string;
  /** 회사가 뭐 하는 곳인지 한 줄. 인지도가 낮은 회사일 때 채운다. */
  companyNote?: string;
  /** 직함. 예: "프론트엔드 개발자" */
  role: string;
  team?: string;
  period: Period;
  employmentType?: EmploymentType;
  /** 이 회사에서 맡은 범위 한 줄 요약. */
  summary?: string;
  stack?: string[];
  achievements: Achievement[];
}

export type ProjectKind = "work" | "side" | "oss";

export interface Project {
  id: string;
  name: string;
  /** 한 줄 설명. 카드에 들어간다. */
  tagline: string;
  kind: ProjectKind;
  period?: Period;
  /** 팀 프로젝트일 때 내 역할과 기여 범위. */
  role?: string;
  /** 문단 배열. 한 항목이 한 문단. */
  description: string[];
  /** 기술적으로 내세울 점. */
  highlights?: string[];
  metrics?: Metric[];
  stack: string[];
  links?: Link[];
  cover?: Media;
  /** 상단에 크게 보여줄 대표작. */
  featured?: boolean;
}

export interface AboutSection {
  id: string;
  title: string;
  /** 문단 배열. 한 항목이 한 문단. */
  body: string[];
}

/**
 * "일하는 방식" 한 덩어리. About의 주력이다.
 *
 * 경력기술서(`Experience`)가 "뭘 했나"를 맡으므로, About은 "왜 그렇게 일하나"만 쓴다.
 * 같은 프로젝트를 다시 설명하지 않는다.
 */
export interface Principle {
  /** 원칙 한 줄. 소제목으로 크게 쓴다. */
  title: string;
  /** 왜 그렇게 생각하는지 두세 줄. */
  body: string;
  /** 그 원칙이 드러난 실제 사례 한 줄. 없으면 표어로 읽히니 되도록 채운다. */
  evidence?: string;
  /**
   * 근거가 되는 `Achievement`의 id. Career 섹션의 해당 카드로 이동시킬 때 쓴다.
   * 타입으로는 검증되지 않으니 id를 바꾸면 여기도 같이 고친다.
   */
  relatedAchievementId?: string;
}

export interface About {
  /** 소개 문단. 한 항목이 한 문단. 이력서의 Profile에 해당한다. */
  lead: string[];
  sections: AboutSection[];
  principles?: Principle[];
}

/**
 * 막대 그래프식 퍼센트 대신 3단계만 쓴다.
 * "React 85%" 같은 표기는 근거가 없고 채용 담당자도 믿지 않는다.
 */
export type SkillLevel = "expert" | "proficient" | "familiar";

export interface Skill {
  name: string;
  level?: SkillLevel;
  /** 실무 사용 연차. */
  years?: number;
  /** 어디에 어떻게 썼는지 한 줄. */
  note?: string;
}

export interface SkillGroup {
  id: string;
  /** 예: "언어", "프레임워크", "인프라" */
  category: string;
  skills: Skill[];
}

export interface Education {
  school: string;
  /** 예: "학사", "석사", "수료" */
  degree: string;
  major?: string;
  period: Period;
  note?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: YearMonth;
  credentialUrl?: string;
}

export interface LanguageSkill {
  /** 예: `"영어"` */
  name: string;
  /** 예: `"일상 회화"`, `"업무 가능"`. 등급 체계가 제각각이라 자유 문자열로 둔다. */
  level: string;
}

export interface Profile {
  name: string;
  nameEn?: string;
  /** 직함. Hero에서 이름 바로 아래 한 줄. */
  headline: string;
  /** 전문 영역. 예: `"Security · AI Infrastructure"` */
  specialty?: string;
  /**
   * 한 문장 요약. **화면에는 쓰지 않는다** — 검색 결과와 링크 미리보기에
   * 들어가는 `<meta description>` / OG 설명이다. 화면용 소개는 `About.lead`.
   */
  summary: string;
  /** 도시 단위까지만. 상세 주소는 넣지 않는다. */
  location?: string;
  email: string;
  links: Link[];
  /** 구직 상태 배지. 예: "정규직 제안 받는 중" */
  availability?: string;
  avatar?: Media;
}

/** 사이트 전체가 읽는 루트 객체. */
export interface Resume {
  profile: Profile;
  about: About;
  /** 최신순. */
  experiences: Experience[];
  /** 최신순. */
  projects: Project[];
  skills: SkillGroup[];
  /** 최신순. */
  education: Education[];
  /** 최신순. */
  certifications?: Certification[];
  languages?: LanguageSkill[];
  /** 이력 최종 수정 시점. 푸터에 표시한다. */
  updatedAt: YearMonth;
}
