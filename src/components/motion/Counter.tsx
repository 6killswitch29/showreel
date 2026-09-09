"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "./config";

export type CounterProps = {
  /** 목표값. 0에서 여기까지 센다. */
  value: number;
  /** 값 앞에 붙는 기호. 예: `"-"`, `"+"` */
  prefix?: string;
  /** 값 뒤에 붙는 단위. 예: `"%"`, `"개 이상"` */
  unit?: string;
  duration?: number;
  className?: string;
};

const format = (n: number) => Math.round(n).toLocaleString("ko-KR");

/**
 * 화면에 들어오면 0에서 `value`까지 센다.
 *
 * 서버에서는 최종값을 그대로 렌더링한다. 자바스크립트가 없어도 숫자가 보이고,
 * 크롤러도 실제 값을 읽는다. 애니메이션은 마운트 후에만 덧입힌다.
 *
 * 숫자 폭 때문에 줄이 흔들리지 않도록 `tabular-nums`로 자간을 고정하고
 * 최종 표기 길이만큼 `min-width`를 미리 잡아둔다.
 * reduced-motion이면 세지 않고 최종값을 그대로 둔다.
 */
export function Counter({
  value,
  prefix,
  unit,
  duration = DURATION.hero,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const reduced = useReducedMotion() ?? false;
  const formatted = format(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    if (!inView) {
      el.textContent = format(0);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span className={className}>
      {prefix}
      <span
        ref={ref}
        className="inline-block text-right tabular-nums"
        style={{ minWidth: `${formatted.length}ch` }}
      >
        {formatted}
      </span>
      {unit}
    </span>
  );
}
