"use client";

import { techStack } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 footer-container">
        <div>
          <a
            href="mailto:me@patrikdinh.com"
            className="block text-2xl md:text-3xl font-normal mb-4"
            style={{ color: "var(--text)" }}
          >
            me@patrikdinh.com
          </a>

          <div className="flex flex-col sm:flex-row gap-6 text-lg font-medium sm:pl-[8.72rem]">
            <a
              href="https://github.com/iamthepk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text)" }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/dinhpatrik"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Tech Stack Icons - Centered */}
        <div className="flex justify-center order-first md:order-none">
          <ul className="flex flex-wrap gap-4 md:gap-6 justify-center">
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

        <div className="text-left md:text-right footer-right">
          <div className="flex items-center gap-2 md:justify-end">
            <MapPin
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "var(--text)" }}
            />
            <p
              className="text-base font-medium"
              style={{ color: "var(--text)" }}
            >
              Prague, Czech Republic
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
