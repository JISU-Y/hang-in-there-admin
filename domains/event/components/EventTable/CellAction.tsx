'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { AlertModal } from '@domains/common/components/modal/alert-modal';
import { Button } from '@domains/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@domains/common/components/ui/dropdown-menu';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';
import { EventListType } from '@models/index';

interface CellActionProps {
  data: EventListType;
}

export const CellAction = ({ data }: CellActionProps) => {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() =>
              push(`${NAVIGATION_ROUTE.EVENT_DETAIL.HREF}/${data.event_id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
