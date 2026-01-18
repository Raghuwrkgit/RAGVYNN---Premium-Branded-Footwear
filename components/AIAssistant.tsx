
import React, { useState } from 'react';
import { getStyleAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const advice = await getStyleAdvice(query);
    setResponse(advice);
    setIsLoading(false);
  };

  if (isMinimized) {
    return (
      <button 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center space-x-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        <span className="font-bold">Ask RagvynnAI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl z-50 border border-gray-100 overflow-hidden flex flex-col max-h-[500px]">
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <h3 className="font-black">RagvynnAI Consultant</h3>
        </div>
        <button onClick={() => setIsMinimized(true)} className="hover:opacity-70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {!response && !isLoading && (
          <p className="text-gray-500 text-sm bg-white p-3 rounded-2xl border border-gray-100">
            "Looking for high-performance running shoes or something for a night out? Tell me what you need!"
          </p>
        )}
        
        {response && (
          <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
            <p className="text-sm text-gray-800 leading-relaxed italic">"{response}"</p>
          </div>
        )}

        {isLoading && (
          <div className="flex space-x-2 justify-center py-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.3s]" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.5s]" />
          </div>
        )}
      </div>

      <form onSubmit={handleAsk} className="p-4 border-t border-gray-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g. I need marathon shoes..."
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 border-none text-sm transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;
