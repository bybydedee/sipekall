import { Search, Filter, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function TicketManagement() {
  const [activeTab, setActiveTab] = useState('Semua');

  const tickets = [
    { id: 'TK-2023-089', unit: 'Unit IGD', prioritas: 'Tinggi', teknisi: 'Belum Ditugaskan', status: 'Menunggu', tgl: '10 Mei 26, 14:30' },
    { id: 'TK-2023-088', unit: 'Rawat Inap Lt.3', prioritas: 'Sedang', teknisi: 'Ahmad Supriyadi', status: 'Diproses', tgl: '10 Mei 26, 10:15' },
    { id: 'TK-2023-085', unit: 'Laboratorium', prioritas: 'Rendah', teknisi: 'Budi Santoso', status: 'Selesai', tgl: '09 Mei 26, 16:45' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Tiket</h1>
          <p className="text-slate-500 mt-1">Disposisi dan pantau laporan kerusakan dari seluruh unit.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {['Semua', 'Menunggu (12)', 'Diproses (45)', 'Menunggu Verifikasi (8)', 'Selesai'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari ID, Unit, atau Deskripsi..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 bg-white shadow-sm">
              <Filter size={18} /> Filter Lanjutan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-y border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">ID Tiket</th>
                  <th className="px-5 py-4">Unit Pelapor</th>
                  <th className="px-5 py-4">Prioritas</th>
                  <th className="px-5 py-4">Teknisi</th>
                  <th className="px-5 py-4">Waktu Lapor</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {tickets.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-5 py-4 font-bold text-slate-800">{t.id}</td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{t.unit}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        t.prioritas === 'Tinggi' ? 'bg-red-100 text-red-700' :
                        t.prioritas === 'Sedang' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {t.prioritas}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {t.teknisi === 'Belum Ditugaskan' ? (
                        <span className="text-slate-400 italic text-sm flex items-center gap-1">
                          <Clock size={14} /> Belum ada
                        </span>
                      ) : (
                        <span className="text-slate-700 font-medium flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{t.teknisi.charAt(0)}</div>
                           {t.teknisi}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-500">{t.tgl}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        t.status === 'Menunggu' ? 'bg-white border-slate-300 text-slate-600' :
                        t.status === 'Diproses' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                        'bg-green-50 border-green-200 text-green-700 flex items-center w-max gap-1'
                      }`}>
                        {t.status === 'Selesai' && <CheckCircle size={12} />} {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {t.status === 'Menunggu' ? (
                        <button className="bg-primary hover:bg-blue-800 text-white font-bold text-xs px-4 py-1.5 rounded transition-colors shadow-sm">
                          Disposisi
                        </button>
                      ) : (
                        <button className="text-slate-400 hover:text-slate-700 p-1">
                          <MoreHorizontal size={20} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-slate-500">
            <p>Menampilkan 1-10 dari 125 tiket</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 border border-slate-200 rounded bg-primary text-white font-medium">1</button>
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}