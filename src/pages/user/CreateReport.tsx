import { useState } from 'react';
import { ImagePlus } from 'lucide-react';

export default function CreateReport() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Submitting', formData);
    alert('Laporan berhasil dikirim!');
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
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Contoh: AC Ruang Rawat Inap Bocor"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                <option value="">Pilih kategori...</option>
                <option value="AC">Pendingin Ruangan / AC</option>
                <option value="Listrik">Kelistrikan</option>
                <option value="Plumbing">Plumbing / Air</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi <span className="text-red-500">*</span></label>
              <input 
                required
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Contoh: Rawat Inap Lt. 3 - Kamar..."
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
                  <div className="text-xs mb-1">()</div>
                  <div className="text-sm">{p}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Alat/Equipment</label>
              <input 
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Contoh: AC Split 1.5 PK"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Merk/Type</label>
              <input 
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
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Waktu Kejadian <span className="text-red-500">*</span></label>
              <input 
                type="time"
                required
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Kerusakan <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              required
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Jelaskan detail kerusakan yang terjadi..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">No. HP yang bisa dihubungi</label>
            <input 
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Contoh: 0812-3456-7890"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Kerusakan</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer bg-slate-50/50">
              <ImagePlus size={40} className="mb-3 text-slate-400" />
              <p className="font-medium text-slate-700 text-sm">Klik untuk upload foto atau drag & drop</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" className="w-1/3 py-3 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors">
              Batal
            </button>
            <button type="submit" className="w-2/3 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2">
               Kirim Laporan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}