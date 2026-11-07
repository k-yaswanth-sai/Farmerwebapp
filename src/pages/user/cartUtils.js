import { read, write } from '../../storage';

export const getCart = (email) => read(`cart_${email}`, []);
export const saveCart = (email, cart) => write(`cart_${email}`, cart);

export function addToCart(email, p) {
  const cart = getCart(email);
  const item = cart.find((c) => c.id === p.id);
  if (item) {
    if (item.qty < p.quantity) item.qty += 1;
  } else {
    cart.push({ id: p.id, name: p.name, category: p.category, price: p.price, unit: p.unit, qty: 1 });
  }
  saveCart(email, cart);
}
