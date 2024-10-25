'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { getAccessToken, removeAuthTokens } from '../utils/authTokenHandler';

export const useAuthSession = () => {
  const { push } = useRouter();

  const [token, setToken] = useState('');

  const logout = () => {
    setToken('');
    removeAuthTokens();
    push('/');
  };

  const guardRoute = useCallback(
    (callback: () => void) => {
      if (!token) {
        push('/');

        return;
      }

      callback();
    },
    [push, token]
  );

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    try {
      setToken(accessToken);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  return {
    isUserLoggedIn: !!token,
    logout,
    guardRoute
  };
};
