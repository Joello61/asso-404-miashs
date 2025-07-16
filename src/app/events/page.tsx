'use client';

import React from 'react';
import { EventList, useEvents } from '@/components/events/event-list';

export default function EventsPage() {
  const { events, loading } = useEvents();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Événements
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez tous nos événements : hackathons, conférences, ateliers,
            et bien plus encore !
          </p>
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
