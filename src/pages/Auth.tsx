import React, { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('sipekall_token', data.token);
        localStorage.setItem('sipekall_user', JSON.stringify(data.user));
        localStorage.setItem('sipekall_role', data.user.role);
        window.location.href = '/';
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-primary p-10 text-center relative overflow-hidden">
           <div className="relative z-10">
             <h1 className="text-4xl font-black text-white tracking-tight">SIPEKAL</h1>
             <p className="text-blue-100 text-sm mt-2 font-medium uppercase tracking-widest opacity-80">Maintenance System v2.1</p>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full blur-2xl"></div>
        </div>
        
        <form onSubmit={handleLogin} className="p-10 space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              placeholder="name@sipekal.id"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-70 uppercase tracking-widest text-sm"
          >
            {loading ? 'Authenticating...' : 'Sign In Now'}
          </button>
          
          <div className="pt-4 border-t border-slate-100">
             <p className="text-center text-xs text-slate-400 font-medium">Lupa password? Hubungi Administrator SIMRS</p>
          </div>
        </form>
      </div>
    </div>
  );
}
