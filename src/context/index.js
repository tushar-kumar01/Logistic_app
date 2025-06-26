import React from 'react';
import { AuthProvider } from './AuthContext';
import { InventoryProvider } from './InventoryContext';
import { AppProvider } from './AppContext';

// Combined provider component
export const AppProviders = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <InventoryProvider>
          {children}
        </InventoryProvider>
      </AuthProvider>
    </AppProvider>
  );
};

// Export all contexts and hooks
export { useAuth } from './AuthContext';
export { useInventory } from './InventoryContext';
export { useApp, NOTIFICATION_TYPES } from './AppContext';
export { USER_ROLES } from './AuthContext';

export default AppProviders;
