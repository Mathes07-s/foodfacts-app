import { useNavigate } from 'react-router-dom';

function FoodCard({ product }) {
  const navigate = useNavigate();
  const { product_name, brands, nutriments = {}, image_small_url, code } = product;

  const calories = nutriments['energy-kcal_100g'] || 'N/A';
  const protein = nutriments.proteins_100g || 'N/A';
  const carbs = nutriments.carbohydrates_100g || 'N/A';
  const fat = nutriments.fat_100g || 'N/A';

  const handleClick = () => {
    navigate(`/product/${code}`);
  };

  return (
    <div className="food-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={image_small_url || 'https://via.placeholder.com/100'} alt={product_name || 'Food'} className="food-image" />
      <div className="food-details">
        <h3>{product_name || 'Unknown product'}</h3>
        <p className="brand">{brands || 'No brand'}</p>
        <div className="nutrition">
          <span>🔥 {calories} kcal</span>
          <span>💪 {protein}g protein</span>
          <span>🍞 {carbs}g carbs</span>
          <span>🧈 {fat}g fat</span>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;