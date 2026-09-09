import { motion } from "framer-motion";

export const Reveal = ({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  duration = 0.55,
  distance = 24,
  once = false, // ← Changed to false so animations replay
}) => {
  const variants = {
    up: { initial: { opacity: 0, y: distance }, whileInView: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -distance }, whileInView: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -distance }, whileInView: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: distance }, whileInView: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      className={className}
      initial={variants[direction].initial}
      whileInView={variants[direction].whileInView}
      viewport={{ 
        once: once, // ← Now controlled by prop
        margin: "-80px",
        amount: 0.1,
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};