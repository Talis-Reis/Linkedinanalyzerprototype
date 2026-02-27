import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import {
  User,
  CreditCard,
  FileText,
  GitCompare,
  MessageSquare,
  ChevronRight,
  Zap,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from './Navbar';

const NAV_ITEMS = [
  {
    to: '/conta',
    icon: User,
    label: 'Meu Perfil',
    desc: 'Dados e preferências',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    to: '/conta/plano',
    icon: CreditCard,
    label: 'Plano & Cobrança',
    desc: 'Plano ativo e upgrades',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    to: '/conta/analises',
    icon: FileText,
    label: 'Perfis Analisados',
    desc: 'Histórico de análises',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    to: '/conta/vagas',
    icon: GitCompare,
    label: 'Vagas Comparadas',
    desc: 'Comparações salvas',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    to: '/conta/mensagens',
    icon: MessageSquare,
    label: 'Mensagens Geradas',
    desc: 'Templates criados',
    color: '#f43f5e',
    bg: 'rgba(244,63,94,0.1)',
  },
];

export function AccountLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Usuário';

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header row */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: '#64748b' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Início
          </button>
          <ChevronRight className="w-4 h-4" style={{ color: '#334155' }} />
          <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Minha Conta</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* User summary card */}
            <div
              className="rounded-2xl p-4 mb-4"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <div className="flex items-center gap-3 mb-3">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: '#f1f5f9' }}>
                    {displayName}
                  </div>
                  <div
                    className="flex items-center gap-1 mt-0.5"
                  >
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8' }}
                    >
                      <Zap className="w-2.5 h-2.5" />
                      Gratuito
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/conta/plano')}
                className="w-full py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Fazer upgrade →
              </button>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ to, icon: Icon, label, color, bg }) => {
                const isActive =
                  to === '/conta'
                    ? location.pathname === '/conta'
                    : location.pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                    style={{
                      background: isActive ? bg : 'transparent',
                      border: isActive ? `1px solid ${color}30` : '1px solid transparent',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: isActive ? bg : 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: isActive ? color : '#64748b' }} />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: isActive ? color : '#94a3b8' }}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color }} />
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
