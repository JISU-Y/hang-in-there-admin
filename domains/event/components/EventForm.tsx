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
import { Input } from '@domains/common/components/ui/input';
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
import { UpdateEventFormSchemaType } from '../types';
import { FORM_LIMIT, updateEventFormSchema } from '../constants/formSchema';

export default function EventForm() {
  const { replace } = useRouter();
  const { id: eventId } = useParams<{ id: string }>();

  const { refetch: fetchEventDetail } = useFetchEventDetailQuery(
    { id: eventId },
    {
      enabled: !!eventId
    }
  );
  // const { mutateAsync: updateBannerMutation } = useUpdateBannerMutation();

  const form = useForm<UpdateEventFormSchemaType>({
    resolver: zodResolver(updateEventFormSchema),
    defaultValues: async () => {
      const { data: eventDetail } = await fetchEventDetail();
      const imageUrlList = eventDetail?.img.map(({ url }) => url);
      const imageFiles = await convertUrlListToFileList(imageUrlList || []);

      return {
        img: imageFiles,
        description: eventDetail?.description || '',
        startDate: eventDetail?.event_st.split('T')[0] || '',
        endDate: eventDetail?.event_ed.split('T')[0] || ''
      };
    }
  });

  const onSubmit: SubmitHandler<UpdateEventFormSchemaType> = async (values) => {
    const { img, ...bannerBody } = values;
    // TODO: 병렬 요청으로 변경 필요
    const eventImageList = await uploadFiles(img, 'event');

    if (!eventImageList) return;

    try {
      // await updateBannerMutation({
      //   ...bannerBody,
      //   bgImageUrl,
      //   eventImageUrl,
      //   bannerId: Number(bannerId)
      // });

      replace(NAVIGATION_ROUTE.EVENT.HREF);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectDate = (date?: DateRange) => {
    if (date?.from) {
      form.setValue('startDate', format(date.from, 'yyyy-MM-dd'));
    }

    if (date?.to) {
      form.setValue('endDate', format(date.to, 'yyyy-MM-dd'));
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          배너 추가하기
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>백그라운드 이미지</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        multiple
                        maxFiles={FORM_LIMIT.IMAGE.MIN_LENGTH}
                        maxSize={FORM_LIMIT.IMAGE.MAX_FILE_SIZE * 1024 * 1024}
                        // disabled={loading}
                        // progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        // disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이벤트 상세 설명</FormLabel>
                  <FormControl>
                    <Input placeholder="상세 설명을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>배너 링크</FormLabel>
                  <FormControl>
                    <Input placeholder="링크를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div
              className={cn(
                (form.formState.errors.startDate ||
                  form.formState.errors.endDate) &&
                  'text-destructive',
                'mb-2 space-y-2 lg:mb-0'
              )}
            >
              <FormLabel>배너 게시 기간</FormLabel>
              {form.getValues('startDate') && form.getValues('endDate') && (
                <CalendarDateRangePicker
                  selectedDate={{
                    from: parse(
                      form.getValues('startDate'),
                      'yyyy-MM-dd',
                      new Date()
                    ),
                    to: parse(
                      form.getValues('endDate'),
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
