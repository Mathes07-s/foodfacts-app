import { useState } from 'react';
import SearchBar from './components/SearchBar';
import FoodList from './components/FoodList';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearched(true);
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=20`;
      const response = await fetch(url);
      const data = await response.json();
      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      );
      setResults(filtered);
    } catch (error) {
      console.error('Fetch error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🍎 FoodFacts</h1>
        <p>Search any food – get real nutrition data</p>
      </header>
      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Loading...</div>}

      {!loading && !searched && (
        <div className="empty-state">
          <p>✨ Type a food name above and hit Search ✨</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="empty-state">
          <p>😕 No results found. Try another food.</p>
        </div>
      )}

      {!loading && results.length > 0 && <FoodList products={results} />}
    </div>
  );
}

export default App;