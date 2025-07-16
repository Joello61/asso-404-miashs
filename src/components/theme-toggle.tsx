'use client';

import React, { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme, useIsClient } from './theme-provider';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'simple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({
  variant = 'button',
  size = 'md',
  showLabel = false,
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  // Éviter le flash pendant l'hydratation
  if (!isClient) {
    return (
      <Button
        variant="ghost"
        size={size}
        className={cn('w-10 h-10', className)}
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  // Toggle simple entre light/dark
  if (variant === 'simple') {
    const toggleTheme = () => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
      <Button
        variant="ghost"
        size={size}
        onClick={toggleTheme}
        className={cn('relative', className)}
        aria-label={`Passer en mode ${
          resolvedTheme === 'dark' ? 'clair' : 'sombre'
        }`}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        {showLabel && (
          <span className="ml-2">
            {resolvedTheme === 'dark' ? 'Clair' : 'Sombre'}
          </span>
        )}
      </Button>
    );
  }

  // Dropdown avec les 3 options
  if (variant === 'dropdown') {
    return (
      <div className="relative group">
        <Button
          variant="ghost"
          size={size}
          className={cn('relative', className)}
          aria-label="Changer le thème"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {showLabel && <span className="ml-2">Thème</span>}
        </Button>

        {/* Dropdown menu */}
        <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center',
              theme === 'light' &&
                'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
            )}
          >
            <Sun className="h-4 w-4 mr-3" />
            Clair
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center',
              theme === 'dark' &&
                'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
            )}
          >
            <Moon className="h-4 w-4 mr-3" />
            Sombre
          </button>
          <button
            onClick={() => setTheme('system')}
            className={cn(
              'w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center',
              theme === 'system' &&
                'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
            )}
          >
            <Monitor className="h-4 w-4 mr-3" />
            Système
          </button>
        </div>
      </div>
    );
  }

  // Bouton cycle entre les 3 options
  const cycleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('system');
        break;
      case 'system':
        setTheme('light');
        break;
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Clair';
      case 'dark':
        return 'Sombre';
      case 'system':
        return 'Système';
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={cycleTheme}
      className={cn('relative', className)}
      aria-label={`Thème actuel: ${getThemeLabel()}. Cliquer pour changer`}
      title={`Thème: ${getThemeLabel()}`}
    >
      <div className="relative flex items-center">
        {getThemeIcon()}
        {showLabel && <span className="ml-2">{getThemeLabel()}</span>}
      </div>
    </Button>
  );
}

// Composant pour afficher l'état actuel du thème (debug)
export function ThemeStatus() {
  const { theme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="fixed bottom-4 left-4 px-3 py-2 bg-card border border-border rounded-lg text-xs font-mono z-50 no-print">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
    </div>
  );
}

// Hook personnalisé pour des animations basées sur le thème
export function useThemeTransition() {
  const { resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return {
    isTransitioning,
    triggerTransition,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  };
}
