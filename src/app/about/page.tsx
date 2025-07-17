'use client';

import React from 'react';
import Image from 'next/image';
import {
  Users,
  Target,
  Heart,
  Award,
  Code,
  Lightbulb,
  Calendar,
  BookOpen,
  Coffee,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import des données JSON
import teamData from '@/data/team.json';
import membresData from '@/data/membres.json';
import eventsData from '@/data/events.json';
import activitiesData from '@/data/activities.json';

// Import des types
import type { Member, Event, Activity, TeamMember } from '@/lib/types';
import { getInitials } from '@/lib/utils';


export default function AboutPage() {
  // Conversion des données JSON en format typé
  const team = teamData as TeamMember[];
  const allMembers = membresData as Member[];
  const events = eventsData as Event[];
  const activities = activitiesData as Activity[];

  // State pour gérer les erreurs d'images
  const [imageErrors, setImageErrors] = React.useState<{[key: string]: boolean}>({});

  const handleImageError = (memberName: string) => {
    setImageErrors(prev => ({ ...prev, [memberName]: true }));
  };

  // Calcul des statistiques dynamiques basées sur les données réelles
  const stats = [
    { 
      label: 'Membres actifs', 
      value: `${allMembers.length}`, 
      icon: Users 
    },
    { 
      label: 'Événements organisés', 
      value: `${events.length}`, 
      icon: Calendar 
    },
    { 
      label: 'Activités proposées', 
      value: `${activities.filter(activity => activity.isActive).length}`, 
      icon: Code 
    },
    { 
      label: 'Membres du bureau', 
      value: `${team.length}`, 
      icon: Award 
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Communauté',
      description:
        "Créer un environnement inclusif où chaque membre peut s'épanouir et partager ses connaissances.",
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Target,
      title: 'Excellence',
      description:
        "Encourager l'excellence académique et professionnelle à travers l'entraide et l'apprentissage continu.",
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        "Promouvoir la créativité et l'innovation dans tous nos projets et initiatives.",
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: Heart,
      title: 'Solidarité',
      description:
        "Cultiver l'esprit d'entraide et de soutien mutuel entre tous les membres.",
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>À propos de nous</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              L&apos;Association{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
                404 MIASHS
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Nous sommes une communauté dynamique d&apos;étudiants passionnés
              par les mathématiques, l&apos;informatique et les sciences
              humaines. Notre mission : créer des ponts entre les disciplines et
              préparer l&apos;avenir numérique.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Calendar className="w-5 h-5" />
                <span>Créée en 2024</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Users className="w-5 h-5" />
                <span>{allMembers.length} membres</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <BookOpen className="w-5 h-5" />
                <span>Université de Toulouse Jean Jaurès</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Notre Mission
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    L&apos;Association 404 MIASHS a été créée avec une vision
                    claire : rassembler les étudiants de MIASHS dans un
                    environnement stimulant qui favorise l&apos;apprentissage,
                    l&apos;innovation et l&apos;entraide.
                  </p>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Nous organisons des événements, des ateliers et des projets
                    collaboratifs qui permettent à nos membres de développer
                    leurs compétences techniques et humaines tout en créant des
                    liens durables.
                  </p>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mt-1">
                      <Rocket className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-slate-100">
                        Notre objectif :
                      </strong>{' '}
                      Préparer nos membres aux défis du monde professionnel en
                      leur offrant une expérience riche et diversifiée.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/membres/asso_1.jpg"
                    alt="Équipe de l'association en action"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Nos Valeurs
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Les principes qui guident notre action et définissent
                l&apos;esprit de notre communauté.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-6',
                        value.bg
                      )}
                    >
                      <Icon className={cn('w-6 h-6', value.color)} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                L&apos;Association en Chiffres
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Découvrez l&apos;impact de notre communauté depuis sa création.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Notre Bureau
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                L&apos;équipe dirigeante qui porte la vision de
                l&apos;association.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => {
                const memberKey = `${member.name}-${index}`;
                const hasImageError = imageErrors[memberKey];
                const initials = getInitials(member.name.split(' ')[0] || '', member.name.split(' ')[1] || '');
                
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      {!hasImageError ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-md"
                          sizes="80px"
                          onError={() => handleImageError(memberKey)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center">
                          <span className="text-lg font-bold text-white">
                            {initials}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {member.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {member.role}
                      </span>
                      <span
                        className={cn(
                          'text-xs px-2 py-1 rounded-full font-medium',
                          member.promo === 'M2' &&
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
                          member.promo === 'M1' &&
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                          member.promo === 'L3' &&
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        )}
                      >
                        {member.promo}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Rejoignez l&apos;Aventure
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Vous êtes étudiant en MIASHS et vous souhaitez faire partie
              d&apos;une communauté dynamique ? N&apos;hésitez plus,
              rejoignez-nous !
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/join"
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Users className="w-5 h-5 mr-2" />
                Devenir membre
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-slate-100 text-slate-900 font-medium rounded-xl hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}