import React from 'react';
import { DIMENSIONS, RESPONSE_OPTIONS } from '../data/dimensionsData';
import { DimensionsState, DimensionId } from '../types';
import {
  Compass,
  Target,
  FlaskConical,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface DimensionsStepProps {
  dimensions: DimensionsState;
  currentDimIndex: number;
  onSelectDimIndex: (index: number) => void;
  onAnswerChange: (dimId: DimensionId, questionId: string, value: number) => void;
  onNotesChange: (dimId: DimensionId, notes: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DIMENSION_ICONS: Record<string, React.ElementType> = {
  Compass,
  Target,
  FlaskConical,
  ShieldCheck,
  Cpu,
};

export const DimensionsStep: React.FC<DimensionsStepProps> = ({
  dimensions,
  currentDimIndex,
  onSelectDimIndex,
  onAnswerChange,
  onNotesChange,
  onNext,
  onBack,
}) => {
  const currentDim = DIMENSIONS[currentDimIndex];
  const currentDimState = dimensions[currentDim.id as DimensionId] || { answers: {}, notes: '' };
  const DimIcon = DIMENSION_ICONS[currentDim.iconName] || Compass;

  const totalQuestionsInDim = currentDim.questions.length;
  const answeredInDim = currentDim.questions.filter(
    (q) => currentDimState.answers[q.id] !== undefined
  ).length;

  const isLastDim = currentDimIndex === DIMENSIONS.length - 1;

  const getOptionStyle = (optionValue: number, isSelected: boolean) => {
    if (!isSelected) {
      return 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-700';
    }

    if (optionValue === 0) {
      return 'border-slate-400 bg-slate-100 text-slate-800 font-semibold ring-1 ring-slate-400';
    }
    if (optionValue <= 2) {
      return 'border-adventist-earthRed bg-red-50 text-adventist-earthRed font-semibold ring-1 ring-adventist-earthRed/40';
    }
    if (optionValue === 3) {
      return 'border-amber-400 bg-amber-50 text-amber-900 font-semibold ring-1 ring-amber-300';
    }
    // 4 ou 5
    return 'border-adventist-blue bg-adventist-blue-50 text-adventist-blue font-semibold ring-2 ring-adventist-cyan/30';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Dimension Tabs */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-2 sm:p-3 mb-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {DIMENSIONS.map((dim, idx) => {
            const state = dimensions[dim.id as DimensionId];
            const answeredCount = dim.questions.filter((q) => state?.answers?.[q.id] !== undefined).length;
            const complete = answeredCount === dim.questions.length;
            const isActive = idx === currentDimIndex;

            return (
              <button
                key={dim.id}
                type="button"
                onClick={() => onSelectDimIndex(idx)}
                className={`py-2 px-3 rounded-lg text-left transition-all duration-150 border text-xs ${
                  isActive
                    ? 'bg-adventist-blue text-white border-adventist-blue shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold truncate">{dim.name}</span>
                  {complete ? (
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ml-1 ${isActive ? 'text-adventist-cyan' : 'text-emerald-600'}`} />
                  ) : (
                    <span className={`text-2xs font-mono px-1 rounded shrink-0 ml-1 ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {answeredCount}/{dim.questions.length}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dimension Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 sm:p-7 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-adventist-blue-50 text-adventist-blue flex items-center justify-center shrink-0">
              <DimIcon className="w-5 h-5 text-adventist-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-adventist-blue">{currentDim.name}</h2>
              <p className="text-xs text-slate-500 font-subheading mt-0.5">{currentDim.detailedDescription}</p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 shrink-0 hidden sm:inline-block">
            {answeredInDim}/{totalQuestionsInDim} respondidas
          </span>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {currentDim.questions.map((q, qIndex) => {
            const currentAnswer = currentDimState.answers[q.id];

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs"
              >
                <div className="flex items-start space-x-2.5 mb-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-adventist-blue-50 text-adventist-blue text-xs font-bold shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {q.text}
                    </h3>
                    {q.helpText && (
                      <p className="mt-0.5 text-xs text-slate-500 flex items-center space-x-1 font-subheading">
                        <HelpCircle className="w-3 h-3 text-adventist-cyan shrink-0" />
                        <span>{q.helpText}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Response Options: Only titles/labels without descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {RESPONSE_OPTIONS.map((opt) => {
                    const isSelected = currentAnswer === opt.value;
                    const styleClass = getOptionStyle(opt.value, isSelected);

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onAnswerChange(currentDim.id as DimensionId, q.id, opt.value)}
                        className={`text-left px-3 py-2.5 rounded-lg border transition-all text-xs flex items-center justify-between ${styleClass}`}
                      >
                        <span className="leading-tight pr-2">{opt.label}</span>
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-adventist-blue bg-adventist-blue text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes (Optional) */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <label htmlFor={`notes-${currentDim.id}`} className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5 mb-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-adventist-cyan" />
            <span>Observações ou exemplos desta dimensão (opcional):</span>
          </label>
          <input
            id={`notes-${currentDim.id}`}
            type="text"
            value={currentDimState.notes}
            onChange={(e) => onNotesChange(currentDim.id as DimensionId, e.target.value)}
            placeholder="Ex: Tentamos um teste de formulário no mês passado, mas faltou alinhamento com a recepção..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-adventist-cyan/30 focus:border-adventist-cyan"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentDimIndex === 0 ? 'Contexto' : 'Anterior'}</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-adventist-blue hover:bg-adventist-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition"
          >
            <span>{isLastDim ? 'Revisar e Gerar Instrução' : 'Próxima Dimensão'}</span>
            <ArrowRight className="w-4 h-4 text-adventist-cyan" />
          </button>
        </div>
      </div>
    </div>
  );
};
