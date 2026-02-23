import {
  Home,
  Menu,
  CalendarDays,
  ShoppingBag,
  Image,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomMobileNav() {
  const { t } = useLanguage();

  const navItems = [
    { id: "menu", icon: Menu, label: t("menu"), href: "#menu" },
    {
      id: "booking",
      icon: CalendarDays,
      label: t("booking"),
      href: "#booking",
    },
    { id: "delivery", icon: ShoppingBag, label: t("delivery"), href: "#delivery" },
    { id: "gallery", icon: Image, label: t("gallery"), href: "#gallery" },
    {
      id: "reviews",
      icon: MessageSquare,
      label: t("reviews"),
      href: "#reviews",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <nav className="flex justify-around items-center h-16 px-2 overflow-x-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[60px] h-full space-y-1 text-zinc-500 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400 transition-colors"
            >
              <Icon size={20} />
              <span className="text-nav-giant font-extrabold whitespace-nowrap">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
