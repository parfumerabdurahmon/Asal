
import React from 'react';
import { CONTACT } from '../constants';

const ContactFooter: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A]/95 backdrop-blur-xl border border-stone-800 py-3 px-8 z-50 rounded-none flex items-center gap-8 shadow-2xl">
      <div className="flex items-center gap-8 border-r border-stone-800 pr-8">
        <a 
          href={`tel:${CONTACT.phone}`}
          className="group flex flex-col items-center"
        >
          <span className="text-[8px] uppercase tracking-widest text-[#C5A059] font-bold mb-1 opacity-60 group-hover:opacity-100 transition-opacity">Private Line</span>
          <span className="text-[10px] text-white font-medium tracking-tighter">{CONTACT.phone}</span>
        </a>
      </div>
      
      <div className="flex gap-10">
        <a 
          href={`https://www.instagram.com/${CONTACT.instagram}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#C5A059] transition-all transform hover:scale-110"
          aria-label="Instagram"
        >
          <i className="fa-brands fa-instagram text-xl"></i>
        </a>

        <a 
          href={`https://t.me/${CONTACT.telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#C5A059] transition-all transform hover:scale-110"
          aria-label="Telegram"
        >
          <i className="fa-brands fa-telegram text-xl"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactFooter;
