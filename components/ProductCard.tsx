
import React from 'react';
import { Product, ShoeCategory } from '../types';
import SpriteImage from './SpriteImage';
import Logo from './Logo';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onQuickAdd }) => {
  const getStyles = (cat: ShoeCategory) => {
    switch (cat) {
      case ShoeCategory.RUNNING: return { border: "hover:border-blue-300", accent: "text-blue-600", bg: "bg-blue-600" };
      case ShoeCategory.BASKETBALL: return { border: "hover:border-orange-300", accent: "text-orange-600", bg: "bg-orange-600" };
      case ShoeCategory.OUTDOOR: return { border: "hover:border-emerald-300", accent: "text-emerald-600", bg: "bg-emerald-600" };
      default: return { border: "hover:border-gray-900", accent: "text-gray-900", bg: "bg-gray-900" };
    }
  };

  const styles = getStyles(product.category);

  return (
    <div className={`group relative bg-white rounded-[40px] p-5 border border-transparent transition-all duration-500 hover:shadow-2xl flex flex-col h-full ${styles.border}`}>
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50 rounded-[32px] cursor-pointer"
        onClick={() => onClick(product)}
      >
        <SpriteImage 
          index={product.spriteIndex} 
          alt={`${product.brand} ${product.name}`}
          className="h-full w-full transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center space-x-2">
            <Logo iconOnly size="sm" color={styles.accent} className="scale-75" />
            <span className="text-[10px] font-black uppercase tracking-tight text-gray-900">{product.brand}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6 backdrop-blur-[1px]">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}
            className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:text-white active:scale-95"
          >
            Quick Add
          </button>
        </div>
      </div>
      
      <div className="mt-6 px-1 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors uppercase leading-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              {product.category} • {product.tags.find(t => ['men', 'women', 'unisex'].includes(t)) || 'unisex'}
            </p>
          </div>
          <p className={`text-lg font-black tracking-tighter ${styles.accent}`}>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
