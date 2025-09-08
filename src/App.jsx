import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import DataTable from './components/DataTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {/* Filter Bar */}
          <FilterBar />
          
          {/* Dashboard Cards */}
          <DashboardCards />
          
          {/* Charts Section */}
          <Charts />
          
          {/* Data Table */}
          <DataTable />
        </main>
      </div>
    </div>
  );
}

export default App;