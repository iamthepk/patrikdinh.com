"use client";

import { projects } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { useTheme } from "../lib/theme-provider";
import { useState, useEffect } from "react";
import { PrintAgentFlowAnimation } from "./PrintAgentFlowAnimation";
import { motion } from "framer-motion";
import "./Projects.css";

// Apple-style easing curves
const appleEase = [0.25, 0.1, 0.25, 1] as const;

// Variants pro scroll animace projektů
const projectContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const projectContentVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -60 : 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: appleEase as [number, number, number, number],
    },
  },
});

const thumbnailVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    scale: 0.95,
    x: index % 2 === 0 ? -40 : 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: appleEase as [number, number, number, number],
      delay: 0.2,
    },
  },
});

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: appleEase as [number, number, number, number],
      delay: 0.3,
    },
  },
};

// Speciální animace pro Invoice AI Extractor - simulace pohybu PDF vzhledem k JSON
const invoiceAIThumbnailVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    scale: 0.9,
    x: index % 2 === 0 ? -40 : 40,
  },
  visible: {
    opacity: 1,
    scale: [0.9, 1.05, 1],
    x: 0,
    transition: {
      duration: 1.2,
      ease: appleEase as [number, number, number, number],
      delay: 0.2,
      scale: {
        times: [0, 0.5, 1],
        duration: 1.2,
        ease: appleEase as [number, number, number, number],
      },
    },
  },
});

