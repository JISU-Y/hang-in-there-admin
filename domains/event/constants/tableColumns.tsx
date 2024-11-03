'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { EventListType } from '@models/index';

import { CellAction } from '../components/EventTable/CellAction';

export const columns: ColumnDef<EventListType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'event_id',
    header: '이벤트 id'
  },
  {
    accessorKey: 'title',
    header: '이벤트 제목'
  },
  {
    accessorKey: 'content_type',
    header: '이벤트 타입'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

// event_id
// image
// title
// event_st
// event_ed
// content_type
// area_cd
// sigungu_cd
// category
// sub_category
// detail_sub_category
// reg_dt
// addr
// addr_detail
