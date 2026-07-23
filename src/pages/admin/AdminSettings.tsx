import React, { useEffect, useState } from 'react';
import { Loader2, Save, Mail, Smartphone } from 'lucide-react';
import { fetchSettings, saveSettings } from '../../lib/adminApi';

export default function AdminSettings() {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminMobile, setAdminMobile] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const result = await fetchSettings();
      if (result.success && result.data) {
        setAdminEmail(result.data.adminEmail || '');
        setAdminMobile(result.data.adminMobile || '');
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const result = await saveSettings({ adminEmail: adminEmail.trim(), adminMobile: adminMobile.trim() });
    setSaving(false);
    if (result.success) {
      setMessage({ type: 'success', text: 'Settings saved successfully.' });
    } else {
      setMessage({ type: 'error', text: typeof result.error === 'string' ? result.error : 'Failed to save settings' });
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex justify-center">
          <Loader2 className="animate-spin text-brand-magenta" size={32} />
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Admin Email</label>
            <p className="text-xs text-gray-400 mb-2">New order notification emails are sent to this address.</p>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@milkimom.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Admin Mobile</label>
            <p className="text-xs text-gray-400 mb-2">New order notification SMS is sent to this number.</p>
            <div className="relative">
              <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={adminMobile}
                onChange={(e) => setAdminMobile(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta focus:ring-4 focus:ring-brand-peach/20 outline-none text-sm font-mono"
              />
            </div>
          </div>

          {message && (
            <p
              className={`text-sm font-semibold rounded-xl px-4 py-3 border ${
                message.type === 'success'
                  ? 'text-green-700 bg-green-50 border-green-100'
                  : 'text-red-600 bg-red-50 border-red-100'
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-brand-magenta to-brand-peach text-white px-6 py-3 rounded-xl font-bold hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      )}
    </div>
  );
}
