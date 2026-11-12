import React from 'react';
import { StepId } from '../types';
import { Check, Info, FileEdit, BarChart3, Eye, Copy } from 'lucide-react';

interface StepperProps {
  currentStep: StepId;
  onStepClick: (step: StepId) => void;
  completedSteps: StepId[];
}

interface StepItem {
  id: StepId;
  label: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  { id: 'intro', label: 'Início', icon: Info },
  { id: 'context', label: 'Contexto', icon: FileEdit },
  { id: 'dimensions', label: '5 Dimensões', icon: BarChart3 },
  { id: 'review', label: 'Revisão', icon: Eye },
  { id: 'export', label: 'Instrução', icon: Copy },
];

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick, completedSteps }) => {
  const currentIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <nav aria-label="Progresso do Diagnóstico" className="w-full max-w-3xl mx-auto my-5 px-4">
      <div className="relative flex items-center justify-between">
        {/* Background track line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0" />
        
        {/* Active progress line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-adventist-cyan transition-all duration-300 ease-out z-0"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isClickable = isCompleted || index <= currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-150 shadow-2xs ${
                  isCurrent
                    ? 'bg-adventist-blue text-white ring-4 ring-adventist-cyan/30 scale-105'
                    : isCompleted
                    ? 'bg-adventist-cyan text-white hover:bg-adventist-cyan-dark cursor-pointer'
                    : 'bg-white border-2 border-slate-300 text-slate-400 cursor-not-allowed'
                }`}
                title={`Ir para etapa ${step.label}`}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </button>

              <span
                className={`mt-1.5 text-xs tracking-tight text-center hidden sm:block ${
                  isCurrent
                    ? 'text-adventist-blue font-bold'
                    : isCompleted
                    ? 'text-slate-700 font-medium'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
