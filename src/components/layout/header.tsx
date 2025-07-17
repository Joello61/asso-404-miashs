'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { NAVIGATION } from '@/lib/constants';
import Image from "next/image";

// Composant Button simplifié en tant que Client Component
function ClientButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
    ghost:
      'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Détecter le scroll pour l'effet de background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Fermer le menu au click sur Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo et nom */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden relative">
              <Image
                src="/images/logo/LOGO_ASSO.png"
                alt="Logo 404"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Asso 404
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 -mt-1">
                MIASHS
              </div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link px-3 py-2 rounded-lg transition-all duration-200',
                  isActivePage(item.href) &&
                    'nav-link-active bg-primary-50 dark:bg-primary-900/50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <ThemeToggle variant="simple" />
            <Link href="/join" className="btn btn-primary text-sm px-4 py-2">
              Rejoindre
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="flex lg:hidden items-center space-x-2">
            <ThemeToggle variant="simple" />
            <ClientButton
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <Menu
                className={cn(
                  'h-5 w-5 transition-transform duration-200',
                  isMenuOpen && 'rotate-90 opacity-0'
                )}
              />
              <X
                className={cn(
                  'h-5 w-5 absolute transition-transform duration-200',
                  !isMenuOpen && '-rotate-90 opacity-0'
                )}
              />
            </ClientButton>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 ease-out',
          isMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-4 invisible'
        )}
      >
        <nav className="container-custom py-4">
          <div className="space-y-1">
            {NAVIGATION.map((item, index) => (
              <div
                key={item.href}
                className={cn(
                  'transition-all duration-300 ease-out',
                  isMenuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4'
                )}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-colors',
                    'hover:bg-slate-100 dark:hover:bg-slate-800',
                    isActivePage(item.href) &&
                      'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.description && (
                    <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  )}
                </Link>
                {item.description && (
                  <p className="px-4 py-1 text-sm text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA mobile */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/join"
              className="btn btn-primary w-full text-center block"
            >
              Rejoindre l&apos;association
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

// Hook pour obtenir la hauteur du header (utile pour le padding du contenu)
export function useHeaderHeight() {
  return 64; // 16 * 4 = 64px (h-16)
}
