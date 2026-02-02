/**
 * Send Lead API
 * @TASK P3-R1-T1
 * @SPEC docs/planning/06-tasks.md#P3-R1-T1
 *
 * POST /api/send-lead
 * 리드 정보를 이메일로 발송
 */

import type { APIRoute } from 'astro';
import { leadRequestSchema } from '../../lib/schemas';
import { COMPANY_EMAIL } from '../../lib/constants';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. 요청 바디 파싱
    const body = await request.json();

    // 2. Zod 스키마로 검증
    const result = leadRequestSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '입력 정보를 확인해주세요.',
          details: result.error.flatten(),
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = result.data;

    // 3. 이메일 본문 생성
    const emailBody = formatEmailBody(data);

    // 4. Resend API로 이메일 발송
    const resendApiKey = import.meta.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      // 개발 환경에서는 콘솔에 출력하고 성공 응답
      if (import.meta.env.DEV) {
        console.log('=== Lead Email (DEV MODE) ===');
        console.log(`To: ${COMPANY_EMAIL}`);
        console.log(`From: ${data.email}`);
        console.log('Body:', emailBody);
        console.log('=============================');

        return new Response(
          JSON.stringify({
            success: true,
            message: '이메일이 전송되었습니다. (개발 모드)',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: '이메일 서비스가 설정되지 않았습니다.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Resend API 호출
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Global Label AI <noreply@newbom.co.kr>',
        to: COMPANY_EMAIL,
        reply_to: data.email,
        subject: `[라벨링 리드] ${data.productName} - ${data.targetMarket}`,
        html: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({
          success: false,
          error: '이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '이메일이 전송되었습니다.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Send lead error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

/**
 * 이메일 본문 포맷팅
 */
function formatEmailBody(data: {
  email: string;
  productName: string;
  targetMarket: 'EU' | 'US';
  targetLanguage: string;
  ingredients: Array<{ name: string; percent: number }>;
  nutrition: {
    kcal: number;
    sodium: number;
    fat: number;
    saturates: number;
    carbs: number;
    sugars: number;
    protein: number;
    fibre: number;
  };
  labelOutput: string;
  complianceScore: number;
}): string {
  const ingredientList = data.ingredients
    .map((i) => `<li>${i.name}: ${i.percent}%</li>`)
    .join('');

  return `
    <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0F172A; border-bottom: 2px solid #1E3A5F; padding-bottom: 10px;">
        🌱 새로운 라벨링 리드
      </h1>

      <h2 style="color: #1E3A5F;">📋 프로젝트 정보</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>이메일</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>제품명</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.productName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>수출 대상국</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.targetMarket}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>판매 언어</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.targetLanguage}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>규정 준수율</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.complianceScore}%</td>
        </tr>
      </table>

      <h2 style="color: #1E3A5F; margin-top: 24px;">🥗 원재료</h2>
      <ul style="background: #f8fafc; padding: 16px 32px; border-radius: 8px;">
        ${ingredientList}
      </ul>

      <h2 style="color: #1E3A5F; margin-top: 24px;">📊 영양성분 (100g 기준)</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>에너지</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.kcal} kcal</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>나트륨</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.sodium} mg</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>지방</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.fat} g</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>포화지방</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.saturates} g</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>탄수화물</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.carbs} g</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>당류</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.sugars} g</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>단백질</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.protein} g</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>식이섬유</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${data.nutrition.fibre} g</td>
        </tr>
      </table>

      <h2 style="color: #1E3A5F; margin-top: 24px;">📝 생성된 라벨</h2>
      <pre style="background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 12px; line-height: 1.6;">
${data.labelOutput}
      </pre>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
      <p style="color: #64748b; font-size: 12px;">
        이 이메일은 Global Label AI 서비스에서 자동으로 발송되었습니다.<br />
        문의: <a href="mailto:${data.email}">${data.email}</a>
      </p>
    </div>
  `;
}
