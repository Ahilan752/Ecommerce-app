import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(StoreContext);

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '10px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;