import api from './api';
import { User, UserRole } from '../types';

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/users/me');
    return response.data;
  },
  
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/api/users');
    return response.data;
  },
  
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },
  
  getUsersByRole: async (role: UserRole): Promise<User[]> => {
    const response = await api.get(`/api/users/role/${role}`);
    return response.data;
  },
  
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  },
  
  uploadProfileImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/users/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.imageUrl;
  },
};

export default userService;