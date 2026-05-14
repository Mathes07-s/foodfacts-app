import { createSlice } from '@reduxjs/toolkit';

// Helper: load from localStorage
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('foodfacts-saved');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadFromStorage(),
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.some(item => item.code === action.payload.code);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.code !== action.payload);
    },
  },
});

export const { addItem, removeItem } = savedSlice.actions;
export default savedSlice.reducer;