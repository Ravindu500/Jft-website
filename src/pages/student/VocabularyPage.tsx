import { useState } from 'react';
import { useData } from '../../lib/data-store';
import { useAuth } from '../../lib/auth';
import { Search, Star, Check, RotateCcw } from 'lucide-react';

export default function VocabularyPage() {
  const { vocabulary } = useData();
  const { user, updateUser } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');
  const [fcIndex, setFcIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const categories = ['all', ...Array.from(new Set(vocabulary.map(v => v.category)))];
  const filtered = vocabulary.filter(v => {
    if (!v.isPublished) return false;
    if (category !== 'all' && v.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      return v.japanese.includes(q) || v.hiragana.includes(q) || v.romaji.toLowerCase().includes(q) || v.sinhala.includes(q);
    }
    return true;
  });

  const toggleFavorite = (id: string) => {
    if (!user) return;
    const favs = user.favorites.vocabulary.includes(id)
      ? user.favorites.vocabulary.filter(x => x !== id)
      : [...user.favorites.vocabulary, id];
    updateUser({ favorites: { ...user.favorites, vocabulary: favs } });
  };

  const toggleLearned = (id: string) => {
    if (!user) return;
    const learned = user.learned.vocabulary.includes(id)
      ? user.learned.vocabulary.filter(x => x !== id)
      : [...user.learned.vocabulary, id];
    updateUser({
      learned: { ...user.learned, vocabulary: learned },
      xp: user.learned.vocabulary.includes(id) ? user.xp : user.xp + 5,
    });
  };

  const current = filtered[fcIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="section-title">Vocabulary 🈶</h1>
          <p className="text-jft-navy/60 text-sm mt-1">{filtered.length} words · {user?.learned.vocabulary.length || 0} learned</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setMode('list')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${mode === 'list' ? 'bg-jft-red text-white' : 'bg-white text-jft-navy border border-jft-navy/10'}`}>List</button>
          <button onClick={() => { setMode('flashcard'); setFcIndex(0); setFlipped(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${mode === 'flashcard' ? 'bg-jft-red text-white' : 'bg-white text-jft-navy border border-jft-navy/10'}`}>Flashcards</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-jft-navy/40" />
          <input className="input-field !pl-10" placeholder="Search Japanese, hiragana, romaji or Sinhala..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field sm:w-40" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
        </select>
      </div>

      {mode === 'list' ? (
        <div className="space-y-2">
          {filtered.map(item => {
            const isFav = user?.favorites.vocabulary.includes(item.id);
            const isLearned = user?.learned.vocabulary.includes(item.id);
            return (
              <div key={item.id} className={`card p-4 flex items-center gap-4 ${isLearned ? 'bg-green-50/50 border-green-100' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl jp-text font-bold text-jft-navy">{item.japanese}</span>
                    <span className="text-sm text-jft-navy/50">{item.hiragana}</span>
                  </div>
                  <p className="text-sm text-jft-navy/70">{item.romaji} · {item.sinhala}</p>
                  <span className="text-[10px] bg-jft-cream px-2 py-0.5 rounded-full text-jft-navy/50 mt-1 inline-block">{item.category}</span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toggleFavorite(item.id)} className={`p-2 rounded-lg transition ${isFav ? 'text-jft-gold bg-jft-gold/10' : 'text-jft-navy/30 hover:bg-jft-cream'}`}>
                    <Star size={18} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                  <button onClick={() => toggleLearned(item.id)} className={`p-2 rounded-lg transition ${isLearned ? 'text-green-600 bg-green-50' : 'text-jft-navy/30 hover:bg-jft-cream'}`}>
                    <Check size={18} />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-jft-navy/40 py-12">No vocabulary found</p>}
        </div>
      ) : current ? (
        <div className="max-w-sm mx-auto">
          <div
            onClick={() => setFlipped(!flipped)}
            className="card p-8 min-h-[240px] flex flex-col items-center justify-center cursor-pointer select-none transition-all hover:shadow-card-hover"
          >
            {!flipped ? (
              <>
                <p className="text-5xl jp-text font-bold text-jft-navy mb-2">{current.japanese}</p>
                <p className="text-jft-navy/40 text-sm">Tap to reveal</p>
              </>
            ) : (
              <>
                <p className="text-2xl jp-text text-jft-navy mb-1">{current.hiragana}</p>
                <p className="text-lg text-jft-navy/70 mb-1">{current.romaji}</p>
                <p className="text-xl font-semibold text-jft-red">{current.sinhala}</p>
              </>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => { setFcIndex(Math.max(0, fcIndex - 1)); setFlipped(false); }}
              disabled={fcIndex === 0}
              className="btn-secondary text-sm disabled:opacity-30"
            >Previous</button>
            <span className="text-sm text-jft-navy/50">{fcIndex + 1} / {filtered.length}</span>
            <button
              onClick={() => { setFcIndex(Math.min(filtered.length - 1, fcIndex + 1)); setFlipped(false); }}
              disabled={fcIndex >= filtered.length - 1}
              className="btn-primary text-sm disabled:opacity-30"
            >Next</button>
          </div>
          <div className="flex justify-center gap-3 mt-3">
            <button onClick={() => toggleLearned(current.id)} className="btn-secondary text-sm flex items-center gap-1">
              <Check size={16} /> Mark Learned
            </button>
            <button onClick={() => { setFcIndex(Math.floor(Math.random() * filtered.length)); setFlipped(false); }} className="btn-secondary text-sm flex items-center gap-1">
              <RotateCcw size={16} /> Random
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-jft-navy/40 py-12">No words to show</p>
      )}
    </div>
  );
}
