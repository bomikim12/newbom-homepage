// @TASK P0-T0.3 - 타입 정의
// @SPEC docs/planning/07-coding-convention.md#typescript

/**
 * 원재료
 */
export interface Ingredient {
  name: string;
  percent: number;
}

/**
 * 영양성분 (100g 기준)
 */
export interface NutritionData {
  kcal: number;
  sodium: number;
  fat: number;
  saturates: number;
  carbs: number;
  sugars: number;
  protein: number;
  fibre: number;
}

/**
 * 리드 요청 데이터
 */
export interface LeadRequest {
  email: string;
  productName: string;
  targetMarket: 'EU' | 'US';
  targetLanguage: string;
  ingredients: Ingredient[];
  nutrition: NutritionData;
  labelOutput: string;
  complianceScore: number;
}

/**
 * 프로젝트 설정 (Step 1)
 */
export interface ProjectSettings {
  email: string;
  productName: string;
  targetMarket: 'EU' | 'US';
  targetLanguage: string;
}
