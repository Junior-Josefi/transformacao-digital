import { ProcessContext, DimensionsState } from '../types';

export const DEMO_HASHES = ['#demo', '#demonstracao', '#demo-cmc', '#apresentacao'];

export const DEMO_PROCESS_CONTEXT: ProcessContext = {
  processName: "Admissão e Autorização de Exames e Procedimentos Especializados",
  responsibleArea: "Central de Relacionamento e Regulação Ambulatorial",
  processObjective: "Garantir o agendamento ágil e a autorização tempestiva de exames e consultas especializadas, eliminando filas físicas na recepção e reduzindo o absenteísmo de pacientes.",
  currentWorkflow: "1. O paciente solicita o agendamento enviando foto do pedido médico por WhatsApp ou presencialmente na recepção.\n2. A atendente consulta a agenda médica no sistema hospitalar (Tasy/MV) e reserva provisoriamente o horário.\n3. Paralelamente, abre o portal da operadora de saúde (TISS) e digita manualmente os dados do paciente e códigos dos procedimentos para solicitar a guia de autorização.\n4. Aguarda retorno do convênio; após autorizada, digita os dados em uma planilha de controle e tenta contato telefônico ou WhatsApp manual com o paciente para confirmar o preparo e a data do exame.",
  mainPainPoint: "Falta de integração entre o sistema hospitalar e os portais de operadoras, exigindo digitação manual repetitiva de guias. Isso gera atraso no tempo de resposta ao paciente (até 48h), sobrecarga da equipe, filas de espera na recepção física e perdas financeiras por glosas de autorizações incorretas.",
  stakeholders: "Central de Atendimento, Recepção Ambulatorial, Faturamento Hospitalar, TI e Médicos Especialistas",
  toolsAndSystems: "Sistema de Gestão Hospitalar (Tasy), Portais Web de Operadoras de Saúde (TISS/TUSS), WhatsApp Web e Planilhas Excel",
  frequencyOrVolume: "~450 solicitações de agendamento e autorizações diárias",
  beneficiaries: "Pacientes ambulatoriais, corpo clínico e setor de faturamento",
  expectedOutcome: "Reduzir o tempo de resposta ao paciente de 48h para menos de 3h, automatizar a validação de guias e enviar lembretes com orientações de preparo automáticas, reduzindo o absenteísmo em 35%.",
  additionalNotes: "A liderança e o corpo clínico apoiam a modernização, mas a equipe operacional está sobrecarregada com retrabalho braçal diário."
};

export const DEMO_DIMENSIONS_STATE: DimensionsState = {
  visao: {
    answers: {
      vis_1: 4, // Acontece na maioria das vezes
      vis_2: 4, // Acontece na maioria das vezes
      vis_3: 3, // Acontece em parte (acompanham volume, mas não satisfação ou tempo total de ciclo)
      vis_4: 3, // Acontece em parte (entendem a necessidade de digitalizar, mas falta desenho claro)
      vis_5: 2  // Acontece raramente (rotina muito reativa a urgências e filas do dia)
    },
    notes: "A equipe tem grande dedicação e empatia pelo paciente, mas a sobrecarga diária com pendências de guias obriga o setor a 'apagar incêndios' em vez de focar em melhorias proativas."
  },
  prioridades: {
    answers: {
      pri_1: 3, // Acontece em parte
      pri_2: 3, // Acontece em parte
      pri_3: 2, // Acontece raramente (equipe relata estresse elevado e carga mental com sistemas múltiplos)
      pri_4: 4, // Acontece na maioria das vezes (dores da ponta são conhecidas)
      pri_5: 2  // Acontece raramente (atritos frequentes com faturamento sobre prazos de guias e glosas)
    },
    notes: "Há desalinhamento histórico entre Atendimento (que quer agilidade no acolhimento) e Faturamento (que exige conferência minuciosa para evitar glosas das operadoras)."
  },
  experimentacao: {
    answers: {
      exp_1: 2, // Acontece raramente (mudanças são quase sempre implantadas de forma ampla e impositiva)
      exp_2: 3, // Acontece em parte
      exp_3: 4, // Acontece na maioria das vezes (bom clima de cooperação interna na equipe)
      exp_4: 2, // Acontece raramente (qualquer alteração de tela ou fluxo depende de chamados demorados à TI)
      exp_5: 3  // Acontece em parte
    },
    notes: "Pequenas ideias e testes simples de melhoria de fluxo demoram semanas para serem viabilizados por dependência de tickets e homologações externas."
  },
  governanca: {
    answers: {
      gov_1: 4, // Acontece na maioria das vezes (papéis e escalas bem definidos)
      gov_2: 2, // Acontece raramente (atendente precisa pedir autorização de supervisor para quase qualquer encaixe ou exceção)
      gov_3: 3, // Acontece em parte
      gov_4: 4, // Acontece na maioria das vezes (liderança de enfermagem e atendimento presente)
      gov_5: 2  // Acontece raramente (ainda se exige impressão física de guias e carimbos para arquivamento)
    },
    notes: "Muitas rotinas burocráticas herdadas (como impressão em papel de guias já digitais) continuam sendo executadas por falta de revisão de normas internas."
  },
  capacidades: {
    answers: {
      cap_1: 1, // Não acontece / Não existe (atendente redigita dados do sistema nos portais de cada convênio)
      cap_2: 3, // Acontece em parte (dados dispersos entre prontuário, WhatsApp e planilhas avulsas)
      cap_3: 3, // Acontece em parte (treinamento inicial existe, mas faltam reciclagens para novos recursos)
      cap_4: 1, // Não acontece / Não existe (confirmações e disparos de preparo são 100% manuais)
      cap_5: 4  // Acontece na maioria das vezes (equipe compartilha dicas operacionais em grupos internos)
    },
    notes: "A falta de integração direta (APIs) entre o sistema de gestão hospitalar e os portais das operadoras é o maior gargalo técnico do processo."
  }
};

