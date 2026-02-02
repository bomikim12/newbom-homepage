# Design System Setup 완료

## 📦 생성된 파일

### 1. Tailwind CSS 설정

- **파일**: `tailwind.config.mjs`
- **내용**:
  - Navy-Blue 컬러 팔레트 (`navy`, `deep-blue`, `accent-blue`)
  - Pretendard 폰트 패밀리 설정

### 2. Global CSS

- **파일**: `src/styles/global.css`
- **내용**:
  - Tailwind 기본 레이어 import
  - CSS 변수 정의 (브랜드 컬러)
  - 커스텀 유틸리티 클래스:
    - `.hero-gradient` - 히어로 섹션 배경 그라디언트
    - `.tech-pattern` - 테크 패턴 배경
    - `.text-navy`, `.bg-navy` - Navy 색상
    - `.text-deep-blue`, `.bg-deep-blue` - Deep Blue 색상
    - `.text-accent-blue`, `.bg-accent-blue` - Accent Blue 색상
  - 접근성: `:focus-visible` 스타일
  - 스무스 스크롤

### 3. Base Layout

- **파일**: `src/layouts/BaseLayout.astro`
- **내용**:
  - 모든 페이지의 기본 레이아웃
  - CDN 연결:
    - Pretendard 폰트: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css`
    - Material Symbols Outlined: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap`
  - SEO 메타 태그
  - global.css import

### 4. Homepage 데모

- **파일**: `src/pages/index.astro`
- **내용**:
  - 디자인 시스템 테스트 페이지
  - 히어로 섹션 예제
  - 컬러 팔레트 시각화
  - Material Symbols 아이콘 테스트

## ✅ 완료 조건 체크

- [x] Navy-Blue 컬러 팔레트 설정 (#0F172A, #1E3A5F, #3B82F6)
- [x] Pretendard 폰트 연결 (CDN)
- [x] Material Symbols Outlined 아이콘 연결 (CDN)
- [x] hero-gradient, tech-pattern 유틸리티 클래스
- [x] 커스텀 색상 클래스 (text-navy, bg-deep-blue 등)

## 🚀 확인 방법

### 개발 서버

```bash
pnpm dev
```

→ http://localhost:4321 접속

### 빌드 테스트

```bash
pnpm build
```

→ ✅ 빌드 성공 확인 완료

## 📊 디자인 시스템 요약

### 컬러 팔레트

| 색상 이름   | HEX       | Tailwind 클래스                      |
| ----------- | --------- | ------------------------------------ |
| Navy        | `#0F172A` | `bg-navy`, `text-navy`               |
| Deep Blue   | `#1E3A5F` | `bg-deep-blue`, `text-deep-blue`     |
| Accent Blue | `#3B82F6` | `bg-accent-blue`, `text-accent-blue` |

### 폰트

- **기본 폰트**: Pretendard
- **대체 폰트**: system-ui, sans-serif

### 아이콘

- **라이브러리**: Material Symbols Outlined
- **사용법**: `<span class="material-symbols-outlined">check_circle</span>`

### 커스텀 클래스

- `.hero-gradient` - 히어로 섹션 그라디언트 배경
- `.tech-pattern` - 테크 패턴 배경

## 🔗 참고 문서

- 디자인 시스템 문서: `docs/planning/05-design-system.md`
- insightflo-homepage 레퍼런스: `/Users/kwak/Projects/ai/insightflo-homepage/src/styles/global.css`

---

**작성일**: 2026-02-02
**Task ID**: P0-T0.2
