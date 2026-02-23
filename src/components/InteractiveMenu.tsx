import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { Plus, Check, Search, Heart } from "lucide-react";
import pizzasData from "../data/pizzas.json";

const sizes = [
  { id: "30", labelKey: "size30" },
  { id: "45", labelKey: "size45" },
  { id: "60", labelKey: "size60" },
];

export default function InteractiveMenu() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [activePizza, setActivePizza] = useState(pizzasData[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPizzas, setLikedPizzas] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredPizzas = useMemo(() => {
    let pizzas = pizzasData;

    if (showFavoritesOnly) {
      pizzas = pizzas.filter((pizza) => likedPizzas.has(pizza.id));
    }

    if (!searchQuery) return pizzas;

    const lowerQuery = searchQuery.toLowerCase();
    return pizzas.filter((pizza) => {
      // @ts-ignore
      const name = pizza.name[language].toLowerCase();
      // @ts-ignore
      const ingredients = pizza.ingredients[language].toLowerCase();
      return name.includes(lowerQuery) || ingredients.includes(lowerQuery);
    });
  }, [searchQuery, language, showFavoritesOnly, likedPizzas]);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPizzas((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // @ts-ignore
    const price = activePizza.price[activeSize.id];
    
    addToCart({
      id: activePizza.id,
      nameKey: activePizza.name[language], // Storing the translated name directly for now, or key if we had one
      price: price,
      size: activeSize.id,
      image: `/images/pizzas/${activePizza.image}`
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section
      id="menu"
      className="py-10 md:py-16 bg-white dark:bg-zinc-950 overflow-hidden relative"
    >
      {/* Toast Notification - Top Center */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-20 left-1/2 z-50 flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl font-medium text-sm md:text-base"
          >
            <Check size={18} />
            {t("addedToCart")}
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="w-16 md:w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* LEFT: Pizza Display (No Rotation) */}
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[550px] flex items-center justify-center order-1 lg:order-none">
            {/* Background decorative circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] rounded-full border border-zinc-200 dark:border-zinc-800 border-dashed"></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePizza.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative z-20 w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px]"
              >
                <img
                  src={`/images/pizzas/${activePizza.image}`}
                  alt={activePizza.name[language]}
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
                  onError={(e) => {
                    // Fallback if local image is missing
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Menu List */}
          <div className="w-full lg:w-1/2 flex flex-col h-[450px] md:h-[550px] lg:h-[600px] order-2 lg:order-none">
            {/* Size Selector */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-center lg:justify-start gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setActiveSize(size)}
                    className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all ${
                      activeSize.id === size.id
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {t(size.labelKey as any)}
                  </button>
                ))}
              </div>

              {/* Search Bar & Favorites */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input
                    type="text"
                    placeholder={t("search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    showFavoritesOnly
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                      : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500"
                  }`}
                  title={t("favorites")}
                >
                  <Heart size={20} fill={showFavoritesOnly ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {filteredPizzas.length > 0 ? (
                filteredPizzas.map((pizza) => {
                  const isActive = activePizza.id === pizza.id;
                  // @ts-ignore
                  const price = pizza.price[activeSize.id];
                  const isLiked = likedPizzas.has(pizza.id);

                  return (
                    <motion.div
                      key={pizza.id}
                      className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        isActive
                          ? "bg-white dark:bg-zinc-900 border-orange-500 shadow-xl"
                          : "bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                      }`}
                      onClick={() => setActivePizza(pizza)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3
                            className={`text-lg md:text-xl font-bold font-serif ${
                              isActive
                                ? "text-orange-500"
                                : "text-zinc-900 dark:text-white"
                            }`}
                          >
                            {pizza.name[language]}
                          </h3>
                          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 pr-2 line-clamp-2">
                            {pizza.ingredients[language]}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                            {price} {t("currency")}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => toggleLike(e, pizza.id)}
                              className={`p-1.5 rounded-full transition-all ${
                                isLiked
                                  ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                              }`}
                            >
                              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                            </button>
                            <button
                              onClick={handleAddToCart}
                              className={`p-1.5 rounded-full transition-all ${
                                isActive
                                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/30"
                                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white"
                              }`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
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
