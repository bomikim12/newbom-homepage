# CLAUDE.md - 새봄컨설팅 홈페이지

> AI 코딩 어시스턴트를 위한 프로젝트 컨텍스트

---

## 프로젝트 개요

| 항목           | 내용                                                              |
| -------------- | ----------------------------------------------------------------- |
| **프로젝트명** | 새봄컨설팅 홈페이지 (newbom.co.kr)                                |
| **설명**       | 해외 수출 인증·허가 원스톱 대행 서비스 소개 및 무료 라벨링 서비스 |
| **기술 스택**  | Astro 4.x + React 18 + Tailwind CSS + Resend                      |
| **배포**       | Vercel                                                            |

---

## 핵심 기능

1. **랜딩 페이지 (`/`)**: 서비스 소개, 가격, 신뢰 구축
2. **무료 라벨링 서비스 (`/label`)**: 4단계 위저드로 EU/US 라벨 초안 생성

---

## 디자인 참고

**insightflo-homepage** 디자인 패턴 기반:

- 경로: `/Users/kwak/Projects/ai/insightflo-homepage`
- 컬러: Navy-Blue (#0F172A, #1E3A5F)
- 폰트: Pretendard
- 아이콘: Material Symbols Outlined
- 히어로: 그라디언트 + tech-pattern + blur 효과

---

## 기획 문서

| 문서              | 경로                                    | 설명                  |
| ----------------- | --------------------------------------- | --------------------- |
| PRD               | `docs/planning/01-prd.md`               | 제품 요구사항         |
| TRD               | `docs/planning/02-trd.md`               | 기술 요구사항         |
| User Flow         | `docs/planning/03-user-flow.md`         | 사용자 흐름도         |
| Database          | `docs/planning/04-database-design.md`   | 데이터 설계 (DB 없음) |
| Design System     | `docs/planning/05-design-system.md`     | 디자인 시스템         |
| Screens           | `docs/planning/06-screens.md`           | 화면 명세             |
| TASKS             | `docs/planning/06-tasks.md`             | 개발 태스크           |
| Coding Convention | `docs/planning/07-coding-convention.md` | 코딩 컨벤션           |

---

## 프로젝트 구조

```
newbom-homepage/
├── src/
│   ├── components/
│   │   ├── common/         # Header, Footer, Button, Card
│   │   ├── landing/        # Hero, Services, FAQ 등 섹션
│   │   └── label-ai/       # React 라벨링 서비스 (Step1~4)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro     # 랜딩 페이지
│   │   ├── label.astro     # 라벨링 서비스
│   │   └── api/
│   │       └── send-lead.ts
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       ├── utils.ts
│       ├── constants.ts
│       └── types.ts
├── public/
├── e2e/
├── docs/planning/
└── package.json
```

---

## 주요 타입

```typescript
// 원재료
interface Ingredient {
  name: string;
  percent: number;
}

// 영양성분
interface NutritionData {
  kcal: number;
  sodium: number;
  fat: number;
  saturates: number;
  carbs: number;
  sugars: number;
  protein: number;
  fibre: number;
}

// 리드 요청
interface LeadRequest {
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

---

## API 엔드포인트

### POST /api/send-lead

리드 정보를 이메일로 발송

**Request:**

```json
{
  "email": "user@example.com",
  "productName": "Spicy Instant Noodle",
  "targetMarket": "EU",
  "ingredients": [...],
  "nutrition": {...},
  "labelOutput": "..."
}
```

**Response:**

```json
{ "success": true, "message": "이메일이 전송되었습니다." }
```

---

## 개발 규칙

### 네이밍

- 컴포넌트: PascalCase (`Hero.astro`, `LabelAI.tsx`)
- 유틸리티: camelCase (`utils.ts`)
- 폴더: kebab-case (`label-ai/`)

### Tailwind 클래스 순서

1. 레이아웃 (flex, grid)
2. 사이징 (w, h, max-w)
3. 스페이싱 (p, m, gap)
4. 타이포그래피 (text, font)
5. 색상 (bg, text)
6. 기타 (rounded, shadow)

### 커밋 메시지

```
feat(landing): Hero 섹션 구현
fix(label): Step 2 알러지 감지 오류 수정
```

---

## 주요 상수

```typescript
// EU 14대 알러젠
const ALLERGENS = [
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
];

// 나트륨 → 소금 변환 (EU FIC Article 30)
const salt = (sodium * 2.5) / 1000;

// kcal → kJ 변환
const kJ = kcal * 4.184;
```

---

## 환경 변수

| 변수                   | 설명              | 필수 |
| ---------------------- | ----------------- | ---- |
| `RESEND_API_KEY`       | Resend API 키     | ✅   |
| `PUBLIC_KAKAO_CHANNEL` | 카카오톡 채널 URL | 선택 |

---

## 명령어

```bash
# 개발 서버
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint

# E2E 테스트
pnpm test:e2e
```

---

## 태스크 진행

**현재 Phase**: Phase 0 (Setup)

**다음 태스크**: `P0-T0.1: Astro 프로젝트 초기화`

전체 태스크 목록: `docs/planning/06-tasks.md`
