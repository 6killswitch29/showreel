"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

/**
 * 전역 스무스 스크롤.
 *
 * `root`로 두면 Lenis가 window에 직접 붙고 래퍼 DOM을 만들지 않는다.
 * 그래서 reduced-motion일 때 통째로 빼도 DOM 구조가 같아 하이드레이션이 어긋나지 않는다.
 *
 * 스무스 스크롤은 reduced-motion 사용자가 가장 먼저 불편해하는 요소라
 * 감속 보간을 줄이는 대신 아예 끄고 브라우저 기본 스크롤에 맡긴다.
 *
 * `anchors`는 반드시 켠다. Lenis는 자기 목표 위치를 따로 들고 있어서, 이게 꺼져 있으면
 * `#career` 같은 앵커 이동이나 `scrollIntoView()`가 먹은 직후 Lenis가 원래 위치로
 * 되돌려 버린다. 섹션마다 id가 있으므로 앵커 이동은 실제로 쓰이는 경로다.
 *
 * `offset`도 같이 준다. Lenis가 앵커 이동을 가로채면 CSS `scroll-margin-top`을 보지 않고
 * 요소 위치로 바로 가서, 고정 네비게이션이 섹션 제목을 덮는다.
 * CSS 쪽 `scroll-margin-top`은 JS가 죽었을 때의 대비로 남겨두고 값을 맞춰 둔다.
 */

/** 고정 네비게이션 높이(3.5rem) + 여백. globals.css의 `scroll-margin-top`과 같은 값. */
const NAV_OFFSET = 80;
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false;

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: { offset: -NAV_OFFSET },
      }}
    >
      {children}
    </ReactLenis>
  );
}
