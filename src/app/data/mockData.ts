export interface Problem {
  severity: 'critical' | 'warning';
  title: string;
  description: string;
}

export interface ActionItem {
  priority: number;
  impact: 'high' | 'medium' | 'low';
  title: string;
  before: string;
  after: string;
}

export interface ProfileAnalysis {
  name: string;
  headline: string;
  location: string;
  score: number;
  atsScore: number;
  problems: Problem[];
  opportunities: string[];
  strengths: string[];
  keywords: { present: string[]; missing: string[] };
  sections: { [key: string]: number };
  actionPlan: ActionItem[];
}

export const mockProfileData: ProfileAnalysis = {
  name: 'João Silva',
  headline: 'Desenvolvedor Full Stack | React | Node.js | TypeScript',
  location: 'São Paulo, SP',
  score: 72,
  atsScore: 65,
  problems: [
    {
      severity: 'critical',
      title: 'Foto de perfil ausente ou inadequada',
      description: 'Perfis com foto recebem 21x mais visualizações pelos recrutadores.',
    },
    {
      severity: 'critical',
      title: 'Resumo (About) muito curto',
      description:
        'Seu resumo tem apenas 87 palavras. Recomendamos entre 200–300 palavras para máxima visibilidade.',
    },
    {
      severity: 'warning',
      title: 'Experiências sem métricas quantificáveis',
      description:
        'Adicione números e resultados concretos às suas descrições de experiência.',
    },
    {
      severity: 'warning',
      title: 'Apenas 3 recomendações recebidas',
      description:
        'Perfis com 5+ recomendações têm 4x mais chance de aparecer nas buscas de recrutadores.',
    },
  ],
  opportunities: [
    'Adicionar certificações relevantes (AWS, Google Cloud, Azure)',
    'Expandir seção de projetos com links para GitHub/portfólio',
    'Incluir conquistas quantificáveis em todas as experiências',
    'Adicionar publicações ou artigos relacionados à área tech',
    'Aumentar frequência de postagens para incrementar visibilidade no feed',
  ],
  strengths: [
    'Título otimizado com palavras-chave relevantes',
    'Rede de conexões ativa (500+ conexões)',
    'Skills técnicas bem estruturadas e listadas',
    'Formação acadêmica completa e detalhada',
  ],
  keywords: {
    present: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'SQL', 'REST API', 'Git', 'HTML', 'CSS'],
    missing: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Agile', 'Scrum', 'Redis', 'MongoDB'],
  },
  sections: {
    Título: 85,
    Resumo: 40,
    Experiência: 70,
    Educação: 90,
    Skills: 75,
    Recomendações: 30,
  },
  actionPlan: [
    {
      priority: 1,
      impact: 'high',
      title: 'Reescreva seu resumo (About)',
      before:
        'Desenvolvedor apaixonado por tecnologia com experiência em diversas linguagens de programação. Gosto de trabalhar em equipe e resolver problemas complexos.',
      after:
        'Full Stack Developer com 5+ anos criando aplicações escaláveis para empresas SaaS. Especialista em React e Node.js, reduzi o tempo de carregamento em 40% no último projeto, aumentando retenção em 25%. Aberto a oportunidades desafiadoras em produto.',
    },
    {
      priority: 2,
      impact: 'high',
      title: 'Adicione métricas nas experiências',
      before: 'Desenvolvi features para o produto principal da empresa e participei de reuniões de planejamento.',
      after:
        'Desenvolvi 12 features críticas para o produto principal, reduzindo bugs em 35% e aumentando o NPS de 6.2 para 8.4 em 6 meses.',
    },
    {
      priority: 3,
      impact: 'medium',
      title: 'Inclua certificações técnicas',
      before: 'Nenhuma certificação listada no perfil atual.',
      after:
        'AWS Certified Developer Associate | Google Professional Cloud Developer | Meta React Developer Certificate',
    },
    {
      priority: 4,
      impact: 'medium',
      title: 'Atualize seu banner/capa do perfil',
      before: 'Banner padrão azul do LinkedIn sem personalização.',
      after:
        'Banner personalizado com sua especialização, tecnologias principais e informações de contato profissional.',
    },
    {
      priority: 5,
      impact: 'low',
      title: 'Solicite mais recomendações estratégicas',
      before: '3 recomendações genéricas de colegas sem contexto específico.',
      after:
        '5+ recomendações específicas de gestores e líderes técnicos mencionando projetos e impactos concretos.',
    },
  ],
};

export const radarData = [
  { subject: 'Título', score: 85, fullMark: 100 },
  { subject: 'Resumo', score: 40, fullMark: 100 },
  { subject: 'Experiência', score: 70, fullMark: 100 },
  { subject: 'Educação', score: 90, fullMark: 100 },
  { subject: 'Skills', score: 75, fullMark: 100 },
  { subject: 'Recomend.', score: 30, fullMark: 100 },
];
