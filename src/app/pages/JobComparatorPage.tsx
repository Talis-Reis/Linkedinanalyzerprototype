import { useState } from 'react';
import {
  CheckCircle, XCircle, Loader2, Target, Zap, ChevronRight, Sparkles, Lightbulb,
} from 'lucide-react';
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import { Navbar } from '../components/Navbar';

const PRESENT_SKILLS = ['React', 'TypeScript', 'Node.js', 'SQL', 'Git', 'REST API', 'HTML', 'CSS', 'JavaScript'];

const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Developer — Itaú',
    description: `Buscamos um desenvolvedor Frontend Sênior apaixonado por criar experiências digitais de alta qualidade.\n\nRequisitos:\n- 4+ anos de experiência com React e TypeScript\n- Experiência com Next.js e SSR\n- Conhecimento de testes unitários (Jest, Testing Library)\n- Familiaridade com Docker e CI/CD pipelines\n- Experiência com design systems e Figma\n- Scrum/Agile mindset\n\nDiferencial:\n- AWS ou Azure\n- GraphQL\n- Micro-frontends`,
  },
  {
    title: 'Tech Lead — Startup Fintech',
    description: `Tech Lead para liderar time de 5 devs em startup fintech de alto crescimento.\n\nStack: React, Node.js, TypeScript, PostgreSQL, AWS\nMetodologia: Scrum com sprints de 2 semanas\n\nRequisitos:\n- 6+ anos de experiência em desenvolvimento\n- Experiência com arquitetura de microservices\n- Docker e Kubernetes\n- CI/CD pipelines\n- Mentoring de desenvolvedores juniores\n- Redis e MongoDB\n- GraphQL`,
  },
  {
    title: 'Desenvolvedor Full Stack — Remote',
    description: `Empresa de SaaS B2B procura desenvolvedor Full Stack para trabalho 100% remoto.\n\nTecnologias: React, TypeScript, Node.js, PostgreSQL\n\nRequisitos:\n- 3+ anos de experiência full stack\n- React e Node.js sólido\n- Banco de dados relacionais e NoSQL\n- REST APIs\n- Testes automatizados\n- Comunicação em inglês (reuniões mensais)`,
  },
];

interface AnalysisResult {
  match: number;
  present: string[];
  missing: string[];
  suggestions: string[];
}

function analyzeCompatibility(jobDesc: string): AnalysisResult {
  const lower = jobDesc.toLowerCase();
  const allKeywords = [
    { kw: 'React', test: /react/ },
    { kw: 'TypeScript', test: /typescript/ },
    { kw: 'Node.js', test: /node/ },
    { kw: 'SQL', test: /sql|postgres|mysql/ },
    { kw: 'Git', test: /git/ },
    { kw: 'REST API', test: /rest\s*api|restful/ },
    { kw: 'Docker', test: /docker/ },
    { kw: 'AWS', test: /aws|amazon/ },
    { kw: 'Kubernetes', test: /kubernetes|k8s/ },
    { kw: 'CI/CD', test: /ci\/cd|cicd|pipeline/ },
    { kw: 'GraphQL', test: /graphql/ },
    { kw: 'Next.js', test: /next\.js|nextjs/ },
    { kw: 'Agile/Scrum', test: /agile|scrum/ },
    { kw: 'Testes', test: /jest|testing|testes/ },
    { kw: 'MongoDB', test: /mongodb|mongo/ },
    { kw: 'Redis', test: /redis/ },
    { kw: 'Microservices', test: /microservice/ },
    { kw: 'Figma', test: /figma/ },
  ];

  const required = allKeywords.filter(({ test }) => test.test(lower));
  const presentInJob = required.filter(
    ({ kw }) => PRESENT_SKILLS.some(s => s.toLowerCase() === kw.toLowerCase()) || ['SQL', 'Git', 'REST API'].includes(kw)
  );
  const missingInProfile = required.filter(
    ({ kw }) => !PRESENT_SKILLS.some(s => s.toLowerCase() === kw.toLowerCase()) && !['REST API', 'Git'].includes(kw)
  );

  const matchPct = required.length === 0 ? 80 : Math.min(95, Math.round((presentInJob.length / required.length) * 100));

  const suggestions: string[] = [];
  if (missingInProfile.some(m => m.kw === 'Docker' || m.kw === 'Kubernetes')) {
    suggestions.push('Adicione experiência com containerização ao seu perfil (mesmo projetos pessoais com Docker contam).');
  }
  if (missingInProfile.some(m => m.kw === 'AWS')) {
    suggestions.push('Obtenha a certificação AWS Cloud Practitioner — é gratuita para estudar e valoriza muito o perfil.');
  }
  if (missingInProfile.some(m => m.kw === 'CI/CD')) {
    suggestions.push('Mencione uso de GitHub Actions ou qualquer pipeline de CI/CD nos seus projetos.');
  }
  if (missingInProfile.some(m => m.kw === 'Agile/Scrum')) {
    suggestions.push('Adicione "Metodologia Ágil" ou "Scrum" às suas experiências se já trabalhou nesse modelo.');
  }
  if (suggestions.length === 0) {
    suggestions.push('Personalize o título do seu LinkedIn com as tecnologias mais relevantes para a vaga.');
    suggestions.push('Mencione o nome da empresa no primeiro parágrafo do seu About para aumentar relevância.');
  }

  return {
    match: matchPct,
    present: presentInJob.map(p => p.kw),
    missing: missingInProfile.map(m => m.kw),
    suggestions,
  };
}

