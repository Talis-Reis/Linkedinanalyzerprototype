import { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Upload, Zap, CheckCircle, ArrowRight, Star, Users, TrendingUp, Clock,
  Search, MessageSquare, BarChart2, Target, Shield, ChevronRight, FileText,
  Award, AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const testimonials = [
  {
    name: 'Mariana Costa',
    role: 'Engenheira de Software Sênior',
    company: 'Nubank',
    text: 'Em 2 semanas após otimizar meu perfil com o LinkedIn Analyzer, recebi 3 convites de entrevista de empresas top. Incrível!',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
  },
  {
    name: 'Rafael Oliveira',
    role: 'Product Manager',
    company: 'iFood',
    text: 'O simulador ATS abriu meus olhos. Meu perfil estava invisível para os algoritmos. Depois das melhorias, as visitas subiram 400%.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
  },
  {
    name: 'Julia Fernandes',
    role: 'UX Designer',
    company: 'VTEX',
    text: 'O gerador de mensagens para recrutadores é genial. Consegui resposta de 80% das mensagens que enviei usando os templates.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1584213447511-c0666b0d6950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
  },
];

const features = [
  {
    icon: BarChart2,
    title: 'Score de Empregabilidade',
    desc: 'Receba uma pontuação precisa de 0 a 100 com análise detalhada de cada seção do perfil.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    icon: Search,
    title: 'Simulador ATS',
    desc: 'Veja como os algoritmos de recrutamento enxergam seu perfil e corrija problemas invisíveis.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    icon: Target,
    title: 'Comparador de Vagas',
    desc: 'Calcule seu percentual de compatibilidade com vagas específicas e saiba o que melhorar.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: MessageSquare,
    title: 'Gerador de Mensagens',
    desc: 'Crie mensagens personalizadas para recrutadores com templates de alta conversão.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
];

const steps = [
  { icon: Upload, title: 'Faça upload do PDF', desc: 'Exporte seu perfil do LinkedIn em PDF e faça o upload em segundos.' },
  { icon: Zap, title: 'IA analisa tudo', desc: 'Nossa IA examina cada detalhe do seu perfil em menos de 30 segundos.' },
  { icon: TrendingUp, title: 'Receba insights', desc: 'Obtenha um plano de ação personalizado com melhorias concretas.' },
];

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: '',
    desc: 'Para conhecer a plataforma',
    color: '#64748b',
    bg: '#f8fafc',
    border: '#e2e8f0',
    items: [
      { ok: true, text: 'Score de empregabilidade' },
      { ok: true, text: '1 dica personalizada' },
      { ok: true, text: 'Análise básica de palavras-chave' },
      { ok: false, text: 'PDF detalhado com sugestões' },
      { ok: false, text: 'Comparador de vagas' },
      { ok: false, text: 'Gerador de mensagens' },
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'R$ 27',
    period: 'pagamento único',
    desc: 'Para otimização completa',
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#3b82f6',
    items: [
      { ok: true, text: 'Score de empregabilidade' },
      { ok: true, text: 'PDF detalhado com sugestões' },
      { ok: true, text: 'Análise de compatibilidade com vagas' },
      { ok: true, text: 'Sugestões de texto para "Sobre"' },
      { ok: true, text: 'Suporte por email' },
      { ok: false, text: 'Análises ilimitadas' },
    ],
    cta: 'Começar por R$ 27',
    popular: true,
  },
  {
    name: 'Caçador',
    price: 'R$ 49',
    period: '/mês',
    desc: 'Para quem está em busca ativa',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#7c3aed',
    items: [
      { ok: true, text: 'Tudo do plano Pro' },
      { ok: true, text: 'Análises ilimitadas' },
      { ok: true, text: 'Comparador de vagas avançado' },
      { ok: true, text: 'Gerador de mensagens para recrutadores' },
      { ok: true, text: 'Atualizações mensais do algoritmo' },
      { ok: true, text: 'Suporte prioritário' },
    ],
    cta: 'Assinar por R$ 49/mês',
    popular: false,
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setTimeout(() => navigate('/processing'), 600);
    }
  }, [navigate]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50"
        style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1e293b' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.1rem' }}>
                LinkedIn<span style={{ color: '#3b82f6' }}>Analyzer</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" style={{ color: '#94a3b8', fontSize: '0.875rem' }} className="hover:text-white transition-colors">Como funciona</a>
              <a href="#recursos" style={{ color: '#94a3b8', fontSize: '0.875rem' }} className="hover:text-white transition-colors">Recursos</a>
              <a href="#precos" style={{ color: '#94a3b8', fontSize: '0.875rem' }} className="hover:text-white transition-colors">Preços</a>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg text-white transition-all hover:opacity-90 text-sm"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 600 }}
            >
              Analisar meu perfil
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="pt-16 min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)' }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ color: '#93c5fd', fontSize: '0.875rem', fontWeight: 500 }}>
              +15.000 perfis analisados esta semana
            </span>
          </div>

          <h1
            className="mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#f8fafc',
            }}
          >
            Pare de ser{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              invisível
            </span>{' '}
            para recrutadores
          </h1>

          <p
            className="mb-10 max-w-2xl mx-auto"
            style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.7 }}
          >
            Nossa IA analisa seu perfil do LinkedIn e revela por que você não está sendo chamado para entrevistas — com um plano de ação em{' '}
            <span style={{ color: '#60a5fa', fontWeight: 600 }}>menos de 30 segundos</span>.
          </p>

          {/* Upload Card */}
          <div
            className="max-w-lg mx-auto rounded-2xl p-8 cursor-pointer transition-all"
            style={{
              background: dragging ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
              border: `2px dashed ${dragging ? '#3b82f6' : 'rgba(255,255,255,0.2)'}`,
              backdropFilter: 'blur(10px)',
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={onFileChange}
            />

            {fileName ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)' }}>
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <p style={{ color: '#86efac', fontWeight: 600 }}>Arquivo carregado!</p>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{fileName}</p>
                <p style={{ color: '#60a5fa', fontSize: '0.875rem' }}>Iniciando análise...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                >
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 600 }}>
                    Arraste seu PDF aqui
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: 4 }}>
                    ou clique para selecionar o arquivo
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span style={{ color: '#60a5fa', fontSize: '0.75rem' }}>
                    Apenas arquivos PDF do LinkedIn
                  </span>
                </div>
                <button
                  className="w-full py-3 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 700 }}
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  Analisar meu perfil agora →
                </button>
              </div>
            )}
          </div>

          <p className="mt-4" style={{ color: '#475569', fontSize: '0.75rem' }}>
            <Shield className="inline w-3 h-3 mr-1" />
            Processamento seguro no cliente · Seus dados não são armazenados
          </p>
        </div>

        {/* Stats */}
        <div
          className="w-full"
          style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: '+15.000', label: 'Perfis analisados' },
              { icon: TrendingUp, value: '87%', label: 'Taxa de melhoria' },
              { icon: Award, value: '3x', label: 'Mais entrevistas' },
              { icon: Clock, value: '30s', label: 'Tempo de análise' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 mb-1" style={{ color: '#3b82f6' }} />
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full mb-4 text-sm"
              style={{ background: '#eff6ff', color: '#2563eb', fontWeight: 600 }}
            >
              Como funciona
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              Análise completa em 3 passos
            </h2>
            <p className="mt-3" style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Sem cadastro, sem complicação. Faça upload e receba insights imediatos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ background: '#0f172a', color: '#fff', fontWeight: 800 }}
                >
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
                {i < 2 && (
                  <ChevronRight
                    className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8"
                    style={{ color: '#cbd5e1' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full mb-4 text-sm"
              style={{ background: '#f5f3ff', color: '#7c3aed', fontWeight: 600 }}
            >
              Funcionalidades
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              Tudo que você precisa para se destacar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{ borderColor: '#f1f5f9' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: bg }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Screenshot */}
      <section className="py-24" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-block px-4 py-1 rounded-full mb-4 text-sm"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', fontWeight: 600 }}
              >
                Resultados reais
              </span>
              <h2
                style={{ fontSize: '1.875rem', fontWeight: 800, color: '#f8fafc', marginBottom: 16, lineHeight: 1.2 }}
              >
                Usuários conseguem entrevistas em dias, não meses
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 24 }}>
                Nosso algoritmo identifica exatamente o que os recrutadores e sistemas ATS procuram,
                entregando melhorias precisas e com alto impacto.
              </p>
              {[
                'Score de empregabilidade baseado em 47 critérios',
                'Comparação com os top 10% dos perfis da sua área',
                'Sugestões de texto geradas por IA para cada seção',
                'Templates de mensagem com taxa de resposta de 68%',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-green-400" />
                  <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{item}</span>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 px-6 py-3 rounded-xl text-white flex items-center gap-2 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 700 }}
              >
                Analisar meu perfil <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762330472769-cb8e6c8324d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="LinkedIn Analyzer Dashboard"
                className="rounded-2xl shadow-2xl w-full object-cover"
                style={{ height: 380 }}
              />
              <div
                className="absolute -bottom-4 -left-4 p-4 rounded-xl shadow-xl"
                style={{ background: '#fff' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: '#dcfce7' }}
                  >
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>+347%</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Visitas ao perfil</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              O que dizem nossos usuários
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border flex flex-col gap-4"
                style={{ borderColor: '#f1f5f9', background: '#f8fafc' }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: 1.7, flex: 1 }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={t.img}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full mb-4 text-sm"
              style={{ background: '#eff6ff', color: '#2563eb', fontWeight: 600 }}
            >
              Planos e Preços
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              Investimento que se paga na primeira entrevista
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 flex flex-col gap-4 relative transition-all hover:shadow-lg"
                style={{
                  background: plan.bg,
                  border: `2px solid ${plan.border}`,
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 700 }}
                  >
                    Mais popular
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{plan.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 2 }}>{plan.desc}</p>
                </div>
                <div>
                  <span style={{ fontSize: '2.25rem', fontWeight: 800, color: plan.color }}>{plan.price}</span>
                  {plan.period && (
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}> {plan.period}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {plan.items.map(({ ok, text }) => (
                    <div key={text} className="flex items-start gap-2">
                      {ok ? (
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-gray-300" />
                      )}
                      <span style={{ color: ok ? '#374151' : '#9ca3af', fontSize: '0.875rem' }}>{text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 rounded-xl transition-all hover:opacity-90 text-sm"
                  style={{
                    background: plan.popular ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : plan.bg,
                    color: plan.popular ? '#fff' : plan.color,
                    border: plan.popular ? 'none' : `2px solid ${plan.color}`,
                    fontWeight: 700,
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-24 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2
            style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: 16 }}
          >
            Pronto para conseguir mais entrevistas?
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
            Junte-se a mais de 15.000 profissionais que já transformaram seus perfis com o LinkedIn Analyzer.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-4 rounded-xl text-white flex items-center gap-3 mx-auto transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 700, fontSize: '1.05rem' }}
          >
            <Upload className="w-5 h-5" />
            Analisar meu perfil agora
          </button>
          <p className="mt-4" style={{ color: '#475569', fontSize: '0.75rem' }}>
            Grátis · Sem cadastro · Resultados em 30 segundos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid #1e293b' }}>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span style={{ color: '#f8fafc', fontWeight: 700 }}>
                LinkedIn<span style={{ color: '#3b82f6' }}>Analyzer</span>
              </span>
            </div>
            <div className="flex gap-6">
              {['Privacidade', 'Termos', 'Contato'].map((item) => (
                <a key={item} href="#" style={{ color: '#64748b', fontSize: '0.875rem' }} className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>
              © 2025 LinkedInAnalyzer · Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
