import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const COLORS = ['#2e7d32', '#f9a825', '#1565c0', '#c62828', '#6a1b9a', '#00838f', '#ef6c00'];

export default function ChartBox({ type, labels, data, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const isLine = type === 'line';
    const chart = new Chart(ref.current, {
      type,
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: isLine ? '#2e7d32' : COLORS,
          borderColor: isLine ? '#2e7d32' : undefined,
        }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
    return () => chart.destroy();
  }, [type, label, labels.join('|'), data.join('|')]);

  return (
    <div className="chartbox">
      <h3>{label}</h3>
      <div style={{ height: 260 }}><canvas ref={ref} /></div>
    </div>
  );
}
