export const SectionHeading = ({ eyebrow, title }) => {
  return (
    <div>
      <div 
        className="text-xs font-mono uppercase tracking-widest mb-3"
        style={{ color: "var(--accent)" }}
      >
        {eyebrow}
      </div>
      <h2 
        className="font-display text-3xl md:text-4xl font-semibold"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>
    </div>
  );
};