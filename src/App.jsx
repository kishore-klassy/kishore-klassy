import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import DataTable from './components/DataTable';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email) => {
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show dashboard if authenticated
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar user={user} onLogout={handleLogout} />
        
        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-800">
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