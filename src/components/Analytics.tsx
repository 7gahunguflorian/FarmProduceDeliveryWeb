import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sample data for analytics
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 16500 },
    { month: 'May', revenue: 21000 },
    { month: 'Jun', revenue: 19500 },
    { month: 'Jul', revenue: 22500 },
    { month: 'Aug', revenue: 25000 },
    { month: 'Sep', revenue: 28000 },
    { month: 'Oct', revenue: 32000 },
    { month: 'Nov', revenue: 27500 },
    { month: 'Dec', revenue: 29000 },
  ];
  
  const userGrowth = [
    { month: 'Jan', farmers: 50, clients: 200 },
    { month: 'Feb', farmers: 60, clients: 250 },
    { month: 'Mar', farmers: 75, clients: 320 },
    { month: 'Apr', farmers: 90, clients: 380 },
    { month: 'May', farmers: 100, clients: 450 },
    { month: 'Jun', farmers: 110, clients: 500 },
    { month: 'Jul', farmers: 125, clients: 580 },
    { month: 'Aug', farmers: 140, clients: 650 },
    { month: 'Sep', farmers: 160, clients: 720 },
    { month: 'Oct', farmers: 180, clients: 800 },
    { month: 'Nov', farmers: 200, clients: 880 },
    { month: 'Dec', farmers: 220, clients: 950 },
  ];
  
  const deliveryStatus = [
    { name: 'Delivered', value: 68 },
    { name: 'In Transit', value: 22 },
    { name: 'Processing', value: 10 },
  ];
  
  const COLORS = ['#00C853', '#FFC107', '#2196F3'];
  
  const productCategories = [
    { name: 'Vegetables', orders: 1200 },
    { name: 'Fruits', orders: 900 },
    { name: 'Dairy', orders: 700 },
    { name: 'Meat', orders: 500 },
    { name: 'Grains', orders: 300 },
  ];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Detailed statistics and data insights</p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `$${value / 1000}k`} 
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2 }} 
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="farmers" fill="#10B981" name="Farmers" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="clients" fill="#3B82F6" name="Clients" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deliveryStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deliveryStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, '']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Product Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={productCategories}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} orders`, '']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                      <Bar 
                        dataKey="orders" 
                        fill="#6366F1" 
                        radius={[0, 4, 4, 0]} 
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">$86.42</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <span className="text-green-600 dark:text-green-400">↑ 12.3%</span> vs last month
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">76%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <span className="text-green-600 dark:text-green-400">↑ 5.2%</span> vs last month
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">4.8/5</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Based on 1,234 reviews
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;