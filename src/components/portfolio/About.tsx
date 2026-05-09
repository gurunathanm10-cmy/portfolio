import { motion } from "framer-motion";
import { GraduationCap, Lightbulb, Rocket, Target } from "lucide-react";
import { Section } from "./Section";

const points = [
  { Icon: GraduationCap, title: "CSE Student", text: "Computer Science Engineering undergraduate building strong fundamentals." },
  { Icon: Lightbulb, title: "Always Learning", text: "Exploring web development and machine learning through hands-on projects." },
  { Icon: Rocket, title: "Practical Builder", text: "Turning concepts into working apps that solve real problems." },
  { Icon: Target, title: "Placement Ready", text: "Sharpening problem-solving and engineering skills every day." },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A short introduction">
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed text-[1.02rem]"
        >
          <p>
            I'm <span className="text-foreground font-medium">Gurunathan M</span>, a Computer
            Science Engineering student passionate about software development. I enjoy turning
            ideas into clean, functional applications and learning the tools that make great
            software possible.
          </p>
          <p>
            My interests sit at the intersection of <span className="text-foreground">web
            development</span> and <span className="text-foreground">machine learning</span>. I
            like designing usable interfaces just as much as I like exploring data, training
            models, and understanding how systems behave.
          </p>
          <p>
            I believe in steady, consistent growth — building projects, asking better questions,
            and improving my problem-solving skills with each iteration. I'm currently focused on
            strengthening my foundations and preparing for a strong start to my engineering career.
          </p>
        </motion.div>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass glow-border rounded-2xl p-5 hover:-translate-y-1 transition-transform"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground mb-3">
                <p.Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-foreground">{p.title}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
