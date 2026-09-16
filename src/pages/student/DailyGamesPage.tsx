import { Link } from 'react-router-dom';
import { useData } from '../../lib/data-store';
import { Clock, Trophy, Users } from 'lucide-react';

export default function DailyGamesPage() {
  const { games, papers } = useData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="section-title">🎮 Daily Games</h1>
        <p className="text-jft-navy/60 text-sm mt-1">Compete with other students and win rewards!</p>
      </div>

      <div className="space-y-4">
        {games.map(game => {
          const paper = papers.find(p => p.id === game.paperId);
          const statusColor = game.status === 'live' ? 'bg-green-100 text-green-700' :
            game.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600';

          return (
            <div key={game.id} className="card p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-jft-navy">{game.name}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium uppercase ${statusColor}`}>
                  {game.status === 'live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />}
                  {game.status}
                </span>
              </div>
              <p className="text-sm text-jft-navy/60 mb-4">{game.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-jft-navy/50 mb-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {game.duration} min</span>
                <span className="flex items-center gap-1"><Trophy size={14} /> {game.rewardPerWinner} LKR × {game.numberOfWinners} winners</span>
                <span className="flex items-center gap-1"><Users size={14} /> Top {game.numberOfWinners}</span>
              </div>
              {game.status === 'live' && paper && (
                <Link to={`/paper/${paper.id}`} className="btn-primary text-sm inline-block">
                  Play Now →
                </Link>
              )}
              {game.status === 'scheduled' && (
                <p className="text-sm text-jft-navy/50">Starts: {game.startDate} at {game.startTime}</p>
              )}
              {game.status === 'closed' && (
                <p className="text-sm text-jft-navy/50">This game has ended. Check leaderboard for results.</p>
              )}
            </div>
          );
        })}
        {games.length === 0 && (
          <div className="card p-12 text-center text-jft-navy/40">
            <p>No games scheduled right now. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
