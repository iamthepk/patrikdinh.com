"use client";

import { projects } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { useTheme } from "../lib/theme-provider";
import { useState } from "react";
import "./Projects.css";

export default function Projects() {
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Helper function to get theme-specific thumbnail path
  const getThumbnailPath = (basePath: string) => {
    if (!basePath) return basePath;

    // Extract path parts
    const pathParts = basePath.split("/");
    const filename = pathParts[pathParts.length - 1];
    const directory = pathParts.slice(0, -1).join("/");

    // Check if filename already has theme suffix
    if (filename.includes("-light.") || filename.includes("-dark.")) {
      return basePath;
    }

    // Insert theme suffix before file extension
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    const ext = filename.substring(filename.lastIndexOf("."));
    const themeFilename = `${nameWithoutExt}-${theme}${ext}`;

    return `${directory}/${themeFilename}`;
  };

  // Helper function to add theme parameter to URL
  const addThemeToUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("theme", theme);
      return urlObj.toString();
    } catch {
      // If URL is relative or invalid, append theme as query parameter
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}theme=${theme}`;
    }
  };
  return (
    <section id="work" className="section-padding section-spacing">
      <div className="max-w-5xl">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight heading-spacing heading">
          Work
        </h2>

        <div className="project-spacing">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="projectContainer">
                <div className="projectContent">
                  {/* Screenshot - Left side, adjusted height */}
                  {project.screenshot && (
                    <div className="thumbnailWrapper">
                      <div
                        className="thumbnailContainer group"
                        onClick={() => {
                          if (project.liveUrl) {
                            const urlWithTheme = addThemeToUrl(project.liveUrl);
                            window.open(
                              urlWithTheme,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          } else {
                            setSelectedImage(
                              getThumbnailPath(project.screenshot!)
                            );
                          }
                        }}
                      >
                        <div className="thumbnailImageWrapper">
                          <Image
                            src={getThumbnailPath(project.screenshot)}
                            alt=""
                            fill
                            quality={100}
                            unoptimized={true}
                            className={`thumbnailImage ${
                              theme === "dark" ? "thumbnailImageDark" : ""
                            }`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 500px, 600px"
                            priority={project.id === projects[0].id}
                          />
                          <div className="gradientOverlay" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content - Right side */}
                  <div className="content max-w-[620px]">
                    <h3 className="title">{project.title}</h3>

                    {project.subtitle && (
                      <p className="subtitle">{project.subtitle}</p>
                    )}

                    <div className="description">
                      {project.description
                        .split(". ")
                        .map((sentence, idx, array) => (
                          <p
                            key={idx}
                            className={
                              idx < array.length - 1
                                ? "descriptionParagraph"
                                : ""
                            }
                          >
                            {sentence}
                            {idx < array.length - 1 ? "." : ""}
                          </p>
                        ))}
                    </div>

                    {/* Tech Icons */}
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image */}
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
    </section>
  );
}
