import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  "Computer Science Student",
  "Aspiring Software Developer",
  "Web Development Learner",
  "Machine Learning Enthusiast",
];

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = deleting ? 40 : 80;
    const pause = !deleting && text === word ? 1400 : deleting && text === "" ? 300 : speed;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, pause);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      {/* floating orbs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </span>

          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Hi, I'm{" "}
            <span className="text-gradient">Gurunathan M</span>
          </h1>

          <div className="mt-5 text-xl sm:text-2xl text-muted-foreground min-h-[2.25rem]">
            <span className="caret text-foreground/90">{typed}</span>
          </div>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Passionate about building practical applications, learning modern technologies,
            and growing as a software engineer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-glass-border hover:bg-secondary/60"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="hover:bg-secondary/60"
              asChild
            >
              <a href="/resume.pdf" download>
                <Download className="mr-1 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { Icon: Github, href: "https://github.com/", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:gurunathan@example.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl glass text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
