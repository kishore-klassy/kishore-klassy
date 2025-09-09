import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Settings, 
  Database,
  ArrowLeft,
  Bot,
  Package,
  AlertTriangle,
  Calendar,
  Brain
} from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
    { icon: TrendingUp, label: 'Demand Forecasting', key: 'forecasting' },
    { icon: BarChart3, label: 'Analytics & Reports', key: 'analytics' },
    { icon: Target, label: 'Inventory Planning', key: 'inventory' },
    { icon: AlertTriangle, label: 'Risk Management', key: 'risk' },
  ];

  const aiAgents = [
    { icon: Brain, label: 'Forecasting AI Agent', key: 'ai-agent' },
    { icon: Package, label: 'Supply Chain Agent', key: 'supply-agent' },
    { icon: Calendar, label: 'Planning Agent', key: 'planning-agent' },
  ];

  const uiAgents = [
    { icon: Settings, label: 'Configuration', active: false },
    { icon: Database, label: 'Data Sources', active: false },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">Supply Chain AI</span>
        </div>
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Dashboard</span>
        </button>
      </div>

      {/* Demand Forecasting Agent Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Demand Forecasting Agent</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            Predictive AI Agent
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeView === item.key;
            return (
              <li key={index}>
                <button
                  onClick={() => setActiveView(item.key)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
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

        {/* AI Agents Section */}
        <div className="mt-8">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            AI Agents
          </h3>
          <ul className="space-y-2">
            {aiAgents.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeView === item.key;
              return (
                <li key={index}>
                  <button
                    onClick={() => setActiveView(item.key)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
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
        </div>

        {/* Configuration Section */}
        <div className="mt-8">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            Configuration
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

      {/* Train Agent Button */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors">
          <Brain className="w-5 h-5" />
          <span className="font-medium">Train Forecasting Model</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;