import { useState, useEffect } from 'react';
import { StepId, DimensionId, ProcessContext, DimensionsState } from './types';
import {
  DIMENSIONS,
  INITIAL_CONTEXT,
  INITIAL_DIMENSIONS
} from './data/dimensionsData';
import {
  DEMO_HASHES,
  DEMO_PROCESS_CONTEXT,
  DEMO_DIMENSIONS_STATE
} from './data/demoData';
import {
  saveDraftToStorage,
  loadDraftFromStorage,
  clearDraftFromStorage
} from './utils/downloadHelper';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { IntroStep } from './components/IntroStep';
import { ContextStep } from './components/ContextStep';
import { DimensionsStep } from './components/DimensionsStep';
import { ReviewStep } from './components/ReviewStep';
import { ExportStep } from './components/ExportStep';
import { Footer } from './components/Footer';
import { AlertCircle } from 'lucide-react';

interface StoredDraft {
  context: ProcessContext;
  dimensions: DimensionsState;
}

export function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState<number>(0);
  const [context, setContext] = useState<ProcessContext>(INITIAL_CONTEXT);
  const [dimensions, setDimensions] = useState<DimensionsState>(INITIAL_DIMENSIONS as unknown as DimensionsState);
  const [completedSteps, setCompletedSteps] = useState<StepId[]>(['intro']);
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Check for Demo Hash or Saved Draft on mount
  useEffect(() => {
    const checkHashAndDraft = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const isDemo = DEMO_HASHES.includes(hash) || search.includes('demo');

      if (isDemo) {
        setIsDemoMode(true);
        setContext(DEMO_PROCESS_CONTEXT);
        setDimensions(DEMO_DIMENSIONS_STATE);
        setCompletedSteps(['intro', 'context', 'dimensions', 'review', 'export']);
        return;
      }

      // If not demo, check localStorage draft
      const draft = loadDraftFromStorage<StoredDraft>();
      if (draft && (draft.context?.processName || Object.values(draft.dimensions || {}).some(d => Object.keys(d.answers || {}).length > 0))) {
        setHasDraft(true);
      }
    };

    checkHashAndDraft();
    window.addEventListener('hashchange', checkHashAndDraft);
    return () => window.removeEventListener('hashchange', checkHashAndDraft);
  }, []);

  // Auto-save draft when context or dimensions change (only if not in demo mode)
  useEffect(() => {
    if (isDemoMode) return;

    const hasAnyContent = Boolean(
      context.processName?.trim() ||
      context.responsibleArea?.trim() ||
      Object.values(dimensions).some(d => Object.keys(d.answers).length > 0)
    );

    if (hasAnyContent) {
      saveDraftToStorage({ context, dimensions });
    }
  }, [context, dimensions, isDemoMode]);

  // Handle restoring draft
  const handleRestoreDraft = () => {
    const draft = loadDraftFromStorage<StoredDraft>();
    if (draft) {
      if (draft.context) setContext(draft.context);
      if (draft.dimensions) setDimensions(draft.dimensions);
      setCurrentStep('context');
      setCompletedSteps(['intro', 'context']);
    }
  };

  // Handle discarding draft
  const handleClearDraft = () => {
    clearDraftFromStorage();
    setHasDraft(false);
  };

  // Reset entire application
  const handleFullReset = () => {
    clearDraftFromStorage();
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setContext(INITIAL_CONTEXT);
    setDimensions(INITIAL_DIMENSIONS as unknown as DimensionsState);
    setCurrentStep('intro');
    setCurrentDimensionIndex(0);
    setCompletedSteps(['intro']);
    setHasDraft(false);
    setIsDemoMode(false);
    setShowResetConfirm(false);
  };

  // Step transitions
  const markStepComplete = (step: StepId) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const goToStep = (step: StepId) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Start from Intro
  const handleStartFromIntro = () => {
    markStepComplete('intro');
    goToStep('context');
  };

  // 2. Next from Context
  const handleNextFromContext = () => {
    markStepComplete('context');
    goToStep('dimensions');
    setCurrentDimensionIndex(0);
  };

  // 3. Dimension answer change
  const handleAnswerChange = (dimId: DimensionId, questionId: string, value: number) => {
    setDimensions(prev => ({
      ...prev,
      [dimId]: {
        ...prev[dimId],
        answers: {
          ...prev[dimId]?.answers,
          [questionId]: value
        }
      }
    }));
  };

  const handleNotesChange = (dimId: DimensionId, notes: string) => {
    setDimensions(prev => ({
      ...prev,
      [dimId]: {
        ...prev[dimId],
        notes
      }
    }));
  };

  // 3. Dimensions navigation
  const handleNextDimension = () => {
    if (currentDimensionIndex < DIMENSIONS.length - 1) {
      setCurrentDimensionIndex(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      markStepComplete('dimensions');
      goToStep('review');
    }
  };

  const handleBackDimension = () => {
    if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      goToStep('context');
    }
  };

  // 4. Review actions
  const handleEditContextFromReview = () => {
    goToStep('context');
  };

  const handleEditDimensionFromReview = (dimIndex: number) => {
    setCurrentDimensionIndex(dimIndex);
    goToStep('dimensions');
  };

  const handleProceedToExport = () => {
    markStepComplete('review');
    markStepComplete('export');
    goToStep('export');
  };

  const hasData = Boolean(
    context.processName?.trim() ||
    Object.values(dimensions).some(d => Object.keys(d.answers).length > 0)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#1E293B]">
      {/* Header */}
      <Header
        onReset={() => setShowResetConfirm(true)}
        hasData={hasData}
        isDemoMode={isDemoMode}
      />

      {/* Stepper (shown on all steps except intro) */}
      {currentStep !== 'intro' && (
        <Stepper
          currentStep={currentStep}
          onStepClick={goToStep}
          completedSteps={completedSteps}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentStep === 'intro' && (
          <IntroStep
            onStart={handleStartFromIntro}
            hasDraft={hasDraft && !isDemoMode}
            onRestoreDraft={handleRestoreDraft}
            onClearDraft={handleClearDraft}
          />
        )}

        {currentStep === 'context' && (
          <ContextStep
            context={context}
            onChange={(updated) => setContext(prev => ({ ...prev, ...updated }))}
            onNext={handleNextFromContext}
            onBack={() => goToStep('intro')}
          />
        )}

        {currentStep === 'dimensions' && (
          <DimensionsStep
            dimensions={dimensions}
            currentDimIndex={currentDimensionIndex}
            onSelectDimIndex={(idx) => setCurrentDimensionIndex(idx)}
            onAnswerChange={handleAnswerChange}
            onNotesChange={handleNotesChange}
            onNext={handleNextDimension}
            onBack={handleBackDimension}
          />
        )}

        {currentStep === 'review' && (
          <ReviewStep
            context={context}
            dimensions={dimensions}
            onEditContext={handleEditContextFromReview}
            onEditDimension={handleEditDimensionFromReview}
            onProceedToExport={handleProceedToExport}
            onBack={() => {
              setCurrentDimensionIndex(DIMENSIONS.length - 1);
              goToStep('dimensions');
            }}
          />
        )}

        {currentStep === 'export' && (
          <ExportStep
            context={context}
            dimensions={dimensions}
            onBackToReview={() => goToStep('review')}
            onStartNew={() => setShowResetConfirm(true)}
          />
        )}
      </main>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200">
            <div className="flex items-center space-x-3 text-adventist-earthRed mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-adventist-earthRed" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isDemoMode ? 'Sair do Modo Demonstração?' : 'Limpar dados do diagnóstico?'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isDemoMode
                ? 'Isso irá desativar o cenário de demonstração e reiniciar a ferramenta com os campos em branco.'
                : 'Todas as informações preenchidas para o processo atual e as respostas das cinco dimensões serão apagadas deste navegador.'}
            </p>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleFullReset}
                className="px-4 py-2 rounded-lg bg-adventist-earthRed text-white text-xs font-semibold hover:bg-red-700 transition"
              >
                Sim, limpar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
