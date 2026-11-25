import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { read, CATEGORIES } from '../storage';
import ProductCard from '../components/ProductCard';
import { addToCart } from './user/cartUtils';
import { BANNERS } from '../banners';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const rawProducts = read('products', []);
  const products = (Array.isArray(rawProducts) ? rawProducts : [])
    .slice()
    .sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '', undefined, { sensitivity: 'base' }))
    .slice(0, 8);

  const sortedCategories = (Array.isArray(CATEGORIES) ? CATEGORIES : [])
    .slice()
    .sort((a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: 'base' }));

  const handleAdd = (p) => {
    if (!user) return navigate('/login');
    if (user.role !== 'user') return alert('Only buyers (User role) can add to cart.');
    addToCart(user.email, p);
    alert(`${p.name} added to cart`);
  };

  return (
    <>
      <section className="banner">
        <div className="slider">
          {BANNERS.map((b) => (
            <img key={b.file} src={`/images/banner/${b.file}`} alt={b.alt} />
          ))}
        </div>
      </section>

      <div className="chips" style={{ justifyContent: 'center', marginTop: 20 }}>
        {sortedCategories.map((c) => (
          <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="chip">
            {c}
          </Link>
        ))}
      </div>

      <div className="section5">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={handleAdd} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to="/products" className="morelink">
          View all products →
        </Link>
      </div>

      <div className="section6">
        <b>Today’s Offers</b>
        <br />
        <br />
        20% off on organic produce
      </div>
    </>
  );
}