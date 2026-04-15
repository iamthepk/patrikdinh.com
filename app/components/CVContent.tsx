import { cvData } from "../lib/cv-data";
import "./CV.css";

type CVContentProps = {
  mode?: "modal" | "page" | "print";
};

const formatDisplayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function CVContent({ mode = "modal" }: CVContentProps) {
  const contactItems = [
    {
      label: "Email",
      value: cvData.basics.email,
      href: `mailto:${cvData.basics.email}`,
    },
    {
      label: "Phone",
      value: cvData.basics.phone,
      href: `tel:${cvData.basics.phone.replace(/\s+/g, "")}`,
    },
    {
      label: "Location",
      value: cvData.basics.location,
    },
    {
      label: "Website",
      value: formatDisplayUrl(cvData.basics.website),
      href: cvData.basics.website,
    },
    {
      label: "GitHub",
      value: formatDisplayUrl(cvData.basics.github),
      href: cvData.basics.github,
    },
    ...(cvData.basics.linkedin
      ? [
          {
            label: "LinkedIn",
            value: formatDisplayUrl(cvData.basics.linkedin),
            href: cvData.basics.linkedin,
          },
        ]
      : []),
  ];

  return (
    <div className={`cvRoot cvRoot--${mode}`}>
      <article className="cvPaper">
        <header className="cvHero">
          <h1 className="cvHeroName">{cvData.basics.name}</h1>
          <p className="cvHeroTitle">{cvData.basics.title}</p>
        </header>

        <div className="cvDocumentGrid">
          <aside className="cvSidebar">
            <section className="cvSidebarSection">
              <h2 className="cvSidebarHeading">Contact</h2>
              <ul className="cvContactList">
                {contactItems.map((item) => (
                  <li key={item.label} className="cvContactRow">
                    <span className="cvMetaLabel">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="cvSidebarLink"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="cvSidebarText">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="cvSidebarSection">
              <h2 className="cvSidebarHeading">Core Focus</h2>
              <ul className="cvSidebarList">
                {cvData.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="cvSidebarSection">
              <h2 className="cvSidebarHeading">Tech Stack</h2>
              <ul className="cvSidebarList">
                {cvData.technologies.map((tech) => (
                  <li key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <section className="cvSidebarSection">
              <h2 className="cvSidebarHeading">Languages</h2>
              <ul className="cvSidebarList">
                {cvData.languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </section>

            <section className="cvSidebarSection">
              <h2 className="cvSidebarHeading">Education</h2>
              <div className="cvSidebarEducation">
                {cvData.education.map((item) => (
                  <article
                    key={`${item.school}-${item.program}`}
                    className={`cvEducationItem${item.school ? "" : " cvEducationItemSub"}`}
                  >
                    {item.school ? (
                      <h3 className="cvEducationSchool">{item.school}</h3>
                    ) : null}
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
          </aside>

          <div className="cvMain">
            <section className="cvMainSection">
              <h2 className="cvMainHeading">Profile</h2>
              <p className="cvProfileText">{cvData.profile}</p>
            </section>

            <section className="cvMainSection">
              <h2 className="cvMainHeading">Selected Projects</h2>
              <div className="cvProjectGrid">
                {cvData.projects.map((project) => (
                  <article key={project.title} className="cvProjectCard">
                    <h3 className="cvProjectTitle">{project.title}</h3>
                    {project.subtitle && (
                      <p className="cvProjectSubtitle">{project.subtitle}</p>
                    )}
                    {project.stack && project.stack.length > 0 && (
                      <p className="cvProjectStack">{project.stack.join(" · ")}</p>
                    )}
                    <p className="cvProjectSummary">{project.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="cvMainSection">
              <h2 className="cvMainHeading">Experience</h2>
              <div className="cvExperienceList">
                {cvData.experience.map((item) => (
                  <article
                    key={`${item.company}-${item.period}`}
                    className="cvExperienceItem"
                  >
                    <div className="cvExperienceHeader">
                      <div>
                        <h3 className="cvExperienceCompany">{item.company}</h3>
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
        </div>
      </article>
    </div>
  );
}
