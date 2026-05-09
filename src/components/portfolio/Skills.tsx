import { motion } from "framer-motion";
import {
  Code, Globe, BrainCircuit, Library, Database,
} from "lucide-react";
import { Section } from "./Section";

const groups = [
  { Icon: Code, title: "Programming", items: ["Python", "Java"] },
  { Icon: Globe, title: "Web Technologies", items: ["HTML", "CSS"] },
  { Icon: BrainCircuit, title: "Machine Learning", items: ["Logistic Regression", "Decision Tree"] },
  { Icon: Library, title: "Libraries & Tools", items: ["Pandas", "NumPy"] },
  { Icon: Database, title: "Database", items: ["SQL"] },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I work with"
      description="A snapshot of the languages, libraries, and concepts I'm currently comfortable with and continuing to deepen."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass glow-border rounded-2xl p-6 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <g.Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold tracking-tight">{g.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="text-xs px-3 py-1.5 rounded-lg bg-secondary/70 text-foreground/90 border border-glass-border group-hover:border-accent/40 transition-colors"
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
