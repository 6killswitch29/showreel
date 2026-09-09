"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE, STAGGER, VIEWPORT } from "./config";

export type StaggerProps = {
  children: ReactNode;
  /** 항목 간 간격(초). */
  stagger?: number;
  /** 첫 항목이 시작하기까지의 지연(초). */
  delay?: number;
  className?: string;
};

/**
 * 자식 `StaggerItem`을 차례로 등장시킨다.
 *
 * variants 이름(`hidden` / `show`)으로 부모–자식이 연결되므로,
 * 반드시 `StaggerItem`과 짝지어 쓴다. 사이에 다른 motion 요소를 끼우면 연결이 끊긴다.
 *
 * reduced-motion은 `MotionProvider`가 처리한다. 여기서 분기하지 않는 이유는
 * `Reveal`과 같다.
 */
export function Stagger({
  children,
  stagger = STAGGER,
  delay = 0,
  className,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export type StaggerItemProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
};

/** `Stagger`의 자식. 단독으로 쓰면 아무 일도 일어나지 않는다. */
export function StaggerItem({
  children,
  duration = DURATION.base,
  className,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
