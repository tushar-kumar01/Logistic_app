import React, { useState } from 'react';

const ResourceAllocation = () => {
  const [allocationForm, setAllocationForm] = useState({
    item: '',
    unit: '',
    quantity: '',
    note: ''
  });
  
  const [allocations, setAllocations] = useState([
    { id: 1, item: 'Fuel Drum', unit: '22 Mtn', quantity: 20, date: '24-Jun-25', status: 'Issued' },
    { id: 2, item: 'Spare Tyre', unit: '14 Sikh', quantity: 5, date: '22-Jun-25', status: 'Pending' },
    { id: 3, item: 'Medical Kit', unit: '621 EME', quantity: 3, date: '21-Jun-25', status: 'Issued' },
    { id: 4, item: 'Ration Packs', unit: '22 Mtn', quantity: 50, date: '20-Jun-25', status: 'Pending' }
  ]);

  const handleAllocate = (e) => {
    e.preventDefault();
    if (allocationForm.item && allocationForm.unit && allocationForm.quantity) {
      const newAllocation = {
        id: allocations.length + 1,
        item: allocationForm.item,
        unit: allocationForm.unit,
        quantity: allocationForm.quantity,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }),
        status: 'Pending'
      };
      setAllocations([newAllocation, ...allocations]);
      setAllocationForm({ item: '', unit: '', quantity: '', note: '' });
    }
  };

  const handleCancelAllocation = (id) => {
    setAllocations(allocations.filter(allocation => allocation.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setAllocations(allocations.map(allocation => 
      allocation.id === id ? { ...allocation, status: newStatus } : allocation
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Resource Allocation</h2>
      
      {/* Allocation Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800">New Allocation</h3>
        <form onSubmit={handleAllocate}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={allocationForm.item}
                onChange={(e) => setAllocationForm({...allocationForm, item: e.target.value})}
                required
              >
                <option value="">Select Item</option>
                <option value="Fuel Drum">Fuel Drum</option>
                <option value="Rifle Oil">Rifle Oil</option>
                <option value="Tyre Kit">Tyre Kit</option>
                <option value="Medical Kit">Medical Kit</option>
                <option value="Ration Packs">Ration Packs</option>
                <option value="Spare Tyre">Spare Tyre</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={allocationForm.unit}
                onChange={(e) => setAllocationForm({...allocationForm, unit: e.target.value})}
                required
              >
                <option value="">Select Unit</option>
                <option value="22 Mtn">22 Mtn</option>
                <option value="14 Sikh">14 Sikh</option>
                <option value="621 EME">621 EME</option>
                <option value="15 Punjab">15 Punjab</option>
                <option value="18 Cavalry">18 Cavalry</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={allocationForm.quantity}
                onChange={(e) => setAllocationForm({...allocationForm, quantity: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason/Note</label>
            <input
              type="text"
              placeholder="Optional note about the allocation..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={allocationForm.note}
              onChange={(e) => setAllocationForm({...allocationForm, note: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            📋 Allocate Resource
          </button>
        </form>
      </div>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📦</div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Total Allocations</h3>
              <p className="text-2xl font-bold text-blue-600">{allocations.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {allocations.filter(a => a.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Issued</h3>
              <p className="text-2xl font-bold text-green-600">
                {allocations.filter(a => a.status === 'Issued').length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Allocations Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Recent Allocations</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allocations.map((allocation) => (
              <tr key={allocation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{allocation.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{allocation.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{allocation.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{allocation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(allocation.status)}`}>
                    {allocation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {allocation.status === 'Pending' && (
                      <button 
                        className="text-green-600 hover:text-green-900 transition-colors"
                        onClick={() => handleStatusChange(allocation.id, 'Issued')}
                      >
                        ✅ Issue
                      </button>
                    )}
                    <button 
                      className="text-red-600 hover:text-red-900 transition-colors"
                      onClick={() => handleCancelAllocation(allocation.id)}
                    >
                      🗑️ Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {allocations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No allocations found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceAllocation;
