import { useState } from 'react';
import { Link } from 'react-router';
import {
  AlertTriangle, CheckCircle, Lightbulb, Target, ArrowRight,
  ChevronUp, ChevronDown, Minus, GitCompare, MessageSquare, Info,
  TrendingUp, Zap,
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import { Navbar } from '../components/Navbar';
import { ScoreCircle } from '../components/ScoreCircle';
import { mockProfileData, radarData } from '../data/mockData';

const TABS = ['Visão Geral', 'Simulador ATS', 'Plano de Ação'] as const;
type Tab = typeof TABS[number];

function SectionBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#f43f5e';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color }}>{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: color, transition: 'width 1s ease' }}
        />
      </div>
    </div>
  );
}

function ImpactBadge({ impact }: { impact: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { label: 'Alto impacto', color: '#fb7185', bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.25)' },
    medium: { label: 'Médio impacto', color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
    low: { label: 'Baixo impacto', color: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)' },
  };
  const { label, color, bg, border } = config[impact];
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: bg, color, border: `1px solid ${border}` }}
    >
      {label}
    </span>
  );
}

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Visão Geral');
  const [expandedAction, setExpandedAction] = useState<number | null>(null);
  const data = mockProfileData;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      {/* Profile Header */}
      <div style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1a2744 50%, #1e1b4b 100%)', borderBottom: '1px solid #1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">

            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.5rem',
                boxShadow: '0 0 30px rgba(124,58,237,0.35)',
              }}
            >
              {data.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 style={{ color: '#f1f5f9', fontSize: '1.5rem', fontWeight: 800 }}>{data.name}</h1>
              <p style={{ color: '#93c5fd', fontSize: '0.95rem', marginTop: 4 }}>{data.headline}</p>
              <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: 2 }}>{data.location}</p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}>
                    {data.problems.filter((p) => p.severity === 'critical').length} problemas críticos
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span style={{ color: '#fcd34d', fontSize: '0.8rem' }}>
                    {data.opportunities.length} oportunidades
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span style={{ color: '#6ee7b7', fontSize: '0.8rem' }}>
                    {data.strengths.length} pontos fortes
                  </span>
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              <ScoreCircle score={data.score} size={160} />
              <p style={{ color: '#475569', fontSize: '0.75rem', textAlign: 'center' }}>Score de empregabilidade</p>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="flex flex-col sm:flex-row gap-3 mt-8 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Link
              to="/comparador"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 600, fontSize: '0.875rem' }}
            >
              <GitCompare className="w-4 h-4" />
              Comparar com uma vaga
            </Link>
            <Link
              to="/mensagens"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#cbd5e1',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              <MessageSquare className="w-4 h-4" />
              Gerar mensagem para recrutador
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm transition-all"
                style={{
                  color: activeTab === tab ? '#f1f5f9' : '#475569',
                  fontWeight: activeTab === tab ? 700 : 400,
                  borderBottom: activeTab === tab ? '3px solid #6366f1' : '3px solid transparent',
                  background: 'transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* === VISÃO GERAL === */}
        {activeTab === 'Visão Geral' && (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left col: problems + opportunities */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
                Problemas Identificados
              </h2>

              {data.problems.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{
                    background: '#1e293b',
                    border: `1px solid ${p.severity === 'critical' ? 'rgba(244,63,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: p.severity === 'critical' ? 'rgba(244,63,94,0.12)' : 'rgba(245,158,11,0.12)',
                    }}
                  >
                    <AlertTriangle
                      className="w-4 h-4"
                      style={{ color: p.severity === 'critical' ? '#fb7185' : '#fbbf24' }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem' }}>{p.title}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: p.severity === 'critical' ? 'rgba(244,63,94,0.12)' : 'rgba(245,158,11,0.12)',
                          color: p.severity === 'critical' ? '#fb7185' : '#fbbf24',
                          border: `1px solid ${p.severity === 'critical' ? 'rgba(244,63,94,0.25)' : 'rgba(245,158,11,0.25)'}`,
                        }}
                      >
                        {p.severity === 'critical' ? 'Crítico' : 'Atenção'}
                      </span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 4 }}>{p.description}</p>
                  </div>
                </div>
              ))}

              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginTop: 4 }}>
                Oportunidades de Melhoria
              </h2>

              <div className="rounded-xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                {data.opportunities.map((opp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3"
                    style={{ borderBottom: i < data.opportunities.length - 1 ? '1px solid #334155' : 'none' }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(99,102,241,0.15)' }}
                    >
                      <Lightbulb className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6 }}>{opp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-4">

              {/* Strengths */}
              <div className="rounded-xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Pontos Fortes
                </h3>
                {data.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 py-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#10b981' }} />
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Score breakdown */}
              <div className="rounded-xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>
                  <TrendingUp className="w-4 h-4 text-blue-400" /> Pontuação por Seção
                </h3>
                <div className="flex flex-col gap-4">
                  {Object.entries(data.sections).map(([label, value]) => (
                    <SectionBar key={label} label={label} value={value} />
                  ))}
                </div>
              </div>

              {/* CTA Upgrade */}
              <div
                className="rounded-xl p-5 text-center"
                style={{ background: 'linear-gradient(135deg, #1e3a8a22, #4c1d9533)', border: '1px solid rgba(99,102,241,0.25)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(99,102,241,0.15)' }}
                >
                  <Target className="w-5 h-5" style={{ color: '#818cf8' }} />
                </div>
                <h3 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 6, fontSize: '0.95rem' }}>
                  Quer o PDF completo?
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 14 }}>
                  Baixe o relatório detalhado com todas as sugestões por apenas R$ 27
                </p>
                <button
                  className="w-full py-2.5 rounded-lg text-white transition-all hover:opacity-90 text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                >
                  Desbloquear relatório completo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === SIMULADOR ATS === */}
        {activeTab === 'Simulador ATS' && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* ATS Score */}
            <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <div className="flex items-center gap-2 mb-1">
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9' }}>Score ATS</h2>
                <Info className="w-4 h-4" style={{ color: '#475569' }} title="Como os sistemas de rastreamento de candidatos avaliam seu perfil" />
              </div>
              <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: 20 }}>
                Compatibilidade com sistemas de rastreamento de candidatos (ATS)
              </p>
              <div className="flex items-center justify-center mb-6">
                <ScoreCircle score={data.atsScore} size={150} />
              </div>
              <div
                className="p-4 rounded-xl flex items-start gap-3"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontWeight: 600, color: '#fbbf24', fontSize: '0.85rem' }}>
                    Score ATS médio
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: 2 }}>
                    Seu perfil passa pelos filtros básicos, mas não se destaca. Adicione as palavras-chave ausentes para chegar a 85+.
                  </p>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
                Análise por Seção
              </h2>
              <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: 16 }}>
                Visibilidade de cada seção para sistemas ATS
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #334155',
                      background: '#1e293b',
                      color: '#f1f5f9',
                      fontSize: '0.8rem',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Keywords Present */}
            <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 className="flex items-center gap-2 mb-2" style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399' }}>
                <CheckCircle className="w-4 h-4" /> Palavras-chave Detectadas
              </h2>
              <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: 16 }}>
                Estas keywords estão no seu perfil e são reconhecidas pelos algoritmos ATS
              </p>
              <div className="flex flex-wrap gap-2">
                {data.keywords.present.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords Missing */}
            <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 className="flex items-center gap-2 mb-2" style={{ fontSize: '1rem', fontWeight: 700, color: '#fb7185' }}>
                <AlertTriangle className="w-4 h-4" /> Palavras-chave Ausentes
              </h2>
              <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: 16 }}>
                Keywords muito buscadas por recrutadores que não estão no seu perfil
              </p>
              <div className="flex flex-wrap gap-2">
                {data.keywords.missing.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ background: 'rgba(244,63,94,0.08)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)' }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <div
                className="mt-4 p-3 rounded-lg flex items-start gap-2"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#818cf8' }} />
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Adicione essas keywords naturalmente às suas experiências e seção About para aumentar sua visibilidade em +35%.
                </p>
              </div>
            </div>

            {/* Section scores */}
            <div className="lg:col-span-2 rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 className="flex items-center gap-2 mb-5" style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
                <Zap className="w-4 h-4 text-amber-400" /> Força de Cada Seção do Perfil
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(data.sections).map(([label, value]) => (
                  <div key={label}>
                    <SectionBar label={label} value={value} />
                    <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: 5 }}>
                      {value >= 80
                        ? 'Excelente visibilidade para ATS'
                        : value >= 60
                        ? 'Visibilidade moderada, pode melhorar'
                        : 'Baixa visibilidade — ação prioritária'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === PLANO DE AÇÃO === */}
        {activeTab === 'Plano de Ação' && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9' }}>
                Seu Plano de Ação Personalizado
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 4 }}>
                5 mudanças imediatas ordenadas por impacto — implemente em ordem para melhores resultados
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {data.actionPlan.map((item) => (
                <div
                  key={item.priority}
                  className="rounded-xl overflow-hidden"
                  style={{ background: '#1e293b', border: '1px solid #334155' }}
                >
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left transition-all hover:opacity-80"
                    onClick={() =>
                      setExpandedAction(expandedAction === item.priority ? null : item.priority)
                    }
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                    >
                      {item.priority}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.95rem' }}>
                          {item.title}
                        </span>
                        <ImpactBadge impact={item.impact} />
                      </div>
                    </div>
                    {expandedAction === item.priority ? (
                      <ChevronUp className="w-5 h-5 shrink-0" style={{ color: '#475569' }} />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0" style={{ color: '#475569' }} />
                    )}
                  </button>

                  {expandedAction === item.priority && (
                    <div className="px-5 pb-5" style={{ borderTop: '1px solid #334155' }}>
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        {/* Before */}
                        <div
                          className="p-4 rounded-xl"
                          style={{ background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.2)' }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Minus className="w-4 h-4 text-red-400" />
                            <span style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              Antes
                            </span>
                          </div>
                          <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.before}</p>
                        </div>
                        {/* After */}
                        <div
                          className="p-4 rounded-xl"
                          style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <ArrowRight className="w-4 h-4 text-emerald-400" />
                            <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              Depois
                            </span>
                          </div>
                          <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.after}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="mt-8 p-6 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.4), rgba(76,29,149,0.4))', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(99,102,241,0.15)' }}
              >
                <Target className="w-6 h-6" style={{ color: '#818cf8' }} />
              </div>
              <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.1rem', marginBottom: 8 }}>
                Quer ajuda para implementar tudo isso?
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 16 }}>
                Baixe o PDF completo com exemplos detalhados e textos prontos para copiar
              </p>
              <button
                className="px-8 py-3 rounded-xl text-white transition-all hover:opacity-90 font-bold"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
              >
                Baixar PDF completo — R$ 27
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
