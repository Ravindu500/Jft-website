import { useState } from 'react';
import { useData } from '../../lib/data-store';
import type { Game } from '../../types';

export default function AdminGames() {
  const { games, papers, updateGames } = useData();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', paperId: '', startDate: '', startTime: '00:00',
    endDate: '', endTime: '23:59', duration: 15, numberOfWinners: 3, rewardPerWinner: 100,
  });

  const createGame = () => {
    if (!form.name || !form.paperId) return;
    const game: Game = {
      id: 'game-' + Date.now(),
      name: form.name,
      description: form.description,
      paperId: form.paperId,
      startDate: form.startDate || new Date().toISOString().split('T')[0],
      startTime: form.startTime,
      endDate: form.endDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      endTime: form.endTime,
      duration: form.duration,
      marks: 5,
      numberOfWinners: form.numberOfWinners,
      rewardPerWinner: form.rewardPerWinner,
      winnerRule: 'highest-score-fastest',
      status: 'live',
    };
    updateGames([...games, game]);
    setShowCreate(false);
  };

  const setStatus = (id: string, status: Game['status']) => {
    updateGames(games.map(g => g.id === id ? { ...g, status } : g));
  };

  const deleteGame = (id: string) => {
    if (!confirm('Delete this game?')) return;
    updateGames(games.filter(g => g.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jft-navy">Game Scheduler</h1>
          <p className="text-jft-navy/50 text-sm">Create and manage daily competitive games</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-sm">
          {showCreate ? 'Cancel' : '+ Schedule Game'}
        </button>
      </div>

      {showCreate && (
        <div className="card p-5 mb-6 space-y-3">
          <input className="input-field" placeholder="Game name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <select className="input-field" value={form.paperId} onChange={e => setForm({ ...form, paperId: e.target.value })}>
            <option value="">Select Paper</option>
            {papers.filter(p => p.isPublished).map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input type="date" className="input-field" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            <input type="time" className="input-field" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
            <input type="date" className="input-field" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            <input type="time" className="input-field" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input type="number" className="input-field" placeholder="Duration (min)" value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} />
            <input type="number" className="input-field" placeholder="Winners" value={form.numberOfWinners} onChange={e => setForm({ ...form, numberOfWinners: +e.target.value })} />
            <input type="number" className="input-field" placeholder="Reward (LKR)" value={form.rewardPerWinner} onChange={e => setForm({ ...form, rewardPerWinner: +e.target.value })} />
          </div>
          <button onClick={createGame} className="btn-primary w-full">Create Game</button>
        </div>
      )}

      <div className="space-y-3">
        {games.map(g => (
          <div key={g.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-jft-navy">{g.name}</p>
                <p className="text-xs text-jft-navy/50 mt-0.5">{g.startDate} {g.startTime} → {g.endDate} {g.endTime}</p>
                <p className="text-xs text-jft-navy/50">{g.rewardPerWinner} LKR × {g.numberOfWinners} winners</p>
              </div>
              <div className="flex gap-1.5 items-center">
                {(['scheduled', 'live', 'closed'] as const).map(s => (
                  <button key={s} onClick={() => setStatus(g.id, s)} className={`text-[10px] px-2 py-1 rounded-full font-medium uppercase ${
                    g.status === s ? 'bg-jft-red text-white' : 'bg-jft-cream text-jft-navy/40'
                  }`}>{s}</button>
                ))}
                <button onClick={() => deleteGame(g.id)} className="text-xs text-red-500 ml-2 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
