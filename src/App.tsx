import { useEffect } from 'react';
import { Navigation } from '@/components/ui-custom/Navigation';
import { FloatingButtons } from '@/components/ui-custom/FloatingButtons';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Realisations } from '@/sections/Realisations';
import { Testimonials } from '@/sections/Testimonials';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        <Services />
        
        {/* Realisations Section */}
        <Realisations />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* About Section */}
        <About />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Buttons (WhatsApp & Phone) */}
      <FloatingButtons />
    </div>
  );
}

export default App;
