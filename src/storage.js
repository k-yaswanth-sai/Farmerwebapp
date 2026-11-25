import { CATALOG } from './catalog';
// Small helpers around localStorage (all data stored as JSON key-value pairs)
export const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
export const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const CATEGORIES = ['Vegetables', 'Grains', 'Dairy', 'Fruits', 'Pulses'];

// Seed demo data on first run
export function seed() {
  if (!localStorage.getItem('users')) {
    write('users', [
      { name: 'Admin Farmer', email: 'admin@farm.com', password: 'admin123', role: 'admin' },
    ]);
  }
  // Seed every catalog product as a listing (re-seeds once when the catalog version changes)
  if (read('seedVersion', 0) !== 3) {
    write('products', CATALOG.map((c, i) => ({
      ...c, id: i + 1, quantity: 100, farmer: 'Admin Farmer',
    })));
    write('seedVersion', 3);
  }
  if (!localStorage.getItem('orders')) write('orders', []);
}
