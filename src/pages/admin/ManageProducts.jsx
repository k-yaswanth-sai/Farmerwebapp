import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { read, write, CATEGORIES } from '../../storage';
import { CATALOG } from '../../catalog';
import { imgSrc } from '../../imageUtils';

const empty = { name: '', category: 'Vegetables', price: '', quantity: '', unit: 'kg', description: '', image: '' };

export default function ManageProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState(read('products', []));
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = (list) => {
    try { write('products', list); setProducts(list); }
    catch { setError('Browser storage is full. Delete some products.'); }
  };

  // Pick a ready-made product: name, category, unit, image and suggested price are filled in
  const pickFromCatalog = (e) => {
    const item = CATALOG.find((c) => c.name === e.target.value);
    if (item) setForm({ ...form, name: item.name, category: item.category, unit: item.unit, price: item.price, image: item.image, description: item.description });
  };

  const submit = (e) => {
    e.preventDefault();
    const price = Number(form.price), quantity = Number(form.quantity);
    if (!form.name.trim()) return setError('Name is required.');
    if (!(price > 0)) return setError('Price must be a positive number.');
    if (!(Number.isInteger(quantity) && quantity > 0)) return setError('Quantity must be a positive whole number.');
    setError('');
    const data = { ...form, name: form.name.trim(), price, quantity };
    if (editId) save(products.map((p) => (p.id === editId ? { ...p, ...data } : p)));
    else save([...products, { ...data, id: Date.now(), farmer: user.name }]);
    setForm(empty); setEditId(null);
  };

  const edit = (p) => { setEditId(p.id); setForm(p); window.scrollTo(0, 0); };
  const remove = (id) => { if (confirm('Delete this product?')) save(products.filter((p) => p.id !== id)); };

  return (
    <div className="page">
      <h2>Manage Products</h2>
      {error && <p className="error">{error}</p>}
      <form className="grid-form" onSubmit={submit}>
        <select value="" onChange={pickFromCatalog} style={{ gridColumn: '1 / -1' }}>
          <option value="">-- Select a product from the catalog (auto-fills image) --</option>
          {CATEGORIES.map((cat) => (
            <optgroup key={cat} label={cat}>
              {CATALOG.filter((c) => c.category === cat).map((c) => <option key={c.name}>{c.name}</option>)}
            </optgroup>
          ))}
        </select>
        <input placeholder="Product name" value={form.name} onChange={set('name')} />
        <select value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input type="number" placeholder="Price (₹)" value={form.price} onChange={set('price')} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={set('quantity')} />
        <select value={form.unit} onChange={set('unit')}>
          <option>kg</option><option>litre</option><option>piece</option><option>dozen</option>
        </select>
        <input placeholder="Description" value={form.description} onChange={set('description')} />
        <div className="imgfield">
          <input placeholder="Image file name (e.g. tomato.svg) or https:// URL" value={form.image} onChange={set('image')} />
          <small>
            Catalog products already have images. For a new product, copy its image into <code>public/images/products</code>,
            push to GitHub, and type the file name here.
          </small>
          {imgSrc(form.image) && <img src={imgSrc(form.image)} alt="preview" width="80" />}
        </div>
        <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
      </form>

      <table>
        <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{imgSrc(p.image) ? <img src={imgSrc(p.image)} alt="" width="50" /> : p.image || '🧺'}</td>
              <td>{p.name}</td><td>{p.category}</td><td>₹{p.price}/{p.unit}</td><td>{p.quantity}</td>
              <td><button onClick={() => edit(p)}>Edit</button> <button onClick={() => remove(p.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
