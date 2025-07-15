import type { NavigationItem, SocialLink, Activity } from './types';

// Navigation principale
export const NAVIGATION: NavigationItem[] = [
  {
    name: 'Accueil',
    href: '/',
    description: 'Page d\'accueil de l\'association'
  },
  {
    name: 'À propos',
    href: '/about',
    description: 'Découvrez notre association'
  },
  {
    name: 'Trombinoscope',
    href: '/trombinoscope',
    description: 'Rencontrez nos membres'
  },
  {
    name: 'Activités',
    href: '/activities',
    description: 'Nos différentes activités'
  },
  {
    name: 'Événements',
    href: '/events',
    description: 'Nos événements à venir'
  },
  {
    name: 'Actualités',
    href: '/actualites',
    description: 'Dernières nouvelles'
  },
  {
    name: 'Nous rejoindre',
    href: '/join',
    description: 'Rejoignez notre communauté'
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Contactez-nous'
  }
];

// Liens sociaux
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/asso-404-miashs',
    icon: 'Linkedin',
    color: 'hover:text-blue-600'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/asso-404-miashs',
    icon: 'Github',
    color: 'hover:text-gray-900 dark:hover:text-gray-100'
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/asso404miashs',
    icon: 'MessageCircle',
    color: 'hover:text-indigo-600'
  },
  {
    name: 'Email',
    href: 'mailto:contact@asso404miashs.fr',
    icon: 'Mail',
    color: 'hover:text-red-600'
  }
];

// Activités de l'association
export const ACTIVITIES: Activity[] = [
  {
    id: 'coding-sessions',
    name: 'Sessions de Code',
    description: 'Ateliers de programmation et de développement web',
    icon: 'Code',
    color: 'text-blue-600',
    category: 'technical',
    isActive: true
  },
  {
    id: 'conferences',
    name: 'Conférences Tech',
    description: 'Rencontres avec des professionnels du secteur',
    icon: 'Presentation',
    color: 'text-purple-600',
    category: 'professional',
    isActive: true
  },
  {
    id: 'hackathons',
    name: 'Hackathons',
    description: 'Compétitions de développement créatif',
    icon: 'Zap',
    color: 'text-yellow-600',
    category: 'technical',
    isActive: true
  },
  {
    id: 'study-groups',
    name: 'Groupes d\'Étude',
    description: 'Entraide et révisions collectives',
    icon: 'BookOpen',
    color: 'text-green-600',
    category: 'academic',
    isActive: true
  },
  {
    id: 'social-events',
    name: 'Événements Sociaux',
    description: 'Sorties et activités pour créer du lien',
    icon: 'Users',
    color: 'text-pink-600',
    category: 'social',
    isActive: true
  },
  {
    id: 'workshops',
    name: 'Ateliers',
    description: 'Formation sur des outils et technologies',
    icon: 'Wrench',
    color: 'text-orange-600',
    category: 'technical',
    isActive: true
  }
];

// Informations de contact
export const CONTACT_INFO = {
  email: 'contact@asso404miashs.fr',
  phone: '+33 1 23 45 67 89',
  address: {
    street: 'Université Paris Cité',
    city: 'Paris',
    zipCode: '75013',
    country: 'France'
  },
  socialMedia: SOCIAL_LINKS
};

// Configuration par défaut
export const DEFAULT_CONFIG = {
  membersPerPage: 12,
  newsPerPage: 6,
  eventsPerPage: 9,
  maxImageSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  debounceDelay: 300,
  animationDuration: 300
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
    'Communauté'
  ],
  events: [
    'Formation',
    'Conférence',
    'Atelier',
    'Compétition',
    'Networking',
    'Social',
    'Académique'
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
    'Cybersécurité'
  ]
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
  unknown: 'Une erreur inattendue s\'est produite'
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  formSubmitted: 'Formulaire envoyé avec succès !',
  dataSaved: 'Données sauvegardées',
  fileUploaded: 'Fichier téléchargé avec succès',
  memberAdded: 'Membre ajouté à l\'association',
  contactSent: 'Message envoyé, nous vous répondrons bientôt'
};