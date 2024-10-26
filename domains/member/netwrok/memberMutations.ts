import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';
import { useMutation } from '@tanstack/react-query';

const memberApi = new BaseApi('');

export const useCreateMember = () => {
  return useMutation({
    mutationFn: async (body: CreateMemberDto) => {
      const { data } = await memberApi.post<ApiDataResponseType<void>>(
        '/member',
        body
      );

      return data;
    }
  });
};
