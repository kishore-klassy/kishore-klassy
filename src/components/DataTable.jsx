import React, { useState } from 'react';
import { MoreVertical, Calendar, Filter } from 'lucide-react';

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const tableData = [
    {
      id: 1,
      bolNumber: 'SHD-0525-001',
      fileName: 'BOL_Document_001.pdf',
      productName: 'Steel Coils',
      mot: 'Truck',
      origin: 'Houston, TX',
      assignedTo: 'John Smith',
      issueStatus: 'Pending Review',
      rootCause: 'Unmatched Fields',
      shipmentDate: '2024-01-15',
      bolStatus: 'extracted'
    },
    {
      id: 2,
      bolNumber: 'SHD-0525-002',
      fileName: 'BOL_Document_002.pdf',
      productName: 'Aluminum Sheets',
      mot: 'Rail',
      origin: 'Chicago, IL',
      assignedTo: 'Sarah Johnson',
      issueStatus: 'In Progress',
      rootCause: 'Missing Data',
      shipmentDate: '2024-01-16',
      bolStatus: 'processing'
    },
    {
      id: 3,
      bolNumber: 'SHD-0525-003',
      fileName: 'BOL_Document_003.pdf',
      productName: 'Copper Wire',
      mot: 'Ship',
      origin: 'Los Angeles, CA',
      assignedTo: 'Mike Wilson',
      issueStatus: 'Completed',
      rootCause: 'None',
      shipmentDate: '2024-01-17',
      bolStatus: 'matched'
    },
    {
      id: 4,
      bolNumber: 'SHD-0525-004',
      fileName: 'BOL_Document_004.pdf',
      productName: 'Iron Rods',
      mot: 'Truck',
      origin: 'Dallas, TX',
      assignedTo: 'Emily Davis',
      issueStatus: 'Failed',
      rootCause: 'Format Issues',
      shipmentDate: '2024-01-18',
      bolStatus: 'failed'
    },
    {
      id: 5,
      bolNumber: 'SHD-0525-005',
      fileName: 'BOL_Document_005.pdf',
      productName: 'Stainless Steel',
      mot: 'Rail',
      origin: 'Detroit, MI',
      assignedTo: 'Robert Brown',
      issueStatus: 'Pending Review',
      rootCause: 'Unmatched Fields',
      shipmentDate: '2024-01-19',
      bolStatus: 'extracted'
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
      extracted: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      matched: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">BOL Pipeline Records</h3>
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
                BOL Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                MOT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Issue Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Root Cause
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Shipment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                BOL Status
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
                  {row.bolNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.fileName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.mot}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.issueStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.rootCause}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.shipmentDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(row.bolStatus)}
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