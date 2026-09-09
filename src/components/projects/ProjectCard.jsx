import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Maximize2 } from "lucide-react";
import { ImageModal } from "./ImageModal";
import "./ProjectCard.css";

const TECH_COLORS = {
  Python: "#3776AB", Django: "#092E20", MySQL: "#4479A1",
  "Bootstrap 5": "#7952B3", JavaScript: "#F7DF1E", React: "#61DAFB",
  "Django REST": "#092E20", PostgreSQL: "#336791", "Chart.js": "#FF6384",
  WebSocket: "#87CEEB", JWT: "#FF6B6B", Redis: "#DC382D",
  Celery: "#87CEFA", Docker: "#2496ED", "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#EF4444", HTML5: "#E34F26", CSS3: "#1572B6",
  Git: "#F05032", GitHub: "#181717", Vercel: "#000000", Render: "#46E3B7",
};

export const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const visibleFeatures = expanded ? project.features : project.features.slice(0, 2);

  const openModal = () => {
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        onClick={openModal}
      >
        {/* Background Image - Full Card */}
        <div className="project-card-bg">
          <img
            src={project.coverImage}
            alt={project.title}
            className="project-card-image"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
          <div className="project-card-overlay" />
        </div>

        {/* Expand Icon */}
        <div className="project-card-expand">
          <Maximize2 size={16} />
        </div>

        {/* Content */}
        <div className="project-card-content">
          {/* Header with Title and Index */}
          <div className="project-header">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          </div>

          {/* Category Badge */}
          <span className="project-category">{project.category}</span>

          {/* Description */}
          <p className="project-description">{project.description}</p>

          {/* Features */}
          <ul className="project-features">
            {visibleFeatures.map((feature, idx) => (
              <li key={idx} className="project-feature">
                {feature}
              </li>
            ))}
            {project.features.length > 2 && (
              <button 
                className="project-toggle" 
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                {expanded ? "Show less" : `+${project.features.length - 2} more`}
              </button>
            )}
          </ul>

          {/* Tech Stack */}
          <div className="project-tech">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="project-tech-tag"
                style={{
                  borderColor: `${TECH_COLORS[tech] || "var(--accent)"}44`,
                  color: TECH_COLORS[tech] || "var(--text)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="project-footer">
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link"
              onClick={(e) => e.stopPropagation()}
            >
              View project <ArrowUpRight size={14} />
            </a>
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noreferrer" 
              className="project-github"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {modalOpen && (
        <ImageModal
          images={project.images}
          currentIndex={currentImageIndex}
          onClose={() => setModalOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};