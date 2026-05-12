import { useNavigate } from 'react-router-dom';

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate();

  if (saved.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No saved items yet. Search for a food and save it!</p>
      </div>
    );
  }

  return (
    <div className="saved-page">
      <h2>Saved Items</h2>
      <div className="saved-list">
        {saved.map(item => (
          <div key={item.code} className="saved-card">
            <img src={item.image_small_url || 'https://via.placeholder.com/60'} alt={item.product_name} />
            <div className="saved-info">
              <h3>{item.product_name}</h3>
              <p>{item.brands || 'No brand'}</p>
            </div>
            <div className="saved-actions">
              <button onClick={() => navigate(`/product/${item.code}`)}>View</button>
              <button onClick={() => dispatch({ type: 'REMOVE', productCode: item.code })}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPage;