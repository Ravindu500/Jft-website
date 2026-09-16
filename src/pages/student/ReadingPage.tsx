import { useState } from 'react';

const PASSAGES = [
  {
    id: 'r1',
    passage: '私は毎日学校に行きます。朝ごはんを食べてから、バスで学校に行きます。学校で日本語を勉強します。',
    hiragana: 'わたしはまいにちがっこうにいきます。あさごはんをたべてから、ばすでがっこうにいきます。がっこうでにほんごをべんきょうします。',
    question: 'How does the person go to school?',
    options: { A: 'By train', B: 'By bus', C: 'By car', D: 'On foot' },
    correct: 'B' as const,
    explanation: 'バスで学校に行きます means "I go to school by bus."',
  },
  {
    id: 'r2',
    passage: '今日は天気がいいです。公園で友達と遊びます。後で一緒に昼ご飯を食べます。',
    hiragana: 'きょうはてんきがいいです。こうえんでともだちとあそびます。あとでいっしょにひるごはんをたべます。',
    question: 'What will they do after playing?',
    options: { A: 'Study', B: 'Go home', C: 'Eat lunch together', D: 'Watch TV' },
    correct: 'C' as const,
    explanation: '一緒に昼ご飯を食べます means "We will eat lunch together."',
  },
];

export default function ReadingPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHiragana, setShowHiragana] = useState(false);

  const q = PASSAGES[current];

  const handleAnswer = (opt: string) => {
    if (showResult) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === q.correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current < PASSAGES.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
      setShowHiragana(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="card p-8">
          <p className="text-5xl mb-3">📕</p>
          <h2 className="text-2xl font-bold text-jft-navy mb-2">Reading Complete!</h2>
          <p className="text-4xl font-bold text-jft-red my-3">{score}/{PASSAGES.length}</p>
          <button onClick={() => { setCurrent(0); setScore(0); setDone(false); setSelected(null); setShowResult(false); }} className="btn-primary mt-4">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="section-title mb-1">📕 Reading</h1>
      <p className="text-jft-navy/60 text-sm mb-6">Passage {current + 1} of {PASSAGES.length}</p>

      <div className="card p-5 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium text-jft-navy/50">Japanese Passage</span>
          <button onClick={() => setShowHiragana(!showHiragana)} className="text-xs text-jft-red font-medium hover:underline">
            {showHiragana ? 'Hide' : 'Show'} Hiragana
          </button>
        </div>
        <p className="jp-text text-lg leading-relaxed text-jft-navy mb-2">{q.passage}</p>
        {showHiragana && <p className="text-sm text-jft-navy/50 leading-relaxed">{q.hiragana}</p>}
      </div>

      <div className="card p-5">
        <p className="font-medium text-jft-navy mb-4">{q.question}</p>
        <div className="space-y-2">
          {(['A', 'B', 'C', 'D'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                showResult
                  ? opt === q.correct ? 'border-green-500 bg-green-50 text-green-800'
                    : opt === selected ? 'border-red-400 bg-red-50 text-red-800'
                    : 'border-jft-navy/10 text-jft-navy/40'
                  : selected === opt ? 'border-jft-red bg-jft-red/5 text-jft-red'
                    : 'border-jft-navy/10 hover:border-jft-navy/20'
              }`}
            >
              {opt}. {q.options[opt]}
            </button>
          ))}
        </div>
        {showResult && (
          <div className="mt-4 p-3 bg-jft-cream rounded-xl">
            <p className="text-sm text-jft-navy/70">{q.explanation}</p>
            <button onClick={next} className="btn-primary w-full mt-3 text-sm">
              {current < PASSAGES.length - 1 ? 'Next Passage' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
