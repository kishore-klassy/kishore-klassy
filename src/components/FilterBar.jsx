import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const FilterBar = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    riskLevel: 'All',
    status: 'All',
    date: 'Last 30 days'
  });

  const filterOptions = {
    category: ['All', 'Electronics', 'Apparel', 'Home & Garden', 'Sports', 'Books', 'Automotive'],
    riskLevel: ['All', 'Low', 'Medium', 'High'],
    status: ['All', 'Optimal', 'Reorder', 'Critical', 'Overstock'],
    date: ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 12 months', 'Custom Range']
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Supply Chain Forecasting Dashboard</h1>
      
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {filterOptions.category.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Product Category' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>

        {/* Risk Level Filter */}
        <div className="relative">
          <select
            value={filters.riskLevel}
            onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {filterOptions.riskLevel.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Risk Level' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {filterOptions.status.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Inventory Status' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 pl-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {filterOptions.date.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;