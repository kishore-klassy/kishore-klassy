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
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">BOL Dashboard</h1>
      
      <div className="flex flex-wrap gap-4 mb-2">
        {/* BOL Status Filter */}
        <div className="relative">
          <select
            value={filters.bolStatus}
            onChange={(e) => setFilters({...filters, bolStatus: e.target.value})}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[140px]"
            aria-label="Filter by BOL Status"
          >
            {filterOptions.bolStatus.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'BOL Status' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* MOT Filter */}
        <div className="relative">
          <select
            value={filters.mot}
            onChange={(e) => setFilters({...filters, mot: e.target.value})}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[140px]"
            aria-label="Filter by Mode of Transport"
          >
            {filterOptions.mot.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Mode of Transport' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Origin Filter */}
        <div className="relative">
          <select
            value={filters.origin}
            onChange={(e) => setFilters({...filters, origin: e.target.value})}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[160px]"
            aria-label="Filter by Origin Location"
          >
            {filterOptions.origin.map(option => (
              <option key={option} value={option}>
                {option === 'All' ? 'Origin Location' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 pl-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[140px]"
            aria-label="Filter by Date Range"
          >
            {filterOptions.date.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;