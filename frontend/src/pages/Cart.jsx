import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useContext(StoreContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item._id} style={{ marginBottom: '10px' }}>
          {item.name} - ₹{item.price} x {item.quantity}
          <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: '10px' }}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <Link to='/checkout'>Go to Checkout</Link>
    </div>
  );
}

export default Cart;