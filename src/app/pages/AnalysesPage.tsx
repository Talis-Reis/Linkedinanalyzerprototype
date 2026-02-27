import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FileText,
  Upload,
  Eye,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  Award,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface Analysis {
  id: string;
  fileName: string;
  date: string;
  score: number;
  scoreTrend: 'up' | 'down' | 'neutral';
  prevScore?: number;
  status: 'completed' | 'processing' | 'error';
  tags: string[];
  highlights: { type: 'good' | 'warn' | 'crit'; text: string }[];
}

const MOCK_ANALYSES: Analysis[] = [
  {
    id: '1',
    fileName: 'LinkedIn_Profile_João_Silva.pdf',
    date: '2025-02-25',
    score: 82,
    scoreTrend: 'up',
    prevScore: 67,
    status: 'completed',
    tags: ['Engenharia', 'Sênior', 'Full Stack'],
    highlights: [
      { type: 'good', text: 'Resumo profissional bem elaborado' },
      { type: 'good', text: '12 recomendações no perfil' },
      { type: 'warn', text: 'Habilidades desatualizadas (Python, Docker)' },
      { type: 'crit', text: 'Sem foto profissional detectada' },
    ],
  },
  {
    id: '2',
    fileName: 'LinkedIn_Atualizado_v2.pdf',
    date: '2025-02-10',
    score: 67,
    scoreTrend: 'neutral',
    status: 'completed',
    tags: ['Engenharia', 'Pleno'],
    highlights: [
      { type: 'warn', text: 'Falta de palavras-chave de recrutadores' },
      { type: 'crit', text: 'Nenhuma certificação listada' },
      { type: 'good', text: 'Experiências com métricas quantitativas' },
    ],
  },
  {
    id: '3',
    fileName: 'Perfil_LinkedIn_Jan25.pdf',
    date: '2025-01-18',
    score: 54,
    scoreTrend: 'down',
    prevScore: 60,
    status: 'completed',
    tags: ['Engenharia', 'Júnior'],
    highlights: [
      { type: 'crit', text: 'Resumo muito genérico' },
      { type: 'crit', text: 'Apenas 2 conexões de 1º grau visíveis' },
      { type: 'warn', text: 'Nenhum projeto pessoal listado' },
    ],
  },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e';
  const bg = score >= 80 ? 'rgba(16,185,129,0.12)' : score >= 60 ? 'rgba(245,158,11,0.12)' : 'rgba(244,63,94,0.12)';
  return (
    <div
      className="flex items-center justify-center w-14 h-14 rounded-xl font-bold text-lg shrink-0"
      style={{ color, background: bg, border: `2px solid ${color}40` }}
    >
      {score}
    </div>
  );
}

function TrendIcon({ trend, prev, curr }: { trend: Analysis['scoreTrend']; prev?: number; curr: number }) {
  if (trend === 'up' && prev !== undefined) {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#10b981' }}>
        <TrendingUp className="w-3.5 h-3.5" /> +{curr - prev} pts
      </span>
    );
  }
  if (trend === 'down' && prev !== undefined) {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#f43f5e' }}>
        <TrendingDown className="w-3.5 h-3.5" /> {curr - prev} pts
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
      <Minus className="w-3.5 h-3.5" /> Sem comparativo
    </span>
  );
}

function HighlightDot({ type }: { type: Analysis['highlights'][number]['type'] }) {
  const color = type === 'good' ? '#10b981' : type === 'warn' ? '#f59e0b' : '#f43f5e';
  return <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: color }} />;
}

export function AnalysesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = MOCK_ANALYSES.filter((a) =>
    a.fileName.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-2xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem' }}>Perfis Analisados</h2>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
          >
            <Upload className="w-4 h-4" /> Nova análise
          </button>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Histórico completo de todos os perfis que você analisou com a IA.
        </p>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: BarChart2, label: 'Total de análises', value: MOCK_ANALYSES.length.toString(), color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
            { icon: Award, label: 'Melhor score', value: Math.max(...MOCK_ANALYSES.map((a) => a.score)).toString(), color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
            { icon: TrendingUp, label: 'Evolução', value: '+28 pts', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
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
          placeholder="Buscar por nome ou tag..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm"
          style={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }}
          onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
          onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-10 flex flex-col items-center gap-4 text-center" style={{ background: '#1e293b', border: '1px solid #334155' }}>
          <Filter className="w-10 h-10 text-slate-600" />
          <div style={{ color: '#94a3b8', fontWeight: 600 }}>Nenhuma análise encontrada</div>
          <div style={{ color: '#475569', fontSize: '0.875rem' }}>Tente outro termo de busca</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((analysis) => (
            <div
              key={analysis.id}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              {/* Main row */}
              <div className="flex items-center gap-4 p-5">
                <ScoreBadge score={analysis.score} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold truncate text-sm" style={{ color: '#f1f5f9' }}>
                      {analysis.fileName}
                    </span>
                    {analysis.status === 'completed' && (
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                      <Calendar className="w-3 h-3" />
                      {new Date(analysis.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <TrendIcon trend={analysis.scoreTrend} prev={analysis.prevScore} curr={analysis.score} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {analysis.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
                  >
                    <Eye className="w-3.5 h-3.5" /> Ver métricas
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === analysis.id ? null : analysis.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}
                  >
                    <ChevronRight
                      className="w-4 h-4 transition-transform"
                      style={{ transform: expanded === analysis.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded highlights */}
              {expanded === analysis.id && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: '#334155' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>
                    Destaques da análise
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {analysis.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        {h.type === 'good' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : h.type === 'warn' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <span style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.5 }}>{h.text}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-4 flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-80"
                    style={{ color: '#3b82f6' }}
                  >
                    Ver dashboard completo desta análise <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
