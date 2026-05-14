import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { removeItem } from '../store/savedSlice';

function SavedPage() {
  const savedItems = useSelector((state) => state.saved.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (savedItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6">📭 No saved items yet. Search for a food and save it!</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Saved Items</Typography>
      <Grid container spacing={3}>
        {savedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.code}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image_small_url || 'https://via.placeholder.com/140'}
                alt={item.product_name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.product_name}</Typography>
                <Typography variant="body2" color="text.secondary">{item.brands}</Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <Button size="small" variant="outlined" onClick={() => navigate(`/product/${item.code}`)}>
                  View
                </Button>
                <Button size="small" variant="contained" color="error" onClick={() => dispatch(removeItem(item.code))}>
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SavedPage;