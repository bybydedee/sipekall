import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, History, Settings, HelpCircle, LogOut, FileText, Bell } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const role = localStorage.getItem('sipekall_role') || 'user';
  const user = JSON.parse(localStorage.getItem('sipekall_user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const menuItems = {
    user: [
      { path: '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/user/lapor', icon: FilePlus, label: 'Lapor' },
      { path: '/user/riwayat', icon: History, label: 'Riwayat' },
    ],
    admin: [
      { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/admin/tickets', icon: FileText, label: 'Tiket' },
    ],
    teknisi: [
      { path: '/teknisi/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '#', icon: History, label: 'Daftar Tugas' },
    ]
  };

  const navLinks = menuItems[role as keyof typeof menuItems] || [];

  return (
    <div className="flex h-screen bg-[#f8f9fc] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#f8f9fc] border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 pb-8">
            <h1 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="bg-primary text-white p-1.5 rounded text-sm shrink-0">SIP</span>
              SIPEKAL
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Aktif: {user.nama_lengkap || 'Unknown'}</p>
          </div>

          <nav className="px-4 space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-[#eef2f6] text-primary shadow-sm relative after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-8 after:bg-primary after:rounded-r-full' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-primary" : "text-slate-500"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 space-y-1.5 border-t border-slate-200">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <Settings size={20} className="text-slate-500" />
            Settings
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <HelpCircle size={20} className="text-slate-500" />
            Help
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-4">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Toggle could go here */}
             <div className="font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               Halo, {user.nama_lengkap || 'User'}
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden shadow-sm">
               {user.nama_lengkap?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#f8f9fc] p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
