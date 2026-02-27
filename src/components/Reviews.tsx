import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { reviewsData } from "../i18n/translations";
import { useState, useEffect, useRef } from "react";

export default function Reviews() {
  const { language, t } = useLanguage();
  const reviews = reviewsData[language];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const card = carouselRef.current.querySelector('[data-card]') as HTMLElement;
        if (card) {
          const gap = window.innerWidth < 768 ? 16 : 24;
          setCardWidth(card.offsetWidth + gap);
        }
      }
    };
    
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const allReviews = [...reviews, ...reviews, ...reviews, ...reviews];
  const scrollDuration = 50; // Трохи уповільнимо для більшої плавності
  const scrollDistance = Math.round(cardWidth * reviews.length);

  return (
    <section id="reviews" className="py-10 md:py-16 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("reviews")}
          </h2>
          <div className="w-16 md:w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#1B3425' }}></div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              ref={carouselRef}
              className="flex gap-2 md:gap-4 lg:gap-6"
              initial={{ x: 0 }}
              animate={{ x: -scrollDistance }}
              transition={{
                duration: scrollDuration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{ 
                width: 'max-content',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              {allReviews.map((review, index) => (
                <div
                  key={`${review.author}-${index}`}
                  data-card
                  className="w-56 sm:w-64 md:w-72 lg:w-80 flex-shrink-0"
                >
                  <div className="h-full bg-zinc-50 dark:bg-zinc-900 rounded-xl md:rounded-2xl p-4 md:p-5 border border-zinc-100 dark:border-zinc-800 flex flex-col">
                    <div className="flex gap-0.5 mb-2 md:mb-3">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-base md:text-lg">⭐</span>
                      ))}
                    </div>

                    <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 md:mb-4 italic line-clamp-4 flex-grow">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-zinc-900 dark:text-white">
                        {review.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}
