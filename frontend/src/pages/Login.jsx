import { useContext, useState } from 'react';
import API from '../api';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', form);
    setUser(res.data);
    navigate('/');
  };

  return (
    <form onSubmit={submitHandler} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <input placeholder='Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <br /><br />
      <input type='password' placeholder='Password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <br /><br />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;