export default function Projects() {
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(
    null
  );

  // Close modals on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setSelectedCaseStudy(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when modal is open (without moving the page)
  useEffect(() => {
    const isModalOpen = selectedImage !== null || selectedCaseStudy !== null;

    if (isModalOpen) {
      // Prevent scrolling without moving the page - just hide overflow
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scrolling
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedImage, selectedCaseStudy]);

  // Helper function to get theme-specific thumbnail path
  const getThumbnailPath = (basePath: string) => {
    if (!basePath) return basePath;

    const pathParts = basePath.split("/");
    const filename = pathParts[pathParts.length - 1];
    const directory = pathParts.slice(0, -1).join("/");

    if (filename.includes("-light.") || filename.includes("-dark.")) {
      return basePath;
    }

    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    const ext = filename.substring(filename.lastIndexOf("."));
    const themeFilename = `${nameWithoutExt}-${theme}${ext}`;

    return `${directory}/${themeFilename}`;
  };

  // Helper function to handle image errors silently
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.currentTarget;
    const src = img.src;

    // Pokud selhal theme-specific soubor, zkusíme základní soubor
    if (src.includes(`-${theme}.`)) {
      const fallbackSrc = src.replace(`-${theme}.`, ".");
      img.src = fallbackSrc;
      img.onerror = null; // Zastavíme další error handling
    } else {
      // Pokud selhal i základní soubor, skryjeme obrázek
      img.style.display = "none";
    }
  };

  // Helper function to open URL with theme passed via postMessage (hidden)
  const openUrlWithTheme = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");

    // Pošli theme přes postMessage když se okno načte
    if (newWindow) {
      // Ulož theme do sessionStorage jako fallback
      sessionStorage.setItem("theme", theme);

      // Pošli theme přes postMessage
      const sendTheme = () => {
        try {
          newWindow.postMessage(
            { type: "THEME_SYNC", theme },
            new URL(url).origin
          );
        } catch (e) {
          // Pokud selže postMessage, použij sessionStorage
          console.warn("Failed to send theme via postMessage", e);
        }
      };

      // Zkus poslat theme hned
      sendTheme();

      // Zkus znovu po chvíli (když se stránka načte)
      setTimeout(sendTheme, 100);
      setTimeout(sendTheme, 500);
      setTimeout(sendTheme, 1000);
    }
  };

  return (
    <section id="work" className="section-padding section-spacing">
      <div className="w-full px-6 lg:px-16">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight heading-spacing heading">
          Work
        </h2>

        <motion.div
          className="project-spacing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={projectContainerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="projectContainer"
              variants={projectContentVariants(index)}
            >
              <div
                className={
                  "projectContent" +
                  (index % 2 === 1 ? " projectContentReverse" : "")
                }
              >
                {/* Thumbnail - Left side */}
                {project.thumbnail && (
                  <motion.div
                    className="thumbnailWrapper"
                    variants={
                      project.id === "invoice-ai"
                        ? invoiceAIThumbnailVariants(index)
                        : thumbnailVariants(index)
                    }
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div
                      className={`thumbnailContainer group ${
                        project.id === "print-agent" ? "" : "cursor-pointer"
                      }`}
                      onClick={() => {
                        if (project.id === "print-agent") return;

                        if (project.liveUrl) {
                          openUrlWithTheme(project.liveUrl);
                        } else {
                          setSelectedImage(
                            getThumbnailPath(project.thumbnail!)
                          );
                        }
                      }}
                    >
                      {project.id === "print-agent" ? (
                        <div className="thumbnailImageWrapper">
                          <PrintAgentFlowAnimation isThumbnail={true} />
                          <div className="gradientOverlay" />
                        </div>
                      ) : (
                        <div className="thumbnailImageWrapper">
                          <Image
                            src={getThumbnailPath(project.thumbnail)}
                            alt=""
                            fill
                            quality={100}
                            unoptimized={true}
                            className={`thumbnailImage ${
                              theme === "dark" ? "thumbnailImageDark" : ""
                            }`}
                            sizes="100vw"
                            priority={project.id === projects[0].id}
                            onError={handleImageError}
                          />
                          <div className="gradientOverlay" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Content - Right side */}
                <motion.div
                  className="content"
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="title">{project.title}</h3>

                  {project.subtitle && (
                    <p className="subtitle">{project.subtitle}</p>
                  )}

                  <div className="description">
                    <p
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                    {project.keyPoints && project.keyPoints.length > 0 && (
                      <ul className="keyPoints">
                        {project.keyPoints.map((point, pointIdx) => (
                          <li
                            key={pointIdx}
                            dangerouslySetInnerHTML={{ __html: point }}
                          />
                        ))}
                      </ul>
                    )}
                    <div className="caseStudyAndTechWrapper">
                      {project.caseStudy && (
                        <button
                          type="button"
                          className="caseStudyToggle"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedCaseStudy(project.id);
                          }}
                        >
                          View case study
                        </button>
                      )}
                      <div className="techIcons">
                        {project.tech.split(" · ").map((tech) => {
                          const IconComponent = techIcons[tech.trim()];
                          return (
                            <div key={tech} className="techIcon group">
                              {IconComponent ? (
                                <div
                                  className="techIconWrapper"
                                  title={tech.trim()}
                                  role="img"
                                  aria-label={tech.trim()}
                                >
                                  <IconComponent className="techIconSvg" />
                                  <span className="techIconTooltip">
                                    {tech.trim()}
                                  </span>
                                </div>
                              ) : (
                                <span className="techIconText">
                                  {tech.trim()}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        <span>Code</span>
                        <SiGithub className="linkIcon" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Full size preview"
              fill
              quality={100}
              className="modalImage"
              sizes="100vw"
            />
            <button
              className="modalClose"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {selectedCaseStudy &&
        (() => {
          const project = projects.find((p) => p.id === selectedCaseStudy);
          if (!project?.caseStudy) return null;

          return (
            <div
              className="modal caseStudyModal"
              onClick={() => setSelectedCaseStudy(null)}
              onWheel={(e) => {
                const target = e.currentTarget.querySelector(
                  ".caseStudyModalContent"
                ) as HTMLElement;
                if (!target) return;

                const { scrollTop, scrollHeight, clientHeight } = target;
                const isAtTop = scrollTop === 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

                // Prevent page scroll when modal is at top/bottom
                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onTouchMove={(e) => {
                // Prevent body scroll on touch devices
                const target = e.currentTarget.querySelector(
                  ".caseStudyModalContent"
                ) as HTMLElement;
                if (!target) return;

                const { scrollTop, scrollHeight, clientHeight } = target;
                const isAtTop = scrollTop === 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

                if (
                  (isAtTop && e.touches[0].clientY > 0) ||
                  (isAtBottom && e.touches[0].clientY < 0)
                ) {
                  e.stopPropagation();
                }
              }}
            >
              <div
                className="modalContent caseStudyModalContent"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modalClose"
                  onClick={() => setSelectedCaseStudy(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="caseStudy">
                  <h3 className="caseStudyTitle">{project.caseStudy.title}</h3>
                  {project.caseStudy.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="caseStudySection">
                      {section.heading && (
                        <h4 className="caseStudyHeading">{section.heading}</h4>
                      )}
                      <p
                        className="caseStudyContent"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="caseStudyBullets">
                          {section.bullets.map((bullet, bulletIdx) => (
                            <li
                              key={bulletIdx}
                              dangerouslySetInnerHTML={{ __html: bullet }}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
    </section>
  );
}
