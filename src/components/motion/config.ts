/**
 * 애니메이션 공통 상수. 여기 값만 바꾸면 사이트 전체의 리듬이 바뀐다.
 *
 * 클라이언트 전용이 아니므로 서버 컴포넌트에서도 임포트할 수 있다.
 */

/** 프로젝트 표준 이징. 모든 진입 애니메이션이 이걸 쓴다. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.4,
  base: 0.5,
  slow: 0.6,
  /** 히어로 전용. 다른 곳에서 쓰지 않는다. */
  hero: 1.2,
} as const;

/** 스크롤 진입 판정 기본값. 한 번만 재생하고, 화면에 10% 들어오기 전에는 기다린다. */
export const VIEWPORT = { once: true, margin: "-10%" } as const;

/** Stagger 항목 간 기본 간격(초). */
export const STAGGER = 0.08;
