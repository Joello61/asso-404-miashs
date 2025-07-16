'use client';

import React from 'react';
import { Search, Filter, X, Users, Code, GraduationCap } from 'lucide-react';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { cn } from '@/lib/utils';
import type { Member, MemberFilters, PromoType } from '@/lib/types';

interface MemberFiltersProps {
  members: Member[];
  filters: MemberFilters;
  onFiltersChange: (filters: MemberFilters) => void;
  resultCount: number;
  totalCount: number;
  className?: string;
}

export function MemberFiltersComponent({
  members,
  filters,
  onFiltersChange,
  resultCount,
  totalCount,
  className,
}: MemberFiltersProps) {
  // Extraction des compétences uniques
  const availableSkills = React.useMemo(() => {
    const skills = members.flatMap((member) => member.skills || []);
    return Array.from(new Set(skills)).sort();
  }, [members]);

  // Comptage par promo
  const promoStats = React.useMemo(() => {
    const stats = { L3: 0, M1: 0, M2: 0 };
    members.forEach((member) => {
      stats[member.promo]++;
    });
    return stats;
  }, [members]);

  // Mise à jour des filtres
  const updateFilters = (newFilters: Partial<MemberFilters>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  // Toggle promo
  const togglePromo = (promo: PromoType) => {
    const currentPromos = filters.promo || [];
    const newPromos = currentPromos.includes(promo)
      ? currentPromos.filter((p) => p !== promo)
      : [...currentPromos, promo];
    updateFilters({ promo: newPromos });
  };

  // Réinitialiser les filtres
  const clearFilters = () => {
    onFiltersChange({
      promo: [],
      search: '',
      hasLinkedIn: undefined,
      hasGitHub: undefined,
    });
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = !!(
    filters.promo?.length ||
    filters.search ||
    filters.hasLinkedIn !== undefined ||
    filters.hasGitHub !== undefined
  );

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6',
        className
      )}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Filtres
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Barre de recherche */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Rechercher un membre
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Nom, prénom, compétence..."
              value={filters.search || ''}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {filters.search && (
              <button
                onClick={() => updateFilters({ search: '' })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filtres par promotion */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Promotion
          </label>
          <div className="space-y-2">
            {(['L3', 'M1', 'M2'] as PromoType[]).map((promo) => {
              const isSelected = filters.promo?.includes(promo);
              const count = promoStats[promo];

              return (
                <button
                  key={promo}
                  onClick={() => togglePromo(promo)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200',
                    isSelected
                      ? 'border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                      : 'border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                        isSelected
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-slate-300 dark:border-slate-600'
                      )}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span
                        className={cn(
                          'font-medium',
                          isSelected
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-slate-700 dark:text-slate-300'
                        )}
                      >
                        {promo}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-sm px-2 py-1 rounded-full',
                      isSelected
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtres par réseaux sociaux */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Réseaux sociaux
          </label>
          <div className="space-y-2">
            {/* LinkedIn */}
            <button
              onClick={() =>
                updateFilters({
                  hasLinkedIn: filters.hasLinkedIn === true ? undefined : true,
                })
              }
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200',
                filters.hasLinkedIn === true
                  ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                    filters.hasLinkedIn === true
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 dark:border-slate-600'
                  )}
                >
                  {filters.hasLinkedIn === true && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <SiLinkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span
                    className={cn(
                      'font-medium',
                      filters.hasLinkedIn === true
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300'
                    )}
                  >
                    Avec LinkedIn
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  'text-sm px-2 py-1 rounded-full',
                  filters.hasLinkedIn === true
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                )}
              >
                {members.filter((m) => m.linkedin).length}
              </span>
            </button>

            {/* GitHub */}
            <button
              onClick={() =>
                updateFilters({
                  hasGitHub: filters.hasGitHub === true ? undefined : true,
                })
              }
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200',
                filters.hasGitHub === true
                  ? 'border-slate-800 bg-slate-50 dark:bg-slate-700/20 dark:border-slate-600'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                    filters.hasGitHub === true
                      ? 'border-slate-800 bg-slate-800 dark:border-slate-600 dark:bg-slate-600'
                      : 'border-slate-300 dark:border-slate-600'
                  )}
                >
                  {filters.hasGitHub === true && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <SiGithub className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  <span
                    className={cn(
                      'font-medium',
                      filters.hasGitHub === true
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-700 dark:text-slate-300'
                    )}
                  >
                    Avec GitHub
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  'text-sm px-2 py-1 rounded-full',
                  filters.hasGitHub === true
                    ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                )}
              >
                {members.filter((m) => m.github).length}
              </span>
            </button>
          </div>
        </div>

        {/* Filtres par compétences */}
        {availableSkills.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Compétences populaires
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSkills.slice(0, 10).map((skill) => {
                const membersWithSkill = members.filter((m) =>
                  m.skills?.includes(skill)
                ).length;
                const isSearched = filters.search
                  ?.toLowerCase()
                  .includes(skill.toLowerCase());

                return (
                  <button
                    key={skill}
                    onClick={() => updateFilters({ search: skill })}
                    className={cn(
                      'inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors',
                      isSearched
                        ? 'border-primary-200 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/10'
                    )}
                  >
                    <Code className="w-3 h-3" />
                    <span>{skill}</span>
                    <span
                      className={cn(
                        'text-xs px-1.5 py-0.5 rounded',
                        isSearched
                          ? 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-400'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                      )}
                    >
                      {membersWithSkill}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Statistiques */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <Users className="w-4 h-4" />
              <span>
                {resultCount} / {totalCount} membre{totalCount > 1 ? 's' : ''}
              </span>
            </div>
            {hasActiveFilters && (
              <div className="text-primary-600 dark:text-primary-400 font-medium">
                Filtres actifs
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
