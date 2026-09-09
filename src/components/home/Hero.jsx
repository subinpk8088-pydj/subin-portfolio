import { forwardRef, useState, useEffect, useRef } from "react";
import { Award, ArrowRight, Download, Sparkles, Code, Cpu } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import heroPhoto from "../../assets/hero.jpg";
import styles from "./Hero.module.css";

// Floating particles component - REDUCED from 20 to 10
const FloatingParticles = () => {
  // Reduced particle count for better performance
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2, // Smaller size
    duration: Math.random() * 15 + 10, // Reduced duration range
    delay: Math.random() * 3,
    opacity: Math.random() * 0.2 + 0.1,
  }));

  return (
    <div className={styles.particlesContainer}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--opacity': p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// Geometric shapes component - REDUCED from 5 to 3
const GeometricShapes = () => {
  const shapes = [
    { type: "circle", size: 60, x: 10, y: 20 },
    { type: "square", size: 50, x: 85, y: 15 },
    { type: "circle", size: 40, x: 90, y: 75 },
  ];

  const getShapeClass = (type) => {
    switch(type) {
      case "circle": return styles.shapeCircle;
      case "square": return styles.shapeSquare;
      case "triangle": return styles.shapeTriangle;
      default: return "";
    }
  };

  const getShapeStyle = (type, size) => {
    if (type === "triangle") {
      return {
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderBottom: `${size}px solid rgba(239,68,68,0.08)`,
      };
    }
    return {
      width: size,
      height: size,
    };
  };

  return (
    <div className={styles.shapesContainer}>
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`${styles.shape} ${getShapeClass(shape.type)}`}
          style={{
            ...getShapeStyle(shape.type, shape.size),
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animationDelay: `${index * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Tech icons component - REDUCED from 3 to 2
const TechIcons = () => {
  const icons = [
    { Icon: Code, x: 10, y: 15, delay: 0 },
    { Icon: Cpu, x: 85, y: 60, delay: 1.5 },
  ];

  return (
    <div className={styles.techIconsContainer}>
      {icons.map((item, index) => (
        <div
          key={index}
          className={styles.techIcon}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <item.Icon size={30} style={{ color: "var(--accent)" }} />
        </div>
      ))}
    </div>
  );
};

// Typewriter effect - Optimized with cleanup
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <span>
      {displayText}
      <span className={styles.subtitleCursor}>|</span>
    </span>
  );
};

// Use forwardRef to accept the ref from parent
export const Hero = forwardRef(({ scrollTo }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Reduced from 0.1
        delayChildren: 0.2, // Reduced from 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced from 30
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Reduced from 0.8
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref || sectionRef}
      className={styles.heroContainer}
    >
      {/* Background Image */}
      <img
        src={heroPhoto}
        alt="Subin P K"
        className={styles.heroImage}
      />

      {/* Animated Elements - Optimized */}
      <FloatingParticles />
      <GeometricShapes />
      <TechIcons />

      {/* Glowing Line */}
      <div className={styles.glowLine} />

      {/* Accent Lines */}
      <div className={styles.accentLineLeft} />
      <div className={styles.accentLineRight} />

      {/* Overlays */}
      <div className={styles.overlayGradient} />
      <div className={styles.overlaySide} />
      <div className={styles.overlayTop} />

      {/* Content */}
      <div className={styles.contentWrapper}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Badge - Using Award variant */}
          <motion.div variants={itemVariants}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <Sparkles size={13} style={{ color: "var(--accent)" }} />
              </span>
              <Award size={13} style={{ color: "var(--accent)" }} />
              1.5+ years experience · Enterprise-grade solutions · RBAC & Django expert
              <span className={styles.badgeGlow} />
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={itemVariants} className={styles.greeting}>
            <span className={styles.greetingCursor}>▸</span> Hi, I'm
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className={styles.title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.span
              className={styles.titleGradient}
              animate={{
                backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
              }}
              transition={{
                duration: 1.5, // Reduced from 2
                ease: "easeInOut",
              }}
            >
              Subin P K
            </motion.span>
          </motion.h1>

          {/* Subtitle with Typewriter */}
          <motion.div variants={itemVariants}>
            <h2 className={styles.subtitle}>
              <TypewriterText text="Full-Stack Web Developer — Python, Django & React.js" />
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className={styles.description}>
            Building enterprise-grade full-stack applications — from
            RBAC-secured platforms to query-optimized production databases.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className={styles.ctaContainer}>
            <button
              onClick={() => scrollTo("projects")}
              className={styles.ctaPrimary}
            >
              View Projects <ArrowRight size={16} />
              <span className={styles.ctaPrimaryShimmer} />
            </button>

            <a
              href="/resume.pdf"
              download
              className={styles.ctaSecondary}
            >
              <Download size={16} /> Download Resume
              <span className={styles.ctaSecondaryGlow} />
            </a>
          </motion.div>

          {/* Tech Tags - With staggered reveal */}
          <motion.div variants={itemVariants} className={styles.tagsContainer}>
            {["React", "Django", "Python", "PostgreSQL", "Tailwind CSS"].map((tag, index) => (
              <Reveal key={tag} direction="up" delay={0.2 + index * 0.04}>
                <span className={styles.tag}>
                  <span className={styles.tagPulse}>{tag}</span>
                </span>
              </Reveal>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

// Add display name for better debugging
Hero.displayName = "Hero";