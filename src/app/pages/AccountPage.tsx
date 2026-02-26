import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Edit3,
  Check,
  X,
  Github,
  Zap,
  BarChart2,
  GitCompare,
  MessageSquare,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Navbar } from '../components/Navbar';

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ProviderBadge({ provider }: { provider: string }) {
  const configs: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
    google: {
      label: 'Google',
      icon: <GoogleIcon size={14} />,
      color: '#374151',
      bg: '#ffffff',
      border: '#e5e7eb',
    },
    github: {
      label: 'GitHub',
      icon: <Github className="w-3.5 h-3.5" />,
      color: '#f1f5f9',
      bg: '#24292f',
      border: '#374151',
    },
    email: {
      label: 'Magic Link',
      icon: <Mail className="w-3.5 h-3.5" />,
      color: '#60a5fa',
      bg: 'rgba(59,130,246,0.1)',
      border: 'rgba(59,130,246,0.3)',
    },
  };

  const cfg = configs[provider] ?? configs['email'];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function Avatar({ name, avatarUrl, size = 96 }: { name: string; avatarUrl?: string; size?: number }) {
  const [imgError, setImgError] = useState(false);
  const initial = name.charAt(0).toUpperCase();
  const fontSize = size * 0.38;

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="rounded-full object-cover ring-4"
        style={{ width: size, height: size, ringColor: 'rgba(59,130,246,0.3)' }}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold ring-4"
      style={{
        width: size,
        height: size,
        fontSize,
        background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
        boxShadow: '0 0 0 4px rgba(59,130,246,0.2)',
      }}
    >
      {initial}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b' }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem' }}>{value}</div>
        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
      </div>
    </div>
  );
}

