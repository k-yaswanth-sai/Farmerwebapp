import { useAuth } from '../../AuthContext';
import { read } from '../../storage';

export default function Orders() {
  const { user } = useAuth();
  const orders = read('orders', []).filter((o) => o.userEmail === user.email).reverse();
  return (
    <div className="page">
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : orders.map((o) => (
        <div key={o.id} className="order">
          <b>Order #{o.id}</b> | {new Date(o.date).toLocaleString()} | {o.status}
          <ul>{o.items.map((i) => <li key={i.id}>{i.name} × {i.qty} = ₹{i.price * i.qty}</li>)}</ul>
          <b>Total: ₹{o.total}</b>
        </div>
      ))}
    </div>
  );
}
