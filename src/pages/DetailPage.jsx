import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorMessage from '../components/ErrorMessage';
import NutritionRow from '../components/NutritionRow';
import { addItem, removeItem } from '../store/savedSlice';

function DetailPage() {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);
  const isSaved = savedItems.some(item => item.code === barcode);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
        const response = await axios.get(url);
        if (response.data.status === 1) {
          if (!cancelled) setProduct(response.data.product);
        } else {
          if (!cancelled) setError('Product not found');
        }
      } catch {
        if (!cancelled) setError('Failed to load product details');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProduct();
    return () => { cancelled = true; };
  }, [barcode]);

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(barcode));
    } else {
      dispatch(addItem(product));
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="No product data" />;

  const nut = product.nutriments || {};

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Back</Button>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
          <img
            src={product.image_front_small_url || product.image_small_url || 'https://via.placeholder.com/200'}
            alt={product.product_name}
            style={{ width: '200px', height: 'auto', borderRadius: '12px', alignSelf: 'center' }}
          />
          <Box flex={1}>
            <Typography variant="h4" gutterBottom>{product.product_name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Brand: {product.brands || 'Unknown'}
            </Typography>
            <Typography variant="h6" gutterBottom>Nutrition per 100g</Typography>
            <NutritionRow label="Energy (kcal)" value={nut['energy-kcal_100g']} />
            <NutritionRow label="Protein" value={nut.proteins_100g} />
            <NutritionRow label="Carbohydrates" value={nut.carbohydrates_100g} />
            <NutritionRow label="Fat" value={nut.fat_100g} />
            <NutritionRow label="Sugars" value={nut.sugars_100g} />
            <NutritionRow label="Fiber" value={nut.fiber_100g} />
            <Button
              variant="contained"
              color={isSaved ? 'secondary' : 'primary'}
              onClick={handleSaveToggle}
              sx={{ mt: 3 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save for Later'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default DetailPage;