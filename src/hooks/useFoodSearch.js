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
      // Filter out products without a name
      const filtered = products.filter(p => p.product_name && p.product_name.trim() !== '');
      setResults(filtered);
    } catch (err) {
      if (err.response) {
        setError('Server error. Please try again later.');
      } else if (err.request) {
        setError('Network error. Check your internet connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchFood };
};

export default useFoodSearch;