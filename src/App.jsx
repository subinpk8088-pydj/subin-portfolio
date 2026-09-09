import React, { useState, useEffect } from "react";
import { Hero } from "./components/home/Hero";
import { Stats } from "./components/home/Stats";
import { Experience } from "./components/experience/Experience";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";
import { Education } from "./components/education/Education";
import { Contact } from "./components/contact/Contact";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Reveal } from "./components/ui/Reveal";
import "./styles/animations.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");

  // Simple scroll function using document.getElementById
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    // Observe all sections by ID
    const sectionIds = ["about", "experience", "projects", "skills", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen w-full font-body"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <Navbar scrollTo={scrollTo} activeSection={activeSection} />
      
      {/* Hero Section - has id="about" inside */}
      <Hero scrollTo={scrollTo} />
      
      {/* Stats Section - Reduced delay */}
      <Reveal direction="up" delay={0.05}>
        <section className="grid-bg px-5 md:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <Stats />
          </div>
        </section>
      </Reveal>

      {/* Experience Section - Reduced delay */}
      <Reveal direction="up" delay={0.05}>
        <Experience />
      </Reveal>
      
      {/* Projects Section - Reduced delay */}
      <Reveal direction="up" delay={0.08}>
        <Projects />
      </Reveal>
      
      {/* Skills Section - Reduced delay */}
      <Reveal direction="up" delay={0.05}>
        <Skills />
      </Reveal>
      
      {/* Education Section - Reduced delay */}
      <Reveal direction="up" delay={0.08}>
        <Education />
      </Reveal>
      
      {/* Contact Section - Reduced delay */}
      <Reveal direction="up" delay={0.05}>
        <Contact />
      </Reveal>
      
      <Footer />
    </div>
  );
}

export default App;