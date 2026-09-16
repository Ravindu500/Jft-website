import { useState, useEffect } from 'react';

export default function WelcomeAnimation({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3000),
      setTimeout(() => setStep(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-jft-navy via-jft-navy-dark to-jft-navy flex items-center justify-center">
      <div className="text-center px-6 max-w-md">
        {/* Teacher illustration (CSS art) */}
        <div className={`mb-8 transition-all duration-700 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-jft-cream to-jft-cream-dark shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="text-6xl">👩‍🏫</div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-6 bg-jft-red rounded-full opacity-30 blur-md" />
          </div>
        </div>

        <div className={`space-y-3 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-4xl jp-text text-white font-bold tracking-wide">ようこそ！</p>
        </div>

        <div className={`mt-3 transition-all duration-500 delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xl jp-text text-jft-gold font-medium">JFT Japanese Free Learningへようこそ！</p>
        </div>

        <div className={`mt-2 transition-all duration-500 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/70 text-sm mb-8">Welcome to JFT Japanese Free Learning!</p>
          <button onClick={onComplete} className="btn-primary text-base px-8 py-3 animate-scale-in">
            Start Learning →
          </button>
        </div>
      </div>
    </div>
  );
}
