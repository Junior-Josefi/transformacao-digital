import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  hasData: boolean;
  isDemoMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, hasData }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand Title */}
          <div className="flex items-center space-x-4">
            <img
              src="/marca-vertical-centromedico-curitiba-positivo-colorido.png"
              alt="Centro Médico Curitiba"
              className="h-14 w-auto object-contain"
            />
            <div className="hidden sm:block border-l border-slate-200 pl-4">
              <h1 className="text-lg font-bold text-adventist-blue leading-tight tracking-tight">
                Diagnóstico de Transformação Digital
              </h1>
              <p className="text-xs text-slate-500 font-subheading">
                Avaliação de Processos Organizacionais • Base Rogers
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center space-x-2.5">
            {hasData && (
              <button
                onClick={onReset}
                type="button"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-adventist-earthRed px-2.5 py-1.5 rounded-md hover:bg-red-50 transition-colors border border-transparent hover:border-red-200"
                title="Limpar todos os dados e recomeçar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpar dados</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
