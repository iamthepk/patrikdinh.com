import { cvData } from "../lib/cv-data";
import { SiGithub, SiLinkedin } from "react-icons/si";
import "./CV.css";

export default function CVContent() {
  return (
    <div className="cvRoot">
      <div className="cvCompactLayout">
        <header className="cvHeader">
          <p className="cvEyebrow">Curriculum Vitae</p>
          <h2 className="cvTitle">{cvData.basics.name}</h2>
          <h3 className="cvSubtitle">{cvData.basics.title}</h3>
          <p className="cvIntro">{cvData.profile}</p>

          <div className="cvLinks">
            <a href={`mailto:${cvData.basics.email}`} className="cvLink">
              {cvData.basics.email}
            </a>
            <a
              href={cvData.basics.github}
              target="_blank"
              rel="noreferrer"
              className="cvIconLink"
              aria-label="GitHub"
            >
              <SiGithub />
            </a>
            {cvData.basics.linkedin && (
              <a
                href={cvData.basics.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cvIconLink"
                aria-label="LinkedIn"
              >
                <SiLinkedin />
              </a>
            )}
          </div>

          <div className="cvMeta">
            <span>{cvData.basics.location}</span>
            <span>{cvData.basics.phone}</span>
          </div>
        </header>

        <div className="cvMainGrid">
          <div className="cvPrimaryColumn">
            <section className="cvBlock">
              <h3 className="cvSectionTitle">Vybrané projekty</h3>
              <div className="cvProjectList">
                {cvData.projects.map((project) => (
                  <article key={project.title} className="cvProject">
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
                  </article>
                ))}
              </div>
            </section>

            <section className="cvBlock">
              <h3 className="cvSectionTitle">Zkušenosti</h3>
              <div className="cvExperienceList">
                {cvData.experience.map((item) => (
                  <article
                    key={`${item.company}-${item.period}`}
                    className="cvExperience"
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
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="cvSidebar">
            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Tech stack</h3>
              <div className="cvTags">
                {cvData.technologies.map((tech) => (
                  <span key={tech} className="cvTag">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Silné stránky</h3>
              <ul className="cvBulletGridCompact">
                {cvData.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Vzdělání</h3>
              <div className="cvEducationListCompact">
                {cvData.education.map((item) => (
                  <article
                    key={`${item.school}-${item.program}`}
                    className="cvEducationItem"
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
                  </article>
                ))}
              </div>
            </section>

            <section className="cvBlock cvSidebarBlock">
              <h3 className="cvSectionTitle">Jazyky</h3>
              <ul className="cvLanguagesCompact">
                {cvData.languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
