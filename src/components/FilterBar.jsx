import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const FilterBar = () => {
  const [filters, setFilters] = useState({
    bolStatus: 'All',
    mot: 'All',
    origin: 'All',
    date: 'Today'
  });

  const filterOptions = {
    bolStatus: ['All', 'Extracted', 'Processing', 'Matched', 'Failed'],
    mot: ['All', 'Truck', 'Rail', 'Ship', 'Air'],
    origin: ['All', 'Houston, TX', 'Chicago, IL', 'Los Angeles, CA', 'Dallas, TX', 'Detroit, MI'],
    date: ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom Range']
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">BOL Dashboard</h1>
      
      <div className="flex flex-wrap gap-4">
        {/* BOL Status Filter */}
        <div className="relative">
          <select
            value={filters.bolStatus}
            onChange={(e) => setFilters({...filters, bolStatus: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.bolStatus.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'BOL Status' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>

        {/* MOT Filter */}
        <div className="relative">
          <select
            value={filters.mot}
            onChange={(e) => setFilters({...filters, mot: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.mot.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Select the MOT' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>

        {/* Origin Filter */}
        <div className="relative">
          <select
            value={filters.origin}
            onChange={(e) => setFilters({...filters, origin: e.target.value})}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.origin.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Select the Origin' : option}
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
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 pl-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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