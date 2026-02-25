import { useState } from 'react';
import { Link } from 'react-router';
import {
  AlertTriangle, CheckCircle, Lightbulb, Target, ArrowRight,
  ChevronUp, ChevronDown, Minus, GitCompare, MessageSquare, Info
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Navbar } from '../components/Navbar';
import { ScoreCircle } from '../components/ScoreCircle';
import { mockProfileData, radarData } from '../data/mockData';

const TABS = ['Visão Geral', 'Simulador ATS', 'Plano de Ação'] as const;
type Tab = typeof TABS[number];

function SectionBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color }}>{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full" style={{ background: '#e2e8f0' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color, transition: 'width 1s ease' }}
        />
      </div>
    </div>
  );
}

function ImpactBadge({ impact }: { impact: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { label: 'Alto impacto', color: '#dc2626', bg: '#fef2f2' },
    medium: { label: 'Médio impacto', color: '#d97706', bg: '#fffbeb' },
    low: { label: 'Baixo impacto', color: '#2563eb', bg: '#eff6ff' },
  };
  const { label, color, bg } = config[impact];
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs"
      style={{ background: bg, color, fontWeight: 600 }}
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
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      {/* Profile Header */}
      <div style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 text-2xl"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                color: '#fff',
                fontWeight: 800,
              }}
            >
              {data.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 800 }}>{data.name}</h1>
              <p style={{ color: '#93c5fd', fontSize: '0.95rem', marginTop: 4 }}>{data.headline}</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 2 }}>{data.location}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}>
                    {data.problems.filter((p) => p.severity === 'critical').length} problemas críticos
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span style={{ color: '#fcd34d', fontSize: '0.8rem' }}>
                    {data.opportunities.length} oportunidades
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  <span style={{ color: '#86efac', fontSize: '0.8rem' }}>
                    {data.strengths.length} pontos fortes
                  </span>
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              <ScoreCircle score={data.score} size={160} />
              <p style={{ color: '#64748b', fontSize: '0.75rem', textAlign: 'center' }}>Score de empregabilidade</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link
              to="/comparador"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 600, fontSize: '0.875rem' }}
            >
              <GitCompare className="w-4 h-4" />
              Comparar com uma vaga
            </Link>
            <Link
              to="/mensagens"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
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
                className="px-5 py-3 text-sm transition-all relative"
                style={{
                  color: activeTab === tab ? '#fff' : '#64748b',
                  fontWeight: activeTab === tab ? 700 : 400,
                  borderBottom: activeTab === tab ? '3px solid #3b82f6' : '3px solid transparent',
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
            {/* Problems */}
            <div className="lg:col-span-2 space-y-4">
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Problemas Identificados
              </h2>
              {data.problems.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{
                    background: '#fff',
                    border: `1px solid ${p.severity === 'critical' ? '#fca5a5' : '#fcd34d'}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: p.severity === 'critical' ? '#fef2f2' : '#fffbeb',
                    }}
                  >
                    <AlertTriangle
                      className="w-4 h-4"
                      style={{ color: p.severity === 'critical' ? '#dc2626' : '#d97706' }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{p.title}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: p.severity === 'critical' ? '#fef2f2' : '#fffbeb',
                          color: p.severity === 'critical' ? '#dc2626' : '#d97706',
                          fontWeight: 600,
                        }}
                      >
                        {p.severity === 'critical' ? 'Crítico' : 'Atenção'}
                      </span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 4 }}>{p.description}</p>
                  </div>
                </div>
              ))}

              {/* Opportunities */}
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginTop: 8 }}>
                Oportunidades de Melhoria
              </h2>
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1f5f9' }}>
                {data.opportunities.map((opp, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: i < data.opportunities.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: '#eff6ff' }}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <span style={{ color: '#374151', fontSize: '0.875rem' }}>{opp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Strengths */}
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                  ✅ Pontos Fortes
                </h3>
                {data.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 py-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span style={{ color: '#374151', fontSize: '0.85rem' }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Score breakdown */}
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
                  Pontuação por Seção
                </h3>
                <div className="space-y-4">
                  {Object.entries(data.sections).map(([label, value]) => (
                    <SectionBar key={label} label={label} value={value} />
                  ))}
                </div>
              </div>

              {/* CTA Upgrade */}
              <div
                className="rounded-xl p-5 text-center"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', border: '1px solid rgba(99,102,241,0.3)' }}
              >
                <Target className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 8, fontSize: '0.95rem' }}>
                  Quer o PDF completo?
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 12 }}>
                  Baixe o relatório detalhado com todas as sugestões por apenas R$ 27
                </p>
                <button
                  className="w-full py-2.5 rounded-lg text-white transition-all hover:opacity-90 text-sm"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', fontWeight: 700 }}
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
            <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-2 mb-2">
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Score ATS</h2>
                <Info className="w-4 h-4 text-gray-400" title="Como os sistemas de rastreamento de candidatos avaliam seu perfil" />
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 20 }}>
                Compatibilidade com sistemas de rastreamento de candidatos (ATS)
              </p>

              <div className="flex items-center justify-center mb-6">
                <ScoreCircle score={data.atsScore} size={150} />
              </div>

              <div
                className="p-4 rounded-xl flex items-start gap-3"
                style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}
              >
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontWeight: 600, color: '#92400e', fontSize: '0.85rem' }}>
                    Score ATS médio
                  </p>
                  <p style={{ color: '#78350f', fontSize: '0.8rem', marginTop: 2 }}>
                    Seu perfil passa pelos filtros básicos, mas não se destaca. Adicione as palavras-chave ausentes para chegar a 85+.
                  </p>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                Análise por Seção
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 16 }}>
                Visibilidade de cada seção para sistemas ATS
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Keywords Present */}
            <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                ✅ Palavras-chave Detectadas
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 16 }}>
                Estas keywords estão no seu perfil e são reconhecidas pelos algoritmos ATS
              </p>
              <div className="flex flex-wrap gap-2">
                {data.keywords.present.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ background: '#dcfce7', color: '#15803d', fontWeight: 600 }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords Missing */}
            <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                ❌ Palavras-chave Ausentes
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 16 }}>
                Keywords muito buscadas por recrutadores que não estão no seu perfil
              </p>
              <div className="flex flex-wrap gap-2">
                {data.keywords.missing.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ background: '#fee2e2', color: '#dc2626', fontWeight: 600 }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <div
                className="mt-4 p-3 rounded-lg flex items-start gap-2"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p style={{ color: '#475569', fontSize: '0.8rem' }}>
                  Adicione essas keywords naturalmente às suas experiências e seção About para aumentar sua visibilidade em +35%.
                </p>
              </div>
            </div>

            {/* Section scores */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6" style={{ border: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
                Força de Cada Seção do Perfil
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(data.sections).map(([label, value]) => (
                  <div key={label}>
                    <SectionBar label={label} value={value} />
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 4 }}>
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  Seu Plano de Ação Personalizado
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 4 }}>
                  5 mudanças imediatas ordenadas por impacto — implemente em ordem para melhores resultados
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {data.actionPlan.map((item) => (
                <div
                  key={item.priority}
                  className="bg-white rounded-xl overflow-hidden"
                  style={{ border: '1px solid #f1f5f9' }}
                >
                  {/* Header */}
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left transition-all hover:bg-gray-50"
                    onClick={() =>
                      setExpandedAction(expandedAction === item.priority ? null : item.priority)
                    }
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-sm"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 800 }}
                    >
                      {item.priority}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                          {item.title}
                        </span>
                        <ImpactBadge impact={item.impact} />
                      </div>
                    </div>
                    {expandedAction === item.priority ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {/* Expanded content */}
                  {expandedAction === item.priority && (
                    <div className="px-5 pb-5 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Before */}
                        <div
                          className="p-4 rounded-xl"
                          style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Minus className="w-4 h-4 text-red-500" />
                            <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Antes
                            </span>
                          </div>
                          <p style={{ color: '#7f1d1d', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.before}</p>
                        </div>
                        {/* After */}
                        <div
                          className="p-4 rounded-xl"
                          style={{ background: '#f0fdf4', border: '1px solid #86efac' }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <ArrowRight className="w-4 h-4 text-green-600" />
                            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Depois
                            </span>
                          </div>
                          <p style={{ color: '#14532d', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.after}</p>
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
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.1rem', marginBottom: 8 }}>
                Quer ajuda para implementar tudo isso?
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 16 }}>
                Baixe o PDF completo com exemplos detalhados e textos prontos para copiar
              </p>
              <button
                className="px-8 py-3 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', fontWeight: 700 }}
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
