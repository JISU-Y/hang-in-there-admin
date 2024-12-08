'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@domains/common/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@domains/common/components/ui/form';
import { Textarea } from '@domains/common/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@domains/common/components/ui/card';
import { FileUploader } from '@domains/common/components/FileUploader';
import { CalendarDateRangePicker } from '@domains/common/components/CalendarDateRangePicker';
import { DateRange } from 'react-day-picker';
import { format, parse } from 'date-fns';
import { cn } from '@logics/utils/utils';
import {
  convertUrlListToFileList,
  uploadFiles
} from '@logics/utils/imageHandler';
import { useParams, useRouter } from 'next/navigation';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';
import { useFetchEventDetailQuery } from '../netwrok/eventQueries';
import { useUpdateEventDetail } from '../netwrok/eventMutations';
import { UpdateEventFormSchemaType } from '../types';
import { FORM_LIMIT, updateEventFormSchema } from '../constants/formSchema';
import { Input } from '@domains/common/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

interface EventImage {
  file: File;
  url: string;
  sort_order: number;
}

export default function EventForm() {
  const { replace } = useRouter();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventImages, setEventImages] = React.useState<EventImage[]>([]);

  const { refetch: fetchEventDetail } = useFetchEventDetailQuery(
    { id: eventId },
    {
      enabled: !!eventId
    }
  );

  const { mutateAsync: updateEvent } = useUpdateEventDetail();

  const form = useForm<UpdateEventFormSchemaType>({
    resolver: zodResolver(updateEventFormSchema),
    defaultValues: async () => {
      const { data: eventDetail } = await fetchEventDetail();
      const imageUrlList = eventDetail?.img.map(({ url }) => url) || [];
      const imageFiles = await convertUrlListToFileList(imageUrlList);

      // Initialize event images state
      setEventImages(
        imageFiles.map((file, index) => ({
          file,
          url: URL.createObjectURL(file),
          sort_order: index
        }))
      );

      return {
        title: eventDetail?.title || '',
        description: eventDetail?.description || '',
        images: imageFiles,
        event_st: eventDetail?.event_st.split('T')[0] || '',
        event_ed: eventDetail?.event_ed.split('T')[0] || ''
      };
    }
  });

  const onSubmit: SubmitHandler<UpdateEventFormSchemaType> = async (values) => {
    try {
      const { images, ...eventBody } = values;
      const uploadedImages = await uploadFiles(images, 'event');

      if (!uploadedImages) return;

      await updateEvent({
        event_id: Number(eventId),
        ...eventBody,
        images: uploadedImages.map((url, index) => ({
          url,
          sort_order: index
        }))
      });

      replace(NAVIGATION_ROUTE.EVENT.HREF);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectDate = (date?: DateRange) => {
    if (date?.from) {
      form.setValue('event_st', format(date.from, 'yyyy-MM-dd'));
    }
    if (date?.to) {
      form.setValue('event_ed', format(date.to, 'yyyy-MM-dd'));
    }
  };

  const handleImagesChange: Dispatch<SetStateAction<File[]>> = (files) => {
    form.setValue('images', files as File[]);
  };

  return (
    <Card className="mx-auto h-[calc(100vh-10rem)] w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-left text-2xl font-bold">
          이벤트 수정하기
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)] overflow-y-auto pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이벤트 제목</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이벤트 제목을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>이벤트 이미지</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={handleImagesChange}
                      multiple
                      maxFiles={FORM_LIMIT.IMAGE.MAX_LENGTH}
                      maxSize={FORM_LIMIT.IMAGE.MAX_FILE_SIZE}
                      enableDragSort
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이벤트 상세 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="이벤트 상세 설명을 입력해주세요."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={cn(
                (form.formState.errors.event_st ||
                  form.formState.errors.event_ed) &&
                  'text-destructive',
                'space-y-2'
              )}
            >
              <FormLabel>이벤트 기간</FormLabel>
              {form.getValues('event_st') && form.getValues('event_ed') && (
                <CalendarDateRangePicker
                  selectedDate={{
                    from: parse(
                      form.getValues('event_st'),
                      'yyyy-MM-dd',
                      new Date()
                    ),
                    to: parse(
                      form.getValues('event_ed'),
                      'yyyy-MM-dd',
                      new Date()
                    )
                  }}
                  onSelectDate={handleSelectDate}
                />
              )}
            </div>
            <Button type="submit" disabled={!form.formState.isValid}>
              이벤트 수정하기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