export function AccountPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Usuário';

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const email = user?.email ?? '';
  const provider = (user?.app_metadata?.provider as string) ?? 'email';
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '—';
  const lastSignIn = user?.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  // Name editing state
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(displayName);
  const [savingName, setSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim() === displayName) {
      setEditingName(false);
      return;
    }
    setSavingName(true);
    setNameError(null);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: newName.trim() },
    });
    setSavingName(false);
    if (error) {
      setNameError('Erro ao salvar o nome. Tente novamente.');
    } else {
      setNameSuccess(true);
      setEditingName(false);
      setTimeout(() => setNameSuccess(false), 3000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const quickLinks = [
    { to: '/dashboard', icon: BarChart2, label: 'Dashboard de Resultados', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    { to: '/comparador', icon: GitCompare, label: 'Comparador de Vagas', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { to: '/mensagens', icon: MessageSquare, label: 'Gerador de Mensagens', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 800 }}>Minha Conta</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 4 }}>
            Gerencie suas informações de perfil e preferências
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Profile card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <div className="flex items-start gap-5">
                <Avatar name={displayName} avatarUrl={avatarUrl} size={80} />

                <div className="flex-1 min-w-0">
                  {/* Name row */}
                  <div className="flex items-center gap-2 mb-1">
                    {editingName ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveName();
                            if (e.key === 'Escape') setEditingName(false);
                          }}
                          autoFocus
                          className="flex-1 px-3 py-1.5 rounded-lg outline-none text-sm font-semibold"
                          style={{
                            background: '#0f172a',
                            border: '1px solid #3b82f6',
                            color: '#f1f5f9',
                            boxShadow: '0 0 0 3px rgba(59,130,246,0.15)',
                          }}
                        />
                        <button
                          onClick={handleSaveName}
                          disabled={savingName}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}
                        >
                          {savingName ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => { setEditingName(false); setNewName(displayName); }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2
                          className="truncate"
                          style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 700 }}
                        >
                          {displayName}
                        </h2>
                        <button
                          onClick={() => { setEditingName(true); setNewName(displayName); }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:opacity-80 shrink-0"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}
                          title="Editar nome"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Success/error feedback */}
                  {nameSuccess && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      <span style={{ color: '#4ade80', fontSize: '0.75rem' }}>Nome atualizado!</span>
                    </div>
                  )}
                  {nameError && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                      <span style={{ color: '#f87171', fontSize: '0.75rem' }}>{nameError}</span>
                    </div>
                  )}

                  <p
                    className="truncate mb-3"
                    style={{ color: '#94a3b8', fontSize: '0.875rem' }}
                  >
                    {email}
                  </p>

                  <ProviderBadge provider={provider} />
                </div>
              </div>
            </div>

            {/* Info fields */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <h3
                className="mb-5 flex items-center gap-2"
                style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}
              >
                <User className="w-4 h-4 text-blue-400" />
                Informações da conta
              </h3>

              <div className="flex flex-col gap-0 divide-y" style={{ borderColor: '#334155' }}>
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: email,
                    color: '#3b82f6',
                  },
                  {
                    icon: Shield,
                    label: 'Método de login',
                    value:
                      provider === 'google'
                        ? 'Google SSO'
                        : provider === 'github'
                        ? 'GitHub SSO'
                        : 'Magic Link (email)',
                    color: '#10b981',
                  },
                  {
                    icon: Calendar,
                    label: 'Membro desde',
                    value: createdAt,
                    color: '#8b5cf6',
                  },
                  {
                    icon: Zap,
                    label: 'Último acesso',
                    value: lastSignIn,
                    color: '#f59e0b',
                  },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}18` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: 2 }}>{label}</div>
                      <div
                        className="truncate"
                        style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 500 }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub username if available */}
            {(user?.user_metadata?.user_name || user?.user_metadata?.preferred_username) && (
              <div
                className="rounded-2xl p-6"
                style={{ background: '#1e293b', border: '1px solid #334155' }}
              >
                <h3
                  className="mb-4 flex items-center gap-2"
                  style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  Perfil GitHub
                </h3>
                <a
                  href={`https://github.com/${user?.user_metadata?.user_name ?? user?.user_metadata?.preferred_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span style={{ color: '#60a5fa', fontSize: '0.9rem', fontWeight: 500 }}>
                    @{user?.user_metadata?.user_name ?? user?.user_metadata?.preferred_username}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )}

            {/* Danger zone */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <h3
                className="mb-4 flex items-center gap-2"
                style={{ color: '#f87171', fontWeight: 700, fontSize: '1rem' }}
              >
                <LogOut className="w-4 h-4" />
                Sessão
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 16 }}>
                Ao sair, você precisará fazer login novamente para acessar sua conta.
              </p>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all hover:opacity-90 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <LogOut className="w-4 h-4" />
                Sair da conta
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Plan card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>
                  Plano atual
                </h3>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8' }}
                >
                  Gratuito
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: 16 }}>
                Faça upgrade para desbloquear análises ilimitadas, comparador de vagas e gerador de mensagens.
              </p>
              <button
                onClick={() => navigate('/#precos')}
                className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Ver planos
              </button>
            </div>

            {/* Stats */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <h3 className="mb-4" style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>
                Atividade
              </h3>
              <div className="flex flex-col gap-3">
                <StatCard
                  icon={BarChart2}
                  label="Perfis analisados"
                  value="1"
                  color="#3b82f6"
                  bg="rgba(59,130,246,0.1)"
                />
                <StatCard
                  icon={GitCompare}
                  label="Vagas comparadas"
                  value="3"
                  color="#10b981"
                  bg="rgba(16,185,129,0.1)"
                />
                <StatCard
                  icon={MessageSquare}
                  label="Mensagens geradas"
                  value="5"
                  color="#f59e0b"
                  bg="rgba(245,158,11,0.1)"
                />
              </div>
            </div>

            {/* Quick access */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <h3 className="mb-4" style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>
                Acesso rápido
              </h3>
              <div className="flex flex-col gap-2">
                {quickLinks.map(({ to, icon: Icon, label, color, bg }) => (
                  <button
                    key={to}
                    onClick={() => navigate(to)}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-80 text-left group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: bg }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span
                      className="flex-1 text-sm font-medium"
                      style={{ color: '#94a3b8' }}
                    >
                      {label}
                    </span>
                    <ChevronRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#475569' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
