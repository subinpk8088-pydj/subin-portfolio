import { motion } from "framer-motion";
import "./ProjectFilters.css";

const FILTERS = ['All', 'Full-Stack', 'E-Commerce', 'Data Visualization', 'Security', 'Productivity', 'Backend'];

export const ProjectFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="project-filters-wrapper">
      <div className="project-filters-scroll">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="project-filter-btn"
              style={{
                background: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                color: isActive ? '#fff' : 'var(--muted)',
                border: isActive 
                  ? '1px solid var(--accent)' 
                  : '1px solid rgba(148,163,184,0.06)',
              }}
              whileHover={{ 
                scale: 1.05,
                borderColor: isActive ? 'var(--accent)' : 'var(--accent)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};