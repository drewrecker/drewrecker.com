// Single source of truth for the resume. Edit here; every section renders from this.

export type Role = {
  title: string;
  org: string;
  start: string;
  end: string;
  current?: boolean;
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

export type Volunteer = {
  role: string;
  org: string;
  when: string;
};

export type Conference = {
  name: string;
  location: string;
  year: string;
};

export const profile = {
  name: "Drew Recker",
  title: "Cybersecurity Program Management Professional",
  tagline:
    "Experienced leader in the cybersecurity space with team leadership, project execution lifecycle, and helping implement experimental technical solutions",
  email: "drew@drewrecker.com",
  photo: "/img/drew.webp",
  site: "https://drewrecker.com",
} as const;

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/drewrecker" },
  { name: "YouTube", href: "https://www.youtube.com/@DrewRecker" },
  { name: "Instagram", href: "https://www.instagram.com/drewrecker/" },
  { name: "X", href: "https://x.com/drewwrecker" },
  { name: "IMDb", href: "https://www.imdb.com/name/nm5326245/" },
  { name: "Linktree", href: "https://linktr.ee/drewrecker" },
] as const;

export const summary: string[] = [
  "Cybersecurity experience in threat analysis, computer and network security, vulnerability scanning, Splunk, WireShark, and Metasploit. Software development experience with C++, C#, Python, Java, PowerShell + Bash scripting, and agile development tools. Experience in DevSecOps environment utilizing software build pipelines, automated code scanning, unit test frameworks, Integrated Ground and Flight Test, experience Software Bill of Materials (SBOM), and Chaos Engineering (Site Reliability Engineering [SRE]) tools.",
  "Lead Technical Program Manager for multiple million-dollar contracts at Lockheed Martin for Cybersecurity tasks. I lead a team of Cybersecurity professionals, working towards NIST 800.53 RMF Approvals (ATO, ATC, IATT, CDS). I submit proposals, plan program activities, and execute multiple contracts across Lockheed Martin Skunkworks on their Joint All-Domain Operations (JADO) Team. Experienced leader and team management professional.",
  "I am a Cybersecurity professional with a Master's of Science in Cybersecurity from Southern Methodist University and a Bachelor's Degree focused in Cyber Intelligence and Security from Embry-Riddle Aeronautical University with a minor in computer engineering.",
];

export const experience: Role[] = [
  {
    title: "Technical Program Management Staff",
    org: "Lockheed Martin SkunkWorks",
    start: "November 2022",
    end: "Present",
    current: true,
  },
  {
    title: "Senior Cyber Software Engineer",
    org: "Lockheed Martin",
    start: "September 2021",
    end: "November 2022",
  },
  {
    title: "Cyber Software Engineer",
    org: "Lockheed Martin",
    start: "April 2020",
    end: "September 2021",
  },
  {
    title: "Cybersecurity Engineer Asc",
    org: "Lockheed Martin",
    start: "June 2019",
    end: "April 2020",
  },
  {
    title: "Cybersecurity Analyst",
    org: "SAP Fieldglass",
    start: "June 2018",
    end: "May 2019",
  },
  {
    title: "Teaching Assistant",
    org: "Embry-Riddle Aeronautical University",
    start: "January 2019",
    end: "May 2019",
  },
  {
    title: "Home Appliance Sales Consultant",
    org: "Sears",
    start: "November 2012",
    end: "June 2019",
  },
  {
    title: "At-Home Advisor",
    org: "Apple",
    start: "June 2014",
    end: "July 2015",
  },
];

export const credentials: Credential[] = [
  { name: "US DoD Clearance", detail: "More information can be provided" },
  { name: "CompTIA Security+", detail: "Issued January 2020" },
  { name: "Splunk Certified User", detail: "Issued June 2018" },
];

export const education: School[] = [
  {
    degree: "M.S. Cybersecurity",
    org: "Southern Methodist University",
    span: "Spring 2020 — Spring 2024",
  },
  {
    degree: "B.S. Cyber Intelligence and Security",
    org: "Embry-Riddle Aeronautical University",
    span: "Fall 2016 — May 2019",
    notes: ["Minor in Computer Science", "Distinguished Graduate", "Cum Laude"],
  },
];

export const volunteer: Volunteer[] = [
  {
    role: "Technical Judge Lead",
    org: "Lockheed Martin CyberQuest 2025",
    when: "March 2025",
  },
  {
    role: "Technical Judge Lead",
    org: "Lockheed Martin CyberQuest 2024",
    when: "March 2024",
  },
  {
    role: "Technical Judge Lead",
    org: "Lockheed Martin CyberQuest 2023",
    when: "March 2023",
  },
  {
    role: "Technical Judge Lead",
    org: "Lockheed Martin CyberQuest 2022",
    when: "March 2022",
  },
  { role: "Judge", org: "Solar Car Challenge 2022", when: "July 2022" },
  {
    role: "F-35 Simulator",
    org: "Engineering Week — Fort Worth Museum of Science and History",
    when: "February 2020",
  },
  {
    role: "CTF Advisor",
    org: "Embry-Riddle Aeronautical University CyberAero CTF 2019",
    when: "November 2019",
  },
  {
    role: "Red Team",
    org: "Department of Energy Cyberforce Competition",
    when: "November 2019",
  },
  {
    role: "Technical Expert",
    org: "Lockheed Martin CyberQuest 2019",
    when: "October 2019",
  },
  { role: "Judge", org: "Solar Car Challenge 2019", when: "July 2019" },
  {
    role: "President and Founder",
    org: "ERAU Cyber Defense Club",
    when: "August 2018 — May 2019",
  },
  {
    role: "Student Mentor",
    org: "Embry-Riddle Aeronautical University",
    when: "August 2018 — May 2019",
  },
  {
    role: "Visuals, Lighting, and Soundboard Support",
    org: "Desert Springs Bible Church",
    when: "June 2011 — July 2013",
  },
];

export const skills: string[] = [
  "Splunk",
  "Penetration Testing",
  "Reverse Engineering",
  "Wireshark",
  "Kali Linux",
  "IDA Pro",
  "Redline",
  "Metasploit",
  "Vulnerability Scanning",
  "DevSecOps",
  "RMF",
  "Agile",
  "Buildroot",
  "C",
  "C++",
  "Java",
  "Python",
  "RegEx",
  "Cypher",
];

export const conferences: Conference[] = [
  { name: "RSA Conference", location: "San Francisco, California", year: "2020" },
  { name: "Chaos Conference", location: "San Francisco, California", year: "2019" },
  { name: "RSA Conference", location: "San Francisco, California", year: "2019" },
  { name: "Google I/O", location: "San Francisco, California", year: "2019" },
  { name: "OWASP AppSec California", location: "Santa Monica, California", year: "2019" },
  { name: "B-Sides DFW", location: "Fort Worth, Texas", year: "2019" },
  { name: "IEEE Metrocon", location: "Fort Worth, Texas", year: "2019" },
  { name: "CactusCon", location: "Phoenix, Arizona", year: "2018" },
  { name: "ToorCon", location: "San Diego, California", year: "2018" },
  { name: "Google I/O", location: "San Francisco, California", year: "2014" },
];

export const competitions: string[] = [
  "National Cyber League",
  "Western Regional Cyber Defense Competition",
  "Hack Arizona",
  "MITRE CTF",
  "Department of Energy's Cyberforce Competition",
];
