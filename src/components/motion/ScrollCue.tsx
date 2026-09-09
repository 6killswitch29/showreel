"use client";

import { motion, useReducedMotion } from "motion/react";

export type ScrollCueProps = {
  /** 눌렀을 때 이동할 곳. 예: `"#about"` */
  href: string;
  label?: string;
};

/** 트랙 높이(h-12) - 획 높이(h-5). 획이 트랙 끝까지 내려가는 거리. */
const TRAVEL = 48 - 20;

/**
 * 히어로 아래 스크롤 안내. 세로 트랙을 따라 짧은 획이 내려간다.
 *
 * 장식이 아니라 링크다 — 눌러도 다음 섹션으로 간다.
 *
 * 무한 반복은 `MotionConfig`가 다루지 못한다(위치 값의 트랜지션만 끄기 때문에
 * 반복이 남으면 오히려 깜빡인다). 그래서 여기만 `useReducedMotion()`으로 직접
 * 끄되, **`initial`은 조건 없이 고정**한다. `initial`은 서버 HTML의 인라인
 * 스타일로 나가므로 여기서 갈라지면 하이드레이션이 어긋난다.
 * reduced-motion이면 획이 트랙 위쪽에 멈춘 눈금으로 남는다.
 */
export function ScrollCue({ href, label = "SCROLL" }: ScrollCueProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <a
      href={href}
      className="group inline-flex flex-col gap-3 text-zinc-500 transition-colors hover:text-foreground"
    >
      <span className="font-mono text-[10px] tracking-[0.2em]">{label}</span>
      <span
        aria-hidden
        className="relative block h-12 w-px overflow-hidden bg-zinc-300 dark:bg-zinc-700"
      >
        <motion.span
          className="absolute inset-x-0 block h-5 bg-foreground/70"
          initial={{ y: 0 }}
          animate={reduced ? undefined : { y: [0, TRAVEL] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }
          }
        />
      </span>
    </a>
  );
}
