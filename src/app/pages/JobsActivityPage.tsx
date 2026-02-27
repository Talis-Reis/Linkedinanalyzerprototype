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
  AlertTriangle,
  XCircle,
} from 'lucide-react';

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
    matchedSkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
    missingSkills: ['Kotlin', 'Kafka'],
    salary: 'R$ 18.000 – R$ 24.000',
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
    matchedSkills: ['React', 'TypeScript', 'Liderança técnica', 'GraphQL'],
    missingSkills: ['React Native', 'Figma avançado', 'A/B Testing'],
    salary: 'R$ 22.000 – R$ 28.000',
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
    matchedSkills: ['Java', 'Spring Boot', 'Microservices'],
    missingSkills: ['Kotlin', 'DDD', 'Event Sourcing', 'RabbitMQ'],
    salary: 'R$ 12.000 – R$ 18.000',
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
    matchedSkills: ['JavaScript', 'HTML/CSS'],
    missingSkills: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'Docker'],
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

export function JobsActivityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

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
                    onClick={() => navigate('/comparador')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                    style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Ver análise
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
