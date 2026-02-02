# Coding Convention (코딩 컨벤션)

> 새봄컨설팅 - 코드 작성 가이드

---

## 1. 프로젝트 구조

```
newbom-homepage/
├── src/
│   ├── components/          # 재사용 컴포넌트
│   │   ├── common/          # 공통 UI (Button, Card, Input)
│   │   ├── landing/         # 랜딩 페이지 섹션
│   │   │   ├── Hero.astro
│   │   │   ├── ValueProposition.astro
│   │   │   ├── Services.astro
│   │   │   └── ...
│   │   └── label-ai/        # 라벨링 서비스 (React)
│   │       ├── LabelAI.tsx
│   │       ├── Step1.tsx
│   │       ├── Step2.tsx
│   │       ├── Step3.tsx
│   │       ├── Step4.tsx
│   │       └── hooks/
│   │
│   ├── layouts/
│   │   └── Layout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── label.astro
│   │   └── api/
│   │       └── send-lead.ts
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── lib/
│       ├── utils.ts
│       ├── constants.ts
│       └── types.ts
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│
├── e2e/
│   └── *.spec.ts
│
├── docs/
│   └── planning/
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. 네이밍 컨벤션

### 2.1 파일/폴더명

| 유형           | 규칙       | 예시           |
| -------------- | ---------- | -------------- |
| Astro 컴포넌트 | PascalCase | `Hero.astro`   |
| React 컴포넌트 | PascalCase | `LabelAI.tsx`  |
| 유틸리티       | camelCase  | `utils.ts`     |
| 상수           | camelCase  | `constants.ts` |
| 타입           | camelCase  | `types.ts`     |
| API 라우트     | kebab-case | `send-lead.ts` |
| 폴더           | kebab-case | `label-ai/`    |

### 2.2 변수/함수명

| 유형            | 규칙                 | 예시                    |
| --------------- | -------------------- | ----------------------- |
| 변수            | camelCase            | `productName`           |
| 함수            | camelCase            | `handleSubmit`          |
| 상수            | SCREAMING_SNAKE_CASE | `MAX_INGREDIENTS`       |
| 컴포넌트        | PascalCase           | `ValueCard`             |
| 타입/인터페이스 | PascalCase           | `LeadRequest`           |
| 불리언          | is/has/should 접두어 | `isLoading`, `hasError` |

### 2.3 CSS 클래스명

Tailwind CSS 사용으로 별도 클래스명 규칙 불필요.
커스텀 클래스가 필요한 경우 kebab-case 사용.

```css
/* 예외적으로 필요한 경우 */
.label-output { ... }
.step-indicator { ... }
```

---

## 3. TypeScript

### 3.1 타입 정의

```typescript
// types.ts
export interface Ingredient {
  name: string;
  percent: number;
}

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
```

### 3.2 타입 사용 규칙

```typescript
// ✅ 좋음: 명시적 타입
const ingredients: Ingredient[] = [];

// ✅ 좋음: 함수 파라미터/반환 타입
function calculateSalt(sodium: number): number {
  return (sodium * 2.5) / 1000;
}

// ❌ 피함: any 타입
const data: any = {};

// ✅ 좋음: unknown + 타입 가드
function parseData(data: unknown): LeadRequest | null {
  if (isLeadRequest(data)) {
    return data;
  }
  return null;
}
```

### 3.3 엄격 모드

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## 4. React 컴포넌트

### 4.1 컴포넌트 구조

```tsx
// Step1.tsx
import { useState } from 'react';
import type { ProjectSettings } from '../lib/types';

interface Step1Props {
  onNext: (data: ProjectSettings) => void;
  initialData?: ProjectSettings;
}

