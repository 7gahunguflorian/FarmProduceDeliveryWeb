import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { DeliveryData } from '../../types';

interface DeliveryChartProps {
  data: DeliveryData[];
  title?: string;
  className?: string;
}

const DeliveryChart: React.FC<DeliveryChartProps> = ({
  data,
  title = 'Analytic View',
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This data from October 30 - November 05
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
                }}
              />
              <YAxis 
                stroke="#9CA3AF"
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
                formatter={(value) => [`${value}`, 'Deliveries']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return `${date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}`;
                }}
              />
              <Line
                type="monotone"
                dataKey="deliveries"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryChart;