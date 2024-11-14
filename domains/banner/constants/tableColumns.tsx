'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from '../components/BannerTable/CellAction';
import { BannerType } from '@models/index';
import { Checkbox } from '@domains/common/components/ui/checkbox';

export const columns: ColumnDef<BannerType>[] = [
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
    accessorKey: 'banner_id',
    header: '배너 ID'
  },
  {
    accessorKey: 'bg_image',
    header: '배너 백그라운드 이미지',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('bg_image')}
            alt={`${row.getValue('name')}-banner-bg`}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'event_image',
    header: '배너 포스터',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('event_image')}
            alt={`${row.getValue('name')}-banner-poster`}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'content',
    header: '배너 내용'
  },
  {
    accessorKey: 'link',
    header: '배너 링크'
  },
  // TODO: 배너 노출 기간 추가 (start_dt, end_dt)
  // TODO: toggle 추가 (use_yn)
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
