import React from 'react';
import Link from 'next/link';
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  SOCIAL_LINKS,
  CONTACT_INFO,
  NAVIGATION,
  ACTIVITIES,
} from '@/lib/constants';
import { SiLinkedin, SiGithub, SiDiscord, SiInstagram } from 'react-icons/si';
import { cn } from '@/lib/utils';
import Image from "next/image";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Grouper la navigation en sections
  const navigationSections = [
    {
      title: 'Navigation',
      links: NAVIGATION.slice(0, 4), // Première moitié
    },
    {
      title: 'Engagement',
      links: NAVIGATION.slice(4), // Deuxième moitié
    },
  ];

  const quickActivities = ACTIVITIES.filter(
    (activity) => activity.isActive
  ).slice(0, 3);

  return (
    <footer
      className={cn(
        'bg-neutral-50 dark:bg-neutral-900 border-t border-border',
        className
      )}
    >
      {/* Section principale */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* À propos */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br to-accent-500 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg overflow-hidden relative">
                  <Image
                    src="/images/logo/LOGO_ASSO.png"
                    alt="Logo 404"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">
                  Asso 404
                </div>
                <div className="text-sm text-muted-foreground">MIASHS</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Association étudiante de Mathématiques et Informatique Appliquées
              aux Sciences Humaines et Sociales. Nous rassemblons les étudiants
              autour de projets tech et d&apos;événements enrichissants.
            </p>

            {/* Liens sociaux */}
            <div className="flex items-center space-x-3">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent =
                  {
                    Linkedin: SiLinkedin,
                    Discord: SiDiscord,
                    Instagram: SiInstagram,
                    MessageCircle: MessageCircle,
                    Mail: Mail,
                  }[social.icon] || ExternalLink;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={cn(
                      'flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 transition-colors',
                      social.color
                    )}
                    aria-label={social.name}
                    target={
                      social.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      social.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    <IconComponent className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {CONTACT_INFO.email}
                </Link>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {CONTACT_INFO.phone}
                </Link>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground">
                  <div>{CONTACT_INFO.address.street}</div>
                  <div>
                    {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}
                  </div>
                  <div>{CONTACT_INFO.address.country}</div>
                </div>
              </div>
            </div>

            {/* Activités populaires */}
            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3 text-sm">
                Nos activités
              </h4>
              <div className="space-y-2">
                {quickActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                    <span>{activity.name}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/activities"
                className="inline-flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mt-2"
              >
                <span>Voir toutes les activités</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section bottom */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Asso 404 MIASHS. Tous droits réservés.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/mentions-legales"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

          {/* Badge made with love */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Fait avec ❤️ par les étudiants de{' '}
                <Link
                  href="/trombinoscope"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  l&apos;Asso 404 MIASHS
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Hook pour obtenir la hauteur du footer (utile pour le padding du contenu)
export function useFooterHeight() {
  return 'auto'; // Le footer a une hauteur dynamique
}
