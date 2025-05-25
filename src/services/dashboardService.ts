import api from './api';
import { DashboardStats, DeliveryData, Order, PaymentData } from '../types';

const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const [orderStats, userStats] = await Promise.all([
        api.get('/orders/stats'),
        api.get('/users/stats')
      ]);
      
      return {
        totalOrders: orderStats.data.totalOrders,
        totalSuccessfulDeliveries: orderStats.data.totalSuccessfulDeliveries,
        totalFarmers: userStats.data.totalFarmers,
        totalClients: userStats.data.totalClients
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
  
  getRecentOrders: async (): Promise<Order[]> => {
    try {
      const response = await api.get('/orders/recent');
      return response.data.content.map((order: any) => ({
        id: order.id,
        clientUsername: order.clientUsername,
        orderDate: order.orderDate,
        farmerUsername: order.farmerUsername,
        clientLocation: order.clientLocation,
        deliveryDate: order.deliveryDate,
        orderPrice: order.orderPrice
      }));
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  },
  
  getDeliveryData: async (timeRange: string): Promise<DeliveryData[]> => {
    try {
      const response = await api.get(`/orders/delivery-stats?timeRange=${timeRange}`);
      return response.data.map((stat: any) => ({
        date: stat.date,
        deliveries: stat.deliveries
      }));
    } catch (error) {
      console.error('Error fetching delivery data:', error);
      throw error;
    }
  },
  
  getPaymentData: async (timeRange: string): Promise<PaymentData[]> => {
    try {
      const response = await api.get(`/orders/payment-stats?timeRange=${timeRange}`);
      return response.data.map((stat: any) => ({
        date: stat.date,
        income: stat.income,
        outgoing: stat.outgoing
      }));
    } catch (error) {
      console.error('Error fetching payment data:', error);
      throw error;
    }
  }
};

export default dashboardService;