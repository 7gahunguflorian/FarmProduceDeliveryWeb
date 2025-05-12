import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { PaymentData } from '../../types';

interface PaymentChartProps {
  data: PaymentData[];
  title?: string;
  className?: string;
}

const PaymentChart: React.FC<PaymentChartProps> = ({
  data,
  title = 'Cashflow stat',
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Income</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Outgoing</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              />
              <YAxis 
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                formatter={(value) => [`$${value}`, '']}
              />
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              <Bar 
                dataKey="outgoing" 
                name="Outgoing" 
                fill="#F97316" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentChart;