
import React, { useState, useCallback, useEffect } from 'react';
import { INITIAL_PRODUCTS, CONTACT, UI_TEXT } from './constants';
import HoneyCard from './components/HoneyCard';
import ContactFooter from './components/ContactFooter';
import AdminPanel from './components/AdminPanel';
import { HoneyProduct, Locale } from './types';

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>('uz');
  const [products, setProducts] = useState<HoneyProduct[]>(() => {
    const saved = localStorage.getItem('nectar_bloom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nectar_bloom_products', JSON.stringify(products));
  }, [products]);

  const handleOrder = useCallback((honey: HoneyProduct) => {
    const message = locale === 'uz' 
      ? `Assalomu alaykum! Men "${honey.name.uz}" asalini buyurtma qilmoqchi edim.`
      : `Здравствуйте! Я бы хотел заказать мед "${honey.name.ru}".`;
    const telegramUrl = `https://t.me/${CONTACT.telegram}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  }, [locale]);

  const toggleLocale = () => setLocale(prev => prev === 'uz' ? 'ru' : 'uz');

  const addProduct = (newProduct: HoneyProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: HoneyProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-[#C5A059] selection:text-white">
      {/* Immersive Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[60] px-8 py-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <div className="text-2xl font-serif font-bold tracking-tighter text-[#1A1A1A] uppercase">
            PREMIUM <span className="text-[#C5A059] italic">ASALLAR</span>
          </div>
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="w-12 h-12 rounded-none bg-[#1A1A1A] text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all duration-500 shadow-xl"
          >
            <i className="fa-solid fa-fingerprint text-lg"></i>
          </button>
          <button 
            onClick={toggleLocale}
            className="px-6 h-12 bg-white/80 backdrop-blur-md border border-stone-100 text-[#1A1A1A] font-bold text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-[#1A1A1A] hover:text-[#C5A059] transition-all shadow-sm"
          >
            {locale === 'uz' ? 'O\'zbek' : 'Pусский'}
            <div className="w-1 h-1 bg-[#C5A059] rounded-full"></div>
            {locale === 'uz' ? 'RU' : 'UZ'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center overflow-hidden bg-[#F9F7F2]">
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1587049633562-ad3502605c6e?auto=format&fit=crop&q=80&w=1500" 
            alt="Premium Honey" 
            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[3s] grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2] to-transparent"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10 lg:w-1/2">
          <div className="reveal">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#C5A059]"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C5A059]">
                ESTABLISHED 2022
              </span>
            </div>
            <h1 className="text-7xl lg:text-9xl font-bold text-[#1A1A1A] mb-12 leading-[0.9]">
              {UI_TEXT.hero_title_1[locale]} <br/> 
              <span className="italic font-normal text-[#C5A059]">{UI_TEXT.hero_title_2[locale]}</span>
            </h1>
            <p className="text-xl text-stone-500 mb-16 max-w-lg leading-relaxed font-light">
              {UI_TEXT.hero_desc[locale]}
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <a href="#collection" className="group relative px-10 py-5 overflow-hidden border border-[#1A1A1A] text-center">
                <div className="absolute inset-0 w-0 bg-[#1A1A1A] transition-all duration-500 group-hover:w-full"></div>
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                  {UI_TEXT.explore_btn[locale]}
                </span>
              </a>
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-[#C5A059] transition-all">
                  <i className="fa-solid fa-phone text-stone-400 group-hover:text-[#C5A059] transition-colors"></i>
                </div>
                <div>
                   <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Personal Sommelier</div>
                   <div className="text-sm font-bold text-[#1A1A1A]">{CONTACT.phone}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Collection */}
      <main id="collection" className="py-32 px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059] mb-4">The Collection</div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A]">
                {UI_TEXT.collection_title[locale]}
              </h2>
            </div>
            <p className="text-stone-400 max-w-sm text-sm italic border-l border-[#C5A059] pl-6 py-2">
              {UI_TEXT.collection_desc[locale]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
            {products.map((honey) => (
              <HoneyCard 
                key={honey.id} 
                honey={honey} 
                locale={locale}
                onOrder={handleOrder} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <section className="bg-[#1A1A1A] py-40 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif font-bold text-white/[0.02] pointer-events-none select-none uppercase whitespace-nowrap">
          PREMIUM ASALLAR
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-20 h-px bg-[#C5A059] mx-auto mb-12"></div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-12 leading-tight">
            {UI_TEXT.cta_title[locale]}
          </h2>
          <p className="text-lg text-stone-400 mb-16 font-light max-w-xl mx-auto leading-relaxed">
            {UI_TEXT.cta_desc[locale]}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <button 
              onClick={() => window.open(`https://t.me/${CONTACT.telegram}`, '_blank')}
              className="bg-[#C5A059] text-white px-12 py-5 font-bold tracking-[0.3em] text-[10px] uppercase hover:bg-white hover:text-[#1A1A1A] transition-all shadow-2xl"
            >
              Reserve via Telegram
            </button>
            <a 
              href={`https://www.instagram.com/${CONTACT.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-700 text-stone-400 px-12 py-5 font-bold tracking-[0.3em] text-[10px] uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
            >
              Maison Instagram
            </a>
          </div>
        </div>
      </section>

      {isAdminOpen && (
        <AdminPanel 
          products={products} 
          onAdd={addProduct} 
          onUpdate={updateProduct}
          onDelete={deleteProduct} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      <div className="mb-20"></div>
      <ContactFooter />
    </div>
  );
};

export default App;
