import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { read, write } from '../../storage';
import { getCart, saveCart } from './cartUtils';

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart(user.email));

  const update = (next) => { setCart(next); saveCart(user.email, next); };
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const changeQty = (id, qty) => {
    const stock = read('products', []).find((p) => p.id === id)?.quantity ?? 0;
    const q = Math.max(1, Math.min(stock, Number(qty) || 1));
    update(cart.map((c) => (c.id === id ? { ...c, qty: q } : c)));
  };

  const placeOrder = () => {
    const products = read('products', []);
    for (const c of cart) {
      const p = products.find((x) => x.id === c.id);
      if (!p || p.quantity < c.qty) return alert(`Not enough stock for ${c.name}.`);
    }
    const updated = products.map((p) => {
      const c = cart.find((x) => x.id === p.id);
      return c ? { ...p, quantity: p.quantity - c.qty } : p;
    });
    write('products', updated);
    const orders = read('orders', []);
    write('orders', [...orders, {
      id: Date.now(), userEmail: user.email, userName: user.name,
      date: new Date().toISOString(), items: cart, total, status: 'Confirmed',
    }]);
    update([]);
    alert('Order placed successfully!');
    navigate('/orders');
  };

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <table>
            <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead>
            <tbody>
              {cart.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>₹{c.price}/{c.unit}</td>
                  <td><input type="number" min="1" value={c.qty} onChange={(e) => changeQty(c.id, e.target.value)} style={{ width: 60 }} /></td>
                  <td>₹{c.price * c.qty}</td>
                  <td><button onClick={() => update(cart.filter((x) => x.id !== c.id))}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ₹{total}</h3>
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}
