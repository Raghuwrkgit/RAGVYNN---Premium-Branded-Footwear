
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import SoleLab from './components/SoleLab';
import Logo from './components/Logo';
import { Product, CartItem, ShoeCategory } from './types';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<ShoeCategory | 'All'>('All');
  const [genderFilter, setGenderFilter] = useState<'men' | 'women' | 'unisex' | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'shop' | 'lab'>('shop');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesCategory = filter === 'All' || p.category === filter;
      const matchesGender = genderFilter === 'All' || p.tags.includes(genderFilter);
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q);
      
      return matchesCategory && matchesGender && matchesSearch;
    });
  }, [filter, genderFilter, searchQuery]);

  const addToCart = (product: Product, size: number, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const quickAdd = (product: Product) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => {
          setSelectedProduct(null);
          setFilter('All');
          setGenderFilter('All');
          setSearchQuery('');
          setView('shop');
        }}
      />

      <main className="flex-grow">
        {view === 'lab' ? (
          <SoleLab />
        ) : selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onBack={() => setSelectedProduct(null)} 
          />
        ) : (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 border-b border-gray-100 pb-12">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <Logo iconOnly size="lg" color="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Proprietary Footwear Collection</span>
                </div>
                <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-none">
                  {filter === 'All' ? 'MASTER ARCHIVE' : filter}
                </h2>
                <div className="flex flex-wrap gap-2 mt-8">
                  {['All', 'men', 'women', 'unisex'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGenderFilter(g as any)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        genderFilter === g 
                          ? 'bg-black text-white shadow-xl scale-105' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pb-2">
                {['All', ...Object.values(ShoeCategory)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                      filter === cat 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xl' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={setSelectedProduct} 
                    onQuickAdd={quickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center bg-gray-50 rounded-[64px]">
                <Logo iconOnly size="xl" className="opacity-5 mx-auto mb-8" />
                <h3 className="text-3xl font-black tracking-tight mb-3 uppercase text-gray-900">Search Protocol Failed</h3>
                <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">No silhouettes match your current collection filters.</p>
                <button 
                  onClick={() => {setFilter('All'); setGenderFilter('All'); setSearchQuery('');}}
                  className="mt-10 px-10 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-2xl"
                >
                  Clear Protocols
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-black text-white pt-24 pb-12 mt-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <Logo color="text-white" size="lg" />
              <p className="mt-8 text-gray-500 max-w-md font-medium leading-relaxed text-lg italic">
                A localized archive of precision-engineered silhouettes. Built on the V-LAB Genesis Engine for the next generation.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase text-xs tracking-[0.4em] text-blue-500">The Catalog</h4>
              <ul className="space-y-5 text-sm font-bold text-gray-400">
                {Object.values(ShoeCategory).map(cat => (
                  <li key={cat}><button onClick={() => { setFilter(cat); setView('shop'); }} className="hover:text-white transition-colors uppercase tracking-tighter">{cat} Series</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase text-xs tracking-[0.4em] text-blue-500">V-LAB™ Systems</h4>
              <ul className="space-y-5 text-sm font-bold text-gray-400">
                <li><button onClick={() => setView('lab')} className="hover:text-white transition-colors uppercase tracking-tighter">AI Conceptualizer</button></li>
                <li><button className="hover:text-white transition-colors uppercase tracking-tighter">Sprite Grid Protocol</button></li>
                <li><button className="hover:text-white transition-colors uppercase tracking-tighter">RagvynnAI Support</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-600">
            <p>© 2025 RAGVYNN SYSTEMS. GLOBAL ASSET SYNC COMPLETE.</p>
            <div className="flex space-x-10 mt-8 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">V-LAB Protocol</a>
              <a href="#" className="hover:text-white transition-colors">Safety Matrix</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
      />

      <AIAssistant />
    </div>
  );
};

export default App;
