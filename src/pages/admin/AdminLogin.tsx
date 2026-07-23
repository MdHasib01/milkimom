import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { adminLogin, getToken } from '../../lib/adminApi';
import logoImg from '../../assets/logo.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (getToken()) {
    navigate('/admin/orders', { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await adminLogin(email.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate('/admin/orders', { replace: true });
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logoImg} alt="Milkimom" className="h-10 w-auto object-contain mb-4" />
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lock size={18} className="text-brand-magenta" /> Admin Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@milkimom.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 outline-none text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-magenta to-brand-peach text-white py-3.5 rounded-xl font-bold hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
