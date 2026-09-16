import { useData } from '../../lib/data-store';
import { Users, BookOpen, FileText, Gamepad2, Wallet } from 'lucide-react';

export default function AdminDashboard() {
  const { lessons, papers, games, vocabulary, kanji, grammar, withdrawals } = useData();

  const stats = [
    { label: 'Total Students', value: '2+', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Lessons', value: lessons.length, icon: BookOpen, color: 'bg-green-50 text-green-600' },
    { label: 'Papers', value: papers.length, icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { label: 'Active Games', value: games.filter(g => g.status === 'live').length, icon: Gamepad2, color: 'bg-orange-50 text-orange-600' },
    { label: 'Vocabulary', value: vocabulary.length, icon: BookOpen, color: 'bg-pink-50 text-pink-600' },
    { label: 'Kanji', value: kanji.length, icon: BookOpen, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Grammar', value: grammar.length, icon: BookOpen, color: 'bg-teal-50 text-teal-600' },
    { label: 'Pending Withdrawals', value: withdrawals.filter(w => w.status === 'pending').length, icon: Wallet, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-jft-navy mb-1">Admin Dashboard</h1>
      <p className="text-jft-navy/50 text-sm mb-6">Control center for JFT Japanese Free Learning</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="card p-4">
            <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-jft-navy">{s.value}</p>
            <p className="text-xs text-jft-navy/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="font-semibold text-jft-navy mb-3">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { label: 'Manage Content (Lessons, Grammar, Vocab, Kanji)', link: '/admin/content' },
            { label: 'Create / Edit Papers', link: '/admin/papers' },
            { label: 'Schedule Daily Games', link: '/admin/games' },
            { label: 'Manage Popups & Announcements', link: '/admin/popups' },
            { label: 'View Students', link: '/admin/students' },
            { label: 'Website Settings', link: '/admin/settings' },
          ].map((a, i) => (
            <a key={i} href={a.link} className="block px-4 py-3 rounded-xl bg-jft-cream hover:bg-jft-cream-dark text-sm text-jft-navy transition">
              {a.label} →
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Note:</strong> This is a fully functional demo with localStorage persistence. All content can be managed from this admin panel. Data persists in the browser. For production, connect to a real backend database.
      </div>
    </div>
  );
}
