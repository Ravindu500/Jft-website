import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { useData } from '../../lib/data-store';
import { LEVELS } from '../../data/seed';

export default function DashboardPage() {
  const { user } = useAuth();
  const { dashboardCards, vocabulary, kanji, lessons, papers } = useData();

  if (!user) return null;

  const levelInfo = LEVELS.slice().reverse().find(l => user.xp >= l.minXp) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.minXp > user.xp);
  const xpProgress = nextLevel ? ((user.xp - levelInfo.minXp) / (nextLevel.minXp - levelInfo.minXp)) * 100 : 100;

  const progressMap: Record<string, number> = {
    vocabulary: Math.round((user.learned.vocabulary.length / Math.max(vocabulary.length, 1)) * 100),
    kanji: Math.round((user.learned.kanji.length / Math.max(kanji.length, 1)) * 100),
    lessons: Math.round((user.completedLessons.length / Math.max(lessons.length, 1)) * 100),
    grammar: 30,
    listening: 20,
    reading: 25,
  };

  const enabledCards = dashboardCards.filter(c => c.isEnabled).sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      {/* Profile header */}
      <div className="card p-5 md:p-6 mb-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-jft-navy text-white flex items-center justify-center text-3xl font-bold shadow-lg shrink-0 overflow-hidden">
          {user.profilePhoto ? <img src={user.profilePhoto} className="w-full h-full object-cover" alt="" /> : user.fullName.charAt(0)}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl font-bold text-jft-navy">{user.fullName}</h1>
          <p className="text-sm text-jft-navy/60">{levelInfo.name} · {user.xp} XP</p>
          <div className="mt-2 flex items-center gap-3 justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-orange-500">🔥</span>
              <span className="font-semibold">{user.streak}</span>
              <span className="text-jft-navy/50">day streak</span>
            </div>
          </div>
          <div className="mt-3 max-w-xs">
            <div className="flex justify-between text-xs text-jft-navy/50 mb-1">
              <span>{levelInfo.name}</span>
              {nextLevel && <span>{nextLevel.name}</span>}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </div>
        <Link to="/profile" className="btn-secondary text-sm shrink-0">Edit Profile</Link>
      </div>

      {/* Weakness analysis */}
      <div className="card p-5 mb-6">
        <h2 className="font-semibold text-jft-navy mb-3">Your Progress</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(progressMap).map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="relative w-14 h-14 mx-auto mb-1">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#F0EBE3" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke={val < 50 ? '#C41E3A' : val < 75 ? '#F9A825' : '#2E7D32'} strokeWidth="3" strokeDasharray={`${val * 0.94} 94`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-jft-navy">{val}%</span>
              </div>
              <p className="text-xs text-jft-navy/60 capitalize">{key}</p>
            </div>
          ))}
        </div>
        {progressMap.listening < 50 && (
          <p className="mt-3 text-sm text-jft-red bg-jft-red/5 px-3 py-2 rounded-lg">💡 Practice more Listening lessons to improve your weak area.</p>
        )}
      </div>

      {/* Learning cards */}
      <h2 className="font-semibold text-jft-navy mb-4 text-lg">Learning Modules</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {enabledCards.map((card, i) => {
          const progress = card.progressKey ? progressMap[card.progressKey] : undefined;
          return (
            <Link
              key={card.id}
              to={card.link}
              className="card-hover p-4 md:p-5 flex flex-col items-start animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="text-3xl mb-2">{card.icon}</span>
              <h3 className="font-semibold text-jft-navy text-sm md:text-base leading-tight">{card.title}</h3>
              <p className="text-xs text-jft-navy/50 mt-0.5 line-clamp-2">{card.description}</p>
              {progress !== undefined && (
                <div className="w-full mt-3">
                  <div className="progress-bar !h-1.5">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-[10px] text-jft-navy/40 mt-1">{progress}% complete</p>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
