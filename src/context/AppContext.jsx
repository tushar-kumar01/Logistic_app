import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  theme: 'light',
  notifications: [],
  loading: false,
  error: null,
  sidebarCollapsed: false,
  currentPage: 'dashboard'
};

// Action types
const APP_ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case APP_ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    
    case APP_ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    
    case APP_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload,
          timestamp: new Date().toISOString()
        }]
      };
    
    case APP_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case APP_ACTIONS.CLEAR_NOTIFICATIONS:
      return { ...state, notifications: [] };
    
    case APP_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case APP_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case APP_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// App provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Theme functions
  const setTheme = (theme) => {
    dispatch({ type: APP_ACTIONS.SET_THEME, payload: theme });
    localStorage.setItem('logisticsTheme', theme);
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Sidebar functions
  const toggleSidebar = () => {
    dispatch({ type: APP_ACTIONS.TOGGLE_SIDEBAR });
  };

  // Navigation functions
  const setCurrentPage = (page) => {
    dispatch({ type: APP_ACTIONS.SET_CURRENT_PAGE, payload: page });
  };

  // Notification functions
  const addNotification = (notification) => {
    dispatch({ type: APP_ACTIONS.ADD_NOTIFICATION, payload: notification });
    
    // Auto remove notification after 5 seconds for non-error notifications
    if (notification.type !== NOTIFICATION_TYPES.ERROR) {
      setTimeout(() => {
        removeNotification(Date.now());
      }, 5000);
    }
  };

  const removeNotification = (id) => {
    dispatch({ type: APP_ACTIONS.REMOVE_NOTIFICATION, payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: APP_ACTIONS.CLEAR_NOTIFICATIONS });
  };

  // Helper function to show success notification
  const showSuccess = (message, title = 'Success') => {
    addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      title,
      message
    });
  };

  // Helper function to show error notification
  const showError = (message, title = 'Error') => {
    addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      title,
      message
    });
  };

  // Helper function to show warning notification
  const showWarning = (message, title = 'Warning') => {
    addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      title,
      message
    });
  };

  // Helper function to show info notification
  const showInfo = (message, title = 'Information') => {
    addNotification({
      type: NOTIFICATION_TYPES.INFO,
      title,
      message
    });
  };

  // Loading and error functions
  const setLoading = (loading) => {
    dispatch({ type: APP_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: APP_ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: APP_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    toggleSidebar,
    setCurrentPage,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    setLoading,
    setError,
    clearError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
