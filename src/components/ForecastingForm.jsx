import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Settings, 
  BarChart3, 
  Target, 
  RefreshCw,
  Play,
  Download,
  Upload,
  Database
} from 'lucide-react';

const ForecastingForm = () => {
  const [formData, setFormData] = useState({
    forecastPeriod: '12',
    forecastUnit: 'months',
    categories: ['Electronics', 'Apparel'],
    algorithm: 'hybrid',
    seasonality: 'auto',
    confidence: '95',
    includeExternalFactors: true,
    includePromotions: true,
    dataSource: 'all'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleGenerateForecast = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      // In real app, this would trigger the forecast generation
    }, 3000);
  };

  const categories = [
    'Electronics', 'Apparel', 'Home & Garden', 'Sports', 'Books', 'Automotive'
  ];

  const algorithms = [
    { value: 'arima', label: 'ARIMA', description: 'Best for stable trends' },
    { value: 'lstm', label: 'LSTM Neural Network', description: 'Best for complex patterns' },
    { value: 'prophet', label: 'Prophet', description: 'Best for seasonal data' },
    { value: 'hybrid', label: 'Hybrid AI Model', description: 'Combines multiple algorithms' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Forecasting Parameters Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Forecast Parameters</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Configure your demand forecasting model</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Forecast Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Forecast Period
            </label>
            <div className="flex space-x-3">
              <input
                type="number"
                value={formData.forecastPeriod}
                onChange={(e) => handleInputChange('forecastPeriod', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                min="1"
                max="24"
              />
              <select
                value={formData.forecastUnit}
                onChange={(e) => handleInputChange('forecastUnit', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="quarters">Quarters</option>
              </select>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Categories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Algorithm Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Forecasting Algorithm
            </label>
            <div className="space-y-2">
              {algorithms.map((algorithm) => (
                <label key={algorithm.value} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="algorithm"
                    value={algorithm.value}
                    checked={formData.algorithm === algorithm.value}
                    onChange={(e) => handleInputChange('algorithm', e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{algorithm.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{algorithm.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Advanced Options</h4>
            
            {/* Confidence Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confidence Level: {formData.confidence}%
              </label>
              <input
                type="range"
                min="80"
                max="99"
                value={formData.confidence}
                onChange={(e) => handleInputChange('confidence', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>80%</span>
                <span>99%</span>
              </div>
            </div>

            {/* Seasonality */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seasonality Detection
              </label>
              <select
                value={formData.seasonality}
                onChange={(e) => handleInputChange('seasonality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="auto">Auto-detect</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="none">None</option>
              </select>
            </div>

            {/* Additional Factors */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includeExternalFactors}
                  onChange={(e) => handleInputChange('includeExternalFactors', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include external factors (weather, events)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includePromotions}
                  onChange={(e) => handleInputChange('includePromotions', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include promotional impacts</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Data Sources & Actions */}
      <div className="space-y-6">
        {/* Data Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-500 rounded-lg">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Data Sources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Select data sources for forecasting</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { id: 'sales', label: 'Historical Sales Data', status: 'connected', records: '2.4M' },
              { id: 'inventory', label: 'Inventory Movements', status: 'connected', records: '890K' },
              { id: 'external', label: 'External Market Data', status: 'connected', records: '150K' },
              { id: 'promotions', label: 'Promotional Calendar', status: 'pending', records: '2.5K' }
            ].map((source) => (
              <div key={source.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    source.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{source.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{source.records} records</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  source.status === 'connected' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {source.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Actions</h3>
          
          <div className="space-y-4">
            <button
              onClick={handleGenerateForecast}
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Forecast...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Generate Forecast</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import Data</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Results</span>
              </button>
            </div>
          </div>

          {/* Model Performance */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Current Model Performance</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">94.2%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12.3%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">MAPE</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.1ms</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Latency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingForm;