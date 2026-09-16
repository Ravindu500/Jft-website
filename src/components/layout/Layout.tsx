import { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import { useAuth } from '../../lib/auth';

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-jft-cream">
      <Navbar />
      <main className={`flex-1 ${user ? 'pb-20 md:pb-6' : ''}`}>
        {children}
      </main>
      {user && <MobileNav />}
      <footer className="bg-jft-navy text-white/80 py-8 mt-auto hidden md:block">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-white mb-1">JFT Japanese Free Learning 🇯🇵</p>
          <p className="text-sm">Independent educational platform for Sri Lankan students preparing for JFT-Basic</p>
          <p className="text-xs mt-3 text-white/50">Not affiliated with Japan Foundation or official JFT examinations</p>
        </div>
      </footer>
    </div>
  );
}
