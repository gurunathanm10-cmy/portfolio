import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Section } from "./Section";

const certs = [
  {
    title: "Full Stack Web Development Internship",
    issuer: "Accent Technosoft",
    year: "2025",
  },
];

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials"
      description="Programs and trainings that have helped shape my learning."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass glow-border rounded-2xl p-6 group"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold tracking-tight">{c.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{c.issuer}</div>
            <div className="mt-3 text-xs text-accent">{c.year}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
