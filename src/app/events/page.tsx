'use client';

import React, { useState, useEffect } from 'react';
import { EventList } from '@/components/events/event-list';

// Import des données JSON
import eventsData from '@/data/events.json';
import type { Event } from '@/lib/types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulation du chargement des données et conversion en format typé
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Conversion des données JSON en format Event[]
        const typedEvents = eventsData as Event[];
        
        // Tri des événements par date (plus récents en premier)
        const sortedEvents = typedEvents.sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Calculer les statistiques d'événements
  const eventStats = {
    total: events.length,
    upcoming: events.filter(event => event.status === 'upcoming').length,
    completed: events.filter(event => event.status === 'completed').length,
    ongoing: events.filter(event => event.status === 'ongoing').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Événements
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez nos {eventStats.total} événements : hackathons, conférences, ateliers,
            et bien plus encore ! {eventStats.upcoming} événements à venir.
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {eventStats.total}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Total
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {eventStats.upcoming}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              À venir
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {eventStats.ongoing}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              En cours
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {eventStats.completed}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Terminés
            </div>
          </div>
        </div>

        {/* Liste des événements */}
        <EventList
          events={events}
          loading={loading}
          variant="grid"
          showFilters={true}
          showSearch={true}
          showViewToggle={true}
          showCalendar={true}
          itemsPerPage={9}
        />
      </div>
    </div>
  );
}