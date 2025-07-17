'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ContactForm, TeamMember } from '@/lib/types';
import { SiInstagram, SiLinkedin, SiDiscord } from 'react-icons/si';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import emailjs from '@emailjs/browser';
import { getInitials } from '@/lib/utils';

// Import des données JSON
import teamData from '@/data/team.json';


export default function ContactPage() {
  // Conversion des données JSON en format typé
  const team = teamData as TeamMember[];

  // State pour gérer les erreurs d'images
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (memberName: string) => {
    setImageErrors(prev => ({ ...prev, [memberName]: true }));
  };

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    promo: undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
      description: 'Pour toute question générale',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: CONTACT_INFO.phone,
      link: `tel:${CONTACT_INFO.phone}`,
      description: 'Du lundi au vendredi, 10h-18h',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: `${CONTACT_INFO.address.street}\n${CONTACT_INFO.address.zipCode} ${CONTACT_INFO.address.city}\n${CONTACT_INFO.address.country}`,
      link: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address.street + ' ' + CONTACT_INFO.address.zipCode + ' ' + CONTACT_INFO.address.city)}`,
      description: "Bureau de l'association",
    },
    {
      icon: Clock,
      title: 'Permanences',
      content: 'Mardi & Jeudi\n14h - 17h',
      description: "Rencontrez l'équipe en personne",
    },
  ];

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

  const socialLinks = SOCIAL_LINKS.map(social => {
    const colorMap = {
      'Instagram': 'text-pink-600 dark:text-pink-400',
      'Linkedin': 'text-blue-600 dark:text-blue-400',
      'Discord': 'text-indigo-600 dark:text-indigo-400',
      'MessageCircle': 'text-purple-600 dark:text-purple-400',
      'Mail': 'text-red-600 dark:text-red-400',
    };

    return {
      name: social.name,
      icon: getSocialIcon(social.icon), // Utilise l'icône définie dans constants.ts
      url: social.href,
      color: colorMap[social.name as keyof typeof colorMap] || 'text-slate-900 dark:text-slate-100',
    };
  });

  // Générer les contacts de l'équipe avec emails génériques
  const teamContacts = team.map(member => ({
    name: member.name,
    role: member.role,
    linkedin: member.linkedin,
    avatar: member.image,
    description: getDescriptionByRole(member.role),
  }));

  function getDescriptionByRole(role: string): string {
  const descriptions = {
    'Président': 'Questions générales et partenariats',
    'Trésorier': 'Questions financières et budget',
    'Secrétaire': 'Communication et adhésions',
    'Responsable Tech & Web': 'Site, outils numériques et support technique',
  };
  return descriptions[role as keyof typeof descriptions] || 'Contact général';
}


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configuration EmailJS - remplacez par vos propres clés
      const SERVICE_ID = 'service_z88e85k';
      const TEMPLATE_ID = 'template_1n21hg7';
      const PUBLIC_KEY = 'eiSkrS6jQlSi8c8GO';

      // Paramètres pour le template EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        promo: formData.promo || 'Non spécifiée',
        date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      };

      // Envoi via EmailJS vers votre adresse email
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('Message envoyé avec succès à l\'association');
      setSubmitStatus('success');
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        promo: undefined,
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
              <MessageCircle className="w-4 h-4" />
              <span>Contactez-nous</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Restons en{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
                Contact
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Une question, une suggestion, ou simplement envie d&apos;échanger
              ? Notre équipe de {team.length} membres est là pour vous accompagner. N&apos;hésitez pas à
              nous contacter !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {info.title}
                    </h3>
                    <div className="text-slate-600 dark:text-slate-400 mb-2 whitespace-pre-line">
                      {info.content}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                      {info.description}
                    </p>
                    {info.link && (
                      <a
                        href={info.link}
                        target={
                          info.link.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          info.link.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <span>Contacter</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="text-center mb-16">
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-6">
                Suivez-nous sur les réseaux sociaux
              </h3>
              <div className="flex items-center justify-center space-x-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
                        social.color
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Team Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Envoyez-nous un message
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-800 dark:text-green-200 font-medium">
                          Message envoyé avec succès !
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-sm">
                          Nous vous répondrons dans les plus brefs délais.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-800 dark:text-red-200 font-medium">
                          Erreur lors de l&apos;envoi
                        </p>
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          Veuillez réessayer ou nous contacter directement.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="votre.email@exemple.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >
                          Sujet *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="Objet de votre message"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="promo"
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >
                          Promotion (optionnel)
                        </label>
                        <select
                          id="promo"
                          name="promo"
                          value={formData.promo || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Sélectionnez votre promo</option>
                          <option value="L3">L3</option>
                          <option value="M1">M1</option>
                          <option value="M2">M2</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Team Contacts */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Contactez directement l&apos;équipe
                </h2>
                <div className="space-y-4">
                  {teamContacts.map((member, index) => {
                    const memberKey = `${member.name}-${index}`;
                    const hasImageError = imageErrors[memberKey];
                    const initials = getInitials(member.name.split(' ')[0] || '', member.name.split(' ')[1] || '');
                    
                    return (
                      <div
                        key={index}
                        className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            {!hasImageError ? (
                              <Image
                                src={member.avatar}
                                alt={member.name}
                                width={48}
                                height={48}
                                className="object-cover rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
                                onError={() => handleImageError(memberKey)}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm flex items-center justify-center">
                                <span className="text-sm font-bold text-white">
                                  {initials}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                              {member.name}
                            </h3>
                            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                              {member.role}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                              {member.description}
                            </p>
                            <a
                              href={member.linkedin}
                              className="inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              <SiLinkedin className="w-4 h-4 mr-2" />
                              {member.linkedin}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Trouvez rapidement les réponses aux questions les plus
                courantes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Comment devenir membre de l&apos;association ?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Tout le monde peut etre membre. Contacter nous juste pour plus d&apos;information
                  <a
                    href="/contact"
                    className="text-primary-600 dark:text-primary-400 hover:underline ml-1"
                  >
                    &quot;Nous Contacter&quot;
                  </a>
                  . L&apos;adhésion est gratuite pour tous les étudiants.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Puis-je participer aux événements sans être membre ?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Certains événements ouverts au public sont accessibles à tous.
                  Cependant, la plupart de nos activités sont réservées aux
                  membres pour garantir une meilleure qualité d&apos;échange et
                  de suivi.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Comment proposer un événement ou un atelier ?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Nous encourageons les initiatives de nos membres ! Contactez
                  notre bureau avec votre proposition détaillée. Nous étudierons
                  ensemble la faisabilité et vous accompagnerons dans
                  l&apos;organisation.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Y a-t-il des frais de participation aux évènements ?
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  La plupart de nos évènements sont gratuites pour les membres.
                  Seuls certains événements spéciaux (avec matériel fourni,
                  restauration, etc.) peuvent occasionner une participation
                  symbolique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Une autre question ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              N&apos;hésitez pas à nous contacter ! Notre équipe est là pour
              vous aider et répondre à toutes vos interrogations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Mail className="w-5 h-5 mr-2" />
                Envoyer un email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}