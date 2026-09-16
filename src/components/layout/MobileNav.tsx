import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, BookOpen, Gamepad2, User } from 'lucide-react';

const items = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/vocabulary', icon: BookOpen, label: 'Study' },
  { to: '/daily-games', icon: Gamepad2, label: 'Games' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-jft-navy/10 z-40 safe-bottom">
      <div className="flex justify-around items-center h-16">
        {items.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition ${
                active ? 'text-jft-red' : 'text-jft-navy/50'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
