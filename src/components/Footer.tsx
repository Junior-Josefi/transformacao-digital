import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-xs text-slate-500 font-subheading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="font-semibold text-adventist-blue">Centro Médico Curitiba</span>
            <span>•</span>
            <span>Adventist Health Brasil</span>
          </div>

          <div className="flex items-center space-x-1.5 text-center text-slate-500">
            <span>Metodologia inspirada no roteiro de David L. Rogers</span>
            <span>•</span>
            <span className="inline-flex items-center text-adventist-cyan">
              Cuidado com o processo & as pessoas <Heart className="w-3 h-3 text-adventist-earthRed ml-1 inline" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
