/**
 * Step 4: 최종 라벨 출력
 * @TASK P3-S1-T4
 * @SPEC docs/planning/06-screens.md#2.4
 */

import { useState } from 'react';
import type { Ingredient, NutritionData, ProjectSettings } from '../../lib/types';
import { sodiumToSalt, kcalToKj } from '../../lib/utils';
import { COMPANY_EMAIL, KAKAO_CHANNEL_URL } from '../../lib/constants';

interface Step4Props {
  projectSettings: ProjectSettings;
  ingredients: Ingredient[];
  nutrition: NutritionData;
  onPrev: () => void;
  onReset: () => void;
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
  CRUSTACEANS: ['갑각류', '새우', '게', '랍스터', 'shrimp', 'crab', 'lobster'],
  CELERY: ['셀러리', 'celery'],
  MUSTARD: ['겨자', 'mustard'],
  SESAME: ['참깨', '깨', 'sesame'],
  SULPHITES: ['아황산', 'sulphite', 'sulfite'],
  LUPIN: ['루핀', 'lupin'],
  MOLLUSCS: ['연체류', '조개', '굴', '오징어', 'mollusc', 'oyster', 'squid'],
};

export function Step4({
  projectSettings,
  ingredients,
  nutrition,
  onPrev,
  onReset,
}: Step4Props) {
  const [isCopied, setIsCopied] = useState(false);

  // 알러지 성분 감지
  const detectAllergens = (): string[] => {
    const detected: Set<string> = new Set();
    ingredients.forEach((ingredient) => {
      const lowerName = ingredient.name.toLowerCase();
      for (const [allergen, keywords] of Object.entries(ALLERGEN_KEYWORDS)) {
        if (keywords.some((keyword) => lowerName.includes(keyword.toLowerCase()))) {
          detected.add(allergen);
        }
      }
    });
    return Array.from(detected);
  };

  // 라벨 텍스트 생성
  const generateLabelOutput = (): string => {
    const allergens = detectAllergens();
    const isEU = projectSettings.targetMarket === 'EU';
    const salt = sodiumToSalt(nutrition.sodium);
    const kj = kcalToKj(nutrition.kcal);

    // 원재료 목록 (알러젠 강조)
    const ingredientList = ingredients
      .map((i) => {
        const isAllergen = detectAllergens().some((a) =>
          ALLERGEN_KEYWORDS[a]?.some((k) => i.name.toLowerCase().includes(k.toLowerCase()))
        );
        return isAllergen ? `**${i.name.toUpperCase()}**` : i.name;
      })
      .join(', ');

    let output = `=== ${projectSettings.productName} ===\n`;
    output += `Target Market: ${projectSettings.targetMarket}\n`;
    output += `Language: ${projectSettings.targetLanguage}\n\n`;

    output += `INGREDIENTS:\n`;
    output += `${ingredientList}\n\n`;

    if (allergens.length > 0) {
      output += `ALLERGENS: Contains ${allergens.join(', ')}\n\n`;
    }

    output += `NUTRITION INFORMATION (per 100g):\n`;
    if (isEU) {
      output += `Energy: ${nutrition.kcal} kcal / ${kj} kJ\n`;
    } else {
      output += `Calories: ${nutrition.kcal} kcal\n`;
    }
    output += `Fat: ${nutrition.fat} g\n`;
    output += `  of which saturates: ${nutrition.saturates} g\n`;
    output += `Carbohydrate: ${nutrition.carbs} g\n`;
    output += `  of which sugars: ${nutrition.sugars} g\n`;
    output += `Fibre: ${nutrition.fibre} g\n`;
    output += `Protein: ${nutrition.protein} g\n`;
    if (isEU) {
      output += `Salt: ${salt.toFixed(2)} g\n`;
    } else {
      output += `Sodium: ${nutrition.sodium} mg\n`;
    }

    return output;
  };

  const labelOutput = generateLabelOutput();
  const allergens = detectAllergens();

  // 규정 준수 체크리스트
  const complianceChecklist = [
    {
      label: '원재료 중량 순서대로 배열 (FIC Article 18)',
      checked: ingredients.every(
        (_, i, arr) => i === 0 || arr[i - 1].percent >= arr[i].percent
      ),
    },
    {
      label: '알레르기 유발 물질 강조 표기',
      checked: allergens.length === 0 || labelOutput.includes('**'),
    },
    {
      label: projectSettings.targetMarket === 'EU' ? '나트륨→소금 변환 (EU)' : '나트륨 표기 (US)',
      checked: true,
    },
    {
      label: projectSettings.targetMarket === 'EU' ? 'kJ/kcal 병기 (EU)' : 'kcal 표기 (US)',
      checked: true,
    },
    {
      label: '영양성분 필수 항목 포함',
      checked: Object.values(nutrition).every((v) => v >= 0),
    },
  ];

  const complianceScore = Math.round(
    (complianceChecklist.filter((c) => c.checked).length / complianceChecklist.length) * 100
  );

  // 클립보드 복사
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(labelOutput);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // 이메일 본문 생성 (mailto용)
  const generateEmailBody = () => {
    const body = `안녕하세요, 라벨링 전문가 검토를 요청합니다.

[프로젝트 정보]
- 제품명: ${projectSettings.productName}
- 수출 대상국: ${projectSettings.targetMarket}
- 판매 언어: ${projectSettings.targetLanguage}
- 규정 준수율: ${complianceScore}%

[생성된 라벨]
${labelOutput}

검토 부탁드립니다.
감사합니다.`;
    return encodeURIComponent(body);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <span className="text-sm font-bold text-green-700">라벨 생성 완료!</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">최종 라벨 출력</h2>
        <p className="text-slate-600">
          생성된 라벨 초안을 확인하고 필요시 전문가 검토를 받으세요
        </p>
      </div>

      <div className="space-y-6">
        {/* 규정 준수율 */}
        <div className="bg-slate-50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-700">규정 준수율</h3>
            <span
              className={`text-2xl font-extrabold ${
                complianceScore >= 80 ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {complianceScore}%
            </span>
          </div>
          <div className="space-y-2">
            {complianceChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-lg ${
                    item.checked ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {item.checked ? 'check_circle' : 'cancel'}
                </span>
                <span className={`text-sm ${item.checked ? 'text-slate-700' : 'text-red-600'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 라벨 출력 */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-400">생성된 라벨</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                {isCopied ? 'check' : 'content_copy'}
              </span>
              {isCopied ? '복사됨!' : '복사'}
            </button>
          </div>
          <pre className="font-mono text-sm text-slate-200 whitespace-pre-wrap overflow-x-auto leading-relaxed">
            {labelOutput}
          </pre>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-deep-blue to-navy p-6 rounded-xl text-white">
          <h3 className="text-xl font-bold mb-2">전문가 검토가 필요하신가요?</h3>
          <p className="text-white/80 text-sm mb-4">
            생성된 라벨 초안을 전문 관세사가 검토하여 법적 효력이 있는 서류로 완성해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${COMPANY_EMAIL}?subject=[전문가 검토 요청] ${encodeURIComponent(projectSettings.productName)}&body=${generateEmailBody()}`}
              className="flex-1 py-3 bg-white text-navy rounded-xl font-bold text-center hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">mail</span>
              전문가 검토 요청
            </a>
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-bold text-center hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              카카오톡 상담
            </a>
          </div>
        </div>

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
            onClick={onReset}
            className="flex-1 py-4 bg-deep-blue text-white rounded-xl font-bold text-lg hover:bg-navy transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">refresh</span>
            처음부터 다시
          </button>
        </div>
      </div>
    </div>
  );
}
