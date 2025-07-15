'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate, formatRelativeDate, truncateText } from '@/lib/utils';
import type { News } from '@/lib/types';

interface NewsCardProps {
  news: News;
  variant?: 'default' | 'featured' | 'compact';
  showImage?: boolean;
  showExcerpt?: boolean;
  showTags?: boolean;
  showAuthor?: boolean;
  className?: string;
}

export function NewsCard({
  news,
  variant = 'default',
  showImage = true,
  showExcerpt = true,
  showTags = true,
  showAuthor = true,
  className
}: NewsCardProps) {
  const {
    title,
    excerpt,
    author,
    publishedAt,
    image,
    tags,
    slug
  } = news;

  // Configuration selon la variante
  const config = {
    default: {
      imageHeight: 'h-48',
      titleSize: 'text-xl',
      excerptLines: 3,
      padding: 'p-6'
    },
    featured: {
      imageHeight: 'h-64',
      titleSize: 'text-2xl',
      excerptLines: 4,
      padding: 'p-8'
    },
    compact: {
      imageHeight: 'h-32',
      titleSize: 'text-lg',
      excerptLines: 2,
      padding: 'p-4'
    }
  };

  const currentConfig = config[variant];

  return (
    <article className={cn(
      'group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300',
      'hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-1',
      variant === 'featured' && 'ring-2 ring-primary-100 dark:ring-primary-900',
      className
    )}>
      <Link href={`/actualites/${slug}`} className="block">
        {/* Image */}
        {showImage && image && (
          <div className={cn('relative overflow-hidden', currentConfig.imageHeight)}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge statut (si brouillon) */}
            {news.status === 'draft' && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                  Brouillon
                </span>
              </div>
            )}
            
            {/* Tags overlay */}
            {showTags && tags.length > 0 && variant === 'featured' && (
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  {tags[0]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Contenu */}
        <div className={currentConfig.padding}>
          {/* Tags (version non-overlay) */}
          {showTags && tags.length > 0 && variant !== 'featured' && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Titre */}
          <h3 className={cn(
            'font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2',
            currentConfig.titleSize
          )}>
            {title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && excerpt && (
            <p className={cn(
              'text-slate-600 dark:text-slate-400 mb-4 leading-relaxed',
              `line-clamp-${currentConfig.excerptLines}`
            )}>
              {truncateText(excerpt, variant === 'compact' ? 80 : 120)}
            </p>
          )}

          {/* Métadonnées */}
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              {/* Auteur */}
              {showAuthor && author && (
                <div className="flex items-center space-x-2">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="font-medium">{author.name}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={publishedAt} title={formatDate(new Date(publishedAt))}>
                  {formatRelativeDate(new Date(publishedAt))}
                </time>
              </div>
            </div>

            {/* Lien "Lire plus" */}
            <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
              <span className="font-medium">Lire plus</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Composant skeleton pour le loading
export function NewsCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' }) {
  const config = {
    default: { height: 'h-48', padding: 'p-6' },
    featured: { height: 'h-64', padding: 'p-8' },
    compact: { height: 'h-32', padding: 'p-4' }
  };

  const currentConfig = config[variant];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Image skeleton */}
      <div className={cn('bg-slate-200 dark:bg-slate-700 animate-pulse', currentConfig.height)} />
      
      {/* Contenu skeleton */}
      <div className={currentConfig.padding}>
        {/* Tags skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
        </div>
        
        {/* Titre skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        
        {/* Métadonnées skeleton */}
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Variante compacte pour sidebar ou listes
export function NewsCardCompact({ news, className }: { news: News; className?: string }) {
  return (
    <Link
      href={`/actualites/${news.slug}`}
      className={cn(
        'group flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors',
        className
      )}
    >
      {/* Image miniature */}
      {news.image && (
        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      )}
      
      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
          {news.title}
        </h4>
        
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2">
          <span>{formatRelativeDate(new Date(news.publishedAt))}</span>
          {news.tags.length > 0 && (
            <>
              <span>•</span>
              <span>{news.tags[0]}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}