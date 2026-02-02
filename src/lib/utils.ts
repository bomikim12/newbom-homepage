// @TASK P0-T0.3 - 유틸리티 함수
// @SPEC docs/planning/07-coding-convention.md#타입-사용-규칙

/**
 * 나트륨(mg) → 소금(g) 변환
 * EU FIC Article 30(4)에 따라 나트륨 × 2.5 공식 사용
 *
 * @param sodium - 나트륨 함량 (mg)
 * @returns 소금 함량 (g)
 * @example
 * sodiumToSalt(400) // 1.0 (g)
 */
export function sodiumToSalt(sodium: number): number {
  return (sodium * 2.5) / 1000;
}

/**
 * kcal → kJ 변환
 * 1 kcal = 4.184 kJ
 *
 * @param kcal - 에너지 (kcal)
 * @returns 에너지 (kJ)
 * @example
 * kcalToKj(100) // 418
 */
export function kcalToKj(kcal: number): number {
  return Math.round(kcal * 4.184);
}

/**
 * 클래스 조합 유틸리티
 * 조건부 클래스를 안전하게 결합
 *
 * @param classes - 클래스 배열
 * @returns 결합된 클래스 문자열
 * @example
 * cn('base', isActive && 'active', 'final') // 'base active final'
 * cn('base', false && 'hidden', undefined) // 'base'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
