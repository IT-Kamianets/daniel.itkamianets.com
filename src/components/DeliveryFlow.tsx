import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

export default function DeliveryFlow() {
  const { t } = useLanguage();
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinish = () => {
    clearCart();
    setStep(1);
  };

  return (
    <section id="delivery" className="py-10 md:py-16 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("delivery")}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Простий і рівний Progress Bar з нормальними стрілками */}
        <div className="flex items-start justify-between max-w-2xl mx-auto mb-8 md:mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 w-20 md:w-24 shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-500 z-10 ${step >= 1 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"}`}>
              <ShoppingBag size={18} className="md:w-5 md:h-5" />
            </div>
            <span className={`text-[10px] md:text-xs font-medium text-center ${step >= 1 ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`}>{t("cart")}</span>
          </div>

          {/* Стрілка 1 */}
          <div className="flex-1 flex items-center pt-5 md:pt-6 px-1 md:px-2">
            <div className={`w-full h-[2px] relative transition-colors duration-300 ${step > 1 ? "bg-orange-500" : "bg-zinc-200 dark:bg-zinc-800"}`}>
              <ChevronRight size={16} className={`absolute -right-2 top-1/2 -translate-y-1/2 md:w-5 md:h-5 transition-colors duration-300 ${step > 1 ? "text-orange-500" : "text-zinc-200 dark:text-zinc-800"}`} />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 w-20 md:w-24 shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-500 z-10 ${step >= 2 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"}`}>
              <MapPin size={18} className="md:w-5 md:h-5" />
            </div>
            <span className={`text-[10px] md:text-xs font-medium text-center ${step >= 2 ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`}>{t("delivery")}</span>
          </div>

          {/* Стрілка 2 */}
          <div className="flex-1 flex items-center pt-5 md:pt-6 px-1 md:px-2">
            <div className={`w-full h-[2px] relative transition-colors duration-300 ${step > 2 ? "bg-orange-500" : "bg-zinc-200 dark:bg-zinc-800"}`}>
              <ChevronRight size={16} className={`absolute -right-2 top-1/2 -translate-y-1/2 md:w-5 md:h-5 transition-colors duration-300 ${step > 2 ? "text-orange-500" : "text-zinc-200 dark:text-zinc-800"}`} />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 w-20 md:w-24 shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-500 z-10 ${step >= 3 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"}`}>
              <CreditCard size={18} className="md:w-5 md:h-5" />
            </div>
            <span className={`text-[10px] md:text-xs font-medium text-center ${step >= 3 ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`}>{t("confirm")}</span>
          </div>
        </div>

        <div className={`bg-white dark:bg-zinc-950 rounded-3xl p-4 md:p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 relative transition-all duration-500 ease-in-out flex flex-col ${
          step === 1 
            ? "min-h-[250px]" 
            : step === 2
            ? "min-h-0 md:min-h-[480px]"
            : "min-h-[300px] md:min-h-[480px]"
        }`}>
          
          <AnimatePresence mode="wait">
            {/* Step 1: Cart */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="flex flex-col h-full w-full flex-1"
              >
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500 dark:text-zinc-400 py-10">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                    <p>{t("emptyCart")}</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 md:space-y-3 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar mb-4">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex items-center justify-between p-2 md:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.nameKey}
                              className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-bold text-xs md:text-base text-zinc-900 dark:text-white leading-tight">
                                {item.nameKey}
                              </h4>
                              <p className="text-[10px] md:text-xs text-zinc-500">
                                {item.size} cm
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 md:gap-4 ml-auto">
                            <div className="font-bold text-orange-500 w-10 md:w-16 text-right flex flex-col items-end leading-tight">
                              <span className="text-xs md:text-sm">{item.price * item.quantity}</span>
                              <span className="text-[10px] md:text-xs">{t("currency")}</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 bg-white dark:bg-zinc-950 rounded-lg p-1 border border-zinc-200 dark:border-zinc-800 shrink-0">
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="p-0.5 hover:text-orange-500 transition-colors cursor-pointer"
                              >
                                <Minus size={12} className="md:w-3.5 md:h-3.5" />
                              </motion.button>
                              <span className="text-xs md:text-sm font-bold w-3 md:w-4 text-center">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="p-0.5 hover:text-orange-500 transition-colors cursor-pointer"
                              >
                                <Plus size={12} className="md:w-3.5 md:h-3.5" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 size={16} className="md:w-4 md:h-4" />
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto shrink-0">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                          {t("total")}:
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-orange-500">
                          {total} {t("currency")}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          onClick={nextStep}
                          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-colors text-sm md:text-base cursor-pointer"
                        >
                          {t("next")} <ChevronRight size={18} className="md:w-5 md:h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 2: Delivery Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="flex flex-col h-full w-full md:flex-1"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    nextStep();
                  }}
                  className="flex flex-col md:flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:flex-1">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          {t("name")}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                          placeholder={t("yourName")}
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          {t("phone")}
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                          placeholder="+380..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          {t("addressForm")}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                          placeholder={t("street")}
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                          {t("paymentMethod")}
                        </label>
                        <div className="flex gap-3 md:gap-4">
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value="cash"
                              checked={paymentMethod === "cash"}
                              onChange={() => setPaymentMethod("cash")}
                              className="peer sr-only"
                            />
                            <div className="p-2.5 md:p-3 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 text-zinc-600 dark:text-zinc-400 peer-checked:text-orange-500 transition-all text-sm md:text-base">
                              {t("cash")}
                            </div>
                          </label>
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={paymentMethod === "card"}
                              onChange={() => setPaymentMethod("card")}
                              className="peer sr-only"
                            />
                            <div className="p-2.5 md:p-3 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 text-zinc-600 dark:text-zinc-400 peer-checked:text-orange-500 transition-all text-sm md:text-base">
                              {t("card")}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative min-h-[150px] w-full mt-2 md:mt-0">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }}
                      ></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-orange-500">
                        <MapPin size={28} className="animate-bounce md:w-8 md:h-8" />
                        <div className="w-6 h-1.5 md:w-8 md:h-2 bg-orange-500/20 rounded-full blur-sm mt-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 md:pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-2 md:mt-6 shrink-0">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={prevStep}
                      className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold transition-colors text-sm md:text-base cursor-pointer"
                    >
                      <ChevronLeft size={18} className="md:w-5 md:h-5" /> {t("back")}
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-colors text-sm md:text-base cursor-pointer"
                    >
                      {t("pay")} <ChevronRight size={18} className="md:w-5 md:h-5" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle2 size={60} className="text-emerald-500 mb-4 md:mb-6 md:w-20 md:h-20" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4">
                  {t("orderConfirmed")}
                </h3>
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8 max-w-md">
                  {t("orderDesc")}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={handleFinish}
                  className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-colors text-sm md:text-base cursor-pointer"
                >
                  {t("backToMenu")}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}