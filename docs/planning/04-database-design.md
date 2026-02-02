# Database Design (데이터베이스 설계)

> 새봄컨설팅 - 데이터 설계

---

## 개요

**이 프로젝트는 데이터베이스가 없습니다.**

모든 데이터는 이메일로 전송되며, 별도 저장소가 필요하지 않습니다.

---

## 데이터 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                         데이터 흐름                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  사용자 입력                                                     │
│      │                                                          │
│      ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  라벨링 서비스 (클라이언트 상태)                         │   │
│  │                                                          │   │
│  │  - 이메일: string                                        │   │
│  │  - 제품명: string                                        │   │
│  │  - 수출 마켓: "EU" | "US"                                │   │
│  │  - 판매 언어: string                                     │   │
│  │  - 원재료: { name: string, percent: number }[]           │   │
│  │  - 영양성분: NutritionData                               │   │
│  │  - 라벨 결과: string                                     │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│      │                                                          │
│      │ Step 4 완료 시                                          │
│      ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Astro API Route (/api/send-lead)                        │   │
│  │                                                          │   │
│  │  - 입력 데이터 검증 (Zod)                                │   │
│  │  - Resend API 호출                                       │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│      │                                                          │
│      ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Resend → newbom@newbom.co.kr                            │   │
│  │                                                          │   │
│  │  이메일 내용:                                            │   │
│  │  - 리드 이메일                                           │   │
│  │  - 제품 정보                                             │   │
│  │  - 생성된 라벨 초안                                      │   │
│  │  - 타임스탬프                                            │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 데이터 스키마

### 리드 데이터 (이메일 전송용)

```typescript
// 리드 요청 스키마
interface LeadRequest {
  // 연락처
  email: string;

  // 프로젝트 정보
  productName: string;
  targetMarket: 'EU' | 'US';
  targetLanguage: string;

  // 원재료
  ingredients: Array<{
    name: string;
    percent: number;
  }>;

  // 영양성분
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

  // 결과
  labelOutput: string;
  complianceScore: number;

  // 메타데이터
  timestamp: string;
  userAgent: string;
}
```

### Zod 스키마 (서버 검증용)

```typescript
import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(1),
  percent: z.number().min(0).max(100),
});

const nutritionSchema = z.object({
  kcal: z.number().min(0),
  sodium: z.number().min(0),
  fat: z.number().min(0),
  saturates: z.number().min(0),
  carbs: z.number().min(0),
  sugars: z.number().min(0),
  protein: z.number().min(0),
  fibre: z.number().min(0),
});

export const leadRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  productName: z.string().min(1),
  targetMarket: z.enum(['EU', 'US']),
  targetLanguage: z.string(),
  ingredients: z.array(ingredientSchema),
  nutrition: nutritionSchema,
  labelOutput: z.string(),
  complianceScore: z.number().min(0).max(100),
});
```

---

## 로컬 스토리지 활용 (선택적)

사용자 편의를 위해 브라우저 로컬 스토리지에 임시 저장할 수 있습니다.

### 저장 항목

| 키            | 용도                       | 만료         |
| ------------- | -------------------------- | ------------ |
| `label-draft` | 입력 중인 데이터 임시 저장 | 세션 종료 시 |
| `label-email` | 이메일 기억하기 (선택)     | 30일         |

### 구현

```typescript
// 저장
const saveDraft = (data: Partial<LeadRequest>) => {
  localStorage.setItem('label-draft', JSON.stringify(data));
};

// 복원
const loadDraft = (): Partial<LeadRequest> | null => {
  const saved = localStorage.getItem('label-draft');
  return saved ? JSON.parse(saved) : null;
};

// 삭제 (제출 완료 후)
const clearDraft = () => {
  localStorage.removeItem('label-draft');
};
```

---

## 분석 데이터

### Vercel Analytics

Vercel Analytics를 통해 수집되는 데이터:

| 데이터            | 용도        |
| ----------------- | ----------- |
| 페이지 조회수     | 트래픽 분석 |
| 사용자 흐름       | 전환율 분석 |
| 디바이스/브라우저 | 최적화 타겟 |
| 지역              | 마케팅 타겟 |

### 커스텀 이벤트 (선택적)

```typescript
// Vercel Analytics 커스텀 이벤트
import { track } from '@vercel/analytics';

// 라벨링 시작
track('label_start', { market: 'EU' });

// 라벨링 완료
track('label_complete', { market: 'EU', score: 95 });

// CTA 클릭
track('cta_click', { location: 'hero' });
```

---

## 향후 확장 고려사항

데이터베이스가 필요해지는 시점:

| 기능        | 필요한 데이터          | 추천 솔루션        |
| ----------- | ---------------------- | ------------------ |
| 고객 포털   | 사용자 계정, 의뢰 이력 | Supabase           |
| 견적 자동화 | 견적 요청 기록         | Supabase           |
| 블로그      | 콘텐츠 관리            | Notion API or MDX  |
| 리드 관리   | CRM 데이터             | Notion or Airtable |

**현재 MVP에서는 불필요합니다.**

---

## 요약

| 항목            | 현재 상태           |
| --------------- | ------------------- |
| 데이터베이스    | 없음                |
| 데이터 저장     | 이메일 전송만       |
| 클라이언트 상태 | React State         |
| 임시 저장       | LocalStorage (선택) |
| 분석            | Vercel Analytics    |
