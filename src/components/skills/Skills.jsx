import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Server, Layers, Database, Wrench, 
  Code, Cpu, Shield, Zap, 
  Globe, Lock, Cloud, Terminal,
  ChevronRight, Sparkles, Star, 
  GitBranch, Award, Brain, Rocket,
  Infinity, Compass, BarChart3
} from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SKILLS } from "../../data/skillsData";
import "./Skills.css";

// Skill Category Card Component
const SkillCategory = ({ group, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Icon mapping with colors and gradients
  const iconConfigs = {
    "Backend": {
      icon: Server,
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      bg: "rgba(239,68,68,0.12)",
      glow: "rgba(239,68,68,0.2)"
    },
    "Frontend": {
      icon: Layers,
      color: "#60A5FA",
      gradient: "linear-gradient(135deg, #60A5FA, #3B82F6)",
      bg: "rgba(96,165,250,0.12)",
      glow: "rgba(96,165,250,0.2)"
    },
    "Databases": {
      icon: Database,
      color: "#34D399",
      gradient: "linear-gradient(135deg, #34D399, #10B981)",
      bg: "rgba(52,211,153,0.12)",
      glow: "rgba(52,211,153,0.2)"
    },
    "Tools & Deployment": {
      icon: Wrench,
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      bg: "rgba(245,158,11,0.12)",
      glow: "rgba(245,158,11,0.2)"
    }
  };

  const config = iconConfigs[group.category] || iconConfigs["Backend"];
  const Icon = config.icon;
  const iconColor = config.color;
  const iconGradient = config.gradient;
  const iconBg = config.bg;
  const iconGlow = config.glow;

  // Get skill icon with colors
  const getSkillIcon = (skill) => {
    const skillIcons = {
      "Python": { icon: Code, color: "#3776AB" },
      "Django": { icon: Server, color: "#092E20" },
      "Django REST Framework": { icon: Server, color: "#092E20" },
      "RESTful API Design": { icon: Globe, color: "#FF6B6B" },
      "RBAC": { icon: Shield, color: "#EF4444" },
      "Django MVT": { icon: Layers, color: "#092E20" },
      "OOP": { icon: Code, color: "#F59E0B" },
      "React.js": { icon: Code, color: "#61DAFB" },
      "JavaScript (ES6+)": { icon: Code, color: "#F7DF1E" },
      "HTML5": { icon: Code, color: "#E34F26" },
      "CSS3": { icon: Code, color: "#1572B6" },
      "Bootstrap 5": { icon: Code, color: "#7952B3" },
      "Tailwind CSS": { icon: Code, color: "#06B6D4" },
      "Framer Motion": { icon: Code, color: "#EF4444" },
      "PostgreSQL": { icon: Database, color: "#336791" },
      "MySQL": { icon: Database, color: "#4479A1" },
      "ORM Optimization": { icon: Database, color: "#34D399" },
      "Relational Schema Design": { icon: Database, color: "#34D399" },
      "Query/Index Tuning": { icon: Database, color: "#34D399" },
      "Git": { icon: GitBranch, color: "#F05032" },
      "GitHub": { icon: GitBranch, color: "#181717" },
      "VS Code": { icon: Terminal, color: "#007ACC" },
      "Postman": { icon: Cloud, color: "#FF6C37" },
      "Vercel": { icon: Cloud, color: "#000000" },
      "Render": { icon: Cloud, color: "#46E3B7" },
      "CI/CD": { icon: Cloud, color: "#46E3B7" },
    };
    return skillIcons[skill] || { icon: Code, color: "var(--muted)" };
  };

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
      className={`skill-category ${isVisible ? 'skill-category-visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="skill-card"
        animate={{
          rotateX: mousePosition.y * -8,
          rotateY: mousePosition.x * 8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Border Glow */}
        <motion.div
          className="skill-card-glow"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, ${iconGlow}, transparent 70%)`,
          }}
        />

        {/* Top Decorative Line */}
        <motion.div
          className="skill-card-top-line"
          animate={{
            width: isHovered ? "100%" : "30%",
            background: isHovered ? iconGradient : "var(--border)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon Section with 3D Effect */}
        <motion.div
          className="skill-icon-wrapper"
          style={{ 
            background: iconBg,
            boxShadow: isHovered ? `0 0 40px ${iconGlow}` : 'none',
            transformStyle: "preserve-3d",
            transform: `translateZ(20px)`
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={24} style={{ color: iconColor }} />
          <div
            className="skill-icon-pulse"
            style={{ 
              background: iconGlow,
              position: "absolute",
              inset: "-6px",
              borderRadius: "1rem",
              opacity: isHovered ? 0.4 : 0,
              filter: "blur(12px)",
              transition: "opacity 0.5s ease",
              zIndex: 0,
            }}
          />
          
          {/* Floating Particles - Simplified */}
          {isHovered && (
            <div className="skill-icon-particles" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="skill-icon-particle"
                  style={{
                    background: iconColor,
                    width: 4 + Math.random() * 4,
                    height: 4 + Math.random() * 4,
                    position: "absolute",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    top: "50%",
                    left: "50%",
                    transform: `translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px)`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Category Name with Gradient Underline */}
        <div className="skill-category-header">
          <h3 className="skill-category-title">{group.category}</h3>
          <motion.span
            className="skill-category-arrow"
            animate={{ 
              x: isHovered ? 8 : 0,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight size={18} style={{ color: iconColor }} />
          </motion.span>
        </div>

        {/* Category Underline */}
        <motion.div
          className="skill-category-underline"
          animate={{
            width: isHovered ? "100%" : "20%",
            background: isHovered ? iconGradient : "var(--border)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Skill Items with Stagger */}
        <div className="skill-items">
          {group.items.map((item, idx) => {
            const { icon: SkillIcon, color: skillColor } = getSkillIcon(item);
            
            return (
              <motion.span
                key={item}
                className="skill-item"
                style={{
                  borderColor: `${skillColor}33`,
                  color: "var(--muted)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    delay: idx * 0.05 + 0.2,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }
                } : {}}
                whileHover={{
                  borderColor: skillColor,
                  color: "var(--text)",
                  scale: 1.12,
                  boxShadow: `0 0 30px ${skillColor}33`,
                  y: -4,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <SkillIcon size={10} style={{ color: skillColor }} />
                {item}
              </motion.span>
            );
          })}
        </div>

        {/* Skill Stats */}
        <motion.div
          className="skill-stats"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <div className="skill-stat-item">
            <span className="skill-stat-value">{group.items.length}</span>
            <span className="skill-stat-label">skills</span>
          </div>
          <div className="skill-stat-divider" />
          <div className="skill-stat-item">
            <span
              className="skill-stat-dot"
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                display: "inline-block",
                background: isHovered ? iconColor : "var(--muted)",
                transition: "background 0.3s ease",
              }}
            />
            <span className="skill-stat-label">expert</span>
          </div>
        </motion.div>

        {/* Progress Ring */}
        <motion.div
          className="skill-progress-ring"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              opacity="0.1"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovered ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                strokeDasharray: "100",
                strokeDashoffset: "0",
                rotate: "-90deg",
                transformOrigin: "center",
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Skills Component
export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const totalSkills = SKILLS.reduce((acc, group) => acc + group.items.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section"
    >
      {/* Background Effects */}
      <div className="skills-bg-grid" />
      <div className="skills-glow-orb-top" />
      <div className="skills-glow-orb-bottom" />
      <div className="skills-glow-orb-center" />

      <div className="skills-content">
        {/* Section Header - Animated */}
        <Reveal direction="up" delay={0.1}>
          <div className="skills-header">
            <motion.div
              className="skills-eyebrow-wrapper"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="skills-eyebrow-line" />
              <span className="skills-eyebrow-text">
                <Star size={12} style={{ color: "var(--accent)" }} />
                TOOLBOX
              </span>
            </motion.div>

            <motion.h2
              className="skills-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="skills-title-gradient">Skills Matrix</span>
            </motion.h2>

            <motion.p
              className="skills-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="skills-subtitle-icon">
                <Rocket size={16} style={{ color: "var(--accent)" }} />
              </span>
              <span className="skills-subtitle-highlight">{totalSkills}+</span> technologies mastered · 
              <span className="skills-subtitle-highlight">{SKILLS.length}</span> core domains · 
              <span className="skills-subtitle-gradient">production-ready</span>
            </motion.p>
          </div>
        </Reveal>

        {/* Skills Grid - Staggered Cards */}
        <div className="skills-grid">
          {SKILLS.map((group, index) => (
            <Reveal key={group.category} direction="up" delay={index * 0.08}>
              <SkillCategory
                group={group}
                index={index}
                isVisible={isVisible}
              />
            </Reveal>
          ))}
        </div>

        {/* Footer - Animated */}
        <Reveal direction="up" delay={0.2}>
          <motion.div
            className="skills-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="skills-footer-content">
              <span className="skills-footer-icon">
                <Infinity size={14} style={{ color: "var(--accent)" }} />
              </span>
              <span className="text-muted">Continuously learning & evolving</span>
              <span className="separator">·</span>
              <span className="text-accent">
                <Brain size={14} style={{ color: "var(--accent)" }} />
                {new Date().getFullYear() - 2020}+ years coding
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