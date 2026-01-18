
import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  searchQuery, 
  onSearchChange, 
  onCartClick, 
  onHomeClick 
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={onHomeClick}
          >
            <Logo size="md" />
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white sm:text-sm transition-all"
              />
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            <button onClick={onHomeClick} className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Shop</button>
            <a href="#" className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Drops</a>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">V-LAB™</button>
          </nav>

          <div className="flex items-center space-x-2 ml-4">
            <button 
              onClick={onCartClick}
              className="relative p-3 text-gray-700 hover:bg-gray-100 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-[10px] font-black leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden sm:block p-3 text-gray-700 hover:bg-gray-100 rounded-full transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
