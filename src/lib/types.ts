export type PromoType = 'L3' | 'M1' | 'M2';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  promo: PromoType;
  photo?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  role?: string; // Président, Trésorier, Secrétaire, etc.
  description?: string;
  skills?: string[];
  joinDate?: string; // ISO date string
}

// Types pour les actualités
export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string; // ISO date string
  updatedAt?: string;
  image?: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  slug: string;
}

// Types pour les événements
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate?: string;
  location?: {
    name: string;
    address?: string;
    url?: string;
  };
  image?: string;
  organizer: string;
  maxParticipants?: number;
  currentParticipants?: number;
  registrationRequired: boolean;
  registrationDeadline?: string;
  price?: number;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  slug: string;
}

// Types pour les formulaires
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  promo?: PromoType;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  promo: string;
  linkedin: string;
}

export interface JoinForm {
  firstName: string;
  lastName: string;
  email: string;
  promo: PromoType;
  motivation: string;
  skills?: string[];
  linkedin?: string;
  github?: string;
}

// Types pour les filtres
export interface MemberFilters {
  promo?: PromoType[];
  search?: string;
  hasLinkedIn?: boolean;
  hasGitHub?: boolean;
}

export interface NewsFilters {
  tags?: string[];
  author?: string;
  search?: string;
}

export interface EventFilters {
  status?: Event['status'][];
  tags?: string[];
  search?: string;
}

// Types pour les composants UI
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  color: string;
}

// Types pour le thème
export type ThemeMode = 'light' | 'dark' | 'system';
