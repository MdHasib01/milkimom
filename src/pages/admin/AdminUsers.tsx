import React, { useCallback, useEffect, useState } from 'react';
import { Loader2, UserPlus, Trash2, KeyRound, X } from 'lucide-react';
import {
  fetchAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getStoredUser,
  type AdminUser,
} from '../../lib/adminApi';

export default function AdminUsers() {
  const currentUser = getStoredUser();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [creating, setCreating] = useState(false);

  const [resetId, setResetId] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const result = await fetchAdminUsers();
    if (result.success) {
      setUsers(result.data || []);
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Failed to load admin users');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const result = await createAdminUser({ name: newName.trim(), email: newEmail.trim(), password: newPassword });
    setCreating(false);
    if (result.success) {
      setShowCreate(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      load();
    } else {
      alert(typeof result.error === 'string' ? result.error : 'Failed to create admin user');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetId) return;
    setBusyId(resetId);
    const result = await updateAdminUser(resetId, { password: resetPassword });
    setBusyId(null);
    if (result.success) {
      setResetId(null);
      setResetPassword('');
      alert('Password updated.');
    } else {
      alert(typeof result.error === 'string' ? result.error : 'Failed to update password');
    }
  };

  const handleToggleActive = async (user: AdminUser) => {
    setBusyId(user.id);
    const result = await updateAdminUser(user.id, { active: !user.active });
    setBusyId(null);
    if (result.success) {
      load();
    } else {
      alert(typeof result.error === 'string' ? result.error : 'Failed to update user');
    }
  };

  const handleDelete = async (user: AdminUser) => {
    if (!confirm(`Delete admin "${user.name}" (${user.email})? This cannot be undone.`)) return;
    setBusyId(user.id);
    const result = await deleteAdminUser(user.id);
    setBusyId(null);
    if (result.success) {
      load();
    } else {
      alert(typeof result.error === 'string' ? result.error : 'Failed to delete user');
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
        <button
          onClick={() => setShowCreate((v) => !v)}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-magenta to-brand-peach text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:opacity-95 active:scale-[0.98] transition-all"
        >
          {showCreate ? <X size={16} /> : <UserPlus size={16} />}
          {showCreate ? 'Cancel' : 'Add Admin'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            placeholder="Name"
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta outline-none text-sm"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            placeholder="Email"
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta outline-none text-sm"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-magenta outline-none text-sm"
          />
          <button
            type="submit"
            disabled={creating}
            className="sm:col-span-3 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {creating && <Loader2 className="animate-spin" size={16} />}
            Create Admin User
          </button>
        </form>
      )}

      {error && (
        <p className="text-sm text-red-600 font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">{error}</p>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex justify-center">
          <Loader2 className="animate-spin text-brand-magenta" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
          {users.map((user) => (
            <div key={user.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${user.role === 'superadmin' ? 'bg-brand-lightpink text-brand-magenta' : 'bg-gray-100 text-gray-600'}`}>
                    {user.role}
                  </span>
                  {!user.active && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                      Deactivated
                    </span>
                  )}
                  {currentUser?.id === user.id && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">You</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                {user.lastLoginAt && (
                  <p className="text-xs text-gray-400">
                    Last login: {new Date(user.lastLoginAt).toLocaleString('en-GB')}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => { setResetId(resetId === user.id ? null : user.id); setResetPassword(''); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <KeyRound size={14} /> Reset Password
                </button>
                {currentUser?.id !== user.id && (
                  <>
                    <button
                      onClick={() => handleToggleActive(user)}
                      disabled={busyId === user.id}
                      className="text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      {user.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={busyId === user.id}
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </>
                )}
              </div>

              {resetId === user.id && (
                <form onSubmit={handleResetPassword} className="w-full sm:w-auto flex gap-2 sm:basis-full sm:mt-2">
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="New password (min 6 chars)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-magenta outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={busyId === user.id}
                    className="bg-gray-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 disabled:opacity-60"
                  >
                    Save
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
