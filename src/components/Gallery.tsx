import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Gallery() {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    // Generate paths for images 1.jpg through 30.jpg
    const imagePaths = Array.from({ length: 30 }, (_, i) => `/images/gallery/${i + 1}.jpg`);
    setPhotos(imagePaths);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, photos.length));
  };

  return (
    <section id="gallery" className="py-10 md:py-16 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("gallery")}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4 mb-8 md:mb-12">
          <AnimatePresence>
            {photos.slice(0, visibleCount).map((photo, index) => (
              <motion.div
                key={photo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 10) * 0.05 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl break-inside-avoid group"
              >
                <img
                  src={photo}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if local image is missing
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80&text=Image+${index+1}`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < photos.length && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-full font-medium transition-colors text-sm md:text-base"
            >
              <span>{t("loadMore") || "Load More"}</span>
              <ChevronDown size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
