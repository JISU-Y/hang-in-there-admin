import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';
import { UpdatePasswordDto } from '@models/index';
import { useMutation } from '@tanstack/react-query';

const profileApi = new BaseApi('');

export const usePatchMemberPassword = () => {
  return useMutation({
    mutationFn: async (body: UpdatePasswordDto) => {
      const { data } = await profileApi.post<ApiDataResponseType<void>>(
        '/member/password',
        body
      );

      return data;
    }
  });
};
