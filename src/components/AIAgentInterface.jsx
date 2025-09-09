import React, { useState } from 'react';
import { 
  Send, 
  Brain, 
  MessageSquare, 
  Upload, 
  Download, 
  Settings, 
  Zap,
  TrendingUp,
  Package,
  AlertTriangle,
  Calendar
} from 'lucide-react';

const AIAgentInterface = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      content: 'Hello! I\'m your Supply Chain Demand Forecasting AI Agent. I can help you analyze demand patterns, predict future requirements, and optimize inventory levels. What would you like to explore today?',
      timestamp: '10:30 AM'
    }
  ]);

  const quickActions = [
    {
      icon: TrendingUp,
      label: 'Generate Forecast',
      description: 'Create demand forecast for selected products',
      color: 'emerald'
    },
    {
      icon: Package,
      label: 'Inventory Analysis',
      description: 'Analyze current inventory levels and risks',
      color: 'blue'
    },
    {
      icon: AlertTriangle,
      label: 'Risk Assessment',
      description: 'Identify potential supply chain risks',
      color: 'red'
    },
    {
      icon: Calendar,
      label: 'Reorder Planning',
      description: 'Optimize reorder points and quantities',
      color: 'purple'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        type: 'agent',
        content: getAIResponse(message),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('forecast') || lowerMessage.includes('predict')) {
      return 'Based on historical data and current trends, I\'ve analyzed demand patterns for your selected products. The forecast shows a 15% increase in demand for electronics category over the next quarter, with seasonal peaks expected in March. Would you like me to generate detailed forecasts for specific SKUs?';
    } else if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
      return 'Your current inventory analysis shows 23 items at risk of stock-out within the next 2 weeks. I recommend prioritizing reorders for SKUs: ELC-001-PRO, HOM-003-CHR, and ELC-005-PHN. Shall I create automated purchase orders for these items?';
    } else if (lowerMessage.includes('risk') || lowerMessage.includes('alert')) {
      return 'I\'ve identified several supply chain risks: 35% risk from supply delays, 28% from demand volatility, and 22% from seasonal trends. The highest risk items are in the Home & Garden category. Would you like me to create a detailed risk mitigation plan?';
    } else {
      return 'I understand you\'re looking for supply chain insights. I can help with demand forecasting, inventory optimization, risk assessment, and reorder planning. Could you be more specific about what aspect you\'d like to explore?';
    }
  };

  const handleQuickAction = (action) => {
    const actionMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `Execute: ${action.label}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, actionMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      switch (action.label) {
        case 'Generate Forecast':
          response = '🔮 Forecast Generation Complete! I\'ve analyzed 2,847 SKUs and generated demand forecasts for the next 12 months. Key insights: Electronics category shows 18% growth, Apparel remains stable, and Sports equipment has seasonal peaks in Q2. View detailed results in the dashboard.';
          break;
        case 'Inventory Analysis':
          response = '📊 Inventory Analysis Complete! Current analysis shows: 89% optimal stock levels, 23 items require immediate reorder, $2.4M in potential cost savings identified through optimization. Critical items flagged for urgent attention.';
          break;
        case 'Risk Assessment':
          response = '⚠️ Risk Assessment Complete! Identified 47 risk factors across your supply chain. High-priority risks: 12 suppliers with delivery delays, 8 products with volatile demand patterns, 5 seasonal items approaching peak season. Mitigation strategies prepared.';
          break;
        case 'Reorder Planning':
          response = '📅 Reorder Planning Optimized! Generated reorder recommendations for 156 SKUs. Optimized reorder points will reduce carrying costs by 15% while maintaining 99.2% service levels. Automated purchase orders ready for approval.';
          break;
        default:
          response = 'Action completed successfully! Check the dashboard for updated results.';
      }

      const agentResponse = {
        id: messages.length + 2,
        type: 'agent',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">AI Forecasting Agent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Powered by Advanced ML Models</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            const colorClasses = {
              emerald: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
              blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
              red: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
              purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
            };
            
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${colorClasses[action.color]} dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700`}
              >
                <IconComponent className="w-5 h-5 mb-2" />
                <div className="text-xs font-medium">{action.label}</div>
                <div className="text-xs opacity-75 mt-1">{action.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'user' ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about demand forecasting, inventory optimization, or supply chain risks..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="absolute right-3 top-3 flex items-center space-x-1">
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                <Upload className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3" />
              <span>Real-time Analysis</span>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <Download className="w-3 h-3" />
            <span>Export Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentInterface;