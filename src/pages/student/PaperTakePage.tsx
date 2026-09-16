import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../lib/data-store';
import { useAuth } from '../../lib/auth';

export default function PaperTakePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { papers, addAttempt } = useData();
  const { user, updateUser } = useAuth();
  const paper = papers.find(p => p.id === id);

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (started && paper && !submitted) {
      setTimeLeft(paper.duration * 60);
    }
  }, [started, paper, submitted]);

  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  const handleSubmit = useCallback(() => {
    if (!paper || !user || submitted) return;
    setSubmitted(true);
    let correct = 0;
    paper.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const score = Math.round((correct / paper.questions.length) * 100);
    const completionTime = Math.round((Date.now() - startTime) / 1000);

    addAttempt({
      id: 'attempt-' + Date.now(),
      gameId: paper.id,
      userId: user.id,
      score,
      correct,
      wrong: paper.questions.length - correct,
      startTime: new Date(startTime).toISOString(),
      submitTime: new Date().toISOString(),
      completionTime,
      answers,
    });

    updateUser({ xp: user.xp + (score >= paper.passingScore ? 30 : 10) });
  }, [paper, user, answers, submitted, startTime]);

  if (!paper) {
    return <div className="max-w-2xl mx-auto px-4 py-12 text-center text-jft-navy/50">Paper not found</div>;
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="card p-6 text-center">
          <h1 className="text-2xl font-bold text-jft-navy mb-2">{paper.title}</h1>
          <p className="text-jft-navy/60 text-sm mb-6">{paper.description}</p>
          <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
            <div className="bg-jft-cream rounded-xl p-3">
              <p className="font-bold text-jft-navy">{paper.questions.length}</p>
              <p className="text-jft-navy/50 text-xs">Questions</p>
            </div>
            <div className="bg-jft-cream rounded-xl p-3">
              <p className="font-bold text-jft-navy">{paper.duration}m</p>
              <p className="text-jft-navy/50 text-xs">Duration</p>
            </div>
            <div className="bg-jft-cream rounded-xl p-3">
              <p className="font-bold text-jft-navy">{paper.passingScore}%</p>
              <p className="text-jft-navy/50 text-xs">Pass Mark</p>
            </div>
          </div>
          <button onClick={() => setStarted(true)} className="btn-primary w-full py-3">Start Now</button>
          <button onClick={() => navigate(-1)} className="btn-secondary w-full mt-2">Go Back</button>
        </div>
      </div>
    );
  }

  if (submitted) {
    let correct = 0;
    paper.questions.forEach(q => { if (answers[q.id] === q.correctAnswer) correct++; });
    const score = Math.round((correct / paper.questions.length) * 100);
    const passed = score >= paper.passingScore;

    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="card p-6 text-center mb-6">
          <p className="text-5xl mb-2">{passed ? '🎉' : '📚'}</p>
          <h2 className="text-2xl font-bold text-jft-navy mb-1">{passed ? 'Congratulations!' : 'Keep Practicing!'}</h2>
          <p className="text-4xl font-bold text-jft-red my-3">{score}%</p>
          <p className="text-sm text-jft-navy/60">{correct} correct · {paper.questions.length - correct} wrong</p>
          <p className="text-xs text-jft-navy/40 mt-1">+{passed ? 30 : 10} XP earned</p>
        </div>

        <h3 className="font-semibold text-jft-navy mb-3">Review Answers</h3>
        <div className="space-y-3">
          {paper.questions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={q.id} className={`card p-4 border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-400'}`}>
                <p className="text-sm font-medium text-jft-navy mb-2">Q{i + 1}. {q.question}</p>
                {q.japaneseText && <p className="jp-text text-lg mb-1">{q.japaneseText}</p>}
                <div className="grid grid-cols-2 gap-1 text-sm mb-2">
                  {(['A', 'B', 'C', 'D'] as const).map(opt => (
                    <div key={opt} className={`px-2 py-1 rounded ${
                      opt === q.correctAnswer ? 'bg-green-100 text-green-800 font-medium' :
                      opt === userAns && !isCorrect ? 'bg-red-100 text-red-800' : 'text-jft-navy/60'
                    }`}>{opt}. {q.options[opt]}</div>
                  ))}
                </div>
                <p className="text-xs text-jft-navy/50">{q.explanation}</p>
              </div>
            );
          })}
        </div>
        <button onClick={() => navigate(-1)} className="btn-primary w-full mt-6">Back to Papers</button>
      </div>
    );
  }

  const q = paper.questions[current];
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-jft-navy/50">Question {current + 1} of {paper.questions.length}</span>
        <span className={`text-sm font-mono font-medium ${timeLeft < 60 ? 'text-red-500' : 'text-jft-navy'}`}>
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="progress-bar mb-6 !h-1.5">
        <div className="progress-fill" style={{ width: `${((current + 1) / paper.questions.length) * 100}%` }} />
      </div>

      <div className="card p-5 mb-4">
        <p className="font-medium text-jft-navy mb-3">{q.question}</p>
        {q.japaneseText && <p className="jp-text text-2xl font-bold text-jft-navy mb-1">{q.japaneseText}</p>}
        {q.hiragana && <p className="text-jft-navy/50 mb-3">{q.hiragana}</p>}
        <div className="space-y-2">
          {(['A', 'B', 'C', 'D'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                answers[q.id] === opt
                  ? 'border-jft-red bg-jft-red/5 text-jft-red font-medium'
                  : 'border-jft-navy/10 hover:border-jft-navy/20 text-jft-navy'
              }`}
            >
              <span className="font-medium mr-2">{opt}.</span> {q.options[opt]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="btn-secondary flex-1 disabled:opacity-30"
        >Previous</button>
        {current < paper.questions.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)} className="btn-primary flex-1">Next</button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary flex-1">Submit</button>
        )}
      </div>
    </div>
  );
}
