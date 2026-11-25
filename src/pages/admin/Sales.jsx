import { read } from '../../storage';

export default function Sales() {
  const orders = read('orders', []);
  const byProduct = {};
  orders.forEach((o) =>
    o.items.forEach((i) => {
      byProduct[i.name] ??= { qty: 0, revenue: 0 };
      byProduct[i.name].qty += i.qty;
      byProduct[i.name].revenue += i.qty * i.price;
    })
  );
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="page">
      <h2>Sales Tracking</h2>
      <div className="stats">
        <div><b>{orders.length}</b><br />Orders</div>
        <div><b>₹{totalRevenue}</b><br />Total Revenue</div>
      </div>

      <h3>Product-wise Revenue</h3>
      <table>
        <thead><tr><th>Product</th><th>Units Sold</th><th>Revenue</th></tr></thead>
        <tbody>
          {Object.entries(byProduct).map(([n, v]) => <tr key={n}><td>{n}</td><td>{v.qty}</td><td>₹{v.revenue}</td></tr>)}
          {!Object.keys(byProduct).length && <tr><td colSpan="3">No sales yet.</td></tr>}
        </tbody>
      </table>

      <h3>Sales History (Buyer Details)</h3>
      <table>
        <thead><tr><th>Date</th><th>Buyer</th><th>Email</th><th>Delivery Address</th><th>Items</th><th>Total</th></tr></thead>
        <tbody>
          {[...orders].reverse().map((o) => (
            <tr key={o.id}>
              <td>{new Date(o.date).toLocaleString()}</td><td>{o.userName}</td><td>{o.userEmail}</td>
              <td>
                {o.delivery
                  ? `${o.delivery.fullName}, ${o.delivery.phone}, ${o.delivery.address}, ${o.delivery.city}, ${o.delivery.state} - ${o.delivery.pincode}`
                  : 'Not provided'}
              </td>
              <td>{o.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}</td><td>₹{o.total}</td>
            </tr>
          ))}
          {!orders.length && <tr><td colSpan="6">No sales yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
