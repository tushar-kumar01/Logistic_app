import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/allocation', label: 'Allocation', icon: '🎯' },
    { path: '/requests', label: 'Requests', icon: '📝' },
    { path: '/alerts', label: 'Logs & Alerts', icon: '⚠️' },
    { path: '/reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
