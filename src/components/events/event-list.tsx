'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Tag, MapPin, Grid, List, Users, Clock } from 'lucide-react';
import { EventCard, EventCardSkeleton } from './event-card';
import { EventCalendar } from './event-calendar';
import { cn } from '@/lib/utils';
import type { Event } from '@/lib/types';

interface EventListProps {
  events: Event[];
  loading?: boolean;
  variant?: 'grid' | 'list' | 'calendar';
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
  showCalendar?: boolean;
  itemsPerPage?: number;
  className?: string;
}

type SortOption = 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc' | 'participants-desc';
type StatusFilter = 'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
type FilterOption = 'all' | string;

// Type garde pour valider le statut d'un événement
function isValidEventStatus(status: string): status is Event['status'] {
  return ['upcoming', 'ongoing', 'completed', 'cancelled'].includes(status);
}

// Fonction pour valider les données JSON des événements
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateEventData(data: any): Event {
  // Validation de base
  if (!data.id || !data.title || !data.startDate || !data.status) {
    throw new Error(`Données événement invalides: ${JSON.stringify(data)}`);
  }

  // Validation du statut
  if (!isValidEventStatus(data.status)) {
    console.warn(`Statut événement non reconnu: ${data.status}, utilisation de "upcoming" par défaut`);
    data.status = 'upcoming';
  }

  // Validation et nettoyage des tags
  const tags = Array.isArray(data.tags) ? data.tags : [];

  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    startDate: data.startDate,
    endDate: data.endDate || undefined,
    location: data.location || undefined,
    image: data.image || undefined,
    organizer: data.organizer || '',
    maxParticipants: data.maxParticipants || undefined,
    currentParticipants: data.currentParticipants || undefined,
    registrationRequired: Boolean(data.registrationRequired),
    registrationDeadline: data.registrationDeadline || undefined,
    price: data.price || undefined,
    tags,
    status: data.status as Event['status'],
    slug: data.slug || ''
  };
}

