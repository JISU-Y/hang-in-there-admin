'use client';

import { useCallback } from 'react';
import { useQueryState } from 'nuqs';

export function useEventTableFilters() {
  const [page, setPage] = useQueryState<number>('page', {
    defaultValue: 1,
    parse: (value: string | null) => (value ? Number(value) : 1)
  });
  const [searchQuery, setSearchQuery] = useQueryState('q', {
    defaultValue: null,
    parse: (value: string | null) => value,
    shallow: false
  });
  const [statusFilter, setStatusFilter] = useQueryState('status', {
    defaultValue: null,
    parse: (value: string | null) => {
      if (!value) return null;
      return value;
    },
    shallow: false
  });

  const resetFilters = useCallback(() => {
    setPage(1);
    setSearchQuery(null);
    setStatusFilter(null);
  }, [setPage, setSearchQuery, setStatusFilter]);

  const isAnyFilterActive = Boolean(searchQuery || statusFilter);

  return {
    page: Number(page),
    searchQuery,
    statusFilter,
    setPage,
    setSearchQuery,
    setStatusFilter,
    resetFilters,
    isAnyFilterActive
  };
}
