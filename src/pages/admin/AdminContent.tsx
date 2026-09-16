import { useState } from 'react';
import { useData } from '../../lib/data-store';

type Tab = 'vocabulary' | 'kanji' | 'grammar' | 'lessons';

export default function AdminContent() {
  const { vocabulary, kanji, grammar, lessons, updateVocabulary, updateKanji, updateGrammar, updateLessons } = useData();
  const [tab, setTab] = useState<Tab>('vocabulary');
  const [showAdd, setShowAdd] = useState(false);

  // Simple add forms
  const [newVocab, setNewVocab] = useState({ japanese: '', hiragana: '', romaji: '', sinhala: '', category: 'Daily life' });
  const [newKanji, setNewKanji] = useState({ kanji: '', reading: '', hiragana: '', romaji: '', sinhala: '' });
  const [newGrammar, setNewGrammar] = useState({ pattern: '', hiragana: '', japanese: '', sinhalaMeaning: '', sinhalaExplanation: '', category: 'Basic' });
  const [newLesson, setNewLesson] = useState({ title: '', description: '', content: '' });

  const addVocab = () => {
    if (!newVocab.japanese) return;
    updateVocabulary([...vocabulary, {
      id: 'vocab-' + Date.now(),
      ...newVocab,
      difficulty: 'beginner' as const,
      isPublished: true,
    }]);
    setNewVocab({ japanese: '', hiragana: '', romaji: '', sinhala: '', category: 'Daily life' });
    setShowAdd(false);
  };

  const addKanji = () => {
    if (!newKanji.kanji) return;
    updateKanji([...kanji, {
      id: 'kanji-' + Date.now(),
      ...newKanji,
      examples: [],
      difficulty: 'beginner' as const,
      isPublished: true,
    }]);
    setNewKanji({ kanji: '', reading: '', hiragana: '', romaji: '', sinhala: '' });
    setShowAdd(false);
  };

  const addGrammar = () => {
    if (!newGrammar.pattern) return;
    updateGrammar([...grammar, {
      id: 'gr-' + Date.now(),
      ...newGrammar,
      examples: [],
      difficulty: 'beginner' as const,
      isPublished: true,
    }]);
    setNewGrammar({ pattern: '', hiragana: '', japanese: '', sinhalaMeaning: '', sinhalaExplanation: '', category: 'Basic' });
    setShowAdd(false);
  };

  const addLesson = () => {
    if (!newLesson.title) return;
    updateLessons([...lessons, {
      id: 'lesson-' + Date.now(),
      ...newLesson,
      section: 'lessons' as const,
      difficulty: 'beginner' as const,
      order: lessons.length + 1,
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0],
    }]);
    setNewLesson({ title: '', description: '', content: '' });
    setShowAdd(false);
  };

  const deleteItem = (type: Tab, id: string) => {
    if (!confirm('Delete this item?')) return;
    if (type === 'vocabulary') updateVocabulary(vocabulary.filter(v => v.id !== id));
    if (type === 'kanji') updateKanji(kanji.filter(k => k.id !== id));
    if (type === 'grammar') updateGrammar(grammar.filter(g => g.id !== id));
    if (type === 'lessons') updateLessons(lessons.filter(l => l.id !== id));
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'vocabulary', label: 'Vocabulary', count: vocabulary.length },
    { key: 'kanji', label: 'Kanji', count: kanji.length },
    { key: 'grammar', label: 'Grammar', count: grammar.length },
    { key: 'lessons', label: 'Lessons', count: lessons.length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jft-navy">Content Manager</h1>
          <p className="text-jft-navy/50 text-sm">Add, edit and manage learning content</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm">
          {showAdd ? 'Cancel' : '+ Add New'}
        </button>
      </div>

      <div className="flex gap-1 mb-5 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setShowAdd(false); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
              tab === t.key ? 'bg-jft-red text-white' : 'bg-white text-jft-navy/60 hover:bg-jft-cream'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {showAdd && (
        <div className="card p-5 mb-5 space-y-3">
          <h3 className="font-semibold text-jft-navy">Add {tab}</h3>
          {tab === 'vocabulary' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field" placeholder="Japanese" value={newVocab.japanese} onChange={e => setNewVocab({ ...newVocab, japanese: e.target.value })} />
                <input className="input-field" placeholder="Hiragana" value={newVocab.hiragana} onChange={e => setNewVocab({ ...newVocab, hiragana: e.target.value })} />
                <input className="input-field" placeholder="Romaji" value={newVocab.romaji} onChange={e => setNewVocab({ ...newVocab, romaji: e.target.value })} />
                <input className="input-field" placeholder="Sinhala meaning" value={newVocab.sinhala} onChange={e => setNewVocab({ ...newVocab, sinhala: e.target.value })} />
              </div>
              <button onClick={addVocab} className="btn-primary text-sm">Save Vocabulary</button>
            </>
          )}
          {tab === 'kanji' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field" placeholder="Kanji" value={newKanji.kanji} onChange={e => setNewKanji({ ...newKanji, kanji: e.target.value })} />
                <input className="input-field" placeholder="Reading" value={newKanji.reading} onChange={e => setNewKanji({ ...newKanji, reading: e.target.value })} />
                <input className="input-field" placeholder="Hiragana" value={newKanji.hiragana} onChange={e => setNewKanji({ ...newKanji, hiragana: e.target.value })} />
                <input className="input-field" placeholder="Romaji" value={newKanji.romaji} onChange={e => setNewKanji({ ...newKanji, romaji: e.target.value })} />
                <input className="input-field col-span-2" placeholder="Sinhala meaning" value={newKanji.sinhala} onChange={e => setNewKanji({ ...newKanji, sinhala: e.target.value })} />
              </div>
              <button onClick={addKanji} className="btn-primary text-sm">Save Kanji</button>
            </>
          )}
          {tab === 'grammar' && (
            <>
              <input className="input-field" placeholder="Pattern (e.g. 〜です)" value={newGrammar.pattern} onChange={e => setNewGrammar({ ...newGrammar, pattern: e.target.value })} />
              <input className="input-field" placeholder="Sinhala meaning" value={newGrammar.sinhalaMeaning} onChange={e => setNewGrammar({ ...newGrammar, sinhalaMeaning: e.target.value })} />
              <textarea className="input-field" rows={3} placeholder="Sinhala explanation" value={newGrammar.sinhalaExplanation} onChange={e => setNewGrammar({ ...newGrammar, sinhalaExplanation: e.target.value })} />
              <button onClick={addGrammar} className="btn-primary text-sm">Save Grammar</button>
            </>
          )}
          {tab === 'lessons' && (
            <>
              <input className="input-field" placeholder="Title" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
              <input className="input-field" placeholder="Description" value={newLesson.description} onChange={e => setNewLesson({ ...newLesson, description: e.target.value })} />
              <textarea className="input-field" rows={4} placeholder="Lesson content" value={newLesson.content} onChange={e => setNewLesson({ ...newLesson, content: e.target.value })} />
              <button onClick={addLesson} className="btn-primary text-sm">Save Lesson</button>
            </>
          )}
        </div>
      )}

      <div className="card divide-y divide-jft-navy/5">
        {tab === 'vocabulary' && vocabulary.map(v => (
          <div key={v.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="jp-text font-bold text-jft-navy">{v.japanese}</span>
              <span className="text-sm text-jft-navy/50 ml-2">{v.hiragana} · {v.sinhala}</span>
            </div>
            <button onClick={() => deleteItem('vocabulary', v.id)} className="text-xs text-red-500 hover:underline">Delete</button>
          </div>
        ))}
        {tab === 'kanji' && kanji.map(k => (
          <div key={k.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="jp-text text-2xl font-bold text-jft-navy">{k.kanji}</span>
              <span className="text-sm text-jft-navy/50 ml-2">{k.hiragana} · {k.sinhala}</span>
            </div>
            <button onClick={() => deleteItem('kanji', k.id)} className="text-xs text-red-500 hover:underline">Delete</button>
          </div>
        ))}
        {tab === 'grammar' && grammar.map(g => (
          <div key={g.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="jp-text font-bold text-jft-navy">{g.pattern}</span>
              <span className="text-sm text-jft-navy/50 ml-2">{g.sinhalaMeaning}</span>
            </div>
            <button onClick={() => deleteItem('grammar', g.id)} className="text-xs text-red-500 hover:underline">Delete</button>
          </div>
        ))}
        {tab === 'lessons' && lessons.map(l => (
          <div key={l.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="font-medium text-jft-navy">{l.title}</span>
              <span className="text-sm text-jft-navy/50 ml-2">{l.description}</span>
            </div>
            <button onClick={() => deleteItem('lessons', l.id)} className="text-xs text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
