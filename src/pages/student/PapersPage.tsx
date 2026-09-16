import { Link } from 'react-router-dom';
import { useData } from '../../lib/data-store';
import { Clock, FileText, Award } from 'lucide-react';

export default function PapersPage({ category, title }: { category: string; title: string }) {
  const { papers } = useData();
  const filtered = papers.filter(p => p.category === category && p.isPublished && p.status === 'published');

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="section-title">{title}</h1>
        <p className="text-jft-navy/60 text-sm mt-1">
          {category === 'jft-past' && 'Unofficial practice materials in JFT-Basic style. Not official examination papers.'}
          {category === 'model' && 'Full model examinations to test your readiness.'}
          {category === 'practice' && 'Quick practice papers for targeted improvement.'}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-jft-navy/40">
          <FileText size={40} className="mx-auto mb-3 opacity-40" />
          <p>No papers available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(paper => (
            <div key={paper.id} className="card p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-jft-navy text-lg leading-tight">{paper.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  paper.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  paper.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{paper.difficulty}</span>
              </div>
              <p className="text-sm text-jft-navy/60 mb-4 flex-1">{paper.description}</p>
              <div className="flex items-center gap-4 text-xs text-jft-navy/50 mb-4">
                <span className="flex items-center gap-1"><FileText size={14} /> {paper.questions.length} questions</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {paper.duration} min</span>
                <span className="flex items-center gap-1"><Award size={14} /> Pass {paper.passingScore}%</span>
              </div>
              <Link to={`/paper/${paper.id}`} className="btn-primary text-center text-sm">
                Start Paper
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
