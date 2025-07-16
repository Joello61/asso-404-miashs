'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Euro,
  ArrowRight,
  Tag,
  CheckCircle,
  XCircle,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured' | 'compact' | 'mini';
  showImage?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
  showRegistration?: boolean;
  className?: string;
}

export function EventCard({
  event,
  variant = 'default',
  showImage = true,
  showDescription = true,
  showTags = true,
  showRegistration = true,
  className,
}: EventCardProps) {
  const {
    title,
    description,
    startDate,
    endDate,
    location,
    image,
    organizer,
    maxParticipants,
    currentParticipants,
    registrationRequired,
    registrationDeadline,
    price,
    tags,
    status,
    slug,
  } = event;

  // Configuration selon la variante
  const config = {
    default: {
      imageHeight: 'h-48',
      titleSize: 'text-xl',
      descriptionLines: 3,
      padding: 'p-6',
    },
    featured: {
      imageHeight: 'h-64',
      titleSize: 'text-2xl',
      descriptionLines: 4,
      padding: 'p-8',
    },
    compact: {
      imageHeight: 'h-32',
      titleSize: 'text-lg',
      descriptionLines: 2,
      padding: 'p-4',
    },
    mini: {
      imageHeight: 'h-24',
      titleSize: 'text-base',
      descriptionLines: 1,
      padding: 'p-3',
    },
  };

  const currentConfig = config[variant];

  // Calculs pour l'événement
  const startDateTime = new Date(startDate);
  const endDateTime = endDate ? new Date(endDate) : null;
  const registrationDeadlineDate = registrationDeadline
    ? new Date(registrationDeadline)
    : null;
  const now = new Date();

  const isUpcoming = status === 'upcoming' && startDateTime > now;
  const isOngoing =
    status === 'ongoing' ||
    (startDateTime <= now && (!endDateTime || endDateTime >= now));
  const isCompleted =
    status === 'completed' || (endDateTime && endDateTime < now);
  const isCancelled = status === 'cancelled';

  const registrationOpen =
    registrationRequired &&
    isUpcoming &&
    (!registrationDeadlineDate || registrationDeadlineDate > now);

  const spotsAvailable = maxParticipants
    ? maxParticipants - (currentParticipants || 0)
    : null;
  const isFull = spotsAvailable !== null && spotsAvailable <= 0;

  // Couleurs selon le statut
  const statusConfig = {
    upcoming: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      icon: Calendar,
      label: 'À venir',
    },
    ongoing: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      icon: CheckCircle,
      label: 'En cours',
    },
    completed: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      icon: CheckCircle,
      label: 'Terminé',
    },
    cancelled: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-300',
      icon: XCircle,
      label: 'Annulé',
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.upcoming;
  const StatusIcon = currentStatus.icon;

  return (
    <article
      className={cn(
        'group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300',
        !isCancelled &&
          'hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-1',
        variant === 'featured' &&
          'ring-2 ring-primary-100 dark:ring-primary-900',
        isCancelled && 'opacity-75',
        className
      )}
    >
      <Link href={`/events/${slug}`} className="block">
        {/* Image */}
        {showImage && image && (
          <div
            className={cn(
              'relative overflow-hidden',
              currentConfig.imageHeight
            )}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Badge statut */}
            <div className="absolute top-3 left-3">
              <div
                className={cn(
                  'flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium',
                  currentStatus.bg,
                  currentStatus.text
                )}
              >
                <StatusIcon className="w-4 h-4" />
                <span>{currentStatus.label}</span>
              </div>
            </div>

            {/* Badge prix */}
            {price !== undefined && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-sm font-medium">
                  {price === 0 ? (
                    <span className="text-green-600 dark:text-green-400">
                      Gratuit
                    </span>
                  ) : (
                    <>
                      <Euro className="w-4 h-4" />
                      <span>{price}€</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Date overlay pour featured */}
            {variant === 'featured' && (
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-2xl font-bold">
                  {startDateTime.getDate()}
                </div>
                <div className="text-sm uppercase tracking-wide">
                  {startDateTime.toLocaleDateString('fr-FR', {
                    month: 'short',
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contenu */}
        <div className={currentConfig.padding}>
          {/* Tags */}
          {showTags && tags.length > 0 && variant !== 'mini' && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, variant === 'featured' ? 3 : 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {tags.length > (variant === 'featured' ? 3 : 2) && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  +{tags.length - (variant === 'featured' ? 3 : 2)}
                </span>
              )}
            </div>
          )}

          {/* Titre */}
          <h3
            className={cn(
              'font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
              currentConfig.titleSize,
              variant === 'mini' ? 'line-clamp-1' : 'line-clamp-2'
            )}
          >
            {title}
          </h3>

          {/* Description */}
          {showDescription && description && variant !== 'mini' && (
            <p
              className={cn(
                'text-slate-600 dark:text-slate-400 mb-4 leading-relaxed',
                `line-clamp-${currentConfig.descriptionLines}`
              )}
            >
              {description}
            </p>
          )}

          {/* Informations clés */}
          <div className="space-y-2 mb-4">
            {/* Date et heure */}
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <div>
                <span className="font-medium">
                  {formatDate(startDateTime, {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year:
                      startDateTime.getFullYear() !== now.getFullYear()
                        ? 'numeric'
                        : undefined,
                  })}
                </span>
                {endDateTime && (
                  <span className="text-slate-500 dark:text-slate-500">
                    {' → '}
                    {formatDate(endDateTime, {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </span>
                )}
              </div>
            </div>

            {/* Heure */}
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>
                {startDateTime.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {endDateTime && (
                  <span>
                    {' - '}
                    {endDateTime.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </span>
            </div>

            {/* Lieu */}
            {location && (
              <div className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">{location.name}</div>
                  {location.address && variant !== 'mini' && (
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      {location.address}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Organisateur */}
            {organizer && variant !== 'mini' && (
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Organisé par {organizer}</span>
              </div>
            )}
          </div>

          {/* Informations d'inscription */}
          {showRegistration && registrationRequired && variant !== 'mini' && (
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              {/* Participants */}
              {maxParticipants && (
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {currentParticipants || 0} / {maxParticipants}{' '}
                      participants
                    </span>
                  </div>
                  {spotsAvailable !== null && (
                    <span
                      className={cn(
                        'font-medium',
                        spotsAvailable <= 3
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      )}
                    >
                      {spotsAvailable > 0
                        ? `${spotsAvailable} place${
                            spotsAvailable > 1 ? 's' : ''
                          }`
                        : 'Complet'}
                    </span>
                  )}
                </div>
              )}

              {/* Barre de progression */}
              {maxParticipants && (
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mb-2">
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      isFull ? 'bg-red-500' : 'bg-primary-500'
                    )}
                    style={{
                      width: `${Math.min(
                        100,
                        ((currentParticipants || 0) / maxParticipants) * 100
                      )}%`,
                    }}
                  />
                </div>
              )}

              {/* Date limite d'inscription */}
              {registrationDeadlineDate && registrationOpen && (
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Inscription jusqu&apos;au{' '}
                  {formatDate(registrationDeadlineDate)}
                </div>
              )}
            </div>
          )}

          {/* Footer avec action */}
          <div className="flex items-center justify-between">
            {/* Prix ou statut */}
            <div className="flex items-center space-x-2">
              {price !== undefined && (
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  {price === 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Gratuit
                    </span>
                  ) : (
                    <div className="flex items-center">
                      <Euro className="w-4 h-4 mr-1" />
                      <span className="font-medium">{price}€</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action */}
            <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
              <span className="font-medium text-sm">
                {isCompleted
                  ? 'Voir le résumé'
                  : isCancelled
                  ? 'Détails'
                  : isOngoing
                  ? "Voir l'événement"
                  : 'En savoir plus'}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Composant skeleton pour le loading
export function EventCardSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'featured' | 'compact' | 'mini';
}) {
  const config = {
    default: { height: 'h-48', padding: 'p-6' },
    featured: { height: 'h-64', padding: 'p-8' },
    compact: { height: 'h-32', padding: 'p-4' },
    mini: { height: 'h-24', padding: 'p-3' },
  };

  const currentConfig = config[variant];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Image skeleton */}
      <div
        className={cn(
          'bg-slate-200 dark:bg-slate-700 animate-pulse',
          currentConfig.height
        )}
      />

      {/* Contenu skeleton */}
      <div className={currentConfig.padding}>
        {/* Tags skeleton */}
        {variant !== 'mini' && (
          <div className="flex gap-2 mb-3">
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
          </div>
        )}

        {/* Titre skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          {variant !== 'mini' && (
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          )}
        </div>

        {/* Description skeleton */}
        {variant !== 'mini' && (
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        )}

        {/* Informations skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Variante mini pour agenda ou sidebar
// Variante mini pour agenda ou sidebar
export function EventCardMini({
  event,
  className,
  onClick,
}: {
  event: Event;
  className?: string;
  onClick?: (event: Event) => void;
}) {
  const startDateTime = new Date(event.startDate);

  // Si onClick est fourni, utiliser un div avec onClick au lieu de Link
  if (onClick) {
    return (
      <div
        className={cn(
          'group flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer',
          className
        )}
        onClick={() => onClick(event)}
      >
        {/* Date */}
        <div className="flex-shrink-0 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase">
              {startDateTime.toLocaleDateString('fr-FR', { month: 'short' })}
            </div>
            <div className="text-lg font-bold text-primary-800 dark:text-primary-200">
              {startDateTime.getDate()}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
            {event.title}
          </h4>

          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2 mb-1">
            <span>
              {startDateTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {event.location && (
              <>
                <span>•</span>
                <span className="truncate">{event.location.name}</span>
              </>
            )}
          </div>

          {event.tags.length > 0 && (
            <div className="text-xs text-primary-600 dark:text-primary-400">
              {event.tags[0]}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Comportement par défaut avec Link
  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        'group flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors',
        className
      )}
    >
      {/* Date */}
      <div className="flex-shrink-0 text-center">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex flex-col items-center justify-center">
          <div className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase">
            {startDateTime.toLocaleDateString('fr-FR', { month: 'short' })}
          </div>
          <div className="text-lg font-bold text-primary-800 dark:text-primary-200">
            {startDateTime.getDate()}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
          {event.title}
        </h4>

        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2 mb-1">
          <span>
            {startDateTime.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {event.location && (
            <>
              <span>•</span>
              <span className="truncate">{event.location.name}</span>
            </>
          )}
        </div>

        {event.tags.length > 0 && (
          <div className="text-xs text-primary-600 dark:text-primary-400">
            {event.tags[0]}
          </div>
        )}
      </div>
    </Link>
  );
}
