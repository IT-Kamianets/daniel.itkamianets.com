import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InteractiveMenu from "./components/InteractiveMenu";
import TableBookingMap from "./components/TableBookingMap";
import DeliveryFlow from "./components/DeliveryFlow";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import BottomMobileNav from "./components/BottomMobileNav";
import ScrollToTop from "./components/ScrollToTop";
import SectionSeparator from "./components/SectionSeparator";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Header />
          <main>
            <Hero />
            <InteractiveMenu />
            <SectionSeparator />
            <TableBookingMap />
            <SectionSeparator />
            <DeliveryFlow />
            <SectionSeparator />
            <Gallery />
            <SectionSeparator />
            <Reviews />
          </main>
          <Footer />
          <BottomMobileNav />
          <ScrollToTop />
        </>
      )}
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
