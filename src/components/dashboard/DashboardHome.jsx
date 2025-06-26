import React from 'react';
import SummaryCard from '../common/SummaryCard';

const DashboardHome = () => {
  const summaryData = [
    { title: "Total Items", value: "237", color: "bg-blue-500", icon: "📦" },
    { title: "Available", value: "158", color: "bg-green-500", icon: "✅" },
    { title: "Pending Requests", value: "5", color: "bg-yellow-500", icon: "⏳" },
    { title: "Critical Shortages", value: "2", color: "bg-red-500", icon: "⚠️" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Warehouse Status Summary</h2>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <SummaryCard 
            key={index}
            title={item.title} 
            value={item.value} 
            color={item.color}
            icon={item.icon}
          />
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Supply Trend (Last 30 Days)</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Line Chart Placeholder</p>
              <p className="text-sm text-gray-500 mt-1">Integration with Chart.js pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Category-wise Stock</h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <p className="text-gray-600">Pie Chart Placeholder</p>
              <p className="text-sm text-gray-500 mt-1">Integration with Chart.js pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-green-500">✅</div>
            <div className="flex-1">
              <p className="text-sm font-medium">New inventory batch received</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-yellow-500">⚠️</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Low stock alert: Fuel Drums</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-blue-500">📝</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Resource allocation updated</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
