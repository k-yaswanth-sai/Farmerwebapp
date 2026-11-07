import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { read } from '../storage';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields.');
    const err = login(email.trim(), password);
    if (err) return setError(err);
    const me = read('currentUser', null);
    navigate(me.role === 'admin' ? '/admin/products' : '/products');
  };

  return (
    <div className="formbox">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>New here? <Link to="/signup">Create an account</Link></p>
      <p className="hint">Demo admin: admin@farm.com / admin123</p>
    </div>
  );
}
