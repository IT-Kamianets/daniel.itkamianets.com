import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const isModalOpen = document.body.style.overflow === "hidden";
      if (window.scrollY > 300 && !isModalOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const checkModalState = () => {
      const isModalOpen = document.body.style.overflow === "hidden";
      const isScrolled = window.scrollY > 300;
      if (isModalOpen) {
        setIsVisible(false);
      } else if (isScrolled) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkModalState();

    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 p-2.5 md:p-3 rounded-full text-white shadow-lg transition-colors cursor-pointer"
          style={{ backgroundColor: '#1B3425' }}
        >
          <ArrowUp size={20} className="md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
