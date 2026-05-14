import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setValidationError('Please enter a food name');
      return;
    }
    if (trimmed.length < 2) {
      setValidationError('Minimum 2 characters');
      return;
    }
    setValidationError('');
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a food (e.g., banana, oats)..."
        className="search-input"
      />
      <button type="submit" className="search-btn">Search</button>
      {validationError && <div className="validation-error">{validationError}</div>}
    </form>
  );
}

export default SearchBar;