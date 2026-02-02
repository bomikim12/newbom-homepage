// @TASK P0-T0.3 - 상수 정의
// @SPEC docs/planning/07-coding-convention.md#상수-관리

import type { NutritionData } from './types';

/**
 * EU 14대 알러지 유발 물질
 * @see EU Regulation 1169/2011 Annex II
 */
export const ALLERGENS = [
  'WHEAT',
  'SOY',
  'FISH',
  'EGG',
  'MILK',
  'NUTS',
  'PEANUTS',
  'CRUSTACEANS',
  'CELERY',
  'MUSTARD',
  'SESAME',
  'SULPHITES',
  'LUPIN',
  'MOLLUSCS',
] as const;

/**
 * 수출 대상 마켓
 */
export const TARGET_MARKETS = ['EU', 'US'] as const;

/**
 * 영양성분 기본값
 */
export const DEFAULT_NUTRITION: NutritionData = {
  kcal: 0,
  sodium: 0,
  fat: 0,
  saturates: 0,
  carbs: 0,
  sugars: 0,
  protein: 0,
  fibre: 0,
};

/**
 * 외부 URL
 */
export const EXTERNAL_URLS = {
  KAKAO_CHANNEL: 'https://open.kakao.com/me/newbom3',
  EMAIL: 'newbom@newbom.co.kr',
};

/**
 * 회사 이메일
 */
export const COMPANY_EMAIL = EXTERNAL_URLS.EMAIL;

/**
 * 카카오톡 채널 URL
 */
export const KAKAO_CHANNEL_URL = EXTERNAL_URLS.KAKAO_CHANNEL;

/**
 * 에러 메시지
 */
export const ERROR_MESSAGES = {
  VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  INTERNAL_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
} as const;
