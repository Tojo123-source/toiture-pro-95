import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { AnimatedSection } from '@/components/ui-custom/AnimatedSection';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    location: 'Cergy',
    rating: 5,
    comment: 'Excellent travail ! L\'équipe est professionnelle, ponctuelle et très soignée. Ma toiture est comme neuve et les prix sont très compétitifs. Je recommande vivement !',
    date: 'Janvier 2024',
    service: 'Rénovation toiture',
  },
  {
    id: '2',
    name: 'Pierre Martin',
    location: 'Pontoise',
    rating: 5,
    comment: 'Intervention rapide pour une fuite d\'urgence. Le problème a été résolu en moins de 24h. Service client impeccable et travail de qualité. Merci !',
    date: 'Décembre 2023',
    service: 'Réparation fuite',
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    location: 'Saint-Ouen-l\'Aumône',
    rating: 5,
    comment: 'Installation de 2 Velux parfaite ! L\'équipe a été très professionnelle, a protégé toute la maison pendant les travaux et a tout nettoyé après. Résultat magnifique.',
    date: 'Novembre 2023',
    service: 'Pose Velux',
  },
  {
    id: '4',
    name: 'Jean-Claude Petit',
    location: 'Ermont',
    rating: 5,
    comment: 'Très satisfait de la rénovation complète de ma toiture. Devis détaillé, travail soigné, respect des délais. Une entreprise sérieuse que je recommande.',
    date: 'Octobre 2023',
    service: 'Rénovation complète',
  },
  {
    id: '5',
    name: 'Isabelle Leroy',
    location: 'Franconville',
    rating: 5,
    comment: 'Installation de gouttières en aluminium sur toute la maison. Travail impeccable, matériel de qualité et prix raisonnable. Merci à toute l\'équipe !',
    date: 'Septembre 2023',
    service: 'Zinguerie',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleManualNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-premium relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-copper-500/20 text-copper-400 text-sm font-semibold rounded-full mb-4">
            Avis Clients
          </span>
          <h2 className="heading-lg text-white mb-4">
            Ce que disent nos{' '}
            <span className="text-copper-400">clients</span>
          </h2>
          <p className="text-white/70 text-lg">
            La satisfaction de nos clients est notre meilleure publicité. 
            Découvrez leurs témoignages authentiques.
          </p>
        </AnimatedSection>

        {/* Rating Summary */}
        <AnimatedSection delay={0.2} className="flex justify-center mb-12">
          <div className="glass-effect rounded-2xl px-8 py-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">4.9</div>
              <div className="flex gap-1 justify-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-copper-400 text-copper-400" />
                ))}
              </div>
              <div className="text-white/60 text-sm">sur 5 étoiles</div>
            </div>
            <div className="w-px h-16 bg-white/20" />
            <div>
              <div className="text-white font-semibold text-lg">500+ avis vérifiés</div>
              <div className="text-white/60">sur Google et Trustpilot</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={() => handleManualNavigation('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleManualNavigation('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Quote Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-copper-100 rounded-2xl flex items-center justify-center">
                      <Quote className="w-8 h-8 text-copper-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-copper-400 text-copper-400" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-navy-700 text-lg md:text-xl leading-relaxed mb-6">
                      "{testimonials[currentIndex].comment}"
                    </p>

                    {/* Author */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="font-serif font-bold text-navy-900 text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="flex items-center gap-4 text-navy-500 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {testimonials[currentIndex].location}
                          </span>
                          <span>•</span>
                          <span>{testimonials[currentIndex].date}</span>
                        </div>
                      </div>
                      <span className="inline-block px-4 py-1.5 bg-navy-100 text-navy-700 text-sm font-medium rounded-full">
                        {testimonials[currentIndex].service}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-copper-400'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
