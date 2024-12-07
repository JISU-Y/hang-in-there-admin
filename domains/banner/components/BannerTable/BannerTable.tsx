'use client';

import { DataTable } from '@domains/common/components/ui/table/data-table';
import { DataTableFilterBox } from '@domains/common/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@domains/common/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@domains/common/components/ui/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useBannerTableFilters
} from '../../hooks/useBannerTableFilters';
import { createColumns } from '../../constants/tableColumns';
import { useFetchBannerListQuery } from '@domains/banner/network/bannerQueries';
import { GetBannerListRequest } from '@models/index';
import { useCallback, useMemo, useState } from 'react';
import { useUpdateBannerUsageMutation } from '@domains/banner/network/bannerMutations';
import { useQueryClient } from '@tanstack/react-query';
import { bannerQueryKeys } from '@domains/banner/constants/queryKeys';

interface BannerTableProps {
  filters: GetBannerListRequest;
}

export default function BannerTable({ filters }: BannerTableProps) {
  const queryClient = useQueryClient();
  const [columnResizing, setColumnResizing] = useState({});

  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useBannerTableFilters();

  const { data: bannerList } = useFetchBannerListQuery(filters);
  const { mutateAsync: updateBannerUsage } = useUpdateBannerUsageMutation();

  const handleUpdateBannerUsage = useCallback(
    async (params: { bannerId: number; useYn: 'Y' | 'N' }) => {
      await updateBannerUsage(params);
      queryClient.invalidateQueries({
        queryKey: bannerQueryKeys.all
      });
    },
    [queryClient, updateBannerUsage]
  );

  const columns = useMemo(
    () => createColumns({ onUpdateBannerUsage: handleUpdateBannerUsage }),
    [handleUpdateBannerUsage]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="categories"
          title="Categories"
          options={CATEGORY_OPTIONS}
          setFilterValue={setCategoriesFilter}
          filterValue={categoriesFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <div className="relative">
        <DataTable
          columns={columns}
          data={bannerList?.data || []}
          totalItems={bannerList?.pagination.totalPage || 0}
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
