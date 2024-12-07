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
import {
  useUpdateBannerUsageMutation,
  useUpdateBannerOrderMutation
} from '@domains/banner/network/bannerMutations';
import { useQueryClient } from '@tanstack/react-query';
import { bannerQueryKeys } from '@domains/banner/constants/queryKeys';
import { BannerOrderManager } from './BannerOrderManager';
import { BannerType } from '@models/index';

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
  const { mutateAsync: updateBannerOrder } = useUpdateBannerOrderMutation();

  const handleUpdateBannerUsage = useCallback(
    async (params: { bannerId: number; useYn: 'Y' | 'N' }) => {
      await updateBannerUsage(params);
      queryClient.invalidateQueries({
        queryKey: bannerQueryKeys.all
      });
    },
    [queryClient, updateBannerUsage]
  );

  const handleUpdateBannerOrders = useCallback(
    async (updatedBanners: BannerType[]) => {
      const updatePromises = updatedBanners.map((banner, index) =>
        updateBannerOrder({
          bannerId: banner.banner_id,
          orderNum: index + 1
        })
      );

      await Promise.all(updatePromises);
      queryClient.invalidateQueries({
        queryKey: bannerQueryKeys.all
      });
    },
    [queryClient, updateBannerOrder]
  );

  const sortedData = useMemo(() => {
    if (!bannerList?.data) return [];
    return [...bannerList.data].sort((a, b) => {
      // use_yn이 'Y'인 항목을 상위로
      if (a.use_yn === 'Y' && b.use_yn !== 'Y') return -1;
      if (a.use_yn !== 'Y' && b.use_yn === 'Y') return 1;
      // use_yn이 같은 경우 order_number로 정렬
      return (a.order_number || 0) - (b.order_number || 0);
    });
  }, [bannerList?.data]);

  const activeBanners = useMemo(() => {
    return sortedData.filter((banner) => banner.use_yn === 'Y');
  }, [sortedData]);

  const columns = useMemo(
    () => createColumns({ onUpdateBannerUsage: handleUpdateBannerUsage }),
    [handleUpdateBannerUsage]
  );

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-4 text-lg font-semibold">활성 배너 순서 관리</h3>
        <BannerOrderManager
          banners={activeBanners}
          onOrderUpdate={handleUpdateBannerOrders}
        />
      </div>

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
            data={sortedData}
            totalItems={bannerList?.pagination.totalPage || 0}
            enableColumnResizing
            columnResizeMode="onChange"
            onColumnResizing={setColumnResizing}
            state={{ columnResizing }}
            className="w-fit min-w-full"
          />
        </div>
      </div>
    </div>
  );
}
