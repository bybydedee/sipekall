import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Tag, AlertTriangle, UploadCloud, Loader2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deskripsiSelesai, setDeskripsiSelesai] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('sipekall_token');
        const res = await fetch(`/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTask(data);
        }
      } catch (error) {
        console.error('Fetch task error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskripsiSelesai) return alert('Silakan isi tindakan yang dilakukan.');
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'selesai',
          deskripsi_selesai: deskripsiSelesai
        })
      });
      if (res.ok) {
        alert('Tugas berhasil diselesaikan!');
        navigate('/teknisi/dashboard');
      }
    } catch (error) {
      console.error('Finish task error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2" /> Memuat detail tugas...</div>;
  if (!task) return <div className="p-10 text-center">Tugas tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Link to="/teknisi/dashboard" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Detail Tugas</h1>
          <p className="text-slate-500 text-sm">{task.ticket_number}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs font-bold uppercase">{task.status.replace('_', ' ')}</span>
              <span className="text-sm font-bold text-slate-500 flex items-center gap-1"><Clock size={16}/> Lapor: {new Date(task.created_at).toLocaleDateString()}</span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">{task.judul}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <span className="flex items-center gap-1"><MapPin size={16} className="text-slate-400"/> {task.lokasi}</span>
              <span className="flex items-center gap-1"><Tag size={16} className="text-slate-400"/> {task.kategori}</span>
              <span className={`flex items-center gap-1 font-semibold ${task.prioritas === 'Darurat' ? 'text-red-600' : 'text-orange-600'}`}>
                <AlertTriangle size={16}/> Prioritas {task.prioritas}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mb-6 text-slate-700 text-sm leading-relaxed">
              <strong>Deskripsi:</strong> {task.deskripsi}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Form Penyelesaian Tugas</h2>
            <form onSubmit={handleFinish} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tindakan / Solusi yang Dilakukan <span className="text-red-500">*</span></label>
                <textarea 
                  rows={4}
                  required
                  value={deskripsiSelesai}
                  onChange={(e) => setDeskripsiSelesai(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
                  placeholder="Ceritakan detail perbaikan yang Anda lakukan..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                   {submitting ? <Loader2 className="animate-spin" /> : 'TANDAI SEBAGAI SELESAI'}
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
                <p className="text-sm font-medium text-slate-800">{task.nama_alat || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Merk/Type</p>
                <p className="text-sm font-medium text-slate-800">{task.merk || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Waktu Kejadian</p>
                <p className="text-sm font-medium text-slate-800">{task.tgl_kejadian ? new Date(task.tgl_kejadian).toLocaleString() : '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
