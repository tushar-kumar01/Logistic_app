import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    status: '',
    sortBy: 'name',
    sortOrder: 'asc'
  },
  selectedItems: [],
  totalItems: 0,
  lowStockThreshold: 10
};

// Action types
const INVENTORY_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_ITEMS: 'LOAD_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SELECT_ITEM: 'SELECT_ITEM',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  BULK_UPDATE: 'BULK_UPDATE'
};

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: 1,
    code: 'EQ-0923',
    name: 'Fuel Drum (200L)',
    category: 'Fuel',
    quantity: 120,
    minQuantity: 20,
    maxQuantity: 200,
    unit: 'Drums',
    location: 'Warehouse A-1',
    supplier: 'Bharat Petroleum',
    cost: 8500,
    lastUpdated: '2025-06-24T10:30:00Z',
    expiryDate: '2026-06-24',
    status: 'Available'
  },
  {
    id: 2,
    code: 'EQ-1284',
    name: 'Rifle Cleaning Oil',
    category: 'Maintenance',
    quantity: 0,
    minQuantity: 5,
    maxQuantity: 50,
    unit: 'Bottles',
    location: 'Warehouse B-2',
    supplier: 'Defence Supplies',
    cost: 250,
    lastUpdated: '2025-06-20T14:15:00Z',
    expiryDate: '2027-01-15',
    status: 'Out of Stock'
  },
  {
    id: 3,
    code: 'EQ-3012',
    name: 'Vehicle Tyre Kit',
    category: 'Vehicle Parts',
    quantity: 8,
    minQuantity: 10,
    maxQuantity: 100,
    unit: 'Sets',
    location: 'Warehouse C-3',
    supplier: 'MRF Limited',
    cost: 12000,
    lastUpdated: '2025-06-22T09:45:00Z',
    expiryDate: null,
    status: 'Low Stock'
  },
  {
    id: 4,
    code: 'EQ-2156',
    name: 'Combat Ration Packs',
    category: 'Food',
    quantity: 500,
    minQuantity: 100,
    maxQuantity: 1000,
    unit: 'Packs',
    location: 'Cold Storage-1',
    supplier: 'Army Supplies Corp',
    cost: 180,
    lastUpdated: '2025-06-25T16:20:00Z',
    expiryDate: '2025-12-31',
    status: 'Available'
  },
  {
    id: 5,
    code: 'EQ-8847',
    name: 'First Aid Medical Kit',
    category: 'Medical',
    quantity: 15,
    minQuantity: 20,
    maxQuantity: 100,
    unit: 'Kits',
    location: 'Medical Store',
    supplier: 'Johnson & Johnson',
    cost: 2500,
    lastUpdated: '2025-06-23T11:10:00Z',
    expiryDate: '2026-08-15',
    status: 'Low Stock'
  },
  {
    id: 6,
    code: 'EQ-4521',
    name: 'Camouflage Netting',
    category: 'Equipment',
    quantity: 75,
    minQuantity: 15,
    maxQuantity: 150,
    unit: 'Rolls',
    location: 'Warehouse D-4',
    supplier: 'Textile Mills',
    cost: 3200,
    lastUpdated: '2025-06-21T13:30:00Z',
    expiryDate: null,
    status: 'Available'
  }
];

const CATEGORIES = [
  'Fuel', 'Maintenance', 'Vehicle Parts', 'Food', 'Medical', 'Equipment', 'Ammunition', 'Communication'
];

// Helper function to determine item status
const getItemStatus = (item) => {
  if (item.quantity === 0) return 'Out of Stock';
  if (item.quantity <= item.minQuantity) return 'Low Stock';
  if (item.quantity >= item.maxQuantity * 0.9) return 'Overstocked';
  return 'Available';
};

// Reducer function
const inventoryReducer = (state, action) => {
  switch (action.type) {
    case INVENTORY_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case INVENTORY_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case INVENTORY_ACTIONS.LOAD_ITEMS:
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.length,
        loading: false,
        error: null
      };
    
    case INVENTORY_ACTIONS.ADD_ITEM:
      const newItem = {
        ...action.payload,
        id: Date.now(),
        lastUpdated: new Date().toISOString(),
        status: getItemStatus(action.payload)
      };
      return {
        ...state,
        items: [...state.items, newItem],
        totalItems: state.totalItems + 1
      };
    
    case INVENTORY_ACTIONS.UPDATE_ITEM:
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              ...action.payload,
              lastUpdated: new Date().toISOString(),
              status: getItemStatus({ ...item, ...action.payload })
            }
          : item
      );
      return { ...state, items: updatedItems };
    
    case INVENTORY_ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalItems: state.totalItems - 1,
        selectedItems: state.selectedItems.filter(id => id !== action.payload)
      };
    
    case INVENTORY_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case INVENTORY_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          search: '',
          category: '',
          status: '',
          sortBy: 'name',
          sortOrder: 'asc'
        }
      };
    
    case INVENTORY_ACTIONS.SELECT_ITEM:
      const isSelected = state.selectedItems.includes(action.payload);
      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(id => id !== action.payload)
          : [...state.selectedItems, action.payload]
      };
    
    case INVENTORY_ACTIONS.CLEAR_SELECTION:
      return { ...state, selectedItems: [] };
    
    case INVENTORY_ACTIONS.BULK_UPDATE:
      const bulkUpdatedItems = state.items.map(item =>
        state.selectedItems.includes(item.id)
          ? {
              ...item,
              ...action.payload,
              lastUpdated: new Date().toISOString(),
              status: getItemStatus({ ...item, ...action.payload })
            }
          : item
      );
      return {
        ...state,
        items: bulkUpdatedItems,
        selectedItems: []
      };
    
    default:
      return state;
  }
};

