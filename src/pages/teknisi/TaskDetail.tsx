import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Tag, AlertTriangle, Loader2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [catatan, setCatatan] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const token = localStorage.getItem('sipekall_token');
    const res = await fetch(`/api/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setTask(await res.json());
    setLoading(false);
  };

  const handleUpdateStatus = async (status: string) => {
    setSubmitting(true);
    const token = localStorage.getItem('sipekall_token');
    const res = await fetch(`/api/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ 
        status, 
        catatan_perbaikan: catatan 
      })
    });
    if (res.ok) {
      if (status === 'selesai_teknisi') {
        alert('Tugas diselesaikan!');
        navigate('/teknisi/dashboard');
      } else {
        fetchTask();
      }
    }
    setSubmitting(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-400 font-bold uppercase tracking-widest animate-pulse">Memuat Tugas...</div>;
  if (!task) return <div>Tugas tidak ditemukan.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <Link to="/teknisi/dashboard" className="inline-flex items-center gap-2 text-slate-500 font-bold text-xs uppercase hover:text-primary transition-colors">
        <ArrowLeft size={16} /> Kembali ke Dashboard
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-primary p-8 text-white">
           <div className="flex justify-between items-start mb-4">
              <span className="text-blue-200 font-bold text-sm">Tiket #{task.ticket_number}</span>
              <span className="bg-white/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">{task.prioritas}</span>
           </div>
           <h1 className="text-3xl font-black">{task.judul}</h1>
        </div>

        <div className="p-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                 <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><MapPin size={20} /></div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lokasi</p>
                    <p className="text-sm font-bold text-slate-700">{task.lokasi}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                 <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Tag size={20} /></div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</p>
                    <p className="text-sm font-bold text-slate-700">{task.kategori}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} /> Deskripsi Laporan
              </h3>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed italic">
                 "{task.deskripsi || 'Tidak ada deskripsi.'}"
              </div>
           </div>

           {task.status === 'ditugaskan' && (
             <button 
               onClick={() => handleUpdateStatus('diproses')}
               disabled={submitting}
               className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
             >
               {submitting ? <Loader2 className="animate-spin" /> : 'MULAI PENGERJAAN SEKARANG'}
             </button>
           )}

           {task.status === 'diproses' && (
             <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Catatan Perbaikan</label>
                   <textarea 
                     value={catatan}
                     onChange={(e) => setCatatan(e.target.value)}
                     className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-h-[120px]"
                     placeholder="Tuliskan tindakan yang dilakukan..."
                   ></textarea>
                </div>
                <button 
                  onClick={() => handleUpdateStatus('selesai_teknisi')}
                  disabled={submitting || !catatan}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-200 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : 'KONFIRMASI PEKERJAAN SELESAI'}
                </button>
             </div>
           )}

           {task.status === 'selesai_teknisi' && (
             <div className="p-6 bg-green-50 rounded-2xl border border-green-200 flex items-center gap-4">
                <div className="p-3 bg-green-600 text-white rounded-full shadow-md"><CheckCircle size={24} /></div>
                <div>
                   <p className="font-bold text-green-800">Tugas Telah Selesai</p>
                   <p className="text-xs text-green-600">Menunggu verifikasi penutupan dari unit pelapor.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
