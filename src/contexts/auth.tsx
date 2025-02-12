import { create } from 'zustand';
import { authGetProfile, authSignIn } from '../api-client';

const localStorageConstants = { jwtName: 'jwt' };

type User = {
  name: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: !!localStorage.getItem(localStorageConstants.jwtName),
  user: null,
  token: localStorage.getItem(localStorageConstants.jwtName) || null,

  login: async (credentials) => {
    try {
      const { data } = await authSignIn({ body: { email: credentials.email, password: credentials.password } });
      if (data?.access_token) {
        localStorage.setItem(localStorageConstants.jwtName, data.access_token);
        set({ token: data.access_token, isAuthenticated: true });
        get().fetchUser();
      } else {
        throw new Error('Error en la autenticación');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(localStorageConstants.jwtName);
    set({ token: null, isAuthenticated: false, user: null });
    console.log('Saliendo de la aplicación');
  },

  fetchUser: async () => {
    try {
      const { data } = await authGetProfile();
      if (data) {
        set({ user: { name: data.name } });
      }
    } catch (error) {
      console.log('Error en el fetch user:', error);
      get().logout();
    }
  },
}));
