'use client';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '../components/MemberTable/CellAction';
import { format } from 'date-fns';

export const columns: ColumnDef<any>[] = [
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
    accessorKey: 'name',
    header: '이름'
  },
  {
    accessorKey: 'id',
    header: '로그인 아이디'
  },
  {
    accessorKey: 'join_dt',
    header: '가입 날짜',
    cell: ({ row }) => format(new Date(row.original.join_dt), 'yyyy.MM.dd')
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
