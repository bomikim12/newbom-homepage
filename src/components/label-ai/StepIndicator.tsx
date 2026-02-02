/**
 * Step Indicator 컴포넌트
 * @TASK P3-S1-T5
 * @SPEC docs/planning/05-design-system.md#5.7
 */

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={step} className="flex items-center gap-2 md:gap-4">
            {/* Step Circle */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                      ? 'bg-deep-blue text-white'
                      : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-lg">check</span>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`hidden sm:inline text-xs md:text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector Line */}
            {stepNumber < totalSteps && (
              <div
                className={`w-6 md:w-12 h-0.5 ${
                  isCompleted ? 'bg-green-500' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
