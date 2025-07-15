'use client';

import React, { useState, useMemo } from 'react';
import { Search, Calendar, Tag, User, Grid, List, SortAsc } from 'lucide-react';
import { NewsCard, NewsCardSkeleton, NewsCardCompact } from './news-card';
import { cn } from '@/lib/utils';
import type { News } from '@/lib/types';

interface NewsListProps {
  news: News[];
  loading?: boolean;
  variant?: 'grid' | 'list' | 'compact';
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
  itemsPerPage?: number;
  className?: string;
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';
type FilterOption = 'all' | string; // 'all' ou nom du tag

// Type garde pour valider le statut d'une actualité
function isValidNewsStatus(status: string): status is News['status'] {
  return ['published', 'draft', 'archived'].includes(status);
}

// Fonction pour valider les données JSON des actualités
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateNewsData(data: any): News {
  // Validation de base
  if (!data.id || !data.title || !data.content || !data.status) {
    throw new Error(`Données actualité invalides: ${JSON.stringify(data)}`);
  }

  // Validation du statut
  if (!isValidNewsStatus(data.status)) {
    console.warn(`Statut actualité non reconnu: ${data.status}, utilisation de "published" par défaut`);
    data.status = 'published';
  }

  // Validation et nettoyage des tags
  const tags = Array.isArray(data.tags) ? data.tags : [];

  // Validation de l'auteur
  const author = data.author || { name: 'Auteur inconnu' };

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt || '',
    author: {
      name: author.name || 'Auteur inconnu',
      avatar: author.avatar || undefined
    },
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || undefined,
    image: data.image || undefined,
    tags,
    status: data.status as News['status'],
    slug: data.slug || ''
  };
}

export function NewsList({
  news,
  loading = false,
  variant = 'grid',
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  itemsPerPage = 9,
  className
}: NewsListProps) {
  // États locaux
  const [currentView, setCurrentView] = useState<'grid' | 'list' | 'compact'>(variant);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<FilterOption>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Extraction des tags et auteurs uniques
  const availableTags = useMemo(() => {
    const tags = news.flatMap(item => item.tags);
    return Array.from(new Set(tags)).sort();
  }, [news]);

  const availableAuthors = useMemo(() => {
    const authors = news.map(item => item.author.name);
    return Array.from(new Set(authors)).sort();
  }, [news]);

  // Filtrage et tri des actualités
  const filteredAndSortedNews = useMemo(() => {
    let filtered = [...news];

    // Filtrage par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term)
      );
    }

    // Filtrage par tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(item => item.tags.includes(selectedTag));
    }

    // Filtrage par auteur
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(item => item.author.name === selectedAuthor);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'date-asc':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title, 'fr');
        case 'title-desc':
          return b.title.localeCompare(a.title, 'fr');
        default:
          return 0;
      }
    });

    return filtered;
  }, [news, searchTerm, selectedTag, selectedAuthor, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedNews.length / itemsPerPage);
  const paginatedNews = filteredAndSortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset de la pagination lors du changement de filtres
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag, selectedAuthor, sortBy]);

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

  // Rendu des actualités selon la vue
  const renderNews = () => {
    if (loading) {
      return (
        <div className={cn(
          currentView === 'grid' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
          currentView === 'list' && 'space-y-6',
          currentView === 'compact' && 'space-y-2'
        )}>
          {Array.from({ length: itemsPerPage }, (_, i) => (
            <NewsCardSkeleton 
              key={i} 
              variant={currentView === 'compact' ? 'compact' : 'default'} 
            />
          ))}
        </div>
      );
    }

    if (paginatedNews.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Aucune actualité trouvée
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTag('all');
              setSelectedAuthor('all');
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      );
    }

    // Rendu selon la vue
    switch (currentView) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedNews.map((item, index) => (
              <NewsCard
                key={item.id}
                news={item}
                variant={index === 0 && currentPage === 1 ? 'featured' : 'default'}
              />
            ))}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-6">
            {paginatedNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                variant="default"
                className="flex flex-col lg:flex-row"
              />
            ))}
          </div>
        );

      case 'compact':
        return (
          <div className="space-y-2">
            {paginatedNews.map((item) => (
              <NewsCardCompact key={item.id} news={item} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* En-tête avec filtres */}
      {(showSearch || showFilters || showViewToggle) && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          {/* Barre de recherche */}
          {showSearch && (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher dans les actualités..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}

          {/* Filtres et contrôles */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Filtres */}
            {showFilters && (
              <div className="flex flex-wrap gap-3">
                <FilterSelect
                  value={selectedTag}
                  onChange={setSelectedTag}
                  options={availableTags}
                  placeholder="Tous les tags"
                  icon={Tag}
                />
                
                <FilterSelect
                  value={selectedAuthor}
                  onChange={setSelectedAuthor}
                  options={availableAuthors}
                  placeholder="Tous les auteurs"
                  icon={User}
                />

                <FilterSelect
                  value={sortBy}
                  onChange={(value) => setSortBy(value as SortOption)}
                  options={[
                    'date-desc',
                    'date-asc',
                    'title-asc',
                    'title-desc'
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
                  onClick={() => setCurrentView('compact')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    currentView === 'compact'
                      ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  <SortAsc className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Résultats */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>
              {filteredAndSortedNews.length} actualité{filteredAndSortedNews.length > 1 ? 's' : ''} trouvée{filteredAndSortedNews.length > 1 ? 's' : ''}
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} sur {totalPages}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Liste des actualités */}
      {renderNews()}

      {/* Pagination */}
      {totalPages > 1 && (
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

// Hook pour charger les actualités
export function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadNews = async () => {
      try {
        // Import direct du JSON avec validation
        const { default: newsData } = await import('@/data/actualites.json');
        
        // Validation et conversion des données
        const validatedNews: News[] = newsData.map(validateNewsData);
        
        setNews(validatedNews);
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { news, loading };
}