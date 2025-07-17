'use client';

import React, { useState } from 'react';
import {
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Code,
  Coffee,
  Trophy,
  BookOpen,
  Network,
  Send,
  AlertCircle,
  Plus,
  X,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JoinForm } from '@/lib/types';

// Import des données JSON
import membresData from '@/data/membres.json';
import activitiesData from '@/data/activities.json';
import eventsData from '@/data/events.json';

// Import des types
import type { Member, Event } from '@/lib/types';

// Interface Activity
interface Activity {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  category: 'academic' | 'social' | 'professional' | 'technical';
  isActive: boolean;
  schedule: string;
  location: string;
  participants: number;
  difficulty: string;
  technologies?: string[];
  nextSession?: string;
  speakers?: string[];
  duration?: string;
  prizes?: string[];
  nextEvent?: string;
  subjects?: string[];
  tutors?: string[];
  upcomingEvents?: string[];
  upcomingWorkshops?: Array<{
    title: string;
    date: string;
    instructor: string;
  }>;
  certification?: boolean;
}

export default function JoinPage() {
  // Conversion des données JSON en format typé
  const members = membresData as Member[];
  const activities = activitiesData as Activity[];
  const events = eventsData as Event[];

  const [formData, setFormData] = useState<JoinForm>({
    firstName: '',
    lastName: '',
    email: '',
    promo: 'L3',
    motivation: '',
    skills: [],
    linkedin: '',
    github: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const benefits = [
    {
      icon: Code,
      title: 'Ateliers Techniques',
      description:
        'Participez à des ateliers pratiques sur les dernières technologies et frameworks.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Users,
      title: "Réseau d'Entraide",
      description:
        'Rejoignez une communauté bienveillante prête à partager connaissances et conseils.',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Trophy,
      title: 'Projets & Concours',
      description:
        'Participez à des hackathons, challenges et projets collaboratifs stimulants.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: Network,
      title: 'Networking Pro',
      description:
        'Rencontrez des professionnels du secteur et découvrez des opportunités de carrière.',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Coffee,
      title: 'Événements Sociaux',
      description:
        'Participez à des soirées, sorties et moments conviviaux entre membres.',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: BookOpen,
      title: 'Ressources Exclusives',
      description:
        'Accédez à des cours, tutoriels et ressources pédagogiques de qualité.',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  const requirements = [
    "Être étudiant en MIASHS à l'Université Toulouse Jean Jaurès",
    "Adhérer aux valeurs de bienveillance et d'entraide de l'association",
    'Participer activement à la vie associative',
    'Respecter le règlement intérieur',
  ];

  const process = [
    {
      step: 1,
      title: 'Remplissez le formulaire',
      description:
        'Complétez le formulaire ci-dessous avec vos informations personnelles et votre motivation.',
    },
    {
      step: 2,
      title: 'Validation du bureau',
      description:
        'Notre équipe examine votre candidature et vous contacte sous 48h maximum.',
    },
    {
      step: 3,
      title: 'Bienvenue !',
      description:
        'Une fois accepté, vous recevez vos accès et pouvez participer à toutes nos activités.',
    },
  ];

  // Générer les compétences suggérées à partir des données réelles
  const suggestedSkills = Array.from(new Set(
    members.flatMap(member => member.skills || [])
  )).sort();

  // Obtenir les prochains événements
  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  // Statistiques dynamiques
  const stats = {
    members: members.length,
    activities: activities.filter(activity => activity.isActive).length,
    upcomingEvents: upcomingEvents.length,
  };

  // Fonction utilitaire pour s'assurer que skills est toujours un tableau
  const getSkills = () => {
    return Array.isArray(formData.skills) ? formData.skills : [];
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !getSkills().includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...getSkills(), skill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: getSkills().filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validation côté client
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim()
      ) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      if (formData.motivation.length < 50) {
        throw new Error('La motivation doit contenir au moins 50 caractères');
      }

      // Simulation d'envoi de formulaire
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Ici vous intégreriez votre API d'adhésion
      console.log("Formulaire d'adhésion envoyé:", {
        ...formData,
        skills: getSkills(), // S'assurer que skills est toujours un tableau
      });

      setSubmitStatus('success');
      // Réinitialiser le formulaire après succès
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        promo: 'L3',
        motivation: '',
        skills: [],
        linkedin: '',
        github: '',
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestion de l'ajout de compétence avec Enter
  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

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
              <span>Rejoignez-nous</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Devenez membre de{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
                l&apos;Asso 404
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Rejoignez une communauté de {stats.members} étudiants passionnés par la tech,
              les mathématiques et les sciences humaines. Ensemble, apprenons,
              créons et grandissons !
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Adhésion gratuite</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{stats.activities} activités disponibles</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Communauté bienveillante</span>
              </div>
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
                Pourquoi nous rejoindre ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Découvrez tous les avantages d&apos;être membre de notre
                association.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                        benefit.bg
                      )}
                    >
                      <Icon className={cn('w-6 h-6', benefit.color)} />
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

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Comment adhérer ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Un processus simple et rapide en 3 étapes.
              </p>
            </div>

            <div className="relative">
              {/* Line connecting steps */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-700 hidden lg:block" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {process.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 lg:p-12 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Formulaire d&apos;Adhésion
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Remplissez ce formulaire pour rejoindre notre communauté.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-green-800 dark:text-green-200 font-medium text-lg mb-2">
                      Candidature envoyée avec succès !
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      Nous avons bien reçu votre demande d&apos;adhésion. Notre
                      équipe l&apos;examine et vous contactera sous 48h pour
                      confirmer votre inscription.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-red-800 dark:text-red-200 font-medium text-lg mb-2">
                      Erreur lors de l&apos;envoi
                    </h3>
                    <p className="text-red-600 dark:text-red-400">
                      Une erreur s&apos;est produite. Veuillez réessayer ou nous
                      contacter directement.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Informations personnelles
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Email étudiant *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="prenom.nom@etu.univ-tlse2.fr"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="promo"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Promotion *
                      </label>
                      <select
                        id="promo"
                        name="promo"
                        required
                        value={formData.promo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        <option value="L3">L3 - Licence 3</option>
                        <option value="M1">M1 - Master 1</option>
                        <option value="M2">M2 - Master 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Compétences */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Compétences & Technologies
                  </h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Ajoutez vos compétences (optionnel)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleSkillKeyPress}
                        className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Ex: Python, React, Machine Learning..."
                      />
                      <button
                        type="button"
                        onClick={() => addSkill(newSkill)}
                        disabled={!newSkill.trim()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Suggestions de compétences basées sur les données des membres */}
                  <div className="mb-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Ou choisissez parmi les compétences de nos membres :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.slice(0, 20).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          disabled={getSkills().includes(skill)}
                          className={cn(
                            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                            getSkills().includes(skill)
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
                              : 'bg-slate-100 text-slate-700 hover:bg-primary-100 hover:text-primary-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-primary-900 dark:hover:text-primary-300'
                          )}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compétences sélectionnées */}
                  {getSkills().length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Vos compétences ({getSkills().length}) :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {getSkills().map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-100 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Réseaux sociaux */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Network className="w-5 h-5 mr-2" />
                    Réseaux professionnels
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        LinkedIn (optionnel)
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="https://linkedin.com/in/votre-profil"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="github"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        GitHub (optionnel)
                      </label>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="https://github.com/votre-username"
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Motivation
                  </h3>

                  <div>
                    <label
                      htmlFor="motivation"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Pourquoi souhaitez-vous rejoindre l&apos;association ? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      required
                      rows={6}
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      placeholder="Parlez-nous de vos motivations, de vos attentes, de ce que vous aimeriez apporter à la communauté..."
                    />
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Minimum 50 caractères ({formData.motivation.length}/50).
                      Soyez authentique et partagez vos vraies motivations !
                    </p>
                  </div>
                </div>

                {/* Conditions */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
                    Conditions d&apos;adhésion
                  </h3>

                  <div className="space-y-3 mb-6">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {requirement}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Engagement bénévole
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          En tant qu&apos;association étudiante, toutes nos
                          activités sont bénévoles. Votre participation active
                          et votre bonne humeur sont nos seules attentes !
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    En soumettant ce formulaire, vous acceptez nos conditions
                    d&apos;adhésion.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || formData.motivation.length < 50}
                    className={cn(
                      'inline-flex items-center px-8 py-3 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                      isSubmitting || formData.motivation.length < 50
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer ma candidature
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    Prochaines échéances
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <li key={event.id}>
                        • {event.title} - {new Date(event.startDate).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </li>
                    ))
                  ) : (
                    <>
                      <li>• Assemblée Générale - 15 mai 2024</li>
                      <li>• Nouveaux événements bientôt annoncés</li>
                      <li>• Activités régulières selon planning</li>
                    </>
                  )}
                  <li>• Activités permanentes : {stats.activities} disponibles</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    Questions fréquentes
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      L&apos;adhésion est-elle vraiment gratuite ?
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Oui, totalement ! Seuls certains événements spéciaux
                      peuvent avoir un coût symbolique.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      Puis-je adhérer en cours d&apos;année ?
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Absolument ! Les adhésions sont ouvertes toute
                      l&apos;année.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      Combien de membres êtes-vous ?
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Nous sommes actuellement {stats.members} membres actifs avec {stats.activities} activités disponibles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Encore des questions ? Notre équipe est là pour vous aider !
              </p>

              <a
                href="/contact"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                Nous contacter
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}