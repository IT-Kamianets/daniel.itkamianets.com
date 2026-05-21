import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Music2, Github } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const { t } = useLanguage();

  const handleGithubClick = (e: MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("https://github.com/IT-Kamianets/daniel.itkamianets.com", "_blank");
    } else {
      setTimeout(() => {
        window.location.href = "https://github.com/IT-Kamianets/daniel.itkamianets.com";
      }, 300);
    }
  };

  return (
    <footer
      id="contacts"
      className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white py-8 md:py-12 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand & Status */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src="/images/logo/logo.png"
                alt="Daniel Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
              <div className="font-serif text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                Daniel
              </div>
            </div>
            <p className="text-xs md:text-sm">
              {t("footerTagline")}
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="font-semibold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
              {t("contacts")}
            </h4>
            <a
              href="tel:+380507232362"
              className="flex items-center gap-3 text-sm py-1 hover:underline"
            >
              <Phone size={16} style={{ color: '#1B3425' }} />
              <span>+380 50 723 2362</span>
            </a>
            <a
              href="tel:+380686080028"
              className="flex items-center gap-3 text-sm py-1 hover:underline"
            >
              <Phone size={16} style={{ color: '#1B3425' }} />
              <span>+380 68 608 0028</span>
            </a>
            <a
              href="mailto:daniel.big.family@gmail.com"
              className="flex items-center gap-3 text-sm py-1 hover:underline"
            >
              <Mail size={16} style={{ color: '#1B3425' }} />
              <span>daniel.big.family@gmail.com</span>
            </a>
          </div>

          {/* Location */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="font-semibold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
              {t("location")}
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={16} style={{ color: '#1B3425' }} className="shrink-0 mt-0.5" />
              <a
                href="https://maps.app.goo.gl/mZXywha91ieQrJxa9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >{t("address")}</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} style={{ color: '#1B3425' }} className="shrink-0" />
              <span>{t("workingHours")}</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="font-semibold mb-2 md:mb-3 uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
              {t("social")}
            </h4>
            <a
              href="https://www.instagram.com/daniel.pizzeria.kp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm py-1.5 rounded-lg hover:underline"
            >
              <Instagram size={16} style={{ color: '#1B3425' }} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@daniel.kamianets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm py-1.5 rounded-lg hover:underline"
            >
              <Music2 size={16} style={{ color: '#1B3425' }} />
              <span>TikTok</span>
            </a>
            <a
              href="https://www.facebook.com/p/%D0%94%D0%B0%D0%BD%D1%96%D0%B5%D0%BB%D1%8C-%D0%9A%D0%B0%D0%BC%D1%8F%D0%BD%D0%B5%D1%86%D1%8C-%D0%9F%D0%BE%D0%B4%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-100068689121934/?locale=uk_UA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm py-1.5 rounded-lg hover:underline"
            >
              <Facebook size={16} style={{ color: '#1B3425' }} />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-6 md:mb-8 transition-colors duration-300">
          <iframe
            src="https://maps.google.com/maps?q=Піцерія+Даніель,+Кам'янець-Подільський&hl=uk&z=16&output=embed"
            className="w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pizzeria Daniel Location"
          ></iframe>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs pt-6 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300 gap-3 md:gap-0">
          <div className="text-zinc-900 dark:text-zinc-100 text-center md:text-left">
            <div>© 2026 Daniel.</div>
            <div>{t("allRightsReserved")}</div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleGithubClick}
              className="p-1 rounded-full bg-black dark:bg-white cursor-pointer"
            >
              <Github
                size={14}
                className="text-white dark:text-black"
              />
            </motion.button>
            <span className="text-black dark:text-white text-center md:text-left">
              <div>Designed by</div>
              <div>Valtser V. O.</div>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
