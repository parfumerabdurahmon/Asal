
import React from 'react';
import { HoneyProduct, Locale } from '../types';
import { UI_TEXT } from '../constants';

interface HoneyCardProps {
  honey: HoneyProduct;
  locale: Locale;
  onOrder: (honey: HoneyProduct) => void;
}

const HoneyCard: React.FC<HoneyCardProps> = ({ honey, locale, onOrder }) => {
  return (
    <div className="bg-white rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] transition-all duration-500 overflow-hidden group border border-stone-100 flex flex-col h-full">
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
        <img 
          src={honey.image} 
          alt={honey.name[locale]}
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
           <div className="bg-[#1A1A1A]/90 backdrop-blur-md text-[#C5A059] px-4 py-2 text-sm font-bold tracking-widest uppercase inline-block">
             {honey.price.toLocaleString()} UZS
           </div>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-3">
          {honey.origin[locale]}
        </span>
        <h3 className="text-2xl font-semibold mb-4 text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">
          {honey.name[locale]}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1 italic">
          "{honey.description[locale]}"
        </p>
        
        <div className="flex justify-center gap-3 mb-8">
           {honey.flavorProfile[locale].slice(0, 3).map((tag) => (
             <span key={tag} className="text-[9px] uppercase tracking-wider text-stone-400 border-b border-stone-200 pb-1">
               {tag}
             </span>
           ))}
        </div>

        <button 
          onClick={() => onOrder(honey)}
          className="w-full border border-[#1A1A1A] text-[#1A1A1A] py-4 rounded-none font-bold tracking-widest text-xs uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 active:scale-95"
        >
          {UI_TEXT.order_now[locale]}
        </button>
      </div>
    </div>
  );
};

export default HoneyCard;
