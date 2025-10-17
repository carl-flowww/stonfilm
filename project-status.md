# STONFILM 랜딩페이지 프로젝트 현황 문서

## 📌 프로젝트 개요

**프로젝트명**: STONFILM 랜딩페이지
**목적**: 영상 제작 스튜디오의 포트폴리오 및 브랜드 아이덴티티를 전달하는 풀 랜딩페이지
**디자인 소스**: Figma (Node ID: 25:1986 "Stonfilm_LandingPage")
**현재 상태**: Figma 디자인 완료, HTML 프로토타입(포트폴리오 섹션만) 완성
**다음 단계**: Figma 디자인 기반으로 완전한 랜딩페이지 개발

---

## 🎯 페이지 구조 및 섹션

### 전체 레이아웃 (1200px × 4107px)

```
┌─────────────────────────────────────────────┐
│  TopBar (네비게이션)                          │
│  - STONFILM 로고                              │
│  - About. / Projects. / Contact us →        │
├─────────────────────────────────────────────┤
│  1. About 섹션 (543px)                       │
│     - Hero (300px)                           │
│       ∙ 배경 이미지                           │
│       ∙ "Where Creativity Meets Innovation." │
│     - Introduction (243px)                   │
│       ∙ 스튜디오 소개 텍스트 (3개 문단)         │
├─────────────────────────────────────────────┤
│  2. Projects 섹션 (2347px)                   │
│     - "Expand your Imagination with us."     │
│     - 대표 영상 (16:9, 936×526.5px)          │
│       ∙ 영상 정보 (제목, 날짜, 카테고리, 설명)   │
│     - 카테고리 필터                            │
│       ∙ ALL / CF / ENT / MOVIE / MUSICVIDEO  │
│         / SNAPSHOT / VFX / ETC               │
│     - 3열 Masonry 콜라주 레이아웃              │
│       ∙ 다양한 비율 (16:9, 9:16, 1:1, 4:3)    │
├─────────────────────────────────────────────┤
│  3. Clients 섹션 (408px)                     │
│     - "Trusted by Our Partners & Clients"    │
│     - 파트너사 로고 캐러셀 (20개 기업)          │
│       ∙ Samsung, Com2us, Lotteria 등         │
├─────────────────────────────────────────────┤
│  4. Contact 섹션 (569px)                     │
│     - "Where Your Vision Becomes Reality."   │
│     - 문의 폼                                  │
│       ∙ Company / Full Name / Email / Phone  │
│       ∙ Message (Textarea)                   │
│       ∙ Send Message 버튼                     │
├─────────────────────────────────────────────┤
│  5. Footer (240px, 검정 배경)                │
│     - STONFILM 로고 + 회사명                  │
│     - 연락처 정보                              │
│       ∙ CEO / 주소 / 전화번호 / 이메일         │
│     - Copyright                              │
└─────────────────────────────────────────────┘
```

---

## 🎨 디자인 시스템 (FLOWWW Design System)

### 색상 시스템 (Light/Dark Mode)

#### FLOWWW Design System Variables
```
neutral/obj 00: #000000      (객체 - 가장 어두운)
neutral/obj:    #303136      (객체 - 본문 텍스트)
neutral/mid:    #a0a5b1      (중간 - 비활성 텍스트)
neutral/sf 03:  #cbd0d6      (표면 - 비활성 UI)
neutral/sf 00:  #ffffff      (표면 - 가장 밝은)
```

#### 라이트/다크 모드 전환
- **시스템 테마 감지**: `prefers-color-scheme` CSS 미디어 쿼리 활용
- **자동 전환**: 사용자 OS/브라우저 테마에 따라 자동 변경
- **색상 매핑**:
  - Light 모드: 배경 흰색, 텍스트 검정
  - Dark 모드: 배경 검정, 텍스트 흰색
- **파트너사 로고 특별 처리** (Corp 컴포넌트):
  - Light 모드: `DarkModeMasking=Off` → 원본 컬러 로고 표시
  - Dark 모드: `DarkModeMasking=On` → 그레이스케일 마스킹 적용

### 타이포그래피

#### 폰트 패밀리
1. **The Bold Font** (제목용)
   - CDN: `https://fonts.cdnfonts.com/css/the-bold-font`
   - 사용처: 섹션 제목, 로고, 네비게이션

2. **Pretendard** (본문용)
   - Weights: Light (300), Regular (400), Medium (500), SemiBold (600)
   - 사용처: 본문 텍스트, 설명, 폼 레이블

#### 폰트 사이즈
```
- 섹션 제목: 48px (The Bold Font)
- 영상 제목: 32px (The Bold Font)
- 카테고리 버튼: 32px (The Bold Font)
- 본문 텍스트: 14px (Pretendard Light, tracking: -0.56px)
- 서브 텍스트: 16px (Pretendard Medium, tracking: -0.64px)
- 네비게이션: 16px (The Bold Font)
```

### 간격 시스템 (Spacing)
```
sp-0: 0px
sp-0.5: 4px
sp-1: 8px
sp-1.5: 12px
sp-2: 16px
sp-3: 24px
sp-4: 32px
sp-5: 40px
sp-6: 48px
sp-10: 80px
```

### 라운드 (Border Radius)
```
r-0: 0px
r-1: 8px (기본 미디어 아이템)
```

### 레이아웃
- **최대 너비**: 1200px (전체 페이지)
- **컨텐츠 영역**: 936px (About, Projects, Clients, Contact)
- **좌우 패딩**: 132px (컨텐츠 중앙 정렬용)
- **섹션 세로 패딩**: 48px (상단), 80px (하단, Contact 제외)

---

## 🧩 섹션별 상세 사양

### 1. TopBar (네비게이션)

#### 구조
- **높이**: 64px
- **배경**: 투명 또는 섹션에 따라 오버레이
- **좌측**: STONFILM 로고 (114×32px)
- **우측**: 네비게이션 메뉴
  - About. (텍스트 버튼)
  - Projects. (텍스트 버튼)
  - Contact us → (강조 버튼, `rgba(255,255,255,0.2)` 배경)

#### 스크롤 네비게이션
- **타겟 섹션**: About, Projects, Contact만
- **동작**: Smooth scroll to section
- **구현**: `scrollIntoView({ behavior: 'smooth' })` 또는 Scroll Offset 계산

---

### 2. About 섹션

#### 2-1. Hero (300px)
- **배경 이미지**: 전체 너비 (1200px)
- **텍스트 오버레이**:
  - "Where Creativity Meets Innovation."
  - 폰트: The Bold Font, 48px
  - 색상: 흰색
  - 위치: 중앙 정렬, 세로 중앙에서 32px 아래
- **TopBar**: Hero 위에 오버레이

#### 2-2. Introduction (243px)
- **배경**: 흰색 (Light) / 검정 (Dark)
- **좌우 패딩**: 228px
- **세로 패딩**: 32px

**구성**:
1. **제목 라인**:
   - "A Studio That Creates Powerful Experiences" (24px, Pretendard Medium)
   - 우측에 수평선 구분자

2. **본문 (3개 문단)**:
   - 폰트: Pretendard Light, 14px
   - 줄간격: normal
   - 문단 간격: 16px
   - 내용:
     1. AI 기반 VFX 기술로 새로운 영상 제작 기준 제시
     2. 스토리텔링, 미장센, 첨단 기술의 융합
     3. 다양한 포맷 제작 (MV, CF, 브랜드 필름, 영화, 예능)

