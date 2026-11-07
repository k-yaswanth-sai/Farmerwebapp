// Images are plain files in /public/images/products, deployed with the site (GitHub -> Vercel).
// A product only stores the FILE NAME (e.g. "tomato.svg") in localStorage.
const IMG_EXT = /\.(jpe?g|png|webp|gif|svg|avif)$/i;

export const imgSrc = (s) => {
  if (!s) return null;
  const v = s.trim();
  if (v.startsWith('http')) return v;
  if (IMG_EXT.test(v)) return `/images/products/${v}`;
  return null;
};
