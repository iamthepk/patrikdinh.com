"use client";

import { projects } from "../lib/projects";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiVite,
  SiMui,
  SiExpress,
  SiPuppeteer,
  SiGooglegemini,
} from "react-icons/si";

const techIcons: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  Vercel: SiVercel,
  Vite: SiVite,
  MUI: SiMui,
  Express: SiExpress,
  Puppeteer: SiPuppeteer,
  Gemini: SiGooglegemini,
  PDFKit: SiPuppeteer, // Fallback, PDFKit nemá ikonu
};

export default function Projects() {
  return (
    <section id="work" className="section-padding section-spacing">
      <div className="max-w-5xl">
        <h2
          className="text-5xl md:text-6xl font-black tracking-tight heading-spacing"
          style={{ color: "var(--text)" }}
        >
          Work
        </h2>

        <div className="project-spacing">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={index < projects.length - 1 ? "pb-12 border-b border-opacity-10" : ""}
              style={{
                borderColor: "var(--text)",
                paddingBottom: index < projects.length - 1 ? "3rem" : "0",
              }}
            >
              <h3
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                style={{ color: "var(--text)", marginBottom: "1.5rem" }}
              >
                {project.title}
              </h3>

              {project.subtitle && (
                <p
                  className="text-xl md:text-2xl font-normal leading-[1.5] max-w-3xl"
                  style={{ color: "var(--text)", marginBottom: "1.5rem" }}
                >
                  {project.subtitle}
                </p>
              )}

              <div
                className="text-sm md:text-base font-normal italic leading-[1.5] max-w-3xl"
                style={{ color: "var(--text)", marginBottom: "2rem" }}
              >
                {project.description
                  .split(". ")
                  .map((sentence, idx, array) => (
                    <p
                      key={idx}
                      style={{ marginBottom: idx < array.length - 1 ? "1rem" : "0" }}
                    >
                      {sentence}
                      {idx < array.length - 1 ? "." : ""}
                    </p>
                  ))}
              </div>

              {/* Tech Icons */}
              <div className="flex flex-wrap gap-4" style={{ marginBottom: "2rem" }}>
                {project.tech.split(" · ").map((tech) => {
                  const IconComponent = techIcons[tech.trim()];
                  return (
                    <div key={tech} className="relative group">
                      {IconComponent ? (
                        <div
                          className="w-6 h-6 md:w-7 md:h-7 cursor-pointer"
                          style={{ color: "var(--text)" }}
                          title={tech.trim()}
                        >
                          <IconComponent
                            className="w-full h-full"
                            style={{ color: "inherit" }}
                          />
                          <span
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10"
                            style={{
                              color: "var(--text)",
                            }}
                          >
                            {tech.trim()}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="text-sm md:text-base font-medium"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {tech.trim()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-8 text-xl font-medium">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text)" }}
                  >
                    Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text)" }}
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
