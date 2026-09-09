import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Calendar, MapPin, Building2, ChevronDown, 
  Award, Sparkles, Code, Database, Server, Globe, Rocket, Zap 
} from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { EXPERIENCE } from "../../data/experienceData";
import "./Experience.css";

// Individual Experience Card Component
const ExperienceCard = ({ job, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsVisible(true), index * 100);
    }
  }, [isInView, index]);

  // Tech stack mapping
  const techStack = {
    "Python": { icon: Code, color: "#3776AB" },
    "Django": { icon: Server, color: "#092E20" },
    "PostgreSQL": { icon: Database, color: "#336791" },
    "React": { icon: Code, color: "#61DAFB" },
    "Docker": { icon: Server, color: "#2496ED" },
    "JavaScript": { icon: Code, color: "#F7DF1E" },
    "MySQL": { icon: Database, color: "#4479A1" },
    "Bootstrap": { icon: Globe, color: "#7952B3" },
    "Tailwind": { icon: Globe, color: "#06B6D4" },
    "Redis": { icon: Database, color: "#DC382D" },
    "Celery": { icon: Server, color: "#87CEFA" },
    "Django REST": { icon: Server, color: "#092E20" },
  };

  const getTechIcon = (tech) => {
    const found = Object.keys(techStack).find(key => 
      tech.toLowerCase().includes(key.toLowerCase())
    );
    return found ? techStack[found].icon : Code;
  };

  const getTechColor = (tech) => {
    const found = Object.keys(techStack).find(key => 
      tech.toLowerCase().includes(key.toLowerCase())
    );
    return found ? techStack[found].color : "var(--muted)";
  };

  return (
    <div 
      ref={cardRef}
      className={`experience-card ${isVisible ? 'experience-card-visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Timeline Dot */}
      <div className="timeline-dot">
        <div className="timeline-dot-inner" />
        <div className="timeline-dot-pulse" />
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-glow" />

        {/* Period Badge */}
        <div className="period-badge">
          <Calendar size={12} />
          {job.period}
        </div>

        {/* Role & Company */}
        <div className="role-container">
          <div>
            <h3 className="role-title">{job.role}</h3>
            <div className="company-info">
              <Building2 className="company-icon" />
              <span className="company-name">{job.company}</span>
              <span className="company-separator">·</span>
              <div className="location-info">
                <MapPin size={12} />
                {job.location}
              </div>
            </div>
          </div>

          {/* Experience Badge */}
          <div className="experience-badge">
            <Award size={12} />
            Full-time
          </div>
        </div>

        {/* Responsibilities */}
        <div className="responsibilities">
          <ul className="responsibilities-list">
            {(isExpanded ? job.points : job.points.slice(0, 3)).map((point, idx) => (
              <li 
                key={idx} 
                className={`responsibility-item ${isVisible ? 'responsibility-item-visible' : ''}`}
                style={{ animationDelay: `${index * 0.1 + 0.2 + idx * 0.05}s` }}
              >
                <span className="responsibility-dot" />
                <span className="responsibility-text">{point}</span>
              </li>
            ))}
          </ul>

          {/* Show More/Less Button */}
          {job.points.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="show-more-btn"
            >
              <span>{isExpanded ? "Show less" : `Show ${job.points.length - 3} more`}</span>
              <span className={`show-more-icon ${isExpanded ? 'show-more-icon-rotated' : ''}`}>
                <ChevronDown size={14} />
              </span>
            </button>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="tech-tags">
          {job.points
            .join(' ')
            .match(/\b(Python|Django|PostgreSQL|React|Docker|JavaScript|MySQL|Bootstrap|Tailwind|Redis|Celery|Django REST|REST|API|RBAC|ORM|Git|GitHub|VS Code|Postman|Vercel|Render|CI\/CD|HTML|CSS|Framer Motion|WebSocket|JWT)\b/g)
            ?.filter((v, i, a) => a.indexOf(v) === i)
            .slice(0, 8)
            .map((tech, idx) => {
              const Icon = getTechIcon(tech);
              return (
                <span 
                  key={tech} 
                  className={`tech-tag ${isVisible ? 'tech-tag-visible' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1 + 0.6 + idx * 0.05}s`,
                    borderColor: `${getTechColor(tech)}33`
                  }}
                >
                  <Icon size={10} style={{ color: getTechColor(tech) }} />
                  {tech}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

// Main Experience Component
export const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Calculate total experience in months
  const totalMonths = EXPERIENCE.reduce((acc, job) => {
    const [start, end] = job.period.split(' — ');
    const startDate = new Date(start);
    const endDate = end === 'Present' ? new Date() : new Date(end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    return acc + months;
  }, 0);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section"
    >
      {/* Background Glow Effects */}
      <div className="glow-orb-top" />
      <div className="glow-orb-bottom" />

      <div className="experience-content">
        {/* Section Header - Matching Hero Style */}
        <Reveal direction="up" delay={0.1}>
          <div className="experience-header">
            <div className="eyebrow-wrapper">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">CAREER</span>
            </div>
            
            <h2 className="experience-title">
              <span className="title-gradient">Experience</span>
            </h2>
            
            <p className="experience-subtitle">
              <span className="subtitle-icon">
                <Rocket size={16} style={{ color: "var(--accent)" }} />
              </span>
              {years}.{months} years of professional experience · 
              {EXPERIENCE.length} companies · 
              {EXPERIENCE.reduce((acc, job) => acc + job.points.length, 0)} projects delivered
            </p>
          </div>
        </Reveal>

        {/* Timeline Container */}
        <div className="timeline-container">
          {/* Main Timeline Line */}
          <div className="timeline-line" />

          {/* Experience Cards - Staggered Reveal */}
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} direction="up" delay={i * 0.15}>
              <ExperienceCard job={job} index={i} />
            </Reveal>
          ))}

          {/* End Marker */}
          <div className="timeline-end" />
        </div>

        {/* Footer Note */}
        <Reveal direction="up" delay={0.2}>
          <div className="footer-note">
            <div className="footer-note-content">
              <span className="text-muted">
                <Zap size={14} style={{ color: "var(--accent)" }} />
              </span>
              <span className="text-muted">Building enterprise-grade solutions</span>
              <span className="separator">·</span>
              <span className="text-accent">
                {EXPERIENCE.reduce((acc, job) => acc + job.points.filter(p => 
                  p.includes('RBAC') || p.includes('security') || p.includes('incident')
                ).length, 0)} security incidents prevented
              </span>
              <span className="separator">·</span>
              <span className="text-muted">
                <Globe size={14} style={{ color: "var(--muted)" }} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};