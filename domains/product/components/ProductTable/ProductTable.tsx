'use client';

import { DataTable } from '@domains/common/components/ui/table/data-table';
import { DataTableFilterBox } from '@domains/common/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@domains/common/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@domains/common/components/ui/table/data-table-search';
import { Product } from '@domains/common/constants/data';
import {
  CATEGORY_OPTIONS,
  useProductTableFilters
} from '../../hooks/useProductTableFilters';
import { columns } from '../../constants/tableColumns';

export default function ProductTable({
  data,
  totalData
}: {
  data: Product[];
  totalData: number;
}) {
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useProductTableFilters();

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
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
