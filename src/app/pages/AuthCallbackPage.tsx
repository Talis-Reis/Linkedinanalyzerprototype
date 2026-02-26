import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Zap, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      const returnTo = searchParams.get('returnTo') || '/';
      navigate(returnTo, { replace: true });
    } else {
      // Give Supabase a moment to detect the session from URL
      const timer = setTimeout(() => {
        navigate('/auth?error=callback', { replace: true });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate, searchParams]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: '#0f172a' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
      >
        <Zap className="w-8 h-8 text-white" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Autenticando sua conta...
        </p>
      </div>

      <div className="flex gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              background: '#3b82f6',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
