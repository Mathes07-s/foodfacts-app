import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSaved = saved.some(p => p.code === barcode);

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
      dispatch({ type: 'REMOVE', productCode: barcode });
    } else {
      dispatch({ type: 'ADD', product: product });
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="No product data" />;

  const nut = product.nutriments || {};
  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-card">
        <img src={product.image_front_small_url || product.image_small_url || 'https://via.placeholder.com/200'} alt={product.product_name} />
        <h2>{product.product_name}</h2>
        <p><strong>Brand:</strong> {product.brands || 'Unknown'}</p>
        <div className="nutrition-detail">
          <h3>Nutrition per 100g</h3>
          <p>🔥 Energy: {nut['energy-kcal_100g'] || 'N/A'} kcal</p>
          <p>💪 Protein: {nut.proteins_100g || 'N/A'} g</p>
          <p>🍞 Carbs: {nut.carbohydrates_100g || 'N/A'} g</p>
          <p>🧈 Fat: {nut.fat_100g || 'N/A'} g</p>
          <p>🍬 Sugars: {nut.sugars_100g || 'N/A'} g</p>
          <p>🌾 Fiber: {nut.fiber_100g || 'N/A'} g</p>
        </div>
        <button className="save-btn" onClick={handleSaveToggle}>
          {isSaved ? 'Remove from Saved' : 'Save for Later'}
        </button>
      </div>
    </div>
  );
}

export default DetailPage;