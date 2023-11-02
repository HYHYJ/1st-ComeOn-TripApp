import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import pb from '@/api/pocketbase';

const initialAuthState = {
  isAuth: false,
  user: '',
  token: '',
};

const useAuthStore = create(
  devtools((set) => ({
    ...initialAuthState,

    signIn: async ({ email, password }) => {
      const authData = await pb.collection('users').authWithPassword(email, password);

      const { isValid, model, token } = pb.authStore;

      set(
        (state) => ({
          ...state,
          isAuth: isValid,
          user: model,
          token,
        }),
        false,
        'auth/signIn',
      );
      return authData;
    },

    signOut: () => {
      set(
        (state) => ({
          ...state,
          ...initialAuthState,
        }),
        false,
        'auth/signOut',
      );
      return pb.authStore.clear();
    },

    cancelMembership: async (userId) => {
      return await pb.collection('users').delete(userId);
    },

    authState: () => {
      const { isValid, model, token } = pb.authStore;

      if ((isValid, model, token)) {
        set(
          (state) => ({
            ...state,
            isAuth: isValid,
            user: model,
            token: token,
          }),
          false,
          'auth/authState',
        );
      }
    },
  })),
);

useAuthStore.getState().authState();

export default useAuthStore;