---

### 3. Projects 섹션

#### 3-1. 섹션 제목
- "Expand your Imagination with us."
- 폰트: The Bold Font, 48px
- 중앙 정렬

#### 3-2. 대표 영상 (Featured Video)
- **크기**: 936×526.5px (16:9 고정)
- **위치**: 중앙 정렬
- **선정 로직**:
  - `portfolioData`에서 `aspectRatio === '16:9'` 필터링
  - 랜덤 선택 (`Math.random()`)
  - 페이지 로드 시마다 다른 영상 표시
- **YouTube 임베드**:
  - 자동재생, 음소거, 컨트롤 숨김
  - 호버 시 `pointer-events: auto`로 컨트롤 활성화

**영상 정보 (Video Info)**:
- **영상 제목**: 32px, The Bold Font
- **날짜 + 카테고리**: 16px, Pretendard Regular
  - 형식: `2025 · Category`
  - 구분자: Dot (1px)
- **설명**: 14px, Pretendard Light
  - 최대 3줄
  - 우측 정렬

#### 3-3. 카테고리 필터
- **레이아웃**: Flex wrap, gap 8px
- **버튼 스타일**:
  - 활성: 검정 텍스트 (The Bold Font, 32px)
  - 비활성: `#cbd0d6` 텍스트
- **카테고리 목록**:
  - ALL. (기본 활성)
  - CF.
  - ENT.
  - MOVIE.
  - MUSICVIDEO.
  - SNAPSHOT.
  - VFX.
  - ETC.

#### 3-4. Masonry 콜라주 레이아웃
- **라이브러리**: Masonry.js 4.2.2
- **그리드**: 3열 (각 296px)
- **간격 (Gutter)**: 24px
- **지원 비율**: 16:9, 9:16, 1:1, 4:3
- **미디어 타입**: 영상 (YouTube iframe) + 이미지

**Masonry 설정**:
```javascript
{
    itemSelector: '.grid-item',
    columnWidth: 296,  // 고정 너비
    gutter: 24,
    percentPosition: false,  // 고정 픽셀 사용
    transitionDuration: '0.3s'
}
```

**반응형** (향후 구현):
- 데스크톱 (>1024px): 3열
- 태블릿 (768px-1024px): 2열
- 모바일 (<768px): 1열

---

### 4. Clients 섹션

#### 구조
- **제목**: "Trusted by Our Partners & Clients" (48px)
- **서브타이틀**: 협업 관련 설명 텍스트 (14px, 2줄)
- **로고 캐러셀**:
  - 배경: 흰색 (Light) / 검정 (Dark)
  - 크기: 1200px × 198px
  - 좌우 패딩: 48px
  - 간격: 80px

#### 파트너사 목록 (20개)
1. Samsung
2. Com2us
3. Lotteria
4. inkode
5. 랜덤투유
6. 삼육대학교
7. 360Photo
8. 서울필름아카데미
9. WorldVision
10. 청년창업사관학교
11. PHOS
12. 경기콘텐츠진흥원
13. 크즈흐
14. gimmick
15. 강원도
16. Emart
17. Dierneas
18. KMA (국방부)
19. AND GROUP
20. studioBom

#### Corp 컴포넌트 (DarkModeMasking)
- **Light 모드**:
  - Property: `DarkModeMasking=Off`
  - 표시: 원본 컬러 로고 이미지

- **Dark 모드**:
  - Property: `DarkModeMasking=On`
  - 표시: 그레이스케일 마스킹 (`bg-[#a0a5b1]`, mask-image)

#### 캐러셀 동작 (향후 구현)
- 자동 스크롤 (무한 루프)
- 속도: 느린 속도 (약 30-40초에 1회전)
- 호버 시 일시정지

---

### 5. Contact 섹션

#### 구조
- **제목**: "Where Your Vision Becomes Reality." (48px)
- **서브타이틀**: 문의 안내 텍스트 (14px, 2줄)

#### 문의 폼
**입력 필드** (2열 레이아웃):
- Row 1:
  - Company (왼쪽)
  - Full Name (오른쪽)
- Row 2:
  - Email (왼쪽)
  - Phone (오른쪽)
- Row 3:
  - Message (Textarea, 전체 너비, 66px 높이)

**필드 스타일**:
- **배경**: `#eef0f1` (Light) / Dark 변형
- **라벨**: 14px, Pretendard SemiBold, `#303136`
- **Placeholder**: 14px, Pretendard Regular, `#636670`
- **패딩**: 12px (좌우), 8px (상하)
- **라운드**: 4px
- **간격**:
  - 라벨-필드: 8px
  - 필드 행 간: 24px

**제출 버튼**:
- **배경**: 검정 (Light) / 흰색 (Dark)
- **텍스트**: "Send Message" (16px, Pretendard Medium)
- **아이콘**: 종이비행기 (24×24px)
- **패딩**: 12px (좌우), 8px (상하)
- **라운드**: 8px

---

### 6. Footer

#### 구조
- **배경**: 검정 (`#000000`)
- **높이**: 240px
- **좌우 패딩**: 132px
- **세로 패딩**: 42px (상단)

#### 컨텐츠 (156px 높이)
1. **회사 정보**:
   - STONFILM 로고 (98×16px, 흰색)
   - "Stonfilm Production" (16px, Pretendard Medium, `#a0a5b1`)

2. **연락처** (4줄):
   - CEO Junsu Song
   - 주소: 14, Hancheon-ro 132-gil, Gangbuk-gu, Seoul, Republic of Korea
   - 전화: 010-3470-5437
   - 이메일: song41@stonfilm.com (링크)
   - 폰트: 14px, Pretendard Light, 흰색

3. **Copyright**:
   - ©2025 Junsu Song
   - 폰트: 14px, Pretendard Light, 흰색

---

## 🔧 기술 스택 및 구현 방식

### 백엔드: Supabase (BaaS - Backend as a Service) ⭐

**선택 이유**:
- ✅ 빠른 개발 속도 (1일 이내 백엔드 완성)
- ✅ PostgreSQL 관계형 데이터베이스
- ✅ Authentication, Storage, Edge Functions 기본 제공
- ✅ RESTful API 자동 생성
- ✅ 무료 티어 (500MB DB, 1GB Storage)
- ✅ Row Level Security (보안 규칙)

#### Supabase 서비스 구성

1. **PostgreSQL Database**
   - 포트폴리오 데이터 저장
   - 사이트 설정 (Hero 이미지 경로 등)
   - Contact 폼 제출 내역

2. **Authentication**
   - 관리자 로그인 (email/password)
   - JWT 토큰 기반
   - Row Level Security와 연동

3. **Storage**
   - 포트폴리오 이미지 업로드
   - Hero 이미지 업로드
   - 자동 리사이징 및 최적화 (Policy 설정)

4. **Edge Functions (Deno)**
   - Contact 폼 이메일 전송
   - 서버사이드 로직 실행

---

### 프론트엔드 기술

#### 1. HTML5
- 시맨틱 태그 사용: `<header>`, `<nav>`, `<section>`, `<footer>`
- SEO 최적화: meta tags, Open Graph

