import React, { useEffect, useState } from 'react';
import deliveryService from '../services/deliveryService';
import { Order } from '../types';

const DeliveriesPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deliveryService.getAll().then(data => {
      console.log('Deliveries API response:', data); // <-- Add this line
    setDeliveries(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Deliveries</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Farmer</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Delivery Date</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.clientUsername}</td>
                <td className="border px-4 py-2">{order.farmerUsername}</td>
                <td className="border px-4 py-2">{order.orderDate}</td>
                <td className="border px-4 py-2">{order.deliveryDate || '-'}</td>
                <td className="border px-4 py-2">{order.clientLocation}</td>
                <td className="border px-4 py-2">${order.orderPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveriesPage; 