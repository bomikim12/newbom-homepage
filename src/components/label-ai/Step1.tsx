/**
 * Step 1: 프로젝트 설정
 * @TASK P3-S1-T1
 * @SPEC docs/planning/06-screens.md#2.1
 */

import { useState } from 'react';
import type { ProjectSettings } from '../../lib/types';

interface Step1Props {
  data: ProjectSettings;
  onUpdate: (data: Partial<ProjectSettings>) => void;
  onNext: () => void;
}

export function Step1({ data, onUpdate, onNext }: Step1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!data.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!validateEmail(data.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }

    if (!data.productName) {
      newErrors.productName = '제품명을 입력해주세요';
    }

    if (!data.targetLanguage) {
      newErrors.targetLanguage = '판매 언어를 입력해주세요';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">프로젝트 설정</h2>
        <p className="text-slate-600">제품 정보와 수출 대상국을 입력해주세요</p>
      </div>

      <div className="space-y-6">
        {/* 이메일 */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => {
              onUpdate({ email: e.target.value });
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? 'border-red-500' : 'border-slate-200'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="example@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          <p className="mt-1 text-xs text-slate-400">
            결과물을 이메일로 받으시려면 정확한 이메일을 입력해주세요
          </p>
        </div>

        {/* 제품명 */}
        <div>
          <label htmlFor="productName" className="block text-sm font-bold text-slate-700 mb-2">
            제품명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            value={data.productName}
            onChange={(e) => {
              onUpdate({ productName: e.target.value });
              if (errors.productName) setErrors((prev) => ({ ...prev, productName: '' }));
            }}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.productName ? 'border-red-500' : 'border-slate-200'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="예: 신라면, 고추장, 김치"
          />
          {errors.productName && <p className="mt-1 text-sm text-red-500">{errors.productName}</p>}
        </div>

        {/* 수출 대상 마켓 */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            수출 대상 마켓 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'EU', label: 'EU (유럽연합)', icon: 'public' },
              { value: 'US', label: 'US (미국)', icon: 'flag' },
            ].map((market) => (
              <button
                key={market.value}
                type="button"
                onClick={() => onUpdate({ targetMarket: market.value as 'EU' | 'US' })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  data.targetMarket === market.value
                    ? 'border-deep-blue bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      data.targetMarket === market.value ? 'text-deep-blue' : 'text-slate-400'
                    }`}
                  >
                    {market.icon}
                  </span>
                  <span
                    className={`font-bold ${
                      data.targetMarket === market.value ? 'text-deep-blue' : 'text-slate-700'
                    }`}
                  >
                    {market.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 판매 언어 */}
        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-bold text-slate-700 mb-2">
            판매 언어 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="targetLanguage"
            value={data.targetLanguage}
            onChange={(e) => {
              onUpdate({ targetLanguage: e.target.value });
              if (errors.targetLanguage) setErrors((prev) => ({ ...prev, targetLanguage: '' }));
            }}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.targetLanguage ? 'border-red-500' : 'border-slate-200'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="예: English, Deutsch, Français"
          />
          {errors.targetLanguage && (
            <p className="mt-1 text-sm text-red-500">{errors.targetLanguage}</p>
          )}
        </div>

        {/* 다음 단계 버튼 */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-deep-blue text-white rounded-xl font-bold text-lg hover:bg-navy transition-colors flex items-center justify-center gap-2"
          >
            다음 단계
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
