
import React, { useState } from 'react';
import { Product } from '../types';
import SpriteImage from './SpriteImage';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: number, color: string) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white">
      <button 
        onClick={onBack}
        className="group flex items-center text-sm font-bold text-gray-500 hover:text-black mb-10 transition-all"
      >
        <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </div>
        BACK TO COLLECTION
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
        <div className="flex flex-col space-y-6">
          <div className="aspect-square w-full rounded-[40px] overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
            <SpriteImage 
              index={product.spriteIndex} 
              alt={product.name}
              className="w-full h-full hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="flex items-center space-x-2 mb-4">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{tag}</span>
            ))}
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">{product.brand}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 leading-tight">{product.name}</h1>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-4xl font-black text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Specifications</h3>
            <p className="text-base text-gray-600 leading-relaxed font-medium mb-6">Master Identifier #{product.id} • Advanced silhouette from our core archive collection.</p>
          </div>

          <div className="mt-10 pt-10 border-t border-gray-100">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Size (US)</h3>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3.5 flex items-center justify-center rounded-2xl border-2 text-sm font-black transition-all ${
                      selectedSize === size 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105' 
                        : 'bg-white text-gray-900 border-gray-100 hover:border-blue-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                className="flex-1 bg-black border border-transparent rounded-[24px] py-5 px-8 flex items-center justify-center text-lg font-black text-white hover:bg-gray-800 transition-all shadow-2xl active:scale-95"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
