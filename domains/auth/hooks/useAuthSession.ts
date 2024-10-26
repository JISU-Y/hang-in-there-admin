'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { NAVIGATION_ROUTE } from '@domains/common/constants/route';
import useAdminStore, { adminStoreStorage } from '@logics/store';

import { getAccessToken, removeAuthTokens } from '../utils/authTokenHandler';

export const useAuthSession = () => {
  const { push } = useRouter();

  const [token, setToken] = useState('');

  const { member, resetMember } = useAdminStore((store) => store);
  const { clearStorage: clearAdminStore } = adminStoreStorage;

  const logout = () => {
    setToken('');
    removeAuthTokens();
    resetMember();
    clearAdminStore();
    push(NAVIGATION_ROUTE.SIGN_IN.HREF);
  };

  const guardRoute = useCallback(
    (callback: () => void) => {
      if (!token) {
        push(NAVIGATION_ROUTE.DASHBOARD.HREF);

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
    member,
    isUserLoggedIn: !!token,
    logout,
    guardRoute
  };
};
