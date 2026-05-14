import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function FoodCard({ product }) {
  const navigate = useNavigate();
  const { product_name, brands, nutriments = {}, image_small_url, code } = product;
  const calories = nutriments['energy-kcal_100g'] || 'N/A';

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => navigate(`/product/${code}`)}>
        <CardMedia
          component="img"
          height="140"
          image={image_small_url || 'https://via.placeholder.com/140'}
          alt={product_name || 'Food'}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product_name || 'Unknown product'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {brands || 'No brand'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip label={`🔥 ${calories} kcal`} size="small" color="primary" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FoodCard;