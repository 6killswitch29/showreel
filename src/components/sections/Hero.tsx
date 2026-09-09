import { resume } from "@/data/resume";
import { Reveal, ScrollCue } from "@/components/motion";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { DURATION } from "@/components/motion/config";

export function Hero() {
  const { profile } = resume;

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] w-full max-w-3xl flex-col justify-center px-6 py-24"
    >
      <Reveal duration={DURATION.hero}>
        <p className="font-mono text-xs tracking-widest text-zinc-400 dark:text-zinc-600">
          {profile.nameEn?.toUpperCase()}
        </p>
      </Reveal>

      <Reveal delay={0.1} duration={DURATION.hero}>
        <h1 className="mt-4 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal delay={0.2} duration={DURATION.hero}>
        <p className="mt-8 text-2xl leading-snug tracking-tight text-zinc-700 sm:text-3xl dark:text-zinc-300">
          {profile.headline}
        </p>
      </Reveal>

      {profile.specialty && (
        <Reveal delay={0.28}>
          <p className="mt-3 font-mono text-sm text-zinc-400 dark:text-zinc-600">
            {profile.specialty}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.38} className="mt-12">
        <ContactLinks
          email={profile.email}
          links={profile.links}
          scope="hero"
        />
      </Reveal>

      {/* 흐름에서 빼서 히어로 바닥에 붙인다. 가운데 정렬된 본문과 같이 뜨지 않도록. */}
      <Reveal delay={0.5} className="absolute bottom-12 left-6">
        <ScrollCue href="#about" />
      </Reveal>
    </section>
  );
}
