# Design System (디자인 시스템)

> 새봄컨설팅 - 시각적 언어 및 컴포넌트 가이드
>
> **Reference**: insightflo-homepage 디자인 패턴 기반

---

## 1. 브랜드 아이덴티티

### 1.1 브랜드 키워드

| 키워드     | 의미                                            |
| ---------- | ----------------------------------------------- |
| **신뢰**   | 전문 관세사 검토, 11년 경력, 전문가배상책임보험 |
| **전문성** | AI 자동화 + 관세사 검토, 정확한 규정 반영       |
| **합리적** | AI 자동화로 비용 절감, 투명한 가격              |
| **혁신**   | AI 신청서 자동 작성, 빠른 처리                  |

### 1.2 톤 & 보이스

| 상황   | 톤                  | 예시                                   |
| ------ | ------------------- | -------------------------------------- |
| 히어로 | 자신감 있는, 직설적 | "AI로 더 빠르게, 관세사로 더 정확하게" |
| 가격   | 투명한, 비교 강조   | "기존 2,400만원 → 160만원"             |
| FAQ    | 친근한, 설명적      | "걱정 마세요. 설명드릴게요."           |
| CTA    | 행동 유도, 저부담   | "무료 견적 받기"                       |

---

## 2. 컬러 시스템

### 2.1 Primary Colors (Navy-Blue 계열)

```css
/* Primary - 신뢰감 있는 Navy-Blue (insightflo 스타일) */
--navy: #0f172a; /* 가장 진한 네이비 - 제목, 강조 */
--deep-blue: #1e3a5f; /* 딥블루 - CTA, 아이콘 */
--accent-blue: #3b82f6; /* 액센트 블루 - 링크, 체크 아이콘 */

/* Primary Scale */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;
```

### 2.2 Secondary Colors

```css
/* Secondary - 성공/신뢰의 그린 */
--secondary-50: #ecfdf5;
--secondary-500: #10b981;
--secondary-600: #059669;
```

### 2.3 Neutral Colors (Slate 계열)

```css
/* Slate Scale (insightflo 스타일) */
--slate-50: #f8fafc; /* 섹션 배경 */
--slate-100: #f1f5f9; /* 카드 호버 배경 */
--slate-200: #e2e8f0; /* 보더 */
--slate-400: #94a3b8; /* 보조 텍스트 */
--slate-500: #64748b; /* 설명 텍스트 */
--slate-600: #475569; /* 본문 텍스트 */
--slate-800: #1e293b; /* 강조 텍스트 */
```

### 2.4 Semantic Colors

```css
/* 상태 색상 */
--success: #10b981; /* 체크, 성공 */
--warning: #f97316; /* 주의, 알림 */
--error: #ef4444; /* 오류, 위험 */
--info: #3b82f6; /* 정보 */
```

### 2.5 사용 가이드

| 용도             | 색상                 | Tailwind 클래스                     |
| ---------------- | -------------------- | ----------------------------------- |
| CTA 버튼         | deep-blue            | `bg-deep-blue text-white`           |
| 보조 버튼        | white + border       | `bg-white border border-slate-200`  |
| Ghost 버튼       | transparent + border | `border border-white/30 text-white` |
| 성공 상태        | secondary-500        | `text-green-500`                    |
| 섹션 배경 (밝음) | slate-50             | `bg-slate-50`                       |
| 섹션 배경 (어둠) | hero-gradient        | `hero-gradient`                     |
| 텍스트 (제목)    | navy                 | `text-navy`                         |
| 텍스트 (본문)    | slate-600            | `text-slate-600`                    |
| 텍스트 (보조)    | slate-400            | `text-slate-400`                    |

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

```css
/* 기본 폰트 - Pretendard (한국어 최적화) */
font-family:
  'Pretendard',
  -apple-system,
  BlinkMacSystemFont,
  sans-serif;

/* 아이콘 - Material Symbols Outlined */
/* CDN: https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined */
```

### 3.2 타입 스케일

| 레벨    | 크기    | 굵기 | Tailwind                                      | 용도            |
| ------- | ------- | ---- | --------------------------------------------- | --------------- |
| Display | 48-72px | 800  | `text-5xl md:text-7xl font-extrabold`         | 히어로 헤드라인 |
| H1      | 36-48px | 700  | `text-4xl md:text-5xl font-bold`              | 섹션 제목       |
| H2      | 30px    | 700  | `text-4xl font-bold`                          | 서브 섹션       |
| H3      | 24px    | 700  | `text-2xl font-bold`                          | 카드 제목       |
| H4      | 20px    | 600  | `text-xl font-bold`                           | 작은 제목       |
| Body-lg | 20px    | 400  | `text-xl`                                     | 주요 설명       |
| Body    | 16px    | 400  | `text-base`                                   | 기본 본문       |
| Body-sm | 14px    | 400  | `text-sm`                                     | 보조 텍스트     |
| Caption | 12px    | 600  | `text-sm font-bold uppercase tracking-widest` | 섹션 레이블     |

### 3.3 줄 높이

| 용도        | Tailwind          |
| ----------- | ----------------- |
| 제목        | `leading-tight`   |
| 본문        | `leading-relaxed` |
| 짧은 텍스트 | `leading-normal`  |

---

## 4. 스페이싱 시스템

### 4.1 섹션 패딩

```css
/* 섹션 상하 패딩 */
.section {
  padding: 96px 0;
} /* py-24 */

/* 컨테이너 */
.container {
  max-width: 1280px; /* max-w-7xl */
  margin: 0 auto;
  padding: 0 24px; /* px-6 */
}
```

### 4.2 섹션 간격

| 요소           | 간격    | Tailwind       |
| -------------- | ------- | -------------- |
| 섹션 상하      | 96px    | `py-24`        |
| 섹션 헤더 아래 | 80px    | `mb-20`        |
| 카드 간        | 32px    | `gap-8`        |
| 카드 내부      | 40-56px | `p-10 md:p-14` |
| 아이콘 아래    | 32px    | `mb-8`         |

---

## 5. 컴포넌트 스타일

### 5.1 히어로 섹션

```html
<section
  class="relative min-h-screen flex items-center justify-center hero-gradient pt-20 overflow-hidden"
>
  <!-- Background Pattern -->
  <div class="absolute inset-0 tech-pattern opacity-30"></div>

  <!-- Blur Effects -->
  <div class="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
  <div
    class="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"
  ></div>

  <!-- Content -->
  <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
    <!-- ... -->
  </div>
</section>
```

```css
.hero-gradient {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
}
.tech-pattern {
  background-image: radial-gradient(
    circle at 2px 2px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 0
  );
  background-size: 32px 32px;
}
```

### 5.2 섹션 헤더

```html
<div class="text-center mb-20">
  <h2 class="text-sm font-bold text-deep-blue uppercase tracking-widest mb-3">Our Services</h2>
  <h3 class="text-4xl font-bold text-navy">핵심 서비스</h3>
</div>
```

### 5.3 버튼

**Primary Button (CTA)**

```html
<a
  class="px-10 py-5 bg-deep-blue text-white rounded-xl font-bold text-lg hover:bg-navy transition-all shadow-xl shadow-blue-900/10"
>
  무료 견적 받기
</a>
```

**Secondary Button**

```html
<a
  class="px-10 py-5 bg-white text-navy rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
>
  서비스 보기
</a>
```

**Ghost Button**

```html
<a
  class="px-10 py-5 bg-transparent border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
>
  더 알아보기
</a>
```

### 5.4 카드

```html
<div
  class="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow"
>
  <div
    class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-deep-blue mb-8"
  >
    <span class="material-symbols-outlined text-4xl">verified</span>
  </div>
  <h4 class="text-2xl font-bold text-navy mb-4">카드 제목</h4>
  <p class="text-slate-600 mb-10 leading-relaxed">설명 텍스트</p>
  <ul class="space-y-4">
    <li class="flex items-center gap-3 text-slate-700">
      <span class="material-symbols-outlined text-blue-500 text-xl">check_circle</span>
      <span class="font-medium">체크 아이템</span>
    </li>
  </ul>
</div>
```

### 5.5 헤더 (Fixed)

```html
<header class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
  <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <!-- Logo -->
    <a href="#" class="flex items-center gap-2">
      <div class="w-10 h-10 bg-deep-blue rounded-lg flex items-center justify-center text-white">
        <span class="material-symbols-outlined font-bold">eco</span>
      </div>
      <span class="text-xl font-bold tracking-tight text-navy">새봄컨설팅</span>
    </a>

    <!-- Nav Links -->
    <div class="hidden md:flex items-center gap-10">
      <a
        href="#services"
        class="text-sm font-semibold text-slate-600 hover:text-deep-blue transition-colors"
        >서비스</a
      >
      <a
        href="#contact"
        class="px-5 py-2.5 bg-deep-blue text-white rounded-lg text-sm font-bold hover:bg-navy transition-colors"
        >견적 받기</a
      >
    </div>
  </nav>
</header>
```

### 5.6 하이라이트 카드 (Why Us 스타일)

```html
<div class="text-center p-8 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group">
  <div
    class="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-deep-blue mb-6 shadow-sm group-hover:shadow-md transition-shadow"
  >
    <span class="material-symbols-outlined text-3xl">verified</span>
  </div>
  <div class="text-4xl font-extrabold text-navy mb-2">160만원</div>
  <div class="text-lg font-bold text-slate-800 mb-3">FDA 인증</div>
  <p class="text-sm text-slate-500 leading-relaxed">기존 대비 93% 절감</p>
</div>
```

### 5.7 Step Indicator (라벨링 서비스)

```html
<div class="flex items-center justify-center gap-4">
  <div class="flex items-center gap-2">
    <div
      class="w-10 h-10 rounded-full bg-secondary-500 text-white flex items-center justify-center font-bold"
    >
      <span class="material-symbols-outlined">check</span>
    </div>
    <span class="text-sm font-medium text-slate-600">프로젝트 설정</span>
  </div>
  <div class="w-12 h-0.5 bg-secondary-500"></div>
  <div class="flex items-center gap-2">
    <div
      class="w-10 h-10 rounded-full bg-deep-blue text-white flex items-center justify-center font-bold"
    >
      2
    </div>
    <span class="text-sm font-medium text-slate-800">원재료 분석</span>
  </div>
  <div class="w-12 h-0.5 bg-slate-200"></div>
  <div class="flex items-center gap-2">
    <div
      class="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold"
    >
      3
    </div>
    <span class="text-sm font-medium text-slate-400">영양성분</span>
  </div>
</div>
```

---

## 6. 아이콘

### 6.1 아이콘 라이브러리

**Material Symbols Outlined** 사용

```html
<!-- CDN -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
/>

<!-- 사용 -->
<span class="material-symbols-outlined">check_circle</span>
```

### 6.2 주요 아이콘

| 용도        | 아이콘                         | 컨테이너 스타일                    |
| ----------- | ------------------------------ | ---------------------------------- |
| 서비스 카드 | `verified`, `speed`, `savings` | `w-16 h-16 bg-blue-50 rounded-2xl` |
| 체크 아이템 | `check_circle`                 | `text-blue-500 text-xl`            |
| CTA         | `arrow_forward`, `send`        | 인라인                             |
| 연락처      | `mail`, `chat`                 | `p-3 bg-blue-50 rounded-2xl`       |

---

## 7. 반응형 브레이크포인트

### 7.1 Tailwind 기본값

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 7.2 주요 반응형 패턴

| 요소        | 모바일     | 태블릿+          |
| ----------- | ---------- | ---------------- |
| 히어로 제목 | `text-5xl` | `md:text-7xl`    |
| 카드 그리드 | 1열        | `md:grid-cols-2` |
| 하이라이트  | 1열        | `lg:grid-cols-4` |
| 카드 패딩   | `p-10`     | `md:p-14`        |
| 네비게이션  | 햄버거     | 전체 메뉴        |

---

## 8. 애니메이션

### 8.1 Transition 패턴

```css
/* 호버 전환 */
transition-all

/* 그림자 전환 */
transition-shadow

/* 색상 전환 */
transition-colors
```

### 8.2 사용 가이드

| 요소            | 효과            | 클래스                                            |
| --------------- | --------------- | ------------------------------------------------- |
| 버튼 호버       | 배경색 변화     | `hover:bg-navy transition-colors`                 |
| 카드 호버       | 그림자 증가     | `hover:shadow-xl transition-shadow`               |
| CTA 호버        | 스케일 + 그림자 | `hover:scale-105 hover:shadow-2xl transition-all` |
| 아이콘 컨테이너 | 그림자          | `group-hover:shadow-md transition-shadow`         |

---

## 9. 접근성

### 9.1 색상 대비

| 조합               | 대비율 | WCAG |
| ------------------ | ------ | ---- |
| navy on white      | 14.7:1 | AAA  |
| slate-600 on white | 5.7:1  | AA   |
| white on deep-blue | 7.3:1  | AAA  |

### 9.2 포커스 상태

```css
:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
```

---

## 10. Global CSS

### global.css

```css
@import 'tailwindcss';

@theme {
  /* 브랜드 컬러 */
  --color-navy: #0f172a;
  --color-deep-blue: #1e3a5f;
  --color-accent-blue: #3b82f6;

  /* 폰트 패밀리 */
  --font-family-sans: 'Pretendard', sans-serif;
}

/* 기본 스타일 */
body {
  font-family: var(--font-family-sans);
}

/* 유틸리티 클래스 */
.tech-pattern {
  background-image: radial-gradient(
    circle at 2px 2px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 0
  );
  background-size: 32px 32px;
}

.hero-gradient {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
}

/* 커스텀 색상 클래스 */
.text-navy {
  color: #0f172a;
}
.bg-navy {
  background-color: #0f172a;
}
.text-deep-blue {
  color: #1e3a5f;
}
.bg-deep-blue {
  background-color: #1e3a5f;
}
```

---

## 11. 외부 리소스

### CDN Links

```html
<!-- Pretendard 폰트 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
/>

<!-- Material Symbols -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
/>
```

---

## Decision Log

- 2026-02-02: insightflo-homepage 디자인 패턴 기반으로 디자인 시스템 리뉴얼
- 2026-02-02: Navy-Blue 컬러 팔레트 채택 (#0F172A, #1E3A5F)
- 2026-02-02: Pretendard 폰트 + Material Symbols Outlined 아이콘 사용
- 2026-02-02: 히어로 그라디언트 + tech-pattern 배경 적용
