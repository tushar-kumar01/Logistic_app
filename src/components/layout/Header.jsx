import React from 'react';

const Header = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-indigo-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Military Logistics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>User: Capt. Sharma</span>
          <span>Unit: 621 EME</span>
          <button 
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
