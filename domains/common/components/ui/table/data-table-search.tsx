'use client';

import { Input } from '@domains/common/components/ui/input';
import { cn } from '@logics/utils/utils';
import { Options } from 'nuqs';
import { useTransition } from 'react';

interface DataTableSearchProps<TSearchValue = string> {
  placeholder: string;
  searchQuery: TSearchValue | null;
  setSearchQuery: (
    value:
      | TSearchValue
      | ((old: TSearchValue | null) => TSearchValue | null)
      | null,
    options?: Options<unknown> | undefined
  ) => Promise<URLSearchParams>;
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options<unknown> | undefined
  ) => Promise<URLSearchParams>;
}

export function DataTableSearch<TSearchValue = string>({
  placeholder,
  searchQuery,
  setSearchQuery,
  setPage
}: DataTableSearchProps<TSearchValue>) {
  const [isLoading, startTransition] = useTransition();

  const handleSearch = (value: TSearchValue) => {
    setSearchQuery(value, { startTransition });
    setPage(1); // Reset page to 1 when search changes
  };

  return (
    <Input
      placeholder={placeholder}
      value={searchQuery as string}
      onChange={(e) => handleSearch(e.target.value as TSearchValue)}
      className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse')}
    />
  );
}
