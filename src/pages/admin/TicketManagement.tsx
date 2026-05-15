import { useState, useEffect } from 'react';
import { Search, RefreshCw, CheckCircle, Clock, UserPlus, X } from 'lucide-react';

export default function TicketManagement() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [teknisi, setTeknisi] = useState<any[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedTeknisiId, setSelectedTeknisiId] = useState<number | ''>('');

  useEffect(() => {
    fetchData();
    fetchTeknisi();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('sipekall_token');
    const res = await fetch('/api/tickets', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setTickets(await res.json());
  };

  const fetchTeknisi = async () => {
    // In a real app, this would be an endpoint. For now, we seed or mock.
    // For this demo, let's assume we can fetch users with role 'teknisi'
    const token = localStorage.getItem('sipekall_token');
    const res = await fetch('/api/auth', { headers: { Authorization: `Bearer ${token}` } }); // Mock usage
    // Using hardcoded for now or we could create /api/users
    setTeknisi([
      { id: 2, nama_lengkap: 'Ahmad Teknik (Listrik)' },
      { id: 4, nama_lengkap: 'Budi Maintenance (Gedung)' }
    ]);
  };

  const handleAssign = async () => {
    if (!selectedTeknisiId || !selectedTicket) return;
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          teknisi_id: selectedTeknisiId,
          status: 'ditugaskan'
        })
      });
      if (res.ok) {
        setShowAssignModal(false);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Manajemen Tiket</h1>
        <button onClick={fetchData} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <RefreshCw size={20} className="text-slate-500" />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Tiket..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 bg-white">
            <th className="uppercase tracking-widest">Semua Status</th>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID TICKET</th>
                <th className="px-6 py-4">JUDUL & LOKASI</th>
                <th className="px-6 py-4">PRIORITAS</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{t.ticket_number}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700">{t.judul}</p>
                    <p className="text-xs text-slate-500">{t.lokasi}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      t.prioritas === 'Sangat Tinggi' ? 'bg-red-100 text-red-700' :
                      t.prioritas === 'Tinggi' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.prioritas}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       {t.status === 'menunggu' && <Clock size={14} className="text-red-500" />}
                       {t.status === 'diproses' && <RefreshCw size={14} className="text-orange-500 animate-spin" />}
                       {t.status === 'selesai_teknisi' && <CheckCircle size={14} className="text-green-500" />}
                       <span className="text-xs font-bold text-slate-600 capitalize">{t.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {t.status === 'menunggu' ? (
                      <button 
                        onClick={() => { setSelectedTicket(t); setShowAssignModal(true); }}
                        className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-lg hover:bg-blue-800 transition-all shadow-md shadow-primary/10 uppercase tracking-widest flex items-center gap-2 ml-auto"
                      >
                        <UserPlus size={12} /> Tugaskan
                      </button>
                    ) : (
                      <button className="text-slate-400 font-bold text-[10px] uppercase hover:text-primary transition-colors tracking-widest">Detail</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAssignModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden border border-slate-200">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Pilih Teknisi Pelaksana</h3>
               <button onClick={() => setShowAssignModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
               <p className="text-xs text-slate-500">Tiket: <span className="font-bold text-primary">{selectedTicket?.judul}</span></p>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Personel</label>
                 <select 
                    value={selectedTeknisiId}
                    onChange={(e) => setSelectedTeknisiId(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700"
                 >
                   <option value="">-- Pilih Teknisi --</option>
                   {teknisi.map(tech => (
                     <option key={tech.id} value={tech.id}>{tech.nama_lengkap}</option>
                   ))}
                 </select>
               </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
               <button 
                 onClick={handleAssign}
                 className="flex-1 bg-primary text-white font-black py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-800 transition-all uppercase text-xs tracking-widest"
               >
                 KONFIRMASI TUGAS
               </button>
               <button 
                 onClick={() => setShowAssignModal(false)}
                 className="px-6 py-2 font-bold text-slate-500 hover:text-slate-700"
               >
                 BATAL
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
