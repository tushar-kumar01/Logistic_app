import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardHome from '../dashboard/DashboardHome';
import InventoryManagement from '../inventory/InventoryManagement';
import ResourceAllocation from '../dashboard/ResourceAllocation';
import AlertsAndLogs from '../dashboard/AlertsAndLogs';

const DashboardLayout = ({ setIsLoggedIn }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/allocation" element={<ResourceAllocation />} />
            <Route path="/alerts" element={<AlertsAndLogs />} />
            <Route path="/" element={<DashboardHome />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
