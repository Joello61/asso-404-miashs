'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
  onClear?: () => void;
  showClearButton?: boolean;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, active = false, count, onClear, showClearButton = true, children, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <Button
          ref={ref}
          variant={active ? 'primary' : 'outline'}
          className={cn(
            'relative',
            active && 'pr-8',
            className
          )}
          {...props}
        >
          <Filter className="h-4 w-4 mr-2" />
          {children}
          {typeof count === 'number' && count > 0 && (
            <Badge variant="secondary" size="sm" className="ml-2">
              {count}
            </Badge>
          )}
        </Button>
        
        {active && showClearButton && onClear && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full bg-error-500 hover:bg-error-600 text-white"
            onClick={onClear}
            type="button"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
);

FilterButton.displayName = 'FilterButton';

export { FilterButton };
export type { FilterButtonProps };