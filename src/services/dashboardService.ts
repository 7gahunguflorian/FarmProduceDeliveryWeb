import api from './api';
import { DashboardStats, DeliveryData, Order, PaymentData } from '../types';

// Mock data for testing/development
const mockStats: DashboardStats = {
  totalOrders: 18673,
  totalSuccessfulDeliveries: 1673,
  totalFarmers: 7125,
  totalClients: 10618
};

const mockOrders: Order[] = [
  {
    id: 1,
    clientUsername: 'johndoe',
    orderDate: '2023-11-01',
    farmerUsername: 'farmerfresh',
    clientLocation: 'Main Post Office, New York, USA',
    deliveryDate: '2023-11-05',
    orderPrice: 124.50
  },
  {
    id: 2,
    clientUsername: 'janedoe',
    orderDate: '2023-11-02',
    farmerUsername: 'organicfarms',
    clientLocation: 'Central Square, Boston, USA',
    deliveryDate: '2023-11-06',
    orderPrice: 87.25
  },
  {
    id: 3,
    clientUsername: 'mikebrown',
    orderDate: '2023-11-03',
    farmerUsername: 'greenharvest',
    clientLocation: 'Downtown Mall, Chicago, USA',
    orderPrice: 156.00
  }
];

const mockDeliveryData: DeliveryData[] = Array.from({ length: 30 }, (_, i) => ({
  date: `2023-10-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
  deliveries: Math.floor(Math.random() * 100) + 50
}));

const mockPaymentData: PaymentData[] = Array.from({ length: 10 }, (_, i) => ({
  date: `Oct ${i + 1}`,
  income: Math.floor(Math.random() * 5000) + 1000,
  outgoing: Math.floor(Math.random() * 3000) + 500
}));

// Actual service with API calls
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      // Replace with actual API call when endpoint is available
      // const response = await api.get('/api/dashboard/stats');
      // return response.data;
      return mockStats;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return mockStats; // fallback to mock data
    }
  },
  
  getRecentOrders: async (): Promise<Order[]> => {
    try {
      // Replace with actual API call when endpoint is available
      // const response = await api.get('/api/orders/recent');
      // return response.data;
      return mockOrders;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      return mockOrders; // fallback to mock data
    }
  },
  
  getDeliveryData: async (timeRange: string): Promise<DeliveryData[]> => {
    try {
      // Replace with actual API call when endpoint is available
      // const response = await api.get(`/api/dashboard/deliveries?range=${timeRange}`);
      // return response.data;
      return mockDeliveryData;
    } catch (error) {
      console.error('Error fetching delivery data:', error);
      return mockDeliveryData; // fallback to mock data
    }
  },
  
  getPaymentData: async (timeRange: string): Promise<PaymentData[]> => {
    try {
      // Replace with actual API call when endpoint is available
      // const response = await api.get(`/api/dashboard/payments?range=${timeRange}`);
      // return response.data;
      return mockPaymentData;
    } catch (error) {
      console.error('Error fetching payment data:', error);
      return mockPaymentData; // fallback to mock data
    }
  }
};

export default dashboardService;