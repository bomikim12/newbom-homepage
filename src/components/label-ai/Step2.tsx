/**
 * Step 2: 원재료 분석
 * @TASK P3-S1-T2
 * @SPEC docs/planning/06-screens.md#2.2
 */

import { useState } from 'react';
import type { Ingredient } from '../../lib/types';
import { ALLERGENS } from '../../lib/constants';

interface Step2Props {
  ingredients: Ingredient[];
  onUpdate: (ingredients: Ingredient[]) => void;
  onPrev: () => void;
  onNext: () => void;
}

// 알러지 성분 매핑 (한글 → 영어)
const ALLERGEN_KEYWORDS: Record<string, string[]> = {
  WHEAT: ['밀', 'wheat', '밀가루', 'flour', '글루텐', 'gluten'],
  SOY: ['대두', '콩', 'soy', 'soybean', '간장', 'soy sauce'],
  FISH: ['생선', '어류', 'fish', '멸치', '참치', 'anchovy', 'tuna'],
  EGG: ['계란', '달걀', 'egg', '난백', '난황'],
  MILK: ['우유', '유제품', 'milk', '유청', '크림', 'cream', 'whey'],
  NUTS: ['견과류', '호두', '아몬드', '캐슈넛', 'nuts', 'walnut', 'almond', 'cashew'],
  PEANUTS: ['땅콩', 'peanut'],
  CRUSTACEANS: ['갑각류', '새우', '게', '랍스터', 'shrimp', 'crab', 'lobster', 'crustacean'],
  CELERY: ['셀러리', 'celery'],
  MUSTARD: ['겨자', 'mustard'],
  SESAME: ['참깨', '깨', 'sesame'],
  SULPHITES: ['아황산', '아황산염', 'sulphite', 'sulfite', 'so2'],
  LUPIN: ['루핀', 'lupin'],
  MOLLUSCS: ['연체류', '조개', '굴', '오징어', '문어', 'mollusc', 'oyster', 'squid', 'octopus'],
};

export function Step2({ ingredients, onUpdate, onPrev, onNext }: Step2Props) {
  const [newIngredient, setNewIngredient] = useState({ name: '', percent: '' });
  const [error, setError] = useState('');

  // 알러지 성분 감지
  const detectAllergen = (name: string): string | null => {
    const lowerName = name.toLowerCase();
    for (const [allergen, keywords] of Object.entries(ALLERGEN_KEYWORDS)) {
      if (keywords.some((keyword) => lowerName.includes(keyword.toLowerCase()))) {
        return allergen;
      }
    }
    return null;
  };

  // 원재료 추가
  const handleAdd = () => {
    if (!newIngredient.name.trim()) {
      setError('원재료명을 입력해주세요');
      return;
    }

    const percent = parseFloat(newIngredient.percent);
    if (isNaN(percent) || percent < 0 || percent > 100) {
      setError('함량은 0~100 사이의 숫자를 입력해주세요');
      return;
    }

    const updatedIngredients = [
      ...ingredients,
      { name: newIngredient.name.trim(), percent },
    ].sort((a, b) => b.percent - a.percent); // 중량 내림차순 정렬

    onUpdate(updatedIngredients);
    setNewIngredient({ name: '', percent: '' });
    setError('');
  };

  // 원재료 삭제
  const handleRemove = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    onUpdate(updatedIngredients);
  };

  // 다음 단계 유효성 검사
  const handleNext = () => {
    if (ingredients.length === 0) {
      setError('최소 1개의 원재료를 입력해주세요');
      return;
    }
    onNext();
  };

  // 총 함량 계산
  const totalPercent = ingredients.reduce((sum, i) => sum + i.percent, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">원재료 분석</h2>
        <p className="text-slate-600">원재료와 함량을 입력하면 자동으로 정렬됩니다</p>
      </div>

      <div className="space-y-6">
        {/* 원재료 입력 */}
        <div className="bg-slate-50 p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient((prev) => ({ ...prev, name: e.target.value }))}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="원재료명 (예: 밀가루)"
            />
            <input
              type="number"
              value={newIngredient.percent}
              onChange={(e) => setNewIngredient((prev) => ({ ...prev, percent: e.target.value }))}
              className="w-full sm:w-24 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="%"
              min="0"
              max="100"
              step="0.1"
            />
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-deep-blue text-white rounded-lg font-bold hover:bg-navy transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              추가
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        {/* 안내 메시지 */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
          <span className="material-symbols-outlined text-blue-600 text-xl">info</span>
          <div className="text-sm text-slate-700">
            <p className="font-medium mb-1">EU 규정 안내</p>
            <ul className="space-y-1 text-slate-600">
              <li>• 원재료는 중량 순서대로 자동 정렬됩니다</li>
              <li>• 2% 미만 원재료는 순서 상관없이 표기 가능합니다</li>
              <li>• 알러지 유발 물질은 자동으로 감지됩니다</li>
            </ul>
          </div>
        </div>

        {/* 원재료 목록 */}
        {ingredients.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-700">
                원재료 목록 ({ingredients.length}개)
              </h3>
              <span
                className={`text-sm font-medium ${
                  totalPercent > 100 ? 'text-red-500' : 'text-slate-500'
                }`}
              >
                합계: {totalPercent.toFixed(1)}%
              </span>
            </div>

            <div className="space-y-2">
              {ingredients.map((ingredient, index) => {
                const allergen = detectAllergen(ingredient.name);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      allergen ? 'bg-yellow-50 border border-yellow-200' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-400 w-6">{index + 1}</span>
                      <div>
                        <span
                          className={`font-medium ${allergen ? 'text-yellow-800' : 'text-slate-700'}`}
                        >
                          {ingredient.name}
                        </span>
                        {allergen && (
                          <span className="ml-2 text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">
                            ⚠️ {allergen}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600">
                        {ingredient.percent}%
                      </span>
                      <button
                        onClick={() => handleRemove(index)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="삭제"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  </div>
                );
              })}
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
            onClick={handleNext}
            className="flex-1 py-4 bg-deep-blue text-white rounded-xl font-bold text-lg hover:bg-navy transition-colors flex items-center justify-center gap-2"
          >
            다음
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
