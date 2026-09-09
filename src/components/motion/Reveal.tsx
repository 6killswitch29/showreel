"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "./config";

const OFFSET = 24;

const FROM = {
  bottom: { y: OFFSET },
  top: { y: -OFFSET },
  left: { x: -OFFSET },
  right: { x: OFFSET },
  none: {},
} as const;

export type RevealProps = {
  children: ReactNode;
  /** 어느 쪽에서 들어올지. 기본은 아래에서 위로. */
  from?: keyof typeof FROM;
  /** 지연(초). 같은 줄의 요소를 조금씩 어긋나게 할 때 쓴다. */
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * 스크롤로 화면에 들어올 때 한 번 페이드인한다.
 *
 * `opacity`와 `transform`만 건드리므로 레이아웃 시프트가 없다.
 *
 * reduced-motion은 여기서 분기하지 않는다 — `MotionProvider`의
 * `reducedMotion="user"`가 이동을 즉시 끝내고 페이드만 남긴다.
 * 여기서 `useReducedMotion()`으로 `initial`을 바꾸면 그 값이 서버 HTML의
 * 인라인 스타일로 나가서 하이드레이션이 어긋난다.
 */
export function Reveal({
  children,
  from = "bottom",
  delay = 0,
  duration = DURATION.slow,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...FROM[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
