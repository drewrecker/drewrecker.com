// Single source of truth for the resume. Edit here; every section renders from this.
//
// DELIBERATELY LESS SPECIFIC THAN THE PDF RESUME. This is a public, permanently
// indexed page, not a directed disclosure to a named recruiter. Keep out of it:
//   - clearance level and any special-access references ("details on request" only)
//   - program nicknames and specific program designations
//   - team sizes, campaign counts, schedule tempo
//   - specific aircraft platforms tied to cross-domain / accreditation work
//   - phone number
// Any one of those is mundane alone; assembled on one page they are a targeting
// profile. The detailed version goes out by email on request.

export type Role = {
  title: string;
  org: string;
  start: string;
  end: string;
  current?: boolean;
  points?: string[];
};

export type Credential = {
  name: string;
  detail: string;
};

export type School = {
  degree: string;
  org: string;
  span: string;
  notes?: string[];
};

export type Service = {
  role: string;
  org: string;
  when: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Drew Recker",
  title: "Technical Program Management — Mission Systems & Flight Test",
  location: "Fort Worth, Texas",
  tagline:
    "Technical program leader delivering mission systems and flight test capability across advanced air platforms, with a background in cybersecurity engineering and secure software development.",
  email: "drew@drewrecker.com",
  photo: "/img/drew.webp",
  site: "https://drewrecker.com",
} as const;

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/drewrecker" },
  { name: "GitHub", href: "https://github.com/drewrecker" },
  { name: "drewrecker.dev", href: "https://drewrecker.dev" },
  { name: "YouTube", href: "https://www.youtube.com/@DrewRecker" },
  { name: "Instagram", href: "https://www.instagram.com/drewrecker/" },
  { name: "X", href: "https://x.com/drewwrecker" },
  { name: "IMDb", href: "https://www.imdb.com/name/nm5326245/" },
  { name: "Linktree", href: "https://linktr.ee/drewrecker" },
] as const;

export const summary: string[] = [
  "Technical program leader at Lockheed Martin Skunk Works, working across mission systems, flight test, autonomy, and cybersecurity on advanced air platforms. I plan and execute flight test programs, own the security approvals that gate them, and serve as a primary technical interface to the customer.",
  "My background is engineering first. I have built open mission systems software, stood up DevSecOps pipelines and cloud infrastructure, architected cross domain solutions, and led cybersecurity engineering teams through RMF accreditation. That grounding is what lets me run technical programs from the inside rather than from a spreadsheet.",
  "I hold a Master of Science in Cybersecurity Engineering from Southern Methodist University and a Bachelor of Science in Cybersecurity from Embry-Riddle Aeronautical University, with a minor in Computer Science.",
];

export const experience: Role[] = [
  {
    title: "Software Engineer Staff",
    org: "Lockheed Martin Skunk Works",
    start: "2024",
    end: "Present",
    current: true,
    points: [
      "Deputy program manager and cybersecurity lead for an advanced autonomy flight test program supporting USAF research.",
      "Plan and execute concurrent flight test campaigns, from test management plan development through execution.",
      "Own security approvals, RMF compliance, and the cyber schedule gating flight test activity.",
      "Developed multi-ship unmanned teaming capability using Open Mission Systems (OMS) and the Universal Command and Control Interface (UCI).",
      "Contributed to the capture and award of a new IDIQ contract vehicle.",
    ],
  },
  {
    title: "Technical Program Management Staff — Cybersecurity",
    org: "Lockheed Martin Skunk Works",
    start: "2022",
    end: "2024",
    points: [
      "Led a team of cybersecurity engineers meeting requirements and approvals for flight tests, development projects, and fielding of operational assets.",
      "Architected cross domain solution implementations enabling accredited data sharing between security domains.",
      "Integrated common cyber architectures across multiple aircraft programs.",
      "Authored RFI responses and proposal content; maintained the cyber compliance schedule against contract milestones.",
    ],
  },
  {
    title: "Senior Cybersecurity Software Engineer",
    org: "Lockheed Martin Skunk Works",
    start: "2021",
    end: "2022",
    points: [
      "Developed Open Mission Systems software in a SAFe Agile environment supporting flight test preparation and execution.",
      "Established DevSecOps processes including a software delivery pipeline, government cloud infrastructure, and automated metric traceability.",
    ],
  },
  {
    title: "Cybersecurity Software Engineer",
    org: "Lockheed Martin Skunk Works",
    start: "2020",
    end: "2021",
    points: [
      "Developed Open Mission Systems software performing cross-system integration across disparate platforms.",
      "Executed flight test preparation for on-aircraft and in-lab integration events; performed security scanning and implemented STIG and SELinux policies.",
    ],
  },
  {
    title: "Cyber Systems Security Engineer, Associate",
    org: "Lockheed Martin Aeronautics",
    start: "2019",
    end: "2020",
    points: [
      "Delivered cybersecurity solutions for a major air system program, working with the government program office to ensure RMF adherence.",
      "Coordinated across government and contractor stakeholders to align cybersecurity artifacts with accreditation milestones.",
    ],
  },
  {
    title: "Cybersecurity Analyst",
    org: "SAP Fieldglass",
    start: "2018",
    end: "2019",
    points: [
      "Built Splunk detection content to identify and resolve vulnerabilities across enterprise networks and systems.",
      "Analyzed intrusion alerts and network anomalies; supported audit compliance for SOC 1, SOC 2, ISO 27001, and SSAE 16.",
    ],
  },
];

