import { DIMENSIONS, RESPONSE_OPTIONS } from '../data/dimensionsData';
import { ProcessContext, DimensionsState, DimensionId } from '../types';

export function sanitizeFileName(name: string): string {
  const clean = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return clean || 'processo';
}

export function generatePromptInstruction(context: ProcessContext, dimensions: DimensionsState): string {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Calculate factual synthesis
  const strongPractices: Array<{ dimName: string; qText: string; optLabel: string }> = [];
  const criticalDifficulties: Array<{ dimName: string; qText: string; optLabel: string }> = [];
  const unknownOrNA: Array<{ dimName: string; qText: string }> = [];

  DIMENSIONS.forEach(dim => {
    const dimState = dimensions[dim.id as DimensionId];
    dim.questions.forEach(q => {
      const val = dimState?.answers?.[q.id];
      if (val !== undefined) {
        const opt = RESPONSE_OPTIONS.find(o => o.value === val);
        const optLabel = opt ? opt.label : `Opção ${val}`;

        if (val === 0) {
          unknownOrNA.push({ dimName: dim.name, qText: q.text });
        } else if (val >= 4) {
          strongPractices.push({ dimName: dim.name, qText: q.text, optLabel });
        } else if (val <= 2) {
          criticalDifficulties.push({ dimName: dim.name, qText: q.text, optLabel });
        }
      }
    });
  });

  let text = '';

  // Prompt Directive at the top for immediate AI execution
  text += `================================================================================\n`;
  text += `INSTRUÇÃO DE CONSULTORIA E GERAÇÃO DIRETA DE PDF (RELATÓRIO EXECUTIVO ENXUTO)\n`;
  text += `================================================================================\n\n`;
  text += `ATENÇÃO IA (ChatGPT, Claude ou Gemini):\n`;
  text += `1. Leia as informações do processo e as respostas do diagnóstico abaixo.\n`;
  text += `2. DIRETRIZ DE TAMANHO E FOCO: O usuário precisa de um relatório CONCISO e DIRETO AO PONTO. Seja EXTREMAMENTE SUCINTO na introdução, contextualização e diagnóstico do processo (evite textos longos, parágrafos teóricos ou floreios). O FOCO PRINCIPAL E CENTRAL do documento DEVE SER O PLANO DE AÇÃO DETALHADO (tabela de ações).\n`;
  text += `3. AO FINAL DA RESPOSTA, GERE E DISPONIBILIZE DIRETAMENTE UM ARQUIVO PDF FORMATADO PARA DOWNLOAD (no ChatGPT, execute via Python/Code Interpreter para entregar o link do PDF; no Claude ou outros, forneça o documento pronto e estilizado para salvar/imprimir como PDF). O PDF deve ser enxuto, profissional e executivo (idealmente 2 a 3 páginas no total), com destaque para o Plano de Ação.\n\n`;
  text += `--------------------------------------------------------------------------------\n\n`;

  text += `# Diagnóstico de Transformação Digital de Processos\n\n`;
  text += `*Data:* ${today}\n`;
  text += `*Organização:* Centro Médico Curitiba • Adventist Health\n`;
  text += `*Processo:* ${context.processName || 'Não informado'}\n`;
  text += `*Área:* ${context.responsibleArea || 'Não informada'}\n\n`;

  // 1. Contexto Sucinto do Processo
  text += `## 1. Contexto do Processo\n\n`;
  text += `- **Objetivo principal:** ${context.processObjective || 'Não informado'}\n`;
  text += `- **Como funciona hoje (resumo):** ${context.currentWorkflow ? context.currentWorkflow.replace(/\n/g, ' ') : 'Não detalhado'}\n`;
  text += `- **Principal dor/gargalo:** ${context.mainPainPoint ? context.mainPainPoint.replace(/\n/g, ' ') : 'Não detalhado'}\n`;

  if (context.stakeholders) {
    text += `- **Áreas/Envolvidos:** ${context.stakeholders}\n`;
  }
  if (context.toolsAndSystems) {
    text += `- **Sistemas e ferramentas:** ${context.toolsAndSystems}\n`;
  }
  if (context.frequencyOrVolume) {
    text += `- **Volume estimado:** ${context.frequencyOrVolume}\n`;
  }
  if (context.expectedOutcome) {
    text += `- **Resultado esperado:** ${context.expectedOutcome}\n`;
  }
  text += `\n`;

  // 2. Respostas das 5 Dimensões
  text += `## 2. Respostas das 5 Dimensões (David L. Rogers)\n\n`;

  DIMENSIONS.forEach(dim => {
    const dimState = dimensions[dim.id as DimensionId];
    text += `### Dimensão ${dim.name}\n`;

    dim.questions.forEach((q, idx) => {
      const val = dimState?.answers?.[q.id];
      const opt = RESPONSE_OPTIONS.find(o => o.value === val);
      const answerText = opt ? opt.label : 'Não respondida';

      text += `- ${idx + 1}. ${q.text} → **${answerText}**\n`;
    });

    if (dimState?.notes && dimState.notes.trim()) {
      text += `  *Obs:* ${dimState.notes.trim()}\n`;
    }
    text += `\n`;
  });

  // 3. Síntese Factual Rápida
  text += `## 3. Síntese Rápida dos Pontos Notáveis\n\n`;
  text += `**Práticas Consolidadas:**\n`;
  if (strongPractices.length > 0) {
    strongPractices.forEach(p => {
      text += `- [${p.dimName}] ${p.qText} (${p.optLabel})\n`;
    });
  } else {
    text += `- Nenhuma prática assinalada com consistência alta no momento.\n`;
  }

  text += `\n**Gargalos e Pontos de Atenção:**\n`;
  if (criticalDifficulties.length > 0) {
    criticalDifficulties.forEach(d => {
      text += `- [${d.dimName}] ${d.qText} (${d.optLabel})\n`;
    });
  } else {
    text += `- Nenhum gargalo crítico assinalado.\n`;
  }
  text += `\n`;

  // 4. Instruções de Estrutura do Relatório e PDF (Foco no Plano de Ação)
  text += `## 4. Estrutura do Relatório e do PDF (Máxima Objetividade e Foco no Plano de Ação)\n\n`;
  text += `Gere a resposta e o arquivo PDF estruturado estritamente nas 3 partes abaixo, garantindo um documento enxuto de 2 a 3 páginas:\n\n`;

  text += `### PARTE 1: Resumo Executivo e Diagnóstico Sintético (MÁXIMO 1 PÁGINA)\n`;
  text += `- **Visão Geral em 1 parágrafo:** Descrição objetiva do processo, seu propósito e o público atendido.\n`;
  text += `- **3 Principais Gargalos:** Em bullet points curtos, os entraves de maior impacto identificados no diagnóstico.\n`;
  text += `- **3 Pontos Fortes:** O que já funciona e deve ser preservado/alavancado.\n\n`;

  text += `### PARTE 2: Plano de Ação Recomendado (FOCO PRINCIPAL - ELEMENTO CENTRAL DO DOCUMENTO)\n`;
  text += `Apresente a tabela detalhada e completa de ações de transformação, dividida em três horizontes temporais:\n`;
  text += `1. **Curto Prazo (Quick Wins):** Melhorias viáveis de baixo custo e rápido aprendizado (1 a 3 meses).\n`;
  text += `2. **Médio Prazo:** Otimizações de processo, integrações e padronizações (3 a 6 meses).\n`;
  text += `3. **Longo Prazo:** Mudanças estruturais e evoluções mais amplas (6 a 12 meses).\n\n`;
  text += `Para cada ação na tabela, preencha obrigatoriamente:\n`;
  text += `| Prioridade | Ação Recomendada | Problema/Oportunidade Relacionada | Resultado Esperado | Responsável Sugerido (papel/área) | Complexidade (Baixa/Média/Alta) | Impacto (Baixo/Médio/Alto) | Prazo Sugerido | Cuidados / Dependências |\n\n`;

  text += `### PARTE 3: Indicadores e Próximo Passo (CURTO E PRÁTICO)\n`;
  text += `- **3 Indicadores de Acompanhamento (KPIs):** Em formato de tabela simples (Indicador, O que mede, Meta proposta inicial a validar).\n`;
  text += `- **Próximo Passo Imediato:** A primeira ação simples e prática para a equipe colocar em marcha na próxima semana.\n\n`;

  text += `### 📄 GERAÇÃO OBRIGATÓRIA DO ARQUIVO PDF:\n`;
  text += `Gere o arquivo PDF formatado com base nas 3 partes acima, aplicando layout limpo (identidade Centro Médico Curitiba), sem textos redundantes ou páginas vazias, garantindo que a Tabela do Plano de Ação seja o grande destaque visual do documento. Forneça o link de download direto ao final da sua resposta.`;

  return text;
}
