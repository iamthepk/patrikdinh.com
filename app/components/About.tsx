"use client";

import { techStack } from "../lib/projects";
import { techIcons } from "../lib/tech-icons";
import { motion } from "framer-motion";

const appleEase = [0.25, 0.1, 0.25, 1] as const;

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
          <motion.div
            className="grid gap-10 grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] xl:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h3
                className="text-2xl md:text-3xl font-semibold mb-5"
                style={{ color: "var(--text)" }}
              >
                About me
              </h3>
              <div className="flex flex-col gap-6 max-w-[1000px]">
                <p
                  className="text-2xl md:text-3xl font-normal leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  I got into software because I like figuring things out and
                  making them actually useful. Most of what I build lives
                  somewhere between internal tools, automation and practical
                  systems for day-to-day work, usually in places where generic
                  software does not fit very well.
                </p>

                <p
                  className="text-2xl md:text-3xl font-normal leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  I use AI tools a lot, but I am not interested in just getting
                  an app on the screen and calling it finished. I care about the
                  parts that decide whether something is actually usable:
                  security, testing, validation, reliability, and whether it
                  still makes sense once real people start depending on it.
                </p>

                <p
                  className="text-2xl md:text-3xl font-normal leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  I am still early in my career, so I am learning constantly.
                  But I already know I work best when I can take a messy problem,
                  break it down, build something practical, and keep improving it
                  as it gets used in the real world.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-10"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  What I do
                </h3>
                <p
                  className="text-xl md:text-2xl leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  I build internal tools, automation and full-stack web apps for
                  workflows that need more than a generic template.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  Who I&apos;m useful for
                </h3>
                <p
                  className="text-xl md:text-2xl leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  People who have a real workflow problem, not just a vague app
                  idea, and want someone who can turn it into something practical
                  and usable.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  Where I&apos;m still growing
                </h3>
                <p
                  className="text-xl md:text-2xl leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  Most of the systems I have built so far were built
                  independently, so one area I am still growing in is the team
                  side of software development - code reviews, shared ownership
                  and larger engineering workflows.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  A small truth
                </h3>
                <p
                  className="text-xl md:text-2xl leading-[1.6]"
                  style={{ color: "var(--text)" }}
                >
                  I probably spend more time thinking about edge cases than is
                  healthy.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <ul className="flex flex-wrap gap-4 md:gap-6">
              {techStack.primary.map((tech) => {
                const IconComponent = techIcons[tech];
                return (
                  <motion.li
                    key={tech}
                    className="relative group"
                    variants={iconItem}
                  >
                    {IconComponent ? (
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 cursor-pointer uiTooltip uiTooltipTop"
                        style={{ color: "var(--text)" }}
                        data-tooltip={tech}
                        role="img"
                        aria-label={tech}
                      >
                        <IconComponent
                          className="w-full h-full"
                          style={{ color: "inherit" }}
                        />
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
