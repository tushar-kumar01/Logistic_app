import React from 'react';
import { useApp, NOTIFICATION_TYPES } from '../../context';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  const getNotificationStyle = (type) => {
    const baseStyle = "flex items-center p-4 mb-4 rounded-lg shadow-lg max-w-sm";
    
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return `${baseStyle} bg-green-100 border border-green-200 text-green-800`;
      case NOTIFICATION_TYPES.ERROR:
        return `${baseStyle} bg-red-100 border border-red-200 text-red-800`;
      case NOTIFICATION_TYPES.WARNING:
        return `${baseStyle} bg-yellow-100 border border-yellow-200 text-yellow-800`;
      case NOTIFICATION_TYPES.INFO:
        return `${baseStyle} bg-blue-100 border border-blue-200 text-blue-800`;
      default:
        return `${baseStyle} bg-gray-100 border border-gray-200 text-gray-800`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return '✅';
      case NOTIFICATION_TYPES.ERROR:
        return '❌';
      case NOTIFICATION_TYPES.WARNING:
        return '⚠️';
      case NOTIFICATION_TYPES.INFO:
        return 'ℹ️';
      default:
        return '📝';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={getNotificationStyle(notification.type)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 text-xl mr-3">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-3 text-lg hover:opacity-70 transition-opacity"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
