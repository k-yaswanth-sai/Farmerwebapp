import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { read, CATEGORIES } from '../../storage';
import ProductCard from '../../components/ProductCard';
import { addToCart } from './cartUtils';

export default function Products() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('category') || 'All';
  const maxPrice = params.get('max') || '';
  const inStock = params.get('stock') === '1';

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  const q = search.trim().toLowerCase();
  // Searching "vegetables" matches the category, so every product in it shows up
  const list = read('products', []).filter(
    (p) =>
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)) &&
      (category === 'All' || p.category === category) &&
      (!maxPrice || p.price <= Number(maxPrice)) &&
      (!inStock || p.quantity > 0)
  );

  const handleAdd = (p) => {
    if (!user) return navigate('/login');
    if (user.role !== 'user') return alert('Only buyers (User role) can add to cart.');
    addToCart(user.email, p);
    alert(`${p.name} added to cart`);
  };

  return (
    <div className="page">
      <h2>Browse Products</h2>
      <div className="chips">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} className={c === category ? 'chip active' : 'chip'} onClick={() => setParam('category', c === 'All' ? '' : c)}>{c}</button>
        ))}
      </div>
      <div className="filters">
        <input placeholder="Search name or category..." value={search} onChange={(e) => setParam('q', e.target.value)} />
        <input type="number" placeholder="Max price ₹" value={maxPrice} onChange={(e) => setParam('max', e.target.value)} />
        <label><input type="checkbox" checked={inStock} onChange={(e) => setParam('stock', e.target.checked ? '1' : '')} /> In stock only</label>
      </div>
      <p>{list.length} product(s) found</p>
      <div className="section5">
        {list.map((p) => <ProductCard key={p.id} p={p} onAdd={handleAdd} />)}
      </div>
    </div>
  );
}
