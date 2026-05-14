import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 4, alignItems: 'flex-start' }}>
      <TextField
        fullWidth
        label="Search for a food"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        error={!!validationError}
        helperText={validationError}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ height: 56 }}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;