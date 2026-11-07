import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) return setError('Please fill in all fields.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    const err = signup({ ...form, name: form.name.trim(), email: form.email.trim() });
    if (err) return setError(err);
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="formbox">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <input placeholder="Full name" value={form.name} onChange={set('name')} />
        <input type="email" placeholder="Email" value={form.email} onChange={set('email')} />
        <input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={set('password')} />
        <select value={form.role} onChange={set('role')}>
          <option value="user">User (Buyer)</option>
          <option value="admin">Admin (Farmer)</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