#### 2. CSS3
- **CSS Variables**: 라이트/다크 모드 색상 정의
```css
:root {
    /* Light Mode */
    --color-bg: #ffffff;
    --color-text: #000000;
    --color-text-secondary: #303136;
    --color-text-muted: #a0a5b1;
    --color-surface: #eef0f1;
}

@media (prefers-color-scheme: dark) {
    :root {
        /* Dark Mode */
        --color-bg: #000000;
        --color-text: #ffffff;
        --color-text-secondary: #f6f6f7;
        --color-text-muted: #636670;
        --color-surface: #303136;
    }
}
```

- **Flexbox & Grid**: 레이아웃
- **Transitions**: 0.3s ease (인터랙션)
- **Media Queries**: 반응형 디자인

#### 3. JavaScript (Vanilla)
- **기능**:
  - Masonry.js 초기화 및 레이아웃 제어
  - 카테고리 필터링
  - Smooth scroll 네비게이션
  - Featured video 랜덤 선택
  - 폼 검증 및 제출
  - 파트너 로고 캐러셀 (자동 스크롤)
  - **Supabase JS SDK를 통한 API 호출**
- **ES6+ 문법**: const/let, arrow functions, template literals
- **모듈화**: 기능별 함수 분리

### 외부 라이브러리

#### 1. Supabase JS SDK
- **용도**: Supabase 백엔드 연결
- **CDN 또는 NPM**: `@supabase/supabase-js`
- **초기화**:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);
```

#### 2. Masonry.js 4.2.2
- **용도**: Pinterest 스타일 콜라주 레이아웃
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js`
- **초기화**:
```javascript
const grid = document.querySelector('.collage-grid');
const masonry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: 296,
    gutter: 24,
    percentPosition: false,
    transitionDuration: '0.3s'
});
```

#### 3. 폰트
- **The Bold Font**: `https://fonts.cdnfonts.com/css/the-bold-font`
- **Pretendard**: Google Fonts 또는 로컬 호스팅

#### 4. YouTube Iframe API
- **파라미터**:
```javascript
{
    autoplay: 1,
    mute: 1,
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    rel: 0,
    loop: 1,
    playlist: videoId,
    fs: 0,
    iv_load_policy: 3,
    disablekb: 1,
    start: startTime
}
```

---

## 📊 데이터 구조 (Supabase PostgreSQL)

### 데이터베이스 스키마

#### 1. portfolio_items 테이블
```sql
CREATE TABLE portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('video', 'image')),

    -- 영상 (YouTube)
    video_url TEXT,                    -- YouTube URL
    video_id TEXT,                     -- YouTube ID 추출
    start_time INTEGER DEFAULT 0,      -- 시작 시간 (초)

    -- 이미지
    image_path TEXT,                   -- Storage 경로

    -- 공통 메타데이터
    title TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,             -- 제작연도
    category TEXT NOT NULL CHECK (category IN ('CF', 'ENT', 'MOVIE', 'MUSICVIDEO', 'SNAPSHOT', 'VFX', 'ETC')),
    aspect_ratio TEXT NOT NULL,        -- '16:9', '9:16', '1:1', '4:3' 등

    -- 표시 순서
    display_order INTEGER,

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_portfolio_category ON portfolio_items(category);
CREATE INDEX idx_portfolio_year ON portfolio_items(year);
CREATE INDEX idx_portfolio_display_order ON portfolio_items(display_order);
```

#### 2. site_settings 테이블
```sql
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 초기 데이터
INSERT INTO site_settings (key, value) VALUES
    ('hero_image_path', '/hero-images/default-hero.jpg');
```

#### 3. contact_submissions 테이블
```sql
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### Supabase API 사용 예시

#### 포트폴리오 조회 (카테고리 필터)
```javascript
// 모든 포트폴리오 조회
const { data, error } = await supabase
  .from('portfolio_items')
  .select('*')
  .order('display_order', { ascending: true });

// 특정 카테고리 필터링
const { data, error } = await supabase
  .from('portfolio_items')
  .select('*')
  .eq('category', 'CF')
  .order('display_order', { ascending: true });

// 16:9 영상만 조회 (대표 영상용)
const { data, error } = await supabase
  .from('portfolio_items')
  .select('*')
  .eq('type', 'video')
  .eq('aspect_ratio', '16:9');
```

#### 포트폴리오 추가 (관리자)
```javascript
const { data, error } = await supabase
  .from('portfolio_items')
  .insert({
    type: 'video',
    video_url: 'https://www.youtube.com/watch?v=OuRGKnMJpaI',
    video_id: 'OuRGKnMJpaI',
    title: '컴투스 이수지 1',
    description: '컴투스 서머너즈 워 광고 영상',
    year: 2025,
    category: 'CF',
    aspect_ratio: '16:9',
    start_time: 0
  });
```

#### 이미지 업로드
```javascript
// 파일 업로드
const { data, error } = await supabase.storage
  .from('portfolio-images')
  .upload(`${Date.now()}_${file.name}`, file);

// DB에 경로 저장
const { data: insertData, error: insertError } = await supabase
  .from('portfolio_items')
  .insert({
    type: 'image',
    image_path: data.path,
    title: 'Studio Portrait',
    description: '스튜디오 인물 촬영',
    year: 2024,
    category: 'SNAPSHOT',
    aspect_ratio: '16:9'
  });
```

---

### 카테고리 정의
```javascript
const CATEGORIES = {
    ALL: 'ALL',
    CF: 'CF',              // 광고
    ENT: 'ENT',            // 예능
    MOVIE: 'MOVIE',        // 영화
    MUSICVIDEO: 'MUSICVIDEO',  // 뮤직비디오
    SNAPSHOT: 'SNAPSHOT',  // 스냅샷/사진
    VFX: 'VFX',            // VFX 작업
    ETC: 'ETC'             // 기타
};
```

---

## 🚀 개발 프로세스 (Supabase 기반 - 재구성) ⭐

### Phase 1: 프로젝트 구조 설정 ✅
**목표**: 기존 HTML 프로토타입 분석 및 프로젝트 환경 구축

**완료 항목**:
- ✅ stonfilm-landing.html 프로토타입 완성
- ✅ Figma 디자인 분석 및 문서화
- ✅ 요구사항 명확화
- ✅ **Supabase 백엔드 스택 결정**

**산출물**:
- project-status.md (이 문서)
- stonfilm-landing.html (프로토타입)

---

### Phase 2: Supabase 백엔드 구축 (우선순위 최고) 🔥
**목표**: Supabase 설정 및 데이터베이스 구축
**예상 시간**: 2-3시간

**작업 항목**:

#### 2-1. Supabase 프로젝트 생성 (10분)
1. https://supabase.com 회원가입/로그인
2. 새 프로젝트 생성
   - Organization: stonfilm
   - Project name: stonfilm-landing
   - Database password: 안전한 비밀번호 설정
   - Region: Northeast Asia (Seoul) 선택
3. Project URL 및 API Keys 저장
   - Project URL: `https://xxxxx.supabase.co`
   - anon public key
   - service_role key (관리자용, 보안 주의)

#### 2-2. 데이터베이스 테이블 생성 (30분)
**SQL Editor에서 실행**:

