import { resume } from "@/data/resume";
import type { Achievement } from "@/data/resume.types";
import { Counter, Reveal } from "@/components/motion";
import { Section, Tag } from "@/components/ui/SectionTitle";
import { formatDuration, formatPeriod } from "@/lib/format";

function Metrics({ items }: { items: NonNullable<Achievement["metrics"]> }) {
  return (
    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
      {items.map((m) => (
        <div key={m.label}>
          <dd className="text-2xl font-semibold tracking-tight">
            <Counter value={m.value} prefix={m.prefix} unit={m.unit} />
          </dd>
          <dt className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            {m.label}
          </dt>
          {m.note && (
            <p className="mt-0.5 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
              {m.note}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}

function LabelledList({ label, items, strong }: { label: string; items: string[]; strong?: boolean }) {
  return (
    <>
      <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
        {label}
      </p>
      <ul className="space-y-3">
        {items.map((text, i) => (
          <li
            key={i}
            className={
              strong
                ? "leading-loose text-zinc-800 before:mr-2 before:text-zinc-300 before:content-['—'] dark:text-zinc-200 dark:before:text-zinc-700"
                : "leading-loose text-zinc-600 before:mr-2 before:text-zinc-300 before:content-['—'] dark:text-zinc-400 dark:before:text-zinc-700"
            }
          >
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * 성과 하나. 대표작(`featured`)만 펼친 채로 시작하고 나머지는 접힌다.
 *
 * `<details>`를 쓰는 이유: 자바스크립트 없이 동작하고, 키보드로 열고 닫히며,
 * 접힌 내용도 DOM에 있어서 브라우저 검색(Ctrl+F)과 크롤러가 찾는다.
 * 이것 하나 때문에 섹션을 클라이언트 컴포넌트로 바꿀 이유가 없다.
 *
 * 접혔을 때도 기간 · 기여도 · 제목 · 수치는 남는다. 훑어보는 사람이
 * 펼치지 않고도 무엇을 했는지 알 수 있어야 하기 때문이다.
 */
function AchievementBlock({ item }: { item: Achievement }) {
  return (
    <Reveal>
      <details
        open={item.featured}
        className="group border-t border-zinc-200 dark:border-zinc-800"
      >
        <summary className="cursor-pointer list-none py-12 [&::-webkit-details-marker]:hidden">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            {item.period && <span>{formatPeriod(item.period)}</span>}
            {item.contribution && (
              <>
                <span aria-hidden>·</span>
                <span>{item.contribution}</span>
              </>
            )}
            {item.featured && (
              <span className="rounded-sm bg-zinc-900 px-1.5 py-0.5 text-[10px] text-white dark:bg-zinc-100 dark:text-zinc-900">
                대표
              </span>
            )}
          </span>

          <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
            {item.title}
          </h3>

          {item.metrics && <Metrics items={item.metrics} />}

          <span className="mt-6 flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 transition-colors group-hover:text-foreground dark:text-zinc-600">
            <span className="group-open:hidden">상황 · 행동 · 결과 보기</span>
            <span className="hidden group-open:inline">접기</span>
            <span aria-hidden className="transition-transform group-open:rotate-45">
              +
            </span>
          </span>
        </summary>

        <div className="pb-12">
          <div className="grid gap-6 sm:grid-cols-[5rem_1fr]">
            <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
              상황
            </p>
            <p className="leading-loose text-zinc-600 dark:text-zinc-400">
              {item.situation}
            </p>

            <LabelledList label="행동" items={item.actions} />
            <LabelledList label="결과" items={item.results} strong />
          </div>

          {item.stack && (
            <div className="mt-8 flex flex-wrap gap-1.5">
              {item.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          )}
        </div>
      </details>
    </Reveal>
  );
}

export function Career() {
  return (
    <Section id="career">
      {resume.experiences.map((exp) => (
        <div key={exp.id}>
          <Reveal>
            <header className="mb-4">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {exp.company}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  {exp.role}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-zinc-400 dark:text-zinc-600">
                {formatPeriod(exp.period)} · {formatDuration(exp.period)}
                {exp.companyNote && ` · ${exp.companyNote}`}
              </p>
              {exp.summary && (
                <p className="mt-4 max-w-2xl leading-loose text-zinc-600 dark:text-zinc-400">
                  {exp.summary}
                </p>
              )}
            </header>
          </Reveal>

          {exp.achievements.map((a) => (
            <AchievementBlock key={a.id} item={a} />
          ))}
        </div>
      ))}
    </Section>
  );
}
