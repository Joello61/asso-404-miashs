'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, Users, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Accueil',
      description: 'Retourner à la page principale',
      href: '/',
      icon: Home,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Trombinoscope',
      description: 'Découvrir nos membres',
      href: '/trombinoscope',
      icon: Users,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Événements',
      description: 'Voir les prochains événements',
      href: '/events',
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Actualités',
      description: 'Lire les dernières nouvelles',
      href: '/actualites',
      icon: BookOpen,
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container-custom py-16">
        <div className="text-center space-y-8">
          {/* Grande illustration 404 */}
          <div className="relative">
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-400 bg-clip-text animate-pulse-slow">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground/30 animate-bounce-subtle" />
            </div>
          </div>

          {/* Message principal */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Page introuvable
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Oups ! Il semblerait que cette page se soit perdue dans les méandres du code. 
              Peut-être qu&apos;elle fait une pause café avec nos développeurs ? ☕
            </p>
            <p className="text-sm text-muted-foreground">
              Erreur 404 : La page demandée n&apos;existe pas ou a été déplacée.
            </p>
          </div>

          {/* Boutons d'action principaux */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/trombinoscope">
                <Users className="w-4 h-4 mr-2" />
                Voir nos membres
              </Link>
            </Button>
          </div>

          {/* Liens rapides */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-foreground mb-8">
              Ou explorez ces sections populaires
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Card key={link.href} className="group hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <Link href={link.href} className="block space-y-4">
                        <div className="flex items-center justify-center">
                          <div className={cn(
                            'w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300',
                            link.color
                          )}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </div>
                        
                        <div className="text-center space-y-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Section aide */}
          <div className="mt-16 p-8 bg-muted/50 rounded-2xl border border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Besoin d&apos;aide ?
              </h3>
              <p className="text-muted-foreground">
                Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur ou si vous ne trouvez pas ce que vous cherchez, 
                n&apos;hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="ghost">
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/about">
                    En savoir plus sur nous
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Retour navigation */}
          <div className="pt-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la page précédente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Version simplifiée pour les erreurs internes
export function SimpleNotFound({ 
  title = "Page introuvable", 
  message = "La page que vous recherchez n'existe pas.",
  showBackButton = true 
}: {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}) {
  return (
    <div className="container-custom py-16 text-center">
      <div className="space-y-6">
        <div className="text-6xl font-bold text-muted-foreground">404</div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
        
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Accueil
            </Link>
          </Button>
          
          {showBackButton && (
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}