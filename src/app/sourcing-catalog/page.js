'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Weight, ShieldCheck } from 'lucide-react';
import { APPAREL_CATEGORIES } from './apparelData'; // Import your clean item data

// A smart sub-component to handle images seamlessly
function ProductCardImage({ product }) {
  const [imgFailed, setImgFailed] = useState(false);

  const fallbackUI = (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-900 pointer-events-none">
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 mb-1">Fabric Specimen</span>
      <span className="font-serif text-sm tracking-wide text-white/90">{product.imagePlaceholder}</span>
    </div>
  );

  return (
    <div className="bg-stone-900 aspect-square w-full relative overflow-hidden border-b border-stone-200 group flex items-center justify-center">
      {product.image && !imgFailed ? (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgFailed(true)}
        />
      ) : fallbackUI}
    </div>
  );
}

export default function SourcingCatalog() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dynamically pull categories for navigation filters based on data file
  const navigationTabs = ['all', ...APPAREL_CATEGORIES.map(cat => cat.id)];

  const filteredCategories = activeTab === 'all' 
    ? APPAREL_CATEGORIES 
    : APPAREL_CATEGORIES.filter(cat => cat.id === activeTab);

  // VIEW 1: DRILL-DOWN SUB-CATEGORY SPECIFICATIONS VIEW
  if (selectedCategory) {
    return (
      <div className="bg-[#f7f7f5] min-h-screen pb-20 text-stone-900 w-full">
        <div className="w-full bg-stone-900 text-white pt-32 pb-16 px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-white mb-8 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Range Sourcing Catalog
            </button>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-1">Production Division</span>
              <h1 className="font-serif text-4xl text-white tracking-tight">{selectedCategory.title} Matrix</h1>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed max-w-xl opacity-90">
                Capacity capabilities run up to <span className="font-semibold text-amber-400">{selectedCategory.capacity}</span> with standard production protocols executing within {selectedCategory.leadTime}.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {selectedCategory.products.map((product, idx) => (
              <div key={idx} className="bg-white border border-stone-200 flex flex-col justify-between hover:shadow-sm transition-shadow">
                
                {/* Visual Image Handler */}
                <ProductCardImage product={product} />

                {/* FABRIC SPEC DATA SHEETS */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-medium tracking-wide text-stone-900">{product.name}</h3>
                    
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-start gap-2 text-xs">
                        <Layers size={13} className="text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-stone-600 font-light leading-snug">
                          <strong className="text-stone-800 font-medium">Composition:</strong> {product.fabrication}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Weight size={13} className="text-amber-500 shrink-0" />
                        <span className="text-stone-600 font-light">
                          <strong className="text-stone-800 font-medium">Yield Weight:</strong> {product.weight}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs pt-1 border-t border-stone-100 mt-2">
                        <ShieldCheck size={13} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-stone-400 text-[11px] leading-relaxed font-light">
                          {product.features}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="bg-stone-900 text-white p-8 border border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <h4 className="font-serif text-lg">Require specialized fabrication counts or treatments?</h4>
              <p className="text-stone-400 text-xs mt-1">Our lab-dip color checking desks handle bespoke blending rules flawlessly.</p>
            </div>
            <Link href="/rfq" className="bg-amber-400 text-black px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300 whitespace-nowrap">
              Open Custom RFQ Build
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: STANDARD MAIN CATALOG SUMMARY DASHBOARD
  return (
    <div className="bg-[#f7f7f5] min-h-screen pb-20 text-stone-900 w-full">
      <div className="w-full bg-stone-900 text-white pt-32 pb-20 px-6 mb-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-amber-400 font-semibold mb-2">Our Capabilities</p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-white">Sourcing & Production Range</h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed opacity-90">
            Leveraging our vetted network of Tier-1 manufacturing facilities across Bangladesh to deliver premium execution. Click any portfolio division card below to review specific catalog details.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Dynamic Filter Navigation */}
        <div className="flex justify-center space-x-4 mb-12 border-b border-stone-200 pb-4">
          {navigationTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs uppercase tracking-widest pb-2 px-2 transition-all font-medium bg-transparent border-none cursor-pointer ${
                activeTab === tab 
                  ? 'border-b-2 border-stone-900 text-stone-900 font-bold' 
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => setSelectedCategory(category)}
              className="bg-white border border-stone-200/60 p-8 flex flex-col justify-between hover:border-amber-400/80 cursor-pointer hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-baseline mb-6 border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-xl tracking-wide uppercase text-stone-900 group-hover:text-amber-600 transition-colors">
                    {category.title}
                  </h3>
                  <span className="text-[10px] text-amber-500 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity tracking-wider">
                    View Run &rarr;
                  </span>
                </div>
                
                <h4 className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-3">Product Range</h4>
                <ul className="space-y-2 mb-8 text-sm text-stone-600">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* B2B Specs */}
              <div className="bg-stone-50 p-4 border-t border-stone-100 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-wider text-[10px]">Monthly Capacity:</span>
                  <span className="font-medium text-stone-800">{category.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-wider text-[10px]">Avg Lead Time:</span>
                  <span className="font-medium text-stone-800">{category.leadTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-wider text-[10px]">Standard MOQ:</span>
                  <span className="font-medium text-stone-800">{category.moq}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/rfq" className="inline-block px-12 py-4 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-black transition-colors duration-300">
            Request Custom Fabric Development
          </Link>
        </div>
      </div>
    </div>
  );
}