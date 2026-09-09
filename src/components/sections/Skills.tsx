import { resume } from "@/data/resume";
import { Stagger, StaggerItem } from "@/components/motion";
import { Section, Tag } from "@/components/ui/SectionTitle";

export function Skills() {
  return (
    <Section id="skills">
      <Stagger className="space-y-10">
        {resume.skills.map((group) => (
          <StaggerItem
            key={group.id}
            className="grid gap-4 sm:grid-cols-[9rem_1fr]"
          >
            <h3 className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <Tag>
                    {skill.name}
                    {skill.note && (
                      <span className="ml-1.5 text-zinc-400 dark:text-zinc-600">
                        {skill.note}
                      </span>
                    )}
                  </Tag>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
