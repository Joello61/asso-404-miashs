'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
  loading?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, showClearButton = true, loading = false, ...props }, ref) => {
    const hasValue = Boolean(value && String(value).length > 0);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          className={cn('pr-20', className)}
          value={value}
          leftIcon={
            loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-neutral-300 border-t-primary-600" />
            ) : (
              <Search className="h-4 w-4" />
            )
          }
          rightIcon={
            hasValue && showClearButton && onClear ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                onClick={onClear}
                type="button"
              >
                <X className="h-3 w-3" />
              </Button>
            ) : null
          }
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
export type { SearchInputProps };