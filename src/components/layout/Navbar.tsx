import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <header className="bg-white border-b border-jft-navy/10 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-jft-red flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition">
            日
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-jft-navy text-lg leading-tight block">JFT Learning</span>
            <span className="text-[10px] text-jft-navy/50 leading-none">Free Japanese</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-jft-navy/70 hover:text-jft-red hover:bg-jft-red/5 transition">Dashboard</Link>
              <Link to="/lessons" className="px-3 py-2 rounded-lg text-sm font-medium text-jft-navy/70 hover:text-jft-red hover:bg-jft-red/5 transition">Lessons</Link>
              <Link to="/vocabulary" className="px-3 py-2 rounded-lg text-sm font-medium text-jft-navy/70 hover:text-jft-red hover:bg-jft-red/5 transition">Vocabulary</Link>
              <Link to="/kanji" className="px-3 py-2 rounded-lg text-sm font-medium text-jft-navy/70 hover:text-jft-red hover:bg-jft-red/5 transition">Kanji</Link>
              <Link to="/daily-games" className="px-3 py-2 rounded-lg text-sm font-medium text-jft-navy/70 hover:text-jft-red hover:bg-jft-red/5 transition">Games</Link>
              {isAdmin && (
                <Link to="/admin" className="px-3 py-2 rounded-lg text-sm font-medium text-jft-red hover:bg-jft-red/5 transition flex items-center gap-1">
                  <Settings size={16} /> Admin
                </Link>
              )}
              <div className="ml-2 flex items-center gap-2 pl-3 border-l border-jft-navy/10">
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                  <div className="w-8 h-8 rounded-full bg-jft-navy text-white flex items-center justify-center text-sm font-semibold">
                    {user.profilePhoto ? <img src={user.profilePhoto} className="w-full h-full rounded-full object-cover" alt="" /> : user.fullName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-jft-navy hidden lg:block">{user.fullName.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-lg text-jft-navy/50 hover:text-jft-red hover:bg-jft-red/5 transition" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm !py-2">Login</Link>
              <Link to="/register" className="btn-primary text-sm !py-2">Register Free</Link>
            </>
          )}
        </nav>

        <button className="md:hidden p-2 rounded-lg hover:bg-jft-cream-dark" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-jft-navy/10 bg-white animate-fade-in-up">
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg font-medium hover:bg-jft-cream">Dashboard</Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg font-medium hover:bg-jft-cream">Profile</Link>
                {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg font-medium text-jft-red hover:bg-jft-cream">Admin Panel</Link>}
                <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-jft-red hover:bg-jft-cream">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg font-medium hover:bg-jft-cream">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg font-medium text-jft-red hover:bg-jft-cream">Register Free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