// Create context
const InventoryContext = createContext();

// Inventory provider component
export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  // Load inventory data on mount
  useEffect(() => {
    loadInventory();
  }, []);

  // Load inventory from localStorage or use mock data
  const loadInventory = () => {
    dispatch({ type: INVENTORY_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const savedInventory = localStorage.getItem('logisticsInventory');
      const items = savedInventory ? JSON.parse(savedInventory) : MOCK_INVENTORY;
      
      // Update status for all items
      const itemsWithStatus = items.map(item => ({
        ...item,
        status: getItemStatus(item)
      }));
      
      dispatch({ type: INVENTORY_ACTIONS.LOAD_ITEMS, payload: itemsWithStatus });
    } catch (error) {
      dispatch({ type: INVENTORY_ACTIONS.SET_ERROR, payload: 'Failed to load inventory' });
    }
  };

  // Save inventory to localStorage
  const saveInventory = (items) => {
    try {
      localStorage.setItem('logisticsInventory', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save inventory:', error);
    }
  };

  // Add new item
  const addItem = (itemData) => {
    dispatch({ type: INVENTORY_ACTIONS.ADD_ITEM, payload: itemData });
    saveInventory([...state.items, itemData]);
  };

  // Update item
  const updateItem = (id, updates) => {
    dispatch({ type: INVENTORY_ACTIONS.UPDATE_ITEM, payload: { id, ...updates } });
    const updatedItems = state.items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveInventory(updatedItems);
  };

  // Delete item
  const deleteItem = (id) => {
    dispatch({ type: INVENTORY_ACTIONS.DELETE_ITEM, payload: id });
    const filteredItems = state.items.filter(item => item.id !== id);
    saveInventory(filteredItems);
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: INVENTORY_ACTIONS.SET_FILTERS, payload: filters });
  };

  // Clear filters
  const clearFilters = () => {
    dispatch({ type: INVENTORY_ACTIONS.CLEAR_FILTERS });
  };

  // Select/deselect item
  const toggleItemSelection = (id) => {
    dispatch({ type: INVENTORY_ACTIONS.SELECT_ITEM, payload: id });
  };

  // Clear selection
  const clearSelection = () => {
    dispatch({ type: INVENTORY_ACTIONS.CLEAR_SELECTION });
  };

  // Bulk update selected items
  const bulkUpdate = (updates) => {
    dispatch({ type: INVENTORY_ACTIONS.BULK_UPDATE, payload: updates });
    const updatedItems = state.items.map(item =>
      state.selectedItems.includes(item.id) ? { ...item, ...updates } : item
    );
    saveInventory(updatedItems);
  };

  // Get filtered and sorted items
  const getFilteredItems = () => {
    let filtered = [...state.items];

    // Apply search filter
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.code.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (state.filters.category) {
      filtered = filtered.filter(item => item.category === state.filters.category);
    }

    // Apply status filter
    if (state.filters.status) {
      filtered = filtered.filter(item => item.status === state.filters.status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const { sortBy, sortOrder } = state.filters;
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // Get analytics data
  const getAnalytics = () => {
    const items = state.items;
    const total = items.length;
    const available = items.filter(item => item.status === 'Available').length;
    const lowStock = items.filter(item => item.status === 'Low Stock').length;
    const outOfStock = items.filter(item => item.status === 'Out of Stock').length;
    const overstocked = items.filter(item => item.status === 'Overstocked').length;

    const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.cost), 0);

    return {
      total,
      available,
      lowStock,
      outOfStock,
      overstocked,
      totalValue,
      categories: CATEGORIES.length
    };
  };

  const value = {
    ...state,
    categories: CATEGORIES,
    addItem,
    updateItem,
    deleteItem,
    setFilters,
    clearFilters,
    toggleItemSelection,
    clearSelection,
    bulkUpdate,
    getFilteredItems,
    getAnalytics,
    loadInventory
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export default InventoryContext;
