"use client";

import { Download, Mail } from "lucide-react";
import { useState } from "react";
import CVContent from "./CVContent";
import Modal from "./Modal";
import ThemeToggle from "./ThemeToggle";
import "./Hero.css";

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);

  const downloadCvPdf = () => {
    const link = document.createElement("a");
    link.href = "/cv/download";
    link.download = "CV - Patrik Dinh.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const scrollToProject = (projectId: string) => {
    setCvOpen(false);

    window.setTimeout(() => {
      const projectElement = document.getElementById(`project-${projectId}`);
      projectElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 120);
  };

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="heroSection section-padding">
        <ThemeToggle />

        <div className="heroContainer">
          <div className="heroEyebrow">
            <span className="heroEyebrowDot" aria-hidden="true" />
            <span>Available for work</span>
          </div>

          <h1 className="heroTitle">Patrik Dinh</h1>
          <h2 className="heroSubtitle">
            Building internal systems, automation and AI tools.
          </h2>

          <p className="heroDescription">
            I build practical software for real workflows, with a strong focus on
            security, testing and whether the final system can actually be trusted
            in day-to-day use.
          </p>

          <div className="heroNavigation" aria-label="Primary">
            <button
              onClick={() => scrollToSection("work")}
              className="heroLink heroLinkPrimary"
              aria-label="Scroll to work section"
            >
              Work ↓
            </button>
            <a href="mailto:me@patrikdinh.com" className="heroLink">
              Email
            </a>
            <button
              onClick={() => setCvOpen(true)}
              className="heroLink"
              type="button"
              aria-haspopup="dialog"
            >
              CV
            </button>
            <a
              href="https://github.com/iamthepk"
              target="_blank"
              rel="noopener noreferrer"
              className="heroLink"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <Modal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
        ariaLabel="Curriculum Vitae"
        closeLabel="Close CV preview"
        panelClassName="cvPreviewPanel"
        bodyClassName="cvPreviewBody"
        topBarClassName="cvPreviewTopBar"
        closeButtonClassName="cvPreviewClose"
        topBarContent={
          <div className="cvPreviewActions">
            <button
              className="cvActionButton cvActionButtonPrimary uiTooltip uiTooltipLeft"
              onClick={downloadCvPdf}
              type="button"
              aria-label="Download CV PDF"
              data-tooltip="Download PDF"
            >
              <Download className="cvActionIcon" aria-hidden="true" />
            </button>
            <a
              className="cvActionButton uiTooltip uiTooltipLeft"
              href="mailto:me@patrikdinh.com"
              aria-label="Email Patrik"
              data-tooltip="Email me"
            >
              <Mail className="cvActionIcon" aria-hidden="true" />
            </a>
          </div>
        }
      >
        <div className="cvPreviewCanvas">
          <div className="cvPreviewInner">
            <CVContent mode="modal" onProjectSelect={scrollToProject} />
          </div>
        </div>
      </Modal>
    </>
  );
}
