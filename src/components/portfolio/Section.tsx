import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          {eyebrow && (
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-3">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="text-gradient">{title}</span>
          </h2>
          {description && (
            <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
