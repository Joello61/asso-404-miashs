import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Member, MemberFilters, PromoType } from './types';

/**
 * Combine les classes CSS avec Tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatte une date en français
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
}

/**
 * Formatte une date relative (il y a 2 jours, etc.)
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return "À l'instant";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }

  return formatDate(dateObj);
}

/**
 * Génère un slug à partir d'un titre
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Tronque un texte à un nombre de mots donné
 */
export function truncateText(text: string, maxWords: number): string {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Valide une adresse email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Génère des initiales à partir d'un nom complet
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Formatte un nom complet
 */
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

/**
 * Détermine la couleur d'un badge selon la promo
 */
export function getPromoColor(promo: PromoType): string {
  switch (promo) {
    case 'L3':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'M1':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'M2':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Alumni':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Autre':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
}

/**
 * Filtre les membres selon les critères
 */
export function filterMembers(
  members: Member[],
  filters: MemberFilters
): Member[] {
  return members.filter((member) => {
    // Filtre par promo
    if (filters.promo && filters.promo.length > 0) {
      if (!filters.promo.includes(member.promo)) return false;
    }

    // Filtre par recherche
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      if (!fullName.includes(searchTerm)) return false;
    }

    // Filtre par LinkedIn
    if (filters.hasLinkedIn !== undefined) {
      if (filters.hasLinkedIn && !member.linkedin) return false;
      if (!filters.hasLinkedIn && member.linkedin) return false;
    }

    // Filtre par GitHub
    if (filters.hasGitHub !== undefined) {
      if (filters.hasGitHub && !member.github) return false;
      if (!filters.hasGitHub && member.github) return false;
    }

    return true;
  });
}

/**
 * Trie les membres par nom
 */
export function sortMembers(members: Member[]): Member[] {
  return [...members].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    return nameA.localeCompare(nameB, 'fr');
  });
}

/**
 * Groupe les membres par promo
 */
export function groupMembersByPromo(
  members: Member[]
): Record<PromoType, Member[]> {
  const groups: Record<PromoType, Member[]> = {
    L3: [],
    M1: [],
    M2: [],
    Alumni: [],
    Autre: [],
  };

  members.forEach((member) => {
    groups[member.promo].push(member);
  });

  return groups;
}

/**
 * Calcule des statistiques sur les membres
 */
export function getMemberStats(members: Member[]) {
  const total = members.length;
  const byPromo = groupMembersByPromo(members);
  const withLinkedIn = members.filter((m) => m.linkedin).length;
  const withGitHub = members.filter((m) => m.github).length;

  return {
    total,
    byPromo: Object.entries(byPromo).map(([promo, memberList]) => ({
      promo: promo as PromoType,
      count: memberList.length,
      percentage: total > 0 ? Math.round((memberList.length / total) * 100) : 0,
    })),
    socialLinks: {
      linkedin: {
        count: withLinkedIn,
        percentage: total > 0 ? Math.round((withLinkedIn / total) * 100) : 0,
      },
      github: {
        count: withGitHub,
        percentage: total > 0 ? Math.round((withGitHub / total) * 100) : 0,
      },
    },
  };
}
