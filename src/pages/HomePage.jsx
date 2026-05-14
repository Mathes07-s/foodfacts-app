import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Any Food
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Get real nutrition facts from Open Food Facts
      </Typography>
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {error && <ErrorMessage message={error} />}

      {!loading && !searched && !error && (
        <Box textAlign="center" py={8}>
          <Typography variant="body1">✨ Type a food name above and hit Search ✨</Typography>
        </Box>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <Box textAlign="center" py={8}>
          <Typography variant="body1">😕 No results found. Try another food.</Typography>
        </Box>
      )}

      {!loading && results.length > 0 && <FoodList products={results} />}
    </Container>
  );
}

export default HomePage;