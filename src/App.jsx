import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import DataTable from './components/DataTable';

// Dashboard component that shows when user is authenticated
const Dashboard = () => {
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
};

// Main app component that handles authentication routing
const AppContent = () => {
  const { isAuthenticated, login, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated()) {
    return <LoginScreen onLogin={login} />;
  }

  // Show dashboard if authenticated
  return <Dashboard />;
};

// Root App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;