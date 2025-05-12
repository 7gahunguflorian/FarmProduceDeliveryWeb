import React, { useEffect, useState } from 'react';
import { Package, Truck, Users, ShoppingCart } from 'lucide-react';
import StatCard from './dashboard/StatCard';
import DeliveryChart from './dashboard/DeliveryChart';
import PaymentChart from './dashboard/PaymentChart';
import OrdersTable from './dashboard/OrdersTable';
import dashboardService from '../services/dashboardService';
import { DashboardStats, DeliveryData, Order, PaymentData } from '../types';

type TimeFilter = 'day' | 'week' | 'month' | 'year';

const Dashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([]);
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const statsData = await dashboardService.getStats();
        const deliveryDataResult = await dashboardService.getDeliveryData(timeFilter);
        const paymentDataResult = await dashboardService.getPaymentData(timeFilter);
        const recentOrders = await dashboardService.getRecentOrders();
        
        setStats(statsData);
        setDeliveryData(deliveryDataResult);
        setPaymentData(paymentDataResult);
        setOrders(recentOrders);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeFilter]);
  
  const getDateRangeText = () => {
    const today = new Date();
    let start: Date;
    
    switch (timeFilter) {
      case 'day':
        return `For ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
      case 'week':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        return `From ${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
      case 'month':
        start = new Date(today);
        start.setMonth(today.getMonth() - 1);
        return `From ${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
      case 'year':
        start = new Date(today);
        start.setFullYear(today.getFullYear() - 1);
        return `From ${start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} – ${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      default:
        return '';
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{getDateRangeText()}</p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={() => setTimeFilter('day')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeFilter === 'day'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Day
          </button>
          <button 
            onClick={() => setTimeFilter('week')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeFilter === 'week'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeFilter('month')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeFilter === 'month'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeFilter('year')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeFilter === 'year'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Year
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats && (
              <>
                <StatCard 
                  title="Total Orders" 
                  value={stats.totalOrders.toLocaleString()}
                  change={5.8}
                  icon={<Package className="h-5 w-5" />}
                />
                <StatCard 
                  title="Total Successful Deliveries" 
                  value={stats.totalSuccessfulDeliveries.toLocaleString()}
                  change={8.1}
                  icon={<Truck className="h-5 w-5" />}
                />
                <StatCard 
                  title="Total Farmers" 
                  value={stats.totalFarmers.toLocaleString()}
                  change={-0.7}
                  icon={<Users className="h-5 w-5" />}
                />
                <StatCard 
                  title="Total Clients" 
                  value={stats.totalClients.toLocaleString()}
                  change={4.7}
                  icon={<ShoppingCart className="h-5 w-5" />}
                />
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DeliveryChart data={deliveryData} />
            <PaymentChart data={paymentData} />
          </div>
          
          <OrdersTable orders={orders} />
        </>
      )}
    </div>
  );
};

export default Dashboard;