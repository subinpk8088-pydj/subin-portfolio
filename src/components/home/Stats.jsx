import { useState, useEffect } from "react";
import { Reveal } from "../ui/Reveal";
import { STATS } from "../../data/statsData";
import { TerminalPanel } from "./TerminalPanel";
import "./Stats.css";
import bgImage from "../../assets/stats-bg.png";

export const Stats = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="stats-section">
      {/* Media block (image + overlay) — becomes a top banner on mobile */}
      <div className="stats-media">
        <div
          className="stats-bg-image"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="stats-overlay-light" />
      </div>

      {/* Content */}
      <div className="stats-container">
        <div className="stats-grid">
          <div className="stats-left" />

          <div className="stats-right">
            {/* Terminal Panel - Animated */}
            <div className="stats-terminal-wrapper">
              <Reveal direction="up" delay={isMobile ? 0 : 0.1}>
                <TerminalPanel />
              </Reveal>
            </div>

            {/* Stats Cards - Staggered with mobile optimization */}
            <div className="stats-cards-wrapper">
              {STATS.map((stat, i) => (
                <Reveal 
                  key={stat.label} 
                  direction="up" 
                  delay={isMobile ? 0 : i * 0.08 + 0.1}
                >
                  <div className="stats-card">
                    <stat.icon size={20} className="stats-card-icon" />
                    <div className="stats-card-value">{stat.value}</div>
                    <div className="stats-card-label">{stat.label}</div>
                    <div className="stats-card-detail">{stat.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};