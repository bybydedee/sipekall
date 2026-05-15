import React, { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dummyLogins = [
    { role: 'admin', email: 'admin@test.com', label: 'Admin', color: 'bg-indigo-600' },
    { role: 'teknisi', email: 'teknisi@test.com', label: 'Teknisi', color: 'bg-orange-500' },
    { role: 'user', email: 'user@test.com', label: 'User/Unit', color: 'bg-green-600' },
  ];

  const handleDummyLogin = (role: string, emailStr: string) => {
    // Simulate successful login for dummy accounts
    const dummyUser = {
      id: 999,
      email: emailStr,
      nama_lengkap: role.toUpperCase() + ' TEST',
      role: role
    };
    localStorage.setItem('sipekall_token', 'dummy-token-' + role);
    localStorage.setItem('sipekall_role', role);
    localStorage.setItem('sipekall_user', JSON.stringify(dummyUser));
    window.location.reload();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for dummy logins first
    const isDummy = dummyLogins.find(d => d.email === email && password === 'password');
    if (isDummy) {
      handleDummyLogin(isDummy.role, isDummy.email);
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('sipekall_token', data.token);
      localStorage.setItem('sipekall_role', data.user.role);
      localStorage.setItem('sipekall_user', JSON.stringify(data.user));
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
            <h1 className="text-3xl font-black text-primary tracking-tighter">SIPEKAL</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">Sistem Informasi Pemeliharaan Alat Kesehatan & Lingkungan</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            {error}
          </div>
        )}

        <div className="mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Pilih Role (Dummy Login)</p>
          <div className="grid grid-cols-3 gap-3">
            {dummyLogins.map((d) => (
              <button
                key={d.role}
                onClick={() => handleDummyLogin(d.role, d.email)}
                className={`${d.color} text-white text-[10px] font-black uppercase py-3 rounded-xl shadow-md hover:scale-105 transition-all active:scale-95`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold">Atau Login Manual</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-800 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-800 font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
          >
            MASUK KE SISTEM
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8 font-medium">
          Lupa password? Hubungi Admin IT Rumah Sakit.
        </p>
      </div>
    </div>
  );
}