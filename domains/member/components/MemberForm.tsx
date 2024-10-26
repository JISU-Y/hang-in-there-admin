'use client';

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
import { memberFormSchema } from '../constants/formSchema';
import { MemberFormSchemaType } from '../types';
import { useFetchMemberIdCheck } from '../netwrok/memberQueries';
import { useEffect, useState } from 'react';
import { useCreateMember } from '../netwrok/memberMutations';
import { useRouter } from 'next/navigation';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';

export default function MemberForm() {
  const { replace } = useRouter();

  const [idCheckCompleted, setIdCheckCompleted] = useState(false);

  const form = useForm<MemberFormSchemaType>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      id: '',
      pw: '',
      name: ''
    }
  });

  const idToBeRegistered = form.watch('id');

  const { refetch: fetchCheckMemberId, isLoading: isCheckingMemberId } =
    useFetchMemberIdCheck(idToBeRegistered, {
      enabled: false
    });
  const { mutateAsync: createMember } = useCreateMember();

  const handleCheckIdDuplicate = async () => {
    if (isCheckingMemberId) return;

    try {
      const { data } = await fetchCheckMemberId();

      switch (data?.statusCode) {
        case 1001:
          setIdCheckCompleted(false);
          form.setError('id', {
            message: data.message
          });
          break;
        case 1002:
          setIdCheckCompleted(true);
          form.setError('id', {
            message: data.message
          });
          break;
      }
    } catch (error) {
      setIdCheckCompleted(false);
      form.setError('id', {
        message: 'id 체크에 실패했습니다. 다시 시도해주세요.'
      });
    }
  };

  const onSubmit: SubmitHandler<MemberFormSchemaType> = async (data) => {
    if (!idCheckCompleted) {
      form.setError('id', {
        message: 'id 중복체크를 해주세요.'
      });

      return;
    }

    try {
      await createMember(data);

      replace(NAVIGATION_ROUTE.MEMBER.HREF);
      // TODO: member list refetch
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (idToBeRegistered) {
      setIdCheckCompleted(false);
    }
  }, [idToBeRegistered]);

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Employee Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <div className="flex h-full w-full flex-row items-end gap-2">
                      <Input placeholder="아이디" {...field} />
                      <Button
                        type="button"
                        className="whitespace-nowrap"
                        variant="outline"
                        disabled={idCheckCompleted || isCheckingMemberId}
                        onClick={handleCheckIdDuplicate}
                      >
                        중복확인
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">관리자 추가하기</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
