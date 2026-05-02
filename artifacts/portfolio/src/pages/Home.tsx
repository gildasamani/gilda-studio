import { useScrollInit } from "@/hooks/useScrollInit";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { SelectedProjects } from "@/components/SelectedProjects";
import { About } from "@/components/About";
import { CreativeProcess } from "@/components/CreativeProcess";
import { Services } from "@/components/Services";
import { WebsiteAudit } from "@/components/WebsiteAudit";
import { Contact } from "@/components/Contact";

function Home() {
  useScrollInit();

  return (
    <main className="w-full min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary-foreground">
      <div className="bg-noise" />
      <CustomCursor />
      <Nav />
      <Hero />
      <FeaturedWork />
      <SelectedProjects />
      <About />
      <CreativeProcess />
      <Services />
      <WebsiteAudit />
      <Contact />
    </main>
  );
}

export default Home;
