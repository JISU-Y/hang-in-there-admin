'use client';

import { DataTable } from '@domains/common/components/ui/table/data-table';
import { DataTableResetFilter } from '@domains/common/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@domains/common/components/ui/table/data-table-search';
import { columns } from '../../constants/tableColumns';
import { useMemberTableFilters } from '../../hooks/useMemberTableFilters';
import { useFetchMemberListQuery } from '@domains/member/netwrok/memberQueries';

interface MemberTableProps {
  filters: {
    page: number;
    limit: number;
    search?: string;
  };
}

export default function MemberTable({ filters }: MemberTableProps) {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useMemberTableFilters();

  const { data: memberList } = useFetchMemberListQuery({
    page: filters.page,
    size: filters.limit
  });

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          placeholder="회원 이름 검색..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={memberList?.data || []}
        totalItems={memberList?.pagination.totalPage || 0}
      />
    </div>
  );
}