export function EventList({
  events,
  loading = false,
  variant = 'grid',
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  itemsPerPage = 9,
  className
}: EventListProps) {
  // États locaux
  const [currentView, setCurrentView] = useState<'grid' | 'list' | 'calendar'>(variant);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedTag, setSelectedTag] = useState<FilterOption>('all');
  const [selectedLocation, setSelectedLocation] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Extraction des tags et lieux uniques
  const availableTags = useMemo(() => {
    const tags = events.flatMap(event => event.tags);
    return Array.from(new Set(tags)).sort();
  }, [events]);

  const availableLocations = useMemo(() => {
    const locations = events
      .filter(event => event.location?.name)
      .map(event => event.location!.name);
    return Array.from(new Set(locations)).sort();
  }, [events]);

  // Filtrage et tri des événements
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...events];

    // Filtrage par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.organizer.toLowerCase().includes(term) ||
        (event.location?.name.toLowerCase().includes(term))
      );
    }

    // Filtrage par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    // Filtrage par tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(event => event.tags.includes(selectedTag));
    }

    // Filtrage par lieu
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(event => event.location?.name === selectedLocation);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'date-desc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title, 'fr');
        case 'title-desc':
          return b.title.localeCompare(a.title, 'fr');
        case 'participants-desc':
          return (b.currentParticipants || 0) - (a.currentParticipants || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, statusFilter, selectedTag, selectedLocation, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);
  const paginatedEvents = currentView === 'calendar' 
    ? filteredAndSortedEvents 
    : filteredAndSortedEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  // Reset de la pagination lors du changement de filtres
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, selectedTag, selectedLocation, sortBy]);

  // Statistiques rapides
  const stats = useMemo(() => {
    const upcoming = events.filter(e => e.status === 'upcoming').length;
    const ongoing = events.filter(e => e.status === 'ongoing').length;
    const totalParticipants = events.reduce((sum, e) => sum + (e.currentParticipants || 0), 0);
    
    return { upcoming, ongoing, totalParticipants };
  }, [events]);

  // Composant de filtre
  const FilterSelect = ({ 
    value, 
    onChange, 
    options, 
    placeholder, 
    icon: Icon 
  }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  // Rendu des événements selon la vue
  const renderEvents = () => {
    if (loading) {
      return (
        <div className={cn(
          currentView === 'grid' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
          currentView === 'list' && 'space-y-6',
          currentView === 'calendar' && 'w-full'
        )}>
          {currentView === 'calendar' ? (
            <div className="h-96 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          ) : (
            Array.from({ length: itemsPerPage }, (_, i) => (
              <EventCardSkeleton key={i} />
            ))
          )}
        </div>
      );
    }

    if (currentView === 'calendar') {
      return (
        <EventCalendar 
          events={paginatedEvents}
          onEventClick={(event) => {
            // Navigation vers la page de détail
            window.location.href = `/events/${event.slug}`;
          }}
        />
      );
    }

    if (paginatedEvents.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Aucun événement trouvé
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setSelectedTag('all');
              setSelectedLocation('all');
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      );
    }

    // Rendu selon la vue
    return (
      <div className={cn(
        currentView === 'grid' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        currentView === 'list' && 'space-y-6'
      )}>
        {paginatedEvents.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            variant={currentView === 'grid' && index === 0 && currentPage === 1 ? 'featured' : 'default'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.upcoming}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Événements à venir
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.ongoing}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                En cours
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.totalParticipants}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Participants total
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* En-tête avec filtres */}
      {(showSearch || showFilters || showViewToggle) && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          {/* Barre de recherche */}
          {showSearch && (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher des événements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}

          {/* Filtres et contrôles */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Filtres */}
            {showFilters && (
              <div className="flex flex-wrap gap-3">
                <FilterSelect
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as StatusFilter)}
                  options={['upcoming', 'ongoing', 'completed', 'cancelled']}
                  placeholder="Tous les statuts"
                  icon={Filter}
                />
                
                <FilterSelect
                  value={selectedTag}
                  onChange={setSelectedTag}
                  options={availableTags}
                  placeholder="Tous les tags"
                  icon={Tag}
                />

                <FilterSelect
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  options={availableLocations}
                  placeholder="Tous les lieux"
                  icon={MapPin}
                />

                <FilterSelect
                  value={sortBy}
                  onChange={(value) => setSortBy(value as SortOption)}
                  options={[
                    'date-asc',
                    'date-desc',
                    'title-asc',
                    'title-desc',
                    'participants-desc'
                  ]}
                  placeholder="Trier par"
                  icon={Calendar}
                />
              </div>
            )}

            {/* Toggle de vue */}
            {showViewToggle && (
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('grid')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    currentView === 'grid'
                      ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    currentView === 'list'
                      ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    currentView === 'calendar'
                      ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Résultats */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>
              {filteredAndSortedEvents.length} événement{filteredAndSortedEvents.length > 1 ? 's' : ''} trouvé{filteredAndSortedEvents.length > 1 ? 's' : ''}
            </span>
            {currentView !== 'calendar' && totalPages > 1 && (
              <span>
                Page {currentPage} sur {totalPages}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Liste des événements */}
      {renderEvents()}

      {/* Pagination */}
      {currentView !== 'calendar' && totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => 
              page === 1 || 
              page === totalPages || 
              Math.abs(page - currentPage) <= 1
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2 text-slate-400">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'px-3 py-2 rounded-lg border transition-colors',
                    currentPage === page
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}
          
          <button
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}

// Hook pour charger les événements
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        // Import direct du JSON avec validation
        const { default: eventsData } = await import('@/data/events.json');
        
        // Validation et conversion des données
        const validatedEvents: Event[] = eventsData.map(validateEventData);
        
        setEvents(validatedEvents);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading };
}