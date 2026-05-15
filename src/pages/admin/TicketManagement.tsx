import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, UserPlus, X, RefreshCw } from 'lucide-react';

export default function TicketManagement() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('semua');
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const technicians = [
    { id: 2, name: 'Budi Santoso' },
    { id: 3, name: 'Cecep' },
    { id: 4, name: 'Ahmad Supriyadi' }
  ];

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch('/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setTickets(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAssign = async (techId: number, techName: string) => {
    try {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'diproses',
          teknisi_id: techId
        })
      });
      if (res.ok) {
        setShowAssignModal(false);
        fetchTickets();
        alert(`Tiket berhasil ditugaskan ke ${techName}`);
      }
    } catch (error) {
      console.error('Assign error:', error);
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (activeTab === 'semua') return true;
    return t.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatsCount = (status: string) => {
    if (status === 'semua') return tickets.length;
    return tickets.filter(t => t.status === status).length;
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Tiket</h1>
          <p className="text-slate-500 mt-1">Disposisi dan pantau laporan kerusakan dari seluruh unit.</p>
        </div>
        <button onClick={fetchTickets} className="p-2 text-slate-500 hover:text-primary transition-colors">
           <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'menunggu', label: 'Menunggu' },
            { id: 'diproses', label: 'Diproses' },
            { id: 'selesai', label: 'Selesai' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-primary text-primary bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.label} ({getStatsCount(tab.id)})
            </button>
          ))}
        </div>

        <div className="p-5">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari ID atau Judul..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-y border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">ID Tiket</th>
                  <th className="px-5 py-4">Judul Laporan</th>
                  <th className="px-5 py-4">Prioritas</th>
                  <th className="px-5 py-4">Teknisi</th>
                  <th className="px-5 py-4">Waktu Lapor</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-slate-500 font-medium">
                      Belum ada tiket dalam kategori ini.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-5 py-4 font-bold text-slate-800">{t.ticket_number}</td>
                      <td className="px-5 py-4 text-slate-600 font-medium">{t.judul}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                          t.prioritas === 'Tinggi' || t.prioritas === 'Darurat' ? 'bg-red-100 text-red-700' :
                          t.prioritas === 'Sedang' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {t.prioritas}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {!t.teknisi_id ? (
                          <span className="text-slate-400 italic text-sm flex items-center gap-1">
                            <Clock size={14} /> Belum ada
                          </span>
                        ) : (
                          <span className="text-slate-700 font-medium flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">T</div>
                             Teknisi #{t.teknisi_id}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-500">{new Date(t.created_at).toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                          t.status === 'menunggu' ? 'bg-white border-slate-300 text-slate-600' :
                          t.status === 'diproses' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                          'bg-green-50 border-green-200 text-green-700 flex items-center w-max gap-1'
                        }`}>
                          {t.status === 'selesai' && <CheckCircle size={12} />} {t.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {t.status === 'menunggu' ? (
                          <button 
                            onClick={() => { setSelectedTicket(t); setShowAssignModal(true); }}
                            className="bg-primary hover:bg-blue-800 text-white font-bold text-xs px-4 py-1.5 rounded transition-colors shadow-sm flex items-center gap-2 ml-auto"
                          >
                            <UserPlus size={14} /> DISPOSISI
                          </button>
                        ) : (
                          <button className="text-primary hover:underline font-bold text-xs uppercase">
                            DETAIL
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center text-sm text-slate-500">
            <p>Menampilkan {filteredTickets.length} tiket</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 border border-slate-200 rounded bg-primary text-white font-medium">1</button>
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Tugaskan Teknisi</h3>
                <p className="text-sm text-slate-500">Tiket: {selectedTicket?.ticket_number}</p>
              </div>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Pilih Teknisi Tersedia:</p>
              {technicians.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => handleAssign(tech.id, tech.name)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary shadow-sm group-hover:text-primary">
                      {tech.name.charAt(0)}
                    </div>
                    <span className="font-bold">{tech.name}</span>
                  </div>
                  <UserPlus size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
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
