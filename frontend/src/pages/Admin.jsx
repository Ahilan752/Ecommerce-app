import { useState } from 'react';
import API from '../api';

function Admin() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post('/products', { ...product, price: Number(product.price), stock: Number(product.stock) });
    alert('Product added');
  };

  return (
    <form onSubmit={submitHandler} style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Admin - Add Product</h2>
      {Object.keys(product).map((key) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <input
            placeholder={key}
            value={product[key]}
            onChange={(e) => setProduct({ ...product, [key]: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>
      ))}
      <button type='submit'>Add Product</button>
    </form>
  );
}

export default Admin;