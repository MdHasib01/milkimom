import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Package, Settings, Users, LogOut } from 'lucide-react';
import { getToken, getStoredUser, logout } from '../../lib/adminApi';
import logoImg from '../../assets/logo.png';

const NAV_ITEMS = [
  { to: '/admin/orders', label: 'Orders', Icon: Package },
  { to: '/admin/settings', label: 'Settings', Icon: Settings },
  { to: '/admin/users', label: 'Admin Users', Icon: Users },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getStoredUser();

  useEffect(() => {
    if (!getToken()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  if (!getToken()) return null;

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Milkimom" className="h-8 w-auto object-contain" />
            <span className="font-bold text-gray-900 hidden sm:inline">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            {user && <span className="text-sm text-gray-500 hidden sm:inline">{user.name}</span>}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-brand-magenta text-brand-magenta'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
