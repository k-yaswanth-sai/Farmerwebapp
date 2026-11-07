# Farmer-Friendly Marketplace (React + Vite)

## Run locally
    npm install
    npm run dev

## Roles
- **Admin (Farmer):** manage products (CRUD), sales tracking, market trend charts, JSON export.
- **User (Buyer):** browse/search/filter products, cart, place orders, order history.
- Demo admin login: admin@farm.com / admin123 (or sign up with any role).
- All data (users, products, orders, carts, session) is stored in localStorage.

## Deploy to Vercel
1. Push this folder to GitHub.
2. vercel.com -> Add New Project -> import the repo (Framework: Vite, Build: `npm run build`, Output: `dist`).
3. Deploy. `vercel.json` already handles client-side routing.

## Product catalog and images (no backend)
- `src/catalog.js` lists 39 ready-made products across 5 categories (Vegetables, Fruits, Grains, Dairy, Pulses).
- Their images are in `public/images/products/` and are pushed to GitHub / deployed on Vercel with the site.
- Farmers pick a product from the catalog in Admin > Manage Products; name, category, unit, price and image are auto-filled.
- To add a brand-new product type: add its image to `public/images/products/`, push to GitHub, and type the file name.
- Replace the generated .svg pictures with real photos by using the same file names (update the extension in catalog.js).
- Searching a category name (e.g. "vegetables") lists every product in that category.

## Adding images
- Product images: `public/images/products/` (file name goes in `src/catalog.js` or the Manage Products form).
- Banner images: `public/images/banner/` (file names listed in `src/banners.js`). Use wide images, about 1200x400.
- After adding files: git add . ; git commit -m "add images" ; git push  (Vercel redeploys automatically).
