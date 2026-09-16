import { useState } from 'react';
import { useData } from '../../lib/data-store';
import { useAuth } from '../../lib/auth';
import { Search, Star, Check } from 'lucide-react';

export default function KanjiPage() {
  const { kanji } = useData();
  const { user, updateUser } = useAuth();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = kanji.filter(k => {
    if (!k.isPublished) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return k.kanji.includes(q) || k.hiragana.includes(q) || k.romaji.toLowerCase().includes(q) || k.sinhala.includes(q);
  });

  const selectedItem = kanji.find(k => k.id === selected);

  const toggleFavorite = (id: string) => {
    if (!user) return;
    const favs = user.favorites.kanji.includes(id)
      ? user.favorites.kanji.filter(x => x !== id)
      : [...user.favorites.kanji, id];
    updateUser({ favorites: { ...user.favorites, kanji: favs } });
  };

  const toggleLearned = (id: string) => {
    if (!user) return;
    const learned = user.learned.kanji.includes(id)
      ? user.learned.kanji.filter(x => x !== id)
      : [...user.learned.kanji, id];
    updateUser({
      learned: { ...user.learned, kanji: learned },
      xp: user.learned.kanji.includes(id) ? user.xp : user.xp + 10,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="section-title">漢字 Kanji</h1>
        <p className="text-jft-navy/60 text-sm mt-1">{filtered.length} kanji · {user?.learned.kanji.length || 0} learned</p>
      </div>

      <div className="relative mb-5">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-jft-navy/40" />
        <input className="input-field !pl-10" placeholder="Search kanji, reading or meaning..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {filtered.map(item => {
          const isLearned = user?.learned.kanji.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`card-hover p-4 flex flex-col items-center ${isLearned ? 'ring-2 ring-green-400/50' : ''} ${selected === item.id ? 'ring-2 ring-jft-red' : ''}`}
            >
              <span className="text-4xl jp-text font-bold text-jft-navy">{item.kanji}</span>
              <span className="text-xs text-jft-navy/50 mt-1">{item.hiragana}</span>
            </button>
          );
        })}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <span className="text-7xl jp-text font-bold text-jft-navy">{selectedItem.kanji}</span>
            </div>
            <div className="space-y-2 text-center mb-4">
              <p className="text-lg text-jft-navy/70">{selectedItem.hiragana} · {selectedItem.romaji}</p>
              <p className="text-xl font-semibold text-jft-red">{selectedItem.sinhala}</p>
              <p className="text-sm text-jft-navy/50">Reading: {selectedItem.reading}</p>
            </div>
            {selectedItem.examples.length > 0 && (
              <div className="bg-jft-cream rounded-xl p-3 mb-4">
                <p className="text-xs font-medium text-jft-navy/50 mb-2">Examples</p>
                {selectedItem.examples.map((ex, i) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="jp-text font-medium">{ex.word} <span className="text-jft-navy/40 font-normal">({ex.reading})</span></span>
                    <span className="text-jft-navy/60">{ex.meaning}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => toggleFavorite(selectedItem.id)} className="btn-secondary flex-1 flex items-center justify-center gap-1">
                <Star size={16} fill={user?.favorites.kanji.includes(selectedItem.id) ? 'currentColor' : 'none'} className={user?.favorites.kanji.includes(selectedItem.id) ? 'text-jft-gold' : ''} />
                Favorite
              </button>
              <button onClick={() => toggleLearned(selectedItem.id)} className="btn-primary flex-1 flex items-center justify-center gap-1">
                <Check size={16} />
                {user?.learned.kanji.includes(selectedItem.id) ? 'Learned' : 'Mark Learned'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
