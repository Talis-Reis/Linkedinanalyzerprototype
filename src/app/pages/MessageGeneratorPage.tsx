import { useState } from 'react';
import { Copy, Check, RefreshCw, MessageSquare, Zap, Lightbulb, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';

type TemplateType = 'Direta' | 'Valor' | 'Pergunta' | 'Conexão';
type Tone = 'Profissional' | 'Amigável' | 'Entusiasmado' | 'Formal';

interface FormData {
  recruiterName: string;
  company: string;
  position: string;
  myName: string;
  myRole: string;
  myHighlight: string;
}

const TEMPLATES: TemplateType[] = ['Direta', 'Valor', 'Pergunta', 'Conexão'];
const TONES: Tone[] = ['Profissional', 'Amigável', 'Entusiasmado', 'Formal'];

const TEMPLATE_DESCRIPTIONS: Record<TemplateType, string> = {
  Direta: 'Vai direto ao ponto — ideal quando a vaga está aberta',
  Valor: 'Destaca seu valor e resultados — para impressionar desde o início',
  Pergunta: 'Usa uma pergunta para gerar curiosidade e engajamento',
  Conexão: 'Foca em pontos em comum — ótima para networking',
};

const TONE_DESCRIPTIONS: Record<Tone, string> = {
  Profissional: 'Formal, mas acessível',
  Amigável: 'Descontraído e caloroso',
  Entusiasmado: 'Energia alta, motivado',
  Formal: 'Linguagem corporativa',
};

const TONE_EMOJIS: Record<Tone, string> = {
  Profissional: '💼',
  Amigável: '😊',
  Entusiasmado: '🚀',
  Formal: '🎩',
};

function generateMessage(template: TemplateType, tone: Tone, data: FormData): string {
  const { recruiterName, company, position, myName, myRole, myHighlight } = data;
  const name = recruiterName || 'recruiter';
  const comp = company || 'sua empresa';
  const pos = position || 'a vaga';
  const me = myName || 'meu nome';
  const role = myRole || 'Desenvolvedor Full Stack';
  const highlight = myHighlight || 'reduzi o tempo de carregamento em 40%, aumentando a retenção de usuários';

  if (template === 'Direta') {
    if (tone === 'Profissional') return `Olá, ${name}!\n\nMeu nome é ${me} e sou ${role} com foco em resultados mensuráveis. Notei a oportunidade de ${pos} na ${comp} e acredito que meu perfil tem aderência ao que vocês buscam.\n\nRecentemente, ${highlight}.\n\nGostaria de compartilhar meu portfólio e entender melhor sobre a posição. Você teria 15 minutos esta semana?\n\nAtt,\n${me}`;
    if (tone === 'Amigável') return `Oi, ${name}! Tudo bem?\n\nMe chamo ${me} e sou ${role}. Vi que a ${comp} está com a vaga de ${pos} em aberto e fiquei bem animado!\n\nTenho um histórico de entregas consistentes — ${highlight}.\n\nSeria ótimo conversar mais sobre essa oportunidade. O que acha?\n\n${me} 😊`;
    if (tone === 'Entusiasmado') return `Olá, ${name}!\n\nSou ${me}, ${role}, e fiquei muito empolgado ao ver a vaga de ${pos} na ${comp}! 🚀\n\nAmo o que a ${comp} faz e acredito que posso contribuir muito — ${highlight}.\n\nMal posso esperar para conversar sobre essa oportunidade! Quando teria um tempinho?\n\n${me}`;
    return `Prezado(a) ${name},\n\nSolicito sua atenção para apresentar minha candidatura à posição de ${pos} na ${comp}.\n\nSou ${me}, profissional da área de ${role}, e possuo o seguinte diferencial: ${highlight}.\n\nEstarei à disposição para uma conversa formal sobre a oportunidade.\n\nAtenciosamente,\n${me}`;
  }

  if (template === 'Valor') {
    if (tone === 'Profissional') return `Olá, ${name}!\n\nVi que a ${comp} está crescendo e acredito que posso contribuir diretamente para esse crescimento.\n\nSou ${me}, ${role}, e no meu último projeto ${highlight}. Resultados como esse têm sido minha constante.\n\nSeria uma troca valiosa conversar sobre como posso aplicar isso na posição de ${pos}. Você teria disponibilidade esta semana?\n\n${me}`;
    if (tone === 'Amigável') return `Oi, ${name}!\n\nEstava pesquisando sobre a ${comp} e fiquei impressionado com o que vocês estão construindo.\n\nSou ${me}, ${role}. Uma coisa que me orgulho: ${highlight}. Adoro trabalhar com times que buscam impacto real.\n\nAcho que a vaga de ${pos} seria um fit perfeito. Podemos bater um papo?\n\n${me} 👋`;
    if (tone === 'Entusiasmado') return `${name}, que empresa incrível! 🌟\n\nSou ${me}, ${role}, e estou animadíssimo com o trabalho da ${comp}!\n\nPosso agregar muito à equipe — ${highlight}. Esse tipo de resultado é o que me move!\n\nA vaga de ${pos} parece feita pra mim. Vamos conversar? 🚀\n\n${me}`;
    return `Prezado(a) ${name},\n\nPermita-me apresentar minha candidatura à posição de ${pos} na ${comp}, destacando meu principal diferencial competitivo.\n\nComo ${role}, tenho o seguinte registro de resultados: ${highlight}. Tais realizações demonstram minha capacidade de gerar valor mensurável.\n\nAgradeceria a oportunidade de uma reunião formal.\n\nAtenciosamente,\n${me}`;
  }

  if (template === 'Pergunta') {
    if (tone === 'Profissional') return `Olá, ${name}!\n\nQual é o maior desafio técnico que o time de ${pos} na ${comp} está enfrentando hoje?\n\nPergunto pois sou ${me}, ${role}, e tenho trabalhado exatamente nesse tipo de problema. Por exemplo: ${highlight}.\n\nSeria interessante conversar sobre como posso contribuir.\n\n${me}`;
    if (tone === 'Amigável') return `Oi, ${name}!\n\nFicou curioso: o que você mais valoriza em um candidato para ${pos} na ${comp}?\n\nMe chamo ${me}, sou ${role} e estou sempre buscando entender o que realmente importa para cada empresa. Meu maior resultado recente: ${highlight}.\n\nAdoraria ouvir sua perspectiva!\n\n${me} 😄`;
    if (tone === 'Entusiasmado') return `${name}, uma pergunta rápida! 🤔\n\nO que torna a ${comp} um lugar especial para trabalhar?\n\nSou ${me}, ${role}, e estou apaixonado pela missão de vocês! Meu track record fala por si: ${highlight}.\n\nSeria incrível fazer parte desse time na posição de ${pos}!\n\n${me} ✨`;
    return `Prezado(a) ${name},\n\nPermito-me questionar: quais são as principais competências que a ${comp} prioriza na contratação para ${pos}?\n\nSou ${me}, ${role}, e busco alinhar minha candidatura às expectativas da organização. Meu principal diferencial: ${highlight}.\n\nAguardo seu retorno.\n\nAtenciosamente,\n${me}`;
  }

  if (tone === 'Profissional') return `Olá, ${name}!\n\nNotei que você é recrutador(a) na ${comp}, uma empresa cujo trabalho acompanho com admiração.\n\nSou ${me}, ${role}, com foco em ${highlight}. Gostaria de expandir minha rede com profissionais de RH da área tech.\n\nEspero que possamos manter contato — quem sabe surgem sinergias, como a vaga de ${pos}? 😊\n\n${me}`;
  if (tone === 'Amigável') return `Oi, ${name}! 👋\n\nVi seu perfil e achei bacana conectar com quem trabalha na ${comp}!\n\nSou ${me}, ${role}. Tenho orgulho de ter ${highlight} — resultado de muito trabalho em equipe.\n\nQueria só criar essa conexão por agora. Se rolar alguma vaga como ${pos} no futuro, adoraria ser lembrado(a)!\n\n${me}`;
  if (tone === 'Entusiasmado') return `${name}, que perfil incrível! 🎉\n\nSempre quis conectar com alguém da ${comp} — empresa que admiro muito!\n\nSou ${me}, ${role}, e ${highlight}. Estou sempre em busca de novas conexões e oportunidades.\n\nTeria como conversarmos sobre a vaga de ${pos}? 🚀\n\n${me}`;
  return `Prezado(a) ${name},\n\nSolicito sua conexão com o intuito de ampliar minha rede profissional junto à ${comp}.\n\nSou ${me}, ${role}, com atuação voltada a resultados — ${highlight}.\n\nCaso haja oportunidades como ${pos}, coloco-me à disposição para uma conversa.\n\nAtenciosamente,\n${me}`;
}

export function MessageGeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('Direta');
  const [selectedTone, setSelectedTone] = useState<Tone>('Profissional');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormData>({
    recruiterName: '',
    company: '',
    position: '',
    myName: '',
    myRole: 'Desenvolvedor Full Stack',
    myHighlight: 'reduzi o tempo de carregamento em 40%, aumentando a retenção de usuários em 25%',
  });

  const message = generateMessage(selectedTemplate, selectedTone, form);
  const charCount = message.length;
  const linkedinLimit = 300;
  const isOverLimit = charCount > linkedinLimit;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#cbd5e1',
    fontSize: '0.85rem',
    outline: 'none',
  };

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
              <MessageSquare className="w-5 h-5" style={{ color: '#818cf8' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9' }}>
                Gerador de Mensagens
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 1 }}>
                Crie mensagens personalizadas e de alta conversão para recrutadores
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: controls */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Template Type */}
            <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>
                Tipo de Mensagem
              </h2>
              <div className="flex flex-col gap-2">
                {TEMPLATES.map((tmpl) => {
                  const active = selectedTemplate === tmpl;
                  return (
                    <button
                      key={tmpl}
                      onClick={() => setSelectedTemplate(tmpl)}
                      className="w-full text-left px-4 py-3 rounded-xl transition-all"
                      style={{
                        background: active ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                        border: `2px solid ${active ? 'rgba(99,102,241,0.45)' : '#334155'}`,
                      }}
                    >
                      <div style={{ fontWeight: 700, color: active ? '#a5b4fc' : '#94a3b8', fontSize: '0.875rem' }}>
                        {tmpl}
                      </div>
                      <div style={{ color: active ? '#6366f1' : '#475569', fontSize: '0.775rem', marginTop: 2 }}>
                        {TEMPLATE_DESCRIPTIONS[tmpl]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone */}
            <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>
                Tom de Voz
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((tone) => {
                  const active = selectedTone === tone;
                  return (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className="px-3 py-3 rounded-xl text-sm transition-all text-left"
                      style={{
                        background: active ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                        border: `2px solid ${active ? 'rgba(99,102,241,0.45)' : '#334155'}`,
                      }}
                    >
                      <div style={{ marginBottom: 3 }}>{TONE_EMOJIS[tone]}</div>
                      <div style={{ fontWeight: 700, color: active ? '#a5b4fc' : '#94a3b8', fontSize: '0.85rem' }}>
                        {tone}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: active ? '#6366f1' : '#475569', marginTop: 2 }}>
                        {TONE_DESCRIPTIONS[tone]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personalization fields */}
            <div className="rounded-2xl p-5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>
                Personalização
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { field: 'recruiterName' as const, label: 'Nome do Recrutador', placeholder: 'Ex: Ana Silva' },
                  { field: 'company' as const, label: 'Empresa', placeholder: 'Ex: Google Brasil' },
                  { field: 'position' as const, label: 'Vaga / Posição', placeholder: 'Ex: Senior React Developer' },
                  { field: 'myName' as const, label: 'Seu Nome', placeholder: 'Ex: João Silva' },
                  { field: 'myRole' as const, label: 'Seu Cargo/Área', placeholder: 'Ex: Full Stack Developer' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 5 }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      value={form[field]}
                      onChange={(e) => updateField(field, e.target.value)}
                      placeholder={placeholder}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 5 }}>
                    Seu principal resultado/destaque
                  </label>
                  <textarea
                    value={form.myHighlight}
                    onChange={(e) => updateField('myHighlight', e.target.value)}
                    placeholder="Ex: aumentei a performance em 40% e reduzi bugs em 35%"
                    style={{ ...inputStyle, minHeight: 72, resize: 'none' }}
                    onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: message preview */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-6 sticky top-20"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>
                      Mensagem Gerada
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: '#475569' }}>
                      {selectedTemplate} · {selectedTone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTemplate(TEMPLATES[(TEMPLATES.indexOf(selectedTemplate) + 1) % TEMPLATES.length])}
                    className="p-2 rounded-lg transition-all hover:opacity-70"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #334155' }}
                    title="Próxima variação"
                  >
                    <RefreshCw className="w-4 h-4" style={{ color: '#64748b' }} />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                    style={{ background: copied ? '#059669' : 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copiado!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copiar</>
                    )}
                  </button>
                </div>
              </div>

              {/* Message text */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0f172a',
                  border: `1px solid ${isOverLimit ? 'rgba(244,63,94,0.4)' : '#334155'}`,
                  minHeight: 240,
                  whiteSpace: 'pre-line',
                  color: '#cbd5e1',
                  fontSize: '0.875rem',
                  lineHeight: 1.75,
                }}
              >
                {message}
              </div>

              {/* Char count */}
              <div className="flex items-center justify-between mt-4 gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: isOverLimit ? '#fb7185' : charCount > linkedinLimit * 0.9 ? '#fbbf24' : '#34d399',
                    }}
                  >
                    {charCount}
                  </span>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>/ {linkedinLimit} chars</span>
                  {isOverLimit && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(244,63,94,0.1)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)' }}
                    >
                      Excede o limite
                    </span>
                  )}
                </div>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (charCount / linkedinLimit) * 100)}%`,
                      background: isOverLimit ? '#f43f5e' : charCount > linkedinLimit * 0.9 ? '#f59e0b' : '#10b981',
                    }}
                  />
                </div>
              </div>

              {/* Tips */}
              <div
                className="mt-5 p-4 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p style={{ fontWeight: 700, color: '#34d399', fontSize: '0.8rem', marginBottom: 6 }}>
                      Dicas de alta conversão
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {[
                        'Personalize o nome do recrutador — mensagens personalizadas têm 3x mais resposta',
                        'Envie entre 8h–10h ou 17h–19h para máxima visibilidade',
                        'Faça follow-up após 5 dias se não receber resposta',
                      ].map((tip, i) => (
                        <li key={i} style={{ color: '#6ee7b7', fontSize: '0.8rem', lineHeight: 1.5 }}>
                          · {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upgrade CTA */}
              <div
                className="mt-4 p-4 rounded-xl flex items-center justify-between gap-4"
                style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.45), rgba(76,29,149,0.45))', border: '1px solid rgba(99,102,241,0.25)' }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.875rem' }}>
                      Quer acesso a 20+ templates avançados?
                    </p>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.775rem' }}>
                    Templates com taxa de resposta de até 68%
                  </p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-white whitespace-nowrap transition-all hover:opacity-90 text-sm font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                >
                  Plano Caçador
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
