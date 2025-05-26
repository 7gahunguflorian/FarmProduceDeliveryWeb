import { create } from 'zustand';
import api from '../services/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;
      
      if (user.role === 'ADMIN') {
        localStorage.setItem('token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        set({ 
          error: 'Access denied. Admin privileges required.',
          isLoading: false 
        });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Invalid username or password';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      });
      localStorage.removeItem('token');
      return false;
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return false;
    }

    try {
      const response = await api.get('/auth/me');
      const user = response.data;
      
      if (user.role === 'ADMIN') {
        set({
          user,
          isAuthenticated: true,
        });
        return true;
      } else {
        set({
          isAuthenticated: false,
          user: null,
        });
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      set({
        isAuthenticated: false,
        user: null,
      });
      localStorage.removeItem('token');
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;