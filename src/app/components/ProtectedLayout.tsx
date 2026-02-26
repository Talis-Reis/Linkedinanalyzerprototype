import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Zap } from 'lucide-react';

function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: '#0f172a' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
      >
        <Zap className="w-6 h-6 text-white" />
      </div>
      <div className="flex gap-1.5">
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

export function ProtectedLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return (
      <Navigate
        to={`/auth?returnTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <Outlet />;
}
