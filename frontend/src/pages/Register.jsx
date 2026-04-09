import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', form);
    navigate('/login');
  };

  return (
    <form onSubmit={submitHandler} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <br /><br />
      <input placeholder='Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <br /><br />
      <input type='password' placeholder='Password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <br /><br />
      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;