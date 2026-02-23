import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="contacts"
      className="bg-zinc-950 text-zinc-300 py-8 md:py-12 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand & Status */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src="/images/logo/logo.png" 
                alt="Daniel Pizzeria Logo" 
                className="h-12 md:h-16 w-auto object-contain"
              />
              <div className="font-serif text-2xl md:text-3xl font-bold text-orange-500">
                Daniel Pizzeria
              </div>
            </div>
            <p className="text-xs md:text-sm text-zinc-400">{t("heroSubtitle")}</p>
          </div>

          {/* Contacts */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-white font-semibold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">
              {t("contacts")}
            </h4>
            <a
              href="tel:+380507232362"
              className="flex items-center gap-3 hover:text-orange-500 transition-colors text-sm py-1"
            >
              <Phone size={16} className="text-orange-500" />
              <span>+380 50 723 2362</span>
            </a>
            <a
              href="tel:+380686080028"
              className="flex items-center gap-3 hover:text-orange-500 transition-colors text-sm py-1"
            >
              <Phone size={16} className="text-orange-500" />
              <span>+380 68 608 0028</span>
            </a>
            <a
              href="mailto:daniel.big.family@gmail.com"
              className="flex items-center gap-3 hover:text-orange-500 transition-colors text-sm py-1"
            >
              <Mail size={16} className="text-orange-500" />
              <span>daniel.big.family@gmail.com</span>
            </a>
          </div>

          {/* Location */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-white font-semibold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">
              {t("location")}
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={16} className="text-orange-500 shrink-0 mt-1" />
              <span>{t("address")}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Clock size={16} className="text-orange-500 shrink-0 mt-1" />
              <span>{t("workingHours")}</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-white font-semibold mb-3 md:mb-4 uppercase tracking-wider text-xs md:text-sm">
              {t("social")}
            </h4>
            <a
              href="https://www.instagram.com/p/Csg_JMetbqI/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-orange-500 transition-colors text-sm py-1.5 px-2 -ml-2 rounded-lg hover:bg-zinc-900"
            >
              <Instagram size={16} className="text-orange-500" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/p/%D0%94%D0%B0%D0%BD%D1%96%D0%B5%D0%BB%D1%8C-%D0%9A%D0%B0%D0%BC%D1%8F%D0%BD%D0%B5%D1%86%D1%8C-%D0%9F%D0%BE%D0%B4%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-100068689121934/?locale=uk_UA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-orange-500 transition-colors text-sm py-1.5 px-2 -ml-2 rounded-lg hover:bg-zinc-900"
            >
              <Facebook size={16} className="text-orange-500" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 mb-6 md:mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.550678877145!2d26.57139881567401!3d48.67582967927063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4733b7001476d05f%3A0x8e5f8f8f8f8f8f8f!2sPizzeria%20Daniel!5e0!3m2!1suk!2sua!4v1620000000000!5m2!1suk!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </div>

        <div className="text-center text-[10px] md:text-xs text-zinc-600 pt-6 border-t border-zinc-900">
          © {new Date().getFullYear()} Pizzeria Daniel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
