import { useState, useEffect } from 'react';
import { PlusCircle, FileText, CheckCircle, Clock, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('sipekall_user') || '{}');
  const [recentTickets, setRecentTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      const token = localStorage.getItem('sipekall_token');
      const res = await fetch('/api/tickets', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setRecentTickets(data.slice(0, 3));
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Welcome */}
      <section className="bg-primary rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
               Butuh Perbaikan Fasilitas?
            </h1>
            <p className="text-blue-100 text-lg mt-4 font-medium opacity-90">
               Laporkan kerusakan peralatan atau lingkungan di unit {user.unit} Anda sekarang. Teknisi siap siaga 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
               <Link to="/user/lapor" className="bg-white text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2">
                 <PlusCircle size={20} /> Buat Laporan Baru
               </Link>
               <Link to="/user/riwayat" className="bg-primary border-2 border-blue-400/30 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                 <History size={20} className="hidden sm:inline" /> Lihat Riwayat
               </Link>
            </div>
         </div>
         {/* Decorative element */}
         <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-600/20 skew-x-[-15deg] translate-x-20 blur-3xl"></div>
         <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      </section>

      {/* Quick Stats & Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
             <Clock className="text-primary" /> Laporan Terbaru Anda
           </h3>
           <div className="grid grid-cols-1 gap-4">
              {recentTickets.length === 0 ? (
                <div className="bg-white p-10 rounded-3xl border border-slate-100 text-center text-slate-400 font-bold uppercase tracking-widest">Belum ada laporan aktif</div>
              ) : (
                recentTickets.map(t => (
                  <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${t.status === 'menunggu' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-primary'}`}>
                           {t.status === 'selesai_teknisi' ? <CheckCircle /> : <FileText />}
                        </div>
                        <div>
                           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">#{t.ticket_number}</p>
                           <h4 className="font-bold text-slate-800">{t.judul}</h4>
                        </div>
                     </div>
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                       t.status === 'menunggu' ? 'bg-red-50 text-red-600' : 
                       t.status === 'diproses' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                     }`}>
                       {t.status}
                     </span>
                  </div>
                ))
              )}
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-800">Panduan Pelaporan</h3>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
                 <p className="text-sm text-slate-600 font-medium">Klik tombol <span className="font-bold text-primary">Buat Laporan Baru</span> di atas.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
                 <p className="text-sm text-slate-600 font-medium">Isi detail kerusakan, lokasi, dan lampirkan foto jika ada.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">3</div>
                 <p className="text-sm text-slate-600 font-medium">Pantau status perbaikan di tab <span className="font-bold text-primary">Riwayat</span> secara berkala.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
