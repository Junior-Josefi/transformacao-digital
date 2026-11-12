import { DimensionDefinition, QuestionOption } from '../types';

export const RESPONSE_OPTIONS: QuestionOption[] = [
  { value: 1, label: "Não acontece / Não existe" },
  { value: 2, label: "Acontece raramente" },
  { value: 3, label: "Acontece em parte" },
  { value: 4, label: "Acontece na maioria das vezes" },
  { value: 5, label: "Acontece de forma consistente" },
  { value: 0, label: "Não sei informar / Não se aplica" }
];

export const DIMENSIONS: DimensionDefinition[] = [
  {
    id: 'visao',
    name: '1. Visão',
    shortDescription: 'Propósito, experiência do paciente e visão de futuro.',
    detailedDescription: 'Avalia a clareza sobre o propósito do processo, a experiência de quem recebe o resultado e a estratégia de evolução.',
    iconName: 'Compass',
    questions: [
      {
        id: 'vis_1',
        text: 'O propósito e o valor deste processo são claros para quem o executa no dia a dia?',
        helpText: 'A equipe sabe o impacto direto do seu trabalho no resultado final.'
      },
      {
        id: 'vis_2',
        text: 'As decisões e melhorias priorizam a experiência de quem recebe o serviço (paciente ou colega)?',
        helpText: 'O foco principal é resolver a necessidade do usuário final.'
      },
      {
        id: 'vis_3',
        text: 'Existem metas claras ou indicadores para acompanhar o desempenho do processo?',
        helpText: 'A equipe dispõe de métricas visíveis de qualidade, prazo ou volume.'
      },
      {
        id: 'vis_4',
        text: 'A equipe tem clareza de como este processo deve funcionar no futuro?',
        helpText: 'Há um direcionamento claro de evolução contínua.'
      },
      {
        id: 'vis_5',
        text: 'A melhoria do processo é planejada proativamente, sem depender apenas de apagar incêndios?',
        helpText: 'Iniciativas são antecipadas com base em dados e oportunidades reais.'
      }
    ]
  },
  {
    id: 'prioridades',
    name: '2. Prioridades',
    shortDescription: 'Foco na dor real antes da adoção de tecnologias.',
    detailedDescription: 'Avalia se os esforços concentram-se nas necessidades mais críticas do negócio e das pessoas, antes de definir ferramentas.',
    iconName: 'Target',
    questions: [
      {
        id: 'pri_1',
        text: 'As iniciativas nascem da compreensão profunda de um problema real antes de buscar novos softwares?',
        helpText: 'Investiga-se a raiz do problema antes de propor ferramentas.'
      },
      {
        id: 'pri_2',
        text: 'Existem critérios claros para definir quais melhorias devem ser feitas primeiro?',
        helpText: 'A ordem das ações segue critérios conhecidos de impacto e viabilidade.'
      },
      {
        id: 'pri_3',
        text: 'As prioridades equilibram eficiência operacional com a qualidade e o bem-estar da equipe?',
        helpText: 'Busca-se eficiência sem sobrecarregar pessoas nem perder a humanização.'
      },
      {
        id: 'pri_4',
        text: 'A opinião de quem executa o processo na ponta é ouvida na escolha das prioridades?',
        helpText: 'As dores do dia a dia influenciam diretamente a pauta de melhorias.'
      },
      {
        id: 'pri_5',
        text: 'As prioridades deste processo estão alinhadas com as demais áreas conectadas a ele?',
        helpText: 'Há sintonia com os setores antecedentes e seguintes.'
      }
    ]
  },
  {
    id: 'experimentacao',
    name: '3. Experimentação',
    shortDescription: 'Testes pequenos, dados reais e aprendizado rápido.',
    detailedDescription: 'Avalia a prática de validar ideias em menor escala antes de grandes investimentos definitivos.',
    iconName: 'FlaskConical',
    questions: [
      {
        id: 'exp_1',
        text: 'Antes de grandes mudanças ou implantações, são feitos testes pilotos em escala reduzida?',
        helpText: 'Valida-se a ideia em um turno, grupo ou setor menor antes de expandir.'
      },
      {
        id: 'exp_2',
        text: 'As decisões sobre ajustar ou manter uma ideia baseiam-se em dados e retorno dos usuários?',
        helpText: 'Evidências práticas guiam as decisões de continuidade.'
      },
      {
        id: 'exp_3',
        text: 'A equipe tem liberdade para propor testes e encara tentativas frustradas como aprendizado?',
        helpText: 'O ambiente encoraja iniciativas sem punição a erros de experimentação.'
      },
      {
        id: 'exp_4',
        text: 'O processo consegue testar pequenas melhorias contínuas com agilidade?',
        helpText: 'Ajustes pontuais podem ser aplicados sem depender de projetos burocráticos.'
      },
      {
        id: 'exp_5',
        text: 'Quando uma solução em teste não funciona, há facilidade para mudar de rota?',
        helpText: 'A equipe encerra o que não gerou valor sem apego desnecessário.'
      }
    ]
  },
  {
    id: 'governanca',
    name: '4. Governança',
    shortDescription: 'Decisão ágil, papéis claros e eliminação de burocracias.',
    detailedDescription: 'Avalia a agilidade na tomada de decisão, divisão clara de responsabilidades e eliminação de gargalos desnecessários.',
    iconName: 'ShieldCheck',
    questions: [
      {
        id: 'gov_1',
        text: 'Estão claros os papéis: quem executa, quem aprova e quem decide mudanças no processo?',
        helpText: 'Não há dúvidas de responsabilidade ou omissões operacionais.'
      },
      {
        id: 'gov_2',
        text: 'A equipe operacional tem autonomia para resolver gargalos imediatos sem aprovações demoradas?',
        helpText: 'Decisões do dia a dia têm fluidez dentro dos limites definidos.'
      },
      {
        id: 'gov_3',
        text: 'A cooperação com outras áreas (ex: TI, Recepção, Enfermagem) acontece de forma fluida?',
        helpText: 'Setores interdependentes colaboram sem criar barreiras.'
      },
      {
        id: 'gov_4',
        text: 'A liderança acompanha o processo de forma próxima e ajuda a remover impedimentos?',
        helpText: 'Gestores facilitam recursos e apoiam a resolução de entraves.'
      },
      {
        id: 'gov_5',
        text: 'Há facilidade para eliminar etapas, formulários ou rotinas que não agregam valor?',
        helpText: 'A organização simplifica rotinas antigas que ficaram obsoletas.'
      }
    ]
  },
  {
    id: 'capacidades',
    name: '5. Capacidades',
    shortDescription: 'Sistemas integrados, dados confiáveis e equipe capacitada.',
    detailedDescription: 'Avalia se ferramentas, dados, treinamento e colaboração dão suporte contínuo à evolução do processo.',
    iconName: 'Cpu',
    questions: [
      {
        id: 'cap_1',
        text: 'Os sistemas do processo são integrados, evitando digitação manual duplicada?',
        helpText: 'Dados de uma etapa alimentam diretamente a etapa seguinte.'
      },
      {
        id: 'cap_2',
        text: 'As informações necessárias para executar e monitorar o processo são fáceis de acessar e confiáveis?',
        helpText: 'Não é necessário caçar dados em planilhas dispersas ou anotações avulsas.'
      },
      {
        id: 'cap_3',
        text: 'A equipe recebe treinamento prático e contínuo para utilizar as ferramentas digitais?',
        helpText: 'Capacitações apoiam a rotina e as atualizações de sistemas.'
      },
      {
        id: 'cap_4',
        text: 'Tarefas repetitivas e mecânicas são progressivamente automatizadas?',
        helpText: 'Reduz-se o esforço braçal para focar no atendimento e análise.'
      },
      {
        id: 'cap_5',
        text: 'Existe incentivo prático para a troca de conhecimentos e sugestões de melhoria?',
        helpText: 'O conhecimento do processo é documentado e compartilhado com todos.'
      }
    ]
  }
];

export const INITIAL_CONTEXT = {
  processName: '',
  responsibleArea: '',
  processObjective: '',
  currentWorkflow: '',
  mainPainPoint: '',
  stakeholders: '',
  toolsAndSystems: '',
  frequencyOrVolume: '',
  beneficiaries: '',
  expectedOutcome: '',
  additionalNotes: '',
};

export const INITIAL_DIMENSIONS: Record<string, { answers: Record<string, number>; notes: string }> = {
  visao: { answers: {}, notes: '' },
  prioridades: { answers: {}, notes: '' },
  experimentacao: { answers: {}, notes: '' },
  governanca: { answers: {}, notes: '' },
  capacidades: { answers: {}, notes: '' },
};
