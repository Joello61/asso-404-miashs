/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import React from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    // Log l'erreur critique
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="space-y-6">
              {/* Icône d'erreur critique */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Erreur critique
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Une erreur inattendue s&apos;est produite. L&apos;application
                  doit être rechargée.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={reset}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recharger l&apos;application
                </button>

                <a
                  href="/"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l&apos;accueil
                </a>
              </div>

              {/* Code d'erreur */}
              {error.digest && (
                <div className="text-xs text-neutral-500 dark:text-neutral-600 font-mono">
                  Code: {error.digest}
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
