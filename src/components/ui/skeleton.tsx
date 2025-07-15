import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number; // Pour variant="text"
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, lines = 1, ...props }, ref) => {
    const baseClasses = 'skeleton rounded';
    
    const variantClasses = {
      text: 'h-4 w-full',
      circular: 'rounded-full',
      rectangular: 'rounded'
    };

    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;

    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                baseClasses,
                variantClasses[variant],
                i === lines - 1 && 'w-3/4' // Dernière ligne plus courte
              )}
              style={style}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Composants pré-configurés pour des cas d'usage communs
const SkeletonAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  return <Skeleton variant="circular" className={sizeClasses[size]} />;
};

const SkeletonCard = () => (
  <div className="space-y-4 p-6">
    <div className="flex items-center space-x-4">
      <SkeletonAvatar />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
  </div>
);

const SkeletonMemberCard = () => (
  <div className="text-center space-y-4 p-6">
    <div className="flex justify-center">
      <SkeletonAvatar size="xl" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-5 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
    <div className="flex justify-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

export { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonMemberCard };
export type { SkeletonProps };