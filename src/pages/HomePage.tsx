import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { BookOpen, Headphones, Languages, Trophy, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jft-navy via-jft-navy-dark to-jft-navy text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-[120px] jp-text font-bold text-white/20">日</div>
          <div className="absolute bottom-10 right-10 text-[100px] jp-text font-bold text-white/10">本</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Free for all Sri Lankan students
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Master Japanese for<br />
            <span className="text-jft-gold">JFT-Basic</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Complete free learning platform with lessons, kanji, vocabulary, grammar, practice papers and daily games — designed for Sri Lankan students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-base px-8 py-3.5">Go to Dashboard →</Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-base px-8 py-3.5">Start Learning Free</Link>
                <Link to="/login" className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition border border-white/20">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-3">Everything You Need</h2>
        <p className="text-center text-jft-navy/60 mb-12 max-w-xl mx-auto">Structured learning path with Sinhala support, designed specifically for JFT-Basic preparation.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: BookOpen, title: 'Structured Lessons', desc: 'Grammar, vocabulary & reading with Sinhala explanations' },
            { icon: Languages, title: 'Kanji Mastery', desc: 'Learn kanji with readings, examples and quizzes' },
            { icon: Headphones, title: 'Listening Practice', desc: 'Train your ears with audio-based questions' },
            { icon: Trophy, title: 'Daily Games', desc: 'Compete, climb leaderboards and win rewards' },
            { icon: Zap, title: 'XP & Streaks', desc: 'Stay motivated with levels, badges and daily streaks' },
            { icon: Users, title: 'Referral System', desc: 'Invite friends and earn rewards for future products' },
          ].map((f, i) => (
            <div key={i} className="card p-6 hover:shadow-card-hover transition">
              <div className="w-12 h-12 rounded-xl bg-jft-red/10 text-jft-red flex items-center justify-center mb-4">
                <f.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg text-jft-navy mb-1">{f.title}</h3>
              <p className="text-sm text-jft-navy/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jft-red text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to begin your Japanese journey?</h2>
          <p className="text-white/80 mb-6">Join thousands of Sri Lankan students preparing for JFT-Basic — completely free.</p>
          {!user && <Link to="/register" className="inline-block bg-white text-jft-red font-semibold px-8 py-3.5 rounded-xl hover:bg-jft-cream transition">Create Free Account</Link>}
        </div>
      </section>
    </div>
  );
}
