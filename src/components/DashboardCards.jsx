import React from 'react';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  Clock, 
  Target, 
  BarChart3,
  DollarSign,
  Truck
} from 'lucide-react';

const DashboardCards = () => {
  const cards = [
    {
      title: 'Forecast Accuracy',
      value: '94.2',
      subtitle: '%',
      icon: Target,
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Active SKUs',
      value: '2,847',
      subtitle: 'Items tracked',
      icon: Package,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Demand Variance',
      value: '12.3',
      subtitle: '% vs forecast',
      icon: BarChart3,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Stock-out Risk',
      value: '23',
      subtitle: 'Items at risk',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'Lead Time Avg',
      value: '14.2',
      subtitle: 'days',
      icon: Clock,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Cost Savings',
      value: '$2.4M',
      subtitle: 'This quarter',
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">{card.title}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.subtitle}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${card.bgColor} ${card.iconColor}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;