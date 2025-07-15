export { default as membresData } from './membres.json';
export { default as actualitesData } from './actualites.json';
export { default as eventsData } from './events.json';
export { default as activitiesData } from './activities.json';

// Fonctions utilitaires pour manipuler les données
import type { Member, News, Event, Activity } from '@/lib/types';

/**
 * Obtenir tous les membres
 */
export async function getAllMembers(): Promise<Member[]> {
  // En mode production, ceci pourrait être un appel API
  const { default: membres } = await import('./membres.json');
  return membres;
}

/**
 * Obtenir un membre par ID
 */
export async function getMemberById(id: string): Promise<Member | null> {
  const membres = await getAllMembers();
  return membres.find(member => member.id === id) || null;
}

/**
 * Obtenir les membres par promo
 */
export async function getMembersByPromo(promo: string): Promise<Member[]> {
  const membres = await getAllMembers();
  return membres.filter(member => member.promo === promo);
}

/**
 * Obtenir toutes les actualités
 */
export async function getAllNews(): Promise<News[]> {
  const { default: actualites } = await import('./actualites.json');
  return actualites.filter(news => news.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Obtenir une actualité par slug
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const actualites = await getAllNews();
  return actualites.find(news => news.slug === slug) || null;
}

/**
 * Obtenir les actualités récentes
 */
export async function getRecentNews(limit: number = 3): Promise<News[]> {
  const actualites = await getAllNews();
  return actualites.slice(0, limit);
}

/**
 * Obtenir tous les événements
 */
export async function getAllEvents(): Promise<Event[]> {
  const { default: events } = await import('./events.json');
  return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/**
 * Obtenir un événement par slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getAllEvents();
  return events.find(event => event.slug === slug) || null;
}

/**
 * Obtenir les événements à venir
 */
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const events = await getAllEvents();
  const now = new Date();
  const upcomingEvents = events.filter(event => 
    new Date(event.startDate) > now && event.status === 'upcoming'
  );
  return limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
}

/**
 * Obtenir les événements passés
 */
export async function getPastEvents(limit?: number): Promise<Event[]> {
  const events = await getAllEvents();
  const now = new Date();
  const pastEvents = events.filter(event => 
    new Date(event.endDate || event.startDate) < now || event.status === 'completed'
  ).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  return limit ? pastEvents.slice(0, limit) : pastEvents;
}

/**
 * Obtenir toutes les activités
 */
export async function getAllActivities(): Promise<Activity[]> {
  const { default: activities } = await import('./activities.json');
  return activities;
}

/**
 * Obtenir les activités actives
 */
export async function getActiveActivities(): Promise<Activity[]> {
  const activities = await getAllActivities();
  return activities.filter(activity => activity.isActive);
}

/**
 * Obtenir une activité par ID
 */
export async function getActivityById(id: string): Promise<Activity | null> {
  const activities = await getAllActivities();
  return activities.find(activity => activity.id === id) || null;
}

/**
 * Statistiques générales
 */
export async function getStats() {
  const [membres, actualites, events, activities] = await Promise.all([
    getAllMembers(),
    getAllNews(),
    getAllEvents(),
    getActiveActivities()
  ]);

  const upcomingEvents = await getUpcomingEvents();
  
  return {
    totalMembers: membres.length,
    membersByPromo: {
      L3: membres.filter(m => m.promo === 'L3').length,
      M1: membres.filter(m => m.promo === 'M1').length,
      M2: membres.filter(m => m.promo === 'M2').length,
    },
    totalNews: actualites.length,
    totalEvents: events.length,
    upcomingEvents: upcomingEvents.length,
    activeActivities: activities.length,
    membersWithLinkedIn: membres.filter(m => m.linkedin).length,
    membersWithGitHub: membres.filter(m => m.github).length,
  };
}