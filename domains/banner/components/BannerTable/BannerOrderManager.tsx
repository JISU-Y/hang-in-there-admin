'use client';

import { BannerType } from '@models/index';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';
import { cn } from '@logics/utils/utils';
import { useCallback, useState } from 'react';
import { Button } from '@domains/common/components/ui/button';

interface BannerOrderManagerProps {
  banners: BannerType[];
  onOrderUpdate: (updatedBanners: BannerType[]) => Promise<void>;
}

export function BannerOrderManager({
  banners,
  onOrderUpdate
}: BannerOrderManagerProps) {
  const [reorderedBanners, setReorderedBanners] = useState<BannerType[] | null>(
    null
  );

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;

      const currentBanners = reorderedBanners || banners;
      const items = Array.from(currentBanners);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setReorderedBanners(items);
    },
    [banners, reorderedBanners]
  );

  const handleSave = async () => {
    if (!reorderedBanners) return;
    await onOrderUpdate(reorderedBanners);
    setReorderedBanners(null);
  };

  const handleCancel = () => {
    setReorderedBanners(null);
  };

  const displayBanners = reorderedBanners || banners;

  if (displayBanners.length === 0) {
    return (
      <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">
          활성화된 배너가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="banners" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {displayBanners.map((banner, index) => (
                <Draggable
                  key={banner.banner_id}
                  draggableId={String(banner.banner_id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        'flex w-[200px] flex-col rounded-lg border bg-card p-4 shadow-sm',
                        snapshot.isDragging && 'shadow-lg'
                      )}
                    >
                      <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-md">
                        {banner.bg_image && (
                          <Image
                            src={banner.bg_image}
                            alt={`배너 ${banner.banner_id}`}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        )}
                      </div>
                      <div className="text-sm font-medium">
                        순서: {index + 1}
                      </div>
                      <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {banner.content}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {reorderedBanners && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleSave}>순서 변경 저장</Button>
        </div>
      )}
    </div>
  );
}
