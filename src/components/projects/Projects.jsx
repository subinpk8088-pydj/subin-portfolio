import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { PROJECTS } from "../../data/projectsData";
import { Sparkles } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import "./Projects.css";

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects =
    activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="glow-orb-top" />
      <div className="glow-orb-bottom" />

      <div className="projects-content">
        {/* Section Header - Animated */}
        <Reveal direction="up" delay={0.1}>
          <div className="projects-header">
            <div className="eyebrow-wrapper">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">SELECTED WORK</span>
            </div>

            <h2 className="projects-title">
              <span className="title-gradient">Projects</span>
            </h2>

            <p className="projects-subtitle">
              <span className="subtitle-icon">
                <Sparkles size={16} style={{ color: "var(--accent)" }} />
              </span>
              {filteredProjects.length} projects,{" "}
              {PROJECTS.reduce((acc, p) => acc + p.tech.length, 0)} technologies
            </p>
          </div>
        </Reveal>

        {/* Project Filters - Animated */}
        <Reveal direction="up" delay={0.15}>
          <ProjectFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </Reveal>

        {/* Projects Grid - Staggered Cards */}
        <div className="projects-grid">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-grid-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                layout
              >
                <Reveal direction="up" delay={index * 0.06}>
                  <ProjectCard project={project} index={index} />
                </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State - Animated */}
        {filteredProjects.length === 0 && (
          <Reveal direction="up" delay={0.2}>
            <motion.div
              className="projects-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="projects-empty-text">No projects found in this category</p>
            </motion.div>
          </Reveal>
        )}
      </div>
    </section>
  );
};