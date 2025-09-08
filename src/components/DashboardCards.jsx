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
  const handleCardClick = (cardTitle) => {
    // Handle card click/navigation
    console.log(`Clicked on ${cardTitle}`);
  };

  const handleKeyDown = (event, cardTitle) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(cardTitle);
    }
  };

  const cards = [
    {
      title: 'Total Assigned',
      value: '18',
      subtitle: 'Today',
      icon: FileText,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Completed',
      value: '10',
      subtitle: 'Successfully processed',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Incomplete',
      value: '18',
      subtitle: 'Requires attention',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Avg BOL Processing Time',
      value: '3.5',
      subtitle: 'sec',
      icon: Clock,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Extraction Accuracy',
      value: '97',
      subtitle: '%',
      icon: Target,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Matching Accuracy',
      value: '95',
      subtitle: '%',
      icon: GitCompare,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 group cursor-pointer focus-ring"
            role="button"
            tabIndex={0}
            aria-label={`View details for ${card.title}: ${card.value} ${card.subtitle}`}
            onClick={() => handleCardClick(card.title)}
            onKeyDown={(e) => handleKeyDown(e, card.title)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-3 group-hover:text-gray-700 transition-colors">{card.title}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{card.value}</span>
                  <span className="text-sm text-gray-500 font-medium">{card.subtitle}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${card.bgColor} ${card.iconColor} group-hover:scale-105 transition-transform`}>
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