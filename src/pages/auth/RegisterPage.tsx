import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

export default function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: params.get('ref') || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const res = await register({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      referralCode: form.referralCode || undefined,
    });
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jft-cream via-white to-jft-cream-dark px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-jft-red flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">日</div>
          <h1 className="text-2xl font-bold text-jft-navy">Create Account</h1>
          <p className="text-jft-navy/60 mt-1">Start learning Japanese for free</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm border border-red-100">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Full Name</label>
            <input name="fullName" className="input-field" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Email</label>
            <input name="email" type="email" className="input-field" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Phone Number</label>
            <input name="phone" type="tel" className="input-field" value={form.phone} onChange={handleChange} placeholder="07X XXX XXXX" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Password</label>
            <input name="password" type="password" className="input-field" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Confirm Password</label>
            <input name="confirmPassword" type="password" className="input-field" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-jft-navy mb-1.5">Referral Code <span className="text-jft-navy/40">(optional)</span></label>
            <input name="referralCode" className="input-field" value={form.referralCode} onChange={handleChange} placeholder="JFTXXXXX" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
            {loading ? 'Creating account...' : 'Create Free Account'}
          </button>

          <p className="text-center text-sm text-jft-navy/60">
            Already have an account? <Link to="/login" className="text-jft-red font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
