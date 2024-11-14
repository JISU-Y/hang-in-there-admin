'use client';

import { DataTable } from '@domains/common/components/ui/table/data-table';
import { DataTableFilterBox } from '@domains/common/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@domains/common/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@domains/common/components/ui/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useBannerTableFilters
} from '../../hooks/useBannerTableFilters';
import { columns } from '../../constants/tableColumns';
import { useFetchBannerListQuery } from '@domains/banner/network/bannerQueries';
import { GetBannerListRequest } from '@models/index';

interface BannerTableProps {
  filters: GetBannerListRequest;
}

export default function BannerTable({ filters }: BannerTableProps) {
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
  console.log('🚀 ~ ProductTable ~ bannerList:', bannerList);

  return (
    <div className="space-y-4 ">
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
