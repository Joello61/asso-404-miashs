'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Mail,
  GraduationCap, 
  Calendar,
  Star,
  Code,
  ExternalLink,
  Badge as BadgeIcon
} from 'lucide-react';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { cn } from '@/lib/utils';
import { formatDate, getInitials, getPromoColor } from '@/lib/utils';
import type { Member } from '@/lib/types';

interface MemberCardProps {
  member: Member;
  variant?: 'default' | 'compact' | 'detailed' | 'mini';
  showActions?: boolean;
  showSkills?: boolean;
  showDescription?: boolean;
  showJoinDate?: boolean;
  className?: string;
  onClick?: (member: Member) => void;
}

export function MemberCard({
  member,
  variant = 'default',
  showActions = true,
  showSkills = true,
  showDescription = true,
  showJoinDate = false,
  className,
  onClick
}: MemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    firstName,
    lastName,
    promo,
    photo,
    linkedin,
    github,
    email,
    role,
    description,
    skills,
    joinDate
  } = member;

  const fullName = `${firstName} ${lastName}`;
  const initials = getInitials(firstName, lastName);
  const promoColor = getPromoColor(promo);

  // Configuration selon la variante
  const config = {
    default: {
      avatarSize: 'w-20 h-20',
      padding: 'p-6',
      titleSize: 'text-lg',
      spacing: 'space-y-4',
      skillsLimit: 3
    },
    compact: {
      avatarSize: 'w-16 h-16',
      padding: 'p-4',
      titleSize: 'text-base',
      spacing: 'space-y-3',
      skillsLimit: 2
    },
    detailed: {
      avatarSize: 'w-24 h-24',
      padding: 'p-8',
      titleSize: 'text-xl',
      spacing: 'space-y-6',
      skillsLimit: 5
    },
    mini: {
      avatarSize: 'w-12 h-12',
      padding: 'p-3',
      titleSize: 'text-sm',
      spacing: 'space-y-2',
      skillsLimit: 1
    }
  };

  const currentConfig = config[variant];

  // Rendu de l'avatar
  const renderAvatar = () => (
    <div className="relative flex-shrink-0">
      <div className={cn(
        'relative rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg transition-all duration-300',
        currentConfig.avatarSize,
        isHovered && 'scale-105 shadow-xl'
      )}>
        {photo && !imageError ? (
          <Image
            src={photo}
            alt={fullName}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 96px, 128px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <span className={cn(
              'font-bold text-white',
              variant === 'mini' ? 'text-xs' : 
              variant === 'compact' ? 'text-sm' : 
              variant === 'detailed' ? 'text-xl' : 'text-lg'
            )}>
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Badge de rôle */}
      {role && variant !== 'mini' && (
        <div className="absolute -bottom-2 -right-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full shadow-lg">
            <Star className="w-3 h-3" />
            {variant !== 'compact' && <span>Admin</span>}
          </div>
        </div>
      )}

      {/* Statut en ligne (simulation) */}
      {variant === 'detailed' && (
        <div className="absolute top-1 right-1">
          <div className="w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
        </div>
      )}
    </div>
  );

  // Rendu des actions sociales
  const renderSocialActions = () => {
    const actions = [];

    if (email) {
      actions.push(
        <button
          key="email"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `mailto:${email}`;
          }}
          className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
          title={`Envoyer un email à ${fullName}`}
        >
          <Mail className="w-4 h-4" />
        </button>
      );
    }

    if (linkedin) {
      actions.push(
        <button
          key="linkedin"
          onClick={(e) => {
            e.stopPropagation();
            window.open(linkedin, '_blank');
          }}
          className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
          title={`Profil LinkedIn de ${fullName}`}
        >
          <SiLinkedin className="w-4 h-4" />
        </button>
      );
    }

    if (github) {
      actions.push(
        <button
          key="github"
          onClick={(e) => {
            e.stopPropagation();
            window.open(github, '_blank');
          }}
          className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg transition-colors"
          title={`GitHub de ${fullName}`}
        >
          <SiGithub className="w-4 h-4" />
        </button>
      );
    }

    return actions;
  };

  // Rendu des compétences
  const renderSkills = () => {
    if (!showSkills || !skills || skills.length === 0) return null;

    const displayedSkills = skills.slice(0, currentConfig.skillsLimit);
    const remainingSkills = skills.length - currentConfig.skillsLimit;

    return (
      <div className="flex flex-wrap gap-1">
        {displayedSkills.map((skill, index) => (
          <span
            key={index}
            className={cn(
              'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
              variant === 'mini' && 'px-1 py-0.5 text-xs'
            )}
          >
            <Code className="w-3 h-3 mr-1" />
            {skill}
          </span>
        ))}
        {remainingSkills > 0 && (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            +{remainingSkills}
          </span>
        )}
      </div>
    );
  };

  // Version mini pour listes compactes
  if (variant === 'mini') {
    return (
      <div
        className={cn(
          'flex items-center space-x-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer',
          className
        )}
        onClick={() => onClick?.(member)}
      >
        {renderAvatar()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
              {fullName}
            </h4>
            <span className={cn('text-xs px-2 py-1 rounded-full font-medium', promoColor)}>
              {promo}
            </span>
          </div>
          {role && (
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {role}
            </p>
          )}
        </div>
        {renderSkills()}
      </div>
    );
  }

  // Layout horizontal pour variant compact
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'member-card group cursor-pointer',
          currentConfig.padding,
          className
        )}
        onClick={() => onClick?.(member)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start space-x-4">
          {renderAvatar()}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className={cn(
                  'font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
                  currentConfig.titleSize
                )}>
                  {fullName}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={cn('text-xs px-2 py-1 rounded-full font-medium', promoColor)}>
                    {promo}
                  </span>
                  {role && (
                    <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                      {role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {showDescription && description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                {description}
              </p>
            )}

            <div className="flex items-center justify-between">
              {renderSkills()}
              {showActions && renderSocialActions().length > 0 && (
                <div className="flex items-center space-x-1">
                  {renderSocialActions()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout vertical pour default et detailed
  return (
    <div
      className={cn(
        'member-card group cursor-pointer text-center',
        currentConfig.padding,
        currentConfig.spacing,
        className
      )}
      onClick={() => onClick?.(member)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar centré */}
      <div className="flex justify-center">
        {renderAvatar()}
      </div>

      {/* Informations principales */}
      <div className="space-y-2">
        <div>
          <h3 className={cn(
            'font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
            currentConfig.titleSize
          )}>
            {fullName}
          </h3>
          
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className={cn('text-sm px-3 py-1 rounded-full font-medium', promoColor)}>
              <GraduationCap className="w-4 h-4 inline mr-1" />
              {promo}
            </span>
            {role && (
              <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                {role}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {showDescription && description && (
          <p className={cn(
            'text-slate-600 dark:text-slate-400 leading-relaxed',
            variant === 'detailed' ? 'line-clamp-4' : 'line-clamp-3'
          )}>
            {description}
          </p>
        )}

        {/* Date d'adhésion */}
        {showJoinDate && joinDate && variant === 'detailed' && (
          <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Membre depuis {formatDate(new Date(joinDate), { month: 'long', year: 'numeric' })}</span>
          </div>
        )}
      </div>

      {/* Compétences */}
      {renderSkills()}

      {/* Actions sociales */}
      {showActions && renderSocialActions().length > 0 && (
        <div className="flex items-center justify-center space-x-2">
          {renderSocialActions()}
        </div>
      )}

      {/* Footer pour detailed */}
      {variant === 'detailed' && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <BadgeIcon className="w-4 h-4 mr-1" />
              <span>{skills?.length || 0} compétence{(skills?.length || 0) > 1 ? 's' : ''}</span>
            </div>
            {(linkedin || github || email) && (
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-1" />
                <span>
                  {[linkedin, github, email].filter(Boolean).length} lien{[linkedin, github, email].filter(Boolean).length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Composant skeleton pour le loading
export function MemberCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'detailed' | 'mini' }) {
  const config = {
    default: { avatarSize: 'w-20 h-20', padding: 'p-6' },
    compact: { avatarSize: 'w-16 h-16', padding: 'p-4' },
    detailed: { avatarSize: 'w-24 h-24', padding: 'p-8' },
    mini: { avatarSize: 'w-12 h-12', padding: 'p-3' }
  };

  const currentConfig = config[variant];

  if (variant === 'mini') {
    return (
      <div className="flex items-center space-x-3 p-3">
        <div className={cn('bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse', currentConfig.avatarSize)} />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700', currentConfig.padding)}>
        <div className="flex items-start space-x-4">
          <div className={cn('bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse', currentConfig.avatarSize)} />
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="flex space-x-1">
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center', currentConfig.padding)}>
      {/* Avatar skeleton */}
      <div className="flex justify-center mb-4">
        <div className={cn('bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse', currentConfig.avatarSize)} />
      </div>
      
      {/* Nom et promo skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto w-2/3" />
        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mx-auto" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto" />
      </div>
      
      {/* Compétences skeleton */}
      <div className="flex justify-center space-x-1 mb-4">
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
        <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
      </div>
      
      {/* Actions skeleton */}
      <div className="flex justify-center space-x-2">
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}