'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { EventListType } from '@models/index';

import { CellAction } from '../components/EventTable/CellAction';

export const columns: ColumnDef<EventListType>[] = [
  {
    id: 'select',
    size: 50,
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
    header: '이벤트 id',
    size: 200
  },
  {
    accessorKey: 'title',
    header: '이벤트 제목',
    size: 250
  },
  {
    accessorKey: 'content_type',
    header: '이벤트 타입',
    size: 100
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
