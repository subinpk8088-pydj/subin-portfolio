import { Reveal } from "../ui/Reveal";

export const Footer = () => {
  return (
    <footer className="px-5 md:px-8 py-8" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm">
          <span style={{ color: "var(--text)" }}>subin</span>
          <span style={{ color: "var(--accent)" }}>.dev</span>
        </div>
        <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Subin P K — built with React, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  );
};