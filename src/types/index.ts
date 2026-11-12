export type StepId = 'intro' | 'context' | 'dimensions' | 'review' | 'export';

export interface ProcessContext {
  // Obrigatórios
  processName: string;
  responsibleArea: string;
  processObjective: string;
  currentWorkflow: string;
  mainPainPoint: string;

  // Opcionais
  stakeholders?: string;
  toolsAndSystems?: string;
  frequencyOrVolume?: string;
  beneficiaries?: string;
  expectedOutcome?: string;
  additionalNotes?: string;
}

export type DimensionId = 'visao' | 'prioridades' | 'experimentacao' | 'governanca' | 'capacidades';

export interface QuestionOption {
  value: number; // 0 para N/A, 1-5 para escala
  label: string;
}

export interface Question {
  id: string;
  text: string;
  helpText?: string;
}

export interface DimensionDefinition {
  id: DimensionId;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  questions: Question[];
}

export interface DimensionResponse {
  answers: Record<string, number>; // questionId -> optionValue
  notes: string;
}

export type DimensionsState = Record<DimensionId, DimensionResponse>;

export interface DiagnosisState {
  context: ProcessContext;
  dimensions: DimensionsState;
  currentStep: StepId;
  currentDimensionIndex: number;
}