```sql
-- 1. portfolio_items 테이블
CREATE TABLE portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('video', 'image')),

    video_url TEXT,
    video_id TEXT,
    start_time INTEGER DEFAULT 0,

    image_path TEXT,

    title TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('CF', 'ENT', 'MOVIE', 'MUSICVIDEO', 'SNAPSHOT', 'VFX', 'ETC')),
    aspect_ratio TEXT NOT NULL,

    display_order INTEGER,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_portfolio_category ON portfolio_items(category);
CREATE INDEX idx_portfolio_year ON portfolio_items(year);
CREATE INDEX idx_portfolio_display_order ON portfolio_items(display_order);

-- 2. site_settings 테이블
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
    ('hero_image_path', '/hero-images/default-hero.jpg');

-- 3. contact_submissions 테이블
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_items_updated_at
    BEFORE UPDATE ON portfolio_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

#### 2-3. Storage Bucket 생성 (10분)
**Storage 메뉴에서**:

1. **portfolio-images** Bucket 생성
   - Public bucket: ✅ (공개 읽기 허용)
   - File size limit: 10MB
   - Allowed MIME types: image/jpeg, image/png, image/webp

2. **hero-images** Bucket 생성
   - Public bucket: ✅
   - File size limit: 5MB
   - Allowed MIME types: image/jpeg, image/png, image/webp

#### 2-4. Row Level Security (RLS) 설정 (30분)
**SQL Editor에서 실행**:

```sql
-- portfolio_items RLS
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 가능
CREATE POLICY "Public read access"
ON portfolio_items FOR SELECT
TO public
USING (true);

-- 인증된 사용자만 CUD 가능
CREATE POLICY "Authenticated users can insert"
ON portfolio_items FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
ON portfolio_items FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete"
ON portfolio_items FOR DELETE
TO authenticated
USING (true);

-- site_settings RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
ON site_settings FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can update"
ON site_settings FOR UPDATE
TO authenticated
USING (true);

-- contact_submissions RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
ON contact_submissions FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can read submissions"
ON contact_submissions FOR SELECT
TO authenticated
USING (true);
```

#### 2-5. 관리자 계정 생성 (10분)
**Authentication > Users**:
1. Add user (관리자)
   - Email: `admin@stonfilm.com` (또는 원하는 이메일)
   - Password: 안전한 비밀번호
   - Auto Confirm User: ✅

#### 2-6. 초기 데이터 시딩 (30분)
**SQL Editor에서 기존 프로토타입 데이터 삽입**:

```sql
-- 영상 데이터 삽입 (예시)
INSERT INTO portfolio_items (type, video_url, video_id, title, description, year, category, aspect_ratio, start_time, display_order)
VALUES
    ('video', 'https://www.youtube.com/watch?v=OuRGKnMJpaI', 'OuRGKnMJpaI', '컴투스 이수지 1', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 0, 1),
    ('video', 'https://www.youtube.com/watch?v=Yye2ar9sHsg', 'Yye2ar9sHsg', '컴투스 이수지 2', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 0, 2);
    -- ... 나머지 데이터
```

**산출물**:
- ✅ Supabase 프로젝트 설정 완료
- ✅ PostgreSQL 데이터베이스 스키마 생성
- ✅ Storage Buckets 생성
- ✅ RLS 정책 설정
- ✅ 관리자 계정 생성
- ✅ 초기 데이터 삽입

---

### Phase 3: 프론트엔드 구조화 및 Supabase 연동
**목표**: HTML/CSS/JS 분리 및 Supabase JS SDK 통합
**예상 시간**: 3-4시간

**작업 항목**:

#### 3-1. 디렉토리 구조 생성
```
stonfilm-landing/
├── index.html
├── admin.html             # 관리자 페이지
├── css/
│   ├── reset.css
│   ├── variables.css      # Light/Dark CSS Variables
│   ├── typography.css
│   ├── layout.css
│   ├── sections/
│   │   ├── topbar.css
│   │   ├── about.css
│   │   ├── projects.css
│   │   ├── clients.css
│   │   ├── contact.css
│   │   └── footer.css
│   ├── admin.css          # 관리자 페이지 CSS
│   └── main.css
├── js/
│   ├── config.js          # Supabase 설정
│   ├── api/               # Supabase API 호출 함수
│   │   ├── portfolio.js   # 포트폴리오 CRUD
│   │   ├── settings.js    # 사이트 설정
│   │   ├── auth.js        # 인증
│   │   └── contact.js     # Contact 폼
│   ├── utils/
│   │   ├── aspect-ratio.js
│   │   ├── shuffle.js
│   │   └── smooth-scroll.js
│   ├── components/
│   │   ├── masonry-grid.js
│   │   ├── category-filter.js
│   │   ├── featured-video.js
│   │   ├── logo-carousel.js
│   │   └── contact-form.js
│   ├── admin/             # 관리자 페이지 JS
│   │   ├── login.js
│   │   ├── portfolio-manager.js
│   │   └── image-uploader.js
│   └── main.js
├── assets/
│   ├── images/
│   │   └── logos/         # 파트너사 로고 (20개)
│   └── fonts/
│       └── TheBoldFont/
├── .env.example           # Supabase Keys (예시)
└── README.md
```

#### 3-2. Supabase JS SDK 통합
**config.js**:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

#### 3-3. API 호출 함수 작성
**js/api/portfolio.js**:
```javascript
// 모든 포트폴리오 조회
export async function getAllPortfolio() {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true });
    return { data, error };
}

// 카테고리별 조회
export async function getPortfolioByCategory(category) {
    if (category === 'ALL') return getAllPortfolio();

    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true });
    return { data, error };
}

