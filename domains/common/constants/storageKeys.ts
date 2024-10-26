export const COOKIE_KEY = {
  ACCESS_TOKEN: 'auth.accessToken',
  REFRESH_TOKEN: 'auth.refreshToken',
  ACCESS_TOKEN_EXPIRE: 'auth.expiresIn',
  REFRESH_TOKEN_EXPIRE: 'auth.refreshTokenExpiresIn',
  FIRST_LOGIN: 'auth.firstLogin',
  REDIRECT_PATH: 'auth.redirectPath'
} as const;

export const LOCAL_STORAGE_KEY = {
  STORE: 'global.store'
} as const;
