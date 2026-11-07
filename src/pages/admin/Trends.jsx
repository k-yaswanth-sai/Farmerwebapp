import { read } from '../../storage';
import ChartBox from '../../components/ChartBox';

export default function Trends() {
  const orders = read('orders', []);
  const revenueByProduct = {}, demandByCategory = {}, revenueByDate = {};

  orders.forEach((o) => {
    const day = o.date.slice(0, 10);
    revenueByDate[day] = (revenueByDate[day] || 0) + o.total;
    o.items.forEach((i) => {
      revenueByProduct[i.name] = (revenueByProduct[i.name] || 0) + i.qty * i.price;
      demandByCategory[i.category] = (demandByCategory[i.category] || 0) + i.qty;
    });
  });

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ products: read('products', []), orders }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'farm-data.json';
    a.click();
  };

  return (
    <div className="page">
      <h2>Market Trends</h2>
      <button onClick={exportJson}>Export Data (JSON)</button>
      {orders.length === 0 ? <p>No sales data yet. Charts appear once buyers place orders.</p> : (
        <div className="charts">
          <ChartBox type="bar" label="Revenue by Product (₹)" labels={Object.keys(revenueByProduct)} data={Object.values(revenueByProduct)} />
          <ChartBox type="pie" label="Demand by Category (units)" labels={Object.keys(demandByCategory)} data={Object.values(demandByCategory)} />
          <ChartBox type="line" label="Revenue Over Time (₹)" labels={Object.keys(revenueByDate).sort()} data={Object.keys(revenueByDate).sort().map((d) => revenueByDate[d])} />
        </div>
      )}
    </div>
  );
}
