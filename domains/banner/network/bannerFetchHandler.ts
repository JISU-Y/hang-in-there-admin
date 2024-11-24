import BaseApi from '@logics/api/baseApi';
import { ApiPaginationDataResponseType } from '@models/client';
import { BannerType, GetBannerListRequest } from '@models/index';

const bannerApi = new BaseApi('banner');

export const getBannerList = (
  params: GetBannerListRequest,
  tokens?: { accessToken?: string; refreshToken?: string }
) => {
  return bannerApi.get<ApiPaginationDataResponseType<BannerType[]>>('', {
    params: {
      ...params,
      use_yn: params.useYn
    },
    headers: {
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`
      }),
      ...(tokens?.refreshToken && { refresh: tokens.refreshToken })
    }
  });
};

export const getBannerDetail = (
  { bannerId }: { bannerId: string },
  tokens?: { accessToken?: string; refreshToken?: string }
) => {
  return bannerApi.get<ApiPaginationDataResponseType<BannerType>>('/detail', {
    params: { id: bannerId },
    headers: {
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`
      }),
      ...(tokens?.refreshToken && { refresh: tokens.refreshToken })
    }
  });
};
