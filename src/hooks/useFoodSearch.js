// src/hooks/useFoodSearch.js (same as Part 2, but ensure Axios is used)
import { useState } from 'react';
import axios from 'axios';

const useFoodSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFood = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const url = 'https://world.openfoodfacts.org/cgi/search.pl';
      const response = await axios.get(url, {
        params: {
          search_terms: query,
          search_simple: 1,
          action: 'process',
          json: 1,
          page_size: 20
        }
      });
      const products = response.data.products;
      const filtered = products.filter(p => p.product_name && p.product_name.trim() !== '');
      setResults(filtered);
    } catch (err) {
      if (err.response) setError('Server error');
      else if (err.request) setError('Network error');
      else setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchFood };
};

export default useFoodSearch;