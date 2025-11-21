"use client";

import { techStack } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";

export default function TechStack() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-5xl">
        <ul className="flex flex-wrap gap-6">
          {techStack.primary.map((tech) => {
            const IconComponent = techIcons[tech];
            return (
              <li key={tech} className="relative group">
                {IconComponent ? (
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 cursor-pointer"
                    style={{ color: "var(--text)" }}
                    title={tech}
                    role="img"
                    aria-label={tech}
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
                      {tech}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-xl md:text-2xl font-normal"
                    style={{ color: "var(--text)" }}
                  >
                    {tech}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
