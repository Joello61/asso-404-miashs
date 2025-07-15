'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log l'erreur pour le monitoring
    console.error('Application Error:', error);
    
    // Ici vous pouvez intégrer un service de monitoring comme Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Icône d'erreur */}
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-error-100 dark:bg-error-900/50 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-error-600 dark:text-error-400" />
            </div>
          </div>

          {/* Message principal */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Oups ! Une erreur s&apos;est produite
            </h1>
            <p className="text-lg text-muted-foreground">
              Quelque chose s&apos;est mal passé. Nos développeurs ont été notifiés et travaillent sur le problème.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={reset} size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Link>
            </Button>
          </div>

          {/* Détails de l'erreur en développement */}
          {isDevelopment && (
            <Card className="mt-8 text-left">
              <CardHeader>
                <CardTitle className="flex items-center text-error-600 dark:text-error-400">
                  <Bug className="w-5 h-5 mr-2" />
                  Détails de l&apos;erreur (mode développement)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Message:</h4>
                  <p className="text-sm font-mono bg-muted p-3 rounded border text-error-600 dark:text-error-400">
                    {error.message}
                  </p>
                </div>
                
                {error.digest && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Digest:</h4>
                    <p className="text-sm font-mono bg-muted p-3 rounded border">
                      {error.digest}
                    </p>
                  </div>
                )}
                
                {error.stack && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Stack Trace:</h4>
                    <pre className="text-xs font-mono bg-muted p-3 rounded border overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Informations supplémentaires */}
          <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Que faire maintenant ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Pour les utilisateurs :</h4>
                  <ul className="space-y-1 text-left">
                    <li>• Actualisez la page en cliquant sur &quot;Réessayer&quot;</li>
                    <li>• Vérifiez votre connexion internet</li>
                    <li>• Essayez de nouveau dans quelques minutes</li>
                    <li>• Contactez-nous si le problème persiste</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Pour signaler le bug :</h4>
                  <ul className="space-y-1 text-left">
                    <li>• Notez l&apos;heure de l&apos;erreur</li>
                    <li>• Décrivez les actions effectuées</li>
                    <li>• Mentionnez votre navigateur</li>
                    <li>• Envoyez-nous un rapport</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-center pt-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/contact">
                    Signaler ce problème
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook pour capturer les erreurs de façon globale
export function useErrorHandler() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: Error, errorInfo?: any) => {
    console.error('Error caught by error handler:', error, errorInfo);
    
    // Intégration avec service de monitoring
    if (typeof window !== 'undefined') {
      // Exemple avec Sentry (optionnel)
      // if (window.Sentry) {
      //   window.Sentry.captureException(error, {
      //     extra: errorInfo,
      //     tags: {
      //       component: 'ErrorBoundary'
      //     }
      //   });
      // }
      
      // Analytics personnalisées
      // if (window.gtag) {
      //   window.gtag('event', 'exception', {
      //     description: error.toString(),
      //     fatal: false,
      //   });
      // }
    }
  };

  return { handleError };
}