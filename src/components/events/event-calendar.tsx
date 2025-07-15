'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, List, Grid } from 'lucide-react';
import { EventCardMini } from './event-card';
import { cn } from '@/lib/utils';
import type { Event } from '@/lib/types';

interface EventCalendarProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onDateClick?: (date: Date) => void;
  className?: string;
}

export function EventCalendar({ 
  events, 
  onEventClick, 
  onDateClick, 
  className 
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Calculs pour le calendrier
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Événements du mois
  const eventsInMonth = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }, [events, year, month]);

  // Événements groupés par jour
  const eventsByDay = useMemo(() => {
    const groups: Record<number, Event[]> = {};
    eventsInMonth.forEach(event => {
      const day = new Date(event.startDate).getDate();
      if (!groups[day]) groups[day] = [];
      groups[day].push(event);
    });
    return groups;
  }, [eventsInMonth]);

  // Génération des jours du calendrier
  const calendarDays = useMemo(() => {
    const days = [];
    
    // Jours du mois précédent
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const dayEvents = eventsByDay[day] || [];
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        events: dayEvents
      });
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
    
    return days;
  }, [year, month, daysInMonth, firstDayOfWeek, today, eventsByDay]);

  // Vue liste des événements du mois
  const renderEventsList = () => {
    const sortedEvents = [...eventsInMonth].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    if (sortedEvents.length === 0) {
      return (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
            Aucun événement ce mois-ci
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Consultez les autres mois ou créez un nouvel événement.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {sortedEvents.map((event) => (
          <EventCardMini
            key={event.id}
            event={event}
            onClick={() => onEventClick?.(event)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn('bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700', className)}>
      {/* En-tête */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {currentDate.toLocaleDateString('fr-FR', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          
          <div className="flex items-center space-x-2">
            {/* Toggle vue */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'calendar'
                    ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
          >
            Aujourd&apos;hui
          </button>
        </div>

        {/* Compteur d'événements */}
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {eventsInMonth.length} événement{eventsInMonth.length > 1 ? 's' : ''} ce mois-ci
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {viewMode === 'calendar' ? (
          <div>
            {/* En-têtes des jours */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    'min-h-[80px] p-1 border border-slate-100 dark:border-slate-700 rounded-lg cursor-pointer transition-colors',
                    day.isCurrentMonth
                      ? 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                      : 'bg-slate-50 dark:bg-slate-900/50 text-slate-400',
                    day.isToday && 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  )}
                  onClick={() => onDateClick?.(day.date)}
                >
                  <div className={cn(
                    'text-sm font-medium mb-1',
                    day.isToday && 'text-primary-600 dark:text-primary-400'
                  )}>
                    {day.date.getDate()}
                  </div>
                  
                  {/* Événements du jour */}
                  <div className="space-y-1">
                    {day.events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          'text-xs px-2 py-1 rounded text-white truncate cursor-pointer',
                          event.status === 'upcoming' && 'bg-blue-500',
                          event.status === 'ongoing' && 'bg-green-500',
                          event.status === 'completed' && 'bg-slate-500',
                          event.status === 'cancelled' && 'bg-red-500'
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 px-2">
                        +{day.events.length - 2} autre{day.events.length - 2 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderEventsList()
        )}
      </div>
    </div>
  );
}

// Mini calendrier pour sidebar
export function MiniEventCalendar({ 
  events, 
  selectedDate, 
  onDateSelect, 
  className 
}: {
  events: Event[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
}) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Événements du mois
  const eventDays = useMemo(() => {
    const days = new Set<number>();
    events.forEach(event => {
      const eventDate = new Date(event.startDate);
      if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
        days.add(eventDate.getDate());
      }
    });
    return days;
  }, [events, year, month]);

  // Génération des jours
  const calendarDays = useMemo(() => {
    const days = [];
    
    // Jours du mois précédent
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: false
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const hasEvents = eventDays.has(day);
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        hasEvents
      });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: false
      });
    }
    
    return days;
  }, [year, month, daysInMonth, firstDayOfWeek, today, eventDays]);

  return (
    <div className={cn('bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4', className)}>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendrier */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => {
              if (day.isCurrentMonth) {
                onDateSelect?.(day.date);
              }
            }}
            className={cn(
              'relative p-1 text-sm rounded transition-colors',
              day.isCurrentMonth
                ? 'text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700'
                : 'text-slate-400 dark:text-slate-600',
              day.isToday && 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
              selectedDate && day.date.toDateString() === selectedDate.toDateString() && 'ring-2 ring-primary-500'
            )}
          >
            {day.date.getDate()}
            {day.hasEvents && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}