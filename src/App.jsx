import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import DataTable from './components/DataTable';
import AIAgentInterface from './components/AIAgentInterface';
import ForecastingForm from './components/ForecastingForm';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeView) {
      case 'forecasting':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Demand Forecasting</h1>
                <p className="text-gray-600 dark:text-gray-300">Configure and generate demand forecasts</p>
              </div>
            </div>
            <ForecastingForm />
          </div>
        );
      case 'ai-agent':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Forecasting Agent</h1>
                <p className="text-gray-600 dark:text-gray-300">Interact with your intelligent forecasting assistant</p>
              </div>
            </div>
            <AIAgentInterface />
          </div>
        );
      default:
        return (
          <>
            {/* Filter Bar */}
            <FilterBar />
            
            {/* Dashboard Cards */}
            <DashboardCards />
            
            {/* Charts Section */}
            <Charts />
            
            {/* AI Agent Interface */}
            <div className="mb-8">
              <AIAgentInterface />
            </div>
            
            {/* Data Table */}
            <DataTable />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-800">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;