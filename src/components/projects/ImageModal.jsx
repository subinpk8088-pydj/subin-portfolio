import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./ImageModal.css";

export const ImageModal = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="image-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="image-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="image-modal-close" onClick={onClose}>
            <X size={24} />
          </button>

          {/* Image */}
          <div className="image-modal-image-wrapper">
            <img
              src={images[currentIndex]}
              alt={`Project screenshot ${currentIndex + 1}`}
              className="image-modal-image"
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="image-modal-nav image-modal-nav-prev"
                onClick={onPrev}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="image-modal-nav image-modal-nav-next"
                onClick={onNext}
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="image-modal-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`image-modal-dot ${index === currentIndex ? "active" : ""}`}
                onClick={onPrev}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="image-modal-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};