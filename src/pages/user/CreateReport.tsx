import React, { useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateReport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    lokasi: '',
    prioritas: 'Sedang',
    nama_alat: '',
    merk: '',
    tgl_kejadian: '',
    waktu_kejadian: '',
    deskripsi: '',
    no_hp: '',
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
      console.error('Submit error:', error);
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Form Laporan Kerusakan Baru</h1>
        <p className="text-slate-500 text-sm mt-1">SIPEKAL / Pelaporan Kerusakan</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Kerusakan <span className="text-red-500">*</span></label>
            <input 
              required
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Contoh: AC Ruang Rawat Inap Bocor"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori <span className="text-red-500">*</span></label>
              <select 
                required
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
              >
                <option value="">Pilih kategori...</option>
                <option value="AC">Pendingin Ruangan / AC</option>
                <option value="Listrik">Kelistrikan</option>
                <option value="Plumbing">Plumbing / Air</option>
                <option value="Alat Medis">Alat Medis</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi <span className="text-red-500">*</span></label>
              <input 
                required
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Contoh: Rawat Inap Lt. 3 - Kamar 301"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Prioritas <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Rendah', 'Sedang', 'Tinggi', 'Darurat'].map((p) => (
                <div 
                  key={p} 
                  onClick={() => setFormData({...formData, prioritas: p})}
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${formData.prioritas === p ? 'border-primary bg-blue-50 text-primary font-bold ring-1 ring-primary' : 'border-slate-200 text-slate-600 hover:border-primary/50'}`}
                >
                  <div className="text-sm">{p}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Alat/Equipment</label>
              <input 
                name="nama_alat"
                value={formData.nama_alat}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Contoh: AC Split 1.5 PK"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Merk/Type</label>
              <input 
                name="merk"
                value={formData.merk}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Contoh: Panasonic CS-YN12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Kejadian <span className="text-red-500">*</span></label>
              <input 
                type="date"
                required
                name="tgl_kejadian"
                value={formData.tgl_kejadian}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Waktu Kejadian <span className="text-red-500">*</span></label>
              <input 
                type="time"
                required
                name="waktu_kejadian"
                value={formData.waktu_kejadian}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Kerusakan <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              required
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Jelaskan detail kerusakan yang terjadi..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">No. HP yang bisa dihubungi</label>
            <input 
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Contoh: 0812-3456-7890"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="w-1/3 py-3 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="w-2/3 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
               {loading ? <Loader2 className="animate-spin" /> : 'Kirim Laporan'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
