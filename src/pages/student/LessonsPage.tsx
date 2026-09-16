import { useState } from 'react';
import { useData } from '../../lib/data-store';
import { useAuth } from '../../lib/auth';
import { BookOpen, CheckCircle, ChevronRight } from 'lucide-react';

export default function LessonsPage() {
  const { lessons } = useData();
  const { user, updateUser } = useAuth();
  const [active, setActive] = useState<string | null>(null);

  const published = lessons.filter(l => l.isPublished).sort((a, b) => a.order - b.order);
  const activeLesson = lessons.find(l => l.id === active);

  const completeLesson = (id: string) => {
    if (!user || user.completedLessons.includes(id)) return;
    updateUser({
      completedLessons: [...user.completedLessons, id],
      xp: user.xp + 20,
    });
  };

  if (activeLesson) {
    const done = user?.completedLessons.includes(activeLesson.id);
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => setActive(null)} className="text-sm text-jft-red mb-4 hover:underline">← Back to lessons</button>
        <div className="card p-6">
          <h1 className="text-2xl font-bold text-jft-navy mb-1">{activeLesson.title}</h1>
          <p className="text-sm text-jft-navy/60 mb-4">{activeLesson.description}</p>
          {activeLesson.japanese && (
            <div className="bg-jft-cream rounded-xl p-4 mb-4 text-center">
              <p className="text-3xl jp-text font-bold text-jft-navy">{activeLesson.japanese}</p>
              {activeLesson.hiragana && <p className="text-jft-navy/50 mt-1">{activeLesson.hiragana}</p>}
              {activeLesson.romaji && <p className="text-sm text-jft-navy/40">{activeLesson.romaji}</p>}
              {activeLesson.sinhala && <p className="text-jft-red font-medium mt-1">{activeLesson.sinhala}</p>}
            </div>
          )}
          <div className="prose prose-sm text-jft-navy/80 whitespace-pre-line leading-relaxed mb-6">
            {activeLesson.content}
          </div>
          {!done ? (
            <button onClick={() => completeLesson(activeLesson.id)} className="btn-primary w-full">
              Mark as Complete (+20 XP)
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium py-3">
              <CheckCircle size={20} /> Completed
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="section-title">📖 Lessons</h1>
        <p className="text-jft-navy/60 text-sm mt-1">{user?.completedLessons.length || 0} of {published.length} completed</p>
      </div>

      <div className="space-y-3">
        {published.map((lesson, i) => {
          const done = user?.completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setActive(lesson.id)}
              className="card-hover p-4 w-full flex items-center gap-4 text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${done ? 'bg-green-100 text-green-600' : 'bg-jft-red/10 text-jft-red'}`}>
                {done ? <CheckCircle size={20} /> : <BookOpen size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-jft-navy">{i + 1}. {lesson.title}</p>
                <p className="text-sm text-jft-navy/50 truncate">{lesson.description}</p>
              </div>
              <ChevronRight size={18} className="text-jft-navy/30 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
