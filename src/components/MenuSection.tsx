import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import {
  Plus,
  Check,
  Search,
  Heart,
  X,
  ChevronDown,
  ChevronUp,
  Maximize2,
} from "lucide-react";
import menuData from "../../menu.json";

interface Product {
  slug: string;
  title: { uk: string; en: string };
  price: number;
  description: { uk: string; en: string };
  image: string;
}

interface Subcategory {
  name: { uk: string; en: string };
  products: Product[];
}

interface Category {
  name: { uk: string; en: string };
  products?: Product[];
  subcategories?: Subcategory[];
}

export default function MenuSection() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const dropdownRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = menuData.categories as Category[];

  // Get all products for search/favorites
  const allProducts = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.subcategories
        ? cat.subcategories.flatMap((sub) => sub.products)
        : cat.products || []
    );
  }, [categories]);

  // State
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [activeSubcatIdx, setActiveSubcatIdx] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [numCols, setNumCols] = useState(5);

  // Responsive columns for masonry
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) setNumCols(2);
      else if (window.innerWidth < 1024) setNumCols(3);
      else if (window.innerWidth < 1280) setNumCols(4);
      else setNumCols(5);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const activeCategory = categories[activeCategoryIdx];
  const hasSubcats = !!activeCategory?.subcategories && activeCategory.subcategories.length > 0;

  // Get products for current category/subcategory
  const categoryProducts = useMemo(() => {
    if (!activeCategory) return [];

    if (!hasSubcats) {
      return activeCategory.products || [];
    }

    if (activeSubcatIdx === 0) {
      return activeCategory.subcategories!.flatMap((sub) => sub.products);
    } else {
      const subIndex = activeSubcatIdx - 1;
      if (subIndex >= 0 && subIndex < activeCategory.subcategories!.length) {
        return activeCategory.subcategories![subIndex].products;
      }
      return [];
    }
  }, [activeCategory, hasSubcats, activeSubcatIdx]);

  // Filter products - search/favorites work across ALL products
  const filteredProducts = useMemo(() => {
    let baseProducts: Product[];
    
    if (searchQuery || showFavoritesOnly) {
      baseProducts = allProducts;
    } else {
      baseProducts = categoryProducts;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      baseProducts = baseProducts.filter((product) => {
        const title = product.title[language].toLowerCase();
        const words = title.split(/[\s"']+/);
        return words.some((word) => word.startsWith(query));
      });
    }

    if (showFavoritesOnly) {
      baseProducts = baseProducts.filter((p) => likedProducts.has(p.slug));
    }

    return baseProducts;
  }, [categoryProducts, allProducts, searchQuery, showFavoritesOnly, likedProducts, language]);

  // Handlers
  const toggleLike = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart({
      id: product.slug,
      nameKey: product.title[language],
      price: !isNaN(product.price) ? product.price : 0,
      size: "",
      image: product.image,
    });
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: t("addedToCart") }]);
    setTimeout(() => removeToast(id), 2000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const selectCategory = (idx: number) => {
    setActiveCategoryIdx(idx);
    setActiveSubcatIdx(0);
    setSearchQuery("");
    setShowFavoritesOnly(false);
    setOpenDropdown(null);
  };

  const selectSubcategory = (catIdx: number, subIdx: number) => {
    setActiveCategoryIdx(catIdx);
    setActiveSubcatIdx(subIdx);
    setSearchQuery("");
    setShowFavoritesOnly(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (idx: number) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown === null) return;
      const target = e.target as HTMLElement;
      const btn = dropdownRefs.current[openDropdown];
      if (btn && !btn.contains(target) && !target.closest(".dropdown-menu")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdown]);

  // Block body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedProduct]);

  // Create masonry columns from filtered products
  const masonryColumns = Array.from({ length: numCols }, () => [] as Product[]);
  filteredProducts.forEach((item, i) => {
    masonryColumns[i % numCols].push(item);
  });

  return (
    <section id="menu" className="py-10 md:py-16 bg-white dark:bg-zinc-950 overflow-hidden relative">
      {/* Toasts */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl font-medium text-sm md:text-base whitespace-nowrap"
            >
              <Check size={18} />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("menu")}
          </h2>
          <div className="w-16 md:w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "#1B3425" }}></div>
        </motion.div>

        {/* Search & Favorites */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="text"
              placeholder={`${t("search")}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-12 pr-10 py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#1B3425" } as React.CSSProperties}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                type="button"
              >
                <X size={18} className="text-zinc-400" />
              </button>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              setSearchQuery("");
            }}
            className={`p-3 rounded-xl border transition-colors cursor-pointer ${
              showFavoritesOnly
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500"
            }`}
            title={t("favorites")}
            type="button"
          >
            <Heart size={22} fill={showFavoritesOnly ? "currentColor" : "none"} />
          </motion.button>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category, idx) => {
            const hasSubs = category.subcategories && category.subcategories.length > 0;
            const isActive = activeCategoryIdx === idx;
            const isOpen = openDropdown === idx;

            return (
              <div key={category.name[language]} className="relative">
                <motion.button
                  ref={(el) => (dropdownRefs.current[idx] = el)}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasSubs) {
                      toggleDropdown(idx);
                    } else {
                      selectCategory(idx);
                    }
                  }}
                  className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    isActive && !searchQuery && !showFavoritesOnly
                      ? "text-white shadow-lg"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                  style={
                    isActive && !searchQuery && !showFavoritesOnly
                      ? { backgroundColor: "#1B3425", boxShadow: "0 10px 15px rgba(27, 52, 37, 0.3)" }
                      : {}
                  }
                  type="button"
                >
                  {category.name[language]}
                  {hasSubs && (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isOpen && hasSubs && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-40 min-w-[160px] md:min-w-[200px] overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-2 max-h-[250px] md:max-h-[300px] overflow-y-auto">
                        <button
                          onClick={() => selectSubcategory(idx, 0)}
                          className={`w-full px-3 py-2 md:px-4 md:py-2.5 text-left text-xs md:text-sm transition-colors cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${
                            activeSubcatIdx === 0 && isActive
                              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium"
                              : "text-zinc-700 dark:text-zinc-300"
                          }`}
                          type="button"
                        >
                          {t("allProducts")} ({category.subcategories!.reduce((sum, s) => sum + s.products.length, 0)})
                        </button>
                        {category.subcategories!.map((sub, subIdx) => {
                          const realIdx = subIdx + 1;
                          return (
                            <button
                              key={sub.name[language]}
                              onClick={() => selectSubcategory(idx, realIdx)}
                              className={`w-full px-3 py-2 md:px-4 md:py-2.5 text-left text-xs md:text-sm transition-colors cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${
                                activeSubcatIdx === realIdx && isActive
                                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium"
                                  : "text-zinc-700 dark:text-zinc-300"
                              }`}
                              type="button"
                            >
                              {sub.name[language]} ({sub.products.length})
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Products Grid - JS Masonry Layout */}
        <div className="w-full min-h-[40vh]">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex items-start gap-4 md:gap-6 w-full"
              >
                {masonryColumns.map((col, colIdx) => (
                  <div key={colIdx} className="flex-1 flex flex-col gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                      {col.map((product) => {
                        const isLiked = likedProducts.has(product.slug);
                        return (
                          <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-zinc-100 dark:border-zinc-800 w-full h-fit"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden group/img cursor-pointer" onClick={() => setSelectedProduct(product)}>
                              <img
                                src={product.image || "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"}
                                alt={product.title[language]}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80";
                                }}
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                                <motion.button
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                  }}
                                  className="bg-white/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg cursor-pointer"
                                  type="button"
                                >
                                  <Maximize2 size={16} />
                                  {t("viewDetails")}
                                </motion.button>
                              </div>
                            </div>

                            <div className="p-3 md:p-4">
                              <h3 className="text-lg md:text-xl font-bold font-serif text-zinc-900 dark:text-white mb-2">
                                {product.title[language]}
                              </h3>
                              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-3 leading-snug">
                                {product.description[language]}
                              </p>
                              <div className="flex items-center justify-between">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => toggleLike(e, product.slug)}
                                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                                    isLiked
                                      ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                                      : "text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                  }`}
                                  type="button"
                                >
                                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                                </motion.button>

                                <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                                  {!isNaN(product.price) ? `${product.price} ${t("currency")}` : t("priceByWeight")}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex w-full items-center justify-center pt-20 pb-12 text-zinc-500 dark:text-zinc-400"
              >
                <p className="text-lg md:text-xl font-medium">{showFavoritesOnly ? t("noFavorites") : t("noResults")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl w-full max-w-[85vw] md:max-w-4xl max-h-[75vh] md:max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
                  <div className="relative aspect-square rounded-lg md:rounded-2xl overflow-hidden">
                    <img
                      src={selectedProduct.image || "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"}
                      alt={selectedProduct.title[language]}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-2xl md:text-4xl font-bold font-serif text-zinc-900 dark:text-white mb-2 md:mb-4">
                      {selectedProduct.title[language]}
                    </h3>
                    <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3 md:mb-6">
                      {selectedProduct.description[language]}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3 md:mb-6">
                        <span className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                          {!isNaN(selectedProduct.price) ? `${selectedProduct.price} ${t("currency")}` : t("priceByWeight")}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => toggleLike(e, selectedProduct.slug)}
                          className={`p-2 md:p-3 rounded-xl border transition-colors cursor-pointer ${
                            likedProducts.has(selectedProduct.slug)
                              ? "text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                              : "text-zinc-400 hover:text-red-500 border-zinc-200 dark:border-zinc-700"
                          }`}
                          type="button"
                        >
                          <Heart
                            size={18}
                            fill={likedProducts.has(selectedProduct.slug) ? "currentColor" : "none"}
                          />
                        </motion.button>
                      </div>

                      {/* Close button */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedProduct(null)}
                        className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-2 md:py-3 px-4 md:px-6 rounded-xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer text-xs md:text-base"
                        type="button"
                      >
                        Закрити
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