export const credentials: Credential[] = [
  { name: "Active DoD Clearance", detail: "Details available on request" },
  { name: "CompTIA CySA+", detail: "DoD 8570 IAT Level II" },
  { name: "CompTIA Security+", detail: "DoD 8570 IAT Level II" },
  { name: "Splunk Certified User", detail: "Issued June 2018" },
  { name: "FAA Class III Medical", detail: "Current" },
];

export const education: School[] = [
  {
    degree: "M.S. Cybersecurity Engineering",
    org: "Southern Methodist University",
    span: "2020 — 2024",
  },
  {
    degree: "B.S. Cybersecurity",
    org: "Embry-Riddle Aeronautical University",
    span: "2016 — 2019",
    notes: [
      "Minor in Computer Science",
      "Cum Laude",
      "Distinguished Graduate, College of Security and Intelligence",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Program",
    items: [
      "Flight Test Management",
      "Test Management Plans",
      "Capture & Proposal Support",
      "Requirements Development",
      "Customer & Stakeholder Relationships",
      "SAFe Agile",
      "Cross-Functional Team Leadership",
    ],
  },
  {
    label: "Security",
    items: [
      "Cybersecurity Architecture",
      "RMF, ATO & IATT Approvals",
      "Cross Domain Solutions",
      "STIG & SCAP",
      "Splunk",
      "Vulnerability Management",
      "Penetration Testing",
      "Reverse Engineering",
    ],
  },
  {
    label: "Engineering",
    items: [
      "Python",
      "C / C++",
      "Java",
      "Open Mission Systems (OMS)",
      "DevSecOps",
      "Government Cloud",
      "Linux & SELinux",
      "Autonomy & Unmanned Teaming",
    ],
  },
];

export const service: Service[] = [
  {
    role: "Lead Judge",
    org: "Lockheed Martin CyberQuest, Fort Worth",
    when: "2022 — 2025",
  },
  {
    role: "Judge",
    org: "Department of Energy CyberForce Competition",
    when: "2019, 2021",
  },
  { role: "Judge", org: "Solar Car Challenge", when: "2019, 2022" },
  {
    role: "F-35 Simulator Volunteer",
    org: "Engineering Week — Fort Worth Museum of Science and History",
    when: "2020",
  },
  {
    role: "Founder & President",
    org: "Cyber Defense Club, Embry-Riddle Aeronautical University",
    when: "2018 — 2019",
  },
  {
    role: "CTF Advisor",
    org: "CyberAero CTF, Embry-Riddle Aeronautical University",
    when: "2019",
  },
  {
    role: "Student Mentor",
    org: "Embry-Riddle Aeronautical University",
    when: "2018 — 2019",
  },
];

export const awards: string[] = [
  "President's Volunteer Service Award, 2020",
  "Embry-Riddle Outstanding Graduate",
];

export const competitions: string[] = [
  "National Cyber League",
  "Western Regional Cyber Defense Competition",
  "Department of Energy CyberForce Competition",
  "MITRE CTF",
  "Hack Arizona",
];
