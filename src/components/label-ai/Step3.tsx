/**
 * Step 3: 영양 성분 변환
 * @TASK P3-S1-T3
 * @SPEC docs/planning/06-screens.md#2.3
 */

import type { NutritionData, ProjectSettings } from '../../lib/types';
import { sodiumToSalt, kcalToKj } from '../../lib/utils';

interface Step3Props {
  nutrition: NutritionData;
  targetMarket: ProjectSettings['targetMarket'];
  onUpdate: (nutrition: Partial<NutritionData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const NUTRITION_FIELDS: {
  key: keyof NutritionData;
  label: string;
  unit: string;
  placeholder: string;
}[] = [
  { key: 'kcal', label: '에너지', unit: 'kcal', placeholder: '350' },
  { key: 'fat', label: '지방', unit: 'g', placeholder: '15' },
  { key: 'saturates', label: '포화지방', unit: 'g', placeholder: '5' },
  { key: 'carbs', label: '탄수화물', unit: 'g', placeholder: '45' },
  { key: 'sugars', label: '당류', unit: 'g', placeholder: '10' },
  { key: 'protein', label: '단백질', unit: 'g', placeholder: '8' },
  { key: 'sodium', label: '나트륨', unit: 'mg', placeholder: '500' },
  { key: 'fibre', label: '식이섬유', unit: 'g', placeholder: '3' },
];

export function Step3({ nutrition, targetMarket, onUpdate, onPrev, onNext }: Step3Props) {
  const handleChange = (key: keyof NutritionData, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate({ [key]: numValue });
  };

  // EU 규정 변환 값 계산
  const salt = sodiumToSalt(nutrition.sodium);
  const kj = kcalToKj(nutrition.kcal);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">영양 성분 입력</h2>
        <p className="text-slate-600">100g 기준 영양성분을 입력해주세요</p>
      </div>

      <div className="space-y-6">
        {/* EU 규정 안내 */}
        {targetMarket === 'EU' && (
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <span className="material-symbols-outlined text-green-600 text-xl">eco</span>
            <div className="text-sm text-slate-700">
              <p className="font-medium mb-1">EU FIC 규정 자동 변환</p>
              <ul className="space-y-1 text-slate-600">
                <li>• 나트륨(mg) → 소금(g) 자동 변환</li>
                <li>• kcal → kJ 자동 병기</li>
                <li>• EU Article 30 규정 준수</li>
              </ul>
            </div>
          </div>
        )}

        {/* 영양성분 입력 폼 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NUTRITION_FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                {field.label}
                {targetMarket === 'EU' && field.key === 'kcal' && (
                  <span className="text-xs font-normal text-slate-400 ml-2">
                    (→ {kj} kJ)
                  </span>
                )}
                {targetMarket === 'EU' && field.key === 'sodium' && (
                  <span className="text-xs font-normal text-slate-400 ml-2">
                    (→ 소금 {salt.toFixed(2)} g)
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type="number"
                  id={field.key}
                  value={nutrition[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={field.placeholder}
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  {field.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* EU 변환 결과 미리보기 */}
        {targetMarket === 'EU' && (
          <div className="bg-slate-50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-slate-700 mb-3">EU 라벨 미리보기</h3>
            <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Energy</span>
                  <span>
                    {nutrition.kcal} kcal / {kj} kJ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fat</span>
                  <span>{nutrition.fat} g</span>
                </div>
                <div className="flex justify-between pl-4 text-slate-500">
                  <span>of which saturates</span>
                  <span>{nutrition.saturates} g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrate</span>
                  <span>{nutrition.carbs} g</span>
                </div>
                <div className="flex justify-between pl-4 text-slate-500">
                  <span>of which sugars</span>
                  <span>{nutrition.sugars} g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fibre</span>
                  <span>{nutrition.fibre} g</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span>{nutrition.protein} g</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Salt{' '}
                    <span className="text-xs text-green-600">(변환됨)</span>
                  </span>
                  <span>{salt.toFixed(2)} g</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onPrev}
            className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            이전
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-4 bg-deep-blue text-white rounded-xl font-bold text-lg hover:bg-navy transition-colors flex items-center justify-center gap-2"
          >
            라벨 생성
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>
        </div>
      </div>
    </div>
  );
}
