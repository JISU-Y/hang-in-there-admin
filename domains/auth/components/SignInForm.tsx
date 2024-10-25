'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SigninFormSchemaType } from '../types';
import { signinFormSchema } from '../constants/formSchema';
import { useCreateMemberLogin } from '../network/authMutations';
import { setAuthTokens } from '../utils/authTokenHandler';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';

export default function SignInForm() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const { mutateAsync: memberLogin } = useCreateMemberLogin();

  const [loading, startTransition] = useTransition();

  const form = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      id: '',
      pw: ''
    }
  });

  const onSubmit: SubmitHandler<SigninFormSchemaType> = async (data) => {
    startTransition(async () => {
      try {
        const tokenData = await memberLogin(data);

        setAuthTokens({
          accessToken: tokenData.at,
          refreshToken: tokenData.rt
        });

        replace(NAVIGATION_ROUTE.DASHBOARD.HREF);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="아이디"
                  disabled={loading}
                  {...field}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="패스워드"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="ml-auto w-full" type="submit">
          로그인
        </Button>
      </form>
    </Form>
  );
}
