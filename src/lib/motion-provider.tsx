"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * reduced-motion 처리를 motion에 맡긴다.
 *
 * 컴포넌트에서 `useReducedMotion()`으로 직접 분기하면 안 되는 이유가 있다.
 * 그 훅은 서버에서 `null`을 주고 클라이언트에서는 첫 렌더부터 실제 값을 준다
 * (렌더 중 동기로 matchMedia를 읽고, 이후 갱신하지 않는다). 그래서 분기 결과가
 * 렌더 출력에 섞이면 — `initial`처럼 인라인 스타일로 나가는 값이면 —
 * reduced-motion 사용자에게만 서버 HTML과 클라이언트 첫 렌더가 어긋난다.
 *
 * `reducedMotion="user"`는 위치 계열(transform) 값의 트랜지션만 꺼서 즉시 값에
 * 도달하게 하고 opacity는 그대로 애니메이션한다. "reduced-motion이면 페이드만
 * 남긴다"는 규칙과 정확히 같은 동작이고, 렌더 출력은 양쪽이 동일하다.
 *
 * 이 설정이 닿지 않는 곳(명령형 `animate()`, Lenis, 무한 반복)만 훅으로 직접
 * 다루되, 렌더 출력이 아니라 effect나 트랜지션에서만 쓴다.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
