import { resume } from "@/data/resume";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section } from "@/components/ui/SectionTitle";

export function About() {
  const { about } = resume;

  return (
    <Section id="about">
      <Reveal>
        <div className="max-w-2xl space-y-4">
          {about.lead.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-lg leading-loose text-zinc-800 dark:text-zinc-200"
                  : "leading-loose text-zinc-600 dark:text-zinc-400"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      {about.principles && (
        <>
          <Reveal>
            <h3 className="mt-20 font-mono text-xs tracking-widest text-zinc-400 dark:text-zinc-600">
              일하는 방식
            </h3>
          </Reveal>

          <Stagger className="mt-6 grid gap-px overflow-hidden rounded-lg bg-zinc-200 sm:grid-cols-2 dark:bg-zinc-800">
            {about.principles.map((p) => (
              <StaggerItem
                key={p.title}
                className="flex h-full flex-col bg-background p-6"
              >
                <h4 className="text-base font-semibold leading-snug">
                  {p.title}
                </h4>
                <p className="mt-3 flex-1 text-sm leading-loose text-zinc-600 dark:text-zinc-400">
                  {p.body}
                </p>
                {p.evidence && (
                  <p className="mt-4 border-l-2 border-zinc-200 pl-3 text-[13px] leading-relaxed text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
                    {p.evidence}
                  </p>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </>
      )}

      {about.sections.map((s) => (
        <Reveal key={s.id}>
          <div className="mt-16 max-w-2xl">
            <h3 className="text-base font-semibold">{s.title}</h3>
            {s.body.map((paragraph, i) => (
              <p
                key={i}
                className="mt-4 leading-loose text-zinc-600 dark:text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