export function Step1({ onNext, initialData }: Step1Props) {
  // 1. 상태 선언
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [productName, setProductName] = useState(initialData?.productName ?? '');
  const [error, setError] = useState<string | null>(null);

  // 2. 핸들러 함수
  const handleSubmit = () => {
    if (!email || !productName) {
      setError('필수 항목을 입력하세요');
      return;
    }
    onNext({ email, productName /* ... */ });
  };

  // 3. 렌더링
  return <div className="space-y-4">{/* JSX */}</div>;
}
```

### 4.2 Hooks 규칙

```tsx
// ✅ 좋음: 커스텀 훅 추출
function useLabelForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return { step, data, nextStep, prevStep, setData };
}

// 사용
function LabelAI() {
  const { step, data, nextStep, prevStep, setData } = useLabelForm();
  // ...
}
```

### 4.3 이벤트 핸들러 네이밍

```tsx
// ✅ 좋음: handle + 동작
const handleSubmit = () => {};
const handleInputChange = () => {};
const handleStepNext = () => {};

// ❌ 피함: 모호한 이름
const click = () => {};
const change = () => {};
```

---

## 5. Astro 컴포넌트

### 5.1 기본 구조

```astro
---
// 1. 임포트
import Layout from '../layouts/Layout.astro';
import Hero from '../components/landing/Hero.astro';

// 2. Props 정의
interface Props {
  title: string;
}

// 3. 데이터 처리
const { title } = Astro.props;
const services = await getServices();
---

<!-- 4. 템플릿 -->
<Layout title={title}>
  <Hero />
  <!-- ... -->
</Layout>

<!-- 5. 스타일 (필요시) -->
<style>
  /* scoped styles */
</style>

<!-- 6. 스크립트 (필요시) -->
<script>
  // client-side JavaScript
</script>
```

### 5.2 React Island 사용

```astro
---
import { LabelAI } from '../components/label-ai/LabelAI';
---

<!-- client:load - 페이지 로드 시 즉시 하이드레이션 -->
<LabelAI client:load />

<!-- client:visible - 뷰포트에 들어올 때 하이드레이션 -->
<LabelAI client:visible />
```

---

## 6. 스타일링 (Tailwind)

### 6.1 클래스 순서

```tsx
// 순서: 레이아웃 → 사이징 → 스페이싱 → 타이포그래피 → 색상 → 기타
<div className="
  flex flex-col          /* 레이아웃 */
  w-full max-w-lg        /* 사이징 */
  p-6 space-y-4          /* 스페이싱 */
  text-lg font-semibold  /* 타이포그래피 */
  bg-white text-gray-900 /* 색상 */
  rounded-lg shadow-md   /* 기타 */
">
```

### 6.2 반복되는 스타일 추출

```tsx
// ✅ 좋음: 자주 쓰는 조합을 변수로
const buttonBase = 'px-6 py-3 font-semibold rounded-lg transition-colors';
const buttonPrimary = `${buttonBase} bg-blue-600 text-white hover:bg-blue-700`;
const buttonSecondary = `${buttonBase} bg-gray-200 text-gray-800 hover:bg-gray-300`;

<button className={buttonPrimary}>제출</button>;
```

### 6.3 조건부 클래스

```tsx
import { clsx } from 'clsx';

<button
  className={clsx(
    "px-6 py-3 rounded-lg font-semibold",
    isActive && "bg-blue-600 text-white",
    !isActive && "bg-gray-200 text-gray-800",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
>
```

---

## 7. API 라우트

### 7.1 기본 구조

```typescript
// src/pages/api/send-lead.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { leadRequestSchema } from '../../lib/schemas';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. 요청 파싱
    const body = await request.json();

    // 2. 유효성 검사
    const result = leadRequestSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: result.error.message },
        }),
        { status: 400 }
      );
    }

    // 3. 비즈니스 로직
    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: 'newbom@newbom.co.kr',
      subject: `[리드] ${result.data.productName} - ${result.data.email}`,
      html: formatLeadEmail(result.data),
    });

    // 4. 성공 응답
    return new Response(JSON.stringify({ success: true, message: '이메일이 전송되었습니다.' }), {
      status: 200,
    });
  } catch (error) {
    // 5. 에러 응답
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' },
      }),
      { status: 500 }
    );
  }
};
```

---

## 8. 에러 처리

### 8.1 클라이언트 에러

```tsx
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setError(null);
  setIsLoading(true);

  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    // 성공 처리
  } catch (err) {
    setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    setIsLoading(false);
  }
};
```

### 8.2 사용자 친화적 메시지

```typescript
// lib/errors.ts
export const ERROR_MESSAGES = {
  VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  INTERNAL_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
} as const;
```

---

## 9. 상수 관리

### 9.1 constants.ts

```typescript
// lib/constants.ts

