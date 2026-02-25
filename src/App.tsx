import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InteractiveMenu from "./components/InteractiveMenu";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import BottomMobileNav from "./components/BottomMobileNav";
import ScrollToTop from "./components/ScrollToTop";
import SectionSeparator from "./components/SectionSeparator";

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <InteractiveMenu />
        <SectionSeparator />
        <Gallery />
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
