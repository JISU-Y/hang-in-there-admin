import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';
import { CreateBannerDto } from '@models/index';
import { useMutation } from '@tanstack/react-query';

const bannerApi = new BaseApi('');

export const useCreateBannerMutation = () => {
  return useMutation({
    mutationFn: async (body: CreateBannerDto) => {
      const { data } = await bannerApi.post<ApiDataResponseType<void>>(
        '/banner',
        body
      );

      return data;
    }
  });
};
