import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate(email.includes('admin') ? '/admin' : '/dashboard');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jft-cream via-white to-jft-cream-dark px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-jft-red flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">日</div>
          <h1 className="text-2xl font-bold text-jft-navy">Welcome Back</h1>
          <p className="text-jft-navy/60 mt-1">Sign in to continue learning</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm border border-red-100">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Email</label>
            <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Password</label>
            <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-jft-navy/60">
            Don't have an account? <Link to="/register" className="text-jft-red font-medium hover:underline">Register free</Link>
          </p>
        </form>

        <div className="mt-6 p-4 bg-jft-navy/5 rounded-xl text-xs text-jft-navy/60 space-y-1">
          <p className="font-medium text-jft-navy/80">Demo accounts:</p>
          <p>Student: kasun@example.com / student123</p>
          <p>Admin: admin@jftlearning.lk / admin123</p>
        </div>
      </div>
    </div>
  );
}
