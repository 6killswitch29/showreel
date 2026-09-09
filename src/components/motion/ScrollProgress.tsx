"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export type ScrollProgressProps = {
  className?: string;
};

/**
 * 페이지 상단에 붙는 스크롤 진행바.
 *
 * `scaleX`만 바꾸므로 스크롤 중에 레이아웃을 다시 계산하지 않는다.
 * reduced-motion이면 스프링 보간을 빼고 스크롤 위치를 그대로 따라간다.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion() ?? false;
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className={
        className ??
        "fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-foreground"
      }
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}
