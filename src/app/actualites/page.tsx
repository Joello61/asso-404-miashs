'use client';

import React, { useState, useEffect } from 'react';
import { NewsList } from '@/components/actualites/news-list';

// Import des données JSON
import actualitesData from '@/data/actualites.json';
import type { News } from '@/lib/types';

export default function ActualitesPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulation du chargement des données et conversion en format typé
  useEffect(() => {
    const loadNews = async () => {
      try {
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Conversion des données JSON en format News[]
        const typedNews = actualitesData as News[];
        
        // Tri des actualités par date de publication (plus récentes en premier)
        const sortedNews = typedNews.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        
        setNews(sortedNews);
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Calculer les statistiques d'actualités
  const newsStats = {
    total: news.length,
    published: news.filter(article => article.status === 'published').length,
    draft: news.filter(article => article.status === 'draft').length,
    archived: news.filter(article => article.status === 'archived').length,
  };

  // Obtenir les tags les plus populaires
  const allTags = news.flatMap(article => article.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const popularTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Actualités
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez nos {newsStats.total} actualités de l&apos;Asso 404 MIASHS :
            événements, projets, partenariats et bien plus encore !
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {newsStats.total}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Total
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {newsStats.published}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Publiées
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {newsStats.draft}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Brouillons
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {newsStats.archived}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Archivées
            </div>
          </div>
        </div>

        {/* Tags populaires */}
        {popularTags.length > 0 && (
          <div className="text-center mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Sujets populaires
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

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