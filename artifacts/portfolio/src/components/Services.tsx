import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  // One-time reveal animations (unchanged)
  useEffect(() => {
    if (!sectionRef.current) return;

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          delay: i * 0.1
        }
      );
    });
  }, []);

  // Continuous scroll — section glow + card depth
  useEffect(() => {
    if (!sectionRef.current) return;
    const st: ScrollTrigger[] = [];

    // Atmospheric glow rises through section
    const glowTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 25%",
        scrub: 2.5,
      },
    });
    glowTl
      .to(glowRef.current, { opacity: 1, y: "-12%", ease: "none", duration: 0.4 })
      .to(glowRef.current, { opacity: 0, y: "-28%", ease: "none", duration: 0.6 });
    if (glowTl.scrollTrigger) st.push(glowTl.scrollTrigger);

    return () => st.forEach(t => t.kill());
  }, []);

  const services = [
    {
      title: "Digital Experience",
      desc: "Immersive, award-winning websites that captivate audiences and drive engagement through motion and storytelling.",
      features: ["Creative Direction", "Interactive Design", "WebGL & 3D", "Performance Optimization"]
    },
    {
      title: "Brand Architecture",
      desc: "Comprehensive brand systems that position you as an industry leader with a distinct, premium identity.",
      features: ["Visual Identity", "Design Systems", "Brand Strategy", "Guidelines"]
    },
    {
      title: "Product Design",
      desc: "Intuitive, beautifully crafted digital products that solve complex problems with elegant solutions.",
      features: ["UI/UX Design", "Prototyping", "User Research", "Interaction Design"]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/20 relative overflow-hidden" ref={sectionRef}>
      {/* Atmospheric glow — scroll-reactive */}
      <div ref={glowRef} className="absolute pointer-events-none z-0" style={{
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(183,123,87,0.06) 0%, transparent 68%)",
        filter: "blur(70px)",
        opacity: 0,
        willChange: "transform, opacity",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-display font-medium mb-16 text-center">Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => { itemsRef.current[i] = el; }}
              className="glass-panel p-8 md:p-10 rounded-2xl group hover:border-primary/30 transition-colors duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />

              <h3 className="text-2xl md:text-3xl font-display font-medium mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{service.desc}</p>

              <ul className="space-y-3">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm tracking-wide text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
