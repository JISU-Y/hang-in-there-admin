'use client';

import { DataTable } from '@domains/common/components/ui/table/data-table';
import { DataTableResetFilter } from '@domains/common/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@domains/common/components/ui/table/data-table-search';
import { columns } from '../../constants/tableColumns';
import { useEventTableFilters } from '../../hooks/useEventTableFilters';
import { useFetchEventListQuery } from '@domains/event/netwrok/eventQueries';
import { useState } from 'react';

interface EventTableProps {
  filters: {
    page: number;
    limit: number;
    search?: string;
  };
}

export default function EventTable({ filters }: EventTableProps) {
  const [columnResizing, setColumnResizing] = useState({});

  const { data: eventList } = useFetchEventListQuery({
    page: filters.page,
    size: filters.limit,
    title: filters.search
  });

  const {
    searchQuery,
    setSearchQuery,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = useEventTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <div className="relative">
        <DataTable
          columns={columns}
          data={eventList?.data || []}
          totalItems={eventList?.pagination.totalPage || 0}
          enableColumnResizing
          columnResizeMode="onChange"
          onColumnResizing={setColumnResizing}
          state={{ columnResizing }}
          className="w-fit min-w-full"
        />
      </div>
    </div>
  );
}
