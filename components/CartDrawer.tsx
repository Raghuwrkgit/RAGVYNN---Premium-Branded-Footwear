
import React, { useState } from 'react';
import { CartItem } from '../types';
import SpriteImage from './SpriteImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setCheckoutStatus('processing');
    setTimeout(() => {
      setCheckoutStatus('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out">
          <div className="h-full flex flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.2)]">
            <div className="flex-1 py-10 overflow-y-auto px-6 sm:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tighter text-gray-900">MY BAG</h2>
                <button 
                  onClick={onClose} 
                  className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {checkoutStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">Order Dispatched</h3>
                  <p className="text-gray-500 font-medium">Your selection has been processed. Shipment initiation complete.</p>
                  <button 
                    onClick={() => {
                      setCheckoutStatus('idle');
                      onClose();
                    }}
                    className="bg-black text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-gray-800 transition-all"
                  >
                    Return to Collection
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  {items.length === 0 ? (
                    <div className="text-center py-24 flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      </div>
                      <p className="text-gray-500 font-bold text-lg mb-2">Cart status: Inactive.</p>
                      <button 
                        onClick={onClose}
                        className="text-blue-600 font-black uppercase tracking-widest text-sm hover:text-blue-700 underline underline-offset-4"
                      >
                        Browse Archive
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-8">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex group">
                          <div className="flex-shrink-0 w-28 h-28 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                            <SpriteImage 
                              index={item.product.spriteIndex} 
                              className="w-full h-full transition-transform duration-500 group-hover:scale-110" 
                              alt={item.product.name} 
                            />
                          </div>
                          <div className="ml-6 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between text-base font-black text-gray-900 mb-1">
                              <h3 className="group-hover:text-blue-600 transition-colors uppercase truncate max-w-[150px]">{item.product.name}</h3>
                              <p>${item.product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col text-[10px] font-bold text-gray-400 uppercase tracking-widest space-y-1">
                              <span>Protocol: {item.selectedColor}</span>
                              <span>Size: {item.selectedSize}</span>
                            </div>
                            <div className="flex-1 flex items-end justify-between mt-4">
                              <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                                <span className="text-[10px] font-black px-2 tracking-tighter">QTY {item.quantity}</span>
                              </div>
                              <button 
                                onClick={() => onRemove(idx)}
                                className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {items.length > 0 && checkoutStatus !== 'success' && (
              <div className="border-t border-gray-100 py-10 px-6 sm:px-10 bg-gray-50/50">
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <p>Archive Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <p>Logistics</p>
                    <p>COMPLIMENTARY</p>
                  </div>
                  <div className="flex justify-between text-xl font-black text-gray-900 border-t border-gray-100 pt-4">
                    <p>TOTAL</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={checkoutStatus === 'processing'}
                  className="w-full bg-black text-white rounded-[24px] py-5 px-6 text-lg font-black shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center space-x-3 active:scale-95 disabled:bg-gray-400"
                >
                  {checkoutStatus === 'processing' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span className="uppercase tracking-widest text-sm">Processing...</span>
                    </>
                  ) : (
                    <span className="uppercase tracking-widest text-sm">Authorize Checkout</span>
                  )}
                </button>
                <p className="mt-4 text-[9px] text-center font-bold text-gray-400 uppercase tracking-[0.2em]">RAGVYNN CRYPTO-SECURE PROTOCOL ACTIVE</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
