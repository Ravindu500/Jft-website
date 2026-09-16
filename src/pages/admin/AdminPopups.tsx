import { useState } from 'react';
import { useData } from '../../lib/data-store';
import type { Popup } from '../../types';

export default function AdminPopups() {
  const { popups, announcements, updatePopups, updateAnnouncements } = useData();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', buttonText: '', buttonLink: '', type: 'announcement' as Popup['type'] });

  const addPopup = () => {
    if (!form.title) return;
    updatePopups([...popups, {
      id: 'popup-' + Date.now(),
      type: form.type,
      title: form.title,
      message: form.message,
      buttonText: form.buttonText,
      buttonLink: form.buttonLink,
      displayFrequency: 'once',
      isEnabled: true,
      order: popups.length + 1,
    }]);
    setShowAdd(false);
    setForm({ title: '', message: '', buttonText: '', buttonLink: '', type: 'announcement' });
  };

  const togglePopup = (id: string) => {
    updatePopups(popups.map(p => p.id === id ? { ...p, isEnabled: !p.isEnabled } : p));
  };

  const deletePopup = (id: string) => {
    if (!confirm('Delete?')) return;
    updatePopups(popups.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jft-navy">Popups & Announcements</h1>
          <p className="text-jft-navy/50 text-sm">Manage global popups and banners</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm">
          {showAdd ? 'Cancel' : '+ Add Popup'}
        </button>
      </div>

      {showAdd && (
        <div className="card p-5 mb-6 space-y-3">
          <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Popup['type'] })}>
            <option value="welcome">Welcome</option>
            <option value="whatsapp">WhatsApp Channel</option>
            <option value="announcement">Announcement</option>
            <option value="promotion">Promotion</option>
            <option value="update">Update</option>
            <option value="section-intro">Section Introduction</option>
          </select>
          <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea className="input-field" rows={3} placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="input-field" placeholder="Button text" value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} />
            <input className="input-field" placeholder="Button link" value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} />
          </div>
          <button onClick={addPopup} className="btn-primary">Save Popup</button>
        </div>
      )}

      <h3 className="font-semibold text-jft-navy mb-3">Active Popups</h3>
      <div className="space-y-3 mb-8">
        {popups.map(p => (
          <div key={p.id} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-jft-navy">{p.title}</p>
              <p className="text-xs text-jft-navy/50">{p.type} · {p.displayFrequency}</p>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={() => togglePopup(p.id)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${p.isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {p.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
              <button onClick={() => deletePopup(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-jft-navy mb-3">Announcements</h3>
      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className="card p-4">
            <p className="font-medium text-jft-navy">{a.title}</p>
            <p className="text-sm text-jft-navy/60 mt-1">{a.message}</p>
            <p className="text-xs text-jft-navy/40 mt-1">{a.startDate} → {a.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
