'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { EventListType } from '@models/index';
import { CellAction } from '../components/EventTable/CellAction';
import { format } from 'date-fns';

export const columns: ColumnDef<EventListType>[] = [
  {
    id: 'select',
    size: 50,
    maxSize: 50,
    enableResizing: false,
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
    header: '이벤트 ID',
    size: 100,
    minSize: 80,
    maxSize: 150
  },
  {
    accessorKey: 'title',
    header: '이벤트 제목',
    size: 250,
    minSize: 200,
    maxSize: 400
  },
  {
    accessorKey: 'content_type',
    header: '이벤트 타입',
    size: 120,
    minSize: 100,
    maxSize: 200
  },
  {
    accessorKey: 'event_period',
    header: '이벤트 기간',
    size: 200,
    minSize: 180,
    maxSize: 300,
    cell: ({ row }) => {
      const startDate = format(new Date(row.original.event_st), 'yyyy.MM.dd');
      const endDate = format(new Date(row.original.event_ed), 'yyyy.MM.dd');
      return `${startDate} - ${endDate}`;
    }
  },
  {
    id: 'category_info',
    header: '카테고리',
    size: 200,
    minSize: 150,
    maxSize: 300,
    cell: ({ row }) => {
      const mainCategory = row.original.category;
      const subCategory = row.original.sub_category;
      return `${mainCategory} > ${subCategory}`;
    }
  },
  {
    id: 'location_info',
    header: '지역',
    size: 180,
    minSize: 150,
    maxSize: 250,
    cell: ({ row }) => {
      const areaCode = row.original.area_cd;
      const sigunguCode = row.original.sigungu_cd;
      return `${areaCode} > ${sigunguCode}`;
    }
  },
  {
    id: 'actions',
    size: 80,
    maxSize: 80,
    enableResizing: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
