import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { Plus, Check, Search, Heart, X } from "lucide-react";
import menuData from "../../menu.json";

export default function InteractiveMenu() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let target = el.scrollLeft;
    let isAnimating = false;

    const smoothScroll = () => {
      if (!el) return;
      const current = el.scrollLeft;
      const diff = target - current;
      
      if (Math.abs(diff) > 0.5 && isAnimating) {
        el.scrollLeft += diff * 0.12; 
        requestAnimationFrame(smoothScroll);
      } else {
        el.scrollLeft = target;
        isAnimating = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      
      // Якщо користувач почав крутити колесико, синхронізуємо ціль з поточним положенням
      if (!isAnimating) {
        target = el.scrollLeft;
      }
      
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, el.scrollWidth - el.clientWidth));

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Зупиняємо анімацію, якщо користувач клікнув або почав тягнути скролбар
    const onPointerDown = () => {
      isAnimating = false;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);
  
  const categories = menuData.categories;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = categories[activeCategoryIndex];
  
  const [activeProduct, setActiveProduct] = useState(activeCategory.products[0]);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      return categories.flatMap(cat => cat.products).filter((product) => {
        const name = product.title[language].toLowerCase();
        
        // Match only from the beginning of any word in the title
        const words = name.split(/[\s"']+/);
        return words.some(word => word.startsWith(lowerQuery));
      });
    }

    if (showFavoritesOnly) {
      return categories.flatMap(cat => cat.products).filter((p) => likedProducts.has(p.slug));
    }

    return activeCategory.products;
  }, [searchQuery, activeCategory, showFavoritesOnly, likedProducts, categories, language]);

  const toggleLike = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(slug)) {
        newLiked.delete(slug);
      } else {
        newLiked.add(slug);
      }
      return newLiked;
    });
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleCategoryChange = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveProduct(categories[index].products[0]);
    setSearchQuery("");
  };

  const handleProductSelect = (product: any) => {
    setActiveProduct(product);
    // If we are searching and select a product, we should find which category it belongs to
    if (searchQuery || showFavoritesOnly) {
      const catIndex = categories.findIndex(cat => 
        cat.products.some(p => p.slug === product.slug)
      );
      if (catIndex !== -1) {
        setActiveCategoryIndex(catIndex);
      }
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    
    addToCart({
      id: product.slug,
      nameKey: product.title[language],
      price: product.price && product.price !== "NaN" ? Number(product.price) : 0,
      size: "",
      image: product.image
    });

    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: t("addedToCart") }]);
    setTimeout(() => removeToast(id), 2000);
  };

  return (
    <section
      id="menu"
      className="py-10 md:py-16 bg-white dark:bg-zinc-950 overflow-hidden relative"
    >
      {/* Stacked Toast Notifications - Top Center */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              layout
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl font-medium text-sm md:text-base whitespace-nowrap"
            >
              <Check size={18} />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("menu")}
          </h2>
          <div className="w-16 md:w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#1B3425' }}></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* LEFT: Product Display (No Rotation) */}
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[550px] flex items-center justify-center order-1 lg:order-none">
            {/* Background decorative circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] rounded-full border border-zinc-200 dark:border-zinc-800 border-dashed"></div>
            </div>

            <AnimatePresence mode="wait">
              {activeProduct && (
                <motion.div
                  key={activeProduct.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-20 w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px]"
                >
                  <img
                    src={activeProduct.image || "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"}
                    alt={activeProduct.title[language]}
                    className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
                    onError={(e) => {
                      // Fallback if local image is missing
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Menu List */}
          <div className="w-full lg:w-1/2 flex flex-col h-[450px] md:h-[550px] lg:h-[600px] order-2 lg:order-none">
            {/* Search Bar & Favorites - NOW ON TOP */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input
                    type="text"
                    placeholder={`${t("search")}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#1B3425' } as React.CSSProperties}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                      type="button"
                    >
                      <X size={16} className="text-zinc-400" />
                    </button>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    showFavoritesOnly
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                      : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500"
                  }`}
                  title={t("favorites")}
                >
                  <Heart size={20} fill={showFavoritesOnly ? "currentColor" : "none"} />
                </motion.button>
              </div>

              {/* Category Selector - NOW BELOW SEARCH */}
              <div 
                ref={scrollRef}
                className="flex justify-start gap-2 overflow-x-auto p-1 -m-1"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name[language]}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={() => handleCategoryChange(index)}
                    className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      activeCategoryIndex === index && !searchQuery && !showFavoritesOnly
                        ? "text-white shadow-lg"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    style={activeCategoryIndex === index && !searchQuery && !showFavoritesOnly ? { backgroundColor: '#1B3425', boxShadow: '0 10px 15px rgba(27, 52, 37, 0.3)' } : {}}
                  >
                    {category.name[language]}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isActive = activeProduct?.slug === product.slug;
                  const price = product.price;
                  const isLiked = likedProducts.has(product.slug);

                  return (
                    <motion.div
                      key={product.slug}
                      className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        isActive
                          ? "bg-white dark:bg-zinc-900 shadow-xl"
                          : "bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                      }`}
                      style={isActive ? { borderColor: '#1B3425' } : {}}
                      onClick={() => handleProductSelect(product)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3
                            className="text-lg md:text-xl font-bold font-serif text-zinc-900 dark:text-white"
                          >
                            {product.title[language]}
                          </h3>
                          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 pr-2 line-clamp-2">
                            {product.description[language]}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                            {price && price !== "NaN" ? `${price} ${t("currency")}` : t("priceByWeight")}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={(e) => toggleLike(e, product.slug)}
                            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                              isLiked
                                ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                                : "text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            }`}
                          >
                            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                  <p>{showFavoritesOnly ? t("noFavorites") : t("noResults")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
