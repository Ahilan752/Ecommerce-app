import { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Our Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;