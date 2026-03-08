import "./App.css";
import React from "react";
import {
  AtSign,
  Briefcase,
  User,
  Plane,
  ChefHat,
  Dumbbell,
  Gamepad2,
  Github,
  GraduationCap,
  Volleyball,
  HomeIcon,
  Linkedin,
  Phone,
  Sparkles,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { ExperienceCard } from "./components/custom/experience";
import { SkillBadge } from "./components/custom/skill-badge";
import { cvData } from "./data/cv";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { useReactToPrint } from "react-to-print";

const useLanguage = () => {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const toggleLanguage = () => setLang(lang === "fr" ? "en" : "fr");
  return { lang, toggleLanguage };
};

function App() {
  const { lang, toggleLanguage } = useLanguage();

  const data = cvData[lang];

  const a4PageStyle = `
    @page { size: A4; margin: 0; }
    @media print { html, body { height: 100%; margin: 0 !important; padding: 0 !important; } }
  `;

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `CV_${data.name.replace(/\s+/g, "_")}_${lang.toUpperCase()}`,
    pageStyle: a4PageStyle,
  });

  const plainPrintRef = useRef<HTMLDivElement>(null);
  const handlePlainPrint = useReactToPrint({
    contentRef: plainPrintRef,
    documentTitle: `CV_${data.name.replace(/\s+/g, "_")}_${lang.toUpperCase()}_Classic`,
    pageStyle: a4PageStyle,
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Main app: hide in print */}
      <div className="flex min-h-screen no-print flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-[24%] bg-slate-100 dark:bg-slate-950 p-3 lg:p-4 flex flex-col gap-2.5 border-r border-slate-200 dark:border-slate-700 lg:sticky lg:top-0 lg:self-start">
          {/* Controls */}
          <div className="flex flex-col gap-1.5 no-print pb-2 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <ModeToggle />
              <Button
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={toggleLanguage}
                aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
              >
                {lang === "fr" ? "EN" : "FR"}
              </Button>
            </div>
            <div className="flex items-center gap-1 w-full">
              <Button
                variant="outline"
                className="h-7 px-2 text-xs gap-1 flex-1"
                onClick={handlePrint}
                aria-label="Export CV as PDF"
              >
                <Download size="12" />
                PDF
              </Button>
              <Button
                variant="outline"
                className="h-7 px-2 text-xs gap-1 flex-1"
                onClick={handlePlainPrint}
                aria-label="Export classic CV as PDF"
              >
                <FileText size="12" />
                Classic
              </Button>
            </div>
          </div>

          {/* Photo + name + title */}
          <div className="flex flex-col items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
            <img
              src={`${import.meta.env.BASE_URL}res/photo.jpg`}
              className="rounded-xl w-36 h-36 object-cover ring-2 ring-blue-600 dark:ring-blue-400 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-950"
              alt={data.name}
            />
            <div className="text-center">
              <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{data.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{data.title}</p>
            </div>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-1.5 py-2 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === "fr" ? "Informations personnelles" : "Personal Information"}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <HomeIcon size="16" className="text-slate-500" /> {data.location}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size="16" className="text-slate-500" /> {data.phone}
            </div>
            <a
              href={`mailto:${data.mail}?subject=You are Hired !`}
              className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AtSign size="16" className="text-slate-500" /> {data.mail}
            </a>
            <a
              href={`https://www.linkedin.com/in/${data.linkedin}/`}
              className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size="16" className="text-slate-500" /> {data.linkedinLabel ?? data.linkedin}
            </a>
            <a
              href={`https://github.com/${data.github}`}
              className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size="16" className="text-slate-500" /> /{data.github}
            </a>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-3 py-2 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === "fr"
                  ? "Compétences | Vision & ML"
                  : "Skills | Vision & ML"}
              </h3>
              <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
                {data.skills.ml.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === "fr"
                  ? "Compétences | Langages & DevOps"
                  : "Skills | Languages & DevOps"}
              </h3>
              <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
                {data.skills.devops.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === "fr"
                  ? "Compétences | LLM & Agents"
                  : "Skills | LLM & Agents"}
              </h3>
              <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
                {data.skills.llmAgents.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-2 py-2 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === "fr" ? "Langues" : "Languages"}
            </h3>
            <div className="flex flex-col gap-1.5">
              {data.skills.languages.map((l, index) => {
                const match = l.match(/^(.+?)\s+\((.+)\)$/);
                const name = match ? match[1] : l;
                const level = match ? match[2] : null;
                return (
                  <div key={index} className="flex items-baseline gap-1.5">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{name}</span>
                    {level && <span className="text-xs italic text-slate-400 dark:text-slate-500">({level})</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interests */}
          {data.hobbies.length > 0 && (
            <div className="flex flex-col gap-1.5 py-2 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex gap-1 items-center">
                <Sparkles size="12" /> {lang === "fr" ? "Centres d'intérêt" : "Hobbies"}
              </h3>
              {data.hobbies.map((hobby, index) => {
                const hobbyIcons: { [key: string]: React.JSX.Element } = {
                  "Voyage & exploration": <Plane size="14" />,
                  "Travel & exploration": <Plane size="14" />,
                  "E-sport": <Gamepad2 size="14" />,
                  "E-sports": <Gamepad2 size="14" />,
                  Musculation: <Dumbbell size="14" />,
                  "Weight training": <Dumbbell size="14" />,
                  Cuisine: <ChefHat size="14" />,
                  Cooking: <ChefHat size="14" />,
                  "Volley-ball": <Volleyball size="14" />,
                  Volleyball: <Volleyball size="14" />,
                };
                return (
                  <div key={index} className="flex gap-1 items-center text-sm">
                    {hobbyIcons[hobby] || <Sparkles size="14" />}
                    {hobby}
                  </div>
                );
              })}
            </div>
          )}

          {data.publications.length > 0 && (
            <div className="flex flex-col gap-1.5 py-2 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <BookOpen size="12" />
                Publications
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                {data.publications.map((pub, index) => (
                  <div key={index}>
                    <strong>
                      {pub.year} - {pub.title}
                    </strong>
                    <p>{pub.description}</p>
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-1"
                    >
                      {lang === "fr" ? "Visiter le site" : "Visit website"}
                      <ExternalLink size="12" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div className="flex flex-col gap-2 py-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Github size="12" />
                {lang === "fr" ? "Projets personnels" : "Personal Projects"}
              </h3>
              <div className="flex flex-col gap-2">
                {data.projects.map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 border-l-2 border-emerald-500 dark:border-emerald-400 rounded-r-md bg-emerald-50/60 dark:bg-emerald-950/30 px-3 py-2 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/60 transition-colors duration-150"
                  >
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300 group-hover:underline">
                      {project.name}
                      <ExternalLink size="11" className="opacity-60 group-hover:opacity-100" />
                    </span>
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{project.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* Main content */}
        <main className="w-full lg:flex-1 bg-white dark:bg-slate-900 text-light-text dark:text-dark-text">
          {/* Name + Title */}
          <section className="mb-4 px-4 pt-5 pb-4 border-b border-slate-200 dark:border-slate-700 bg-blue-50/60 dark:bg-blue-950/20">
            <div className="w-fit">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {data.name.toUpperCase()}
              </h1>
              <div className="w-full h-1 bg-blue-600 dark:bg-blue-400 mt-1 mb-2 rounded-full"></div>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {data.title}
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-blue-600 dark:border-blue-400 pl-3">
              {data.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="px-3 space-y-0">
            <div className="flex flex-col gap-0 w-full">
              {/* Work Experience header */}
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size="16" className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {lang === "fr" ? "Expérience professionnelle" : "Work Experience"}
                </span>
                <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Work Experience with timeline */}
              <div className="relative">
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
                {data.experiences
                  .filter((exp) => !exp.isFormation)
                  .map((exp, idx) => {
                    const isCurrent = exp.duration.includes("Présent") || exp.duration.includes("Present");
                    return (
                    <div key={"work-" + idx} className="relative pl-4">
                      {isCurrent && (
                        <div className="absolute left-[1px] top-[21px] w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-60" />
                      )}
                      <div className={`absolute left-[1px] top-[21px] w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${isCurrent ? "bg-green-500" : "bg-blue-600"}`} />
                      <ExperienceCard
                        company={exp.company}
                        position={exp.position}
                        location={exp.location}
                        duration={exp.duration}
                        icon={exp.icon}
                      >
                        <p className="text-sm mb-2 text-muted-foreground">
                          {exp.description}
                        </p>
                        <ul className="ml-4 space-y-1 text-sm text-muted-foreground text-left list-disc">
                          {exp.bullets &&
                            exp.bullets.map((bullet, bidx) => (
                              <li key={bidx}>{bullet}</li>
                            ))}
                        </ul>
                      </ExperienceCard>
                    </div>
                    );
                  })}
              </div>

              {/* Education divider */}
              <div className="flex items-center gap-2 my-4">
                <GraduationCap size="16" className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {lang === "fr" ? "Formation" : "Education"}
                </span>
                <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Education with timeline */}
              <div className="relative">
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
                {data.experiences
                  .filter((exp) => exp.isFormation)
                  .map((exp, idx) => (
                    <div key={"formation-" + idx} className="relative pl-4">
                      <div className="absolute left-[1px] top-[21px] w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
                      <ExperienceCard
                        company={exp.company}
                        position={exp.position}
                        location={exp.location}
                        duration={exp.duration}
                        icon={exp.icon}
                      >
                        <p className="text-sm mb-2 text-muted-foreground">
                          {exp.description}
                        </p>
                        <ul className="ml-4 space-y-1 text-sm text-muted-foreground text-left list-disc">
                          {exp.bullets &&
                            exp.bullets.map((bullet, bidx) => (
                              <li key={bidx}>{bullet}</li>
                            ))}
                        </ul>
                      </ExperienceCard>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Print-only layout */}
      <div ref={printRef} className="print-only">
        <div
          style={{
            display: "flex",
            width: "210mm",
            minHeight: "297mm",
            fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "9pt",
            lineHeight: "1.4",
          }}
        >
          {/* LEFT SIDEBAR */}
          <div style={{
            width: "36%",
            backgroundColor: "#0f172a",
            color: "#cbd5e1",
            padding: "32px 20px",
            flexShrink: 0,
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          } as React.CSSProperties}>
            {/* Photo */}
            <img
              src={`${import.meta.env.BASE_URL}res/photo.jpg`}
              alt={data.name}
              style={{
                width: "63%",
                aspectRatio: "1",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "8px",
                display: "block",
                margin: "0 auto 18px auto",
                border: "2px solid #1e3a5f",
              }}
            />

            {/* Contact */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "8.5pt", fontWeight: "700", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px 0", paddingBottom: "5px", borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", gap: "6px" }}>
                <User size={10} color="#60a5fa" style={{ flexShrink: 0 }} />
                Contact
              </h3>
              <div style={{ fontSize: "9pt", display: "flex", flexDirection: "column", gap: "6px", color: "#94a3b8", lineHeight: "1.4" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <HomeIcon size={11} color="#64748b" style={{ flexShrink: 0 }} />
                  {data.location}
                </span>
                <a href={`tel:${data.phone}`} style={{ color: "#94a3b8", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}>
                  <Phone size={11} color="#64748b" style={{ flexShrink: 0 }} />
                  {data.phone}
                </a>
                <a href={`mailto:${data.mail}`} style={{ color: "#94a3b8", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}>
                  <AtSign size={11} color="#64748b" style={{ flexShrink: 0 }} />
                  {data.mail}
                </a>
                <a href={`https://www.linkedin.com/in/${data.linkedin}/`} style={{ color: "#93c5fd", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}>
                  <Linkedin size={11} color="#93c5fd" style={{ flexShrink: 0 }} />
                  {data.linkedinLabel ?? data.linkedin}
                </a>
                <a href={`https://github.com/${data.github}`} style={{ color: "#93c5fd", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}>
                  <Github size={11} color="#93c5fd" style={{ flexShrink: 0 }} />
                  /{data.github}
                </a>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "8.5pt", fontWeight: "700", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px 0", paddingBottom: "5px", borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={10} color="#3b82f6" style={{ flexShrink: 0 }} />
                {lang === "fr" ? "Compétences" : "Skills"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                {[
                  { label: "Vision & ML", skills: data.skills.ml },
                  { label: lang === "fr" ? "Langages & DevOps" : "Languages & DevOps", skills: data.skills.devops },
                  { label: "LLM & Agents", skills: data.skills.llmAgents },
                ].map(({ label, skills }) => (
                  <div key={label}>
                    <p style={{ color: "#60a5fa", margin: "0 0 5px 0", fontWeight: "700", fontSize: "7pt", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {skills.map((skill, i) => (
                        <span key={i} style={{ fontSize: "8pt", padding: "2px 7px", borderRadius: "4px", backgroundColor: "transparent", color: "#cbd5e1", border: "1px solid #334155", lineHeight: "1.6" }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "8.5pt", fontWeight: "700", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px 0", paddingBottom: "5px", borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", gap: "6px" }}>
                <BookOpen size={10} color="#3b82f6" style={{ flexShrink: 0 }} />
                {lang === "fr" ? "Langues" : "Languages"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {data.skills.languages.map((l, i) => {
                  const match = l.match(/^(.+?)\s+\((.+)\)$/);
                  const name = match ? match[1] : l;
                  const level = match ? match[2] : null;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
                      <span style={{ fontSize: "9pt", fontWeight: "600", color: "#cbd5e1" }}>{name}</span>
                      {level && <span style={{ fontSize: "8pt", fontStyle: "italic", color: "#64748b" }}>({level})</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personal Projects */}
            {data.projects && data.projects.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "8.5pt", fontWeight: "700", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px 0", paddingBottom: "5px", borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Github size={10} color="#3b82f6" style={{ flexShrink: 0 }} />
                  {lang === "fr" ? "Projets personnels" : "Personal Projects"}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.projects.map((project, idx) => (
                    <div key={idx} style={{ borderLeft: "2px solid #10b981", backgroundColor: "#0d2418", borderRadius: "0 4px 4px 0", padding: "6px 10px" }}>
                      <a href={project.url} style={{ fontSize: "9pt", color: "#34d399", textDecoration: "none", fontWeight: "700", display: "block", marginBottom: "3px" }}>{project.name}</a>
                      <p style={{ fontSize: "8pt", color: "#94a3b8", margin: "0 0 5px 0", lineHeight: "1.45" }}>{project.description}</p>
                      {project.tech && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                          {project.tech.map((t, i) => (
                            <span key={i} style={{ fontSize: "7pt", padding: "1px 5px", borderRadius: "3px", backgroundColor: "#064e3b", color: "#6ee7b7", border: "1px solid #065f46" }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {data.hobbies.length > 0 && (
              <div>
                <h3 style={{ fontSize: "8.5pt", fontWeight: "700", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px 0", paddingBottom: "5px", borderBottom: "1px solid #1e3a5f" }}>
                  {lang === "fr" ? "Centres d'intérêt" : "Interests"}
                </h3>
                <p style={{ fontSize: "10pt", color: "#94a3b8", margin: "0", lineHeight: "1.6" }}>{data.hobbies.join(" · ")}</p>
              </div>
            )}
          </div>

          {/* RIGHT MAIN */}
          <div style={{ flex: 1, backgroundColor: "#ffffff", padding: "26px 22px 20px 22px", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" } as React.CSSProperties}>
            {/* Name + Title + Summary */}
            <div style={{ marginBottom: "14px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>
              <h1 style={{ fontSize: "22pt", fontWeight: "700", color: "#0f172a", margin: "0 0 2px 0", letterSpacing: "1px" }}>
                {data.name.toUpperCase()}
              </h1>
              <div style={{ width: "100%", height: "5px", backgroundColor: "#1e40af", borderRadius: "2px", margin: "5px 0 8px 0" }} />
              <p style={{ fontSize: "13pt", color: "#334155", fontWeight: "600", margin: "0 0 8px 0" }}>{data.title}</p>
              <p style={{ fontSize: "9.5pt", color: "#475569", lineHeight: "1.55", margin: "0", borderLeft: "3px solid #1e40af", paddingLeft: "10px" }}>
                {data.summary}
              </p>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "3px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Briefcase size={11} color="#1e40af" style={{ flexShrink: 0 }} />
                {lang === "fr" ? "Expérience Professionnelle" : "Professional Experience"}
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "4px", top: "8px", bottom: "8px", width: "1.5px", backgroundColor: "#dbeafe" }} />
                {data.experiences.filter((e) => !e.isFormation).map((exp, idx) => (
                  <div key={idx} style={{ display: "flex", marginBottom: "10px" }}>
                    <div style={{ flexShrink: 0, width: "10px", marginTop: "3px", marginRight: "12px", position: "relative", zIndex: 1 }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#1e40af", border: "2px solid white" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <img src={`${import.meta.env.BASE_URL}icon/${exp.icon}`} alt={exp.company} style={{ height: "16px", width: "auto", maxWidth: "40px", borderRadius: "2px", objectFit: "contain", flexShrink: 0 }} />
                          <span style={{ fontWeight: "700", fontSize: "10.5pt", color: "#0f172a" }}>{exp.company}</span>
                        </span>
                        <span style={{ fontSize: "8.5pt", color: "#64748b", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "12px" }}>{exp.duration}</span>
                      </div>
                      <div style={{ fontSize: "9.5pt", color: "#475569", fontStyle: "italic", marginBottom: "3px" }}>{exp.position} — {exp.location}</div>
                      <div style={{ fontSize: "9pt", color: "#475569", marginBottom: "3px" }}>{exp.description}</div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 15px", padding: 0, listStyle: "disc" }}>
                          {exp.bullets.map((bullet, bidx) => (
                            <li key={bidx} style={{ fontSize: "9pt", color: "#64748b", marginBottom: "4px", lineHeight: "1.5", display: "list-item" }}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "3px", display: "flex", alignItems: "center", gap: "6px" }}>
                <GraduationCap size={11} color="#1e40af" style={{ flexShrink: 0 }} />
                {lang === "fr" ? "Formation" : "Education"}
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "4px", top: "8px", bottom: "8px", width: "1.5px", backgroundColor: "#dbeafe" }} />
                {data.experiences.filter((e) => e.isFormation).map((exp, idx) => (
                  <div key={idx} style={{ display: "flex", marginBottom: "8px" }}>
                    <div style={{ flexShrink: 0, width: "10px", marginTop: "3px", marginRight: "12px", position: "relative", zIndex: 1 }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#1e40af", border: "2px solid white" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <img src={`${import.meta.env.BASE_URL}icon/${exp.icon}`} alt={exp.company} style={{ height: "16px", width: "auto", maxWidth: "40px", borderRadius: "2px", objectFit: "contain", flexShrink: 0 }} />
                          <span style={{ fontWeight: "700", fontSize: "10.5pt", color: "#0f172a" }}>{exp.company}</span>
                        </span>
                        <span style={{ fontSize: "8.5pt", color: "#64748b", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "12px" }}>{exp.duration}</span>
                      </div>
                      <div style={{ fontSize: "9.5pt", color: "#475569", fontStyle: "italic", marginBottom: "2px" }}>{exp.position} — {exp.location}</div>
                      {exp.description && <div style={{ fontSize: "9pt", color: "#64748b" }}>{exp.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            {data.publications.length > 0 && (
              <div>
                <div style={{ fontSize: "9.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "3px" }}>
                  Publications
                </div>
                {data.publications.map((pub, idx) => (
                  <div key={idx} style={{ marginBottom: "5px" }}>
                    <span style={{ fontWeight: "600", fontSize: "9.5pt", color: "#0f172a" }}>{pub.title} ({pub.year})</span>
                    <span style={{ fontSize: "9pt", color: "#64748b", marginLeft: "6px" }}>— {pub.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Classic/plain print layout — single column, white, ATS-friendly */}
      <div ref={plainPrintRef} className="print-only">
        <div style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "6mm 18mm 6mm 18mm",
          boxSizing: "border-box",
          // Standard font: the Inter web font gets split into fragments in saved PDFs, breaking copy/paste and ATS parsing
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "8.5pt",
          lineHeight: "1.38",
          color: "#334155",
          backgroundColor: "#ffffff",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        } as React.CSSProperties}>

          {/* ── Header ── */}
          <div style={{ marginBottom: "7px", paddingBottom: "7px", borderBottom: "1px solid #e2e8f0" }}>
            <h1 style={{ fontSize: "20pt", fontWeight: "700", color: "#0f172a", margin: "0 0 1px 0", letterSpacing: "1px" }}>
              {data.name.toUpperCase()}
            </h1>
            <div style={{ width: "100%", height: "4px", backgroundColor: "#1e40af", borderRadius: "2px", margin: "4px 0 6px 0" }} />
            <p style={{ fontSize: "12.5pt", color: "#334155", fontWeight: "600", margin: "0 0 6px 0" }}>{data.title}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 0", fontSize: "8pt", color: "#475569" }}>
              {[
                data.location,
                data.phone,
                data.mail,
                `linkedin.com/in/${data.linkedin}`,
                `github.com/${data.github}`,
              ].map((item, i, arr) => (
                <span key={i} style={{ display: "flex", alignItems: "center" }}>
                  {item}
                  {i < arr.length - 1 && <span style={{ margin: "0 7px", color: "#94a3b8" }}>|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* ── Summary ── */}
          {data.summary && (
            <div style={{ marginBottom: "7px" }}>
              <p style={{ fontSize: "8.5pt", color: "#475569", lineHeight: "1.5", margin: "0", borderLeft: "3px solid #1e40af", paddingLeft: "9px" }}>
                {data.summary}
              </p>
            </div>
          )}

          {/* ── Experience ── */}
          <div style={{ marginBottom: "7px" }}>
            <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
              {lang === "fr" ? "Expérience Professionnelle" : "Work Experience"}
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "3px", top: "5px", bottom: "5px", width: "1.5px", backgroundColor: "#dbeafe" }} />
              {data.experiences.filter((e) => !e.isFormation).map((exp, idx) => (
                <div key={idx} style={{ display: "flex", marginBottom: "6px" }}>
                  <div style={{ flexShrink: 0, width: "9px", marginTop: "3px", marginRight: "10px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#1e40af", border: "2px solid white" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1px" }}>
                      <span style={{ fontWeight: "700", fontSize: "9.5pt", color: "#0f172a" }}>{exp.company}</span>
                      <span style={{ fontSize: "8pt", color: "#64748b", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "10px" }}>{exp.duration}</span>
                    </div>
                    <div style={{ fontSize: "8.5pt", color: "#475569", fontStyle: "italic", marginBottom: "2px" }}>{exp.position} — {exp.location}</div>
                    {exp.description && <div style={{ fontSize: "8pt", color: "#475569", marginBottom: "2px" }}>{exp.description}</div>}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul style={{ margin: "2px 0 0 13px", padding: 0, listStyle: "disc" }}>
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx} style={{ fontSize: "8pt", color: "#64748b", marginBottom: "1.5px", lineHeight: "1.4", display: "list-item" }}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Education ── */}
          <div style={{ marginBottom: "7px" }}>
            <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
              {lang === "fr" ? "Formation" : "Education"}
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "3px", top: "5px", bottom: "5px", width: "1.5px", backgroundColor: "#dbeafe" }} />
              {data.experiences.filter((e) => e.isFormation).map((exp, idx) => (
                <div key={idx} style={{ display: "flex", marginBottom: "4px" }}>
                  <div style={{ flexShrink: 0, width: "9px", marginTop: "3px", marginRight: "10px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#1e40af", border: "2px solid white" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1px" }}>
                      <span style={{ fontWeight: "700", fontSize: "9.5pt", color: "#0f172a" }}>{exp.company}</span>
                      <span style={{ fontSize: "8pt", color: "#64748b", fontStyle: "italic", whiteSpace: "nowrap", marginLeft: "10px" }}>{exp.duration}</span>
                    </div>
                    <div style={{ fontSize: "8.5pt", color: "#475569", fontStyle: "italic", marginBottom: "1px" }}>{exp.position} — {exp.location}</div>
                    {exp.description && <div style={{ fontSize: "8pt", color: "#64748b" }}>{exp.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Skills ── */}
          <div style={{ marginBottom: "7px" }}>
            <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
              {lang === "fr" ? "Compétences" : "Skills"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[
                { label: "Vision & ML", skills: data.skills.ml },
                { label: lang === "fr" ? "Langages & DevOps" : "Languages & DevOps", skills: data.skills.devops },
                { label: "LLM & Agents", skills: data.skills.llmAgents },
              ].map(({ label, skills }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                  <span style={{ fontSize: "7.5pt", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", paddingTop: "2px", minWidth: "105px" }}>{label}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                    {skills.map((skill, i) => (
                      <span key={i} style={{ fontSize: "7.5pt", padding: "1px 6px", borderRadius: "3px", border: "1px solid #bfdbfe", color: "#1e40af", backgroundColor: "#eff6ff", lineHeight: "1.55" }}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Languages ── */}
          <div style={{ marginBottom: "7px" }}>
            <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
              {lang === "fr" ? "Langues" : "Languages"}
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {data.skills.languages.map((l, i) => {
                const match = l.match(/^(.+?)\s+\((.+)\)$/);
                const name = match ? match[1] : l;
                const level = match ? match[2] : null;
                return (
                  <span key={i} style={{ fontSize: "8.5pt", color: "#334155" }}>
                    <strong>{name}</strong>{level && <span style={{ color: "#64748b", fontStyle: "italic" }}> ({level})</span>}
                    {i < data.skills.languages.length - 1 && <span style={{ color: "#94a3b8", marginLeft: "6px" }}>·</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* ── Publications ── */}
          {data.publications.length > 0 && (
            <div style={{ marginBottom: "7px" }}>
              <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
                Publications
              </div>
              {data.publications.map((pub, idx) => (
                <div key={idx} style={{ marginBottom: "4px" }}>
                  <span style={{ fontWeight: "600", fontSize: "8.5pt", color: "#0f172a" }}>{pub.title} ({pub.year})</span>
                  <span style={{ fontSize: "8pt", color: "#64748b", marginLeft: "5px" }}>— {pub.description}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Projects ── */}
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: "7px" }}>
              <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
                {lang === "fr" ? "Projets Personnels" : "Personal Projects"}
              </div>
              {data.projects.map((project, idx) => (
                <div key={idx} style={{ marginBottom: "5px" }}>
                  <span style={{ fontWeight: "700", fontSize: "8.5pt", color: "#0f172a" }}>{project.name}</span>
                  {project.tech && project.tech.length > 0 && (
                    <span style={{ fontSize: "8pt", color: "#64748b", marginLeft: "5px" }}>({project.tech.join(", ")})</span>
                  )}
                  <div style={{ fontSize: "8pt", color: "#475569", marginTop: "1px" }}>{project.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── Interests ── */}
          {data.hobbies.length > 0 && (
            <div>
              <div style={{ fontSize: "8.5pt", fontWeight: "700", color: "#1e40af", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #1e40af", paddingBottom: "2px" }}>
                {lang === "fr" ? "Centres d'intérêt" : "Interests"}
              </div>
              <p style={{ fontSize: "8.5pt", color: "#475569", margin: "0" }}>{data.hobbies.join(" · ")}</p>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
