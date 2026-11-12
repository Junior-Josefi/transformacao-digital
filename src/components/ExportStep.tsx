import React, { useState } from 'react';
import { ProcessContext, DimensionsState } from '../types';
import { generatePromptInstruction } from '../utils/markdownGenerator';
import { copyToClipboard } from '../utils/downloadHelper';
import {
  Copy,
  Check,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

interface ExportStepProps {
  context: ProcessContext;
  dimensions: DimensionsState;
  onBackToReview: () => void;
  onStartNew: () => void;
}

export const ExportStep: React.FC<ExportStepProps> = ({
  context,
  dimensions,
  onBackToReview,
  onStartNew,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const promptContent = generatePromptInstruction(context, dimensions);

  const handleCopy = async () => {
    const success = await copyToClipboard(promptContent);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Main Action Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-8 mb-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
          <Sparkles className="w-6 h-6 text-emerald-600" />
        </div>

        <h2 className="text-2xl font-bold text-adventist-blue">
          Diagnóstico Pronto
        </h2>

        <p className="mt-1 text-sm text-slate-600 max-w-lg mx-auto">
          Processo: <strong className="text-slate-900">{context.processName || 'Processo'}</strong>
        </p>

        {/* Main CTA: Copiar instrução */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 ${
              copied
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-adventist-blue hover:bg-adventist-blue-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-white stroke-[3]" />
                <span>Instrução Copiada com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-adventist-cyan" />
                <span>Copiar instrução</span>
              </>
            )}
          </button>

          {copied ? (
            <p className="mt-2 text-xs font-semibold text-emerald-700 animate-fadeIn">
              Pronto! Agora basta colar no ChatGPT, Claude ou Gemini.
            </p>
          ) : (
            <p className="mt-2 text-xs text-slate-500">
              Copia o contexto, as respostas e a ordem direta para a IA analisar e gerar o PDF final.
            </p>
          )}
        </div>
      </div>

      {/* Quick 2-step guide */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
        <div className="flex items-center space-x-2 mb-3 text-adventist-blue font-bold text-sm">
          <FileCheck2 className="w-4 h-4 text-adventist-cyan" />
          <span>Como funciona com a IA:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <span className="font-bold text-adventist-blue block mb-1">1. Cole a instrução na IA</span>
            <p className="text-slate-600">
              Abra o ChatGPT, Claude ou Gemini e apenas dê <strong>Ctrl + V</strong> (colar).
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <span className="font-bold text-adventist-blue block mb-1">2. Receba o PDF enxuto</span>
            <p className="text-slate-600">
              O texto orienta a IA a ser sucinta no diagnóstico e entregar um PDF focado no <strong>Plano de Ação</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Preview */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left hover:bg-slate-100 transition text-xs font-semibold text-slate-700"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-3.5 h-3.5 text-adventist-cyan" />
            <span>Ver texto da instrução</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-500">
            <span>{showPreview ? 'Ocultar' : 'Visualizar'}</span>
            {showPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showPreview && (
          <div className="p-4 bg-slate-900 text-slate-100 max-h-72 overflow-y-auto font-mono text-2xs leading-relaxed">
            <pre className="whitespace-pre-wrap">{promptContent}</pre>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBackToReview}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar à Revisão</span>
        </button>

        <button
          type="button"
          onClick={onStartNew}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-adventist-earthRed hover:bg-red-50 text-xs font-medium border border-transparent hover:border-red-200 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Novo Diagnóstico</span>
        </button>
      </div>
    </div>
  );
};
