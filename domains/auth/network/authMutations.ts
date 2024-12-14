import { useMutation } from '@tanstack/react-query';
import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';
import { GetLoginDto, LoginType } from '@models/index';

const authApi = new BaseApi('');

export const useCreateMemberLogin = () => {
  return useMutation({
    mutationFn: async (body: GetLoginDto) => {
      const { data } = await authApi.post<ApiDataResponseType<LoginType>>(
        '/member/login',
        {
          ...body,
          expires_in: process.env.NODE_ENV === 'development' ? 60 * 60 : 60 * 60
        }
      );

      return data;
    }
  });
};