// 알러지 유발 물질 (EU 14대 알러젠)
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

// 수출 대상 마켓
export const TARGET_MARKETS = ['EU', 'US'] as const;

// 영양성분 기본값
export const DEFAULT_NUTRITION = {
  kcal: 0,
  sodium: 0,
  fat: 0,
  saturates: 0,
  carbs: 0,
  sugars: 0,
  protein: 0,
  fibre: 0,
};

// 외부 URL
export const EXTERNAL_URLS = {
  KAKAO_CHANNEL: 'https://pf.kakao.com/xxxxx', // 실제 URL로 교체
  EMAIL: 'newbom@newbom.co.kr',
};
```

---

## 10. 테스트

### 10.1 E2E 테스트 구조

```typescript
// e2e/landing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  test('페이지 로드 및 히어로 섹션 표시', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('AI로 더 빠르게');
  });

  test('무료 라벨링 버튼 클릭 시 /label로 이동', async ({ page }) => {
    await page.goto('/');
    await page.click('text=무료 라벨링 체험하기');
    await expect(page).toHaveURL('/label');
  });
});
```

### 10.2 테스트 네이밍

```typescript
// ✅ 좋음: Given-When-Then 또는 행동 설명
test('이메일 미입력 시 에러 메시지 표시', async () => {});
test('Step 4 완료 시 이메일이 발송된다', async () => {});

// ❌ 피함: 모호한 이름
test('test1', async () => {});
test('email test', async () => {});
```

---

## 11. 커밋 메시지

### 11.1 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 11.2 Type

| Type     | 설명             |
| -------- | ---------------- |
| feat     | 새로운 기능      |
| fix      | 버그 수정        |
| docs     | 문서 변경        |
| style    | 코드 포맷팅      |
| refactor | 리팩토링         |
| test     | 테스트 추가/수정 |
| chore    | 빌드/설정 변경   |

### 11.3 예시

```
feat(label): Step 1 프로젝트 설정 화면 구현

- 이메일, 제품명, 수출 마켓 입력 폼 추가
- 유효성 검사 로직 구현
- 다음 단계 이동 기능 추가

Closes #12
```

---

## 12. 주석

### 12.1 주석 규칙

```typescript
// ✅ 좋음: 왜(Why)를 설명
// EU FIC Article 30(4)에 따라 나트륨을 소금으로 환산
const salt = (sodium * 2.5) / 1000;

// ❌ 피함: 무엇(What)만 설명 (코드로 알 수 있음)
// 나트륨을 소금으로 변환
const salt = (sodium * 2.5) / 1000;
```

### 12.2 TODO 주석

```typescript
// TODO: PDF 다운로드 기능 구현 (#15)
// FIXME: Safari에서 클립보드 복사 안 됨
// NOTE: EU와 US의 단위 차이에 주의
```

---

## 13. 린터 설정

### 13.1 ESLint

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['warn', { allow: ['error'] }],
  },
};
```

### 13.2 Prettier

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## 요약 체크리스트

- [ ] 파일명은 규칙에 맞게 작성
- [ ] TypeScript 타입 명시
- [ ] any 타입 사용 금지
- [ ] 컴포넌트는 단일 책임 원칙
- [ ] 에러 처리 및 사용자 친화적 메시지
- [ ] 상수는 constants.ts에서 관리
- [ ] 커밋 메시지는 컨벤션 준수
- [ ] 린터/포맷터 통과
