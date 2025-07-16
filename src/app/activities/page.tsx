import React from 'react';
import Image from 'next/image';
import {
  Code,
  Users,
  Lightbulb,
  Trophy,
  BookOpen,
  Coffee,
  Presentation,
  Building,
  Calendar,
  ArrowRight,
  Star,
  Target,
  Zap,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ActivitiesPage() {
  const categories = [
    {
      id: 'academic',
      name: 'Académique',
      description: 'Formation et développement des compétences',
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      count: 8,
    },
    {
      id: 'technical',
      name: 'Technique',
      description: 'Ateliers et projets de développement',
      icon: Code,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
      count: 12,
    },
    {
      id: 'social',
      name: 'Social',
      description: 'Événements de cohésion et networking',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      count: 6,
    },
    {
      id: 'professional',
      name: 'Professionnel',
      description: 'Préparation au monde du travail',
      icon: Building,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      count: 5,
    },
  ];

  const activities = [
    {
      category: 'technical',
      title: 'Ateliers de Programmation',
      description:
        'Sessions pratiques pour maîtriser les langages et frameworks modernes : Python, JavaScript, React, et bien plus.',
      icon: Code,
      image: '/images/activities/workshop-programming.jpg',
      frequency: 'Bi-mensuel',
      duration: '3h',
      level: 'Tous niveaux',
      highlights: ['Projets pratiques', 'Mentoring', 'Certificats'],
    },
    {
      category: 'academic',
      title: 'Hackathons Thématiques',
      description:
        'Compétitions de 24-48h pour développer des solutions innovantes sur des thèmes variés : IA, développement durable, santé.',
      icon: Trophy,
      image: '/images/activities/hackathon.jpg',
      frequency: 'Trimestriel',
      duration: '24-48h',
      level: 'Intermédiaire+',
      highlights: ['Prix et récompenses', 'Networking', 'Projets portfolio'],
    },
    {
      category: 'professional',
      title: 'Conférences & Tech Talks',
      description:
        'Interventions de professionnels du secteur tech pour découvrir les métiers, tendances et opportunités.',
      icon: Presentation,
      image: '/images/activities/conference.jpg',
      frequency: 'Mensuel',
      duration: '2h',
      level: 'Tous niveaux',
      highlights: ['Experts reconnus', 'Q&A interactives', 'Networking'],
    },
    {
      category: 'social',
      title: 'Soirées Networking',
      description:
        'Moments conviviaux pour créer du lien entre les membres, partager ses expériences et développer son réseau.',
      icon: Coffee,
      image: '/images/activities/networking.jpg',
      frequency: 'Mensuel',
      duration: '3h',
      level: 'Tous niveaux',
      highlights: [
        'Ambiance détendue',
        'Jeux et activités',
        'Nouveaux contacts',
      ],
    },
    {
      category: 'academic',
      title: 'Projets Collaboratifs',
      description:
        'Développement de projets open source en équipe pour acquérir une expérience professionnelle réelle.',
      icon: Lightbulb,
      image: '/images/activities/collaborative-projects.jpg',
      frequency: 'Continu',
      duration: 'Variable',
      level: 'Intermédiaire+',
      highlights: ['Expérience équipe', 'Portfolio', 'Méthodologies agiles'],
    },
    {
      category: 'professional',
      title: "Visites d'Entreprises",
      description:
        "Découverte des coulisses d'entreprises tech partenaires pour comprendre les enjeux et opportunités du secteur.",
      icon: Building,
      image: '/images/activities/company-visit.jpg',
      frequency: 'Trimestriel',
      duration: '1 jour',
      level: 'Tous niveaux',
      highlights: ['Rencontres pros', 'Opportunités stage', 'Vision métiers'],
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Développement de compétences',
      description:
        'Acquérez des compétences techniques et transversales valorisées par les employeurs.',
    },
    {
      icon: Users,
      title: 'Réseau professionnel',
      description:
        'Créez des liens durables avec vos pairs et des professionnels du secteur.',
    },
    {
      icon: Star,
      title: 'Expérience pratique',
      description:
        'Participez à des projets concrets qui enrichiront votre portfolio.',
    },
    {
      icon: Zap,
      title: 'Innovation & créativité',
      description:
        'Explorez de nouvelles technologies et développez votre créativité.',
    },
    {
      icon: Globe,
      title: "Ouverture d'esprit",
      description:
        'Découvrez différents domaines et élargissez vos horizons professionnels.',
    },
    {
      icon: Trophy,
      title: 'Reconnaissance',
      description:
        'Valorisez vos accomplissements et obtenez des certifications officielles.',
    },
  ];

  const testimonials = [
    {
      name: 'Marie Laurent',
      promo: 'L3',
      text: "Les ateliers de programmation m'ont permis de découvrir Python et de réaliser mon premier projet data science !",
      activity: 'Ateliers de Programmation',
    },
    {
      name: 'Lucas Blanc',
      promo: 'M1',
      text: "Le hackathon game dev était incroyable ! J'ai appris Unity en 48h et rencontré des développeurs passionnés.",
      activity: 'Hackathons',
    },
    {
      name: 'Clara Simon',
      promo: 'M1',
      text: "Grâce aux conférences UX, j'ai découvert ma passion pour le design et trouvé mon stage de fin d'études.",
      activity: 'Conférences',
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
              <Calendar className="w-4 h-4" />
              <span>Nos activités</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Explorez, Apprenez,{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
                Grandissez
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Découvrez toutes nos activités conçues pour enrichir votre
              parcours étudiant et vous préparer aux défis de demain. De la
              technique au networking, il y en a pour tous les goûts !
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="text-center">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2',
                        category.bg
                      )}
                    >
                      <Icon className={cn('w-6 h-6', category.color)} />
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {category.count} activités
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {category.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Nos Domaines d&apos;Activité
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Quatre grandes catégories pour couvrir tous les aspects de votre
                développement personnel et professionnel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                  >
                    <div
                      className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                        category.bg
                      )}
                    >
                      <Icon className={cn('w-8 h-8', category.color)} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center space-x-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                      <span>{category.count} activités</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Nos Activités Phares
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Découvrez en détail les activités qui font la richesse de notre
                association.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                const category = categories.find(
                  (c) => c.id === activity.category
                );

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={cn(
                            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                            category?.bg,
                            category?.color
                          )}
                        >
                          {category?.name}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center space-x-2 text-white">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{activity.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                        {activity.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {activity.frequency}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Fréquence
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {activity.duration}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Durée
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {activity.level}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Niveau
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {activity.highlights.map(
                          (highlight, highlightIndex) => (
                            <span
                              key={highlightIndex}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              {highlight}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Pourquoi Participer ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Les avantages concrets que vous retirerez de votre participation
                à nos activités.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Témoignages
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Ce que disent nos membres de leurs expériences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 italic leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.promo}
                      </div>
                    </div>
                    <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                      {testimonial.activity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Prêt à Rejoindre l&apos;Aventure ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Ne manquez plus aucune de nos activités ! Rejoignez notre
              communauté et participez aux événements qui vous intéressent.
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
                href="/events"
                className="inline-flex items-center px-8 py-3 bg-slate-100 text-slate-900 font-medium rounded-xl hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Voir les événements
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
