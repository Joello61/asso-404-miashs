import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Users, 
  Calendar,
  MessageCircle,
  Mail,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';
import {SiLinkedin, SiInstagram, SiDiscord } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SOCIAL_LINKS } from '@/lib/constants';

// Import des données JSON
import eventsData from '@/data/events.json';
import membresData from '@/data/membres.json';

// Import des types
import type { Member, Event } from '@/lib/types';

const getSocialIcon = (iconName: string) => {
  const icons = {
    'Linkedin': SiLinkedin,
    'MessageCircle': MessageCircle,
    'Mail': Mail,
    'Instagram': SiInstagram,
    'Discord': SiDiscord,
  };
  return icons[iconName as keyof typeof icons] || Mail;
};

export default function HomePage() {
  // Conversion des données JSON en format typé
  const events = eventsData as Event[];
  const members = membresData as Member[];

  // Obtenir les événements à venir (3 premiers)
  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  // Statistiques dynamiques
  const stats = {
    members: members.length,
    events: events.filter(event => event.status === 'upcoming').length,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Arrière-plan subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 dark:from-slate-900 dark:to-slate-800" />
        
        {/* Motif géométrique subtil */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary-200 rounded-lg rotate-12" />
          <div className="absolute top-40 right-20 w-24 h-24 border border-accent-200 rounded-full" />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-primary-200 rounded-lg -rotate-6" />
          <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-accent-200 rounded-full" />
        </div>

        <div className="relative container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge d'introduction */}
            <div className="inline-flex items-center space-x-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
              <GraduationCap className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Association Étudiante • Université Toulouse Jean Jaurès
              </span>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              Association{' '}
              <span className="text-gradient">404</span>
              <br />
              <span className="text-2xl lg:text-4xl font-medium text-slate-600 dark:text-slate-400">
                MIASHS
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              L&apos;association étudiante qui réunit{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales
              </span>
              . Ensemble, nous explorons l&apos;intersection fascinante entre technologie et humanités.
            </p>

            {/* Statistiques dynamiques */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stats.members}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Membres actifs</div>
              </div>
              <div className="text-center col-span-2 lg:col-span-1">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.events}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Événements à venir</div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/about">
                  En savoir plus
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Événements à la une */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Événements <span className="text-gradient">à la une</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ne manquez pas nos prochains événements marquants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Card key={event.id} hover className={index === 0 ? "md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800" : "group"}>
                  <CardContent className={index === 0 ? "p-8" : "p-6"}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {new Date(event.startDate).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </div>
                      <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className={`${index === 0 ? 'text-xl' : 'text-lg'} font-bold text-slate-900 dark:text-slate-100 mb-3 ${index > 0 ? 'group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors' : ''}`}>
                      {event.title}
                    </h3>
                    <p className={`text-slate-600 dark:text-slate-400 mb-4 leading-relaxed ${index === 0 ? 'text-base' : 'text-sm'}`}>
                      {event.description}
                    </p>
                    <div className={`flex items-center ${index === 0 ? 'text-sm' : 'text-xs'} text-slate-500 dark:text-slate-400 mb-4`}>
                      <Calendar className={`${index === 0 ? 'w-4 h-4' : 'w-3 h-3'} mr-2`} />
                      <span>{new Date(event.startDate).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <Link
                      href='/contact'
                      className={`text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:text-primary-700 dark:hover:text-primary-300 ${index === 0 ? 'text-base' : 'text-sm'}`}
                    >
                      {event.registrationRequired ? "Nous contacter" : "En savoir plus"}
                      <ArrowRight className={`${index === 0 ? 'w-4 h-4' : 'w-3 h-3'} ml-1`} />
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Événements par défaut si aucun événement à venir
              <>
                <Card hover className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Bientôt
                      </div>
                      <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                      Nouveaux événements à venir
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Restez connectés pour découvrir nos prochains événements passionnants.
                    </p>
                    <Link
                      href="/events"
                      className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Voir tous les événements
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/events">
                Voir tous les événements
                <Calendar className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Explorez notre <span className="text-gradient">Communauté</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Découvrez tout ce que notre association a à offrir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Trombinoscope */}
            <Card hover className="group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      Trombinoscope
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      Rencontrez nos {members.length} membres et découvrez leurs parcours
                    </p>
                    <Link href="/trombinoscope" className="text-primary-600 dark:text-primary-400 text-sm font-medium inline-flex items-center hover:text-primary-700 dark:hover:text-primary-300">
                      Voir les membres
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Événements */}
            <Card hover className="group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      Événements
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {stats.events} événements à venir et {events.length} événements au total
                    </p>
                    <Link href="/events" className="text-primary-600 dark:text-primary-400 text-sm font-medium inline-flex items-center hover:text-primary-700 dark:hover:text-primary-300">
                      Voir l&apos;agenda
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-action final */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Rejoignez une communauté d&apos;exception
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Que vous soyez passionné de mathématiques, d&apos;informatique ou de sciences humaines, 
              notre association vous offre l&apos;opportunité de grandir et d&apos;apprendre ensemble.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">
                  Nous contacter
                  <Mail className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Liens sociaux */}
            <div className="flex items-center justify-center space-x-6">
              <span className="text-primary-200 text-sm">Suivez-nous :</span>
              {SOCIAL_LINKS.map((social) => {
                const Icon = getSocialIcon(social.icon);
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    title={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}