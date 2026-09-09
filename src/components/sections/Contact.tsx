import { resume } from "@/data/resume";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/ui/SectionTitle";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { formatPeriod, formatYearMonth } from "@/lib/format";

export function Contact() {
  const { profile, education, languages, updatedAt } = resume;

  return (
    <Section id="contact">
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
          <h3 className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
            학력
          </h3>
          <ul className="space-y-2">
            {education.map((e) => (
              <li key={e.school}>
                <p className="text-sm">
                  {e.school}
                  <span className="text-zinc-500 dark:text-zinc-500">
                    {" "}
                    · {e.major} · {e.degree}
                  </span>
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
                  {formatPeriod(e.period)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {languages && (
        <Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-[9rem_1fr]">
            <h3 className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
              어학
            </h3>
            <p className="text-sm">
              {languages.map((l) => `${l.name} · ${l.level}`).join(", ")}
            </p>
          </div>
        </Reveal>
      )}

      <Reveal>
        <div className="mt-20 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <ContactLinks
            email={profile.email}
            links={profile.links}
            scope="contact"
          />
          <p className="mt-16 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            마지막 수정 {formatYearMonth(updatedAt)}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
