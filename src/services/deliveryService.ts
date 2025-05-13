import api from './api';
import { Order } from '../types';

const deliveryService = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data.content;
  },
  // Add more methods as needed
};

export default deliveryService; 