'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { BannerType } from '@models/index';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { format } from 'date-fns';
import { Button } from '@domains/common/components/ui/button';
import Link from 'next/link';

export const columns: ColumnDef<BannerType>[] = [
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
    accessorKey: 'banner_id',
    header: 'ID',
    size: 50
  },
  {
    accessorKey: 'bg_image',
    header: '백그라운드 이미지',
    size: 250,
    cell: ({ row }) => {
      return (
        <div className="relative flex aspect-square align-middle">
          <Image
            src={row.getValue('bg_image')}
            alt={`banner-${row.getValue('banner_id')}-bg`}
            width={200}
            height={100}
            className="rounded-lg object-contain"
            sizes="200px"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'event_image',
    header: '포스터',
    size: 200,
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('event_image')}
            alt={`banner-${row.getValue('banner_id')}-poster`}
            width={100}
            height={200}
            className="rounded-lg"
            sizes="100px"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'content',
    header: '내용',
    size: 200
  },
  {
    accessorKey: 'link',
    header: '링크',
    size: 100,
    cell: ({ row }) => {
      return (
        <Button asChild variant="link">
          <Link href={row.getValue('link')} target="_blank">
            link
          </Link>
        </Button>
      );
    }
  },
  {
    accessorKey: 'date_range',
    header: '노출 기간',
    size: 200,
    cell: ({ row }) => {
      return (
        <div className="align-middle">
          {format(new Date(row.getValue('start_dt')), 'yyyy-MM-dd')}~{' '}
          {format(new Date(row.getValue('end_dt')), 'yyyy-MM-dd')}
        </div>
      );
    }
  },
  {
    accessorKey: 'order_number',
    header: '우선순위',
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="align-middle">
          {row.getValue('order_number') ?? '-'}
        </div>
      );
    }
  },
  // NOTE: 이 둘은 hide
  {
    accessorKey: 'start_dt',
    header: '노출 시작 날짜'
  },
  {
    accessorKey: 'end_dt',
    header: '노출 종료 날짜'
  }
];
