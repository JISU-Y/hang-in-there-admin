'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { BannerType } from '@models/index';
import { Checkbox } from '@domains/common/components/ui/checkbox';
import { format } from 'date-fns';
import { Button } from '@domains/common/components/ui/button';
import Link from 'next/link';
import { Switch } from '@domains/common/components/ui/switch';
import { CellAction } from '../components/BannerTable/CellAction';

interface CreateColumnsOptions {
  onUpdateBannerUsage: (params: {
    bannerId: number;
    useYn: 'Y' | 'N';
  }) => Promise<void>;
}

export const createColumns = ({
  onUpdateBannerUsage
}: CreateColumnsOptions): ColumnDef<BannerType>[] => [
  {
    id: 'select',
    size: 30,
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
    accessorKey: 'banner_id',
    header: 'ID',
    size: 80,
    minSize: 60,
    maxSize: 100,
    enableResizing: true
  },
  {
    accessorKey: 'bg_image',
    header: '백그라운드 이미지',
    minSize: 150,
    maxSize: 300,
    enableResizing: true,
    cell: ({ row }) => {
      return (
        <div className="flex h-full w-full items-center justify-center p-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={row.getValue('bg_image')}
              alt={`banner-${row.getValue('banner_id')}-bg`}
              fill
              className="object-contain"
              sizes="(max-width: 300px) 100vw"
            />
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'event_image',
    header: '포스터',
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: ({ row }) => {
      return (
        <div className="flex h-full w-full items-center justify-center p-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={row.getValue('event_image')}
              alt={`banner-${row.getValue('banner_id')}-poster`}
              fill
              className="object-contain"
              sizes="(max-width: 250px) 100vw"
            />
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'content',
    header: '내용',
    size: 200,
    minSize: 150,
    maxSize: 400,
    enableResizing: true
  },
  {
    accessorKey: 'link',
    header: '링크',
    size: 100,
    minSize: 80,
    maxSize: 200,
    enableResizing: true,
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
    minSize: 150,
    maxSize: 300,
    enableResizing: true,
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
    size: 80,
    minSize: 60,
    maxSize: 100,
    enableResizing: true,
    cell: ({ row }) => {
      return (
        <div className="align-middle">
          {row.getValue('order_number') ?? '-'}
        </div>
      );
    }
  },
  {
    accessorKey: 'use_yn',
    header: '사용 여부',
    size: 75,
    minSize: 60,
    maxSize: 100,
    enableResizing: true,
    cell: ({ row }) => {
      return (
        <div className="align-middle">
          <Switch
            checked={row.getValue('use_yn') === 'Y'}
            onCheckedChange={async () => {
              await onUpdateBannerUsage({
                bannerId: Number(row.getValue('banner_id')),
                useYn: row.getValue('use_yn') === 'Y' ? 'N' : 'Y'
              });
            }}
          />
        </div>
      );
    }
  },
  {
    id: 'actions',
    size: 100,
    minSize: 80,
    maxSize: 150,
    enableResizing: true,
    cell: ({ row }) => <CellAction data={row.original} />
  },
  // NOTE: 이 둘은 hide
  {
    accessorKey: 'start_dt',
    header: '노출 시작 날짜',
    size: 0
  },
  {
    accessorKey: 'end_dt',
    header: '노출 종료 날짜',
    size: 0
  }
];
