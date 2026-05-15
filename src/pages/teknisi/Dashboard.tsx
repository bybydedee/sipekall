import { useState, useEffect } from 'react';
import { ClipboardList, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeknisiDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState({ menunggu: 0, diproses: 0, selesai: 0 });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('sipekall_token');
    const res = await fetch('/api/tickets', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setTasks(await res.json());
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('sipekall_token');
    const res = await fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setStats(await res.json());
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Teknisi Workspace</h1>
          <p className="text-slate-500 font-medium">Daftar Tugas Pemeliharaan Anda</p>
        </div>
        <button onClick={() => { fetchTasks(); fetchStats(); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <RefreshCw size={20} className="text-slate-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TUGAS BARU</p>
           <h2 className="text-3xl font-black text-red-600">{stats.menunggu}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SEDANG DIKERJAKAN</p>
           <h2 className="text-3xl font-black text-orange-600">{stats.diproses}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SELESAI</p>
           <h2 className="text-3xl font-black text-primary">{stats.selesai}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
           <h3 className="font-bold text-slate-700 uppercase tracking-wider text-sm flex items-center gap-2">
             <ClipboardList size={18} className="text-primary" /> Daftar Pekerjaan
           </h3>
        </div>
        <div className="divide-y divide-slate-100">
           {tasks.length === 0 ? (
             <div className="p-10 text-center text-slate-400 font-medium">Tidak ada tugas saat ini.</div>
           ) : (
             tasks.map(task => (
               <div key={task.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold text-sm">#{task.ticket_number}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        task.status === 'menunggu' ? 'bg-red-100 text-red-600' :
                        task.status === 'diproses' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800">{task.judul}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {task.lokasi} • Dilaporkan: {new Date(task.created_at).toLocaleDateString()}
                    </p>
                 </div>
                 <Link 
                   to={`/teknisi/task/${task.id}`}
                   className="bg-primary text-white text-[10px] font-black px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-all shadow-md shadow-primary/10 uppercase tracking-widest text-center"
                 >
                   BUKA TUGAS
                 </Link>
               </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
}
