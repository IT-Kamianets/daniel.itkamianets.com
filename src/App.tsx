import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import BottomMobileNav from "./components/BottomMobileNav";
import ScrollToTop from "./components/ScrollToTop";
import SectionSeparator from "./components/SectionSeparator";

function AppContent() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId === "#" || !targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          const headerOffset = 70;
          const duration = 1100; 
          const startTime = performance.now();
          const startScrollY = window.scrollY;

          const animateScroll = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const easeProgress = progress < 0.5 
              ? 4 * progress * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
            const currentTargetScrollY = startScrollY + (targetPosition - startScrollY) * easeProgress;

            window.scrollTo(0, currentTargetScrollY);

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            } else {
              const finalPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({ top: finalPosition, behavior: 'auto' });
            }
          };

          requestAnimationFrame(animateScroll);
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll, { passive: false });
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300 pb-16 md:pb-0">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <SectionSeparator />
        <Gallery />
        <SectionSeparator />
        <Reviews />
      </main>
      <Footer />
      <BottomMobileNav />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
