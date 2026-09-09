import { resume } from "@/data/resume";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav name={resume.profile.name} />
      <main className="flex-1">
        <Hero />
        <About />
        <Career />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
