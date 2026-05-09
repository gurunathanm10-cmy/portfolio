import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Gurunathan M. Built with care.
        </p>
        <div className="flex items-center gap-2">
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
              className="grid h-9 w-9 place-items-center rounded-lg glass text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
