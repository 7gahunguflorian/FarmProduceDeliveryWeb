import { create } from 'zustand';
import { AuthState, LoginData, RegisterData, User } from '../types';
import api from '../services/api';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { username, password, isWeb: true });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Login failed',
        isAuthenticated: false,
        user: null,
        token: null,
      });
      localStorage.removeItem('token');
    }
  },

  register: async (userData: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Registration failed',
        isAuthenticated: false,
        user: null,
        token: null,
      });
      localStorage.removeItem('token');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ isLoading: true });
      try {
        const currentUser = await api.get<User>('/users/me');
        set({ user: currentUser.data, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;