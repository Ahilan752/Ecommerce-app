import { useContext, useState } from 'react';
import API from '../api';
import { StoreContext } from '../context/StoreContext';

function Checkout() {
  const { cart, setCart, user } = useContext(StoreContext);
  const [address, setAddress] = useState('');

  const placeOrder = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await API.post('/orders', {
      items: cart,
      totalAmount,
      address
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });

    alert('Order placed successfully');
    setCart([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <textarea placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} />
      <br /><br />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;