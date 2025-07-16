'use client';

import React from 'react';
import { NewsList, useNews } from '@/components/actualites/news-list';

export default function ActualitesPage() {
  const { news, loading } = useNews();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Actualités
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez les dernières nouvelles de l&apos;Asso 404 MIASHS :
            événements, projets, partenariats et bien plus encore !
          </p>
        </div>

        {/* Liste des actualités */}
        <NewsList
          news={news}
          loading={loading}
          variant="grid"
          showFilters={true}
          showSearch={true}
          showViewToggle={true}
          itemsPerPage={9}
        />
      </div>
    </div>
  );
}
