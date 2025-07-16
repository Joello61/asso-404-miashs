'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Grid,
  List,
  Users,
  Award,
} from 'lucide-react';
import { MemberCard, MemberCardSkeleton } from './member-card';
import { cn } from '@/lib/utils';
import { useMemberFilters } from '@/hooks/use-filters';
import { usePagination } from '@/hooks/use-pagination';
import { getMemberStats, groupMembersByPromo } from '@/lib/utils';
import type { Member, PromoType } from '@/lib/types';

interface MemberGridProps {
  members: Member[];
  loading?: boolean;
  variant?: 'grid' | 'list' | 'compact';
  showFilters?: boolean;
  showSearch?: boolean;
  showStats?: boolean;
  showViewToggle?: boolean;
  itemsPerPage?: number;
  onMemberClick?: (member: Member) => void;
  className?: string;
}

// Type garde pour valider une promo
function isValidPromo(promo: string): promo is PromoType {
  return promo === 'L3' || promo === 'M1' || promo === 'M2';
}

// Fonction pour valider les données JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateMemberData(data: any): Member {
  // Validation de base
  if (!data.id || !data.firstName || !data.lastName || !data.promo) {
    throw new Error(`Données membre invalides: ${JSON.stringify(data)}`);
  }

  // Validation de la promo
  if (!isValidPromo(data.promo)) {
    console.warn(
      `Promo non reconnue: ${data.promo}, utilisation de L3 par défaut`
    );
    data.promo = 'L3';
  }

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    promo: data.promo as PromoType,
    photo: data.photo || undefined,
    linkedin: data.linkedin || undefined,
    github: data.github || undefined,
    email: data.email || undefined,
    role: data.role || undefined,
    description: data.description || undefined,
    skills: Array.isArray(data.skills) ? data.skills : [],
    joinDate: data.joinDate || undefined,
  };
}

export function MemberGrid({
  members,
  loading = false,
  variant = 'grid',
  showFilters = true,
  showSearch = true,
  showStats = true,
  showViewToggle = true,
  itemsPerPage = 24,
  onMemberClick,
  className,
}: MemberGridProps) {
  const [currentView, setCurrentView] = useState<'grid' | 'list' | 'compact'>(
    variant
  );

  // Gestion des filtres
  const {
    filters,
    filteredMembers,
    updateSearch,
    clearFilters,
    hasActiveFilters,
    resultCount,
  } = useMemberFilters(members);

  // Gestion de la pagination
  const {
    currentItems: paginatedMembers,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredMembers, itemsPerPage);

  // Statistiques
  const stats = useMemo(() => getMemberStats(members), [members]);

  // Groupement par promo pour l'affichage
  const membersByPromo = useMemo(() => {
    if (currentView !== 'grid') return null;
    return groupMembersByPromo(paginatedMembers);
  }, [paginatedMembers, currentView]);

  // Statistiques à afficher
  const displayStats = [
    {
      label: 'Total membres',
      value: stats.total,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: 'Actifs',
      value: members.filter((m) => m.skills && m.skills.length > 0).length,
      icon: Award,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  // Fonction pour mapper le variant du grid vers le variant de la card
  const getCardVariant = (gridView: 'grid' | 'list' | 'compact') => {
    switch (gridView) {
      case 'grid':
        return 'default';
      case 'list':
        return 'detailed';
      case 'compact':
        return 'compact';
      default:
        return 'default';
    }
  };

  // Rendu des membres selon la vue
  const renderMembers = () => {
    if (loading) {
      return (
        <div
          className={cn(
            'grid gap-6',
            currentView === 'grid' &&
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
            currentView === 'list' && 'grid-cols-1',
            currentView === 'compact' && 'grid-cols-1 lg:grid-cols-2'
          )}
        >
          {Array.from({ length: itemsPerPage }, (_, i) => (
            <MemberCardSkeleton key={i} variant={getCardVariant(currentView)} />
          ))}
        </div>
      );
    }

    if (paginatedMembers.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Aucun membre trouvé
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {hasActiveFilters
              ? 'Essayez de modifier vos filtres ou votre recherche.'
              : "Il n'y a pas encore de membres dans cette association."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      );
    }

    // Vue grille groupée par promo
    if (currentView === 'grid' && membersByPromo) {
      return (
        <div className="space-y-8">
          {Object.entries(membersByPromo)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, members]) => members.length > 0)
            .map(([promo, promoMembers]) => (
              <div key={promo}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
                    <span
                      className={cn(
                        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-3',
                        promo === 'L3' &&
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                        promo === 'M1' &&
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                        promo === 'M2' &&
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      )}
                    >
                      {promo}
                    </span>
                    {promoMembers.length} membre
                    {promoMembers.length > 1 ? 's' : ''}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {promoMembers.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      variant="default"
                      onClick={onMemberClick}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      );
    }

    // Vue liste ou compact
    return (
      <div
        className={cn(
          'grid gap-6',
          currentView === 'list' && 'grid-cols-1',
          currentView === 'compact' && 'grid-cols-1 lg:grid-cols-2'
        )}
      >
        {paginatedMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            variant={getCardVariant(currentView)}
            onClick={onMemberClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Statistiques */}
      {showStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {displayStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center',
                      stat.bg
                    )}
                  >
                    <Icon className={cn('w-6 h-6', stat.color)} />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Contenu principal */}
        <div className="flex-1">
          {/* En-tête avec contrôles */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
            {/* Barre de recherche rapide */}
            {showSearch && !showFilters && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={filters.search || ''}
                  onChange={(e) => updateSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            )}

            {/* Contrôles et résultats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Résultats */}
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {resultCount}
                </span>{' '}
                membre{resultCount > 1 ? 's' : ''} trouvé
                {resultCount > 1 ? 's' : ''}
                {hasActiveFilters && (
                  <span className="ml-2 text-primary-600 dark:text-primary-400">
                    (filtré{resultCount > 1 ? 's' : ''})
                  </span>
                )}
              </div>

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
                    title="Vue grille"
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
                    title="Vue liste"
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
                    title="Vue compacte"
                  >
                    <Users className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Pagination info */}
            {totalPages > 1 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
                Page {currentPage} sur {totalPages} • {itemsPerPage} par page
              </div>
            )}
          </div>

          {/* Grille des membres */}
          {renderMembers()}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <button
                onClick={previousPage}
                disabled={!hasPreviousPage}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
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
                      onClick={() => goToPage(page)}
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
                onClick={nextPage}
                disabled={!hasNextPage}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook pour charger les membres
export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadMembers = async () => {
      try {
        // Import direct du JSON avec assertion de type
        const { default: membersData } = await import('@/data/membres.json');

        // Validation et conversion des données
        const validatedMembers: Member[] = membersData.map(validateMemberData);

        setMembers(validatedMembers);
      } catch (error) {
        console.error('Erreur lors du chargement des membres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  return { members, loading };
}
