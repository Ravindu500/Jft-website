import { useData } from '../../lib/data-store';
import { useAuth } from '../../lib/auth';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  const { attempts } = useData();
  const { user } = useAuth();

  // Aggregate scores by user
  const scores: Record<string, { total: number; count: number; best: number }> = {};
  attempts.forEach(a => {
    if (!scores[a.userId]) scores[a.userId] = { total: 0, count: 0, best: 0 };
    scores[a.userId].total += a.score;
    scores[a.userId].count += 1;
    scores[a.userId].best = Math.max(scores[a.userId].best, a.score);
  });

  // Demo leaderboard data
  const leaders = [
    { name: 'Nimali S.', score: 980, streak: 12 },
    { name: 'Kasun Perera', score: user?.xp || 450, streak: user?.streak || 5 },
    { name: 'Tharindu R.', score: 720, streak: 8 },
    { name: 'Sachini M.', score: 650, streak: 6 },
    { name: 'Dinesh K.', score: 580, streak: 4 },
    { name: 'Amaya P.', score: 510, streak: 3 },
    { name: 'Ruwan J.', score: 440, streak: 7 },
    { name: 'Chamari L.', score: 390, streak: 2 },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="mb-6 text-center">
        <h1 className="section-title">🏆 Leaderboard</h1>
        <p className="text-jft-navy/60 text-sm mt-1">All-Time Top Students</p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {leaders.slice(0, 3).map((l, i) => (
          <div key={i} className={`text-center ${i === 0 ? 'order-2' : i === 1 ? 'order-1' : 'order-3'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-1 ${
              i === 0 ? 'bg-jft-gold/20 text-3xl' : 'bg-jft-cream'
            }`}>
              {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
            </div>
            <p className="text-sm font-semibold text-jft-navy">{l.name}</p>
            <p className="text-xs text-jft-navy/50">{l.score} XP</p>
          </div>
        ))}
      </div>

      <div className="card divide-y divide-jft-navy/5">
        {leaders.map((l, i) => (
          <div key={i} className={`flex items-center gap-3 p-3.5 ${l.name.includes('Kasun') ? 'bg-jft-red/5' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              i < 3 ? 'bg-jft-red text-white' : 'bg-jft-cream text-jft-navy/60'
            }`}>{i + 1}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-jft-navy">{l.name}</p>
              <p className="text-xs text-jft-navy/40">🔥 {l.streak} day streak</p>
            </div>
            <span className="text-sm font-bold text-jft-navy">{l.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
