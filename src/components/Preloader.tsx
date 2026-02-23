import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(onComplete, 800); // Wait for fade out animation
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
    >
      <div className="relative w-32 h-32">
        {/* Simple pizza slice drawing animation */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500">
          <motion.path
            d="M50 10 L90 80 A 50 20 0 0 1 10 80 Z"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="5"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
          <motion.circle
            cx="40"
            cy="65"
            r="4"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          />
          <motion.circle
            cx="60"
            cy="60"
            r="6"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          />
        </svg>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute mt-40 font-serif text-3xl font-bold text-orange-500 tracking-widest uppercase"
      >
        Daniel Pizzeria
      </motion.h1>
    </motion.div>
  );
}
