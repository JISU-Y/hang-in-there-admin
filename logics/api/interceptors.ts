import axios, { AxiosError, AxiosInstance } from 'axios';

import {
  getRefreshToken,
  removeAuthTokens,
  setAccessToken
} from '@domains/auth/utils/authTokenHandler';

// NOTE: 토큰 재발급 요청이 여러개 일 경우, 한번만 요청하도록 처리하기 위한 변수
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

// NOTE: 토큰 만료로 실패한 요청들을 queue에 담아두었다가 토큰 재발급 후 처리
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// NOTE: BaseApi 클래스에 들어가는 interceptors 설정
export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    // NOTE: onFulfilled 시 응답 그대로 반환
    (response) => response,
    // NOTE: onRejected 시 에러 처리
    (error) => {
      const originalRequest = error.config;

      // NOTE: 토큰 만료 에러인 경우 처리
      if (
        (error.response?.status === 401 ||
          error.response?.statusCode === 401) &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          const refreshToken = getRefreshToken();

          // NOTE: 토큰 재발급 요청
          axios
            .post(
              `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/reissue`,
              {
                rt: refreshToken
              }
            )
            .then(({ data }) => {
              // NOTE: 토큰 재발급 성공 시, 새로운 토큰으로 실패했던 요청들 재시도
              const { accessToken: newAccessToken } = data.data;

              setAccessToken(newAccessToken);

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

              processQueue(null, newAccessToken);

              resolve(instance(originalRequest));
            })
            .catch((err: AxiosError) => {
              // NOTE: 토큰 재발급 실패 시, 로그아웃 처리
              removeAuthTokens();

              if (window) {
                window.location.href = '/';

                alert(
                  '일정시간 동안 로그인하지 않아 로그아웃되었습니다. 다시 로그인해주세요.'
                );
              }

              processQueue(err, null);

              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      // NOTE: 토큰 만료로 인한 에러가 아닌 경우 에러 그대로 반환
      return Promise.reject(error);
    }
  );
}
