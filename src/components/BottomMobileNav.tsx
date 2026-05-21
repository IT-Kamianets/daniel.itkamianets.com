import {
  Menu,
  Image,
  MapPin,
  Star,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomMobileNav() {
  const { t } = useLanguage();

  const navItems = [
    { id: "menu", icon: Menu, label: t("menu"), href: "#menu" },
    { id: "gallery", icon: Image, label: t("gallery"), href: "#gallery" },
    {
      id: "reviews",
      icon: Star,
      label: t("reviews"),
      href: "#reviews",
    },
    {
      id: "contacts",
      icon: MapPin,
      label: t("contacts"),
      href: "#contacts",
    },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-100 dark:bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="flex justify-between items-center h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors"
            >
              <Icon size={18} className="text-zinc-900 dark:text-white" />
              <span className="text-[10px] font-bold whitespace-nowrap text-zinc-900 dark:text-white">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
