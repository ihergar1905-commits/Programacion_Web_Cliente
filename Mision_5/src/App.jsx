import Navbar from './components/landing/Navbar.jsx';
import Hero from './components/landing/Hero.jsx';
import Features from './components/landing/Features.jsx';
import HowItWorks from './components/landing/HowItWorks.jsx';
import AppDemo from './components/landing/AppDemo.jsx';
import Footer from './components/landing/Footer.jsx';

// 🆕 M5: App ahora es la landing. Solo coloca las secciones en orden;
// la aplicación de la M3/M4 vive entera dentro de <AppDemo /> (RecipeApp.jsx)
function App() {
  return (
    <>
      <a
        href="#app"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-boton focus:bg-azafran-300 focus:px-4 focus:py-2 focus:text-carbon-900"
      >
        Saltar a la aplicación
      </a>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AppDemo />
      </main>
      <Footer />
    </>
  );
}

export default App;
