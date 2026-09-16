import { useState } from 'react';
import { useData } from '../../lib/data-store';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function GrammarPage() {
  const { grammar } = useData();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = grammar.filter(g => {
    if (!g.isPublished) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return g.pattern.toLowerCase().includes(q) || g.sinhalaMeaning.includes(q) || g.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="section-title">文法 Grammar</h1>
        <p className="text-jft-navy/60 text-sm mt-1">{filtered.length} patterns</p>
      </div>

      <div className="relative mb-5">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-jft-navy/40" />
        <input className="input-field !pl-10" placeholder="Search grammar patterns..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="space-y-3">
        {filtered.map(item => {
          const isOpen = expanded === item.id;
          return (
            <div key={item.id} className="card overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-jft-cream/50 transition"
              >
                <div>
                  <p className="jp-text text-lg font-bold text-jft-navy">{item.pattern}</p>
                  <p className="text-sm text-jft-navy/60">{item.sinhalaMeaning}</p>
                  <span className="text-[10px] bg-jft-cream px-2 py-0.5 rounded-full text-jft-navy/50 mt-1 inline-block">{item.category} · {item.difficulty}</span>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-jft-navy/40 shrink-0" /> : <ChevronDown size={20} className="text-jft-navy/40 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-jft-navy/5 pt-3 space-y-3">
                  <p className="text-sm text-jft-navy/80 leading-relaxed">{item.sinhalaExplanation}</p>
                  <div>
                    <p className="text-xs font-medium text-jft-navy/50 mb-2">Examples</p>
                    {item.examples.map((ex, i) => (
                      <div key={i} className="bg-jft-cream rounded-xl p-3 mb-2">
                        <p className="jp-text font-medium text-jft-navy">{ex.jp}</p>
                        <p className="text-sm text-jft-navy/50">{ex.hi}</p>
                        <p className="text-sm text-jft-red mt-0.5">{ex.si}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
