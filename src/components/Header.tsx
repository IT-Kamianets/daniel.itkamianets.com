import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { Moon, Sun, Globe } from "lucide-react";
import { useRestaurantStatus } from "../hooks/useRestaurantStatus";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const isOpen = useRestaurantStatus();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "uk" ? "en" : "uk");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 ${
        isScrolled ? "py-3 shadow-md" : "py-5.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img 
            src="images/logo/logo.png" 
            alt="Daniel Pizzeria Logo" 
            className="h-9 md:h-11 w-auto object-contain"
          />
          <span className="font-serif text-2xl md:text-3xl font-bold text-orange-500">
            Daniel Pizzeria
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
          <a
            href="#menu"
            className="text-sm lg:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {t("menu")}
          </a>
          <a
            href="#booking"
            className="text-sm lg:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {t("booking")}
          </a>
          <a
            href="#delivery"
            className="text-sm lg:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {t("delivery")}
          </a>
          <a
            href="#gallery"
            className="text-sm lg:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {t("gallery")}
          </a>
          <a
            href="#reviews"
            className="text-sm lg:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {t("reviews")}
          </a>
          <a
            href="#contacts"
            className="text-sm lg:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {t("contacts")}
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Status */}
          <div className="hidden sm:flex items-center gap-2.5 bg-zinc-200 dark:bg-zinc-800 px-3.5 py-1.5 rounded-full">
            <div className="relative flex h-2.5 w-2.5">
              {isOpen && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOpen ? "bg-emerald-500" : "bg-red-500"
                }`}
              ></span>
            </div>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              {isOpen ? t("openNow") : t("closedUntil")}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={toggleLanguage}
            className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors text-xs md:text-sm font-bold md:font-semibold cursor-pointer"
          >
            <Globe size={14} className="md:w-[18px] md:h-[18px]" />
            <span className="uppercase">{language}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={toggleTheme}
            className="relative p-1.5 md:p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors overflow-hidden w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute"
              >
                {theme === "dark" ? <Moon size={16} className="md:w-5 md:h-5" /> : <Sun size={16} className="md:w-5 md:h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
