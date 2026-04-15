export type CvProject = {
  title: string;
  subtitle?: string;
  stack?: string[];
  summary: string;
};

export type CvExperience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type CvEducation = {
  school: string;
  program: string;
  period?: string;
  details?: string[];
};

export type CvData = {
  basics: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    website: string;
    github: string;
    linkedin?: string;
  };
  profile: string;
  strengths: string[];
  technologies: string[];
  projects: CvProject[];
  experience: CvExperience[];
  education: CvEducation[];
  languages: string[];
};

export const cvData: CvData = {
  basics: {
    name: "Patrik Dinh",
    title: "Full-stack Developer focused on internal systems, automation and AI tools",
    location: "Prague, Czech Republic",
    phone: "+420 720 279 090",
    email: "me@patrikdinh.com",
    website: "https://patrikdinh.com",
    github: "https://github.com/iamthepk",
    linkedin: "https://linkedin.com/in/dinhpatrik",
  },

  profile:
    "I build internal systems, workflow automation and AI-assisted tools for real business use. My background in finance and operations helps me design software around messy workflows, validation and the constraints of day-to-day production use. I am most useful in environments where software needs to support real operations, reduce manual work and stay reliable once people start depending on it. I care about practical systems, clear logic and whether the final solution actually holds up in everyday use.",

  strengths: [
    "Internal systems for real operational workflows",
    "Workflow automation, validation and reliability",
    "Turning messy business processes into usable software",
    "Building tools that hold up in daily production use",
  ],

  technologies: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Supabase",
    "REST APIs",
    "Git",
    "Vercel",
  ],

  projects: [
    {
      title: "Lootea Operations System",
      subtitle: "Production system built around real daily cafe operations.",
      stack: ["React", "TypeScript", "PostgreSQL", "Supabase"],
      summary:
        "Built and evolved a production system combining POS, local printing, stock, recipes, reporting, shifts, invoices and back-office workflows into one platform used in daily operation.",
    },
    {
      title: "Invoice AI Extractor",
      subtitle: "AI-assisted invoice extraction for structured accounting workflows.",
      stack: ["Next.js", "TypeScript", "Gemini API"],
      summary:
        "Built a tool that converts invoice PDFs into validated JSON with correction logic for VAT, dates and accounting fields, designed for downstream ERP use rather than demo output.",
    },
    {
      title: "Voucher Generator",
      subtitle: "Batch PDF voucher generation with precision and production safeguards.",
      stack: ["Next.js", "TypeScript", "Supabase", "PDFKit"],
      summary:
        "Built a voucher generation tool with live preview, sequential logic and separate DEMO and PROD modes, designed for reliable campaign workflows and print accuracy.",
    },
    {
      title: "Print Agent",
      subtitle: "Local integration layer connecting a cloud POS with physical printers.",
      stack: ["Node.js", "Express"],
      summary:
        "Built a local desktop service that handles receipt and label printing without browser dialogs or manual steps, bridging cloud POS workflows with in-store hardware.",
    },
  ],

  experience: [
    {
      company: "We Are Lootea s. r. o.",
      role: "Finance & Operations",
      period: "2021 - Present",
      bullets: [
        "Work in a live business environment where software, reporting and operational correctness have direct day-to-day impact.",
        "Translate workflow problems from finance and operations into practical system requirements and software improvements.",
        "Contribute to internal tools and process design with strong focus on reliability, clarity and production usability.",
        "Built practical context around data validation, financial logic and operational edge cases that directly informs the software I build.",
      ],
    },
    {
      company: "BoBoQ Czech",
      role: "Co-Founder / Operations Lead",
      period: "Jan 2020 - Aug 2021",
      bullets: [
        "Helped build the Czech branch from the ground up and set up workflows for a business combining wholesale supply with an in-house bar operation.",
        "Handled pricing, invoicing, purchasing, goods logistics and daily operational coordination in a fast-moving environment.",
        "Gained direct experience with process friction, data flow issues and operational constraints that later shaped my approach to internal tools and automation.",
      ],
    },
    {
      company: "Vinatrans s.r.o.",
      role: "Operations Manager",
      period: "2015 - 2020",
      bullets: [
        "Managed purchasing, pricing, reporting and daily operational coordination.",
        "Worked across logistics, warehouse processes and operational problem-solving in a live business environment.",
        "Built strong practical understanding of process design, information flow and the importance of dependable systems in day-to-day work.",
      ],
    },
    {
      company: "G4S Cash Solutions a. s.",
      role: "Team Leader",
      period: "2014 - 2015",
      bullets: [
        "Led a team, planned shift coverage and coordinated daily operational activities.",
        "Prepared documentation, handled issue resolution and worked in an environment where accuracy and reliability mattered.",
      ],
    },
  ],

  education: [
    {
      school: "Euroskola Prague",
      program: "Economics and Management",
    },
    {
      school: "Independent study",
      program: "Programming",
      details: [
        "Backend fundamentals",
        "Databases",
        "Cloud services",
        "JavaScript / TypeScript",
      ],
    },
    {
      school: "",
      program: "Accounting and tax studies",
      details: ["Financial accounting", "Payroll accounting"],
    },
  ],

  languages: ["Czech - Native", "English - Working proficiency"],
};
