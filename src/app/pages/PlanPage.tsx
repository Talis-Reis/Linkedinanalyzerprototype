import { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  Zap,
  Crown,
  Rocket,
  AlertCircle,
  ArrowRight,
  Star,
} from 'lucide-react';

type PlanKey = 'free' | 'pro' | 'cacador';

interface Plan {
  key: PlanKey;
  name: string;
  price: string;
  period: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  border: string;
  features: string[];
  missing?: string[];
  cta: string;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    key: 'free',
    name: 'Gratuito',
    price: 'R$ 0',
    period: '',
    desc: 'Para conhecer a plataforma',
    icon: Zap,
    color: '#64748b',
    gradient: 'rgba(100,116,139,0.1)',
    border: '#334155',
    features: [
      'Score de empregabilidade',
      '1 dica personalizada',
      'Análise básica de palavras-chave',
    ],
    missing: [
      'PDF detalhado com sugestões',
      'Comparador de vagas',
      'Gerador de mensagens',
      'Análises ilimitadas',
    ],
    cta: 'Plano atual',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 'R$ 27',
    period: 'pagamento único',
    desc: 'Para otimização completa',
    icon: Star,
    color: '#3b82f6',
    gradient: 'rgba(59,130,246,0.08)',
    border: '#3b82f6',
    features: [
      'Score de empregabilidade',
      'PDF detalhado com sugestões',
      'Análise de compatibilidade com vagas',
      'Sugestões de texto para "Sobre"',
      'Suporte por email',
    ],
    missing: ['Análises ilimitadas', 'Gerador de mensagens avançado'],
    cta: 'Fazer upgrade por R$ 27',
    badge: 'Mais popular',
  },
  {
    key: 'cacador',
    name: 'Caçador',
    price: 'R$ 49',
    period: '/mês',
    desc: 'Para quem está em busca ativa',
    icon: Rocket,
    color: '#7c3aed',
    gradient: 'rgba(124,58,237,0.08)',
    border: '#7c3aed',
    features: [
      'Tudo do plano Pro',
      'Análises ilimitadas',
      'Comparador de vagas avançado',
      'Gerador de mensagens para recrutadores',
      'Atualizações mensais do algoritmo',
      'Suporte prioritário',
    ],
    cta: 'Assinar por R$ 49/mês',
  },
];

function PlanCard({
  plan,
  current,
  onSelect,
}: {
  plan: Plan;
  current: boolean;
  onSelect: () => void;
}) {
  const Icon = plan.icon;

  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all"
      style={{
        background: plan.gradient,
        border: `2px solid ${current ? plan.color : plan.border}`,
        boxShadow: current ? `0 0 0 1px ${plan.color}40` : 'none',
      }}
    >
      {plan.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
        >
          {plan.badge}
        </div>
      )}

      {current && (
        <div
          className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{ background: `${plan.color}20`, color: plan.color }}
        >
          Ativo
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${plan.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: plan.color }} />
        </div>
        <div>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>{plan.name}</div>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{plan.desc}</div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span style={{ color: plan.color, fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
          {plan.price}
        </span>
        {plan.period && (
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{plan.period}</span>
        )}
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2 flex-1">
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{f}</span>
          </div>
        ))}
        {plan.missing?.map((f) => (
          <div key={f} className="flex items-start gap-2 opacity-40">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{f}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {current ? (
        <div
          className="w-full py-2.5 rounded-xl text-center text-sm font-semibold"
          style={{ background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}40` }}
        >
          ✓ Plano atual
        </div>
      ) : (
        <button
          onClick={onSelect}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` }}
        >
          {plan.cta} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function PlanPage() {
  const currentPlan: PlanKey = 'free';
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelect = (plan: Plan) => {
    if (plan.key === currentPlan) return;
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header card */}
      <div
        className="rounded-2xl p-6"
        style={{ background: '#1e293b', border: '1px solid #334155' }}
      >
        <div className="flex items-center gap-3 mb-1">
          <CreditCard className="w-5 h-5 text-purple-400" />
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem' }}>Plano & Cobrança</h2>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Gerencie seu plano e desbloqueie funcionalidades avançadas para acelerar sua carreira.
        </p>

        {/* Current plan summary */}
        <div
          className="mt-4 flex items-center gap-4 p-4 rounded-xl"
          style={{ background: 'rgba(100,116,139,0.1)', border: '1px solid #334155' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(100,116,139,0.2)' }}
          >
            <Zap className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1">
            <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>
              Plano Gratuito
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
              Você tem acesso a recursos básicos de análise
            </div>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8' }}
          >
            Ativo
          </span>
        </div>
      </div>

      {/* Plans comparison */}
      <div>
        <h3 className="mb-4" style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Escolha seu plano
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              current={plan.key === currentPlan}
              onSelect={() => handleSelect(plan)}
            />
          ))}
        </div>
      </div>

      {/* Guarantee banner */}
      <div
        className="rounded-2xl p-5 flex items-start gap-4"
        style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <div style={{ color: '#34d399', fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>
            Garantia de 7 dias
          </div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Se você não estiver satisfeito com o plano Pro ou Caçador, devolvemos 100% do valor pago
            nos primeiros 7 dias. Sem perguntas.
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
        <h3 className="mb-4" style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>Perguntas frequentes</h3>
        <div className="flex flex-col gap-4">
          {[
            {
              q: 'O plano Pro é realmente pagamento único?',
              a: 'Sim! Você paga uma única vez de R$ 27 e tem acesso permanente a todos os recursos do plano Pro, sem mensalidades.',
            },
            {
              q: 'Posso cancelar o plano Caçador a qualquer momento?',
              a: 'Sim, você pode cancelar a assinatura do Caçador a qualquer momento. Você mantém o acesso até o fim do período pago.',
            },
            {
              q: 'Meu perfil e análises ficam salvos?',
              a: 'Todas as análises, comparações e mensagens geradas ficam salvas no seu histórico enquanto sua conta existir.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="pb-4 border-b last:border-0 last:pb-0" style={{ borderColor: '#334155' }}>
              <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>{q}</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${selectedPlan.color}20` }}>
                <Crown className="w-5 h-5" style={{ color: selectedPlan.color }} />
              </div>
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 700 }}>Fazer upgrade para {selectedPlan.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{selectedPlan.price}{selectedPlan.period}</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 20 }}>
              Esta é uma demonstração do protótipo. Em produção, aqui você seria redirecionado para o checkout seguro via Stripe ou PagSeguro.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid #334155' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${selectedPlan.color}, ${selectedPlan.color}cc)` }}
              >
                Ir para checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
