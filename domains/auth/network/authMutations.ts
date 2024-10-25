import { useMutation } from '@tanstack/react-query';
import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';

const authApi = new BaseApi('');

export const useCreateMemberLogin = () => {
  return useMutation({
    mutationFn: async (body: GetLoginDto) => {
      const { data } = await authApi.post<ApiDataResponseType<LoginType>>(
        '/member/login',
        body
      );

      return data;
    }
  });
};
