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
import { CreateBannerFormSchemaType } from '../types';
import { createBannerFormSchema } from '../constants/formSchema';
import { CalendarDateRangePicker } from '@domains/common/components/CalendarDateRangePicker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from '@logics/utils/utils';

export default function BannerForm() {
  const form = useForm<CreateBannerFormSchemaType>({
    resolver: zodResolver(createBannerFormSchema),
    defaultValues: {
      content: '',
      link: ''
    }
  });

  const onSubmit: SubmitHandler<CreateBannerFormSchemaType> = (values) => {
    console.log(values);
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
              name="bgImageUrl"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>백그라운드 이미지</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        multiple={false}
                        maxFiles={1}
                        maxSize={4 * 1024 * 1024}
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
              name="eventImageUrl"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>포스터</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        multiple={false}
                        maxFiles={1}
                        maxSize={4 * 1024 * 1024}
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>배너 문구</FormLabel>
                  <FormControl>
                    <Input placeholder="문구를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
            <div
              className={cn(
                (form.formState.errors.startDate ||
                  form.formState.errors.endDate) &&
                  'text-destructive',
                'mb-2 space-y-2 lg:mb-0'
              )}
            >
              <FormLabel>배너 게시 기간</FormLabel>
              <CalendarDateRangePicker onSelectDate={handleSelectDate} />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
