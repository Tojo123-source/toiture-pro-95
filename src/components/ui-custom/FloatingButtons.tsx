import { motion } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Floating Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          x: isVisible ? 0 : 50,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed right-6 bottom-6 z-40 hidden md:flex flex-col gap-3"
      >
        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/261367729958"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-7 h-7 text-white" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-navy-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Discuter sur WhatsApp
          </span>
          
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        </motion.a>

        {/* Phone Button */}
        <motion.a
          href="tel:+261367729958"
          className="group relative flex items-center justify-center w-14 h-14 bg-copper-500 rounded-full shadow-lg hover:shadow-glow transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="w-6 h-6 text-white" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-navy-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Appeler maintenant
          </span>
          
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-copper-500 animate-ping opacity-20" />
        </motion.a>
      </motion.div>

      {/* Mobile Floating Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 50,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed right-4 bottom-4 z-40 md:hidden"
      >
        {isMenuOpen ? (
          <div className="flex flex-col gap-3 mb-3">
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              href="https://wa.me/261367729958"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-green-500 rounded-full shadow-lg"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">WhatsApp</span>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              href="tel:+261367729958"
              className="flex items-center gap-3 px-4 py-3 bg-copper-500 rounded-full shadow-lg"
            >
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">Appeler</span>
            </motion.a>
          </div>
        ) : null}
        
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors ${
            isMenuOpen ? 'bg-navy-900' : 'bg-copper-500'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <Phone className="w-6 h-6 text-white" />
              <span className="absolute inset-0 rounded-full bg-copper-500 animate-ping opacity-20" />
            </>
          )}
        </motion.button>
      </motion.div>
    </>
  );
}
