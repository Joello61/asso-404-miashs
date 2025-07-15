import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fallback?: string;
  showBorder?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, showBorder = false, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
      '2xl': 'w-24 h-24 text-xl'
    };

    const borderClass = showBorder ? 'ring-2 ring-white dark:ring-neutral-800 ring-offset-2' : '';

    // Génère les initiales à partir du alt si pas de fallback fourni
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = fallback || getInitials(alt);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-muted',
          sizeClasses[size],
          borderClass,
          className
        )}
        {...props}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="aspect-square h-full w-full object-cover"
            src={src}
            alt={alt}
            onError={(e) => {
              // Fallback si l'image ne charge pas
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : null}
        
        {/* Fallback avec initiales */}
        <div className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 font-medium text-white',
          src ? 'absolute inset-0 opacity-0' : 'opacity-100'
        )}>
          {initials}
        </div>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
export type { AvatarProps };