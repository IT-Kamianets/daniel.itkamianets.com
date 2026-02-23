import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, Clock, Users, CheckCircle2 } from "lucide-react";

export default function TableBookingMap() {
  const { t } = useLanguage();
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "18:00",
    guests: 2,
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setFormData({
        date: "",
        time: "18:00",
        guests: 2,
        name: "",
        phone: "",
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="booking" className="py-10 md:py-16 bg-zinc-50 dark:bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 font-serif">
            {t("bookTable")}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-orange-500 mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-950 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative h-48 md:h-auto">
              <img
                src="/images/gallery/14.jpg"
                alt="Restaurant Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Прибрано текст поверх фото */}
            </div>

            {/* Form Side */}
            <div className="w-full md:w-1/2 p-6 md:p-10">
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-5"
                  >
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-2">
                          <Calendar size={14} className="text-orange-500" />
                          {t("date")}
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-2">
                            <Clock size={14} className="text-orange-500" />
                            {t("time")}
                          </label>
                          <input
                            type="time"
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-2">
                            <Users size={14} className="text-orange-500" />
                            {t("guests")}
                          </label>
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          {t("name")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder={t("yourName") || "Your Name"}
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                          {t("phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+380..."
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 md:py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30 text-sm md:text-base"
                    >
                      {t("confirm")}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-8 md:py-12"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 md:mb-6">
                      <CheckCircle2 size={32} className="text-emerald-500 md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                      {t("successBooking")}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
                      {t("managerContact")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
