import { useState } from 'react';
import { Volume2 } from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    id: 'l1',
    question: 'What did the person say?',
    audioText: 'こんにちは、私は田中です。',
    options: { A: 'Good morning', B: 'Hello, I am Tanaka', C: 'Good night', D: 'Thank you' },
    correct: 'B' as const,
    explanation: 'こんにちは、私は田中です means "Hello, I am Tanaka."',
  },
  {
    id: 'l2',
    question: 'Where is the person going?',
    audioText: '学校に行きます。',
    options: { A: 'To the station', B: 'To school', C: 'To the store', D: 'Home' },
    correct: 'B' as const,
    explanation: '学校に行きます means "I am going to school."',
  },
];

export default function ListeningPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = SAMPLE_QUESTIONS[current];

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(q.audioText);
      utter.lang = 'ja-JP';
      utter.rate = 0.85;
      speechSynthesis.speak(utter);
    }
  };

  const handleAnswer = (opt: string) => {
    if (showResult) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === q.correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current < SAMPLE_QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="card p-8">
          <p className="text-5xl mb-3">🎧</p>
          <h2 className="text-2xl font-bold text-jft-navy mb-2">Listening Complete!</h2>
          <p className="text-4xl font-bold text-jft-red my-3">{score}/{SAMPLE_QUESTIONS.length}</p>
          <button onClick={() => { setCurrent(0); setScore(0); setDone(false); setSelected(null); setShowResult(false); }} className="btn-primary mt-4">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="section-title mb-1">🎧 Listening</h1>
      <p className="text-jft-navy/60 text-sm mb-6">Question {current + 1} of {SAMPLE_QUESTIONS.length}</p>

      <div className="card p-6">
        <button onClick={playAudio} className="w-full bg-jft-red/10 hover:bg-jft-red/20 text-jft-red rounded-xl py-6 flex flex-col items-center gap-2 transition mb-5">
          <Volume2 size={32} />
          <span className="text-sm font-medium">Tap to Play Audio</span>
        </button>

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
              {current < SAMPLE_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
