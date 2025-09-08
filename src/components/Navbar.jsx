import React, { useState } from 'react';
import { Bell, Settings, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-end space-x-6">
      {/* Notification Bell */}
      <div className="relative">
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            3
          </span>
        </button>
      </div>

      {/* Settings */}
      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
        <Settings className="w-5 h-5" />
      </button>

      {/* User Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">K</span>
          </div>
          <span className="font-medium">Kkovalan</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Profile Settings
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Account
            </button>
            <hr className="my-1 border-gray-200 dark:border-gray-700" />
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;