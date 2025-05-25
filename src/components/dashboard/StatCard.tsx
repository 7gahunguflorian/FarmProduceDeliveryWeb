import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { twMerge } from 'tailwind-merge';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  period?: string;
  className?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  period = 'Last Week',
  className,
  icon
}) => {
  const isPositive = change >= 0;
  
  return (
    <Card className={twMerge('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
          </div>
          {icon && (
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          )}
        </div>
        {/* Period text */}
        <div className="flex items-center mt-4">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {period}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;