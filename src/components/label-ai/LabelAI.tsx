/**
 * LabelAI 컨테이너 컴포넌트
 * @TASK P3-S1-T5
 * @SPEC docs/planning/06-screens.md
 *
 * 4단계 위저드 UI:
 * - Step 1: 프로젝트 설정
 * - Step 2: 원재료 분석
 * - Step 3: 영양 성분 변환
 * - Step 4: 최종 라벨 출력
 */

import { useState } from 'react';
import type { ProjectSettings, Ingredient, NutritionData } from '../../lib/types';
import { DEFAULT_NUTRITION } from '../../lib/constants';
import { StepIndicator } from './StepIndicator';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';

const STEPS = ['프로젝트 설정', '원재료 분석', '영양성분', '라벨 출력'];

const INITIAL_PROJECT_SETTINGS: ProjectSettings = {
  email: '',
  productName: '',
  targetMarket: 'EU',
  targetLanguage: 'English',
};

export function LabelAI() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(INITIAL_PROJECT_SETTINGS);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [nutrition, setNutrition] = useState<NutritionData>(DEFAULT_NUTRITION);

  const handleProjectSettingsUpdate = (data: Partial<ProjectSettings>) => {
    setProjectSettings((prev) => ({ ...prev, ...data }));
  };

  const handleNutritionUpdate = (data: Partial<NutritionData>) => {
    setNutrition((prev) => ({ ...prev, ...data }));
  };

  const handleReset = () => {
    setCurrentStep(1);
    setProjectSettings(INITIAL_PROJECT_SETTINGS);
    setIngredients([]);
    setNutrition(DEFAULT_NUTRITION);
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <span className="material-symbols-outlined text-blue-600 text-sm">science</span>
            <span className="text-sm font-bold text-blue-700">Global Label AI</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">무료 라벨링 서비스</h1>
          <p className="text-slate-600 text-sm md:text-base">
            원재료와 영양정보를 입력하면 EU/US 규정에 맞는 라벨 초안을 무료로 생성합니다
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} steps={STEPS} />

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          {currentStep === 1 && (
            <Step1
              data={projectSettings}
              onUpdate={handleProjectSettingsUpdate}
              onNext={() => goToStep(2)}
            />
          )}

          {currentStep === 2 && (
            <Step2
              ingredients={ingredients}
              onUpdate={setIngredients}
              onPrev={() => goToStep(1)}
              onNext={() => goToStep(3)}
            />
          )}

          {currentStep === 3 && (
            <Step3
              nutrition={nutrition}
              targetMarket={projectSettings.targetMarket}
              onUpdate={handleNutritionUpdate}
              onPrev={() => goToStep(2)}
              onNext={() => goToStep(4)}
            />
          )}

          {currentStep === 4 && (
            <Step4
              projectSettings={projectSettings}
              ingredients={ingredients}
              nutrition={nutrition}
              onPrev={() => goToStep(3)}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            이 서비스는 참고용 초안을 제공합니다. 실제 라벨 사용 전 전문가 검토를 권장합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LabelAI;
