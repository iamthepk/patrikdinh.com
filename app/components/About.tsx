"use client";

export default function About() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-5xl">
        <h2
          className="text-5xl md:text-6xl font-black tracking-tight heading-spacing"
          style={{ color: "var(--text)" }}
        >
          About
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          <p
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight"
            style={{ color: "var(--text)" }}
          >
            I build products that solve real problems.
          </p>

          <p
            className="text-2xl md:text-3xl font-normal leading-[1.5] max-w-4xl"
            style={{ color: "var(--text)" }}
          >
            Specializing in full-stack development, AI integrations, and
            intelligent automation. Currently exploring agentic AI systems and
            real-time collaboration tools.
          </p>
        </div>
      </div>
    </section>
  );
}
