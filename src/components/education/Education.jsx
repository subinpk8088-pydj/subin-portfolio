import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  Star, 
  Sparkles,
  BookOpen,
  ChevronRight,
  Infinity,
  Brain,
  Compass
} from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { EDUCATION } from "../../data/educationData";
import "./Education.css";

// Individual Education Card Component
const EducationCard = ({ edu, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Get color based on index
  const colors = [
    { primary: "#EF4444", glow: "rgba(239,68,68,0.2)", bg: "rgba(239,68,68,0.08)" },
    { primary: "#60A5FA", glow: "rgba(96,165,250,0.2)", bg: "rgba(96,165,250,0.08)" },
  ];

  const color = colors[index % colors.length];

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`education-card ${isVisible ? 'education-card-visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="education-card-inner"
        animate={{
          rotateX: mousePosition.y * -6,
          rotateY: mousePosition.x * 6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Glow Effect */}
        <motion.div
          className="education-card-glow"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, ${color.glow}, transparent 70%)`,
          }}
        />

        {/* Top Accent Line */}
        <motion.div
          className="education-card-accent"
          animate={{
            width: isHovered ? "100%" : "40%",
            background: isHovered ? color.primary : "var(--border)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon Section */}
        <motion.div
          className="education-icon-wrapper"
          style={{ 
            background: color.bg,
            borderColor: isHovered ? color.primary : "rgba(148,163,184,0.1)",
            transformStyle: "preserve-3d",
            transform: `translateZ(15px)`
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap size={24} style={{ color: color.primary }} />
          <div
            className="education-icon-pulse"
            style={{
              background: color.glow,
              position: "absolute",
              inset: "-6px",
              borderRadius: "1rem",
              opacity: isHovered ? 0.4 : 0,
              filter: "blur(12px)",
              transition: "opacity 0.5s ease",
              zIndex: 0,
            }}
          />
        </motion.div>

        {/* Degree */}
        <div className="education-degree-wrapper">
          <h3 className="education-degree">{edu.degree}</h3>
          <motion.span
            className="education-degree-arrow"
            animate={{ 
              x: isHovered ? 6 : 0,
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight size={16} style={{ color: color.primary }} />
          </motion.span>
        </div>

        {/* School */}
        <div className="education-school">
          <span className="education-school-icon">
            <BookOpen size={14} style={{ color: color.primary }} />
          </span>
          <span className="education-school-name">{edu.school}</span>
        </div>

        {/* Divider */}
        <motion.div
          className="education-divider"
          animate={{
            width: isHovered ? "100%" : "30%",
            background: isHovered ? color.primary : "var(--border)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Note */}
        <p className="education-note">{edu.note}</p>

        {/* Footer Stats */}
        <motion.div
          className="education-stats"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="education-stat">
            <Calendar size={12} style={{ color: color.primary }} />
            <span className="education-stat-label">Completed</span>
          </div>
          <div className="education-stat-divider" />
          <div className="education-stat">
            <Award size={12} style={{ color: color.primary }} />
            <span className="education-stat-label">Certified</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Education Component
export const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="education-section"
    >
      {/* Background Effects */}
      <div className="education-bg-grid" />
      <div className="education-glow-orb-top" />
      <div className="education-glow-orb-bottom" />
      <div className="education-glow-orb-center" />

      <div className="education-content">
        {/* Section Header - Animated */}
        <Reveal direction="up" delay={0.1}>
          <div className="education-header">
            <motion.div
              className="education-eyebrow-wrapper"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="education-eyebrow-line" />
              <span className="education-eyebrow-text">
                <Star size={12} style={{ color: "var(--accent)" }} />
                FOUNDATION
              </span>
            </motion.div>

            <motion.h2
              className="education-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="education-title-gradient">Education</span>
              <span className="education-title-sparkle">✦</span>
            </motion.h2>

            <motion.p
              className="education-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="education-subtitle-icon">
                <Sparkles size={16} style={{ color: "var(--accent)" }} />
              </span>
              <span className="education-subtitle-highlight">{EDUCATION.length}</span> academic achievements · 
              <span className="education-subtitle-gradient">continuous learning</span> · 
              <span className="education-subtitle-highlight">dual qualifications</span>
            </motion.p>
          </div>
        </Reveal>

        {/* Education Grid - Staggered Cards */}
        <div className="education-grid">
          {EDUCATION.map((edu, index) => (
            <Reveal key={edu.degree} direction="up" delay={index * 0.12}>
              <EducationCard
                edu={edu}
                index={index}
                isVisible={isVisible}
              />
            </Reveal>
          ))}
        </div>

        {/* Footer - Animated */}
        <Reveal direction="up" delay={0.2}>
          <motion.div
            className="education-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="education-footer-content">
              <span className="education-footer-icon">
                <Infinity size={14} style={{ color: "var(--accent)" }} />
              </span>
              <span className="text-muted">Lifelong learning journey</span>
              <span className="separator">·</span>
              <span className="text-accent">
                <Brain size={14} style={{ color: "var(--accent)" }} />
                Building strong foundations
              </span>
              <span className="separator">·</span>
              <span className="text-muted">
                <Compass size={14} style={{ color: "var(--muted)" }} />
              </span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};