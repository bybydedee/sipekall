import { Users, FileText, CheckCircle, AlertCircle, TrendingUp, TrendingDown, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const stats = {
    totalTickets: 1254,
    pendingTickets: 42,
    activeTechnicians: 18,
    completionRate: 92
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">DASHBOARD ADMIN</h1>
          <p className="text-slate-500 mt-1">Ringkasan performa pemeliharaan fasilitas & aktivitas teknisi.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm focus:outline-none">
            <option>Hari Ini</option>
            <option>7 Hari Terakhir</option>
            <option>Bulan Ini</option>
          </select>
          <button className="bg-primary hover:bg-blue-800 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm">
            Export Laporan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText size={24} /></div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">
              <TrendingUp size={14} /> +12%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats.totalTickets}</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Total Tiket Masuk</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-lg"><AlertCircle size={24} /></div>
            <span className="flex items-center gap-1 text-red-600 text-sm font-bold bg-red-50 px-2 py-1 rounded">
              <TrendingDown size={14} /> -5%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats.pendingTickets}</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Tiket Menunggu (Pending)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-lg"><Users size={24} /></div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats.activeTechnicians}</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Teknisi Aktif Bertugas</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={24} /></div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">
              <TrendingUp size={14} /> +2%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats.completionRate}%</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Tingkat Penyelesaian (SLA)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Performa Teknisi (Top 5)</h2>
          <div className="space-y-4">
            {[
              { name: 'Ahmad Supriyadi', tasks: 45, rating: 4.8 },
              { name: 'Budi Santoso', tasks: 41, rating: 4.7 },
              { name: 'Cecep', tasks: 38, rating: 4.9 },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{i+1}</div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">Teknisi Listrik & AC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{t.tasks} Selesai</p>
                  <p className="text-xs text-orange-500 font-bold">★ {t.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Tiket Kritis (Prioritas Tinggi)</h2>
            <button className="text-sm font-bold text-primary hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {[
              { unit: 'IGD', issue: 'Listrik Padam di Ruang Triase', time: '10 mnt lalu' },
              { unit: 'ICU', issue: 'AC Sentral Bocor', time: '45 mnt lalu' },
            ].map((t, i) => (
              <div key={i} className="p-4 border border-red-200 bg-red-50/50 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-500" />
                  <div>
                    <p className="font-bold text-slate-800">{t.issue}</p>
                    <p className="text-xs font-semibold text-slate-600">Pelapor: Unit {t.unit}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                    <Clock size={12} /> {t.time}
                  </span>
                  <button className="mt-2 text-xs font-bold text-primary bg-white px-3 py-1 border border-primary/20 rounded hover:bg-primary hover:text-white transition-colors">
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}