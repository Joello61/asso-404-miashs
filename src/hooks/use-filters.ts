import { useState, useMemo } from 'react';
import { useDebounce } from './use-debounce';
import type { Member, MemberFilters, PromoType } from '@/lib/types';
import { filterMembers, sortMembers } from '@/lib/utils';

/**
 * Hook pour gérer les filtres de membres
 */
export function useMemberFilters(members: Member[]) {
  const [filters, setFilters] = useState<MemberFilters>({
    promo: [],
    search: '',
    hasLinkedIn: undefined,
    hasGitHub: undefined,
  });

  // Debounce de la recherche pour éviter trop d'appels
  const debouncedSearch = useDebounce(filters.search || '', 300);

  // Filtres avec search debounced
  const debouncedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch]
  );

  // Membres filtrés et triés
  const filteredMembers = useMemo(() => {
    const filtered = filterMembers(members, debouncedFilters);
    return sortMembers(filtered);
  }, [members, debouncedFilters]);

  // Fonctions de mise à jour des filtres
  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const updatePromo = (promo: PromoType[]) => {
    setFilters((prev) => ({ ...prev, promo }));
  };

  const togglePromo = (promo: PromoType) => {
    setFilters((prev) => ({
      ...prev,
      promo: prev.promo?.includes(promo)
        ? prev.promo.filter((p) => p !== promo)
        : [...(prev.promo || []), promo],
    }));
  };

  const updateSocialFilters = (hasLinkedIn?: boolean, hasGitHub?: boolean) => {
    setFilters((prev) => ({ ...prev, hasLinkedIn, hasGitHub }));
  };

  const clearFilters = () => {
    setFilters({
      promo: [],
      search: '',
      hasLinkedIn: undefined,
      hasGitHub: undefined,
    });
  };

  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.promo?.length ||
      filters.search ||
      filters.hasLinkedIn !== undefined ||
      filters.hasGitHub !== undefined
    );
  }, [filters]);

  return {
    filters,
    filteredMembers,
    updateSearch,
    updatePromo,
    togglePromo,
    updateSocialFilters,
    clearFilters,
    hasActiveFilters,
    resultCount: filteredMembers.length,
    totalCount: members.length,
  };
}
