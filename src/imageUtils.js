// Images are plain files in /public/images/products, deployed with the site (GitHub -> Vercel).
// A product only stores the FILE NAME (e.g. "tomato.svg") in localStorage.
const IMG_EXT = /\.(jpe?g|png|webp|gif|svg|avif)$/i;

export const imgSrc = (s) => {
  if (!s) return null;
  const v = s.trim();
  if (v.startsWith('http')) return v;
  if (IMG_EXT.test(v)) {
    const legacyImageMap = {
      'apple.svg': 'apple.jpg',
      'banana.svg': 'banana.jpg',
      'brinjal.svg': 'brinjal.jpg',
      'broccoli.svg': 'broccoli.jpg',
      'butter.svg': 'butter.jpg',
      'capsicum.svg': 'capsicum.jpg',
      'carrot.svg': 'carrot.jpg',
      'chana-dal.svg': 'chanadal.jpg',
      'corn.svg': 'corn.jpg',
      'cucumber.svg': 'cucumber.jpg',
      'curd.svg': 'curd.jpg',
      'garlic.svg': 'garlic.jpg',
      'ghee.svg': 'ghee.jpg',
      'grapes.svg': 'grapes.jpg',
      'green-chilli.svg': 'greenchilli.jpg',
      'groundnuts.svg': 'groundnut.jpg',
      'jowar.svg': 'jowar.jpg',
      'lemon.svg': 'lemon.jpg',
      'maize.svg': 'maize.jpg',
      'mango.svg': 'mango.jpg',
      'masoor-dal.svg': 'masoordal.jpg',
      'milk.svg': 'milk.jpg',
      'moong-dal.svg': 'moongdal.jpg',
      'onion.svg': 'onion.jpg',
      'orange.svg': 'orange.jpg',
      'paneer.svg': 'paneer.jpg',
      'pear.svg': 'pear.jpg',
      'pineapple.svg': 'pineapple.jpg',
      'potato.svg': 'potato.jpg',
      'ragi.svg': 'ragi.jpg',
      'rice.svg': 'rice.jpg',
      'spinach.svg': 'spinach.jpg',
      'strawberry.svg': 'strawberry.jpg',
      'tomato.svg': 'tomato.jpg',
      'toor-dal.svg': 'toordal.jpg',
      'urad-dal.svg': 'uraddal.jpg',
      'watermelon.svg': 'watermelon.jpg',
      'wheat.svg': 'wheat.jpg',
    };
    return `/images/products/${legacyImageMap[v] || v}`;
  }
  return null;
};
