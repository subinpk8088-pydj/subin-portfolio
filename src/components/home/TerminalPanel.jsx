import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, X, Copy, Check } from "lucide-react";

const TERMINAL_LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "subin-pk — full-stack web developer" },
  { type: "gap" },
  { type: "cmd", text: "cat stack.json" },
  {
    type: "out",
    text: '{ "backend": ["Python", "Django", "DRF"], "frontend": ["React", "Tailwind"] }',
  },
  { type: "gap" },
  { type: "cmd", text: "./deploy.sh --env=production" },
  { type: "ok", text: "✓ RBAC verified — zero incidents" },
  { type: "ok", text: "✓ query latency reduced 35%" },
  { type: "out", text: "Build ready." },
];

const TerminalLine = ({ line, caret }) => {
  const lineVariants = {
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

  if (line.type === "cmd") {
    return (
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-2 items-center group"
      >
        <span className="text-accent font-bold">$</span>
        <span className="text-text font-mono">
          {line.text}
          {caret && (
            <span
              className="inline-block w-0.5 h-4 ml-0.5 animate-pulse"
              style={{ background: "var(--accent)" }}
            />
          )}
        </span>
        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ml-2"
          onClick={() => {
            navigator.clipboard?.writeText(line.text);
          }}
        >
          <Copy size={12} className="text-muted hover:text-accent transition-colors" />
        </span>
      </motion.div>
    );
  }

  if (line.type === "ok") {
    return (
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="pl-4 flex items-center gap-2"
      >
        <span className="text-green-400">✓</span>
        <span className="text-green-400 font-mono">
          {line.text}
          {caret && (
            <span
              className="inline-block w-0.5 h-4 ml-0.5 animate-pulse"
              style={{ background: "#22C55E" }}
            />
          )}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      className="pl-4"
    >
      <span className="text-muted font-mono">
        {line.text}
        {caret && (
          <span
            className="inline-block w-0.5 h-4 ml-0.5 animate-pulse"
            style={{ background: "var(--muted)" }}
          />
        )}
      </span>
    </motion.div>
  );
};

export const TerminalPanel = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef(null);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) {
      setDone(true);
      return;
    }

    const current = TERMINAL_LINES[lineIndex];

    if (current.type === "gap") {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 220);
      timeoutRefs.current.push(t);
      return () => clearTimeout(t);
    }

    if (charIndex < current.text.length) {
      const speed = current.type === "cmd" ? 32 : 6;
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      timeoutRefs.current.push(t);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 260);
    timeoutRefs.current.push(t);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  const handleCopyAll = async () => {
    const text = TERMINAL_LINES.filter((line) => line.type !== "gap")
      .map((line) => line.text)
      .join("\n");
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
    setLineIndex(0);
    setCharIndex(0);
    setDone(false);
  };

  return (
    <motion.div
      ref={terminalRef}
      className="rounded-2xl overflow-hidden w-full relative group"
      style={{
        background: "rgba(11, 15, 25, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      animate={{
        scale: isExpanded ? 1.02 : 1,
        boxShadow: isExpanded
          ? "0 40px 100px -20px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 30px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(245,158,11,0.05))",
        }}
      />

      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(148, 163, 184, 0.08)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span
            className="ml-3 text-xs font-mono tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1" />
            subin@portfolio:~
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="p-1 rounded hover:bg-white/5 transition-colors"
            onClick={handleCopyAll}
            title="Copy all"
          >
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} className="text-muted hover:text-text transition-colors" />
            )}
          </button>
          <button
            className="p-1 rounded hover:bg-white/5 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? (
              <Minimize2 size={14} className="text-muted hover:text-text transition-colors" />
            ) : (
              <Maximize2 size={14} className="text-muted hover:text-text transition-colors" />
            )}
          </button>
          <button
            className="p-1 rounded hover:bg-red-500/20 transition-colors"
            onClick={handleReset}
            title="Reset"
          >
            <X size={14} className="text-muted hover:text-red-400 transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* Terminal Content */}
      <motion.div
        className="p-5 font-mono text-[13px] leading-relaxed relative"
        style={{
          minHeight: isExpanded ? "400px" : "260px",
          maxHeight: isExpanded ? "600px" : "400px",
          overflow: "auto",
        }}
        animate={{
          minHeight: isExpanded ? 400 : 260,
          maxHeight: isExpanded ? 600 : 400,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
            }}
          />
        </div>

        {/* Lines */}
        {TERMINAL_LINES.slice(0, lineIndex).map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}

        {lineIndex < TERMINAL_LINES.length &&
          TERMINAL_LINES[lineIndex].type !== "gap" && (
            <TerminalLine
              line={{
                ...TERMINAL_LINES[lineIndex],
                text: TERMINAL_LINES[lineIndex].text.slice(0, charIndex),
              }}
              caret
            />
          )}

        {done && (
          <motion.div
            className="flex items-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-accent font-mono">$</span>
            <span className="w-2 h-4 ml-2 animate-pulse bg-accent" />
            <span className="ml-3 text-xs text-muted font-mono">
              — Ready for next command
            </span>
          </motion.div>
        )}

        {/* Status Bar - Matches your screenshot */}
        <motion.div
          className="mt-4 pt-3 flex items-center justify-between text-xs border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-muted font-mono">
            {done ? "✓ Completed" : `⚡ ${Math.round((lineIndex / TERMINAL_LINES.length) * 100)}%`}
          </span>
          <span className="text-muted font-mono">
            {TERMINAL_LINES.filter((l) => l.type !== "gap").length} commands
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};