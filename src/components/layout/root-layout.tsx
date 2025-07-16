import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

interface RootLayoutProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function RootLayout({
  children,
  className,
  hideHeader = false,
  hideFooter = false,
}: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}

      <main
        className={cn(
          'flex-1',
          !hideHeader && 'pt-16', // Compensation pour le header fixe
          className
        )}
      >
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

// Composant pour les pages avec hero section
export function HeroLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <RootLayout className={cn('pt-0', className)}>{children}</RootLayout>;
}

// Composant pour les pages avec padding standard
export function PageLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RootLayout>
      <div className={cn('container-custom section-padding', className)}>
        {children}
      </div>
    </RootLayout>
  );
}
