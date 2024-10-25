import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getAccessToken } from '@domains/auth/utils/authTokenHandler';

import { setupInterceptors } from './interceptors';

type ApiVersionType = 'v1';
type ApiUserType = 'user' | 'admin';

export interface ApiRequestConfig extends AxiosRequestConfig {
  isAuthRequired?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT;

export default class BaseApi {
  client: AxiosInstance;

  constructor(
    baseUrl: string,
    version: ApiVersionType = 'v1',
    userType: ApiUserType = 'admin'
  ) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    this.client = axios.create({
      baseURL: `${BASE_URL}/${version}/${userType}/${baseUrl}`
    });

    // NOTE: 토큰 재발급 요청을 위한 interceptor 설정
    setupInterceptors(this.client);
  }

  addAuthHeader(config: ApiRequestConfig = {}) {
    const authToken = getAccessToken();
    const { isAuthRequired = true, ...axiosConfig } = config;

    return {
      ...axiosConfig,
      headers: {
        ...(isAuthRequired && authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {}),
        ...(config.headers || {})
      }
    };
  }

  async get<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    try {
      const result = await this.client.get<T>(url, this.addAuthHeader(config));
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    try {
      const result = await this.client.put<T>(
        url,
        data,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    try {
      const result = await this.client.post<T>(
        url,
        data,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    try {
      const result = await this.client.patch<T>(
        url,
        data,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    try {
      const result = await this.client.delete<T>(
        url,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
