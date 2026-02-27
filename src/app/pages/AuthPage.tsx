import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import {
  Zap,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  BarChart2,
  Target,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, signInWithGoogle, signInWithMagicLink } = useAuth();

  const returnTo = searchParams.get('returnTo') || '/';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === 'callback' ? 'Falha na autenticação. Tente novamente.' : null
  );

  useEffect(() => {
    if (!loading && user) {
      navigate(returnTo, { replace: true });
    }
  }, [user, loading, navigate, returnTo]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      setError('Erro ao conectar com Google. Tente novamente.');
      setGoogleLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setMagicLinkLoading(true);
    try {
      const { error } = await signInWithMagicLink(email.trim());
      if (error) {
        setError('Erro ao enviar o link. Verifique o email e tente novamente.');
      } else {
        setMagicLinkSent(true);
      }
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setMagicLinkLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0f172a' }}
      >
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0f172a' }}
    >
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 60%, #312e81 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
          />
        </div>

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.15rem' }}>
            LinkedIn<span style={{ color: '#60a5fa' }}>Analyzer</span>
          </span>
        </Link>

        <div className="relative z-10">
          <h2
            className="mb-4"
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#f8fafc',
              lineHeight: 1.2,
            }}
          >
            Transforme seu perfil em uma{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              máquina de entrevistas
            </span>
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
            IA avançada que analisa, otimiza e potencializa seu perfil do LinkedIn para você ser
            encontrado pelos recrutadores certos.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: BarChart2, label: 'Score de Empregabilidade', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
              { icon: Target, label: 'Comparador de Vagas', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
              { icon: MessageSquare, label: 'Gerador de Mensagens', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
              { icon: TrendingUp, label: 'Simulador ATS', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
            ].map(({ icon: Icon, label, color, bg }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: bg }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative z-10 p-5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: '#fbbf24', fontSize: '0.9rem' }}>★</span>
            ))}
          </div>
          <p style={{ color: '#e2e8f0', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 12 }}>
            "Em 2 semanas após otimizar meu perfil, recebi 3 convites de entrevista de empresas
            top. Incrível!"
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
            >
              M
            </div>
            <div>
              <div style={{ color: '#f1f5f9', fontSize: '0.8rem', fontWeight: 600 }}>
                Mariana Costa
              </div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                Engenheira de Software · Nubank
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel – Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">
        <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.15rem' }}>
            LinkedIn<span style={{ color: '#60a5fa' }}>Analyzer</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1
              style={{
                color: '#f8fafc',
                fontSize: '1.75rem',
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              {magicLinkSent ? 'Verifique seu email' : 'Acesse sua conta'}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {magicLinkSent
                ? `Enviamos um link de acesso para ${email}. Clique no link para entrar.`
                : 'Analise seu perfil do LinkedIn e aumente suas chances de contratação.'}
            </p>
          </div>

          {error && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl mb-6"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p style={{ color: '#fca5a5', fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          {magicLinkSent ? (
            <div className="flex flex-col items-center text-center gap-6 py-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.3)' }}
              >
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <p style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 8 }}>
                  Link enviado com sucesso!
                </p>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Verifique sua caixa de entrada e spam. O link expira em 1 hora.
                </p>
              </div>
              <button
                onClick={() => { setMagicLinkSent(false); setEmail(''); }}
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: '#60a5fa' }}
              >
                ← Tentar com outro email
              </button>
            </div>
          ) : (
            <>
              {/* Google Button */}
              <div className="mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: '#ffffff',
                    color: '#1e293b',
                    fontSize: '0.9rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  {googleLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                  ) : (
                    <GoogleIcon />
                  )}
                  Continuar com Google
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px" style={{ background: '#1e293b' }} />
                <span style={{ color: '#475569', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  ou continue com email
                </span>
                <div className="flex-1 h-px" style={{ background: '#1e293b' }} />
              </div>

              {/* Magic Link Form */}
              <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: '#94a3b8' }}
                  >
                    Endereço de email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: '#475569' }}
                    />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        background: '#1e293b',
                        border: '1px solid #334155',
                        color: '#f1f5f9',
                        fontSize: '0.9rem',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#334155';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={magicLinkLoading || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    fontSize: '0.9rem',
                  }}
                >
                  {magicLinkLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar link mágico
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="mt-8 text-center" style={{ color: '#475569', fontSize: '0.75rem' }}>
            Ao continuar, você concorda com nossos{' '}
            <span style={{ color: '#60a5fa' }} className="cursor-pointer hover:underline">
              Termos de Uso
            </span>{' '}
            e{' '}
            <span style={{ color: '#60a5fa' }} className="cursor-pointer hover:underline">
              Política de Privacidade
            </span>
          </p>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: '#64748b' }}
            >
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}