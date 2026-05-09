import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { Section } from "./Section";

const projects = [
  {
    title: "Obesity Type Classification using Machine Learning",
    description:
      "Built a machine learning classification model using lifestyle and health-related data, applying preprocessing with Pandas and NumPy and modeling with Logistic Regression and Decision Tree. Achieved approximately 80–85% prediction accuracy.",
    tech: ["Python", "Pandas", "NumPy", "Machine Learning"],
    github: "https://github.com/",
    demo: "",
  },
  {
    title: "Travel Planner Web Page",
    description:
      "Developed a responsive travel-themed static website with clean layouts and structured destination content, focused on a smooth user experience with HTML and CSS.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/",
    demo: "",
  },
  {
    title: "Grocery Management System",
    description:
      "Built a web application for grocery purchase and order management. Integrated frontend pages with SQL database operations to manage product records and tracking.",
    tech: ["HTML", "CSS", "SQL"],
    github: "https://github.com/",
    demo: "",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A few projects I've built while learning — each one taught me something new about engineering, design, or data."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative glass glow-border rounded-2xl p-6 flex flex-col shadow-card overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
            </div>

            <h3 className="mt-5 text-lg sm:text-xl font-semibold tracking-tight text-foreground">
              {p.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
              {p.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/70 text-foreground/90 border border-glass-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground border border-glass-border transition-colors"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
