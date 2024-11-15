'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from '../components/BannerTable/CellAction';
import { BannerType } from '@models/index';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { Switch } from '@domains/common/components/ui/switch';
import { format } from 'date-fns';
import { Button } from '@domains/common/components/ui/button';
import Link from 'next/link';

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
    header: '배너 링크',
    cell: ({ row }) => {
      return (
        <Button asChild variant="link">
          <Link href={row.getValue('link')}>link</Link>
        </Button>
      );
    }
  },
  {
    accessorKey: 'date_range',
    header: '배너 노출 기간',
    cell: ({ row }) => {
      return (
        <div className="align-middle">
          {format(new Date(row.getValue('start_dt')), 'yyyy-MM-dd')}~{' '}
          {format(new Date(row.getValue('end_dt')), 'yyyy-MM-dd')}
        </div>
      );
    }
  },
  // NOTE: 이 둘은 hide
  {
    accessorKey: 'start_dt',
    header: '배너 노출 기간'
  },
  {
    accessorKey: 'end_dt',
    header: '배너 노출 기간'
  },
  {
    accessorKey: 'use_yn',
    header: '배너 사용 여부',
    cell: ({ row }) => {
      return (
        <div className="align-middle">
          <Switch
            checked={row.getValue('use_yn')}
            // onCheckedChange={field.onChange}
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