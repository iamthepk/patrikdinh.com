"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import {
  PLACEHOLDER_THUMBNAIL,
  projects,
  type ProjectThumbnail,
} from "../lib/projects";
import { techIcons } from "../lib/tech-icons";
import type { Theme } from "../lib/theme";
import { useTheme } from "../lib/theme-provider";
import Modal from "./Modal";
import { PrintAgentFlowAnimation } from "./PrintAgentFlowAnimation";
import { RichText } from "./RichText";
import "./Projects.css";

const appleEase = [0.25, 0.1, 0.25, 1] as const;

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

type ActiveModal =
  | {
      type: "image";
      imageSrc: string;
      alt: string;
    }
  | {
      type: "case-study";
      projectId: string;
    }
  | null;

function getThumbnailSrc(thumbnail: ProjectThumbnail, theme: Theme) {
  if (theme === "dark") {
    return thumbnail.dark ?? thumbnail.default;
  }

  return thumbnail.light ?? thumbnail.default;
}

export default function Projects() {
  const { theme } = useTheme();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const caseStudyProject =
    activeModal?.type === "case-study"
      ? projects.find((project) => project.id === activeModal.projectId)
      : null;

  const closeModal = () => {
    setActiveModal(null);
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openImagePreview = (imageSrc: string, alt: string) => {
    setActiveModal({
      type: "image",
      imageSrc,
      alt,
    });
  };

  return (
    <section id="work" className="section-padding section-spacing">
      <div className="projects-shell">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight heading-spacing heading">
          Work
        </h2>

        <p className="projectsIntro">
          Real systems built for everyday use, not just portfolio demos.
        </p>

        <p className="projectsDisclosure">
          What you see here are public-facing versions of larger production
          systems. I share enough to explain the thinking and the work, but not
          the private logic, prompts and internal workflows behind them.
        </p>

        <motion.div
          className="project-spacing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={projectContainerVariants}
        >
          {projects.map((project, index) => {
            const isPrintAgent = project.previewType === "print-agent-flow";
            const thumbnail = project.thumbnail ?? PLACEHOLDER_THUMBNAIL;
            const themedThumbnailPath = getThumbnailSrc(thumbnail, theme);
            const isPlaceholderThumbnail =
              themedThumbnailPath === getThumbnailSrc(PLACEHOLDER_THUMBNAIL, theme);
            const showPreview = isPrintAgent || Boolean(project.thumbnail);

            return (
              <motion.div
                id={`project-${project.id}`}
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
                  {showPreview && (
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
                      {isPrintAgent ? (
                        <div className="thumbnailContainer">
                          <div className="thumbnailImageWrapper">
                            <PrintAgentFlowAnimation isThumbnail={true} />
                            <div className="gradientOverlay" />
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={`thumbnailContainer thumbnailButton group${
                            isPlaceholderThumbnail
                              ? " thumbnailContainerPlaceholder"
                              : ""
                          }`}
                          onClick={() => {
                            if (project.liveUrl) {
                              openUrl(project.liveUrl);
                              return;
                            }

                            openImagePreview(
                              themedThumbnailPath,
                              `${project.title} preview`
                            );
                          }}
                          aria-label={
                            project.liveUrl
                              ? `Open ${project.title} live preview`
                              : `Open ${project.title} image preview`
                          }
                        >
                          <div
                            className={`thumbnailImageWrapper${
                              isPlaceholderThumbnail
                                ? " thumbnailImageWrapperPlaceholder"
                                : ""
                            }`}
                          >
                            <Image
                              src={themedThumbnailPath}
                              alt={`${project.title} preview`}
                              fill
                              quality={90}
                              className={`thumbnailImage ${
                                theme === "dark" ? "thumbnailImageDark" : ""
                              } ${
                                isPlaceholderThumbnail
                                  ? "thumbnailImagePlaceholder"
                                  : ""
                              }`}
                              sizes="(max-width: 1023px) 100vw, 55vw"
                              priority={project.id === projects[0]?.id}
                            />
                            <div className="gradientOverlay" />
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}

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
                      <p>
                        <RichText value={project.description} />
                      </p>

                      {project.keyPoints && project.keyPoints.length > 0 && (
                        <ul className="keyPoints">
                          {project.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex}>
                              <RichText value={point} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {project.challenge && (
                        <p className="projectChallenge">
                          <span className="projectChallengeLabel">
                            Challenge:
                          </span>{" "}
                          {project.challenge}
                        </p>
                      )}

                      <div className="caseStudyAndTechWrapper">
                        {project.caseStudy && (
                          <button
                            type="button"
                            className="caseStudyToggle"
                            aria-haspopup="dialog"
                            onClick={() =>
                              setActiveModal({
                                type: "case-study",
                                projectId: project.id,
                              })
                            }
                          >
                            View case study
                          </button>
                        )}

                        <div className="techIcons">
                          {project.tech.map((tech) => {
                            const IconComponent = techIcons[tech];

                            return (
                              <div key={tech} className="techIcon group">
                                {IconComponent ? (
                                  <div
                                    className="techIconWrapper uiTooltip uiTooltipTop"
                                    data-tooltip={tech}
                                    role="img"
                                    aria-label={tech}
                                  >
                                    <IconComponent className="techIconSvg" />
                                  </div>
                                ) : (
                                  <span className="techIconText">{tech}</span>
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
            );
          })}
        </motion.div>
      </div>

      <Modal
        isOpen={activeModal?.type === "image"}
        onClose={closeModal}
        ariaLabel={
          activeModal?.type === "image"
            ? activeModal.alt
            : "Project image preview"
        }
        closeLabel="Close image preview"
        panelClassName="projectImageModalContent"
        bodyClassName="projectImageModalBody"
        closeButtonClassName="projectImageModalClose"
      >
        {activeModal?.type === "image" && (
          <div className="projectImageFrame">
            <Image
              src={activeModal.imageSrc}
              alt={activeModal.alt}
              fill
              quality={95}
              className="modalImage"
              sizes="100vw"
            />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={Boolean(caseStudyProject?.caseStudy)}
        onClose={closeModal}
        ariaLabel={
          caseStudyProject?.caseStudy?.title ?? "Project technical case study"
        }
        closeLabel="Close case study"
        panelClassName="caseStudyModalContent"
        bodyClassName="caseStudyModalBody"
      >
        {caseStudyProject?.caseStudy && (
          <div className="caseStudy">
            <h3 className="caseStudyTitle">{caseStudyProject.caseStudy.title}</h3>
            {caseStudyProject.caseStudy.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="caseStudySection">
                {section.heading && (
                  <h4 className="caseStudyHeading">
                    <RichText value={section.heading} />
                  </h4>
                )}
                <p className="caseStudyContent">
                  <RichText value={section.content} />
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="caseStudyBullets">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>
                        <RichText value={bullet} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </section>
  );
}
