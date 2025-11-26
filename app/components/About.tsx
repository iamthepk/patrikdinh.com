"use client";

import { techStack } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";
import { motion } from "framer-motion";

// Apple-style easing curves
const appleEase = [0.25, 0.1, 0.25, 1] as const; // Smooth, elegant easing

// Variants pro scroll animace
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: appleEase,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const iconItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
    },
  },
};

export default function About() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-[1300px] mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-6xl font-black tracking-tight heading-spacing"
          style={{ color: "var(--text)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          About
        </motion.h2>

        <div className="flex flex-col gap-12">
          <motion.p
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight"
            style={{ color: "var(--text)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            I build full-stack web apps that actually get used - from POS
            workflows and invoicing to AI-powered automation.
          </motion.p>

          <motion.p
            className="text-2xl md:text-3xl font-normal leading-[1.5]"
            style={{ color: "var(--text)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              ...fadeInUp,
              visible: {
                ...fadeInUp.visible,
                transition: {
                  ...fadeInUp.visible.transition,
                  delay: 0.2,
                },
              },
            }}
          >
            Right now I&apos;m focused on combining React/Node with modern AI
            APIs to automate routine tasks and improve real-time collaboration.
          </motion.p>

          {/* Tech Stack Icons */}
          <motion.div
            className="mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <ul className="flex flex-wrap gap-4 md:gap-6">
              {techStack.primary.map((tech, index) => {
                const IconComponent = techIcons[tech];
                return (
                  <motion.li
                    key={tech}
                    className="relative group"
                    variants={iconItem}
                  >
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
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
