import { useState, useMemo } from 'react';

/**
 * Hook pour gérer la pagination
 */
export function usePagination<T>(
  items: T[],
  itemsPerPage: number = 12
) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculs de pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Éléments de la page actuelle
  const currentItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  // Fonction pour changer de page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fonction pour aller à la page suivante
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fonction pour aller à la page précédente
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset à la première page quand les items changent
  useMemo(() => {
    setCurrentPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return {
    currentItems,
    currentPage,
    totalPages,
    totalItems: items.length,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    goToPage,
    nextPage,
    previousPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages
  };
}