import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  GitCompare,
  Building2,
  MapPin,
  Calendar,
  Search,
  ExternalLink,
  ChevronRight,
  Target,
  TrendingUp,
  Plus,
  CheckCircle,
  XCircle,
  X,
  Lightbulb,
  BarChart2,
  Zap,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

interface JobComparison {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  modality: 'Remoto' | 'Híbrido' | 'Presencial';
  compatibility: number;
  date: string;
  status: 'excellent' | 'good' | 'average' | 'low';
  matchedSkills: string[];
  missingSkills: string[];
  salary?: string;
  url?: string;
  breakdown: { label: string; score: number; color: string }[];
  suggestions: string[];
  summary: string;
}

const MOCK_JOBS: JobComparison[] = [
  {
    id: '1',
    jobTitle: 'Engenheiro de Software Sênior',
    company: 'Nubank',
    location: 'São Paulo, SP',
    modality: 'Híbrido',
    compatibility: 91,
    date: '2025-02-24',
    status: 'excellent',
    matchedSkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'REST API', 'Git', 'CI/CD'],
    missingSkills: ['Kotlin', 'Kafka'],
    salary: 'R$ 18.000 – R$ 24.000',
    breakdown: [
      { label: 'Stack técnica', score: 95, color: '#10b981' },
      { label: 'Senioridade', score: 88, color: '#3b82f6' },
      { label: 'Soft skills', score: 90, color: '#8b5cf6' },
      { label: 'Palavras-chave ATS', score: 85, color: '#f59e0b' },
    ],
    suggestions: [
      'Adicione Kotlin ao seu perfil — mesmo um projeto pessoal básico já aumenta a compatibilidade para ~97%.',
      'Mencione experiência com sistemas de alta disponibilidade, já que o Nubank processa milhões de transações diárias.',
      'Cite métricas de impacto nas suas experiências (ex: "reduzi latência em X%") para se destacar na triagem.',
    ],
    summary:
      'Excelente match! Você tem o core técnico que o Nubank busca. As principais lacunas (Kotlin e Kafka) são aprendíveis rapidamente e não são blockers para a candidatura.',
  },
  {
    id: '2',
    jobTitle: 'Tech Lead Frontend',
    company: 'iFood',
    location: 'São Paulo, SP',
    modality: 'Remoto',
    compatibility: 78,
    date: '2025-02-20',
    status: 'good',
    matchedSkills: ['React', 'TypeScript', 'GraphQL', 'Liderança técnica', 'Git'],
    missingSkills: ['React Native', 'Figma avançado', 'A/B Testing', 'Design System ownership'],
    salary: 'R$ 22.000 – R$ 28.000',
    breakdown: [
      { label: 'Stack técnica', score: 82, color: '#3b82f6' },
      { label: 'Senioridade', score: 85, color: '#10b981' },
      { label: 'Soft skills', score: 75, color: '#8b5cf6' },
      { label: 'Palavras-chave ATS', score: 68, color: '#f59e0b' },
    ],
    suggestions: [
      'Inclua exemplos concretos de liderança: número de pessoas lideradas, projetos entregues, processos implementados.',
      'Mencione qualquer experiência com mobile (React Native ou outra), mesmo que superficial.',
      'Adicione "A/B Testing" e "Design System" às habilidades se já participou de iniciativas do tipo.',
      'O iFood valoriza muito a cultura de dados — cite experimentos e métricas de produto nas suas experiências.',
    ],
    summary:
      'Bom fit, especialmente na parte técnica sênior. As lacunas estão mais na interseção de design e produto. Com pequenos ajustes no LinkedIn você pode chegar a 88%+.',
  },
  {
    id: '3',
    jobTitle: 'Software Engineer II',
    company: 'PicPay',
    location: 'Vitória, ES',
    modality: 'Remoto',
    compatibility: 64,
    date: '2025-02-15',
    status: 'average',
    matchedSkills: ['Java', 'Spring Boot', 'Microservices', 'REST API', 'Git'],
    missingSkills: ['Kotlin', 'DDD', 'Event Sourcing', 'RabbitMQ', 'MongoDB'],
    salary: 'R$ 12.000 – R$ 18.000',
    breakdown: [
      { label: 'Stack técnica', score: 60, color: '#f59e0b' },
      { label: 'Senioridade', score: 72, color: '#3b82f6' },
      { label: 'Soft skills', score: 70, color: '#8b5cf6' },
      { label: 'Palavras-chave ATS', score: 55, color: '#f43f5e' },
    ],
    suggestions: [
      'O PicPay usa Kotlin extensivamente — estudar o básico e adicionar ao perfil aumentaria muito sua compatibilidade.',
      'DDD (Domain-Driven Design) é um diferencial crítico para vagas backend nível II+. Adicione se já praticou.',
      'Cite experiência com mensageria (RabbitMQ, Kafka ou qualquer queue) mesmo que em projetos de estudo.',
      'Adicione palavras-chave de arquitetura distribuída: "event-driven", "CQRS", "eventual consistency".',
    ],
    summary:
      'Fit mediano. Você tem a base de backend (Java/Spring), mas a vaga exige conhecimento mais profundo em arquitetura orientada a eventos e stack Kotlin. Vale investir 2–3 semanas estudando antes de se candidatar.',
  },
  {
    id: '4',
    jobTitle: 'Desenvolvedor Fullstack Júnior',
    company: 'Startup XYZ',
    location: 'Remoto',
    modality: 'Remoto',
    compatibility: 44,
    date: '2025-01-30',
    status: 'low',
    matchedSkills: ['JavaScript', 'HTML/CSS', 'Git'],
    missingSkills: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'Docker', 'REST API design'],
    breakdown: [
      { label: 'Stack técnica', score: 38, color: '#f43f5e' },
      { label: 'Senioridade', score: 60, color: '#f59e0b' },
      { label: 'Soft skills', score: 55, color: '#8b5cf6' },
      { label: 'Palavras-chave ATS', score: 40, color: '#f43f5e' },
    ],
    suggestions: [
      'A stack desta vaga (PHP/Laravel/Vue) é muito diferente do seu perfil atual. Considere se faz sentido aprender essa stack ou focar em vagas alinhadas com React/Node.',
      'Se quiser se candidatar mesmo assim, faça um projeto pessoal rápido com Vue.js para demonstrar adaptabilidade.',
      'Adicione "Docker" ao perfil — é uma skill de alto impacto que aparece em quase todas as vagas fullstack.',
    ],
    summary:
      'Baixo fit com esta vaga específica — a stack é bastante diferente do seu perfil React/Node. Recomendamos buscar vagas mais alinhadas ou investir tempo aprendendo Vue.js e Laravel antes de se candidatar.',
  },
];

