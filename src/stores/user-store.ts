import { CurrentUser } from '@src/models/user';
import { create } from 'zustand';

interface UserStore {
  user: CurrentUser | null;
  setUser: (v: CurrentUser | null) => void;
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: value => {
    set({ user: value });
  },
}));

export function useUser() {
  const user = useUserStore(state => state.user);

  if (!user) {
    throw new Error(
      'It should be used on the screens that have access to the user',
    );
  }
  return user;
}
