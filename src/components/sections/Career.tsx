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

function AchievementBlock({ item }: { item: Achievement }) {
  return (
    <Reveal>
      <article className="border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
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
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
          {item.title}
        </h3>

        {item.metrics && <Metrics items={item.metrics} />}

        <div className="mt-8 grid gap-6 sm:grid-cols-[5rem_1fr]">
          <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            상황
          </p>
          <p className="leading-loose text-zinc-600 dark:text-zinc-400">
            {item.situation}
          </p>

          <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            행동
          </p>
          <ul className="space-y-3">
            {item.actions.map((a, i) => (
              <li
                key={i}
                className="leading-loose text-zinc-600 before:mr-2 before:text-zinc-300 before:content-['—'] dark:text-zinc-400 dark:before:text-zinc-700"
              >
                {a}
              </li>
            ))}
          </ul>

          <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            결과
          </p>
          <ul className="space-y-3">
            {item.results.map((r, i) => (
              <li
                key={i}
                className="leading-loose text-zinc-800 before:mr-2 before:text-zinc-300 before:content-['—'] dark:text-zinc-200 dark:before:text-zinc-700"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        {item.stack && (
          <div className="mt-8 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        )}
      </article>
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
