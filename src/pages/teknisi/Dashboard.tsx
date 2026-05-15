import { ClipboardList, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeknisiDashboard() {
  const stats = {
    tugasBaru: 2,
    sedangDikerjakan: 1,
    selesaiHariIni: 4,
    rating: 4.8
  };

  const tasks = [
    { id: 'TK-2023-089', unit: 'Unit IGD', prioritas: 'Tinggi', batasWaktu: 'Hari ini, 15:00', status: 'Tugas Baru', judul: 'Listrik Padam di Ruang Triase' },
    { id: 'TK-2023-088', unit: 'Rawat Inap Lt.3', prioritas: 'Sedang', batasWaktu: 'Besok, 10:00', status: 'Dikerjakan', judul: 'AC Kurang Dingin' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Halo, Ahmad Supriyadi</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Status: <strong className="text-slate-700">Aktif & Siap Menerima Tugas</strong>
            </p>
          </div>
        </div>
        <div className="relative z-10 text-right">
          <p className="text-sm text-slate-500 font-medium mb-1">Performa Bulan Ini</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-orange-500">★ {stats.rating}</span>
            <span className="text-slate-400 font-medium pb-1">/ 5.0</span>
          </div>
        </div>
        {/* Background Decors */}
        <div className="absolute right-0 top-0 w-64 h-full bg-slate-50 -skew-x-12 translate-x-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 rounded-xl p-6 border border-red-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <ClipboardList size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-red-600 uppercase tracking-wider">Tugas Baru</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.tugasBaru}</h2>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">Sedang Dikerjakan</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.sedangDikerjakan}</h2>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-green-600 uppercase tracking-wider">Selesai Hari Ini</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.selesaiHariIni}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-800">Daftar Tugas Saya</h2>
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari tugas..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.map(t => (
            <div key={t.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-2 h-12 rounded-full ${t.status === 'Tugas Baru' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500">{t.id}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      t.prioritas === 'Tinggi' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>{t.prioritas}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{t.judul}</h3>
                  <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                    <span className="font-medium text-slate-800">Unit: {t.unit}</span> • Batas: <span className={t.status === 'Tugas Baru' ? 'text-red-600 font-medium' : ''}>{t.batasWaktu}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                {t.status === 'Tugas Baru' ? (
                  <button className="flex-1 md:flex-none bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-800 shadow-sm transition-colors text-sm">
                    TERIMA TUGAS
                  </button>
                ) : (
                  <Link to={`/teknisi/task/${t.id}`} className="flex-1 md:flex-none bg-orange-500 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-orange-600 shadow-sm transition-colors text-sm text-center">
                    PROSES PENYELESAIAN
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}