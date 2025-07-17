import type { NavigationItem, SocialLink } from './types';

// Navigation principale
export const NAVIGATION: NavigationItem[] = [
  {
    name: 'Accueil',
    href: '/',
    description: "Page d'accueil de l'association",
  },
  {
    name: 'À propos',
    href: '/about',
    description: 'Découvrez notre association',
  },
  {
    name: 'Trombinoscope',
    href: '/trombinoscope',
    description: 'Rencontrez nos membres',
  },
  {
    name: 'Activités',
    href: '/activities',
    description: 'Nos différentes activités',
  },
  {
    name: 'Événements',
    href: '/events',
    description: 'Nos événements à venir',
  },
  {
    name: 'Actualités',
    href: '/actualites',
    description: 'Dernières nouvelles',
  },
  {
    name: 'Nous rejoindre',
    href: '/join',
    description: 'Rejoignez notre communauté',
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Contactez-nous',
  },
];

// Liens sociaux
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/association-404/?viewAsMember=true',
    icon: 'Linkedin',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/7Rkfqqm8',
    icon: 'MessageCircle',
    color: 'hover:text-indigo-600',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/asso_404_miashs/?hl=am-et',
    icon: 'Instagram',
    color: 'hover:text-pink-600',
  },
  {
    name: 'Email',
    href: 'mailto:assomiashs@gmail.com',
    icon: 'Mail',
    color: 'hover:text-red-600',
  },
];

// Informations de contact
export const CONTACT_INFO = {
  email: 'assomiashs@gmail.com',
  phone: '+33 6 03 38 61 14',
  address: {
    street: 'Université de Toulouse Jean Jaurès',
    city: 'Toulouse',
    zipCode: '31000',
    country: 'France',
  },
  socialMedia: SOCIAL_LINKS,
};

// Configuration par défaut
export const DEFAULT_CONFIG = {
  membersPerPage: 12,
  newsPerPage: 6,
  eventsPerPage: 9,
  maxImageSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  debounceDelay: 300,
  animationDuration: 300,
};

// Tags fréquents
export const COMMON_TAGS = {
  news: [
    'Association',
    'Événement',
    'Formation',
    'Partenariat',
    'Réussite',
    'Innovation',
    'Communauté',
  ],
  events: [
    'Formation',
    'Conférence',
    'Atelier',
    'Compétition',
    'Networking',
    'Social',
    'Académique',
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'C++',
    'Data Science',
    'Machine Learning',
    'Web Design',
    'UX/UI',
    'DevOps',
    'Cybersécurité',
  ],
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  required: 'Ce champ est requis',
  email: 'Adresse email invalide',
  minLength: (min: number) => `Minimum ${min} caractères`,
  maxLength: (max: number) => `Maximum ${max} caractères`,
  fileSize: 'Fichier trop volumineux (max 5MB)',
  fileType: 'Type de fichier non supporté',
  network: 'Erreur de connexion, veuillez réessayer',
  unknown: "Une erreur inattendue s'est produite",
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  formSubmitted: 'Formulaire envoyé avec succès !',
  dataSaved: 'Données sauvegardées',
  fileUploaded: 'Fichier téléchargé avec succès',
  memberAdded: "Membre ajouté à l'association",
  contactSent: 'Message envoyé, nous vous répondrons bientôt',
};
