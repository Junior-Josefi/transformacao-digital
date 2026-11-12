import React from 'react';
import { ProcessContext, DimensionsState, DimensionId } from '../types';
import { DIMENSIONS, RESPONSE_OPTIONS } from '../data/dimensionsData';
import {
  FileEdit,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Copy,
  ChevronRight
} from 'lucide-react';

interface ReviewStepProps {
  context: ProcessContext;
  dimensions: DimensionsState;
  onEditContext: () => void;
  onEditDimension: (dimIndex: number) => void;
  onProceedToExport: () => void;
  onBack: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  context,
  dimensions,
  onEditContext,
  onEditDimension,
  onProceedToExport,
  onBack,
}) => {
  let totalQuestions = 0;
  let totalAnswered = 0;
  const unansweredByDim: Array<{ dimIndex: number; dimName: string; count: number }> = [];

  DIMENSIONS.forEach((dim, idx) => {
    totalQuestions += dim.questions.length;
    const dimState = dimensions[dim.id as DimensionId];
    const answeredCount = dim.questions.filter((q) => dimState?.answers?.[q.id] !== undefined).length;
    totalAnswered += answeredCount;

    const missing = dim.questions.length - answeredCount;
    if (missing > 0) {
      unansweredByDim.push({ dimIndex: idx, dimName: dim.name, count: missing });
    }
  });

  const allQuestionsAnswered = totalAnswered === totalQuestions;

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 sm:p-7 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-adventist-blue">Revisão das Respostas</h2>
            <p className="text-xs text-slate-500 font-subheading mt-0.5">
              Confira os dados antes de gerar a instrução para a IA
            </p>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-adventist-blue-50 text-adventist-blue">
            <CheckCircle2 className="w-3.5 h-3.5 text-adventist-cyan" />
            <span>{totalAnswered}/{totalQuestions} respondidas</span>
          </div>
        </div>

        {/* Unanswered alert (if any) */}
        {!allQuestionsAnswered && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-amber-900 text-xs">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Há {totalQuestions - totalAnswered} pergunta(s) pendente(s).</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {unansweredByDim.map((u) => (
                <button
                  key={u.dimIndex}
                  type="button"
                  onClick={() => onEditDimension(u.dimIndex)}
                  className="px-2 py-0.5 text-2xs font-semibold rounded bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition"
                >
                  {u.dimName.replace(/^\d+\.\s*/, '')} ({u.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1. Context Summary Card */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5 text-adventist-blue">
              <FileEdit className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Contexto do Processo
              </h3>
            </div>
            <button
              type="button"
              onClick={onEditContext}
              className="text-xs font-semibold text-adventist-blue hover:underline flex items-center space-x-0.5"
            >
              <span>Editar</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-2xs text-slate-500 block">Processo:</span>
              <p className="font-semibold text-slate-800">{context.processName || 'Não informado'}</p>
            </div>
            <div>
              <span className="text-2xs text-slate-500 block">Área:</span>
              <p className="font-semibold text-slate-800">{context.responsibleArea || 'Não informada'}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-2xs text-slate-500 block">Objetivo:</span>
              <p className="text-slate-700">{context.processObjective || 'Não informado'}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-2xs text-slate-500 block">Principal dor:</span>
              <p className="text-adventist-earthRed font-medium">{context.mainPainPoint || 'Não informada'}</p>
            </div>
          </div>
        </div>

        {/* 2. Dimensions List */}
        <div className="space-y-3">
          {DIMENSIONS.map((dim, idx) => {
            const dimState = dimensions[dim.id as DimensionId];
            const answeredCount = dim.questions.filter((q) => dimState?.answers?.[q.id] !== undefined).length;
            const complete = answeredCount === dim.questions.length;

            return (
              <div
                key={dim.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-adventist-blue">{dim.name}</span>
                    <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${complete ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {answeredCount}/{dim.questions.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onEditDimension(idx)}
                    className="text-xs text-adventist-blue font-semibold hover:underline flex items-center space-x-0.5"
                  >
                    <span>Editar</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Per question summary tags */}
                <div className="space-y-1">
                  {dim.questions.map((q) => {
                    const ans = dimState?.answers?.[q.id];
                    const opt = RESPONSE_OPTIONS.find((o) => o.value === ans);

                    return (
                      <div key={q.id} className="flex items-center justify-between text-2xs py-0.5 border-b border-slate-50 last:border-none">
                        <span className="text-slate-600 line-clamp-1 pr-2">{q.text}</span>
                        <span className={`shrink-0 font-medium px-1.5 py-0.5 rounded ${
                          ans === undefined
                            ? 'bg-amber-100 text-amber-800'
                            : ans >= 4
                            ? 'bg-emerald-100/70 text-emerald-900'
                            : ans === 3
                            ? 'bg-amber-100/70 text-amber-900'
                            : ans === 0
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-red-100/70 text-red-900'
                        }`}>
                          {opt ? opt.label : 'Pendente'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="button"
            onClick={onProceedToExport}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-adventist-blue hover:bg-adventist-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition"
          >
            <Copy className="w-4 h-4 text-adventist-cyan" />
            <span>Avançar para Instrução</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
