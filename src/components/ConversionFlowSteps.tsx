import React from 'react';
import { UploadCloud, Table, Sliders, FileDown, CheckCircle } from 'lucide-react';

interface ConversionFlowStepsProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
  onStepClick?: (step: 1 | 2 | 3 | 4 | 5) => void;
}

export const ConversionFlowSteps: React.FC<ConversionFlowStepsProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: 'Upload', icon: UploadCloud },
    { number: 2, label: 'Preview', icon: Table },
    { number: 3, label: 'Customize', icon: Sliders },
    { number: 4, label: 'Convert', icon: FileDown },
    { number: 5, label: 'Download', icon: CheckCircle },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200/80 py-3 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.number}>
              <div
                className={`flex items-center gap-2 select-none ${
                  isCurrent
                    ? 'text-blue-600 font-bold'
                    : isCompleted
                    ? 'text-emerald-600 font-semibold cursor-pointer'
                    : 'text-slate-400 font-medium'
                }`}
                onClick={() => {
                  if (isCompleted && onStepClick) {
                    onStepClick(step.number as any);
                  }
                }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-100'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs hidden sm:inline">{step.label}</span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${
                    step.number < currentStep ? 'bg-emerald-300' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
