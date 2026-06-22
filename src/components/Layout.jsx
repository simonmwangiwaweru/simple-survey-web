import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const adminLinks = [
  { to: '/admin/surveys', label: 'Surveys', icon: '📋' },
  { to: '/admin/questions', label: 'Questions', icon: '❓' },
  { to: '/admin/responses', label: 'Responses', icon: '📊' },
];
const userLinks = [
  { to: '/surveys', label: 'Available Surveys', icon: '🗂️' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F5F7' }}>
      <header
        className="text-white sticky top-0 z-40 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          paddingTop: 'env(safe-area-inset-top)',
        }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              📋
            </div>
            <span className="text-xl font-bold tracking-tight">SimpleSurvey</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1 items-center">
            <span className="text-xs font-semibold uppercase tracking-widest mr-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}>Admin</span>
            {adminLinks.map(l => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-indigo-100 hover:bg-white/20'
                  }`
                }>
                <span className="text-xs">{l.icon}</span>
                {l.label}
              </NavLink>
            ))}
            <div className="w-px h-5 mx-2" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest mr-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}>User</span>
            {userLinks.map(l => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-indigo-100 hover:bg-white/20'
                  }`
                }>
                <span className="text-xs">{l.icon}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu">
            <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest pt-3 pb-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}>Admin</p>
            {adminLinks.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                    isActive ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-white/20'
                  }`
                }>
                <span>{l.icon}</span>
                {l.label}
              </NavLink>
            ))}
            <p className="text-xs font-semibold uppercase tracking-widest pt-3 pb-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}>User</p>
            {userLinks.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                    isActive ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-white/20'
                  }`
                }>
                <span>{l.icon}</span>
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs" style={{ color: '#9CA3AF' }}>
        SimpleSurvey © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
