
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
      if (file.size > 1.5 * 1024 * 1024) { 
        alert("Image too large (max 1.5MB for storage limits).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
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
    if (!formData.image) return alert("Image required.");

    const productData = {
      ...formData,
      id: editingId || Date.now(),
      flavorProfile: { 
        uz: formData.flavorProfile?.uz?.length ? formData.flavorProfile.uz : ['Premium'], 
        ru: formData.flavorProfile?.ru?.length ? formData.flavorProfile.ru : ['Премиум'] 
      }
    } as HoneyProduct;

    if (editingId) {
      onUpdate(productData);
    } else {
      onAdd(productData);
    }
    resetForm();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Staff Entry</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              autoFocus
              type="password"
              placeholder="Access Key"
              className="w-full bg-stone-50 px-4 py-4 border-b-2 border-stone-200 focus:border-[#C5A059] outline-none text-center tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 font-bold tracking-[0.2em] text-xs uppercase hover:bg-[#C5A059] transition-all">Authorize</button>
            <button type="button" onClick={onClose} className="text-stone-400 text-[10px] uppercase tracking-widest block mx-auto">Cancel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-2 md:p-4">
      <div className="bg-white w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-2xl font-serif text-stone-900">Manager Panel</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900"><i className="fa-solid fa-xmark text-2xl"></i></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 bg-stone-50/50 p-6 border border-stone-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required placeholder="Name (UZ)" className="w-full p-3 border border-stone-200 outline-none" value={formData.name?.uz} onChange={e => setFormData({...formData, name: {...formData.name!, uz: e.target.value}})} />
              <input required placeholder="Name (RU)" className="w-full p-3 border border-stone-200 outline-none" value={formData.name?.ru} onChange={e => setFormData({...formData, name: {...formData.name!, ru: e.target.value}})} />
              <textarea required placeholder="Desc (UZ)" className="w-full p-3 border border-stone-200 outline-none md:col-span-2" value={formData.description?.uz} onChange={e => setFormData({...formData, description: {...formData.description!, uz: e.target.value}})} />
              <textarea required placeholder="Desc (RU)" className="w-full p-3 border border-stone-200 outline-none md:col-span-2" value={formData.description?.ru} onChange={e => setFormData({...formData, description: {...formData.description!, ru: e.target.value}})} />
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="text-xs" />
              <input type="number" placeholder="Price (UZS)" className="w-full p-3 border border-stone-200 outline-none" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
            </div>
            <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 font-bold uppercase hover:bg-[#C5A059] transition-all">
              {editingId ? 'Update Item' : 'Add to Collection'}
            </button>
          </form>

          <div className="space-y-4">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-white border border-stone-100">
                <div className="flex items-center gap-4">
                  <img src={p.image} className="w-12 h-12 object-cover" alt="" />
                  <span className="font-serif">{p.name.uz}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(p.id); setFormData(p); }} className="text-stone-400 hover:text-stone-900"><i className="fa-solid fa-pen"></i></button>
                  <button onClick={() => onDelete(p.id)} className="text-red-300 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
