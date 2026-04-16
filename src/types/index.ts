export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export interface Realization {
  id: string;
  title: string;
  category: 'toiture' | 'zinguerie' | 'avant-apres';
  image: string;
  beforeImage?: string;
  afterImage?: string;
  location: string;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
