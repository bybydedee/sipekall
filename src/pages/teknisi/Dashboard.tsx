import { useState, useEffect } from 'react';
import { ClipboardList, Clock, CheckCircle, Search, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeknisiDashboard() {
  const [stats, setStats] = useState({ menunggu: 0, diproses: 0, selesai: 0 });
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('sipekall_user') || '{}');

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
      
      if (ticketsRes.ok) {
        // Filter tasks: either assigned to me OR unassigned (menunggu)
        const myTasks = ticketsData.filter((t: any) => 
          t.teknisi_id === user.id || (t.status === 'menunggu')
        );
        setTasks(myTasks);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAcceptTask = async (taskId: number) => {
    if (!confirm('Terima tugas ini sekarang?')) return;
    
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch(`/api/tickets/${taskId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'diproses',
          teknisi_id: user.id
        })
      });
      if (res.ok) {
        alert('Tugas diterima! Silakan mulai pengerjaan.');
        fetchData();
      }
    } catch (error) {
      console.error('Accept task error:', error);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
            {user.nama_lengkap?.[0] || 'T'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Halo, {user.nama_lengkap}</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Status: <strong className="text-slate-700">Aktif & Siap Menerima Tugas</strong>
            </p>
          </div>
        </div>
        <button onClick={fetchData} className="relative z-10 p-2 text-slate-500 hover:text-primary transition-colors">
           <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
        </button>
        {/* Background Decors */}
        <div className="absolute right-0 top-0 w-64 h-full bg-slate-50 -skew-x-12 translate-x-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 rounded-xl p-6 border border-red-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <ClipboardList size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-red-600 uppercase tracking-wider">Tugas Baru</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.menunggu}</h2>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">Sedang Dikerjakan</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.diproses}</h2>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-green-600 uppercase tracking-wider">Selesai</p>
            <h2 className="text-3xl font-bold text-slate-800">{stats.selesai}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-800">Daftar Tugas Saya</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <div className="p-10 text-center text-slate-500 font-medium">Belum ada tugas untuk Anda.</div>
          ) : (
            tasks.map(t => (
              <div key={t.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-12 rounded-full ${t.status === 'menunggu' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-500">{t.ticket_number}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        t.prioritas === 'Tinggi' || t.prioritas === 'Darurat' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>{t.prioritas}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{t.judul}</h3>
                    <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                      <span className="font-medium text-slate-800">Lokasi: {t.lokasi}</span> • Lapor: <span>{new Date(t.created_at).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                  {t.status === 'menunggu' ? (
                    <button 
                      onClick={() => handleAcceptTask(t.id)}
                      className="flex-1 md:flex-none bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-800 shadow-sm transition-colors text-sm"
                    >
                      TERIMA TUGAS
                    </button>
                  ) : (
                    <Link to={`/teknisi/task/${t.id}`} className="flex-1 md:flex-none bg-orange-500 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-orange-600 shadow-sm transition-colors text-sm text-center">
                      PROSES PENYELESAIAN
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
