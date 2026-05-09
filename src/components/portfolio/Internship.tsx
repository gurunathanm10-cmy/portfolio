import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Section } from "./Section";

const responsibilities = [
  "Learned practical web development concepts and workflows",
  "Worked on frontend application design and UI structure",
  "Understood database integration basics",
  "Improved understanding of full application architecture",
];

export function Internship() {
  return (
    <Section id="internship" eyebrow="Experience" title="Internship">
      <div className="relative pl-6 sm:pl-10">
        <div
          aria-hidden
          className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-primary/30 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <span className="absolute -left-[22px] sm:-left-[34px] top-2 grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow ring-4 ring-background">
            <Briefcase className="h-4 w-4" />
          </span>

          <div className="glass glow-border rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Full Stack Web Development Intern
                </h3>
                <div className="mt-1 text-accent text-sm font-medium">Accent Technosoft</div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Jun 2025 – Jul 2025
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Coimbatore, India
                </span>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
