import type { ReactNode } from "react";
import { sectionMeta, type SectionId } from "@/components/layout/sections";

/** 스택·키워드용 작은 알약. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 px-2.5 py-1 font-mono text-[11px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      {children}
    </span>
  );
}

/**
 * 섹션 컨테이너. 번호와 제목은 `sections.ts`에서 가져오므로
 * 여기서 따로 넘기지 않는다 — 네비게이션과 항상 같은 값을 쓴다.
 */
export function Section({
  id,
  children,
}: {
  id: SectionId;
  children: ReactNode;
}) {
  const { index, label } = sectionMeta(id);

  return (
    <section id={id} className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <div className="mb-12 flex items-baseline gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
          {index}
        </span>
        <h2 className="text-lg font-semibold tracking-tight">{label}</h2>
      </div>
      {children}
    </section>
  );
}
