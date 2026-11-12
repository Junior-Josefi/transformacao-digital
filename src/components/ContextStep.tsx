import React, { useState } from 'react';
import { ProcessContext } from '../types';
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';

interface ContextStepProps {
  context: ProcessContext;
  onChange: (updated: Partial<ProcessContext>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContextStep: React.FC<ContextStepProps> = ({
  context,
  onChange,
  onNext,
  onBack
}) => {
  const [showOptional, setShowOptional] = useState<boolean>(
    Boolean(
      context.stakeholders ||
      context.toolsAndSystems ||
      context.frequencyOrVolume ||
      context.beneficiaries ||
      context.expectedOutcome ||
      context.additionalNotes
    )
  );
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);

  const errors: Record<string, string> = {};
  if (!context.processName?.trim()) errors.processName = 'Informe o nome do processo.';
  if (!context.responsibleArea?.trim()) errors.responsibleArea = 'Informe a área responsável.';
  if (!context.processObjective?.trim()) errors.processObjective = 'Informe o objetivo principal.';
  if (!context.currentWorkflow?.trim()) errors.currentWorkflow = 'Descreva resumidamente como o processo funciona hoje.';
  if (!context.mainPainPoint?.trim()) errors.mainPainPoint = 'Descreva a principal dificuldade enfrentada.';

  const isValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    setAttemptedSubmit(true);
    if (isValid) {
      onNext();
    } else {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Step Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-adventist-blue">Contexto do Processo</h2>
            <p className="text-xs text-slate-500 font-subheading mt-0.5">
              Identifique o processo e as principais dores atuais
            </p>
          </div>
        </div>

        {attemptedSubmit && !isValid && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-800 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-adventist-earthRed shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Por favor, preencha todos os campos obrigatórios assinalados abaixo.</p>
              <p className="text-xs text-red-600 mt-0.5">Essas informações são cruciais para que a IA compreenda o processo real.</p>
            </div>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
          {/* Required Fields Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 1. Nome do Processo */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="processName" className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                  <span>Nome do Processo</span>
                  <span className="text-adventist-earthRed">*</span>
                </label>
                <span className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-adventist-blue-50 text-adventist-blue">
                  Obrigatório
                </span>
              </div>
              <input
                id="processName"
                type="text"
                value={context.processName}
                onChange={(e) => onChange({ processName: e.target.value })}
                placeholder="Ex: Agendamento e Recepção de Consultas"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan ${
                  attemptedSubmit && errors.processName ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                }`}
              />
              {attemptedSubmit && errors.processName && (
                <p className="mt-1 text-xs text-red-600">{errors.processName}</p>
              )}
            </div>

            {/* 2. Área Responsável */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="responsibleArea" className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                  <span>Área ou Setor Responsável</span>
                  <span className="text-adventist-earthRed">*</span>
                </label>
                <span className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-adventist-blue-50 text-adventist-blue">
                  Obrigatório
                </span>
              </div>
              <input
                id="responsibleArea"
                type="text"
                value={context.responsibleArea}
                onChange={(e) => onChange({ responsibleArea: e.target.value })}
                placeholder="Ex: Central de Atendimento / Recepção"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan ${
                  attemptedSubmit && errors.responsibleArea ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                }`}
              />
              {attemptedSubmit && errors.responsibleArea && (
                <p className="mt-1 text-xs text-red-600">{errors.responsibleArea}</p>
              )}
            </div>
          </div>

          {/* 3. Objetivo do Processo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="processObjective" className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                <span>Objetivo Principal do Processo</span>
                <span className="text-adventist-earthRed">*</span>
              </label>
              <span className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-adventist-blue-50 text-adventist-blue">
                Obrigatório
              </span>
            </div>
            <input
              id="processObjective"
              type="text"
              value={context.processObjective}
              onChange={(e) => onChange({ processObjective: e.target.value })}
              placeholder="Ex: Assegurar agendamento rápido com confirmação automatizada e recepção acolhedora sem filas."
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan ${
                attemptedSubmit && errors.processObjective ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
              }`}
            />
            {attemptedSubmit && errors.processObjective && (
              <p className="mt-1 text-xs text-red-600">{errors.processObjective}</p>
            )}
          </div>

          {/* 4. Como funciona atualmente */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="currentWorkflow" className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                <span>Como funciona atualmente (principais etapas)</span>
                <span className="text-adventist-earthRed">*</span>
              </label>
              <span className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-adventist-blue-50 text-adventist-blue">
                Obrigatório
              </span>
            </div>
            <textarea
              id="currentWorkflow"
              rows={4}
              value={context.currentWorkflow}
              onChange={(e) => onChange({ currentWorkflow: e.target.value })}
              placeholder="Descreva resumidamente as etapas desde o início até a conclusão. Ex: O paciente envia mensagem no WhatsApp; o atendente consulta a agenda no prontuário eletrônico; anota dados em planilha temporária; envia confirmação manual..."
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm leading-relaxed transition-colors focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan ${
                attemptedSubmit && errors.currentWorkflow ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
              }`}
            />
            {attemptedSubmit && errors.currentWorkflow && (
              <p className="mt-1 text-xs text-red-600">{errors.currentWorkflow}</p>
            )}
          </div>

          {/* 5. Principal Dificuldade */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="mainPainPoint" className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                <span>Principal Dificuldade ou Gargalo Hoje</span>
                <span className="text-adventist-earthRed">*</span>
              </label>
              <span className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-adventist-blue-50 text-adventist-blue">
                Obrigatório
              </span>
            </div>
            <textarea
              id="mainPainPoint"
              rows={3}
              value={context.mainPainPoint}
              onChange={(e) => onChange({ mainPainPoint: e.target.value })}
              placeholder="O que mais prejudica ou desacelera esse processo hoje? Ex: Retrabalho com digitação manual de dados em mais de um sistema, tempo longo de espera do paciente e falta de confirmações automáticas."
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm leading-relaxed transition-colors focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan ${
                attemptedSubmit && errors.mainPainPoint ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
              }`}
            />
            {attemptedSubmit && errors.mainPainPoint && (
              <p className="mt-1 text-xs text-red-600">{errors.mainPainPoint}</p>
            )}
          </div>

          {/* Optional Fields Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mt-6 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-100/70 transition"
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-adventist-cyan" />
                <span className="text-sm font-semibold text-adventist-blue">
                  Informações Adicionais de Contexto (Opcionais)
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <span>{showOptional ? 'Ocultar campos' : 'Expandir e complementar'}</span>
                {showOptional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showOptional && (
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-white space-y-5 animate-fadeIn">
                <p className="text-xs text-slate-500 italic mb-3">
                  Preencha apenas o que tiver à mão. Todos os campos abaixo são opcionais e ajudam a enriquecer a análise da IA.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Pessoas / Áreas envolvidas */}
                  <div>
                    <label htmlFor="stakeholders" className="block text-xs font-semibold text-slate-700 mb-1">
                      Pessoas ou Outras Áreas Envolvidas
                    </label>
                    <input
                      id="stakeholders"
                      type="text"
                      value={context.stakeholders || ''}
                      onChange={(e) => onChange({ stakeholders: e.target.value })}
                      placeholder="Ex: Corpo Clínico, Enfermagem, Faturamento, TI"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
                    />
                  </div>

                  {/* Sistemas e Ferramentas */}
                  <div>
                    <label htmlFor="toolsAndSystems" className="block text-xs font-semibold text-slate-700 mb-1">
                      Sistemas e Ferramentas Utilizados
                    </label>
                    <input
                      id="toolsAndSystems"
                      type="text"
                      value={context.toolsAndSystems || ''}
                      onChange={(e) => onChange({ toolsAndSystems: e.target.value })}
                      placeholder="Ex: Tasy / MV, WhatsApp Web, Excel, E-mail"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
                    />
                  </div>

                  {/* Frequência ou Volume */}
                  <div>
                    <label htmlFor="frequencyOrVolume" className="block text-xs font-semibold text-slate-700 mb-1">
                      Frequência ou Volume Estimado
                    </label>
                    <input
                      id="frequencyOrVolume"
                      type="text"
                      value={context.frequencyOrVolume || ''}
                      onChange={(e) => onChange({ frequencyOrVolume: e.target.value })}
                      placeholder="Ex: Cerca de 300 atendimentos diários"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
                    />
                  </div>

                  {/* Destinatários */}
                  <div>
                    <label htmlFor="beneficiaries" className="block text-xs font-semibold text-slate-700 mb-1">
                      Quem recebe o resultado (Destinatários)
                    </label>
                    <input
                      id="beneficiaries"
                      type="text"
                      value={context.beneficiaries || ''}
                      onChange={(e) => onChange({ beneficiaries: e.target.value })}
                      placeholder="Ex: Paciente, familiares e médico assistente"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
                    />
                  </div>
                </div>

                {/* Resultado esperado */}
                <div>
                  <label htmlFor="expectedOutcome" className="block text-xs font-semibold text-slate-700 mb-1">
                    Resultado Esperado com a Transformação
                  </label>
                  <input
                    id="expectedOutcome"
                    type="text"
                    value={context.expectedOutcome || ''}
                    onChange={(e) => onChange({ expectedOutcome: e.target.value })}
                    placeholder="Ex: Reduzir filas em 40%, automatizar confirmações e unificar cadastro do paciente."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
                  />
                </div>

                {/* Observações adicionais */}
                <div>
                  <label htmlFor="additionalNotes" className="block text-xs font-semibold text-slate-700 mb-1">
                    Observações Adicionais ou Peculiaridades
                  </label>
                  <textarea
                    id="additionalNotes"
                    rows={2}
                    value={context.additionalNotes || ''}
                    onChange={(e) => onChange({ additionalNotes: e.target.value })}
                    placeholder="Qualquer outra informação relevante para o consultor de IA considerar..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-adventist-blue hover:bg-adventist-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition"
            >
              <span>Avançar para as Dimensões</span>
              <ArrowRight className="w-4 h-4 text-adventist-cyan" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

