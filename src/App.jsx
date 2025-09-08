import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import DataTable from './components/DataTable';
import PDFUploader from './components/PDFUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filter Bar */}
            <FilterBar />
            
            {/* PDF Uploader */}
            <div className="mb-8">
              <PDFUploader />
            </div>
            
            {/* Dashboard Cards */}
            <DashboardCards />
            
            {/* Charts Section */}
            <Charts />
            
            {/* Data Table */}
            <DataTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;