import "./App.css";
import React from "react";
import {
  AtSign,
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
  ExternalLink,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { ExperienceCard } from "./components/custom/experience";
import { SkillBadge } from "./components/custom/skill-badge";
import { cvData } from "./data/cv";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { useReactToPrint } from "react-to-print";

// Custom hook for language management
const useLanguage = () => {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  const toggleLanguage = () => setLang(lang === "fr" ? "en" : "fr");
  const isFrench = lang === "fr";

  return { lang, setLang, toggleLanguage, isFrench };
};

function App() {
  const { lang, toggleLanguage } = useLanguage();

  const data = cvData[lang];

  // Ref for printable content
  const printRef = useRef<HTMLDivElement>(null);
  // Ensure dark mode is applied to the printable container during print if active
  const isDark = document.documentElement.classList.contains("dark");
  const handleBeforePrint = async () => {
    if (isDark && printRef.current) printRef.current.classList.add("dark");
  };
  const handleAfterPrint = () => {
    if (printRef.current) printRef.current.classList.remove("dark");
  };
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `CV_${data.name.replace(/\s+/g, "_")}_${lang.toUpperCase()}`,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    `,
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Main app: hide in print */}
      <div className="flex min-h-screen no-print flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-[24%] bg-slate-50 dark:bg-slate-900 p-3 lg:p-4 flex flex-col gap-2.5 border-r border-slate-200 dark:border-slate-700">
          {/* Photo */}
          <img
            src={`${import.meta.env.BASE_URL}res/photo.jpg`}
            className="rounded-full w-32 h-32 object-cover mx-auto"
            alt={data.name}
          />

          {/* Contacts */}
          <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
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
          <div className="flex flex-col gap-3 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
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
          <div className="flex flex-col gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === "fr" ? "Langues" : "Languages"}
            </h3>
            <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
              {data.skills.languages.map((lang, index) => (
                <SkillBadge key={index} skill={lang} />
              ))}
            </div>
          </div>

          {/* Interests */}
          {data.hobbies.length > 0 && (
            <div className="flex flex-col gap-1.5 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
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
            <div className="flex flex-col gap-1.5 border border-orange-600 rounded-lg p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-600 flex items-center gap-1">
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
                      className="inline-flex items-center gap-1 text-orange-600 hover:underline mt-1"
                    >
                      {lang === "fr" ? "Visiter le site" : "Visit website"}
                      <ExternalLink size="12" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="w-full lg:flex-1 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
          {/* Top bar — slim, right-aligned */}
          <div className="w-full flex justify-end items-center py-1.5 px-4 gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={toggleLanguage}
              aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
            >
              {lang === "fr" ? "EN" : "FR"}
            </Button>
            <Button
              className="no-print h-7 px-2 text-xs"
              variant="ghost"
              onClick={() => {
                handlePrint();
              }}
              aria-label="Export CV as PDF"
            >
              Export PDF
            </Button>
          </div>

          {/* Name + Title */}
          <section className="mb-4 mx-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="w-fit">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {data.name.toUpperCase()}
              </h1>
              <div className="w-full h-1 bg-blue-600 dark:bg-blue-400 mt-1 mb-2 rounded-full"></div>
            </div>
            <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
              {data.title}
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {data.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="px-3 space-y-0">
            <div className="flex flex-col gap-0 w-full">
              {/* Work Experience */}
              {data.experiences
                .filter((exp) => !exp.isFormation)
                .map((exp, idx) => (
                  <ExperienceCard
                    key={"work-" + idx}
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
                ))}

              {/* Education divider */}
              <div className="flex items-center gap-2 my-4">
                <GraduationCap size="16" className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {lang === "fr" ? "Formation" : "Education"}
                </span>
                <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Education */}
              {data.experiences
                .filter((exp) => exp.isFormation)
                .map((exp, idx) => (
                  <ExperienceCard
                    key={"formation-" + idx}
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
                ))}
            </div>
          </section>
        </main>
      </div>

      {/* Print-only layout */}
      <div ref={printRef} className="print-only" style={{ display: "none" }}>
        <div
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "28px 36px 20px 36px",
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            color: "#1e293b",
            lineHeight: "1.4",
            fontSize: "10pt",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "16px" }}>
            <h1
              style={{
                fontSize: "22pt",
                fontWeight: "700",
                margin: "0 0 2px 0",
                color: "#0f172a",
                letterSpacing: "1px",
              }}
            >
              {data.name.toUpperCase()}
            </h1>
            <div
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#1e40af",
                borderRadius: "2px",
                margin: "4px 0 8px 0",
              }}
            />
            <div
              style={{
                fontSize: "11.5pt",
                color: "#334155",
                fontWeight: "500",
                marginBottom: "6px",
              }}
            >
              {data.title}
            </div>
            <div
              style={{
                fontSize: "8.5pt",
                color: "#64748b",
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              <span>{data.location}</span>
              <span>•</span>
              <span>{data.mail}</span>
              <span>•</span>
              <span>{data.phone}</span>
              <span>•</span>
              <span>linkedin.com/in/{data.linkedin}</span>
              <span>•</span>
              <span>github.com/{data.github}</span>
            </div>
          </div>

          {/* Separator */}
          <div style={{ borderBottom: "1px solid #e2e8f0", marginBottom: "12px" }} />

          {/* Summary */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9pt",
                color: "#475569",
                textAlign: "justify",
                lineHeight: "1.5",
              }}
            >
              {data.summary}
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9.5pt",
                fontWeight: "700",
                color: "#1e40af",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderBottom: "2px solid #1e40af",
                paddingBottom: "3px",
              }}
            >
              {lang === "fr" ? "Compétences" : "Skills"}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9pt" }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "600", color: "#334155", padding: "2px 12px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    Vision & ML
                  </td>
                  <td style={{ color: "#64748b", padding: "2px 0" }}>
                    {data.skills.ml.join("  ·  ")}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600", color: "#334155", padding: "2px 12px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    {lang === "fr" ? "Langages & DevOps" : "Languages & DevOps"}
                  </td>
                  <td style={{ color: "#64748b", padding: "2px 0" }}>
                    {data.skills.devops.join("  ·  ")}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600", color: "#334155", padding: "2px 12px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    LLM & Agents
                  </td>
                  <td style={{ color: "#64748b", padding: "2px 0" }}>
                    {data.skills.llmAgents.join("  ·  ")}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600", color: "#334155", padding: "2px 12px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    {lang === "fr" ? "Langues" : "Languages"}
                  </td>
                  <td style={{ color: "#64748b", padding: "2px 0" }}>
                    {data.skills.languages.join("  ·  ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Professional Experience */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9.5pt",
                fontWeight: "700",
                color: "#1e40af",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderBottom: "2px solid #1e40af",
                paddingBottom: "3px",
              }}
            >
              {lang === "fr"
                ? "Expérience Professionnelle"
                : "Professional Experience"}
            </div>
            {data.experiences
              .filter((exp) => !exp.isFormation)
              .map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "1px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "10pt",
                        color: "#0f172a",
                      }}
                    >
                      {exp.company}
                    </span>
                    <span
                      style={{
                        fontSize: "8.5pt",
                        color: "#64748b",
                        fontStyle: "italic",
                        whiteSpace: "nowrap",
                        marginLeft: "12px",
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "9pt",
                      color: "#475569",
                      fontStyle: "italic",
                      marginBottom: "3px",
                    }}
                  >
                    {exp.position} — {exp.location}
                  </div>
                  <div
                    style={{
                      fontSize: "8.5pt",
                      color: "#475569",
                      marginBottom: "3px",
                    }}
                  >
                    {exp.description}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
                      {exp.bullets.map((bullet, bidx) => (
                        <li
                          key={bidx}
                          style={{
                            fontSize: "8.5pt",
                            color: "#64748b",
                            marginBottom: "1px",
                            lineHeight: "1.35",
                          }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>

          {/* Education */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9.5pt",
                fontWeight: "700",
                color: "#1e40af",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderBottom: "2px solid #1e40af",
                paddingBottom: "3px",
              }}
            >
              {lang === "fr" ? "Formation" : "Education"}
            </div>
            {data.experiences
              .filter(
                (exp) =>
                  exp.isFormation &&
                  !exp.position.toLowerCase().includes("stage") &&
                  !exp.position.toLowerCase().includes("internship")
              )
              .map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "1px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "10pt",
                        color: "#0f172a",
                      }}
                    >
                      {exp.company}
                    </span>
                    <span
                      style={{
                        fontSize: "8.5pt",
                        color: "#64748b",
                        fontStyle: "italic",
                        whiteSpace: "nowrap",
                        marginLeft: "12px",
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "9pt",
                      color: "#475569",
                      fontStyle: "italic",
                      marginBottom: "2px",
                    }}
                  >
                    {exp.position} — {exp.location}
                  </div>
                  <div style={{ fontSize: "8.5pt", color: "#64748b" }}>
                    {exp.description}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
                      {exp.bullets.map((bullet, bidx) => (
                        <li
                          key={bidx}
                          style={{
                            fontSize: "8.5pt",
                            color: "#64748b",
                            lineHeight: "1.35",
                          }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>

          {/* Publications */}
          {data.publications.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  fontSize: "9.5pt",
                  fontWeight: "700",
                  color: "#1e40af",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #1e40af",
                  paddingBottom: "3px",
                }}
              >
                Publications
              </div>
              {data.publications.map((pub, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "9pt",
                      color: "#0f172a",
                    }}
                  >
                    {pub.title} ({pub.year})
                  </span>
                  <span style={{ fontSize: "8.5pt", color: "#64748b", marginLeft: "6px" }}>
                    — {pub.description}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: "9.5pt",
                  fontWeight: "700",
                  color: "#1e40af",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #1e40af",
                  paddingBottom: "3px",
                }}
              >
                {lang === "fr" ? "Centres d'intérêt" : "Interests"}
              </div>
              <div style={{ fontSize: "9pt", color: "#64748b" }}>
                {data.hobbies.join("  ·  ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
