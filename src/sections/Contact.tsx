import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui-custom/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { saveContactMessage } from '@/lib/supabase';
import { sendContactEmail } from '@/lib/brevo';

const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  { value: 'renovation', label: 'Rénovation complète de toiture' },
  { value: 'zinguerie', label: 'Zinguerie & Gouttières' },
  { value: 'reparation', label: 'Réparation de fuites' },
  { value: 'demoussage', label: 'Démoussage & Entretien' },
  { value: 'velux', label: 'Pose de Velux' },
  { value: 'isolation', label: 'Isolation des combles' },
  { value: 'bardage', label: 'Bardage & Façade' },
  { value: 'terrasse', label: 'Toiture Terrasse' },
  { value: 'autre', label: 'Autre demande' },
];

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    content: '+261 36 77 299 58',
    href: 'tel:+261367729958',
    description: 'Disponible 24/7 pour les urgences',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'tojo.devpro@gmail.com',
    href: 'mailto:tojo.devpro@gmail.com',
    description: 'Réponse sous 24h',
  },
  {
    icon: MapPin,
    title: 'Zone d\'intervention',
    content: 'Val-d\'Oise (95)',
    href: '#',
    description: 'Et départements limitrophes',
  },
  {
    icon: Clock,
    title: 'Horaires',
    content: 'Lun - Sam: 8h - 19h',
    href: '#',
    description: 'Urgences 24/7',
  },
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      consent: false,
    },
  });

  const consent = watch('consent');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save to Supabase
      const supabaseResult = await saveContactMessage(data);
      
      // Send email via Brevo
      const brevoResult = await sendContactEmail(data);

      if (supabaseResult.success && brevoResult.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-premium">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-copper-100 text-copper-700 text-sm font-semibold rounded-full mb-4">
            Contact
          </span>
          <h2 className="heading-lg text-navy-900 mb-4">
            Demandez votre{' '}
            <span className="text-copper-500">devis gratuit</span>
          </h2>
          <p className="body-lg text-navy-600">
            Remplissez le formulaire ci-dessous et nous vous recontacterons sous 24h 
            pour étudier votre projet et vous établir un devis personnalisé.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <StaggerContainer className="space-y-6">
              {contactInfo.map((info) => (
                <StaggerItem key={info.title}>
                  <motion.a
                    href={info.href}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-5 bg-cream-50 rounded-2xl hover:bg-copper-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-copper-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 mb-1">{info.title}</h4>
                      <p className="text-navy-700 font-medium">{info.content}</p>
                      <p className="text-navy-500 text-sm">{info.description}</p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* WhatsApp CTA */}
            <AnimatedSection delay={0.4} className="mt-8">
              <a
                href="https://wa.me/261367729958"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-green-500 rounded-2xl text-white hover:bg-green-600 transition-colors"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Discuter sur WhatsApp</h4>
                  <p className="text-white/80">Réponse rapide garantie</p>
                </div>
              </a>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <div className="bg-cream-50 rounded-3xl p-8 md:p-10">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-navy-900 mb-4">
                    Message envoyé avec succès !
                  </h3>
                  <p className="text-navy-600 mb-8">
                    Nous avons bien reçu votre demande. Notre équipe vous contactera 
                    dans les plus brefs délais.
                  </p>
                  <motion.button
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Envoyer un autre message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-navy-700 font-medium mb-2 block">
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        placeholder="Jean"
                        className={`bg-white border-gray-200 focus:border-copper-500 focus:ring-copper-500 ${
                          errors.firstName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-navy-700 font-medium mb-2 block">
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        placeholder="Dupont"
                        className={`bg-white border-gray-200 focus:border-copper-500 focus:ring-copper-500 ${
                          errors.lastName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-navy-700 font-medium mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="jean.dupont@email.com"
                        className={`bg-white border-gray-200 focus:border-copper-500 focus:ring-copper-500 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-navy-700 font-medium mb-2 block">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="06 12 34 56 78"
                        className={`bg-white border-gray-200 focus:border-copper-500 focus:ring-copper-500 ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Select */}
                  <div>
                    <Label htmlFor="service" className="text-navy-700 font-medium mb-2 block">
                      Service demandé *
                    </Label>
                    <Select onValueChange={(value) => setValue('service', value)}>
                      <SelectTrigger className={`bg-white border-gray-200 focus:border-copper-500 focus:ring-copper-500 ${
                        errors.service ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-navy-700 font-medium mb-2 block">
                      Votre message *
                    </Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Décrivez votre projet..."
                      rows={5}
                      className={`bg-white border-gray-200 focus:border-copper-500 focus:ring-copper-500 resize-none ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(checked) => setValue('consent', checked as boolean)}
                      className={errors.consent ? 'border-red-500' : ''}
                    />
                    <Label htmlFor="consent" className="text-sm text-navy-600 leading-relaxed cursor-pointer">
                      J'accepte que mes données personnelles soient utilisées pour me recontacter 
                      concernant ma demande. *
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-red-500 text-sm">{errors.consent.message}</p>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Envoyer ma demande
                      </>
                    )}
                  </motion.button>

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">
                        Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par téléphone.
                      </p>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