// 16:9 영상만 조회 (대표 영상용)
export async function getWideVideos() {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('type', 'video')
        .eq('aspect_ratio', '16:9');
    return { data, error };
}
```

#### 3-4. CSS 분리
- variables.css: Light/Dark 모드 CSS Variables
- 섹션별 CSS 파일 생성
- 반응형 미디어 쿼리 (Mobile < 768px)

**산출물**:
- 구조화된 프로젝트
- Supabase 연동 완료
- API 호출 함수 작성

---

### Phase 4: 섹션별 UI 구현 (Supabase 데이터 연동)
**목표**: Figma 디자인 기반으로 각 섹션 구현 및 Supabase 데이터 연동
**예상 시간**: 5-6시간

**작업 항목**:

#### 4-1. TopBar & Navigation
- STONFILM 로고 (SVG 또는 이미지)
- 네비게이션 메뉴 (About, Projects, Contact)
- Smooth scroll 구현 (`scrollIntoView`)
- Sticky header (스크롤 시 고정, `position: sticky`)
- Light/Dark 모드 적용

#### 4-2. About 섹션
- **Hero 배경 이미지 동적 로드** (Supabase 연동)
  - `site_settings` 테이블에서 `hero_image_path` 조회
  - Supabase Storage URL 생성
- 텍스트 오버레이 ("Where Creativity Meets Innovation.")
- Introduction 텍스트 레이아웃 (3개 문단)
- 라이트/다크 모드 CSS Variables 적용

#### 4-3. Projects 섹션 (Supabase 데이터 연동 핵심)
- **대표 영상 (Featured Video)**:
  - `getWideVideos()` API 호출 (16:9 비율 영상만)
  - 랜덤 선택 로직 (`Math.random()`)
  - YouTube iframe 임베드
  - 영상 정보 표시 (제목, 날짜, 카테고리, 설명)

- **카테고리 필터 버튼**:
  - ALL, CF, ENT, MOVIE, MUSICVIDEO, SNAPSHOT, VFX, ETC
  - 버튼 클릭 시 `getPortfolioByCategory()` 호출
  - 활성/비활성 스타일 전환

- **Masonry 콜라주 레이아웃** (Supabase 데이터 기반):
  - Supabase에서 포트폴리오 데이터 가져오기
  - 영상: YouTube iframe 생성
  - 이미지: Supabase Storage URL 생성
  - Masonry.js 초기화 (3열, 296px, gutter 24px)
  - 이미지 로드 후 `masonry.layout()` 호출
  - 카테고리 필터 시 레이아웃 재계산

#### 4-4. Clients 섹션
- Corp 컴포넌트 구현 (20개 파트너사 로고)
- **DarkModeMasking 로직**:
  - Light 모드: 원본 컬러 이미지 (`img` 태그)
  - Dark 모드: 그레이스케일 마스킹 (`filter: grayscale(100%)`)
  - CSS `prefers-color-scheme` 미디어 쿼리로 자동 전환
- 로고 캐러셀 (자동 스크롤, 무한 루프)

#### 4-5. Contact 섹션 (Supabase 연동)
- **문의 폼 UI**:
  - Company, Full Name, Email, Phone, Message (Textarea)
  - 2열 레이아웃 (모바일 1열)
- **폼 검증** (클라이언트 사이드):
  - 필수 필드 체크
  - 이메일 형식 검증
  - 에러 메시지 표시
- **폼 제출 Supabase 연동**:
  - `contact_submissions` 테이블에 INSERT
  - 성공 시 폼 리셋 및 성공 메시지
  - 에러 핸들링
- **(향후) Edge Function으로 이메일 전송**

#### 4-6. Footer
- 회사 정보 레이아웃
- STONFILM 로고 + 회사명
- 연락처 정보 (CEO, 주소, 전화, 이메일)
- 이메일 링크 (`mailto:`)
- Copyright

**산출물**:
- Supabase 데이터 기반 동적 랜딩페이지 (HTML/CSS/JS)
- 포트폴리오 카테고리 필터링 기능
- Contact 폼 제출 기능

---

### Phase 5: 반응형 최적화 (Mobile 단일 브레이크포인트)
**목표**: 모바일 디바이스 대응 (< 768px)
**예상 시간**: 2-3시간

**작업 항목**:

#### 5-1. 브레이크포인트 정의
- **Mobile**: < 768px (단일 브레이크포인트)
- **Desktop**: ≥ 768px (1200px 고정 너비)

#### 5-2. Mobile 레이아웃 조정 (범용적 접근)
1. **전체 레이아웃**:
   - 최대 너비: 100% (좌우 패딩 16px)
   - 1열 스택 레이아웃

2. **TopBar**:
   - 로고 크기 축소
   - 네비게이션 메뉴: 햄버거 메뉴로 전환 (선택사항)

3. **About 섹션**:
   - Hero 높이 조정 (300px → 200px)
   - Introduction 좌우 패딩 축소 (228px → 16px)

4. **Projects 섹션**:
   - 대표 영상: 16:9 비율 유지, 너비 100%
   - 카테고리 필터: Flex wrap, 작은 버튼 크기
   - **Masonry 콜라주: 3열 → 1열**
   - 각 아이템 너비 100%

5. **Clients 섹션**:
   - 로고 캐러셀: 스크롤 속도 유지
   - 로고 크기 축소

6. **Contact 섹션**:
   - **문의 폼: 2열 → 1열 스택**
   - 버튼 크기 확대 (터치 최적화)

7. **Footer**:
   - 좌우 패딩 축소 (132px → 16px)
   - 텍스트 크기 유지

#### 5-3. 타이포그래피 조정
- 섹션 제목: 48px → 32px
- 영상 제목: 32px → 24px
- 카테고리 버튼: 32px → 20px
- 본문 텍스트: 14px 유지

#### 5-4. 터치 인터랙션 최적화
- 버튼 최소 크기: 44×44px
- 카테고리 필터 버튼 터치 영역 확대
- 호버 효과 → 탭 효과 전환 (`:active`)

**산출물**:
- 모바일 최적화된 랜딩페이지

---

### Phase 6: 인터랙션 및 애니메이션
**목표**: 사용자 경험 향상을 위한 동적 효과 추가
**예상 시간**: 2-3시간

**작업 항목**:
1. **스크롤 애니메이션**:
   - Fade-in on scroll (Intersection Observer API)
   - 섹션별 등장 효과 (threshold 0.1)

2. **호버 효과**:
   - 네비게이션 메뉴 (opacity 전환)
   - 카테고리 필터 버튼 (색상 전환)
   - 미디어 아이템 (scale 1.02, shadow)
   - Send Message 버튼 (배경색 전환)

3. **로딩 인디케이터**:
   - 페이지 로드 시 스피너 (선택사항)
   - Supabase 데이터 로드 중 스켈레톤 UI

4. **카테고리 필터 애니메이션**:
   - 부드러운 fade-in/fade-out (0.3s ease)
   - Masonry 레이아웃 재계산 (`masonry.layout()`)

5. **로고 캐러셀**:
   - 자동 스크롤 (무한 루프, CSS animation)
   - 호버 시 일시정지 (`animation-play-state: paused`)

**산출물**:
- 인터랙티브하고 생동감 있는 랜딩페이지

---

### Phase 7: 관리자 페이지 구현 (Admin CMS)
**목표**: 포트폴리오 및 사이트 설정 관리 페이지
**예상 시간**: 4-5시간

**작업 항목**:

#### 7-1. 로그인 페이지 (admin.html)
- Supabase Authentication 연동
- Email/Password 로그인 폼
- 로그인 성공 시 JWT 토큰 저장 (localStorage)
- 로그아웃 기능

#### 7-2. 포트폴리오 관리
- **포트폴리오 목록 (CRUD)**:
  - 모든 포트폴리오 조회 (테이블 형태)
  - 추가 (INSERT)
  - 수정 (UPDATE)
  - 삭제 (DELETE)
  - 정렬 순서 변경 (display_order)

- **영상 추가 폼**:
  - YouTube URL 입력
  - 자동으로 video_id 추출
  - 시작 시간 (start_time) 설정
  - 제목, 설명, 연도, 카테고리, 비율 입력

- **이미지 업로드 폼**:
  - 파일 선택 (input type="file")
  - Supabase Storage `portfolio-images` 버킷에 업로드
  - 업로드 후 image_path 저장
  - 진행률 표시 (progress bar)

#### 7-3. Hero 이미지 교체
- 현재 Hero 이미지 미리보기
- 새 이미지 업로드 (`hero-images` 버킷)
- `site_settings` 테이블 `hero_image_path` 업데이트

#### 7-4. Contact 제출 내역 조회
- `contact_submissions` 테이블 조회
- 제출 날짜, 이름, 이메일, 메시지 표시
- 테이블 형태로 보기

#### 7-5. 보안 (RLS 기반)
- Supabase RLS 정책으로 인증된 사용자만 접근
- 관리자 로그인 여부 체크 (JWT 토큰)
- 비인증 사용자 접근 차단

**산출물**:
- 완전한 CMS 관리자 페이지

---

### Phase 8: 성능 최적화
**목표**: 로딩 속도 및 렌더링 성능 개선
**예상 시간**: 2-3시간

**작업 항목**:
1. **Lazy Loading**:
   - Intersection Observer API 사용
   - 뷰포트 진입 시 영상/이미지 로드
   - 대표 영상 및 첫 3개 아이템은 즉시 로드

2. **이미지 최적화**:
   - Supabase Storage Transformation API 사용
   - WebP 포맷 변환
   - 이미지 압축 (TinyPNG, Squoosh)
   - 적절한 해상도 설정 (최대 1920px)

3. **영상 최적화**:
   - YouTube iframe 지연 로드 (Intersection Observer)
   - Thumbnail 우선 표시 (클릭 시 iframe 로드)
   - `loading="lazy"` 속성 활용

4. **CSS/JS 최적화**:
   - Minification (cssnano, Terser)
   - 불필요한 코드 제거
   - Critical CSS 인라인 (Above the fold)
   - JS 모듈 번들링 (선택사항)

5. **폰트 최적화**:
   - `font-display: swap` 적용
   - WOFF2 포맷 사용
   - 서브셋 폰트 (사용하는 한글만)
   - 폰트 preload

6. **Supabase 쿼리 최적화**:
   - 필요한 컬럼만 SELECT
   - 인덱스 활용 (category, display_order)
   - 페이지네이션 (필요 시)

**산출물**:
- Lighthouse 점수 90+ 달성
- 초기 로딩 시간 3초 이내

---

### Phase 9: Contact 폼 이메일 전송 (Edge Function)
**목표**: Contact 폼 제출 시 이메일 전송
**예상 시간**: 1-2시간

**작업 항목**:

#### 9-1. Edge Function 생성
- Supabase CLI 설치 및 로그인
- Edge Function 프로젝트 생성 (`supabase functions new send-contact-email`)

#### 9-2. 이메일 전송 로직 (Deno)
- **라이브러리**: Nodemailer 또는 Resend API
- **트리거**: Contact 폼 제출 시 호출
- **이메일 내용**:
  - 발신자: `noreply@stonfilm.com` (설정 필요)
  - 수신자: `song41@stonfilm.com`
  - 제목: `[STONFILM] 새로운 문의: ${full_name}`
  - 본문: Company, Full Name, Email, Phone, Message 포함

#### 9-3. Edge Function 배포
- `supabase functions deploy send-contact-email`
- Environment variables 설정 (SMTP 정보 또는 Resend API Key)

#### 9-4. 프론트엔드 연동
- Contact 폼 제출 시:
  1. `contact_submissions` 테이블에 INSERT
  2. Edge Function 호출 (이메일 전송)
  3. 성공/실패 메시지 표시

**산출물**:
- Contact 폼 이메일 전송 기능 완성

---

### Phase 10: 배포 및 운영
**목표**: 프로덕션 배포 및 모니터링
**예상 시간**: 1-2시간

**작업 항목**:
1. **호스팅 설정**:
   - Vercel / Netlify (권장, 자동 배포)
   - GitHub 연동
   - 빌드 설정 (HTML/CSS/JS)

2. **환경 변수 설정**:
   - Supabase URL 및 Anon Key
   - 프로덕션 환경 분리

3. **도메인 연결** (선택사항):
   - www.stonfilm.com
   - SSL 인증서 자동 발급 (Let's Encrypt)

4. **SEO 최적화**:
   - meta tags (title, description, keywords)
   - Open Graph (og:image, og:title, og:description)
   - sitemap.xml 생성
   - robots.txt 작성

5. **분석 도구** (선택사항):
   - Google Analytics 4
   - Google Search Console
   - Hotjar (히트맵)

6. **모니터링** (선택사항):
   - Uptime 체크 (UptimeRobot)
   - 에러 로깅 (Sentry)
   - Supabase Dashboard 모니터링

**산출물**:
- 운영 중인 프로덕션 사이트
- 지속적인 모니터링 체계

---

## 🐛 구현 시 주의사항

### 1. 라이트/다크 모드
- **CSS Variables 활용 필수**
- `prefers-color-scheme` 미디어 쿼리로 자동 감지
- 모든 색상을 변수로 정의
- 파트너사 로고 DarkModeMasking 로직 정확히 구현

### 2. Masonry 레이아웃
- 이미지 로드 완료 후 `layout()` 호출 필수
- 카테고리 필터 시 레이아웃 재계산
- 윈도우 리사이즈 이벤트 리스너 등록
- 고정 픽셀 너비 사용 (296px)

### 3. 대표 영상 랜덤 선택
- 16:9 비율 영상만 필터링
- 페이지 로드마다 다른 영상 표시
- `Math.random()` 사용

### 4. YouTube Iframe
- `loop=1` 사용 시 `playlist` 파라미터 필수
- `start` 파라미터는 초 단위
- 호버 시 `pointer-events: auto`

### 5. 비율 계산
- `aspectRatioToPercent()` 함수 정확도 유지
- 소수점 2자리까지 계산
- 다양한 비율 지원 (16:9, 9:16, 1:1, 4:3)

### 6. 카테고리 필터링
- ALL 선택 시 모든 항목 표시
- 선택된 카테고리만 필터링
- 필터 후 Masonry 레이아웃 재계산
- 애니메이션 효과 (fade-in/out)

### 7. 폼 검증
- 클라이언트 사이드 검증 필수
- 이메일 형식 체크
- 필수 필드 누락 방지
- 에러 메시지 표시

### 8. 접근성 (Accessibility)
- 시맨틱 HTML 사용
- alt 텍스트 제공
- ARIA 라벨 추가
- 키보드 네비게이션 지원

### 9. 브라우저 호환성
- Chrome, Safari, Firefox, Edge 테스트
- CSS Autoprefixer 사용
- Polyfill 필요 시 추가

### 10. 보안
- XSS 방어 (입력 값 sanitize)
- CSRF 토큰 (폼 제출 시)
- 이미지 업로드 시 파일 타입 검증

---

## 📁 최종 파일 구조

```
stonfilm-landing/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── typography.css
│   ├── layout.css
│   ├── sections/
│   │   ├── topbar.css
│   │   ├── about.css
│   │   ├── projects.css
│   │   ├── clients.css
│   │   ├── contact.css
│   │   └── footer.css
│   └── main.css
├── js/
│   ├── data/
│   │   └── portfolio-data.js
│   ├── utils/
│   │   ├── aspect-ratio.js
│   │   ├── shuffle.js
│   │   └── smooth-scroll.js
│   ├── components/
│   │   ├── masonry-grid.js
│   │   ├── category-filter.js
│   │   ├── featured-video.js
│   │   ├── logo-carousel.js
│   │   └── contact-form.js
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   └── logos/
│   │       ├── samsung.png
│   │       ├── com2us.png
│   │       ├── lotteria.png
│   │       └── ... (20개)
│   └── fonts/
│       └── TheBoldFont/
├── docs/
│   └── project-status.md
├── .gitignore
└── README.md
```

---

## 🔗 관련 리소스

### Figma 디자인
- **파일 ID**: LHgHXlDgUh33ZBNq5krXxp
- **노드 ID**: 25:1986 (Stonfilm_LandingPage)
- **URL**: https://www.figma.com/design/LHgHXlDgUh33ZBNq5krXxp/Stonfilm-Landing-Page?node-id=25-1986

### 라이브러리 & 도구
- **Masonry.js 문서**: https://masonry.desandro.com/
- **YouTube Iframe API**: https://developers.google.com/youtube/iframe_api_reference
- **The Bold Font**: https://www.cdnfonts.com/the-bold-font.font
- **Pretendard 폰트**: https://github.com/orioncactus/pretendard
- **Unsplash**: https://unsplash.com/ (샘플 이미지)

### 개발 도구
- **VS Code**: 코드 에디터
- **Live Server**: 로컬 개발 서버
- **Chrome DevTools**: 디버깅 및 성능 측정
- **Figma MCP**: 디자인 참조

---

## 📊 진행 상황 체크리스트

### Phase 1: 프로젝트 구조 설정 ✅
- [x] stonfilm-landing.html 프로토타입 완성
- [x] Figma 디자인 분석
- [x] project-status.md 문서화
- [x] **Supabase 백엔드 스택 결정**

### Phase 2: Supabase 백엔드 구축 ✅ (완료: 2025-10-15)
- [x] Supabase 프로젝트 생성 (fhaulipfxghmgmoytleh.supabase.co)
- [x] PostgreSQL 데이터베이스 테이블 스키마 작성 및 생성
  - [x] portfolio_items 테이블 (UUID, type, video_url, video_id, image_path 등)
  - [x] site_settings 테이블 (hero_image_path 등)
  - [x] contact_submissions 테이블
  - [x] updated_at 자동 업데이트 트리거 함수
- [x] Supabase Storage 버킷 생성
  - [x] portfolio-images 버킷 (10MB, Public)
  - [x] hero-images 버킷 (10MB, Public)
- [x] Row Level Security (RLS) 정책 설정
  - [x] Public read, Authenticated CUD
  - [x] Anon key 안전성 확보
- [x] 관리자 계정 생성 (song41@stonfilm.com)
- [x] 초기 데이터 시딩
  - [x] 22개 영상 데이터 (YouTube 링크)
  - [x] 제목 영문화 (The Bold Font 지원)
  - [x] 설명 2문장 이상 영문으로 작성
  - [x] Hero 이미지 업로드 (heroImage01_2048.webp)

**산출물**:
- `supabase/supabase-schema.sql` - 데이터베이스 스키마
- `supabase/supabase-rls-policies.sql` - RLS 정책
- `supabase/supabase-seed-videos-only.sql` - 초기 영상 데이터 (22개)
- `supabase/supabase-update-initial-data.sql` - 제목/설명 영문화

### Phase 3: 프론트엔드 구조화 및 Supabase 연동 ✅ (완료: 2025-10-15)
- [x] 디렉토리 구조 생성
  ```
  stonfilm/
  ├── index.html
  ├── css/
  │   ├── reset.css
  │   ├── variables.css (Light/Dark Mode)
  │   ├── typography.css
  │   ├── layout.css
  │   ├── sections/ (topbar, about, projects, clients, contact, footer)
  │   └── main.css
  ├── js/
  │   ├── config.js (Supabase 클라이언트)
  │   ├── api/ (portfolio, settings, contact, auth)
  │   ├── utils/ (aspect-ratio, shuffle)
  │   ├── components/ (masonry-grid, category-filter, featured-video, etc.)
  │   └── main.js
  ```
- [x] CSS 파일 분리 (variables.css, sections/)
- [x] JavaScript 모듈화
- [x] Supabase JS SDK 통합 (CDN, config.js)
- [x] API 호출 함수 작성
  - [x] `getAllPortfolio()`, `getPortfolioByCategory()`, `getWideVideos()`
  - [x] `getHeroImagePath()`, `updateHeroImagePath()`
  - [x] `submitContactForm()`, `getContactSubmissions()`
  - [x] `signIn()`, `signOut()`, `getCurrentUser()`

**산출물**:
- `js/config.js` - Supabase 클라이언트 설정 (실제 credentials 포함)
- `js/api/*.js` - API 함수 4개 파일
- `js/utils/*.js` - 유틸 함수 2개 파일

### Phase 4: 섹션별 UI 구현 (Supabase 데이터 연동) ✅ (완료: 2025-10-16, v1.0)
- [x] **HTML 기본 구조 작성** (index.html)
  - [x] All sections (TopBar, About, Projects, Clients, Contact, Footer)
  - [x] Supabase SDK CDN 포함
  - [x] Masonry.js CDN 포함
  - [x] 모든 JS/CSS 링크 연결
- [x] **CSS 전체 작성** (Figma 디자인 기반)
  - [x] `css/reset.css` - CSS 리셋
  - [x] `css/variables.css` - FLOWWW Design System (Light/Dark)
  - [x] `css/typography.css` - The Bold Font + Pretendard
  - [x] `css/layout.css` - Container 시스템 (936px/744px 중앙 정렬)
  - [x] `css/sections/topbar.css` - 투명 배경, 고정 네비게이션
  - [x] `css/sections/about.css` - Hero + Introduction
  - [x] `css/sections/projects.css` - Featured Video + Category Filter + Grid
  - [x] `css/sections/clients.css` - Logo Carousel
  - [x] `css/sections/contact.css` - Contact Form (2열 레이아웃)
  - [x] `css/sections/footer.css` - Footer (240px, 검정 배경)
  - [x] `css/main.css` - 글로벌 스타일
- [x] **JavaScript 컴포넌트 작성**
  - [x] `masonry-grid.js` - Masonry 레이아웃 + Supabase 연동
  - [x] `category-filter.js` - 카테고리 필터링
  - [x] `featured-video.js` - 랜덤 16:9 영상 선택
  - [x] `logo-carousel.js` - 자동 스크롤 로고 캐러셀
  - [x] `contact-form.js` - 폼 검증 + Supabase 제출
  - [x] `main.js` - 메인 진입점 (모든 컴포넌트 초기화)
- [x] **Figma 디자인 정확도 개선** (100% 완료)
  - [x] 컨테이너 너비 시스템 수정 (936px/744px 중앙 정렬)
  - [x] TopBar 투명 배경, 정확한 패딩
  - [x] Featured Video 레이아웃 (타이틀 360px 고정, 설명 오른쪽 정렬, 16px 간격)
  - [x] Category 버튼 스타일 (32px, 활성/비활성 색상)
  - [x] Contact Form 입력 필드 스타일 (#eef0f1 배경)
  - [x] Footer 구조 (min-height 240px, box-sizing)
  - [x] **Masonry.js 콜라주 레이아웃 완전 구현**
    - [x] 3열 그리드 (calc((100% - 48px) / 3), 24px gutter)
    - [x] .grid-sizer 기반 columnWidth 설정
    - [x] 이미지 로드 후 layout() 호출 (Promise.all)
    - [x] padding-bottom % 비율 기법 적용
    - [x] 비디오 카드: iframe 임베드 (autoplay, mute, loop, hover controls)
    - [x] 이미지 카드: scale(1.05) hover 효과
    - [x] 카드 텍스트 정보 제거 (깔끔한 비주얼)
- [x] **모바일 반응형 디자인** (768px breakpoint)
  - [x] 햄버거 메뉴 아이콘 (3줄 라인)
  - [x] 우측 슬라이드 사이드바 (160px 자동 너비, Figma 디자인 일치)
  - [x] Close 아이콘 버튼 (햄버거 위치와 동일)
  - [x] 사이드바 내비게이션 (About, Projects, Contact us Filled)
  - [x] Overlay 배경 (rgba(0,0,0,0.2))
  - [x] 모바일 폰트 사이즈 조정 (16px → 14px 설명문)
  - [x] About intro-title 줄넘김 수정 (white-space: normal)
  - [x] Footer 패딩 수정 (요소 오버플로우 해결)
- [x] **UI 인터랙션 효과 추가**
  - [x] Glow 효과 (Rainbow gradient hover animation)
    - TopBar Contact us 버튼 (Blank: 검정 배경 전환, Filled: glow만)
    - Mobile Sidebar Contact us 버튼
    - Contact Send Message 버튼
  - [x] Logo Carousel 무한 루프 구현
    - 2개 그룹 구조 (.logo-group)
    - JavaScript 정확한 너비 계산 (CSS variable --group-width)
    - 60초 애니메이션, 리사이즈 대응
- [x] **디테일 수정**
  - [x] Clients/Contact section-subtitle 마진 오버라이드
  - [x] 모든 16px 설명문 → 14px (모바일)
  - [x] TopBar Contact us opacity 전역 스타일 오버라이드
  - [x] Featured Video wrapper-info 간격 16px

**최종 상태 (v1.0)**:
- ✅ **완료**: HTML, CSS, JavaScript 기본 구조 완성
- ✅ **완료**: Figma 디자인 100% 일치 (데스크톱 + 모바일)
- ✅ **완료**: Masonry.js 동적 레이아웃 완전 작동
- ✅ **완료**: 반응형 디자인 (768px breakpoint)
- ✅ **완료**: 모바일 햄버거 메뉴 + 사이드바
- ✅ **완료**: UI 인터랙션 효과 (Glow, Carousel)
- ✅ **완료**: 모든 CSS 디테일 수정

**산출물 (v1.0)**:
- `index.html` - 완성된 HTML 구조 (모바일 메뉴 포함)
- `css/` - 12개 CSS 파일
  - `effects.css` - Glow 애니메이션 효과
  - `sections/topbar.css` - 햄버거 메뉴, 사이드바, glow 효과
  - `sections/projects.css` - Masonry 레이아웃, 비디오 iframe, 이미지 hover
  - `sections/about.css` - 반응형 intro-title
  - `sections/clients.css` - Logo carousel 무한 루프
  - `sections/contact.css` - Glow 효과 버튼
  - `sections/footer.css` - box-sizing 수정
- `js/components/` - 6개 컴포넌트 파일
  - `mobile-menu.js` - 햄버거 메뉴 토글, 사이드바 제어
  - `masonry-grid.js` - 이미지 로드 감지, 동적 레이아웃
  - `featured-video.js` - iframe autoplay/mute/loop
  - `logo-carousel.js` - 정확한 너비 계산, 무한 루프
  - `category-filter.js` - 카테고리 필터링
  - `contact-form.js` - 폼 검증 + Supabase 제출
- `js/main.js` - 메인 초기화 스크립트 (MobileMenu 추가)

### Phase 5: 반응형 최적화 (Mobile < 768px) ✅ (완료: 2025-10-16, v1.0)
- [x] Mobile 레이아웃 (1열 스택)
- [x] Masonry 콜라주 1열 전환
- [x] 문의 폼 1열 전환
- [x] 타이포그래피 조정 (16px → 14px 설명문)
- [x] 터치 인터랙션 최적화
- [x] 햄버거 메뉴 + 우측 슬라이드 사이드바 구현
- [x] Figma 디자인 완벽 일치

### Phase 6: 인터랙션 및 애니메이션 🔥 (진행 중: 60% 완료, v1.0)
- [x] 호버 효과
  - [x] Glow 효과 (무지개 그라데이션, 20초 애니메이션)
  - [x] TopBar Contact us 버튼 (Blank/Filled 상태별 다른 동작)
  - [x] Mobile Sidebar Contact us 버튼
  - [x] Contact Send Message 버튼
  - [x] Image card scale(1.05) hover
- [x] 로고 캐러셀 자동 스크롤
  - [x] 무한 루프 (2개 그룹 구조)
  - [x] JavaScript 정확한 너비 계산
  - [x] 60초 애니메이션, 리사이즈 대응
- [x] 카테고리 필터 애니메이션 (기본 구현)
- [ ] **스크롤 애니메이션 (Intersection Observer)** - 내일 작업 예정
- [ ] **Supabase 로딩 인디케이터** - 내일 작업 예정

**다음 작업 (2025-10-17 예정)**:
1. Contact 폼 제출 기능 테스트 및 버그 픽스
2. 백엔드 기능 연결 확인 및 미구현 기능 완성
3. 추가 CSS 애니메이션으로 생동감 향상
   - Fade-in on scroll (섹션별 등장 효과)
   - 로딩 스켈레톤 UI
   - 부드러운 전환 효과

### Phase 7: 관리자 페이지 구현 (Admin CMS)
- [ ] 로그인 페이지 (Supabase Authentication)
- [ ] 포트폴리오 관리 (CRUD)
  - [ ] 영상 추가 (YouTube URL)
  - [ ] 이미지 업로드 (Supabase Storage)
  - [ ] 수정/삭제
- [ ] Hero 이미지 교체
- [ ] Contact 제출 내역 조회

### Phase 8: 성능 최적화
- [ ] Lazy Loading (Intersection Observer)
- [ ] 이미지 최적화 (Supabase Storage Transformation)
- [ ] YouTube iframe 지연 로드
- [ ] CSS/JS Minification
- [ ] 폰트 최적화
- [ ] Supabase 쿼리 최적화
- [ ] Lighthouse 점수 90+

### Phase 9: Contact 폼 이메일 전송 (Edge Function)
- [ ] Edge Function 생성 및 배포
- [ ] 이메일 전송 로직 (Resend API)
- [ ] 프론트엔드 연동

### Phase 10: 배포 및 운영
- [ ] 호스팅 설정 (Vercel/Netlify)
- [ ] 환경 변수 설정 (Supabase Keys)
- [ ] 도메인 연결 (선택사항)
- [ ] SEO 최적화
- [ ] 분석 도구 설정 (선택사항)
- [ ] 모니터링 설정 (선택사항)

---

---

## 📅 버전 히스토리

### v1.0 (2025-10-16)
**프론트엔드 디자인 완성 버전**

**주요 기능**:
- ✅ Figma 디자인 100% 구현 (데스크톱 + 모바일)
- ✅ Masonry.js 완전 구현 (이미지 로드 감지, 동적 레이아웃)
- ✅ 모바일 반응형 디자인 (768px breakpoint)
- ✅ 햄버거 메뉴 + 우측 슬라이드 사이드바
- ✅ Glow 효과 (CTA 버튼들)
- ✅ Logo Carousel 무한 루프
- ✅ Featured Video iframe (autoplay, mute, loop, hover controls)
- ✅ Video/Image 카드 구분 (iframe vs img + hover 효과)

**완료된 Phase**:
- Phase 1: 프로젝트 구조 설정 ✅
- Phase 2: Supabase 백엔드 구축 ✅
- Phase 3: 프론트엔드 구조화 및 Supabase 연동 ✅
- Phase 4: 섹션별 UI 구현 (Supabase 데이터 연동) ✅
- Phase 5: 반응형 최적화 (Mobile < 768px) ✅
- Phase 6: 인터랙션 및 애니메이션 (60% 완료) 🔥

**다음 버전 (v1.1) 예정 작업**:
1. Contact 폼 제출 기능 테스트 및 버그 픽스
2. 백엔드 연결 확인 및 미구현 기능 완성
3. CSS 애니메이션 추가 (Fade-in on scroll, 로딩 UI)

---

*문서 작성일: 2025-10-15*
*최종 업데이트: 2025-10-16*
*작성자: Claude AI (Claude Code)*
*프로젝트 상태: v1.0 프론트엔드 디자인 완성, v1.1 백엔드 연동 및 애니메이션 작업 예정*
