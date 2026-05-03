import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power4.out", delay: 0.6 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      className="fixed top-0 left-0 right-0 z-40 px-7 py-5 md:px-12 md:py-6 flex items-center justify-between pointer-events-auto"
      style={{
        background: scrolled ? "rgba(22,17,14,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(150%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(150%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(183,123,87,0.08)" : "1px solid transparent",
        transition: "background 0.6s cubic-bezier(0.4,0,0.2,1), border-color 0.6s ease, box-shadow 0.6s ease",
        boxShadow: scrolled ? "0 2px 60px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-lg md:text-xl font-display font-medium tracking-tight text-foreground/90 hover:text-primary transition-all duration-500"
        data-testid="nav-logo"
      >
        <span style={{ letterSpacing: "0.16em", fontWeight: 500 }}>GILDA</span>
        <span className="text-primary" style={{ letterSpacing: "0.16em" }}>.</span>
      </button>

      <div className="hidden md:flex items-center gap-10">
        {[["work", "Work"], ["process", "Process"], ["about", "About"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            data-testid={`nav-${id}`}
            className="nav-link relative text-xs uppercase tracking-[0.18em] font-medium text-muted-foreground/60 hover:text-foreground transition-all duration-500 group"
            style={{ letterSpacing: "0.18em" }}
          >
            <span className="relative inline-block transition-all duration-500 group-hover:tracking-[0.26em] group-hover:text-foreground">
              {label}
            </span>
            {/* Glow dot instead of underline */}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ boxShadow: "0 0 8px 2px rgba(183,123,87,0.6)" }}
            />
          </button>
        ))}

        <button
          onClick={() => scrollTo("contact")}
          data-testid="nav-contact"
          className="group relative px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-medium overflow-hidden"
          style={{
            border: "1px solid rgba(183,123,87,0.35)",
            color: "rgba(183,123,87,0.9)",
          }}
        >
          <span className="relative z-10 transition-colors duration-400 group-hover:text-background">
            Contact
          </span>
          <span
            className="absolute inset-0 scale-x-0 group-hover:scale-x-100 rounded-full origin-left transition-transform duration-400"
            style={{ background: "rgba(183,123,87,1)" }}
          />
        </button>
      </div>
    </nav>
  );
}
