"use client";

import { useTheme } from "../lib/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import CVContent from "./CVContent";
import Modal from "./Modal";
import "./Hero.css";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const [cvOpen, setCvOpen] = useState(false);

  const openCvPage = () => {
    window.open("/cv", "_blank", "noopener,noreferrer");
  };

  const downloadCvPdf = () => {
    const link = document.createElement("a");
    link.href = "/cv/download";
    link.download = "CV - Patrik Dinh.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const printCv = () => {
    window.open("/cv/print", "_blank", "noopener,noreferrer");
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
        <button
          onClick={toggleTheme}
          className="themeToggle"
          aria-label="Toggle theme"
          aria-pressed={theme === "light"}
          type="button"
        >
          {theme === "dark" ? (
            <Sun className="themeToggleIcon" />
          ) : (
            <Moon className="themeToggleIcon" />
          )}
        </button>

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
          <div className="cvPreviewHeader">
            <div className="cvPreviewMeta">
              <p className="cvPreviewEyebrow">Document preview</p>
              <p className="cvPreviewTitle">Curriculum Vitae</p>
            </div>
            <div className="cvPreviewActions">
              <button className="cvActionButton" onClick={printCv} type="button">
                Print
              </button>
              <button
                className="cvActionButton cvActionButtonPrimary"
                onClick={downloadCvPdf}
                type="button"
              >
                Download PDF
              </button>
              <button className="cvActionButton" onClick={openCvPage} type="button">
                Open full page
              </button>
            </div>
          </div>
        }
      >
        <div className="cvPreviewCanvas">
          <div className="cvPreviewInner">
            <CVContent mode="modal" />
          </div>
        </div>
      </Modal>
    </>
  );
}
