import { motion } from 'framer-motion';
import { 
  Home, 
  Droplets, 
  Wrench, 
  Sparkles, 
  Sun, 
  Thermometer, 
  Building2, 
  Layers,
  ArrowRight,
  Check,
  Phone
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui-custom/AnimatedSection';

const services = [
  {
    id: 'renovation',
    title: 'Rénovation complète de toiture',
    description: 'Redonnez vie à votre toiture avec notre expertise en rénovation complète. Tuiles, ardoises, chaume - nous maîtrisons tous les types de couverture.',
    icon: Home,
    features: ['Dépose et repose', 'Isolation renforcée', 'Garantie décennale'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'zinguerie',
    title: 'Zinguerie & Gouttières',
    description: 'Installation et réparation de gouttières, chéneaux, rives de toit et tous éléments de zinguerie pour une étanchéité parfaite.',
    icon: Droplets,
    features: ['Gouttières aluminium', 'Chéneaux sur mesure', 'Protection anti-feuilles'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'reparation',
    title: 'Réparation de fuites',
    description: 'Intervention rapide et efficace pour tous problèmes d\'étanchéité. Diagnostic précis et réparation durable de vos fuites de toiture.',
    icon: Wrench,
    features: ['Diagnostic caméra thermique', 'Intervention 24/7', 'Devis gratuit'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'demoussage',
    title: 'Démoussage & Entretien',
    description: 'Entretien régulier de votre toiture pour préserver son état et prolonger sa durée de vie. Traitement anti-mousse professionnel.',
    icon: Sparkles,
    features: ['Traitement hydrofuge', 'Anti-mousse écologique', 'Nettoyage haute pression'],
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'velux',
    title: 'Pose de Velux',
    description: 'Installation de fenêtres de toit Velux pour éclairer naturellement vos combles. Du conseil à la pose, nous vous accompagnons.',
    icon: Sun,
    features: ['Conseil personnalisé', 'Pose certifiée', 'Stores et volets'],
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'isolation',
    title: 'Isolation des combles',
    description: 'Améliorez le confort thermique de votre maison avec une isolation professionnelle de vos combles. Économies d\'énergie garanties.',
    icon: Thermometer,
    features: ['Isolation soufflée', 'Isolation en rouleaux', 'RT 2012/RE 2020'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'bardage',
    title: 'Bardage & Façade',
    description: 'Habillage de façades et bardage extérieur pour protéger et embellir votre maison. Matériaux premium et finitions soignées.',
    icon: Building2,
    features: ['Bois, PVC, Composite', 'Isolation par l\'extérieur', 'Finitions sur mesure'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'terrasse',
    title: 'Toiture Terrasse',
    description: 'Étanchéité de toitures terrasses avec membranes EPDM, TPO ou bitume. Solutions durables pour espaces extérieurs plats.',
    icon: Layers,
    features: ['Membrane EPDM/TPO', 'Étanchéité bitume', 'Végétalisation'],
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
  },
];

export function Services() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section-padding bg-cream-50">
      <div className="container-premium">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-copper-100 text-copper-700 text-sm font-semibold rounded-full mb-4"
          >
            Nos Services
          </motion.span>
          <h2 className="heading-lg text-navy-900 mb-4">
            Des solutions complètes pour{' '}
            <span className="text-copper-500">votre toiture</span>
          </h2>
          <p className="body-lg text-navy-600">
            De la réparation d'urgence à la rénovation complète, nous mettons notre expertise 
            à votre service pour tous vos projets de toiture dans le Val-d'Oise.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group h-full"
              >
                <div className="card-premium h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-copper-500 rounded-xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif font-bold text-lg text-navy-900 mb-2 group-hover:text-copper-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-navy-600 text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-navy-600">
                          <Check className="w-4 h-4 text-copper-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      onClick={scrollToContact}
                      className="flex items-center gap-2 text-copper-500 font-semibold text-sm group/btn"
                      whileHover={{ x: 5 }}
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <div className="bg-navy-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-copper-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
              <h3 className="heading-md text-white mb-4">
                Besoin d'un conseil personnalisé ?
              </h3>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Nos experts sont à votre écoute pour étudier votre projet et vous proposer 
                la solution la plus adaptée à vos besoins et votre budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={scrollToContact}
                  className="btn-primary bg-copper-500 hover:bg-copper-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Obtenir un devis gratuit
                </motion.button>
                <motion.a
                  href="tel:+261367729958"
                  className="btn-outline border-white/30 text-white hover:bg-white hover:text-navy-900"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Nous appeler
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
