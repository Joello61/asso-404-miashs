'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  ExternalLink,
  Share2,
  BookOpen,
  Eye,
  Euro,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/lib/types';

// Import des données JSON
import eventsData from '@/data/events.json';

interface EventAboutPageProps {
  eventSlug: string;
}

export default function EventAboutPage({ eventSlug }: EventAboutPageProps) {
  const router = useRouter();
  const events = eventsData as Event[];
  const event = events.find(e => e.slug === eventSlug);

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Événement non trouvé
          </h1>
          <button
            onClick={() => router.push('/events')}
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux événements
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header avec navigation */}
      <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/events/${eventSlug}`)}
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au résumé
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push(`/events/${eventSlug}`)}
                className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Voir le résumé
              </button>
              
              <button
                onClick={shareEvent}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                title="Partager l'événement"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-64 lg:h-80 overflow-hidden">
        <Image
          src={event.image || '/images/default-event.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3 mb-3">
            <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getStatusColor(event.status))}>
              {getStatusText(event.status)}
            </span>
          </div>
          
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">
            {event.title}
          </h1>
          
          <p className="text-white/90 text-lg max-w-2xl">
            Informations détaillées sur l&apos;événement
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description complète */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Description détaillée
              </h2>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
                  <Tag className="w-6 h-6 mr-3" />
                  Catégories et tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Galerie (aperçu) */}
            {event.gallery && event.gallery.length > 1 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
                  <Eye className="w-6 h-6 mr-3" />
                  Aperçu de la galerie ({event.gallery.length} photos)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {event.gallery.slice(0, 4).map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Aperçu ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {index === 3 && event.gallery!.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium">
                            +{event.gallery!.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => router.push(`/events/${eventSlug}`)}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir toutes les photos
                </button>
              </div>
            )}

            {/* Inscription */}
            {event.registrationRequired && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Inscription requise
                </h3>
                <div className="space-y-3 text-amber-800 dark:text-amber-200">
                  <p>
                    L&apos;inscription est obligatoire pour participer à cet événement.
                  </p>
                  {event.registrationDeadline && (
                    <p className="font-medium">
                      Date limite d&apos;inscription : {formatDate(new Date(event.registrationDeadline), {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                  {event.maxParticipants && (
                    <p>
                      Places disponibles : {event.maxParticipants - (event.currentParticipants || 0)} sur {event.maxParticipants}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Informations pratiques */}
          <div className="space-y-6">
            {/* Résumé des informations */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                Informations pratiques
              </h3>
              
              <div className="space-y-6">
                {/* Date */}
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">Date</span>
                  </div>
                  <div className="ml-8">
                    <div className="text-slate-600 dark:text-slate-400">
                      {formatDate(new Date(event.startDate), { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    {event.endDate && event.endDate !== event.startDate && (
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        au {formatDate(new Date(event.endDate), { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Heure */}
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">Heure</span>
                  </div>
                  <div className="ml-8">
                    <div className="text-slate-600 dark:text-slate-400">
                      {new Date(event.startDate).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    {event.endDate && (
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        à {new Date(event.endDate).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lieu */}
                {event.location && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">Lieu</span>
                    </div>
                    <div className="ml-8">
                      <div className="text-slate-600 dark:text-slate-400">
                        {event.location.name}
                      </div>
                      {event.location.address && (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {event.location.address}
                        </div>
                      )}
                      {event.location.url && (
                        <a
                          href={event.location.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-1"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Voir sur la carte
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Participants */}
                {event.maxParticipants && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">Participants</span>
                    </div>
                    <div className="ml-8">
                      <div className="text-slate-600 dark:text-slate-400">
                        {event.currentParticipants || 0} / {event.maxParticipants} inscrits
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {event.maxParticipants - (event.currentParticipants || 0)} places restantes
                      </div>
                    </div>
                  </div>
                )}

                {/* Prix */}
                {event.price !== undefined && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Euro className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">Prix</span>
                    </div>
                    <div className="ml-8">
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {event.price === 0 ? 'Gratuit' : `${event.price}€`}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Organisateur */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Organisateur
              </h3>
              <div className="text-slate-600 dark:text-slate-400">
                {event.organizer}
              </div>
            </div>

            {/* Statut */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Statut
              </h3>
              <span className={cn('inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium', getStatusColor(event.status))}>
                {getStatusText(event.status)}
              </span>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/events/${eventSlug}`)}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir le résumé
                </button>
                
                <button
                  onClick={shareEvent}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager l&apos;événement
                </button>

                {event.location?.url && (
                  <a
                    href={event.location.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Voir la localisation
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}