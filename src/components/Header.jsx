import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const search = () => navigate(`/products?q=${encodeURIComponent(q)}`);

  return (
    <div className="container">
      <div className="section2"><Link to="/" className="logo">🌾 FarmerFriendly</Link></div>

      <div className="section3">
        <input type="text" placeholder="Search farm products" value={q} onChange={(e) => setQ(e.target.value)} />
        <input type="button" value="Search" onClick={search} />
      </div>

      <div className="section4">
        {user ? (
          <>
            <span>Hi, {user.name} ({user.role})</span>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); navigate('/'); }}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
        <Link to="/about">About Us</Link>
      </div>

      <div className="section1">
        <Link to="/">Home</Link>
        {user?.role !== 'admin' && <Link to="/products">Products</Link>}
        {user?.role === 'user' && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin/products">Manage Products</Link>
            <Link to="/admin/sales">Sales Tracking</Link>
            <Link to="/admin/trends">Market Trends</Link>
          </>
        )}
      </div>
    </div>
  );
}
