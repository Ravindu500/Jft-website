import { useData } from '../../lib/data-store';

export default function AdminSettings() {
  const { dashboardCards, navItems, updateDashboardCards, updateNavItems } = useData();

  const toggleCard = (id: string) => {
    updateDashboardCards(dashboardCards.map(c => c.id === id ? { ...c, isEnabled: !c.isEnabled } : c));
  };

  const toggleNav = (id: string) => {
    updateNavItems(navItems.map(n => n.id === id ? { ...n, isEnabled: !n.isEnabled } : n));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-jft-navy mb-1">Settings</h1>
      <p className="text-jft-navy/50 text-sm mb-6">Manage dashboard cards, navigation and site settings</p>

      <div className="card p-5 mb-6">
        <h3 className="font-semibold text-jft-navy mb-3">Dashboard Cards</h3>
        <p className="text-xs text-jft-navy/50 mb-3">Enable/disable cards shown on the student dashboard</p>
        <div className="space-y-2">
          {dashboardCards.sort((a, b) => a.order - b.order).map(c => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-jft-navy/5 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.icon}</span>
                <div>
                  <p className="text-sm font-medium text-jft-navy">{c.title}</p>
                  <p className="text-xs text-jft-navy/40">{c.link}</p>
                </div>
              </div>
              <button onClick={() => toggleCard(c.id)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${c.isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {c.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 mb-6">
        <h3 className="font-semibold text-jft-navy mb-3">Navigation Items</h3>
        <div className="space-y-2">
          {navItems.sort((a, b) => a.order - b.order).map(n => (
            <div key={n.id} className="flex items-center justify-between py-2 border-b border-jft-navy/5 last:border-0">
              <div>
                <p className="text-sm font-medium text-jft-navy">{n.label}</p>
                <p className="text-xs text-jft-navy/40">{n.link}</p>
              </div>
              <button onClick={() => toggleNav(n.id)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${n.isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {n.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-jft-navy mb-3">Site Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-jft-navy/50">Site Name</span><span>JFT Japanese Free Learning</span></div>
          <div className="flex justify-between"><span className="text-jft-navy/50">Version</span><span>1.0.0</span></div>
          <div className="flex justify-between"><span className="text-jft-navy/50">Storage</span><span>localStorage (demo)</span></div>
        </div>
      </div>
    </div>
  );
}
