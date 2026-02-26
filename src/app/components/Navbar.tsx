import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  BarChart2,
  GitCompare,
  MessageSquare,
  Zap,
  Upload,
  LogOut,
  User,
  ChevronDown,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function UserAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const initial = name.charAt(0).toUpperCase();
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
      style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
    >
      {initial}
    </div>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Usuário';
  const avatarUrl = user.user_metadata?.avatar_url;
  const email = user.email;

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
        style={{
          background: open ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <UserAvatar name={displayName} avatarUrl={avatarUrl} />
        <span
          className="hidden sm:block max-w-28 truncate"
          style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}
        >
          {displayName}
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform"
          style={{
            color: '#64748b',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl py-2 z-50"
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* User info */}
          <div className="px-4 py-3 border-b" style={{ borderColor: '#334155' }}>
            <div
              style={{ color: '#f1f5f9', fontSize: '0.875rem', fontWeight: 600 }}
              className="truncate"
            >
              {displayName}
            </div>
            <div
              style={{ color: '#64748b', fontSize: '0.75rem' }}
              className="truncate mt-0.5"
            >
              {email}
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
              style={{ color: '#94a3b8', fontSize: '0.875rem' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
              }}
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4" />
              Minha conta
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
              style={{ color: '#f87171', fontSize: '0.875rem' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const { user, loading } = useAuth();

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

          {/* Right side */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      to="/"
                      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                      style={{
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Novo Perfil</span>
                    </Link>
                    <UserMenu />
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                    style={{
                      color: '#94a3b8',
                      border: '1px solid #334155',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
                      (e.currentTarget as HTMLElement).style.borderColor = '#475569';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                      (e.currentTarget as HTMLElement).style.borderColor = '#334155';
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Entrar</span>
                  </Link>
                )}
              </>
            )}
          </div>
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
