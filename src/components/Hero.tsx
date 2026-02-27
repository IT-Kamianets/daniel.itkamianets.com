import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="images/logo/hero.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-6 font-serif tracking-tight">
            {t("heroTitle")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm md:text-xl text-zinc-300 mb-5 md:mb-8 max-w-5xl mx-auto font-light leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <motion.a
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href="#menu"
            className="group flex items-center gap-2 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-colors cursor-pointer"
            style={{ backgroundColor: '#1B3425' }}
          >
            {t("viewMenu")}
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
