import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

const contacts = [
  { Icon: Mail, label: "Email", value: "gurunathan@example.com", href: "mailto:gurunathan@example.com" },
  { Icon: Github, label: "GitHub", value: "github.com/gurunathan", href: "https://github.com/" },
  { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/gurunathan", href: "https://linkedin.com/" },
  { Icon: MapPin, label: "Location", value: "Coimbatore, India", href: "" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 700);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's connect"
      description="Open to internships, collaborations, and learning opportunities. I'd love to hear from you."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-3"
        >
          {contacts.map((c) => {
            const inner = (
              <div className="flex items-center gap-4 glass glow-border rounded-2xl p-4 hover:-translate-y-0.5 transition-transform">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <c.Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-medium truncate">{c.value}</div>
                </div>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            );
          })}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmit}
          className="lg:col-span-3 glass glow-border rounded-2xl p-6 sm:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="name">Name</label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                maxLength={100}
                className="mt-1.5 bg-secondary/40 border-glass-border"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                maxLength={255}
                className="mt-1.5 bg-secondary/40 border-glass-border"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground" htmlFor="message">Message</label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can I help?"
              rows={5}
              maxLength={1000}
              className="mt-1.5 bg-secondary/40 border-glass-border resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
          >
            {submitting ? "Sending..." : (<>Send Message <Send className="ml-1.5 h-4 w-4" /></>)}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
}
