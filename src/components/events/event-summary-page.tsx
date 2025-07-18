'use client';

import React, { useState, useEffect } from 'react';
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
  Eye,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  Euro,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/lib/types';

// Import des données JSON
import eventsData from '@/data/events.json';

interface EventSummaryPageProps {
  eventSlug: string;
}

export default function EventSummaryPage({ eventSlug }: EventSummaryPageProps) {
  const router = useRouter();
  const events = eventsData as Event[];
  const event = events.find(e => e.slug === eventSlug);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (event?.gallery && event.gallery.length > 0) {
      setGalleryImages(event.gallery);
    } else if (event?.image) {
      // Fallback : juste l'image principale si pas de galerie
      setGalleryImages([event.image]);
    }
  }, [event]);

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

  const openLightbox = (imageUrl: string) => {
    const index = galleryImages.indexOf(imageUrl);
    setCurrentImageIndex(index);
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
      : (currentImageIndex + 1) % galleryImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
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
              onClick={() => router.push('/events')}
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour aux événements
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push(`/events/${eventSlug}/about`)}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Info className="w-4 h-4 mr-2" />
                En savoir plus
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
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={event.image || '/images/default-event.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getStatusColor(event.status))}>
              {getStatusText(event.status)}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {event.title}
          </h1>
          
          <p className="text-white/90 text-lg lg:text-xl max-w-3xl">
            {event.description}
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations détaillées */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Description
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Galerie photos */}
              {galleryImages.length > 1 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Galerie photos ({galleryImages.length} photos)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => openLightbox(imageUrl)}
                      >
                        <Image
                          src={imageUrl}
                          alt={`Photo ${index + 1} - ${event.title}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Informations pratiques */}
            <div className="space-y-6">
              {/* Date et heure */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
                  Date et heure
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {formatDate(new Date(event.startDate), { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      {event.endDate && event.endDate !== event.startDate && (
                        <div className="text-sm text-slate-600 dark:text-slate-400">
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

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {new Date(event.startDate).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      {event.endDate && (
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          à {new Date(event.endDate).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lieu */}
              {event.location && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Lieu
                  </h3>
                  <div className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    {event.location.name}
                  </div>
                  {event.location.address && (
                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                      {event.location.address}
                    </div>
                  )}
                  {event.location.url && (
                    <a
                      href={event.location.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Voir sur la carte
                    </a>
                  )}
                </div>
              )}

              {/* Participants */}
              {event.maxParticipants && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Participants
                  </h3>
                  <div className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    {event.currentParticipants || 0}/{event.maxParticipants} inscrits
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {event.maxParticipants - (event.currentParticipants || 0)} places restantes
                  </div>
                  {event.registrationRequired && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Inscription requise
                    </div>
                  )}
                  {event.registrationDeadline && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Date limite : {formatDate(new Date(event.registrationDeadline))}
                    </div>
                  )}
                </div>
              )}

              {/* Prix */}
              {event.price !== undefined && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Euro className="w-5 h-5 mr-2" />
                    Tarif
                  </h3>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {event.price === 0 ? 'Gratuit' : `${event.price}€`}
                  </div>
                </div>
              )}

              {/* Organisateur */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
                  Organisateur
                </h3>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {event.organizer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox pour la galerie */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
          
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Image agrandie"
              fill
              className="object-contain"
            />
          </div>
          
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}