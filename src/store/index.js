import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './savedSlice';

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('foodfacts-saved', JSON.stringify(state.saved.items));
  } catch (error) {
    console.error('Failed to save to localStorage', error);
  }
});

export default store;