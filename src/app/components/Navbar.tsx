import { Link, useLocation } from 'react-router';
import { BarChart2, GitCompare, MessageSquare, Zap, Upload } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { to: '/comparador', label: 'Comparador', icon: GitCompare },
    { to: '/mensagens', label: 'Mensagens', icon: MessageSquare },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b"
      style={{ background: '#0f172a', borderColor: '#1e293b' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.1rem' }}>
              LinkedIn<span style={{ color: '#3b82f6' }}>Analyzer</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                  style={{
                    color: active ? '#3b82f6' : '#94a3b8',
                    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 600, fontSize: '0.875rem' }}
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Perfil</span>
          </Link>
        </div>

        {/* Mobile links */}
        <div className="flex md:hidden gap-1 pb-2">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  color: active ? '#3b82f6' : '#94a3b8',
                  background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                  fontWeight: active ? 600 : 400,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
