import { ApiDataResponseType } from '@models/client';
import BaseApi from '@logics/api/baseApi';
import { CommonCodeRequestType, CommonCodeResponseType } from '@models/index';

const commonApi = new BaseApi('');

export const getCommonCodes = (params?: CommonCodeRequestType) => {
  return commonApi.get<ApiDataResponseType<CommonCodeResponseType[]>>(
    '/commoncd',
    { params }
  );
};
