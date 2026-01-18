
import { ShoeCategory, Product } from './types';

/**
 * SPRITE SHEET CONFIGURATION
 * Optimized Grid: 10 Columns x 9 Rows
 */
export const SPRITE_SHEET_URL = 'shoes.png';
export const SPRITE_COLS = 10;
export const SPRITE_ROWS = 9;

const createProduct = (
  globalIndex: number
): Product => {
  let brand = 'Premium';
  if (globalIndex < 20) brand = 'Adidas';
  else if (globalIndex < 40) brand = 'Asics';
  else if (globalIndex < 60) brand = 'New Balance';
  else brand = 'Nike';

  const categories = [
    ShoeCategory.RUNNING, 
    ShoeCategory.LIFESTYLE, 
    ShoeCategory.BASKETBALL, 
    ShoeCategory.OUTDOOR
  ];
  const category = categories[globalIndex % categories.length];

  const prefixes = ['Aero', 'Vortex', 'Zenith', 'Nova', 'Titan', 'Kinetic', 'Onyx', 'Crest', 'Flux', 'Apex'];
  const suffixes = ['V-LAB', 'Elite', 'Prime', 'Core', 'Shift', 'Ultima', 'Pro', 'Edition'];
  
  const name = `${prefixes[globalIndex % prefixes.length]} ${suffixes[globalIndex % suffixes.length]} #${globalIndex + 1}`;
  const genderPool = ['unisex', 'men', 'women'];
  
  return {
    id: `shoe-${globalIndex + 1}`,
    name,
    brand,
    price: 85 + (globalIndex * 2.5),
    description: `Archive entry #${globalIndex + 1}. A unique silhouette from our proprietary collection, featuring high-fidelity architectural detailing and performance-grade materials.`,
    category,
    images: [SPRITE_SHEET_URL], 
    spriteIndex: globalIndex,
    sizes: [7, 8, 8.5, 9, 10, 11, 12],
    colors: ['Original Palette'],
    rating: 4.0 + (Math.random() * 1.0),
    reviewsCount: 12 + Math.floor(Math.random() * 200),
    features: ['High-Fidelity Mesh', 'Anatomical Support', 'Kinetic Sole Architecture'],
    tags: ['unique', genderPool[globalIndex % 3]],
    keywords: [brand.toLowerCase(), category.toLowerCase(), 'archive']
  };
};

/**
 * Generate the master collection products.
 * Total items: 82 unique silhouettes.
 */
export const MOCK_PRODUCTS: Product[] = Array.from({ length: 82 }, (_, i) => createProduct(i));

export const FALLBACK_SHOE_URL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Cpath d="M20 50 L80 50 M50 20 L50 80" stroke="%23d1d5db" stroke-width="2"/%3E%3C/svg%3E';
