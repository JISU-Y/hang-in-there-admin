import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';
import {
  CreateBannerDto,
  UpdateBannerDto,
  UpdateBannerOrderDto,
  UpdateBannerUseynDto
} from '@models/index';
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

export const useUpdateBannerMutation = () => {
  return useMutation({
    mutationFn: async (body: UpdateBannerDto) => {
      const { data } = await bannerApi.put<ApiDataResponseType<void>>(
        '/banner',
        body
      );

      return data;
    }
  });
};

export const useUpdateBannerUsageMutation = () => {
  return useMutation({
    mutationFn: async (body: UpdateBannerUseynDto) => {
      const { data } = await bannerApi.patch<ApiDataResponseType<void>>(
        '/banner/use-yn',
        body
      );

      return data;
    }
  });
};

export const useUpdateBannerOrderMutation = () => {
  return useMutation({
    mutationFn: async (body: UpdateBannerOrderDto) => {
      const { data } = await bannerApi.patch<ApiDataResponseType<void>>(
        '/banner/order-number',
        body
      );

      return data;
    }
  });
};
