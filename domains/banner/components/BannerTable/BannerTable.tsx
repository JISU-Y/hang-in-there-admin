'use client';

import { DataTable } from '@domains/common/components/ui/table/data-table';
import { DataTableFilterBox } from '@domains/common/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@domains/common/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@domains/common/components/ui/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useBannerTableFilters
} from '../../hooks/useBannerTableFilters';
import { columns as baseColumns } from '../../constants/tableColumns';
import { useFetchBannerListQuery } from '@domains/banner/network/bannerQueries';
import { GetBannerListRequest } from '@models/index';
import { Switch } from '@domains/common/components/ui/switch';
import { useMemo } from 'react';
import { useUpdateBannerUsageMutation } from '@domains/banner/network/bannerMutations';
import { useQueryClient } from '@tanstack/react-query';
import { bannerQueryKeys } from '@domains/banner/constants/queryKeys';
import { CellAction } from './CellAction';

interface BannerTableProps {
  filters: GetBannerListRequest;
}

export default function BannerTable({ filters }: BannerTableProps) {
  const queryClient = useQueryClient();

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

  const columns = useMemo(() => {
    return [
      ...baseColumns,
      {
        accessorKey: 'use_yn',
        header: '사용 여부',
        size: 75,
        cell: ({ row }) => {
          return (
            <div className="align-middle">
              <Switch
                checked={row.getValue('use_yn') === 'Y'}
                onCheckedChange={async () => {
                  await updateBannerUsage({
                    bannerId: Number(row.getValue('banner_id')),
                    useYn: row.getValue('use_yn') === 'Y' ? 'N' : 'Y'
                  });

                  queryClient.invalidateQueries({
                    queryKey: bannerQueryKeys.all
                  });
                }}
              />
            </div>
          );
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
      }
    ];
  }, []);

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
      <DataTable
        columns={columns}
        data={bannerList?.data || []}
        totalItems={bannerList?.pagination.totalPage || 0}
      />
    </div>
  );
}
