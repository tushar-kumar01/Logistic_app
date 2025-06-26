import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProviders, useAuth } from './context';
import LoginScreen from './components/auth/LoginScreen';
import DashboardLayout from './components/layout/DashboardLayout';
import NotificationContainer from './components/common/NotificationContainer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Main App Content Component
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <DashboardLayout />
      ) : (
        <LoginScreen />
      )}
      <NotificationContainer />
    </div>
  );
};

// Main App Component with Providers
const App = () => {
  return (
    <AppProviders>
      <Router>
        <AppContent />
      </Router>
    </AppProviders>
  );
};
export default App;