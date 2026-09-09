import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { 
  TerminalIcon, 
  Mail, 
  Phone, 
  Github, 
  Linkedin,
  Sparkles,
  Rocket,
  ArrowRight,
  Globe,
  Heart,
  MessageCircle,
  Search
} from "lucide-react";
import { CONTACT_LINKS } from "../../data/contactData";
import codeBuildSolveRepeat from "../../assets/code-build-solve-repeat.png";
import "./Contact.css";

// Individual Contact Link Component
const ContactLink = ({ link, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef(null);

  const colorMap = {
    "subinsuresh8088@gmail.com": { primary: "#EF4444", glow: "rgba(239,68,68,0.3)" },
    "+91 94963 13744": { primary: "#60A5FA", glow: "rgba(96,165,250,0.3)" },
    "github.com/subinpk8088-pydj": { primary: "#34D399", glow: "rgba(52,211,153,0.3)" },
    "linkedin.com/in/subin-pk": { primary: "#F59E0B", glow: "rgba(245,158,11,0.3)" },
  };

  const color = colorMap[link.label] || { primary: "var(--accent)", glow: "rgba(239,68,68,0.3)" };

  const handleMouseMove = (e) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    linkRef.current.style.setProperty('--mouse-x', x);
    linkRef.current.style.setProperty('--mouse-y', y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (linkRef.current) {
      linkRef.current.style.setProperty('--mouse-x', '0');
      linkRef.current.style.setProperty('--mouse-y', '0');
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.06 + 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={linkRef}
      variants={linkVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="contact-link-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={`contact-link ${isHovered ? 'contact-link-hovered' : ''}`}
        style={{
          borderColor: isHovered ? color.primary : "rgba(148, 163, 184, 0.08)",
        }}
      >
        <div
          className="contact-link-glow"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${(parseFloat(linkRef.current?.style.getPropertyValue('--mouse-x')) || 0) * 100 + 50}% ${(parseFloat(linkRef.current?.style.getPropertyValue('--mouse-y')) || 0) * 100 + 50}%, ${color.glow}, transparent 70%)`,
          }}
        />

        <motion.div
          className="contact-link-icon"
          style={{
            background: isHovered ? color.primary : "rgba(255,255,255,0.03)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <link.icon size={18} style={{ color: isHovered ? "#fff" : color.primary }} />
        </motion.div>

        <span className="contact-link-label">{link.label}</span>

        <motion.span
          className="contact-link-arrow"
          animate={{
            x: isHovered ? 6 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={14} style={{ color: color.primary }} />
        </motion.span>

        <span
          className="contact-link-dot"
          style={{
            backgroundColor: isHovered ? color.primary : "var(--muted)",
          }}
        />
      </motion.a>
    </motion.div>
  );
};

// Main Contact Component
export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px", amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section"
    >
      {/* Background Effects */}
      <div className="contact-bg-grid" />
      <div className="contact-glow-orb-top" />
      <div className="contact-glow-orb-bottom" />
      <div className="contact-glow-orb-center">
        <div className="contact-glow-orb-inner" />
      </div>

      {/* Floating Particles */}
      <div className="contact-particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="contact-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: `var(--accent)`,
              opacity: 0.08 + Math.random() * 0.08,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* ============================================
          SPLIT LAYOUT: IMAGE LEFT | CONTENT RIGHT
          ============================================ */}
      <div className="contact-container">
        {/* LEFT SIDE - IMAGE */}
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-image-wrapper">
            <motion.img
              src={codeBuildSolveRepeat}
              alt="Code. Build. Solve. Repeat."
              className="contact-hero-image"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE - CONTENT */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Status Badge */}
          <div className={`contact-badge-wrapper ${isVisible ? 'visible' : ''}`}>
            <div className="contact-badge">
              <Search size={13} style={{ color: "var(--accent)" }} />
              <span className="contact-badge-text">status: available for full-time roles</span>
              <span className="contact-badge-dot" />
            </div>
          </div>

          {/* Main Heading */}
          <div className={`contact-heading ${isVisible ? 'visible' : ''}`}>
            <h2 className="contact-title">
              <span className="contact-title-gradient">Let's build</span>
              <span className="contact-title-highlight">something</span>
              <span className="contact-title-gradient">worth deploying.</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className={`contact-subtitle ${isVisible ? 'visible' : ''}`}>
            <Rocket size={16} style={{ color: "var(--accent)" }} />
            <span>Reachable directly, no forms in the middle.</span>
          </p>

          {/* Contact Links Grid */}
          <div className="contact-links-grid">
            {CONTACT_LINKS.map((link, index) => (
              <ContactLink
                key={link.label}
                link={link}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Footer */}
          <div className={`contact-footer ${isVisible ? 'visible' : ''}`}>
            <div className="contact-footer-content">
              <Heart size={14} style={{ color: "var(--accent)" }} />
              <span className="text-muted">Open to collaboration</span>
              <span className="separator">·</span>
              <MessageCircle size={14} style={{ color: "var(--accent)" }} />
              <span className="text-accent">Let's connect</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div
        className={`contact-decorative-line ${isVisible ? 'visible' : ''}`}
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
};