export function JobComparatorPage() {
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeCompatibility(jobDesc));
      setLoading(false);
    }, 2200);
  };

  const matchColor = result
    ? result.match >= 80 ? '#10b981' : result.match >= 60 ? '#f59e0b' : '#f43f5e'
    : '#3b82f6';

  const matchLabel = result
    ? result.match >= 80 ? 'Alta compatibilidade' : result.match >= 60 ? 'Compatibilidade moderada' : 'Baixa compatibilidade'
    : '';

  const matchBg = result
    ? result.match >= 80 ? 'rgba(16,185,129,0.12)' : result.match >= 60 ? 'rgba(245,158,11,0.12)' : 'rgba(244,63,94,0.12)'
    : 'transparent';

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.3))', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <Target className="w-5 h-5" style={{ color: '#818cf8' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9' }}>
                Comparador de Vagas
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 1 }}>
                Cole a descrição da vaga e descubra seu percentual de compatibilidade com IA
              </p>
            </div>
          </div>
        </div>

        {/* Sample jobs */}
        <div className="mb-6">
          <p style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Exemplos rápidos
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_JOBS.map((job) => (
              <button
                key={job.title}
                onClick={() => setJobDesc(job.description)}
                className="px-3 py-1.5 rounded-lg text-sm transition-all hover:opacity-80 active:scale-95"
                style={{
                  background: 'rgba(37,99,235,0.12)',
                  color: '#93c5fd',
                  fontWeight: 500,
                  border: '1px solid rgba(59,130,246,0.25)',
                }}
              >
                {job.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column — Input */}
          <div className="flex flex-col gap-4">

            {/* Textarea card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>
                Descrição da Vaga
              </h2>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Cole aqui a descrição completa da vaga — título, requisitos, responsabilidades, stack técnica..."
                className="w-full rounded-xl resize-none focus:outline-none transition-all p-4 text-sm"
                style={{
                  minHeight: 280,
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  outline: 'none',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
                onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
              />
              <div className="flex items-center justify-between mt-4">
                <span style={{ color: '#475569', fontSize: '0.78rem' }}>
                  {jobDesc.length} caracteres
                </span>
                <button
                  onClick={analyze}
                  disabled={!jobDesc.trim() || loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 700, fontSize: '0.875rem' }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Analisar compatibilidade
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profile skills card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
                Seu Perfil Atual
              </h3>
              <p style={{ color: '#475569', fontSize: '0.78rem', marginBottom: 12 }}>
                Skills detectadas pela IA na última análise do seu PDF
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESENT_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{
                      background: 'rgba(16,185,129,0.1)',
                      color: '#34d399',
                      border: '1px solid rgba(16,185,129,0.2)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Results */}
          <div>
            {/* Empty state */}
            {!result && !loading && (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                style={{ background: '#1e293b', border: '2px dashed #334155', minHeight: 400 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
                >
                  <Target className="w-8 h-8" style={{ color: '#475569' }} />
                </div>
                <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 600 }}>
                  Cole uma descrição de vaga e clique em Analisar
                </p>
                <p style={{ color: '#334155', fontSize: '0.875rem', marginTop: 8 }}>
                  O resultado aparecerá aqui em segundos
                </p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                style={{ background: '#1e293b', border: '1px solid #334155', minHeight: 400 }}
              >
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 rounded-full border-4"
                    style={{ borderColor: 'rgba(99,102,241,0.15)', borderTopColor: '#6366f1', animation: 'spin 1s linear infinite' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#818cf8' }} />
                  </div>
                </div>
                <p style={{ color: '#f1f5f9', fontWeight: 700 }}>Calculando compatibilidade...</p>
                <p style={{ color: '#475569', fontSize: '0.875rem', marginTop: 6 }}>
                  Comparando seu perfil com os requisitos da vaga
                </p>
                <div className="flex gap-1.5 mt-6">
                  {['Lendo requisitos', 'Mapeando skills', 'Gerando score'].map((step, i) => (
                    <span
                      key={step}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)', animationDelay: `${i * 0.3}s` }}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {result && !loading && (
              <div className="flex flex-col gap-4">

                {/* Score gauge */}
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: '#1e293b', border: '1px solid #334155' }}
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4" style={{ color: '#818cf8' }} />
                    <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>
                      Compatibilidade com a Vaga
                    </h2>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative" style={{ width: 180, height: 150 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="50%"
                          cy="60%"
                          innerRadius="55%"
                          outerRadius="85%"
                          startAngle={210}
                          endAngle={-30}
                          data={[{ value: result.match, fill: matchColor }]}
                        >
                          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                          <RadialBar
                            dataKey="value"
                            cornerRadius={8}
                            background={{ fill: 'rgba(255,255,255,0.05)' }}
                            isAnimationActive
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: 10 }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: matchColor, lineHeight: 1 }}>
                          {result.match}%
                        </span>
                        <span style={{ color: '#475569', fontSize: '0.65rem', marginTop: 2 }}>match</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="inline-block px-4 py-1.5 rounded-full mt-1"
                    style={{ background: matchBg, color: matchColor, fontWeight: 700, fontSize: '0.85rem', border: `1px solid ${matchColor}33` }}
                  >
                    {matchLabel}
                  </div>
                </div>

                {/* Present skills */}
                {result.present.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: '#1e293b', border: '1px solid #334155' }}
                  >
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#34d399' }}>
                      <CheckCircle className="w-4 h-4" />
                      Você tem ({result.present.length} de {result.present.length + result.missing.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.present.map((kw) => (
                        <div
                          key={kw}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
                          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                        >
                          <CheckCircle className="w-3 h-3" style={{ color: '#34d399' }} />
                          <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>{kw}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing skills */}
                {result.missing.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: '#1e293b', border: '1px solid #334155' }}
                  >
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fb7185' }}>
                      <XCircle className="w-4 h-4" />
                      A desenvolver ({result.missing.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missing.map((kw) => (
                        <div
                          key={kw}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
                          style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.25)' }}
                        >
                          <XCircle className="w-3 h-3" style={{ color: '#fb7185' }} />
                          <span style={{ color: '#fb7185', fontSize: '0.8rem', fontWeight: 600 }}>{kw}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: '#1e293b', border: '1px solid #334155' }}
                >
                  <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9' }}>
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Como aumentar sua compatibilidade
                  </h3>
                  <div className="flex flex-col gap-3">
                    {result.suggestions.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}
                        >
                          {i + 1}
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.65 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => { setResult(null); setJobDesc(''); }}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-70"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#475569', border: '1px solid #334155' }}
                >
                  Analisar outra vaga
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