function CompatBar({ value, status }: { value: number; status: JobComparison['status'] }) {
  const color =
    status === 'excellent' ? '#10b981' :
    status === 'good' ? '#3b82f6' :
    status === 'average' ? '#f59e0b' : '#f43f5e';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold w-10 text-right" style={{ color }}>{value}%</span>
    </div>
  );
}

function StatusBadge({ status }: { status: JobComparison['status'] }) {
  const cfgs = {
    excellent: { label: 'Excelente', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    good: { label: 'Bom fit', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
    average: { label: 'Mediano', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    low: { label: 'Baixo fit', color: '#f43f5e', bg: 'rgba(244,63,94,0.12)' },
  };
  const c = cfgs[status];
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ color: c.color, background: c.bg }}>
      {c.label}
    </span>
  );
}

function ModalityBadge({ modality }: { modality: JobComparison['modality'] }) {
  const cfgs = {
    Remoto: { color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
    Híbrido: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
    Presencial: { color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
  };
  const c = cfgs[modality];
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ color: c.color, background: c.bg }}>
      {modality}
    </span>
  );
}

// ── Analysis Modal ──────────────────────────────────────────────────────────
function AnalysisModal({
  job,
  onClose,
  onNewComparison,
}: {
  job: JobComparison;
  onClose: () => void;
  onNewComparison: () => void;
}) {
  const scoreColor =
    job.status === 'excellent' ? '#10b981' :
    job.status === 'good' ? '#3b82f6' :
    job.status === 'average' ? '#f59e0b' : '#f43f5e';

  const gaugeData = [{ value: job.compatibility, fill: scoreColor }];

  const scoreLabel =
    job.status === 'excellent' ? 'Alta compatibilidade' :
    job.status === 'good' ? 'Boa compatibilidade' :
    job.status === 'average' ? 'Compatibilidade moderada' : 'Baixa compatibilidade';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{ background: '#0f172a', border: '1px solid #334155' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-start justify-between gap-3 p-6 z-10"
          style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <StatusBadge status={job.status} />
              <ModalityBadge modality={job.modality} />
            </div>
            <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.3 }}>
              {job.jobTitle}
            </h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
                <Building2 className="w-3 h-3" /> {job.company}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                <MapPin className="w-3 h-3" /> {job.location}
              </span>
              {job.salary && (
                <span className="text-xs font-semibold" style={{ color: '#10b981' }}>
                  💰 {job.salary}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
            style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Score gauge + summary */}
          <div
            className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6"
            style={{ background: '#1e293b', border: '1px solid #334155' }}
          >
            {/* Radial gauge */}
            <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  startAngle={225}
                  endAngle={-45}
                  data={gaugeData}
                  barSize={12}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar
                    background={{ fill: 'rgba(255,255,255,0.06)' }}
                    dataKey="value"
                    cornerRadius={6}
                    isAnimationActive
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span style={{ color: scoreColor, fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
                  {job.compatibility}%
                </span>
                <span style={{ color: '#64748b', fontSize: '0.65rem', marginTop: 2, textAlign: 'center' }}>
                  match
                </span>
              </div>
            </div>

            {/* Summary text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: scoreColor }} />
                <span style={{ color: scoreColor, fontWeight: 700, fontSize: '0.9rem' }}>
                  {scoreLabel}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.65 }}>
                {job.summary}
              </p>
            </div>
          </div>

          {/* Breakdown por categoria */}
          <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4 text-blue-400" />
              <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem' }}>
                Breakdown por categoria
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {job.breakdown.map(({ label, score, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{label}</span>
                    <span style={{ color, fontSize: '0.82rem', fontWeight: 700 }}>{score}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${score}%`, background: color, transition: 'width 0.6s ease' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Matched */}
            <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h3 style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}>
                  Skills compatíveis ({job.matchedSkills.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-400" />
                <h3 style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.85rem' }}>
                  Skills a desenvolver ({job.missingSkills.length})
                </h3>
              </div>
              {job.missingSkills.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Nenhuma lacuna identificada 🎉</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {job.missingSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'rgba(244,63,94,0.08)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem' }}>
                Recomendações da IA
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {job.suggestions.map((s, i) => (
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
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onNewComparison}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold flex-1 justify-center transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              <Zap className="w-4 h-4" /> Comparar com nova vaga
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-70"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid #334155' }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export function JobsActivityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [analysisJob, setAnalysisJob] = useState<JobComparison | null>(null);

  const filtered = MOCK_JOBS.filter(
    (j) =>
      j.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
  );

  const avgCompat = Math.round(MOCK_JOBS.reduce((s, j) => s + j.compatibility, 0) / MOCK_JOBS.length);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-2xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-amber-400" />
            <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem' }}>Vagas Comparadas</h2>
          </div>
          <button
            onClick={() => navigate('/comparador')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
          >
            <Plus className="w-4 h-4" /> Nova comparação
          </button>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Todas as vagas que você comparou com seu perfil usando a IA.
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: GitCompare, label: 'Vagas comparadas', value: MOCK_JOBS.length.toString(), color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            { icon: Target, label: 'Compatibilidade média', value: `${avgCompat}%`, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
            { icon: TrendingUp, label: 'Melhor match', value: `${Math.max(...MOCK_JOBS.map((j) => j.compatibility))}%`, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: bg }}>
              <Icon className="w-4 h-4 shrink-0" style={{ color }} />
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>{value}</div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: 2 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por cargo ou empresa..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm"
          style={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }}
          onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; }}
          onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl overflow-hidden transition-all"
            style={{ background: '#1e293b', border: '1px solid #334155' }}
          >
            {/* Main row */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem' }}>{job.jobTitle}</span>
                    <StatusBadge status={job.status} />
                    <ModalityBadge modality={job.modality} />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
                      <Building2 className="w-3 h-3" /> {job.company}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                      <Calendar className="w-3 h-3" />
                      {new Date(job.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  {job.salary && (
                    <div className="mt-1.5 text-xs font-semibold" style={{ color: '#10b981' }}>
                      💰 {job.salary}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setAnalysisJob(job)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #2563eb44, #7c3aed44)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.35)' }}
                  >
                    <BarChart2 className="w-3.5 h-3.5" /> Ver análise
                  </button>
                </div>
              </div>

              <CompatBar value={job.compatibility} status={job.status} />
            </div>

            {/* Expand toggle */}
            <button
              className="w-full flex items-center justify-between px-5 py-3 transition-all hover:opacity-80 border-t text-sm"
              style={{ color: '#64748b', borderColor: '#334155', background: 'rgba(255,255,255,0.02)' }}
              onClick={() => setExpanded(expanded === job.id ? null : job.id)}
            >
              <span>Ver skills compatíveis e ausentes</span>
              <ChevronRight
                className="w-4 h-4 transition-transform"
                style={{ transform: expanded === job.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Expanded */}
            {expanded === job.id && (
              <div className="px-5 pb-5">
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>Skills que você tem</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.matchedSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span style={{ color: '#f87171', fontSize: '0.8rem', fontWeight: 600 }}>Skills a desenvolver</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.missingSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(244,63,94,0.08)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setAnalysisJob(job)}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-80"
                  style={{ color: '#818cf8' }}
                >
                  Ver análise completa com recomendações <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analysis Modal */}
      {analysisJob && (
        <AnalysisModal
          job={analysisJob}
          onClose={() => setAnalysisJob(null)}
          onNewComparison={() => { setAnalysisJob(null); navigate('/comparador'); }}
        />
      )}
    </div>
  );
}
