import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Zap, Loader2 } from 'lucide-react';

const steps = [
  { label: 'Extraindo dados do PDF...', duration: 1200 },
  { label: 'Analisando palavras-chave e título...', duration: 1400 },
  { label: 'Calculando score de empregabilidade...', duration: 1300 },
  { label: 'Simulando algoritmo ATS...', duration: 1500 },
  { label: 'Identificando oportunidades de melhoria...', duration: 1200 },
  { label: 'Gerando plano de ação personalizado...', duration: 1000 },
];

const facts = [
  '87% dos currículos são rejeitados por sistemas ATS antes de um humano ver.',
  'Perfis com foto recebem 21x mais visualizações no LinkedIn.',
  'Recrutadores passam em média 7 segundos analisando um perfil.',
  'Incluir métricas quantificáveis aumenta em 40% as chances de chamada.',
  'Perfis com 5+ recomendações aparecem 4x mais nas buscas.',
];

export function ProcessingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    let stepIdx = 0;
    let accumulated = 0;
    const total = steps.reduce((sum, s) => sum + s.duration, 0);

    const runStep = () => {
      if (stepIdx >= steps.length) {
        setProgress(100);
        setTimeout(() => navigate('/dashboard'), 600);
        return;
      }
      setCurrentStep(stepIdx);
      const duration = steps[stepIdx].duration;

      const interval = setInterval(() => {
        accumulated += 50;
        setProgress(Math.min(100, Math.round((accumulated / total) * 100)));
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setCompletedSteps((prev) => [...prev, stepIdx]);
        stepIdx++;
        runStep();
      }, duration);
    };

    runStep();

    const factTimer = setInterval(() => {
      setFactIdx((prev) => (prev + 1) % facts.length);
    }, 2500);

    return () => clearInterval(factTimer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 60%, #0f172a 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
        >
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.4rem' }}>
          LinkedIn<span style={{ color: '#3b82f6' }}>Analyzer</span>
        </span>
      </div>

      {/* Main card */}
      <div
        className="w-full max-w-lg rounded-3xl p-8"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="text-center mb-8">
          <h1 style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>
            Analisando seu perfil com IA
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Nosso algoritmo está examinando 47 critérios de empregabilidade
          </p>
        </div>

        {/* Circular progress */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={70} cy={70} r={56} fill="none" stroke="#1e293b" strokeWidth={10} />
              <circle
                cx={70}
                cy={70}
                r={56}
                fill="none"
                stroke="url(#grad)"
                strokeWidth={10}
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - progress / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.3s ease' }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ transform: 'rotate(0deg)' }}
            >
              <span style={{ color: '#f8fafc', fontSize: '2rem', fontWeight: 800 }}>{progress}%</span>
              <span style={{ color: '#64748b', fontSize: '0.7rem' }}>concluído</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {steps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isCurrent = currentStep === i && !isCompleted;
            return (
              <div
                key={step.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  background: isCurrent
                    ? 'rgba(59,130,246,0.15)'
                    : isCompleted
                    ? 'rgba(34,197,94,0.08)'
                    : 'transparent',
                  border: isCurrent
                    ? '1px solid rgba(59,130,246,0.3)'
                    : isCompleted
                    ? '1px solid rgba(34,197,94,0.2)'
                    : '1px solid transparent',
                }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-green-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 shrink-0 text-blue-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ border: '2px solid #334155' }} />
                )}
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: isCompleted ? '#86efac' : isCurrent ? '#93c5fd' : '#475569',
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full" style={{ background: '#1e293b' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            }}
          />
        </div>
      </div>

      {/* Fun fact */}
      <div
        className="mt-6 max-w-md text-center px-6 py-4 rounded-xl transition-all"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Você sabia?
        </p>
        <p
          key={factIdx}
          style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6 }}
          className="transition-opacity duration-500"
        >
          {facts[factIdx]}
        </p>
      </div>
    </div>
  );
}
