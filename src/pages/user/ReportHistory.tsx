import { Search, Filter, Download } from 'lucide-react';

export default function ReportHistory() {
  const tickets = [
    { id: 'TK101', tgl: '12 Mei 26', judul: 'Roda Ranjang Pasien #04 Macet', status: 'MENUNGGU', teknisi: '-' },
    { id: 'TK099', tgl: '11 Mei 26', judul: 'Keran Wastafel Ruang Tindakan Bocor', status: 'DIPROSES', teknisi: 'Anton' },
    { id: 'TK080', tgl: '05 Mei 26', judul: 'Lampu Toilet Pasien Mati', status: 'SELESAI', teknisi: 'Budi' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">RIWAYAT LAPORAN UNIT IGD</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari Laporan: [Ketik judul...]" 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="bg-primary text-white px-6 font-semibold rounded-lg hover:bg-blue-800 transition-colors">CARI</button>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50">
              <Filter size={16} /> FILTER
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold bg-slate-100 hover:bg-slate-200">
              <Download size={16} /> UNDUH DATA
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-xl p-5 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">TOTAL LAPORAN</p>
            <h3 className="text-3xl font-bold text-primary">182</h3>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">DALAM PROSES</p>
            <h3 className="text-3xl font-bold text-orange-600">12</h3>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">TERSELESAIKAN</p>
            <h3 className="text-3xl font-bold text-primary">170</h3>
          </div>
        </div>

        {/* Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">TANGGAL</th>
                  <th className="px-5 py-4">JUDUL LAPORAN</th>
                  <th className="px-5 py-4">STATUS</th>
                  <th className="px-5 py-4">TEKNISI</th>
                  <th className="px-5 py-4 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {tickets.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-primary">{t.id}</td>
                    <td className="px-5 py-4 text-slate-600">{t.tgl}</td>
                    <td className="px-5 py-4 text-slate-800 font-medium">{t.judul}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        t.status === 'MENUNGGU' ? 'bg-red-50 text-red-600' :
                        t.status === 'DIPROSES' ? 'bg-slate-100 text-slate-600' :
                        'bg-blue-50 text-primary'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{t.teknisi}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-primary hover:text-blue-800 font-bold text-xs uppercase tracking-wider">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              Halaman 
              <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded font-bold">1</span>
              <span className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded cursor-pointer">2</span>
              <span className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded cursor-pointer">3</span>
            </div>
            <button className="px-4 py-2 border border-slate-300 rounded text-slate-600 bg-white hover:bg-slate-50 font-bold text-sm uppercase">Muat Lagi</button>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl font-bold mb-2">Butuh Bantuan Mendesak?</h2>
          <p className="text-blue-100">Jika terjadi kerusakan fasilitas yang mengancam keselamatan pasien, hubungi Hotline Maintenance IGD segera.</p>
        </div>
        <button className="mt-6 md:mt-0 relative z-10 bg-[#a5c2f5] hover:bg-[#8eb3f3] text-primary font-bold py-3 px-8 rounded-lg shadow-md transition-colors whitespace-nowrap">
          HUBUNGI TEKNISI
        </button>
        <div className="absolute right-0 top-0 w-64 h-full bg-blue-600/30 -skew-x-12 translate-x-10"></div>
      </div>
    </div>
  );
}