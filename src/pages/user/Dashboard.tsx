import { useState, useEffect } from 'react';
import { Clock, Settings, CheckCircle, RefreshCw, Eye, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [stats, setStats] = useState({ menunggu: 0, diproses: 0, selesai: 0 });
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('sipekall_token');
      const [statsRes, ticketsRes] = await Promise.all([
        fetch('/api/dashboard', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/tickets', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      const statsData = await statsRes.json();
      const ticketsData = await ticketsRes.json();
      
      if (statsRes.ok) setStats(statsData);
      if (ticketsRes.ok) setTickets(ticketsData.slice(0, 5)); // Show latest 5
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">DASHBOARD UNIT</h1>
          <p className="text-slate-500 mt-1">Pantau dan kelola laporan kerusakan fasilitas di unit Anda secara real-time.</p>
        </div>
        <Link to="/user/lapor" className="bg-primary hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-md">
          + LAPOR KERUSAKAN BARU
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 tracking-wider">MENUNGGU</p>
            <h2 className="text-4xl font-bold text-orange-600">{stats.menunggu}</h2>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            <Settings size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 tracking-wider">DIPROSES</p>
            <h2 className="text-4xl font-bold text-blue-600">{stats.diproses}</h2>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 tracking-wider">SELESAI</p>
            <h2 className="text-4xl font-bold text-slate-700">{stats.selesai}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">LAPORAN AKTIF (TERBARU)</h2>
              <button onClick={fetchData} className={`text-slate-500 hover:text-primary transition-colors ${loading ? 'animate-spin' : ''}`}>
                <RefreshCw size={20} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4">JUDUL LAPORAN</th>
                    <th className="px-5 py-4">STATUS</th>
                    <th className="px-5 py-4 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {tickets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-slate-500 font-medium">
                        Belum ada laporan kerusakan.
                      </td>
                    </tr>
                  ) : (
                    tickets.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-bold text-primary">{t.ticket_number}</td>
                        <td className="px-5 py-4 text-slate-700 font-medium">{t.judul}</td>
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            t.status === 'menunggu' ? 'bg-orange-100 text-orange-700' :
                            t.status === 'diproses' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-primary hover:text-blue-800 font-semibold flex items-center gap-1 ml-auto">
                            <Eye size={16} /> Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pusat Bantuan */}
          <div className="bg-primary rounded-xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Pusat Bantuan</h3>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                Butuh perbaikan mendesak di luar jam operasional? Hubungi tim teknis standby unit IGD.
              </p>
              <button className="w-full bg-white text-primary font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Phone size={18} /> Hubungi Maintenance
              </button>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 border-4 border-blue-400 rounded-full opacity-20"></div>
          </div>

          {/* Unit Aktivitas */}
          <div className="bg-[#eef2f6] rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Unit Aktivitas</h3>
            <div className="space-y-5">
              {tickets.length === 0 ? (
                <p className="text-sm text-slate-500 italic">Belum ada aktivitas terbaru.</p>
              ) : (
                tickets.slice(0, 3).map((t: any) => (
                  <div key={t.id} className="relative pl-6 before:absolute before:left-1 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full before:ring-4 before:ring-[#eef2f6]">
                    <p className="text-sm text-slate-700 font-medium">Laporan baru: {t.judul}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(t.created_at).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
