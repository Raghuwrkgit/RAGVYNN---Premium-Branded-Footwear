
import React, { useState } from 'react';
import { generateCustomShoe } from '../services/geminiService';
import { GeneratedShoe } from '../types';
import Logo from './Logo';

const SoleLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedShoes, setGeneratedShoes] = useState<GeneratedShoe[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const history = generatedShoes.map(s => s.prompt);
    const imageUrl = await generateCustomShoe(prompt, history);
    
    if (imageUrl) {
      const newShoe: GeneratedShoe = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        timestamp: Date.now()
      };
      setGeneratedShoes(prev => [newShoe, ...prev]);
      setPrompt('');
    } else {
      alert("Design generation failed in the matrix. Try again.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-[80vh]">
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-2">
          <Logo iconOnly size="lg" color="text-black" />
          <h2 className="text-5xl font-black tracking-tighter text-black uppercase">V-LAB™ <span className="text-blue-600">ENGINE</span></h2>
        </div>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] ml-1">
          Synthetic Footwear Conceptualization Matrix. High-fidelity rendering.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-gray-50 p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black mb-6 tracking-tight uppercase flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
              INPUT PARAMETERS
            </h3>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Visual Concept
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. 'Volcanic crust texture with translucent neon orange magma sole, high-top silhouette'"
                  className="w-full p-5 rounded-[24px] border-2 border-gray-100 focus:border-blue-600 focus:ring-0 text-sm transition-all bg-white min-h-[150px] resize-none font-medium"
                  disabled={isGenerating}
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-black text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isGenerating ? (
                  <>
                    <Logo iconOnly size="sm" color="text-white" className="animate-spin" />
                    <span>SYNTHESIZING...</span>
                  </>
                ) : (
                  <span>GENERATE CONCEPT</span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">SYSTEM PROTOCOLS</h4>
              <ul className="space-y-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">
                <li>• Singular Profile Visualization</li>
                <li>• 100% Geometry Uniqueness</li>
                <li>• Zero-Repeat Color Mapping</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {generatedShoes.length === 0 && !isGenerating ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-4 border-dashed border-gray-100 rounded-[64px] text-center p-12">
              <Logo iconOnly size="xl" className="opacity-5 mb-8" />
              <h4 className="text-2xl font-black mb-2 tracking-tight uppercase">V-LAB STANDBY</h4>
              <p className="text-gray-400 font-medium max-w-xs mx-auto uppercase text-[10px] tracking-widest leading-relaxed">
                Awaiting design prompt for conceptualization.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isGenerating && (
                <div className="aspect-square bg-gray-50 rounded-[48px] flex items-center justify-center border border-gray-100">
                  <Logo iconOnly size="xl" className="opacity-10 animate-pulse" color="text-blue-600" />
                </div>
              )}
              {generatedShoes.map(shoe => (
                <div key={shoe.id} className="group relative bg-white rounded-[48px] overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-2xl">
                  <div className="aspect-square">
                    <img src={shoe.url} alt={shoe.prompt} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 backdrop-blur-sm">
                    <p className="text-white text-xs font-bold leading-relaxed mb-6 italic">"{shoe.prompt}"</p>
                    <div className="flex space-x-4">
                      <button className="flex-1 bg-white text-black py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center space-x-2">
                        <Logo iconOnly size="sm" color="currentColor" className="scale-50" />
                        <span>EXPORT DESIGN</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-white flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Logo iconOnly size="sm" color="text-black" />
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest">V-LAB GENESIS</h4>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Hash {shoe.id.slice(-6)}</p>
                      </div>
                    </div>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-100">UNIQUE ID</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoleLab;
