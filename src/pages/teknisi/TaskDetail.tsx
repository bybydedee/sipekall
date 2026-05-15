import { ArrowLeft, Clock, MapPin, Tag, AlertTriangle, UploadCloud } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function TaskDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Link to="/teknisi/dashboard" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Detail Tugas</h1>
          <p className="text-slate-500 text-sm">{id || 'TK-2023-088'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs font-bold uppercase">SEDANG DIKERJAKAN</span>
              <span className="text-sm font-bold text-slate-500 flex items-center gap-1"><Clock size={16}/> Target: 12:00</span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">AC Kurang Dingin di Ruang Perawatan</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <span className="flex items-center gap-1"><MapPin size={16} className="text-slate-400"/> Rawat Inap Lt. 3</span>
              <span className="flex items-center gap-1"><Tag size={16} className="text-slate-400"/> Pendingin / AC</span>
              <span className="flex items-center gap-1 text-orange-600 font-semibold"><AlertTriangle size={16}/> Prioritas Sedang</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mb-6 text-slate-700 text-sm leading-relaxed">
              <strong>Deskripsi:</strong> AC di kamar 302 meneteskan air dan udaranya tidak dingin sejak semalam. Pasien merasa tidak nyaman. Mohon segera diperbaiki.
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Foto Kerusakan (Dari Pelapor):</h3>
              <div className="flex gap-3">
                <div className="w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium">Foto 1</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Form Penyelesaian Tugas</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tindakan / Solusi yang Dilakukan <span className="text-red-500">*</span></label>
                <textarea 
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
                  placeholder="Ceritakan detail perbaikan yang Anda lakukan..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Suku Cadang yang Digunakan (Opsional)</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  placeholder="Misal: Freon R32, Pipa Kapiler..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Unggah Foto Hasil Perbaikan <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                  <UploadCloud size={36} className="mb-2 text-slate-400" />
                  <p className="font-medium text-slate-700 text-sm">Upload Foto Selesai</p>
                </div>
              </div>

              <div className="pt-4">
                <button type="button" className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center gap-2 text-sm">
                   TANDAI SEBAGAI SELESAI
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#eef2f6] rounded-xl p-6 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Informasi Tambahan</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Nama Alat</p>
                <p className="text-sm font-medium text-slate-800">AC Split 1.5 PK Panasonic</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Dilaporkan Oleh</p>
                <p className="text-sm font-medium text-slate-800">Suster Maria (Ext. 102)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Waktu Lapor</p>
                <p className="text-sm font-medium text-slate-800">10 Mei 2026, 08:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}