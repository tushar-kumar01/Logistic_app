import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define user roles
export const USER_ROLES = {
  ADMIN: 'admin',
  COMMANDER: 'commander',
  OPERATOR: 'operator',
  VIEWER: 'viewer'
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  permissions: []
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOAD_USER: 'LOAD_USER'
};

// Mock user database
const MOCK_USERS = {
  'admin': {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Lt. Col. Sharma',
    email: 'sharma@army.mil.in',
    role: USER_ROLES.ADMIN,
    unit: '621 EME',
    rank: 'Lieutenant Colonel',
    permissions: ['read', 'write', 'delete', 'allocate', 'approve']
  },
  'commander': {
    id: 2,
    username: 'commander',
    password: 'cmd123',
    name: 'Maj. Singh',
    email: 'singh@army.mil.in',
    role: USER_ROLES.COMMANDER,
    unit: '22 Mtn',
    rank: 'Major',
    permissions: ['read', 'write', 'allocate', 'approve']
  },
  'operator': {
    id: 3,
    username: 'operator',
    password: 'op123',
    name: 'Capt. Patel',
    email: 'patel@army.mil.in',
    role: USER_ROLES.OPERATOR,
    unit: '14 Sikh',
    rank: 'Captain',
    permissions: ['read', 'write', 'allocate']
  },
  'viewer': {
    id: 4,
    username: 'viewer',
    password: 'view123',
    name: 'Lt. Kumar',
    email: 'kumar@army.mil.in',
    role: USER_ROLES.VIEWER,
    unit: '18 Cavalry',
    rank: 'Lieutenant',
    permissions: ['read']
  }
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        permissions: action.payload.user.permissions,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        permissions: [],
        error: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        permissions: action.payload.permissions
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('logisticsUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: user });
      } catch (error) {
        localStorage.removeItem('logisticsUser');
      }
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { username, password } = credentials;
      const user = MOCK_USERS[username.toLowerCase()];

      if (!user || user.password !== password) {
        throw new Error('Invalid username or password');
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;
      
      // Save to localStorage
      localStorage.setItem('logisticsUser', JSON.stringify(userWithoutPassword));
      
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: { user: userWithoutPassword } 
      });

      return { success: true };
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_FAILURE, 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('logisticsUser');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check permission function
  const hasPermission = (permission) => {
    return state.permissions.includes(permission);
  };

  // Check role function
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user can access resource
  const canAccess = (requiredPermissions = []) => {
    if (!state.isAuthenticated) return false;
    if (requiredPermissions.length === 0) return true;
    
    return requiredPermissions.every(permission => 
      state.permissions.includes(permission)
    );
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    hasPermission,
    hasRole,
    canAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
