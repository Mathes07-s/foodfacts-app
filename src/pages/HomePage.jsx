import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FoodList from '../components/FoodList';
import ErrorMessage from '../components/ErrorMessage';
import useFoodSearch from '../hooks/useFoodSearch';

function HomePage() {
  const [searched, setSearched] = useState(false);
  const { results, loading, error, searchFood } = useFoodSearch();

  const handleSearch = (query) => {
    searchFood(query);
    setSearched(true);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>🍎 FoodFacts</h1>
        <p>Search any food – get real nutrition data</p>
      </header>
      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Loading...</div>}
      {error && <ErrorMessage message={error} />}

      {!loading && !searched && !error && (
        <div className="empty-state">
          <p>✨ Type a food name above and hit Search ✨</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <div className="empty-state">
          <p>😕 No results found. Try another food.</p>
        </div>
      )}

      {!loading && results.length > 0 && <FoodList products={results} />}
    </div>
  );
}

export default HomePage;