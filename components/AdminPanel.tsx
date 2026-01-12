
import React, { useState, useCallback, useRef } from 'react';
import { HoneyProduct } from '../types';

interface AdminPanelProps {
  products: HoneyProduct[];
  onAdd: (product: HoneyProduct) => void;
  onUpdate: (product: HoneyProduct) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAdd, onUpdate, onDelete, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<HoneyProduct>>({
    name: { uz: '', ru: '' },
    description: { uz: '', ru: '' },
    origin: { uz: '', ru: '' },
    price: 0,
    image: '',
    flavorProfile: { uz: [], ru: [] }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'asal123') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Limit
        alert("Image too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const startEdit = useCallback((product: HoneyProduct) => {
    setEditingId(product.id);
    setFormData(product);
    document.getElementById('admin-form-header')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setFormData({
      name: { uz: '', ru: '' },
      description: { uz: '', ru: '' },
      origin: { uz: '', ru: '' },
      price: 0,
      image: '',
      flavorProfile: { uz: [], ru: [] }
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please provide an image for the product.");
      return;
    }

    if (editingId) {
      onUpdate({ ...formData as HoneyProduct, id: editingId });
    } else {
      onAdd({
        ...formData as HoneyProduct,
        id: Date.now(),
        flavorProfile: { 
          uz: formData.flavorProfile?.uz?.length ? formData.flavorProfile.uz : ['Premium'], 
          ru: formData.flavorProfile?.ru?.length ? formData.flavorProfile.ru : ['Премиум'] 
        }
      });
    }
    resetForm();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm p-8 md:p-10 text-center shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Vault Entry</h2>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto"></div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              autoFocus
              type="password"
              placeholder="Enter Access Key"
              className={`w-full bg-stone-50 px-4 py-4 border-b-2 outline-none transition-all text-center tracking-widest ${error ? 'border-red-500' : 'border-stone-200 focus:border-[#C5A059]'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">Invalid Access Key</p>}
            <div className="flex flex-col gap-3">
              <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 font-bold tracking-[0.2em] text-xs uppercase hover:bg-[#C5A059] transition-all">
                Authorize
              </button>
              <button type="button" onClick={onClose} className="text-stone-400 text-[10px] uppercase tracking-widest hover:text-stone-600 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-2 md:p-4">
      <div className="bg-white w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]">
        <div className="p-6 md:p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900">Collections Manager</h2>
            <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.3em]">Bespoke Honey Curation</p>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform p-2 text-stone-400 hover:text-stone-900">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <form id="admin-form" onSubmit={handleSubmit} className="space-y-6 md:space-y-8 bg-stone-50/50 p-6 md:p-8 border border-stone-100 mb-12">
            <h3 id="admin-form-header" className="text-xl font-serif text-stone-800 border-b border-stone-200 pb-2 mb-6">
              {editingId ? 'Modify Offering' : 'New Collection Entry'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Title (UZ)</label>
                <input required className="w-full bg-white px-4 py-3 border border-stone-200 focus:border-[#C5A059] outline-none transition-all" 
                  value={formData.name?.uz} onChange={e => setFormData({...formData, name: {...formData.name!, uz: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Title (RU)</label>
                <input required className="w-full bg-white px-4 py-3 border border-stone-200 focus:border-[#C5A059] outline-none transition-all" 
                  value={formData.name?.ru} onChange={e => setFormData({...formData, name: {...formData.name!, ru: e.target.value}})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
               <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Description (UZ)</label>
                <textarea required rows={2} className="w-full bg-white px-4 py-3 border border-stone-200 focus:border-[#C5A059] outline-none transition-all resize-none" 
                  value={formData.description?.uz} onChange={e => setFormData({...formData, description: {...formData.description!, uz: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Description (RU)</label>
                <textarea required rows={2} className="w-full bg-white px-4 py-3 border border-stone-200 focus:border-[#C5A059] outline-none transition-all resize-none" 
                  value={formData.description?.ru} onChange={e => setFormData({...formData, description: {...formData.description!, ru: e.target.value}})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Imagery</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[9px] text-stone-400 uppercase tracking-tighter block">Local Upload</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] text-stone-400 uppercase tracking-tighter block">External URL</span>
                  <input type="url" className="w-full bg-white px-4 py-2 border border-stone-200 focus:border-[#C5A059] outline-none transition-all text-xs h-[38px]" 
                    placeholder="https://..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>
              {formData.image && (
                <div className="mt-4 relative w-24 h-24 md:w-32 md:h-32 border border-stone-200 overflow-hidden group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute top-1 right-1 bg-black/50 text-white w-6 h-6 flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Valuation (UZS)</label>
                <input required type="number" className="w-full bg-white px-4 py-3 border border-stone-200 focus:border-[#C5A059] outline-none transition-all" 
                  value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Terroir / Origin (UZ)</label>
                <input required className="w-full bg-white px-4 py-3 border border-stone-200 focus:border-[#C5A059] outline-none transition-all" 
                  value={formData.origin?.uz} onChange={e => setFormData({...formData, origin: {...formData.origin!, uz: e.target.value}})} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-[#1A1A1A] text-white py-4 md:py-5 font-bold tracking-[0.2em] text-xs uppercase hover:bg-[#C5A059] transition-all shadow-xl">
                {editingId ? 'Confirm Updates' : 'Publish to Storefront'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-6 md:px-8 border border-stone-300 text-stone-500 font-bold tracking-widest text-xs uppercase hover:bg-stone-100 transition-all">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-xl font-serif text-stone-800 mb-6">Current Inventory</h3>
            <div className="grid gap-4">
              {products.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 md:p-6 bg-white border border-stone-100 hover:border-[#C5A059] transition-all group">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden bg-stone-50">
                      <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={p.name.uz} />
                    </div>
                    <div>
                      <div className="font-serif text-base md:text-lg text-stone-900 group-hover:text-[#C5A059] transition-colors">{p.name.uz}</div>
                      <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                        {p.price.toLocaleString()} UZS • {p.origin.uz}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-2">
                    <button onClick={() => startEdit(p)} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-all">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => window.confirm('Revoke this item?') && onDelete(p.id)} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-red-200 hover:text-red-600 hover:bg-red-50 transition-all">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
