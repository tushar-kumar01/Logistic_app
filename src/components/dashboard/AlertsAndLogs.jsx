import React, { useState } from 'react';

const AlertsAndLogs = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('');
  
  const alerts = [
    { id: 1, date: '25-Jun-25', time: '14:30', type: 'Critical', message: 'Fuel drum stock critically low - Only 5 units remaining', category: 'Inventory' },
    { id: 2, date: '23-Jun-25', time: '09:15', type: 'Warning', message: '10 Tyres allocated to wrong unit - Manual correction required', category: 'Allocation' },
    { id: 3, date: '22-Jun-25', time: '16:45', type: 'Info', message: 'User "Capt. Sharma" updated item EQ-0923 - Quantity changed from 100 to 120', category: 'System' },
    { id: 4, date: '20-Jun-25', time: '11:20', type: 'Warning', message: 'Inventory check overdue for 3 items - Medical kits require inspection', category: 'Compliance' },
    { id: 5, date: '18-Jun-25', time: '08:30', type: 'Critical', message: 'Emergency request from 22 Mtn - Immediate medical supplies needed', category: 'Request' },
    { id: 6, date: '17-Jun-25', time: '13:10', type: 'Info', message: 'Scheduled maintenance completed for vehicle fleet', category: 'System' },
    { id: 7, date: '15-Jun-25', time: '10:05', type: 'Warning', message: 'Ration packs expiring within 30 days - 45 units affected', category: 'Inventory' },
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filter === 'all' || alert.type.toLowerCase() === filter.toLowerCase();
    const matchesDate = dateRange === '' || alert.date.includes(dateRange);
    return matchesType && matchesDate;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Critical': return '🚨';
      case 'Warning': return '⚠️';
      case 'Info': return 'ℹ️';
      default: return '📝';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Inventory': return '📦';
      case 'Allocation': return '🎯';
      case 'System': return '⚙️';
      case 'Compliance': return '📋';
      case 'Request': return '📨';
      default: return '📄';
    }
  };

  const alertCounts = {
    critical: alerts.filter(a => a.type === 'Critical').length,
    warning: alerts.filter(a => a.type === 'Warning').length,
    info: alerts.filter(a => a.type === 'Info').length,
    total: alerts.length
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Alerts & Logs</h2>
        <div className="flex space-x-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types ({alertCounts.total})</option>
            <option value="critical">Critical ({alertCounts.critical})</option>
            <option value="warning">Warning ({alertCounts.warning})</option>
            <option value="info">Info ({alertCounts.info})</option>
          </select>
          <input
            type="text"
            placeholder="Filter by date (e.g., 25-Jun)"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            📤 Export Logs
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-400">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📊</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-800">{alertCounts.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-400">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚨</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{alertCounts.critical}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-400">
          <div className="flex items-center">
            <div className="text-2xl mr-3">⚠️</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{alertCounts.warning}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-400">
          <div className="flex items-center">
            <div className="text-2xl mr-3">ℹ️</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Info</p>
              <p className="text-2xl font-bold text-blue-600">{alertCounts.info}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{alert.date}</div>
                    <div className="text-gray-500">{alert.time}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(alert.type)}`}>
                    <span className="mr-1">{getTypeIcon(alert.type)}</span>
                    {alert.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">{getCategoryIcon(alert.category)}</span>
                    {alert.category}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="max-w-xs truncate" title={alert.message}>
                    {alert.message}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-gray-500">No alerts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsAndLogs;
