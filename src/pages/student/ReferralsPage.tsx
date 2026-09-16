import { useAuth } from '../../lib/auth';
import { useData } from '../../lib/data-store';
import { Copy, Users, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function ReferralsPage() {
  const { user } = useAuth();
  const { transactions } = useData();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;
  const userTx = transactions.filter(t => t.userId === user.id);

  const copy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="section-title">Referral & Earnings</h1>
        <p className="text-jft-navy/60 text-sm mt-1">Invite friends and earn rewards</p>
      </div>

      <div className="card p-5 mb-4">
        <p className="text-sm text-jft-navy/50 mb-1">Your Referral Code</p>
        <p className="text-2xl font-mono font-bold text-jft-red mb-3">{user.referralCode}</p>
        <div className="flex gap-2">
          <input className="input-field text-sm flex-1" value={referralLink} readOnly />
          <button onClick={copy} className="btn-primary px-4 flex items-center gap-1 text-sm shrink-0">
            <Copy size={16} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card p-4 text-center">
          <Users size={20} className="mx-auto text-jft-red mb-1" />
          <p className="text-xl font-bold text-jft-navy">0</p>
          <p className="text-xs text-jft-navy/50">Total Referrals</p>
        </div>
        <div className="card p-4 text-center">
          <Wallet size={20} className="mx-auto text-jft-red mb-1" />
          <p className="text-xl font-bold text-jft-navy">{user.wallet.totalEarned}</p>
          <p className="text-xs text-jft-navy/50">Total Earned (LKR)</p>
        </div>
      </div>

      <div className="card p-5 mb-4">
        <h3 className="font-semibold text-jft-navy mb-3">Wallet Balance</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-jft-navy/50">Available</span><span className="font-medium">{user.wallet.available} LKR</span></div>
          <div className="flex justify-between"><span className="text-jft-navy/50">Pending</span><span className="font-medium">{user.wallet.pending} LKR</span></div>
          <div className="flex justify-between"><span className="text-jft-navy/50">Total Withdrawn</span><span className="font-medium">{user.wallet.totalWithdrawn} LKR</span></div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-jft-navy mb-3">Transaction History</h3>
        {userTx.length === 0 ? (
          <p className="text-sm text-jft-navy/40 text-center py-4">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {userTx.map(tx => (
              <div key={tx.id} className="flex justify-between text-sm py-2 border-b border-jft-navy/5 last:border-0">
                <div>
                  <p className="font-medium text-jft-navy">{tx.description}</p>
                  <p className="text-xs text-jft-navy/40">{tx.createdAt}</p>
                </div>
                <span className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
