import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  GitCompare, 
  Settings, 
  Database,
  ArrowLeft,
  Bot
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: FileText, label: 'BOL Master Agent', active: false },
    { icon: Search, label: 'BOL Extraction Agent', active: false },
    { icon: GitCompare, label: 'BOL Matching Agent', active: false },
  ];

  const uiAgents = [
    { icon: Settings, label: 'Rule UI Agent', active: false },
    { icon: Database, label: 'Repository UI Agent', active: false },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col flex-shrink-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-lg font-semibold">Weave AI Agents</span>
        </div>
        <button 
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors focus-ring rounded-lg p-2 -ml-2"
          aria-label="Navigate back to agents list"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Agents</span>
        </button>
      </div>

      {/* BOL DocVerify Agent Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-300 mb-2">BOL DocVerify Agent</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            Reasoning Agent
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4" role="navigation" aria-label="Main navigation">
        <ul className="space-y-1" role="menu">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors focus-ring ${
                    item.active
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                  role="menuitem"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* UI Agents Section */}
        <div className="mt-8">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            UI Agents
          </h3>
          <ul className="space-y-1" role="menu">
            {uiAgents.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <button
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors text-gray-300 hover:text-white hover:bg-gray-800 focus-ring"
                    role="menuitem"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Build Agent Button */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors focus-ring font-medium">
          <Bot className="w-5 h-5" />
          <span>Build the Agent</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;