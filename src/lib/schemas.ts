/**
 * Zod 스키마 정의
 * @TASK P3-R1-T1
 * @SPEC docs/planning/06-tasks.md#P3-R1-T1
 */

import { z } from 'zod';

/**
 * 원재료 스키마
 */
export const ingredientSchema = z.object({
  name: z.string().min(1, '원재료명을 입력해주세요'),
  percent: z.number().min(0).max(100),
});

/**
 * 영양성분 스키마 (100g 기준)
 */
export const nutritionSchema = z.object({
  kcal: z.number().min(0),
  sodium: z.number().min(0),
  fat: z.number().min(0),
  saturates: z.number().min(0),
  carbs: z.number().min(0),
  sugars: z.number().min(0),
  protein: z.number().min(0),
  fibre: z.number().min(0),
});

/**
 * 리드 요청 스키마
 */
export const leadRequestSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  productName: z.string().min(1, '제품명을 입력해주세요'),
  targetMarket: z.enum(['EU', 'US']),
  targetLanguage: z.string().min(1, '판매 언어를 입력해주세요'),
  ingredients: z.array(ingredientSchema).min(1, '최소 1개의 원재료를 입력해주세요'),
  nutrition: nutritionSchema,
  labelOutput: z.string(),
  complianceScore: z.number().min(0).max(100),
});

/**
 * 프로젝트 설정 스키마 (Step 1)
 */
export const projectSettingsSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  productName: z.string().min(1, '제품명을 입력해주세요'),
  targetMarket: z.enum(['EU', 'US']),
  targetLanguage: z.string().min(1, '판매 언어를 입력해주세요'),
});

export type LeadRequestInput = z.infer<typeof leadRequestSchema>;
export type ProjectSettingsInput = z.infer<typeof projectSettingsSchema>;
