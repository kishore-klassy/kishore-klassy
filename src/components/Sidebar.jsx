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
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-lg font-semibold">Weave AI Agents</span>
        </div>
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Agents</span>
        </button>
      </div>

      {/* BOL DocVerify Agent Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-300 mb-2">BOL DocVerify Agent</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            Reasoning Agent
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
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
          <ul className="space-y-2">
            {uiAgents.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <button
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:text-white hover:bg-gray-800"
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
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
          <Bot className="w-5 h-5" />
          <span className="font-medium">Build the Agent</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;