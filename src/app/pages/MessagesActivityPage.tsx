import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  MessageSquare,
  Copy,
  Check,
  Search,
  Plus,
  Calendar,
  User,
  Building2,
  Tag,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface GeneratedMessage {
  id: string;
  recruiterName: string;
  company: string;
  jobTitle: string;
  type: 'conexao' | 'candidatura' | 'followup' | 'agradecimento';
  date: string;
  preview: string;
  fullMessage: string;
  tone: 'formal' | 'casual' | 'direto';
}

const TYPE_LABELS: Record<GeneratedMessage['type'], string> = {
  conexao: 'Pedido de Conexão',
  candidatura: 'Candidatura',
  followup: 'Follow-up',
  agradecimento: 'Agradecimento',
};

const TYPE_COLORS: Record<GeneratedMessage['type'], { color: string; bg: string }> = {
  conexao: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  candidatura: { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  followup: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  agradecimento: { color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
};

const TONE_LABELS: Record<GeneratedMessage['tone'], string> = {
  formal: '🎩 Formal',
  casual: '👋 Casual',
  direto: '⚡ Direto',
};

const MOCK_MESSAGES: GeneratedMessage[] = [
  {
    id: '1',
    recruiterName: 'Ana Rodrigues',
    company: 'Nubank',
    jobTitle: 'Engenheiro de Software Sênior',
    type: 'conexao',
    date: '2025-02-25',
    tone: 'casual',
    preview: 'Olá Ana! Vi sua publicação sobre a abertura de vagas no Nubank para engenheiros sênior...',
    fullMessage: `Olá Ana! Vi sua publicação sobre a abertura de vagas no Nubank para engenheiros sênior e fiquei muito interessado.

Tenho 6 anos de experiência com React, TypeScript e Node.js, com passagem por empresas de alto crescimento como a VTEX e a Loggi. Nos últimos 2 anos, liderei a migração de um monolito para microsserviços, reduzindo o tempo de resposta da API em 47%.

Adoraria trocar uma ideia sobre como meu perfil pode agregar ao time de tecnologia de vocês. Você teria 15 minutos esta semana?`,
  },
  {
    id: '2',
    recruiterName: 'Carlos Mendes',
    company: 'iFood',
    jobTitle: 'Tech Lead Frontend',
    type: 'candidatura',
    date: '2025-02-20',
    tone: 'formal',
    preview: 'Prezado Carlos, gostaria de manifestar meu interesse na posição de Tech Lead Frontend...',
    fullMessage: `Prezado Carlos,

Gostaria de manifestar meu interesse na posição de Tech Lead Frontend no iFood. Com 8 anos de experiência em desenvolvimento web e 3 anos em liderança técnica, acredito que posso contribuir significativamente com os objetivos da equipe.

Minha experiência inclui:
• Liderança de times de 6 a 12 engenheiros
• Arquitetura de aplicações React escaláveis com +50 milhões de usuários
• Implementação de práticas de engenharia de excelência (Code Review, TDD, CI/CD)

Fico à disposição para uma conversa mais aprofundada.

Atenciosamente,
João Silva`,
  },
  {
    id: '3',
    recruiterName: 'Mariana Lima',
    company: 'PicPay',
    jobTitle: 'Software Engineer II',
    type: 'followup',
    date: '2025-02-15',
    tone: 'direto',
    preview: 'Oi Mariana! Passando para fazer um follow-up sobre a vaga de Software Engineer II...',
    fullMessage: `Oi Mariana!

Passando para fazer um follow-up sobre a vaga de Software Engineer II que me candidatei há duas semanas.

Continuo muito interessado na posição e gostaria de saber se houve alguma atualização no processo seletivo.

Qualquer feedback é bem-vindo!

João Silva`,
  },
  {
    id: '4',
    recruiterName: 'Roberto Carvalho',
    company: 'Totvs',
    jobTitle: 'Desenvolvedor Full Stack',
    type: 'agradecimento',
    date: '2025-02-08',
    tone: 'formal',
    preview: 'Prezado Roberto, gostaria de agradecer pela entrevista de ontem sobre a vaga de...',
    fullMessage: `Prezado Roberto,

Gostaria de agradecer pela entrevista de ontem sobre a vaga de Desenvolvedor Full Stack na Totvs.

Foi muito enriquecedor conhecer mais sobre os desafios técnicos que o time enfrenta e como a empresa está evoluindo sua plataforma. A conversa me deixou ainda mais motivado para fazer parte deste projeto.

Estou à disposição caso precisem de informações adicionais.

Grato pela oportunidade,
João Silva`,
  },
  {
    id: '5',
    recruiterName: 'Fernanda Souza',
    company: 'Creditas',
    jobTitle: 'Engenheiro de Software',
    type: 'conexao',
    date: '2025-01-22',
    tone: 'casual',
    preview: 'Oi Fernanda! Acompanho o trabalho da Creditas há um tempo e me impressiona muito...',
    fullMessage: `Oi Fernanda!

Acompanho o trabalho da Creditas há um tempo e me impressiona muito como vocês estão transformando o mercado de crédito no Brasil.

Sou engenheiro de software com foco em backend e sistemas distribuídos, e tenho muita vontade de contribuir com projetos desse nível de impacto.

Posso te enviar meu perfil para uma avaliação futura?`,
  },
];

export function MessagesActivityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<GeneratedMessage['type'] | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = MOCK_MESSAGES.filter((m) => {
    const matchSearch =
      m.recruiterName.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      m.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || m.type === filterType;
    return matchSearch && matchType;
  });

  const handleCopy = (msg: GeneratedMessage) => {
    navigator.clipboard.writeText(msg.fullMessage);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-2xl p-6" style={{ background: '#1e293b', border: '1px solid #334155' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-400" />
            <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem' }}>Mensagens Geradas</h2>
          </div>
          <button
            onClick={() => navigate('/mensagens')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}
          >
            <Plus className="w-4 h-4" /> Nova mensagem
          </button>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Todas as mensagens que você gerou para enviar a recrutadores.
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[
            { label: 'Total', value: MOCK_MESSAGES.length, color: '#f43f5e', bg: 'rgba(244,63,94,0.1)' },
            { label: 'Conexões', value: MOCK_MESSAGES.filter((m) => m.type === 'conexao').length, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
            { label: 'Candidaturas', value: MOCK_MESSAGES.filter((m) => m.type === 'candidatura').length, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
            { label: 'Follow-ups', value: MOCK_MESSAGES.filter((m) => m.type === 'followup').length, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="p-3 rounded-xl text-center" style={{ background: bg }}>
              <div style={{ color, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1 }}>{value}</div>
              <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar recrutador, empresa ou cargo..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm"
            style={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }}
            onFocus={(e) => { e.target.style.borderColor = '#f43f5e'; }}
            onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'conexao', 'candidatura', 'followup', 'agradecimento'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: filterType === type ? (type === 'all' ? 'rgba(244,63,94,0.15)' : TYPE_COLORS[type as GeneratedMessage['type']]?.bg ?? 'rgba(244,63,94,0.15)') : 'rgba(255,255,255,0.04)',
                color: filterType === type ? (type === 'all' ? '#f43f5e' : TYPE_COLORS[type as GeneratedMessage['type']]?.color ?? '#f43f5e') : '#64748b',
                border: `1px solid ${filterType === type ? 'rgba(244,63,94,0.3)' : '#334155'}`,
              }}
            >
              {type === 'all' ? 'Todos' : TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-10 flex flex-col items-center gap-4 text-center" style={{ background: '#1e293b', border: '1px solid #334155' }}>
          <MessageSquare className="w-10 h-10 text-slate-600" />
          <div style={{ color: '#94a3b8', fontWeight: 600 }}>Nenhuma mensagem encontrada</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((msg) => {
            const typeStyle = TYPE_COLORS[msg.type];
            const isExpanded = expanded === msg.id;
            const isCopied = copiedId === msg.id;
            return (
              <div
                key={msg.id}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#1e293b', border: '1px solid #334155' }}
              >
                {/* Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ color: typeStyle.color, background: typeStyle.bg }}
                        >
                          {TYPE_LABELS[msg.type]}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                          {TONE_LABELS[msg.tone]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#f1f5f9', fontWeight: 600 }}>
                          <User className="w-3 h-3 text-slate-400" /> {msg.recruiterName}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
                          <Building2 className="w-3 h-3" /> {msg.company}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                          <Tag className="w-3 h-3" /> {msg.jobTitle}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                          <Calendar className="w-3 h-3" />
                          {new Date(msg.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(msg)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                        style={{
                          background: isCopied ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                          color: isCopied ? '#34d399' : '#94a3b8',
                          border: `1px solid ${isCopied ? 'rgba(16,185,129,0.25)' : '#334155'}`,
                        }}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  {/* Preview */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#94a3b8', fontStyle: 'italic' }}
                  >
                    "{msg.preview}"
                  </p>
                </div>

                {/* Expand */}
                <button
                  className="w-full flex items-center justify-between px-5 py-3 transition-all hover:opacity-80 border-t text-sm"
                  style={{ color: '#64748b', borderColor: '#334155', background: 'rgba(255,255,255,0.02)' }}
                  onClick={() => setExpanded(isExpanded ? null : msg.id)}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isExpanded ? 'Ocultar mensagem completa' : 'Ver mensagem completa'}
                  </span>
                  <ChevronRight className="w-4 h-4 transition-transform" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                </button>

                {/* Full message */}
                {isExpanded && (
                  <div className="px-5 pb-5">
                    <div
                      className="mt-4 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line"
                      style={{ background: 'rgba(255,255,255,0.03)', color: '#cbd5e1', border: '1px solid #334155', fontFamily: 'monospace' }}
                    >
                      {msg.fullMessage}
                    </div>
                    <button
                      onClick={() => handleCopy(msg)}
                      className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                      style={{
                        background: isCopied ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.1)',
                        color: isCopied ? '#34d399' : '#f43f5e',
                        border: `1px solid ${isCopied ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)'}`,
                      }}
                    >
                      {isCopied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar mensagem completa</>}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
