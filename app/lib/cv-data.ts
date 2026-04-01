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
    title: "Software Developer",
    location: "Praha, Česká republika",
    phone: "+420 720 279 090",
    email: "me@patrikdinh.com",
    website: "https://patrikdinh.com",
    github: "https://github.com/iamthepk",
    linkedin: "https://linkedin.com/in/dinhpatrik",
  },

  profile:
    "Vyvíjím interní nástroje a aplikace pro reálný provoz se zaměřením na automatizaci, práci s daty a zefektivnění každodenních workflow. Mám zkušenost s návrhem a rozvojem business aplikací, document processing nástrojů i lokálních integračních služeb. V technických řešeních propojuji produktové uvažování, znalost provozu a důraz na použitelnost, logiku a spolehlivost.",

  strengths: [
    "návrh a rozvoj interních nástrojů pro reálný provoz",
    "analytické a systémové myšlení",
    "automatizace workflow a zpracování dat",
    "schopnost převést byznysový problém do funkčního software řešení",
    "pečlivost, validace dat a důraz na správnost výstupů",
    "rychlá orientace v aplikační logice a existujícím kódu",
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
    "Vercel",
    "REST API",
    "PDF generation",
    "Gemini API",
    "Git",
    "GitHub",
  ],

  projects: [
    {
      title: "Lootea Operations System",
      subtitle: "Interní systém postavený pro reálný každodenní provoz kavárny.",
      stack: ["React", "TypeScript", "PostgreSQL", "Supabase"],
      summary:
        "In-house operations systém spojující POS, lokální tisk, sklad, receptury, reporting, směny, faktury a další provozní workflow do jednoho produkčního řešení používaného každý den.",
    },
    {
      title: "Invoice AI Extractor",
      subtitle: "Nástroj pro automatickou extrakci dat z PDF faktur do strukturovaného výstupu.",
      stack: ["Next.js", "TypeScript", "Gemini API"],
      summary:
        "Aplikace pro parsování faktur do jednotného JSON schema s validační a korekční logikou pro DPH, data a účetní pole. Výstup je připravený pro návazné interní ERP workflow.",
    },
    {
      title: "Voucher Generator",
      subtitle: "Nástroj pro dávkové generování voucherů s důrazem na přesnost a bezpečný workflow.",
      stack: ["Next.js", "TypeScript", "Supabase", "PDFKit"],
      summary:
        "Aplikace pro generování print-ready voucherů v PDF s live preview, sekvenční logikou a oddělenými DEMO a PROD režimy. Navrženo pro přesné kampaně a spolehlivou práci s daty.",
    },
    {
      title: "Print Agent",
      subtitle: "Lokální integrační vrstva mezi cloudovým POS a fyzickými tiskárnami.",
      stack: ["Node.js", "Express"],
      summary:
        "Desktop service běžící na lokálním Windows zařízení, která zajišťuje tisk účtenek a štítků bez browser dialogů a manuálních kroků. Řeší propojení cloudového workflow s lokálním hardwarem v reálném provozu.",
    },
  ],

  experience: [
    {
      company: "We Are Lootea s. r. o.",
      role: "Finance & Operations",
      period: "2021 – současnost",
      bullets: [
        "Práce s daty, reportingem a kontrolou správnosti údajů.",
        "Nastavování procesů a řešení provozních problémů.",
        "Spolupráce na návrhu a rozvoji interních systémů.",
        "Zkušenost s prostředím, kde technická řešení přímo podporují každodenní provoz firmy.",
      ],
    },
    {
      company: "Vinatrans s.r.o.",
      role: "Operations Manager",
      period: "2015 – 2020",
      bullets: [
        "Plánování nákupů, cenotvorba a finanční reporting.",
        "Koordinace provozních procesů, logistiky a skladového hospodářství.",
        "Vedení týmu a řešení operativních problémů.",
      ],
    },
    {
      company: "G4S Česká republika",
      role: "Vedoucí týmu",
      period: "2014 – 2015",
      bullets: [
        "Vedení týmu a plánování směn.",
        "Příprava dokumentace a koordinace provozních činností.",
        "Řešení požadavků a problémů klientů.",
      ],
    },
  ],

  education: [
    {
      school: "Euroškola Praha",
      program: "Ekonomika a management (maturita)",
    },
    {
      school: "Samostudium",
      program: "Webový vývoj, databáze, backend a automatizace",
      details: [
        "TypeScript / JavaScript",
        "práce s databázemi",
        "základy backendového vývoje",
        "cloudové služby a moderní webové aplikace",
      ],
    },
  ],

  languages: ["Čeština – rodilý mluvčí", "Angličtina – středně pokročilá"],
};
