import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "wouter";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal nav
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 flex items-center justify-between pointer-events-auto mix-blend-difference text-primary-foreground"
    >
      <Link href="/" className="text-xl md:text-2xl font-display font-medium tracking-tight">
        STUDIO<span className="text-primary">X</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
        <button onClick={() => scrollTo("work")} className="hover:text-primary transition-colors">
          Work
        </button>
        <button onClick={() => scrollTo("process")} className="hover:text-primary transition-colors">
          Process
        </button>
        <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">
          About
        </button>
        <button onClick={() => scrollTo("contact")} className="px-5 py-2 rounded-full border border-primary/30 hover:bg-primary hover:text-background transition-all duration-300">
          Contact
        </button>
      </div>
    </nav>
  );
}
