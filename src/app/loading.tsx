import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <div className="hidden sm:block space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-8 w-16" />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="hidden lg:block w-20 h-8 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="pt-16">
        <div className="container-custom py-8">
          {/* Hero Section Skeleton */}
          <div className="text-center py-16 space-y-6">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="flex justify-center space-x-4 pt-6">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>

          {/* Grille de contenu */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="card p-6 space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton variant="text" lines={3} />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spinner central avec message */}
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-40">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Chargement...
            </h2>
            <p className="text-sm text-muted-foreground">
              Préparation de votre contenu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading spécialisé pour le trombinoscope
export function TrombinoscopeLoading() {
  return (
    <div className="container-custom py-8">
      <div className="space-y-8">
        {/* Header avec filtres */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-40 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="card p-4 text-center space-y-2">
              <Skeleton className="h-8 w-16 mx-auto" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>

        {/* Grille des membres */}
        <div className="members-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="member-card space-y-4">
              <Skeleton variant="circular" className="w-24 h-24 mx-auto" />
              <div className="space-y-2 text-center">
                <Skeleton className="h-5 w-32 mx-auto" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
              <div className="flex justify-center space-x-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading pour les actualités/événements
export function NewsEventsLoading() {
  return (
    <div className="container-custom py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <article key={i} className="card overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton variant="text" lines={3} />
                </div>
                <div className="flex items-center space-x-3 pt-4">
                  <Skeleton variant="circular" className="w-8 h-8" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
