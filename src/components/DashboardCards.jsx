import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Target, 
  GitCompare 
} from 'lucide-react';

const DashboardCards = () => {
  const cards = [
    {
      title: 'Total Assigned',
      value: '18',
      subtitle: 'Today',
      icon: FileText,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Completed',
      value: '10',
      subtitle: 'Successfully processed',
      icon: CheckCircle,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Incomplete',
      value: '18',
      subtitle: 'Requires attention',
      icon: AlertCircle,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Avg BOL Processing Time',
      value: '3.5',
      subtitle: 'sec',
      icon: Clock,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Extraction Accuracy',
      value: '97',
      subtitle: '%',
      icon: Target,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Matching Accuracy',
      value: '95',
      subtitle: '%',
      icon: GitCompare,
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-3">{card.title}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-gray-900">{card.value}</span>
                  <span className="text-sm text-gray-500 font-medium">{card.subtitle}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-orange-50 ${card.iconColor}`}>
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