import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const Charts = () => {
  // Data for demand forecast accuracy by category
  const categoryAccuracyData = [
    { name: 'Electronics', value: 96.2, color: '#10b981' },
    { name: 'Apparel', value: 91.8, color: '#3b82f6' },
    { name: 'Home & Garden', value: 88.5, color: '#f59e0b' },
    { name: 'Sports', value: 93.1, color: '#8b5cf6' }
  ];

  // Data for demand vs forecast over time
  const demandForecastData = [
    { month: 'Jan', actual: 2400, forecast: 2200, variance: 8.3 },
    { month: 'Feb', actual: 1398, forecast: 1500, variance: -6.8 },
    { month: 'Mar', actual: 9800, forecast: 9500, variance: 3.2 },
    { month: 'Apr', actual: 3908, forecast: 4100, variance: -4.7 },
    { month: 'May', actual: 4800, forecast: 4600, variance: 4.3 },
    { month: 'Jun', actual: 3800, forecast: 3900, variance: -2.6 }
  ];

  // Data for risk factors
  const riskFactorsData = [
    { name: 'Supply Delays', value: 35 },
    { name: 'Demand Volatility', value: 28 },
    { name: 'Seasonal Trends', value: 22 },
    { name: 'Market Changes', value: 15 }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Top Row - Demand vs Forecast Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Demand vs Forecast Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'actual' ? `${value.toLocaleString()} units` : `${value.toLocaleString()} units`,
                  name === 'actual' ? 'Actual Demand' : 'Forecasted Demand'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="forecast" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                name="forecast"
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stackId="2" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="actual"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Accuracy Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Forecast Accuracy by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryAccuracyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryAccuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryAccuracyData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Variance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Forecast Variance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Variance']} />
                <Bar 
                  dataKey="variance" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Factors Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Supply Chain Risk Factors</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="horizontal"
                data={riskFactorsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, 'Risk Level']} />
                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;