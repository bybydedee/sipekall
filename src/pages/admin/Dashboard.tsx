import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ menunggu: 0, diproses: 0, selesai: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch('/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statCards = [
    { label: 'LAPORAN MASUK', value: stats.menunggu, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'SEDANG DIPROSES', value: stats.diproses, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'SELESAI (HARI INI)', value: stats.selesai, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">Monitoring Pemeliharaan Real-Time</p>
        </div>
        <button onClick={fetchStats} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg font-bold text-xs text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest">
          <RefreshCw size={14} /> Sinkronisasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
                <h2 className={`text-4xl font-black ${card.color}`}>{card.value}</h2>
              </div>
              <div className={`${card.bg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                <card.icon size={24} className={card.color} />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50">
               <Link to="/admin/tickets" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Lihat Detail →</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wider text-sm">
                <Users size={18} className="text-primary" /> Teknisi Aktif
              </h3>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">ONLINE</span>
           </div>
           <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">T{i}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Teknisi Area {i === 1 ? 'Elektrikal' : i === 2 ? 'Medis' : 'Gedung'}</p>
                      <p className="text-xs text-slate-500">3 Tugas Berjalan</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wider text-sm">
                <FileText size={18} className="text-primary" /> Aktivitas Terbaru
              </h3>
              <button className="text-[10px] font-bold text-primary hover:underline uppercase">LOG LENGKAP</button>
           </div>
           <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full before:z-10 after:absolute after:left-[3px] after:top-4 after:w-[2px] after:h-full after:bg-slate-100 last:after:hidden">
                   <p className="text-xs font-bold text-slate-800">Tiket #TK-2024-00{i} Selesai Perbaikan</p>
                   <p className="text-[10px] text-slate-500 mt-1">10 Menit yang lalu • Oleh Ahmad Teknik</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
