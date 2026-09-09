import React, { useState, useEffect, useRef } from "react";
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  // Improved scroll function with offset
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Get navbar height offset (adjust based on your navbar height)
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Reset scrolling state after animation completes
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update active section if not currently scrolling programmatically
          if (entry.isIntersecting && !isScrolling) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-30% 0px -40% 0px", 
        threshold: 0.1 
      }
    );

    // Observe all sections by ID
    const sectionIds = ["about", "experience", "projects", "skills", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isScrolling]);

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