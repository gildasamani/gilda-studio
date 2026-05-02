import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 78%" },
      }
    );
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0, filter: "blur(6px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 82%" },
        delay: 0.2,
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls =
    "w-full bg-transparent border border-white/8 rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground/30 text-sm tracking-wide focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_1px_rgba(183,123,87,0.2),0_0_24px_rgba(183,123,87,0.08)] transition-all duration-400";

  return (
    <section id="contact" ref={sectionRef} className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(183,123,87,0.07), transparent)"
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-20 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 block mb-6">Start a Conversation</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.85] mb-6" style={{ fontSize: "clamp(2.5rem,7vw,7rem)" }}>
            Let's Create<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.2)", color: "transparent" }}>Something</span>
            <br />Unforgettable
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-md mx-auto">
            Every great experience starts with a single question. What's yours?
          </p>
        </div>

        {submitted ? (
          <div className="glass-panel rounded-2xl p-16 text-center border border-primary/20">
            <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: "0 0 30px rgba(183,123,87,0.2)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="rgba(183,123,87,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl mb-3">Message received.</h3>
            <p className="text-muted-foreground text-sm">We'll be in touch soon — expect something thoughtful.</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl p-8 md:p-12 border border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Name</label>
                <input required type="text" placeholder="Your full name" className={inputCls} data-testid="input-name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Email</label>
                <input required type="email" placeholder="you@domain.com" className={inputCls} data-testid="input-email" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Website URL <span className="text-muted-foreground/30 normal-case tracking-normal">(optional)</span></label>
                <input type="url" placeholder="https://yoursite.com" className={inputCls} data-testid="input-website" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Project Type</label>
                <select required className={inputCls + " appearance-none"} defaultValue="" data-testid="select-project-type">
                  <option value="" disabled>Select a direction</option>
                  <option value="experience">Digital Experience</option>
                  <option value="brand">Brand Architecture</option>
                  <option value="product">Product Design</option>
                  <option value="motion">Motion & Interaction</option>
                  <option value="other">Something Else</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Estimated Budget</label>
              <select required className={inputCls + " appearance-none"} defaultValue="" data-testid="select-budget">
                <option value="" disabled>Investment range</option>
                <option value="10-25k">$10k – $25k</option>
                <option value="25-50k">$25k – $50k</option>
                <option value="50-100k">$50k – $100k</option>
                <option value="100k+">$100k+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 mb-10">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Your Vision</label>
              <textarea
                required
                rows={5}
                placeholder="Describe the experience you want to create. What should it feel like? What should it do? What makes it different?"
                className={inputCls + " resize-none leading-relaxed"}
                data-testid="textarea-vision"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                data-testid="button-submit"
                className="group relative px-12 py-4 rounded-full border border-primary/40 text-primary text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-background transition-all duration-400 overflow-hidden"
              >
                <span className="relative z-10">Start a Conversation</span>
                <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full" style={{ zIndex: 0 }} />
              </button>
            </div>
          </form>
        )}

        <div className="mt-24 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between text-xs text-muted-foreground/40 tracking-wider uppercase">
          <span>© 2025 Reframe Studio</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            {["Twitter", "Instagram", "Dribbble"].map(s => (
              <a key={s} href="#" className="hover:text-primary/70 transition-colors duration-300">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
