"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ScrollProgress } from "@/components/motion";
import { DURATION, EASE } from "@/components/motion/config";
import { SECTIONS } from "./sections";

/** 히어로를 지나면 네비게이션이 내려온다. 그 전에는 히어로를 가리지 않는다. */
const SHOW_AFTER = 320;

/**
 * 상단 고정 네비게이션.
 *
 * 링크는 평범한 `<a href="#id">`다. 부드러운 이동은 Lenis의 `anchors`가 처리하고,
 * 자바스크립트가 죽어도 브라우저 기본 앵커 이동으로 동작한다.
 *
 * 현재 섹션 표시는 IntersectionObserver로 한다. 스크롤 이벤트마다 위치를 재면
 * Lenis의 부드러운 스크롤과 같이 돌 때 프레임을 잡아먹는다.
 */
export function Nav({ name }: { name: string }) {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setShown(y > SHOW_AFTER));

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // 화면 위쪽 20%~30% 구간에 걸친 섹션을 "현재"로 본다.
      { rootMargin: "-20% 0px -70% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{ y: shown ? 0 : -72, opacity: shown ? 1 : 0 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
      // 숨어 있을 때 링크가 키보드 포커스를 가져가지 않게 한다.
      inert={!shown}
    >
      <ScrollProgress className="h-0.5 origin-left bg-foreground" />
      <nav className="border-b border-zinc-200/60 bg-background/85 backdrop-blur dark:border-zinc-800/60">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            {name}
          </a>
          <ul className="flex items-center gap-5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={
                    active === s.id
                      ? "text-sm text-foreground"
                      : "text-sm text-zinc-400 transition-colors hover:text-foreground dark:text-zinc-500"
                  }
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}
