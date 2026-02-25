import { useState } from 'react';
import {
  CheckCircle, XCircle, Loader2, Target, Zap, AlertTriangle, ChevronRight
} from 'lucide-react';
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { Navbar } from '../components/Navbar';

const PRESENT_SKILLS = ['React', 'TypeScript', 'Node.js', 'SQL', 'Git', 'REST API', 'HTML', 'CSS', 'JavaScript'];
const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Developer — Itaú',
    description: `Buscamos um desenvolvedor Frontend Sênior apaixonado por criar experiências digitais de alta qualidade.

Requisitos:
- 4+ anos de experiência com React e TypeScript
- Experiência com Next.js e SSR
- Conhecimento de testes unitários (Jest, Testing Library)
- Familiaridade com Docker e CI/CD pipelines
- Experiência com design systems e Figma
- Scrum/Agile mindset

Diferencial:
- AWS ou Azure
- GraphQL
- Micro-frontends`,
  },
  {
    title: 'Tech Lead — Startup Fintech',
    description: `Tech Lead para liderar time de 5 devs em startup fintech de alto crescimento.

Stack: React, Node.js, TypeScript, PostgreSQL, AWS
Metodologia: Scrum com sprints de 2 semanas

Requisitos:
- 6+ anos de experiência em desenvolvimento
- Experiência com arquitetura de microservices
- Docker e Kubernetes
- CI/CD pipelines
- Mentoring de desenvolvedores juniores
- Redis e MongoDB
- GraphQL`,
  },
  {
    title: 'Desenvolvedor Full Stack — Remote',
    description: `Empresa de SaaS B2B procura desenvolvedor Full Stack para trabalho 100% remoto.

Tecnologias: React, TypeScript, Node.js, PostgreSQL

Requisitos:
- 3+ anos de experiência full stack
- React e Node.js sólido
- Banco de dados relacionais e NoSQL
- REST APIs
- Testes automatizados
- Comunicação em inglês (reuniões mensais)`,
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
    { kw: 'CI\/CD', test: /ci\/cd|cicd|pipeline/ },
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
  const presentInJob = required.filter(({ kw }) => PRESENT_SKILLS.some(s => s.toLowerCase() === kw.toLowerCase()) || ['SQL', 'Git', 'REST API'].includes(kw));
  const missingInProfile = required.filter(({ kw }) => !PRESENT_SKILLS.some(s => s.toLowerCase() === kw.toLowerCase()) && !['REST API', 'Git'].includes(kw));

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
    ? result.match >= 80 ? '#22c55e' : result.match >= 60 ? '#f59e0b' : '#ef4444'
    : '#3b82f6';

  const matchLabel = result
    ? result.match >= 80 ? 'Alta compatibilidade' : result.match >= 60 ? 'Compatibilidade moderada' : 'Baixa compatibilidade'
    : '';

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Comparador de Vagas
          </h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>
            Cole a descrição da vaga abaixo e descubra seu percentual de compatibilidade
          </p>
        </div>

        {/* Sample jobs */}
        <div className="mb-6">
          <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Exemplos rápidos
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_JOBS.map((job) => (
              <button
                key={job.title}
                onClick={() => setJobDesc(job.description)}
                className="px-3 py-1.5 rounded-lg text-sm transition-all hover:opacity-80"
                style={{ background: '#eff6ff', color: '#2563eb', fontWeight: 500, border: '1px solid #bfdbfe' }}
              >
                {job.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                Descrição da Vaga
              </h2>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Cole aqui a descrição completa da vaga — título, requisitos, responsabilidades, stack técnica..."
                className="w-full rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all p-4 text-sm"
                style={{
                  minHeight: 280,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#374151',
                  lineHeight: 1.6,
                }}
              />
              <div className="flex items-center justify-between mt-4">
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  {jobDesc.length} caracteres
                </span>
                <button
                  onClick={analyze}
                  disabled={!jobDesc.trim() || loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Your profile summary */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                Seu Perfil Atual
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESENT_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{ background: '#dcfce7', color: '#15803d', fontWeight: 600 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {!result && !loading && (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                style={{ background: '#fff', border: '2px dashed #e2e8f0', minHeight: 380 }}
              >
                <Target className="w-12 h-12 mb-4" style={{ color: '#cbd5e1' }} />
                <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 600 }}>
                  Cole uma descrição de vaga e clique em Analisar
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginTop: 8 }}>
                  O resultado aparecerá aqui em segundos
                </p>
              </div>
            )}

            {loading && (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                style={{ background: '#fff', border: '1px solid #e2e8f0', minHeight: 380 }}
              >
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 rounded-full border-4 border-blue-100"
                    style={{ borderTopColor: '#3b82f6' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  </div>
                </div>
                <p style={{ color: '#0f172a', fontWeight: 700 }}>Calculando compatibilidade...</p>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 4 }}>
                  Comparando seu perfil com os requisitos da vaga
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-4">
                {/* Match percentage */}
                <div className="bg-white rounded-2xl p-6 text-center" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
                    Compatibilidade com a Vaga
                  </h2>
                  <div className="flex items-center justify-center mb-4">
                    <div style={{ height: 160 }}>
                      <ResponsiveContainer width={180} height={160}>
                        <RadialBarChart
                          cx={90}
                          cy={80}
                          innerRadius={50}
                          outerRadius={75}
                          startAngle={210}
                          endAngle={-30}
                          data={[{ value: result.match, fill: matchColor }]}
                        >
                          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                          <RadialBar
                            dataKey="value"
                            cornerRadius={8}
                            background={{ fill: '#e2e8f0' }}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: matchColor, lineHeight: 1, marginTop: -16 }}>
                    {result.match}%
                  </div>
                  <div
                    className="inline-block px-3 py-1 rounded-full mt-2"
                    style={{ background: result.match >= 80 ? '#dcfce7' : result.match >= 60 ? '#fef3c7' : '#fee2e2', color: matchColor, fontWeight: 700, fontSize: '0.875rem' }}
                  >
                    {matchLabel}
                  </div>
                </div>

                {/* Present skills */}
                {result.present.length > 0 && (
                  <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                      ✅ Você tem ({result.present.length} de {result.present.length + result.missing.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.present.map((kw) => (
                        <div key={kw} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          <span style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: 600 }}>{kw}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing skills */}
                {result.missing.length > 0 && (
                  <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                      ❌ Você não tem ({result.missing.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missing.map((kw) => (
                        <div key={kw} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: '#fee2e2', border: '1px solid #fca5a5' }}>
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                          <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 600 }}>{kw}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                    💡 Como aumentar sua compatibilidade
                  </h3>
                  <div className="space-y-3">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: 1.6 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
