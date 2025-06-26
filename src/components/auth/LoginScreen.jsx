import React, { useState, useEffect } from 'react';
import { useAuth, useApp } from '../../context';
import { useForm } from '../../hooks/useCustomHooks';

const LoginScreen = () => {
  const { login, loading, error, clearError } = useAuth();
  const { showError, showSuccess } = useApp();
  const [showCredentials, setShowCredentials] = useState(false);

  const validationRules = {
    username: {
      required: true,
      minLength: 3
    },
    password: {
      required: true,
      minLength: 3
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateAll,
    reset
  } = useForm({
    username: '',
    password: '',
    otp: ''
  }, validationRules);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      showError('Please fix the validation errors');
      return;
    }

    try {
      const result = await login(values);
      if (result.success) {
        showSuccess('Login successful!', 'Welcome');
        reset();
      }
    } catch (err) {
      showError(err.message || 'Login failed');
    }
  };

  const demoCredentials = [
    { username: 'admin', password: 'admin123', role: 'Administrator' },
    { username: 'commander', password: 'cmd123', role: 'Commander' },
    { username: 'operator', password: 'op123', role: 'Operator' },
    { username: 'viewer', password: 'view123', role: 'Viewer' }
  ];

  const fillDemoCredentials = (demo) => {
    handleChange('username', demo.username);
    handleChange('password', demo.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">🛡️</div>
            <h1 className="text-2xl font-bold text-gray-800">
              Military Logistics Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Secure access for authorized personnel only</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username/Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                }`}
                value={values.username}
                onChange={(e) => handleChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                disabled={loading}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP (Optional)
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={values.otp}
                onChange={(e) => handleChange('otp', e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Logging in...
                </div>
              ) : (
                '🔐 Login'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Demo Credentials
            </button>
          </div>
        </form>

        {showCredentials && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
            <div className="space-y-2">
              {demoCredentials.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(demo)}
                  className="w-full text-left p-2 text-xs bg-white border rounded hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  <div className="font-medium">{demo.role}</div>
                  <div className="text-gray-500">{demo.username} / {demo.password}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-xs text-gray-500">
          <p>🔒 Secure military-grade authentication</p>
          <p className="mt-1">© 2025 Indian Army Logistics Command</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
