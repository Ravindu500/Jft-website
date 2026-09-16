import { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Camera, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!user) return null;

  const handleSave = () => {
    updateUser({ fullName: name, phone });
    setEditing(false);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateUser({ profilePhoto: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="section-title mb-6">Profile</h1>

      <div className="card p-6 text-center mb-4">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full bg-jft-navy text-white flex items-center justify-center text-4xl font-bold overflow-hidden mx-auto">
            {user.profilePhoto ? <img src={user.profilePhoto} className="w-full h-full object-cover" alt="" /> : user.fullName.charAt(0)}
          </div>
          <label className="absolute bottom-0 right-0 w-8 h-8 bg-jft-red text-white rounded-full flex items-center justify-center cursor-pointer shadow hover:bg-jft-red-dark transition">
            <Camera size={14} />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
        </div>

        {editing ? (
          <div className="space-y-3 text-left">
            <div>
              <label className="text-sm font-medium text-jft-navy">Name</label>
              <input className="input-field mt-1" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-jft-navy">Phone</label>
              <input className="input-field mt-1" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary flex-1">Save</button>
              <button onClick={() => setEditing(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-jft-navy">{user.fullName}</h2>
            <p className="text-sm text-jft-navy/50">{user.email}</p>
            <p className="text-sm text-jft-navy/50">{user.phone}</p>
            <button onClick={() => setEditing(true)} className="btn-secondary text-sm mt-3">Edit Profile</button>
          </>
        )}
      </div>

      <div className="card p-5 space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-jft-navy/50">Level</span>
          <span className="font-medium text-jft-navy">{user.level}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-jft-navy/50">XP</span>
          <span className="font-medium text-jft-navy">{user.xp}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-jft-navy/50">Study Streak</span>
          <span className="font-medium text-jft-navy">🔥 {user.streak} days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-jft-navy/50">Member Since</span>
          <span className="font-medium text-jft-navy">{user.memberSince}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-jft-navy/50">Lessons Completed</span>
          <span className="font-medium text-jft-navy">{user.completedLessons.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-jft-navy/50">Referral Code</span>
          <span className="font-mono font-medium text-jft-red">{user.referralCode}</span>
        </div>
      </div>

      <div className="card p-5 space-y-3 mb-4">
        <h3 className="font-semibold text-jft-navy">Wallet</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-jft-cream rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-jft-navy">{user.wallet.available}</p>
            <p className="text-xs text-jft-navy/50">Available (LKR)</p>
          </div>
          <div className="bg-jft-cream rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-jft-navy">{user.wallet.pending}</p>
            <p className="text-xs text-jft-navy/50">Pending</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => { logout(); navigate('/'); }}
        className="btn-secondary w-full flex items-center justify-center gap-2 text-jft-red"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}
