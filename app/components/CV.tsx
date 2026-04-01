"use client";

import { cvData } from "../lib/cv-data";
import { motion } from "framer-motion";
import "./CV.css";

const appleEase = [0.25, 0.1, 0.25, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: appleEase,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export default function CV() {
  return (
    <section id="cv" className="cvRoot section-padding section-spacing">
      <div className="cvCompactLayout">
        <motion.header
          className="cvHeader"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <p className="cvEyebrow">Curriculum Vitae</p>
          <h2 className="cvTitle">{cvData.basics.name}</h2>
          <h3 className="cvSubtitle">{cvData.basics.title}</h3>
          <p className="cvIntro">{cvData.profile}</p>

          <div className="cvLinks">
            <a href={`mailto:${cvData.basics.email}`} className="cvLink">
              {cvData.basics.email}
            </a>
            <a
              href={cvData.basics.website}
              target="_blank"
              rel="noreferrer"
              className="cvLink"
            >
              Portfolio
            </a>
            <a
              href={cvData.basics.github}
              target="_blank"
              rel="noreferrer"
              className="cvLink"
            >
              GitHub
            </a>
            {cvData.basics.linkedin && (
              <a
                href={cvData.basics.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cvLink"
              >
                LinkedIn
              </a>
            )}
          </div>

          <div className="cvMeta">
            <span>{cvData.basics.location}</span>
            <span>{cvData.basics.phone}</span>
          </div>
        </motion.header>

        <div className="cvMainGrid">
          <motion.div
            className="cvPrimaryColumn"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <section className="cvBlock">
              <h3 className="cvSectionTitle">Vybrané projekty</h3>
              <div className="cvProjectList">
                {cvData.projects.map((project) => (
                  <motion.article
                    key={project.title}
                    className="cvProject"
                    variants={fadeInUp}
                  >
                    <div className="cvProjectHeader">
                      <h4 className="cvProjectTitle">{project.title}</h4>
                      {project.stack && project.stack.length > 0 && (
                        <p className="cvProjectStack">
                          {project.stack.join(" · ")}
                        </p>
                      )}
                    </div>

                    {project.subtitle && (
                      <p className="cvProjectSubtitle">{project.subtitle}</p>
                    )}

                    <p className="cvProjectSummary">{project.summary}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="cvBlock">
              <h3 className="cvSectionTitle">Zkušenosti</h3>
              <div className="cvExperienceList">
                {cvData.experience.map((item) => (
                  <motion.article
                    key={`${item.company}-${item.period}`}
                    className="cvExperience"
                    variants={fadeInUp}
                  >
                    <div className="cvExperienceTop">
                      <div>
                        <h4 className="cvExperienceCompany">{item.company}</h4>
                        <p className="cvExperienceRole">{item.role}</p>
                      </div>
                      <p className="cvExperiencePeriod">{item.period}</p>
                    </div>
                    <ul className="cvExperienceBullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </section>
          </motion.div>

          <motion.aside
            className="cvSidebar"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Tech stack</h3>
              <div className="cvTags">
                {cvData.technologies.map((tech) => (
                  <motion.span key={tech} className="cvTag" variants={fadeInUp}>
                    {tech}
                  </motion.span>
                ))}
              </div>
            </section>

            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Silné stránky</h3>
              <ul className="cvBulletGridCompact">
                {cvData.strengths.map((item) => (
                  <motion.li key={item} variants={fadeInUp}>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </section>

            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Vzdělání</h3>
              <div className="cvEducationListCompact">
                {cvData.education.map((item) => (
                  <motion.article
                    key={`${item.school}-${item.program}`}
                    className="cvEducationItem"
                    variants={fadeInUp}
                  >
                    <h4 className="cvEducationSchool">{item.school}</h4>
                    <p className="cvEducationProgram">{item.program}</p>
                    {item.period && (
                      <p className="cvEducationPeriod">{item.period}</p>
                    )}
                    {item.details && item.details.length > 0 && (
                      <ul className="cvEducationDetails">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Jazyky</h3>
              <ul className="cvLanguagesCompact">
                {cvData.languages.map((language) => (
                  <motion.li key={language} variants={fadeInUp}>
                    {language}
                  </motion.li>
                ))}
              </ul>
            </section>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
