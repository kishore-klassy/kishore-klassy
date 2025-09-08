import React, { useState } from 'react';
import { MoreVertical, Calendar, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
    },
    {
      id: 6,
      bolNumber: 'SHD-0525-006',
      fileName: 'BOL_Document_006.pdf',
      productName: 'Titanium Alloy',
      mot: 'Air',
      origin: 'Phoenix, AZ',
      assignedTo: 'Lisa Chen',
      issueStatus: 'Completed',
      rootCause: 'None',
      shipmentDate: '2024-01-20',
      bolStatus: 'matched'
    }
  ];

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentData.map(row => row.id)));
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
    setSelectAll(newSelectedRows.size === currentData.length);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      extracted: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      matched: 'bg-blue-100 text-blue-800 border-blue-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  const truncateText = (text, maxLength = 20) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">BOL Pipeline Records</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, tableData.length)} of {tableData.length}
            </span>
          </div>
        </div>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  aria-label="Select all rows"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BOL Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MOT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BOL Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    aria-label={`Select row for ${row.bolNumber}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {row.bolNumber}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {truncateText(row.fileName, 15)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.mot}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.issueStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(row.bolStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="View details"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Edit record"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="More actions"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200">
          {currentData.map((row) => (
            <div key={row.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    aria-label={`Select row for ${row.bolNumber}`}
                  />
                  <div>
                    <div className="text-sm font-medium text-blue-600">{row.bolNumber}</div>
                    <div className="text-xs text-gray-500">{row.fileName}</div>
                  </div>
                </div>
                {getStatusBadge(row.bolStatus)}
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Product:</span>
                  <div className="font-medium text-gray-900">{row.productName}</div>
                </div>
                <div>
                  <span className="text-gray-500">MOT:</span>
                  <div className="font-medium text-gray-900">{row.mot}</div>
                </div>
                <div>
                  <span className="text-gray-500">Origin:</span>
                  <div className="font-medium text-gray-900">{row.origin}</div>
                </div>
                <div>
                  <span className="text-gray-500">Assigned:</span>
                  <div className="font-medium text-gray-900">{row.assignedTo}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Issue: {row.issueStatus}
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="View details"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Edit record"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="More actions"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;