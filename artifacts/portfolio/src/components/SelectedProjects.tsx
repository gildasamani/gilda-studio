import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  // One-time reveal animations (unchanged)
  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
    );
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item,
        { y: 65, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
          delay: (i % 2) * 0.13 }
      );
    });
  }, []);

  // Continuous scroll effects — respond on scroll up and down
  useEffect(() => {
    if (!sectionRef.current) return;
    const st: ScrollTrigger[] = [];

    // Section atmospheric glow — rises and fades through section scroll
    const glowTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 25%",
        scrub: 2.5,
      },
    });
    glowTl
      .to(glowRef.current, { opacity: 1, y: "-10%", ease: "none", duration: 0.4 })
      .to(glowRef.current, { opacity: 0, y: "-25%", ease: "none", duration: 0.6 });
    if (glowTl.scrollTrigger) st.push(glowTl.scrollTrigger);

    // Per-image parallax — staggered depth per grid position
    imgWrapRefs.current.forEach((wrap, i) => {
      if (!wrap) return;
      const trigger = itemsRef.current[i];
      if (!trigger) return;

      // Alternate slight variation for visual depth across the grid
      const yShift = i % 2 === 0 ? -24 : -18;

      const t = gsap.to(wrap, {
        y: yShift,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4 + (i % 2) * 0.3,
        },
      });
      if (t.scrollTrigger) st.push(t.scrollTrigger);
    });

    return () => st.forEach(t => t.kill());
  }, []);

  const projects = [
    {
      title: "Grove",
      category: "Digital Atmosphere",
      desc: "Concrete, light, and the geometry of shadow — architecture as pure cinematic editorial.",
      image: "/images/grove.png",
    },
    {
      title: "Helio",
      category: "Interface Concept",
      desc: "A dark editorial interface in perpetual golden hour — where restraint is the only luxury that matters.",
      image: "/images/helio.png",
    },
    {
      title: "Forma",
      category: "Creative Direction",
      desc: "Grid systems and copper rule lines — deliberate, editorial, expensive. Layout as a statement of restraint.",
      image: "/images/forma.png",
    },
    {
      title: "Lumen",
      category: "Digital Atmosphere",
      desc: "Amber light refracted through dark glass — a cinematic study in warmth, depth, and negative space.",
      image: "/images/lumen.png",
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">

      {/* Atmospheric glow — continuously scroll-reactive */}
      <div ref={glowRef} className="absolute pointer-events-none z-0" style={{
        top: "35%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "700px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(183,123,87,0.055) 0%, transparent 68%)",
        filter: "blur(70px)",
        opacity: 0,
        willChange: "transform, opacity",
      }} />

      <div ref={headingRef} className="mb-20 flex flex-col md:flex-row justify-between items-end relative z-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-5" style={{ color: "rgba(183,123,87,0.6)" }}>Concept Work</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.88]" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Interface<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.15)", color: "transparent" }}>Concepts</span>
          </h2>
        </div>
        <p className="max-w-[240px] text-sm leading-relaxed mt-6 md:mt-0" style={{ color: "rgba(216,197,174,0.6)" }}>
          Visual explorations at the intersection of atmosphere and function.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ aspectRatio: "4/3" }}
            data-cursor="hover"
          >
            {/* Parallax image wrapper — extends slightly for movement room */}
            <div
              ref={el => { imgWrapRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: "-8%",
                bottom: "-8%",
                left: 0,
                right: 0,
                willChange: "transform",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: 0.62,
                  filter: "saturate(0.5) brightness(0.85)",
                  transition: "opacity 1s cubic-bezier(0.25,1,0.5,1), filter 1s cubic-bezier(0.25,1,0.5,1), transform 1s cubic-bezier(0.25,1,0.5,1)",
                  transform: "scale(1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.filter = "saturate(0.8) brightness(0.98)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = "0.62";
                  e.currentTarget.style.filter = "saturate(0.5) brightness(0.85)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>

            {/* Gradient + border overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent z-10" />
            <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/22 z-20"
              style={{ transition: "border-color 0.7s ease" }} />

            <div className="absolute bottom-0 left-0 p-7 w-full z-30">
              <span className="text-[10px] uppercase tracking-[0.22em] block mb-2.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                style={{ color: "rgba(183,123,87,0.75)" }}>
                {project.category}
              </span>
              <h3 className="font-display font-medium text-2xl md:text-[2rem] translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                style={{ color: "rgba(246,240,232,0.92)" }}>
                {project.title}
              </h3>
              <p className="text-xs mt-2.5 max-w-[240px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                style={{ color: "rgba(216,197,174,0.65)" }}>
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
