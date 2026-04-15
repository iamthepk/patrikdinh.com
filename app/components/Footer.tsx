"use client";

import { MapPin } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

export default function Footer() {
  return (
    <footer style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="flex flex-col gap-8 footer-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="mailto:me@patrikdinh.com"
                className="text-2xl md:text-3xl font-normal"
                style={{ color: "var(--text)" }}
              >
                me@patrikdinh.com
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/iamthepk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  style={{ color: "var(--text)" }}
                  aria-label="GitHub"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/dinhpatrik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  style={{ color: "var(--text)" }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-4 h-4 shrink-0"
                  style={{ color: "var(--text)" }}
                />
                <p
                  className="text-base font-medium"
                  style={{ color: "var(--text)" }}
                >
                  Prague, Czech Republic
                </p>
              </div>
              <p
                className="text-sm md:text-base font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Available for full-time roles and selected freelance projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
