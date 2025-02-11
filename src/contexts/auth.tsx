// import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { authGetProfile, authSignIn } from '../api-client';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const localStorageConstants = { jwtName: 'jwt' };
type User = {
  name: string;
};

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState(localStorage.getItem(localStorageConstants.jwtName) || null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!token);

  React.useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await authSignIn({ body: { email: credentials.email, password: credentials.password } });
      console.log(data);
      if (data?.access_token) {
        setToken(data.access_token);
        setIsAuthenticated(true);
        localStorage.setItem(localStorageConstants.jwtName, data.access_token);
        await fetchUser();
      } else {
        throw new Error('Error en la autenticación');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  };

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(localStorageConstants.jwtName);
    console.log('Saliendo de la aplicacion');
    // navigate({ to: '/login' });
  };

  const fetchUser = async () => {
    try {
      const { data } = await authGetProfile();
      if (data) setUser({ name: data.name });
    } catch (error) {
      console.log('Error en el fetch user' + error);
      logout();
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => React.useContext(AuthContext);
