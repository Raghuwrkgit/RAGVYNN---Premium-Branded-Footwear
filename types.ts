
export enum ShoeCategory {
  RUNNING = 'Running',
  LIFESTYLE = 'Lifestyle',
  BASKETBALL = 'Basketball',
  OUTDOOR = 'Outdoor'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: ShoeCategory;
  images: string[]; // Still present for compatibility, but we use sprite sheet
  spriteIndex: number; // Index in the shoes.png grid
  sizes: number[];
  colors: string[];
  rating: number;
  reviewsCount: number;
  features: string[];
  tags: string[];
  keywords: string[];
}

export interface GeneratedShoe {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
