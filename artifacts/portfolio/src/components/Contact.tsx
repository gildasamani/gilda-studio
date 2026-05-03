import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type FormState = {
  name: string;
  email: string;
  website: string;
  projectType: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", website: "", projectType: "", budget: "", message: "" };

export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 78%" } }
    );
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 82%" }, delay: 0.15 }
    );
  }, []);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  /* ── shared styles ── */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.055)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
    fontSize: "0.875rem",
    color: "rgba(246,240,232,0.92)",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    caretColor: "rgba(183,123,87,1)",
    boxSizing: "border-box",
  };
  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(183,123,87,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(183,123,87,0.2), 0 0 28px rgba(183,123,87,0.07)";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
    e.currentTarget.style.boxShadow = "none";
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.22em",
    color: "rgba(216,197,174,0.75)",
  };

  return (
    <section id="contact" className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 55% at 50% 85%, rgba(183,123,87,0.07), transparent)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-7" style={{ color: "rgba(183,123,87,0.65)" }}>Start a Conversation</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.85] mb-7" style={{ fontSize: "clamp(2.5rem,7vw,6.5rem)" }}>
            Let's Create<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.16)", color: "transparent" }}>Something</span>
            <br />Unforgettable
          </h2>
          <p className="text-base font-light max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(216,197,174,0.65)" }}>
            Every great experience starts with a single question. What's yours?
          </p>
        </div>

        {/* ── Success state ── */}
        {status === "success" ? (
          <div className="rounded-2xl p-16 text-center border" style={{
            background: "rgba(42,33,29,0.55)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(183,123,87,0.25)",
            boxShadow: "0 0 80px rgba(183,123,87,0.08)",
          }}>
            <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-7"
              style={{ borderColor: "rgba(183,123,87,0.5)", boxShadow: "0 0 40px rgba(183,123,87,0.2)" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11l5 5L18 6" stroke="rgba(183,123,87,1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-4" style={{ color: "rgba(246,240,232,0.94)" }}>
              Request submitted.
            </h3>
            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "rgba(216,197,174,0.68)" }}>
              Thank you! Your request has been submitted successfully. We will contact you by email or phone after reviewing your request.
            </p>
            <p className="text-xs mt-5" style={{ color: "rgba(183,123,87,0.55)" }}>
              A confirmation has been sent to {form.email}
            </p>
          </div>
        ) : (
          <div
            ref={formRef}
            className="rounded-2xl p-8 md:p-12 border"
            style={{
              background: "rgba(26,21,18,0.78)",
              backdropFilter: "blur(24px)",
              borderColor: "rgba(255,255,255,0.09)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    required type="text" value={form.name} onChange={set("name")}
                    placeholder="Your full name"
                    style={{ ...inputStyle }}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    onFocus={focusOn} onBlur={focusOff}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    required type="email" value={form.email} onChange={set("email")}
                    placeholder="you@domain.com"
                    style={{ ...inputStyle }}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    onFocus={focusOn} onBlur={focusOff}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label style={labelStyle}>
                    Website <span style={{ color: "rgba(216,197,174,0.38)", fontSize: 10, letterSpacing: "0.02em", textTransform: "none" }}>(optional)</span>
                  </label>
                  <input
                    type="url" value={form.website} onChange={set("website")}
                    placeholder="https://yoursite.com"
                    style={{ ...inputStyle }}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    onFocus={focusOn} onBlur={focusOff}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Project Type</label>
                  <select
                    required value={form.projectType} onChange={set("projectType")}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    onFocus={focusOn} onBlur={focusOff}
                  >
                    <option value="" disabled style={{ background: "#1A1512", color: "rgba(216,197,174,0.5)" }}>Select a direction</option>
                    <option value="New Website Build" style={{ background: "#1A1512" }}>New Website Build</option>
                    <option value="Website Redesign" style={{ background: "#1A1512" }}>Website Redesign</option>
                    <option value="WordPress Development" style={{ background: "#1A1512" }}>WordPress Development</option>
                    <option value="Digital Experience" style={{ background: "#1A1512" }}>Digital Experience</option>
                    <option value="UI Implementation" style={{ background: "#1A1512" }}>UI Implementation</option>
                    <option value="Something Else" style={{ background: "#1A1512" }}>Something Else</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label style={labelStyle}>Estimated Budget</label>
                <select
                  required value={form.budget} onChange={set("budget")}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  onFocus={focusOn} onBlur={focusOff}
                >
                  <option value="" disabled style={{ background: "#1A1512", color: "rgba(216,197,174,0.5)" }}>Investment range</option>
                  <option value="$800 – $1,500" style={{ background: "#1A1512" }}>$800 – $1,500</option>
                  <option value="$1,500 – $3,000" style={{ background: "#1A1512" }}>$1,500 – $3,000</option>
                  <option value="$3,000 – $5,000" style={{ background: "#1A1512" }}>$3,000 – $5,000</option>
                  <option value="$5,000 – $8,000" style={{ background: "#1A1512" }}>$5,000 – $8,000</option>
                  <option value="$8,000+" style={{ background: "#1A1512" }}>$8,000+</option>
                </select>
              </div>

              <div className="mb-10">
                <label style={labelStyle}>Your Vision</label>
                <textarea
                  required rows={5} value={form.message} onChange={set("message")}
                  placeholder="Describe what you want to build. What should it feel like? What should it do? What makes it different?"
                  style={{ ...inputStyle, resize: "none", lineHeight: "1.7" }}
                  className="placeholder-[rgba(216,197,174,0.38)]"
                  onFocus={focusOn} onBlur={focusOff}
                />
              </div>

              {status === "error" && (
                <p className="text-center text-sm mb-6" style={{ color: "rgba(194,96,96,0.85)" }}>
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative px-12 py-4 rounded-full text-sm uppercase tracking-[0.2em] overflow-hidden border transition-all duration-500 font-medium disabled:opacity-50"
                  style={{ borderColor: "rgba(183,123,87,0.5)", color: "rgba(183,123,87,0.98)" }}
                >
                  <span className="relative z-10 group-hover:text-[#1A1512] transition-colors duration-400">
                    {status === "loading" ? "Sending..." : "Start a Conversation"}
                  </span>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
                    style={{ background: "rgba(183,123,87,1)", zIndex: 0 }} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(216,197,174,0.38)" }}>© 2025 Gilda Studio</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            {["Twitter", "Instagram", "Dribbble"].map(s => (
              <a key={s} href="#" className="text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: "rgba(216,197,174,0.38)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(183,123,87,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(216,197,174,0.38)")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
