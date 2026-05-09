import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Loader } from "@/components/portfolio/Loader";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Internship } from "@/components/portfolio/Internship";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gurunathan M — Computer Science Student & Aspiring Developer" },
      {
        name: "description",
        content:
          "Portfolio of Gurunathan M, a Computer Science Engineering student passionate about web development and machine learning. Projects, skills, internship, and contact.",
      },
      { property: "og:title", content: "Gurunathan M — Portfolio" },
      {
        property: "og:description",
        content:
          "CSE student & aspiring software developer focused on web development and machine learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gurunathan M — Portfolio" },
      {
        name: "twitter:description",
        content:
          "CSE student & aspiring software developer focused on web development and machine learning.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Internship />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
