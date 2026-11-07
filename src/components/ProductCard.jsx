import { useState } from 'react';
import { imgSrc } from '../imageUtils';

export default function ProductCard({ p, onAdd }) {
  const src = imgSrc(p.image);
  const [failed, setFailed] = useState(false);
  return (
    <div className="card">
      {src && !failed ? (
        <img src={src} alt={p.name} onError={() => setFailed(true)} />
      ) : (
        <div className="emoji">{src ? '🧺' : p.image || '🧺'}</div>
      )}
      <b>{p.name}</b><br />
      <small>{p.category} | by {p.farmer}</small><br />
      <small>{p.description}</small><br />
      ₹{p.price}/{p.unit}<br />
      <small>{p.quantity > 0 ? `${p.quantity} ${p.unit} available` : 'Out of stock'}</small><br />
      <button disabled={p.quantity <= 0} onClick={() => onAdd(p)}>Add to Cart</button>
    </div>
  );
}
