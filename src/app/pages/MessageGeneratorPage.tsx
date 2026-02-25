import { useState } from 'react';
import { Copy, Check, RefreshCw, MessageSquare, Zap } from 'lucide-react';
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
  Profissional: 'Formal, mas acessível. Tom equilibrado.',
  Amigável: 'Descontraído e caloroso. Próximo e humano.',
  Entusiasmado: 'Energia alta. Transmite paixão e motivação.',
  Formal: 'Estruturado e respeitoso. Linguagem corporativa.',
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
    if (tone === 'Profissional') {
      return `Olá, ${name}!\n\nMeu nome é ${me} e sou ${role} com foco em resultados mensuráveis. Notei a oportunidade de ${pos} na ${comp} e acredito que meu perfil tem aderência ao que vocês buscam.\n\nRecentemente, ${highlight}.\n\nGostaria de compartilhar meu portfólio e entender melhor sobre a posição. Você teria 15 minutos esta semana?\n\nAtt,\n${me}`;
    }
    if (tone === 'Amigável') {
      return `Oi, ${name}! Tudo bem?\n\nMe chamo ${me} e sou ${role}. Vi que a ${comp} está com a vaga de ${pos} em aberto e fiquei bem animado!\n\nTenho um histórico de entregas consistentes — ${highlight}.\n\nSeria ótimo conversar mais sobre essa oportunidade. O que acha?\n\n${me} 😊`;
    }
    if (tone === 'Entusiasmado') {
      return `Olá, ${name}!\n\nSou ${me}, ${role}, e fiquei muito empolgado ao ver a vaga de ${pos} na ${comp}! 🚀\n\nAmo o que a ${comp} faz e acredito que posso contribuir muito — ${highlight}.\n\nMal posso esperar para conversar sobre essa oportunidade! Quando teria um tempinho?\n\n${me}`;
    }
    return `Prezado(a) ${name},\n\nSolicito sua atenção para apresentar minha candidatura à posição de ${pos} na ${comp}.\n\nSou ${me}, profissional da área de ${role}, e possuo o seguinte diferencial: ${highlight}.\n\nEstarei à disposição para uma conversa formal sobre a oportunidade.\n\nAtenciosamente,\n${me}`;
  }

  if (template === 'Valor') {
    if (tone === 'Profissional') {
      return `Olá, ${name}!\n\nVi que a ${comp} está crescendo e acredito que posso contribuir diretamente para esse crescimento.\n\nSou ${me}, ${role}, e no meu último projeto ${highlight}. Resultados como esse têm sido minha constante.\n\nSeria uma troca valiosa conversar sobre como posso aplicar isso na posição de ${pos}. Você teria disponibilidade esta semana?\n\n${me}`;
    }
    if (tone === 'Amigável') {
      return `Oi, ${name}!\n\nEstava pesquisando sobre a ${comp} e fiquei impressionado com o que vocês estão construindo.\n\nSou ${me}, ${role}. Uma coisa que me orgulho: ${highlight}. Adoro trabalhar com times que buscam impacto real.\n\nAcho que a vaga de ${pos} seria um fit perfeito. Podemos bater um papo?\n\n${me} 👋`;
    }
    if (tone === 'Entusiasmado') {
      return `${name}, que empresa incrível! 🌟\n\nSou ${me}, ${role}, e estou animadíssimo com o trabalho da ${comp}!\n\nPosso agregar muito à equipe — ${highlight}. Esse tipo de resultado é o que me move!\n\nA vaga de ${pos} parece feita pra mim. Vamos conversar? 🚀\n\n${me}`;
    }
    return `Prezado(a) ${name},\n\nPermita-me apresentar minha candidatura à posição de ${pos} na ${comp}, destacando meu principal diferencial competitivo.\n\nComo ${role}, tenho o seguinte registro de resultados: ${highlight}. Tais realizações demonstram minha capacidade de gerar valor mensurável.\n\nAgradeceria a oportunidade de uma reunião formal.\n\nAtenciosamente,\n${me}`;
  }

  if (template === 'Pergunta') {
    if (tone === 'Profissional') {
      return `Olá, ${name}!\n\nQual é o maior desafio técnico que o time de ${pos} na ${comp} está enfrentando hoje?\n\nPergunto pois sou ${me}, ${role}, e tenho trabalhado exatamente nesse tipo de problema. Por exemplo: ${highlight}.\n\nSeria interessante conversar sobre como posso contribuir.\n\n${me}`;
    }
    if (tone === 'Amigável') {
      return `Oi, ${name}!\n\nFicou curioso: o que você mais valoriza em um candidato para ${pos} na ${comp}?\n\nMe chamo ${me}, sou ${role} e estou sempre buscando entender o que realmente importa para cada empresa. Meu maior resultado recente: ${highlight}.\n\nAdoraria ouvir sua perspectiva!\n\n${me} 😄`;
    }
    if (tone === 'Entusiasmado') {
      return `${name}, uma pergunta rápida! 🤔\n\nO que torna a ${comp} um lugar especial para trabalhar?\n\nSou ${me}, ${role}, e estou apaixonado pela missão de vocês! Meu track record fala por si: ${highlight}.\n\nSeria incrível fazer parte desse time na posição de ${pos}!\n\n${me} ✨`;
    }
    return `Prezado(a) ${name},\n\nPermito-me questionar: quais são as principais competências que a ${comp} prioriza na contratação para ${pos}?\n\nSou ${me}, ${role}, e busco alinhar minha candidatura às expectativas da organização. Meu principal diferencial: ${highlight}.\n\nAguardo seu retorno.\n\nAtenciosamente,\n${me}`;
  }

  // Conexão
  if (tone === 'Profissional') {
    return `Olá, ${name}!\n\nNotei que você é recrutador(a) na ${comp}, uma empresa cujo trabalho acompanho com admiração.\n\nSou ${me}, ${role}, com foco em ${highlight}. Gostaria de expandir minha rede com profissionais de RH da área tech.\n\nEspero que possamos manter contato — quem sabe surgem sinergias, como a vaga de ${pos}? 😊\n\n${me}`;
  }
  if (tone === 'Amigável') {
    return `Oi, ${name}! 👋\n\nVi seu perfil e achei bacana conectar com quem trabalha na ${comp}!\n\nSou ${me}, ${role}. Tenho orgulho de ter ${highlight} — resultado de muito trabalho em equipe.\n\nQueria só criar essa conexão por agora. Se rolar alguma vaga como ${pos} no futuro, adoraria ser lembrado(a)!\n\n${me}`;
  }
  if (tone === 'Entusiasmado') {
    return `${name}, que perfil incrível! 🎉\n\nSempre quis conectar com alguém da ${comp} — empresa que admiro muito!\n\nSou ${me}, ${role}, e ${highlight}. Estou sempre em busca de novas conexões e oportunidades.\n\nTeria como conversarmos sobre a vaga de ${pos}? 🚀\n\n${me}`;
  }
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

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Gerador de Mensagens
          </h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>
            Crie mensagens personalizadas e de alta conversão para recrutadores
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Type */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                Tipo de Mensagem
              </h2>
              <div className="space-y-2">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl}
                    onClick={() => setSelectedTemplate(tmpl)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: selectedTemplate === tmpl ? '#eff6ff' : 'transparent',
                      border: `2px solid ${selectedTemplate === tmpl ? '#3b82f6' : '#f1f5f9'}`,
                    }}
                  >
                    <div style={{ fontWeight: 700, color: selectedTemplate === tmpl ? '#1d4ed8' : '#374151', fontSize: '0.9rem' }}>
                      {tmpl}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.775rem', marginTop: 2 }}>
                      {TEMPLATE_DESCRIPTIONS[tmpl]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                Tom de Voz
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className="px-3 py-2.5 rounded-xl text-sm transition-all"
                    style={{
                      background: selectedTone === tone ? '#eff6ff' : '#f8fafc',
                      border: `2px solid ${selectedTone === tone ? '#3b82f6' : '#e2e8f0'}`,
                      color: selectedTone === tone ? '#1d4ed8' : '#374151',
                      fontWeight: selectedTone === tone ? 700 : 400,
                    }}
                  >
                    <div>{tone}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>
                      {TONE_DESCRIPTIONS[tone].split('.')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization fields */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                Personalização
              </h2>
              <div className="space-y-3">
                {[
                  { field: 'recruiterName' as const, label: 'Nome do Recrutador', placeholder: 'Ex: Ana Silva' },
                  { field: 'company' as const, label: 'Empresa', placeholder: 'Ex: Google Brasil' },
                  { field: 'position' as const, label: 'Vaga / Posição', placeholder: 'Ex: Senior React Developer' },
                  { field: 'myName' as const, label: 'Seu Nome', placeholder: 'Ex: João Silva' },
                  { field: 'myRole' as const, label: 'Seu Cargo/Área', placeholder: 'Ex: Full Stack Developer' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      value={form[field]}
                      onChange={(e) => updateField(field, e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ border: '1px solid #e2e8f0', background: '#f8fafc', color: '#374151' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>
                    Seu principal resultado/destaque
                  </label>
                  <textarea
                    value={form.myHighlight}
                    onChange={(e) => updateField('myHighlight', e.target.value)}
                    placeholder="Ex: aumentei a performance em 40% e reduzir bugs em 35%"
                    className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    style={{ border: '1px solid #e2e8f0', background: '#f8fafc', color: '#374151', minHeight: 72 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: message preview */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-6 sticky top-20" style={{ border: '1px solid #e2e8f0' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      Mensagem Gerada
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {selectedTemplate} · {selectedTone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTemplate(TEMPLATES[(TEMPLATES.indexOf(selectedTemplate) + 1) % TEMPLATES.length])}
                    className="p-2 rounded-lg transition-all hover:bg-gray-100"
                    title="Gerar variação"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm transition-all hover:opacity-90"
                    style={{ background: copied ? '#16a34a' : 'linear-gradient(135deg, #2563eb, #7c3aed)', fontWeight: 700 }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Message text */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#f8fafc',
                  border: `2px solid ${isOverLimit ? '#fca5a5' : '#e2e8f0'}`,
                  minHeight: 280,
                  whiteSpace: 'pre-line',
                  color: '#374151',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                }}
              >
                {message}
              </div>

              {/* Char count */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4">
                  <div>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: isOverLimit ? '#dc2626' : charCount > linkedinLimit * 0.9 ? '#d97706' : '#22c55e',
                      }}
                    >
                      {charCount}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}> / {linkedinLimit} caracteres</span>
                  </div>
                  {isOverLimit && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: '#fef2f2', color: '#dc2626', fontWeight: 600 }}
                    >
                      Excede o limite do LinkedIn
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex-1 ml-4 h-1.5 rounded-full" style={{ background: '#e2e8f0' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (charCount / linkedinLimit) * 100)}%`,
                      background: isOverLimit ? '#ef4444' : charCount > linkedinLimit * 0.9 ? '#f59e0b' : '#22c55e',
                    }}
                  />
                </div>
              </div>

              {/* Tips */}
              <div
                className="mt-4 p-4 rounded-xl"
                style={{ background: '#f0fdf4', border: '1px solid #86efac' }}
              >
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p style={{ fontWeight: 700, color: '#15803d', fontSize: '0.8rem', marginBottom: 4 }}>
                      Dicas de alta conversão
                    </p>
                    <ul className="space-y-1">
                      {[
                        'Personalize o nome do recrutador — mensagens personalizadas têm 3x mais resposta',
                        'Envie entre 8h–10h ou 17h–19h para máxima visibilidade',
                        'Faça follow-up após 5 dias se não receber resposta',
                      ].map((tip, i) => (
                        <li key={i} style={{ color: '#166534', fontSize: '0.8rem' }}>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upgrade CTA */}
              <div
                className="mt-4 p-4 rounded-xl flex items-center justify-between gap-4"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', border: '1px solid rgba(99,102,241,0.3)' }}
              >
                <div>
                  <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.875rem' }}>
                    Quer acesso a 20+ templates avançados?
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.775rem' }}>
                    Templates com taxa de resposta de até 68%
                  </p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-white whitespace-nowrap transition-all hover:opacity-90 text-sm"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', fontWeight: 700, flexShrink: 0 }}
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
