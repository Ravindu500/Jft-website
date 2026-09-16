import { useState } from 'react';

export default function AdminStudents() {
  // Load users from localStorage
  const users = (() => {
    try {
      return JSON.parse(localStorage.getItem('jft_users') || '[]');
    } catch { return []; }
  })();

  const students = users.filter((u: any) => u.role === 'student');
  const [search, setSearch] = useState('');

  const filtered = students.filter((s: any) =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-jft-navy mb-1">Students</h1>
      <p className="text-jft-navy/50 text-sm mb-6">{students.length} registered students</p>

      <input
        className="input-field mb-4 max-w-sm"
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-jft-cream text-jft-navy/60 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">XP</th>
                <th className="px-4 py-3 font-medium">Streak</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jft-navy/5">
              {filtered.map((s: any) => (
                <tr key={s.id} className="hover:bg-jft-cream/50">
                  <td className="px-4 py-3 font-medium text-jft-navy">{s.fullName}</td>
                  <td className="px-4 py-3 text-jft-navy/60">{s.email}</td>
                  <td className="px-4 py-3">{s.level}</td>
                  <td className="px-4 py-3">{s.xp}</td>
                  <td className="px-4 py-3">🔥 {s.streak}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {s.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
