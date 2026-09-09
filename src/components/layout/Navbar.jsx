import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../../data/navData";

export const Navbar = ({ scrollTo, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Handle scroll with proper fallback
  const handleScrollTo = (id) => {
    // Close mobile menu
    setMenuOpen(false);
    
    // Use the scrollTo function passed from App
    if (scrollTo) {
      scrollTo(id);
    } else {
      // Fallback: directly find element
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }
    }
  };

  // Navbar entrance animation
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Staggered animation for nav links
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Mobile menu item stagger
  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(11,15,25,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(148,163,184,0.08)" : "1px solid transparent",
      }}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleScrollTo("about")}
          className="flex items-center gap-2 font-mono text-lg font-semibold group"
        >
          <motion.span
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="text-accent"
          >
            <Sparkles size={16} />
          </motion.span>
          <span style={{ color: "var(--text)" }}>subin</span>
          <span style={{ color: "var(--accent)" }}>.dev</span>
        </button>

        {/* Desktop Navigation - Staggered */}
        <motion.nav
          className="hidden md:flex items-center gap-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link.id}
              variants={itemVariants}
              onClick={() => handleScrollTo(link.id)}
              className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
              style={{
                color: activeSection === link.id ? "var(--text)" : "var(--muted)",
              }}
            >
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: "rgba(19,26,42,0.6)", 
                    border: "1px solid rgba(148,163,184,0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </motion.button>
          ))}
        </motion.nav>

        {/* Hire Me Button */}
        <motion.div
          className="hidden md:block"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={() => handleScrollTo("contact")}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Hire Me
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/5"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu - Staggered */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ 
              background: "rgba(11,15,25,0.95)", 
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(148,163,184,0.08)"
            }}
          >
            <motion.div
              className="px-5 py-4 flex flex-col gap-1"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.id}
                  variants={mobileItemVariants}
                  onClick={() => handleScrollTo(link.id)}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{
                    color: activeSection === link.id ? "var(--text)" : "var(--muted)",
                    background: activeSection === link.id ? "rgba(19,26,42,0.6)" : "transparent",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                variants={mobileItemVariants}
                onClick={() => handleScrollTo("contact")}
                className="mt-3 px-4 py-3 rounded-full text-sm font-semibold text-center transition-all duration-300 hover:scale-105"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                Hire Me
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};