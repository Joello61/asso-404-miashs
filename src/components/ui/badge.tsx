import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = 'primary', size = 'md', children, ...props },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center rounded-full border font-medium transition-colors';

    const variants = {
      primary: 'border-transparent bg-primary-600 text-white',
      secondary:
        'border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
      success:
        'border-transparent bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300',
      warning:
        'border-transparent bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300',
      error:
        'border-transparent bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-300',
      outline: 'text-foreground border-neutral-300 dark:border-neutral-700',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
