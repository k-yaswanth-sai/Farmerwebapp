import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import Products from './pages/user/Products';
import Cart from './pages/user/Cart';
import Orders from './pages/user/Orders';
import ManageProducts from './pages/admin/ManageProducts';
import Sales from './pages/admin/Sales';
import Trends from './pages/admin/Trends';

function Protected({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Protected role="user"><Cart /></Protected>} />
        <Route path="/orders" element={<Protected role="user"><Orders /></Protected>} />

        <Route path="/admin/products" element={<Protected role="admin"><ManageProducts /></Protected>} />
        <Route path="/admin/sales" element={<Protected role="admin"><Sales /></Protected>} />
        <Route path="/admin/trends" element={<Protected role="admin"><Trends /></Protected>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
