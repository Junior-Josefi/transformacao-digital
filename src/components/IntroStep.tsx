import React from 'react';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { DIMENSIONS } from '../data/dimensionsData';

interface IntroStepProps {
  onStart: () => void;
  hasDraft: boolean;
  onRestoreDraft: () => void;
  onClearDraft: () => void;
}

export const IntroStep: React.FC<IntroStepProps> = ({
  onStart,
  hasDraft,
  onRestoreDraft,
  onClearDraft
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-10 text-center">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-adventist-blue-50 text-adventist-blue text-xs font-semibold mb-5 border border-adventist-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-adventist-cyan" />
          <span>Centro Médico Curitiba • Base Rogers</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-adventist-blue tracking-tight">
          Diagnóstico de Transformação Digital
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Avalie seu processo em 5 dimensões práticas. Ao final, clique em <strong>Copiar instrução</strong> e cole em uma IA (ChatGPT ou Claude) para receber a análise completa e o relatório em PDF pronto para download.
        </p>

        {/* Draft Alert if available */}
        {hasDraft && (
          <div className="mt-5 mx-auto max-w-lg p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center space-x-2 text-amber-900 text-xs">
              <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Há um diagnóstico salvo anteriormente neste navegador.</span>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={onRestoreDraft}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-adventist-blue text-white hover:bg-adventist-blue-700 transition"
              >
                Continuar
              </button>
              <button
                type="button"
                onClick={onClearDraft}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
              >
                Descartar
              </button>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-adventist-blue hover:bg-adventist-blue-700 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow transition"
          >
            <span>Iniciar Diagnóstico</span>
            <ArrowRight className="w-4 h-4 text-adventist-cyan" />
          </button>
        </div>
      </div>

      {/* 5 Dimensions Clean Summary */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {DIMENSIONS.map((d) => (
          <div key={d.id} className="bg-white border border-slate-200 p-3 rounded-xl text-center shadow-2xs">
            <span className="text-xs font-bold text-adventist-blue block">{d.name}</span>
            <span className="text-2xs text-slate-500 mt-0.5 block leading-tight">{d.shortDescription}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
