import React, { useState } from 'react';
import { MoreVertical, Calendar, Filter, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const tableData = [
    {
      id: 1,
      sku: 'ELC-001-PRO',
      productName: 'MacBook Pro 16"',
      category: 'Electronics',
      currentStock: 245,
      forecastedDemand: 320,
      actualDemand: 298,
      accuracy: 93.1,
      riskLevel: 'Low',
      nextReorder: '2024-02-15',
      supplier: 'Apple Inc.',
      status: 'optimal'
    },
    {
      id: 2,
      sku: 'APP-002-TEE',
      productName: 'Cotton T-Shirt',
      category: 'Apparel',
      currentStock: 1250,
      forecastedDemand: 800,
      actualDemand: 950,
      accuracy: 84.2,
      riskLevel: 'Medium',
      nextReorder: '2024-02-10',
      supplier: 'Fashion Co.',
      status: 'reorder'
    },
    {
      id: 3,
      sku: 'HOM-003-CHR',
      productName: 'Office Chair',
      category: 'Home & Garden',
      currentStock: 89,
      forecastedDemand: 150,
      actualDemand: 145,
      accuracy: 96.7,
      riskLevel: 'High',
      nextReorder: '2024-02-05',
      supplier: 'Furniture Ltd.',
      status: 'critical'
    },
    {
      id: 4,
      sku: 'SPT-004-SHO',
      productName: 'Running Shoes',
      category: 'Sports',
      currentStock: 340,
      forecastedDemand: 280,
      actualDemand: 265,
      accuracy: 94.6,
      riskLevel: 'Low',
      nextReorder: '2024-02-20',
      supplier: 'SportsCorp',
      status: 'optimal'
    },
    {
      id: 5,
      sku: 'ELC-005-PHN',
      productName: 'iPhone 15 Pro',
      category: 'Electronics',
      currentStock: 156,
      forecastedDemand: 450,
      actualDemand: 420,
      accuracy: 93.3,
      riskLevel: 'Medium',
      nextReorder: '2024-02-08',
      supplier: 'Apple Inc.',
      status: 'reorder'
    }
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(tableData.map(row => row.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === tableData.length);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      optimal: 'bg-green-100 text-green-800',
      reorder: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800',
      overstock: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getRiskBadge = (risk) => {
    const riskClasses = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskClasses[risk] || 'bg-gray-100 text-gray-800'}`}>
        {risk}
      </span>
    );
  };

  const getAccuracyIcon = (accuracy) => {
    if (accuracy >= 95) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (accuracy >= 85) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Demand Forecasting Overview</h3>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Forecasted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Accuracy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Next Reorder
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((row, index) => (
              <tr 
                key={row.id} 
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                  {row.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.currentStock.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.forecastedDemand.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.actualDemand.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getAccuracyIcon(row.accuracy)}
                    <span className="text-sm text-gray-900 dark:text-gray-100">{row.accuracy}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRiskBadge(row.riskLevel)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.nextReorder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(row.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;