"use client";

import { techStack } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";

export default function About() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-[1300px] mx-auto px-6">
        <h2
          className="text-5xl md:text-6xl font-black tracking-tight heading-spacing"
          style={{ color: "var(--text)" }}
        >
          About
        </h2>

        <div className="flex flex-col gap-12">
          <p
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight"
            style={{ color: "var(--text)" }}
          >
            I build full-stack web apps that actually get used - from POS workflows and invoicing to AI-powered automation.
          </p>

          <p
            className="text-2xl md:text-3xl font-normal leading-[1.5]"
            style={{ color: "var(--text)" }}
          >
            
            Right now I&apos;m focused on combining React/Node with modern AI APIs to automate routine tasks and improve real-time collaboration.
          </p>

          {/* Tech Stack Icons */}
          <div className="mt-8">
            <ul className="flex flex-wrap gap-4 md:gap-6">
              {techStack.primary.map((tech) => {
                const IconComponent = techIcons[tech];
                return (
                  <li key={tech} className="relative group">
                    {IconComponent ? (
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
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
        </div>
      </div>
    </section>
  );
}
