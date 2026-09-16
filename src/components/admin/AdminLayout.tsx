import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import {
  LayoutDashboard, Users, BookOpen, FileText, Gamepad2,
  MessageSquare, Settings, LogOut, ChevronLeft
} from 'lucide-react';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/students', icon: Users, label: 'Students' },
  { to: '/admin/content', icon: BookOpen, label: 'Content' },
  { to: '/admin/papers', icon: FileText, label: 'Papers' },
  { to: '/admin/games', icon: Gamepad2, label: 'Games' },
  { to: '/admin/popups', icon: MessageSquare, label: 'Popups' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-jft-cream">
      {/* Sidebar */}
      <aside className="w-60 bg-jft-navy text-white flex-col hidden md:flex shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-jft-red flex items-center justify-center text-sm font-bold">日</div>
            <div>
              <p className="font-bold text-sm">JFT Admin</p>
              <p className="text-[10px] text-white/40">Control Center</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {links.map(l => {
            const active = l.exact ? location.pathname === l.to : location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition ${
                  active ? 'bg-jft-red text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <l.icon size={18} />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5">
            <ChevronLeft size={18} /> Student View
          </Link>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-jft-navy text-white z-50 px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-sm">JFT Admin</span>
        <div className="flex gap-3 overflow-x-auto">
          {links.slice(0, 4).map(l => (
            <Link key={l.to} to={l.to} className="text-xs text-white/70 hover:text-white whitespace-nowrap">{l.label}</Link>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        <div className="p-4 md:p-6 max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
