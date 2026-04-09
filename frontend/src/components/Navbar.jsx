import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#111', color: '#fff' }}>
      <Link to='/' style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>ShopEasy</Link>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to='/cart' style={{ color: '#fff' }}>Cart</Link>
        <Link to='/login' style={{ color: '#fff' }}>Login</Link>
        <Link to='/register' style={{ color: '#fff' }}>Register</Link>
        <Link to='/admin' style={{ color: '#fff' }}>Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;