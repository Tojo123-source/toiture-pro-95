import { motion } from 'framer-motion';
import { Shield, Award, Users, MapPin, Check, Phone } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui-custom/AnimatedSection';

const values = [
  {
    icon: Shield,
    title: 'Garantie Décennale',
    description: 'Tous nos travaux sont couverts par une garantie décennale pour votre tranquillité.',
  },
  {
    icon: Award,
    title: 'Matériaux Premium',
    description: 'Nous utilisons uniquement des matériaux de qualité professionnelle, certifiés et durables.',
  },
  {
    icon: Users,
    title: 'Équipe Qualifiée',
    description: 'Nos couvreurs sont formés et certifiés, avec une expertise reconnue dans le métier.',
  },
  {
    icon: MapPin,
    title: 'Intervention 95',
    description: 'Nous intervenons dans tout le Val-d\'Oise et les départements limitrophes.',
  },
];

const certifications = [
  'Qualibat RGE',
  'Certification Velux',
  'Assurance responsabilité civile',
  'Garantie décennale',
];

export function About() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-cream-50">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                  alt="Équipe de couvreurs professionnels"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-copper-500 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-navy-900">15+</div>
                    <div className="text-navy-500 text-sm">Années d'expérience</div>
                  </div>
                </div>
                <p className="text-navy-600 text-sm">
                  Une expertise reconnue dans la rénovation et l'entretien de toitures.
                </p>
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute -top-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                  alt="Travail de qualité"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <div>
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-copper-100 text-copper-700 text-sm font-semibold rounded-full mb-4">
                À Propos de Nous
              </span>
              <h2 className="heading-lg text-navy-900 mb-6">
                Votre expert couvreur dans le{' '}
                <span className="text-copper-500">Val-d'Oise</span>
              </h2>
              <p className="body-lg text-navy-600 mb-6">
                Depuis plus de 15 ans, Toiture Pro 95 accompagne les particuliers et professionnels 
                dans tous leurs projets de toiture. Notre expertise couvre l'ensemble des métiers 
                du bâtiment liés à la couverture et à l'étanchéité.
              </p>
              <p className="text-navy-600 mb-8">
                Basés dans le Val-d'Oise, nous intervenons dans tout le département 95 et ses 
                alentours. Notre équipe de couvreurs qualifiés met son savoir-faire au service 
                de votre projet, du plus simple au plus complexe.
              </p>
            </AnimatedSection>

            {/* Certifications */}
            <AnimatedSection delay={0.2} className="mb-8">
              <h3 className="font-serif font-bold text-lg text-navy-900 mb-4">
                Nos certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                  >
                    <Check className="w-4 h-4 text-copper-500" />
                    <span className="text-navy-700 text-sm font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Values Grid */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-4 mb-8">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-copper-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-copper-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 text-sm mb-1">
                        {value.title}
                      </h4>
                      <p className="text-navy-600 text-xs leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA */}
            <AnimatedSection delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={scrollToContact}
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Nous contacter
                </motion.button>
                <motion.a
                  href="tel:+261367729958"
                  className="btn-outline"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  +261 36 77 299 58
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
