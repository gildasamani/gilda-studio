import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type FormState = {
  name: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  budget: string;
  message: string;
  _honey: string;
};

const EMPTY: FormState = {
  name: "", email: "", phone: "", website: "", projectType: "", budget: "", message: "", _honey: "",
};

const C = {
  fg: "rgba(246,240,232,0.96)",
  sub: "rgba(216,197,174,0.82)",
  muted: "rgba(216,197,174,0.55)",
  accent: "#b77b57",
  accentDim: "rgba(183,123,87,0.65)",
  border: "rgba(255,255,255,0.14)",
  borderFocus: "rgba(183,123,87,0.55)",
  inputBg: "rgba(255,255,255,0.065)",
};

const STUDIO_EMAIL = "gilda.samani@gmail.com";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: "block", marginBottom: "0.5rem",
      fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.22em",
      color: C.sub, fontWeight: 500,
    }}>
      {children}
    </label>
  );
}

function Field({
  label, children,
}: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function inputBase(): React.CSSProperties {
  return {
    width: "100%",
    background: C.inputBg,
    border: `1px solid ${C.border}`,
    borderRadius: "0.75rem",
    padding: "0.9rem 1.2rem",
    fontSize: "0.9rem",
    color: C.fg,
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
    caretColor: C.accent,
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
}

function useFocusHandlers() {
  const on = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = C.borderFocus;
    e.currentTarget.style.background = "rgba(183,123,87,0.06)";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(183,123,87,0.18), 0 0 28px rgba(183,123,87,0.07)";
  };
  const off = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = C.border;
    e.currentTarget.style.background = C.inputBg;
    e.currentTarget.style.boxShadow = "none";
  };
  return { onFocus: on, onBlur: off };
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({})) as { error?: string };

      if (res.ok) {
        setStatus("success");
        return;
      }

      if (res.status === 429) {
        setErrorMsg("You've sent too many requests. Please wait a few minutes and try again.");
      } else if (res.status === 503) {
        setErrorMsg(`We couldn't submit your request right now. Please email us directly at ${STUDIO_EMAIL}.`);
      } else {
        setErrorMsg(data.error || `We couldn't submit your request right now. Please email us directly at ${STUDIO_EMAIL}.`);
      }
      setStatus("error");
    } catch {
      setErrorMsg(`We couldn't submit your request right now. Please email us directly at ${STUDIO_EMAIL}.`);
      setStatus("error");
    }
  };

  const focus = useFocusHandlers();
  const base = inputBase();

  const selectStyle: React.CSSProperties = {
    ...base,
    appearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(183,123,87,0.7)' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1.1rem center",
    paddingRight: "2.5rem",
  };

  const placeholder = "rgba(216,197,174,0.38)";
  const optStyle: React.CSSProperties = { background: "#1A1512", color: "rgba(246,240,232,0.9)" };

  return (
    <section id="contact" ref={sectionRef} className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 55% at 50% 90%, rgba(183,123,87,0.08), transparent)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-7" style={{ color: C.accentDim }}>
            Start a Conversation
          </span>
          <h2 className="font-display font-medium tracking-tight leading-[0.85] mb-7"
            style={{ fontSize: "clamp(2.5rem,7vw,6.5rem)", color: C.fg }}>
            Let's Create<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.16)", color: "transparent" }}>Something</span>
            <br />Unforgettable
          </h2>
          <p className="text-base font-light max-w-sm mx-auto leading-relaxed" style={{ color: C.muted }}>
            Every great experience starts with a single question. What's yours?
          </p>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="rounded-2xl p-16 text-center border" style={{
            background: "rgba(42,33,29,0.55)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(183,123,87,0.25)",
            boxShadow: "0 0 80px rgba(183,123,87,0.08)",
          }}>
            <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-7" style={{
              borderColor: "rgba(183,123,87,0.5)",
              boxShadow: "0 0 40px rgba(183,123,87,0.2)",
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11l5 5L18 6" stroke="#b77b57" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-4" style={{ color: C.fg }}>
              Request submitted.
            </h3>
            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: C.muted }}>
              Thank you! Your request has been submitted successfully. We will contact you by email or phone after reviewing your request.
            </p>
            {form.email && (
              <p className="text-xs mt-5" style={{ color: C.accentDim }}>
                A confirmation has been sent to {form.email}
              </p>
            )}
          </div>
        ) : (
          /* Form card */
          <div ref={formRef} className="rounded-2xl border" style={{
            background: "rgba(22,18,15,0.88)",
            backdropFilter: "blur(28px)",
            borderColor: "rgba(255,255,255,0.09)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 40px 120px rgba(0,0,0,0.5)",
          }}>
            {/* Card top accent line */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(183,123,87,0.5), rgba(183,123,87,0.1) 50%, transparent)" }} />

            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              {/* Honeypot — invisible to users, catches bots */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                <input
                  type="text" name="_honey" tabIndex={-1} autoComplete="off"
                  value={form._honey} onChange={set("_honey")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <Field label="Full Name">
                  <input
                    required type="text" value={form.name} onChange={set("name")}
                    placeholder="Your name"
                    style={{ ...base, "::placeholder": { color: placeholder } } as React.CSSProperties}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    {...focus}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    required type="email" value={form.email} onChange={set("email")}
                    placeholder="you@domain.com"
                    style={base}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    {...focus}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <Field label={<>Phone / WhatsApp <span style={{ color: "rgba(216,197,174,0.38)", fontSize: 9, textTransform: "none", letterSpacing: 0 }}>(optional)</span></>}>
                  <input
                    type="tel" value={form.phone} onChange={set("phone")}
                    placeholder="+1 (555) 000-0000"
                    style={base}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    {...focus}
                  />
                </Field>
                <Field label={<>Website <span style={{ color: "rgba(216,197,174,0.38)", fontSize: 9, textTransform: "none", letterSpacing: 0 }}>(optional)</span></>}>
                  <input
                    type="url" value={form.website} onChange={set("website")}
                    placeholder="https://yoursite.com"
                    style={base}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    {...focus}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <Field label="Project Type">
                  <select required value={form.projectType} onChange={set("projectType")} style={selectStyle} {...focus}>
                    <option value="" disabled style={optStyle}>Select a direction</option>
                    <option value="New Website Build" style={optStyle}>New Website Build</option>
                    <option value="Website Redesign" style={optStyle}>Website Redesign</option>
                    <option value="WordPress Development" style={optStyle}>WordPress Development</option>
                    <option value="Digital Experience" style={optStyle}>Digital Experience</option>
                    <option value="UI Implementation" style={optStyle}>UI Implementation</option>
                    <option value="Something Else" style={optStyle}>Something Else</option>
                  </select>
                </Field>
                <Field label="Estimated Budget">
                  <select required value={form.budget} onChange={set("budget")} style={selectStyle} {...focus}>
                    <option value="" disabled style={optStyle}>Investment range</option>
                    <option value="$1,000 – $3,000" style={optStyle}>$1,000 – $3,000</option>
                    <option value="$3,000 – $6,000" style={optStyle}>$3,000 – $6,000</option>
                    <option value="$6,000 – $10,000" style={optStyle}>$6,000 – $10,000</option>
                    <option value="$10,000 – $15,000" style={optStyle}>$10,000 – $15,000</option>
                    <option value="$15,000 – $30,000" style={optStyle}>$15,000 – $30,000</option>
                    <option value="$30,000+" style={optStyle}>$30,000+</option>
                  </select>
                </Field>
              </div>

              <div className="mb-10">
                <Field label="Your Vision">
                  <textarea
                    required rows={5} value={form.message} onChange={set("message")}
                    placeholder="Describe what you want to build. What should it feel like? What should it do? What makes it different?"
                    style={{ ...base, resize: "none", lineHeight: "1.75" }}
                    className="placeholder-[rgba(216,197,174,0.38)]"
                    {...focus}
                  />
                </Field>
              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="mb-7 px-5 py-4 rounded-xl text-sm leading-relaxed" style={{
                  background: "rgba(160,60,60,0.12)",
                  border: "1px solid rgba(160,60,60,0.22)",
                  color: "rgba(246,210,200,0.88)",
                }}>
                  {errorMsg.includes(STUDIO_EMAIL) ? (
                    <>
                      We couldn't submit your request right now. Please email us directly at{" "}
                      <a href={`mailto:${STUDIO_EMAIL}`} style={{ color: C.accent, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                        {STUDIO_EMAIL}
                      </a>
                    </>
                  ) : errorMsg}
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex items-center gap-3 px-12 py-4 rounded-full text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ border: `1px solid ${C.borderFocus}`, color: C.accent }}
                >
                  <span className="relative z-10 group-hover:text-[#1A1512] transition-colors duration-400">
                    {status === "loading" ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.4" />
                          <path d="M13 7a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </span>
                    ) : "Start a Conversation"}
                  </span>
                  <div
                    className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
                    style={{ background: C.accent, zIndex: 0 }}
                  />
                </button>
              </div>

              <p className="text-center mt-5 text-xs" style={{ color: "rgba(216,197,174,0.3)" }}>
                No spam, no sharing. Just a genuine conversation.
              </p>
            </form>
          </div>
        )}

        {/* Footer bar */}
        <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(216,197,174,0.38)" }}>
            © 2025 Gilda Studio
          </span>
          <div className="flex gap-8 mt-4 md:mt-0">
            {["Twitter", "Instagram", "Dribbble"].map(s => (
              <a key={s} href="#"
                className="text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
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
