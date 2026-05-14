import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SavedPage from './pages/SavedPage';
import './App.css';

// Reducer for saved items
const savedReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Prevent duplicates
      if (state.some(item => item.code === action.product.code)) return state;
      return [...state, action.product];
    case 'REMOVE':
      return state.filter(item => item.code !== action.productCode);
    default:
      return state;
  }
};

function App() {
  const [saved, dispatch] = useReducer(savedReducer, []);

  return (
    <div className="app">
      <NavBar savedCount={saved.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={<DetailPage saved={saved} dispatch={dispatch} />} />
        <Route path="/saved" element={<SavedPage saved={saved} dispatch={dispatch} />} />
      </Routes>
    </div>
  );
}

export default App;