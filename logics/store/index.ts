import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LOCAL_STORAGE_KEY } from '@domains/common/constants/storageKeys';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface MemberType {
  name: string;
}

export interface State {
  member: MemberType;
}

export interface Actions {
  setMember: (member: Partial<MemberType>) => void;
  resetMember: () => void;
}

export type StoreType = State & Actions;

const initialState = {
  member: {
    name: ''
  }
};

const useAdminStore = create(
  persist<StoreType>(
    (set) => ({
      member: initialState.member,
      setMember: (newMember) =>
        set(({ member }) => ({ member: { ...member, ...newMember } })),
      resetMember: () => set(() => ({ member: initialState.member }))
    }),
    {
      name: LOCAL_STORAGE_KEY.STORE
    }
  )
);

export const adminStoreStorage = useAdminStore.persist;

export default useAdminStore;
