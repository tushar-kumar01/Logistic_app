import React from 'react';

const SummaryCard = ({ title, value, color, icon }) => {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium opacity-90">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && (
          <div className="text-4xl opacity-80">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
