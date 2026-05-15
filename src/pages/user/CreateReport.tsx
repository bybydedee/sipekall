import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateReport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    kategori: 'Elektrikal',
    lokasi: '',
    prioritas: 'Normal',
    deskripsi: '',
    tgl_kejadian: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert('Laporan berhasil dikirim!');
        navigate('/user/riwayat');
      } else {
        const err = await res.json();
        alert('Gagal mengirim laporan: ' + (err.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-primary p-8 text-white">
           <h1 className="text-3xl font-black uppercase tracking-tight">Formulir Laporan</h1>
           <p className="text-blue-100 font-medium mt-1">Sampaikan keluhan fasilitas Anda secara detail.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Laporan</label>
              <input 
                type="text" 
                required
                value={formData.judul}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
                placeholder="Misal: AC Ruang Melati Bocor"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori Kerusakan</label>
              <select 
                value={formData.kategori}
                onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700"
              >
                <option>Elektrikal</option>
                <option>Alat Medis</option>
                <option>Bangunan / Gedung</option>
                <option>Sanitasi / Air</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lokasi Persis</label>
              <input 
                type="text" 
                required
                value={formData.lokasi}
                onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                placeholder="Misal: Gedung A - Lt. 2 - Kamar 201"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tingkat Prioritas</label>
              <select 
                value={formData.prioritas}
                onChange={(e) => setFormData({...formData, prioritas: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700"
              >
                <option>Sangat Tinggi (Emergency)</option>
                <option>Tinggi</option>
                <option>Normal</option>
                <option>Rendah</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Detail Kerusakan</label>
            <textarea 
              required
              rows={4}
              value={formData.deskripsi}
              onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
              placeholder="Jelaskan kronologi atau detail kerusakan..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'KIRIM LAPORAN SEKARANG'}
          </button>
        </form>
      </div>
    </div>
  );
}
