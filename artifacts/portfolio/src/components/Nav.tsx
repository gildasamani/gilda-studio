import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, ease: "power4.out", delay: 0.4 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-12 md:py-6 flex items-center justify-between pointer-events-auto transition-all duration-700"
      style={{
        background: scrolled
          ? "rgba(26, 21, 18, 0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(183, 123, 87, 0.1)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-xl md:text-2xl font-display font-medium tracking-tight text-foreground hover:text-primary transition-colors duration-300"
      >
        REFRAME<span className="text-primary">.</span>
      </button>

      <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest uppercase">
        {[["work", "Work"], ["process", "Process"], ["about", "About"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
          >
            {label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="px-5 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-background transition-all duration-400 tracking-widest"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
