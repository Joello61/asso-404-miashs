import { useState } from 'react';

/**
 * Hook pour gérer le localStorage avec TypeScript
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture du localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour définir la valeur
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans le localStorage pour la clé "${key}":`, error);
    }
  };

  // Fonction pour supprimer la valeur
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression du localStorage pour la clé "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}

/**
 * Hook spécialisé pour les préférences utilisateur
 */
export function useUserPreferences() {
  const [preferences, setPreferences, clearPreferences] = useLocalStorage('user-preferences', {
    theme: 'system' as 'light' | 'dark' | 'system',
    memberGridView: 'grid' as 'grid' | 'list',
    membersPerPage: 12,
    showMemberDetails: true,
    notifications: {
      events: true,
      news: true,
      general: true
    }
  });

  return {
    preferences,
    setPreferences,
    clearPreferences,
    updateTheme: (theme: 'light' | 'dark' | 'system') =>
      setPreferences(prev => ({ ...prev, theme })),
    updateGridView: (view: 'grid' | 'list') =>
      setPreferences(prev => ({ ...prev, memberGridView: view })),
    updateMembersPerPage: (count: number) =>
      setPreferences(prev => ({ ...prev, membersPerPage: count })),
  };
}