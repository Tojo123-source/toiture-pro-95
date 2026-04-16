import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui-custom/AnimatedSection';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

type Category = 'all' | 'toiture' | 'zinguerie' | 'avant-apres';

interface Realization {
  id: string;
  title: string;
  category: Exclude<Category, 'all'>;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  location: string;
  year: string;
  description: string;
}

const realizations: Realization[] = [
  {
    id: '1',
    title: 'Rénovation complète - Maison traditionnelle',
    category: 'toiture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    location: 'Cergy',
    year: '2024',
    description: 'Rénovation complète de la toiture avec pose de tuiles terre cuite et isolation des combles.',
  },
  {
    id: '2',
    title: 'Installation gouttières aluminium',
    category: 'zinguerie',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    location: 'Pontoise',
    year: '2024',
    description: 'Installation de gouttières et chéneaux en aluminium avec système de protection anti-feuilles.',
  },
  {
    id: '3',
    title: 'Transformation avant-après',
    category: 'avant-apres',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2070&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
    location: 'Saint-Ouen-l\'Aumône',
    year: '2023',
    description: 'Rénovation complète avec dépose de l\'ancienne toiture et pose d\'une nouvelle couverture.',
  },
  {
    id: '4',
    title: 'Pose Velux triple vitrage',
    category: 'toiture',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
    location: 'Ermont',
    year: '2024',
    description: 'Installation de 3 fenêtres de toit Velux pour éclairer les combles aménagés.',
  },
  {
    id: '5',
    title: 'Zinguerie complexe',
    category: 'zinguerie',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    location: 'Franconville',
    year: '2023',
    description: 'Installation de chéneaux, rives et solins sur toiture à forte pente.',
  },
  {
    id: '6',
    title: 'Rénovation toiture terrasse',
    category: 'toiture',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
    location: 'Sannois',
    year: '2024',
    description: 'Étanchéité de toiture terrasse avec membrane EPDM et création d\'espace vert.',
  },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'toiture', label: 'Toiture' },
  { value: 'zinguerie', label: 'Zinguerie' },
  { value: 'avant-apres', label: 'Avant-Après' },
];

export function Realisations() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedRealization, setSelectedRealization] = useState<Realization | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const filteredRealizations = activeCategory === 'all'
    ? realizations
    : realizations.filter(r => r.category === activeCategory);

  const openModal = (realization: Realization) => {
    setSelectedRealization(realization);
    setShowBeforeAfter(false);
  };

  const closeModal = () => {
    setSelectedRealization(null);
    setShowBeforeAfter(false);
  };

  const nextRealization = () => {
    if (!selectedRealization) return;
    const currentIndex = filteredRealizations.findIndex(r => r.id === selectedRealization.id);
    const nextIndex = (currentIndex + 1) % filteredRealizations.length;
    setSelectedRealization(filteredRealizations[nextIndex]);
    setShowBeforeAfter(false);
  };

  const prevRealization = () => {
    if (!selectedRealization) return;
    const currentIndex = filteredRealizations.findIndex(r => r.id === selectedRealization.id);
    const prevIndex = (currentIndex - 1 + filteredRealizations.length) % filteredRealizations.length;
    setSelectedRealization(filteredRealizations[prevIndex]);
    setShowBeforeAfter(false);
  };

  return (
    <section id="realisations" className="section-padding bg-white">
      <div className="container-premium">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-copper-100 text-copper-700 text-sm font-semibold rounded-full mb-4">
            Nos Réalisations
          </span>
          <h2 className="heading-lg text-navy-900 mb-4">
            Découvrez nos{' '}
            <span className="text-copper-500">projets récents</span>
          </h2>
          <p className="body-lg text-navy-600">
            Des centaines de toitures rénovées et de clients satisfaits dans tout le Val-d'Oise.
            Voici quelques-unes de nos réalisations.
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.value
                  ? 'bg-copper-500 text-white shadow-glow'
                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </AnimatedSection>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredRealizations.map((realization, index) => (
              <motion.div
                key={realization.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openModal(realization)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={realization.image}
                    alt={realization.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 bg-copper-500 text-white text-xs font-semibold rounded-full mb-2 w-fit">
                      {categories.find(c => c.value === realization.category)?.label}
                    </span>
                    <h3 className="font-serif font-bold text-white text-lg mb-1">
                      {realization.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {realization.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {realization.year}
                      </span>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ZoomIn className="w-5 h-5 text-navy-900" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedRealization} onOpenChange={closeModal}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 bg-white rounded-2xl">
          <DialogTitle className="sr-only">
            {selectedRealization?.title || 'Détails du projet'}
          </DialogTitle>
          {selectedRealization && (
            <div className="grid lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative bg-navy-100">
                {selectedRealization.category === 'avant-apres' && selectedRealization.beforeImage ? (
                  <div className="relative aspect-square">
                    <img
                      src={showBeforeAfter ? selectedRealization.beforeImage : selectedRealization.afterImage || selectedRealization.image}
                      alt={selectedRealization.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <button
                        onClick={() => setShowBeforeAfter(true)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                          showBeforeAfter
                            ? 'bg-copper-500 text-white'
                            : 'bg-white/90 text-navy-900'
                        }`}
                      >
                        Avant
                      </button>
                      <button
                        onClick={() => setShowBeforeAfter(false)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                          !showBeforeAfter
                            ? 'bg-copper-500 text-white'
                            : 'bg-white/90 text-navy-900'
                        }`}
                      >
                        Après
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedRealization.image}
                    alt={selectedRealization.title}
                    className="w-full h-full object-cover aspect-square"
                  />
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevRealization(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-navy-900" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextRealization(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-navy-900" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-copper-100 text-copper-700 text-sm font-semibold rounded-full mb-4">
                  {categories.find(c => c.value === selectedRealization.category)?.label}
                </span>
                
                <h3 className="font-serif font-bold text-2xl text-navy-900 mb-4">
                  {selectedRealization.title}
                </h3>

                <div className="flex items-center gap-6 mb-6 text-navy-600">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-copper-500" />
                    {selectedRealization.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-copper-500" />
                    {selectedRealization.year}
                  </span>
                </div>

                <p className="text-navy-600 leading-relaxed mb-8">
                  {selectedRealization.description}
                </p>

                <div className="flex gap-4">
                  <a
                    href="#contact"
                    onClick={closeModal}
                    className="btn-primary flex-1 text-center"
                  >
                    Demander un devis similaire
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
