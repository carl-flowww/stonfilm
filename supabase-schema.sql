-- ==========================================
-- STONFILM Landing Page - Database Schema
-- Supabase PostgreSQL
-- ==========================================

-- 1. portfolio_items 테이블 생성
-- 포트폴리오 항목 (영상/이미지) 저장
CREATE TABLE IF NOT EXISTS portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- 타입: 'video' 또는 'image'
    type TEXT NOT NULL CHECK (type IN ('video', 'image')),

    -- 영상 관련 필드 (YouTube)
    video_url TEXT,
    video_id TEXT,
    start_time INTEGER DEFAULT 0,

    -- 이미지 관련 필드 (Supabase Storage)
    image_path TEXT,

    -- 공통 메타데이터
    title TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('CF', 'ENT', 'MOVIE', 'MUSICVIDEO', 'SNAPSHOT', 'VFX', 'ETC')),
    aspect_ratio TEXT NOT NULL,  -- '16:9', '9:16', '1:1', '4:3' 등

    -- 표시 순서 (Masonry 레이아웃)
    display_order INTEGER,

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_year ON portfolio_items(year);
CREATE INDEX IF NOT EXISTS idx_portfolio_display_order ON portfolio_items(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_type ON portfolio_items(type);


-- 2. site_settings 테이블 생성
-- 사이트 설정 (Hero 이미지 경로 등) 저장
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,  -- 설정 설명 (선택)
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 초기 데이터 삽입 (Hero 이미지 기본값)
INSERT INTO site_settings (key, value, description) VALUES
    ('hero_image_path', '/hero-images/default-hero.jpg', 'About 섹션 Hero 배경 이미지 경로')
ON CONFLICT (key) DO NOTHING;


-- 3. contact_submissions 테이블 생성
-- Contact 폼 제출 내역 저장
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (제출 날짜순 조회)
CREATE INDEX IF NOT EXISTS idx_contact_submitted_at ON contact_submissions(submitted_at DESC);


-- 4. updated_at 자동 업데이트 함수 생성
-- 레코드 수정 시 updated_at 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger 생성 (updated_at 자동 업데이트)
DROP TRIGGER IF EXISTS update_portfolio_items_updated_at ON portfolio_items;
CREATE TRIGGER update_portfolio_items_updated_at
    BEFORE UPDATE ON portfolio_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==========================================
-- 완료 메시지
-- ==========================================
DO $$
BEGIN
    RAISE NOTICE '✅ 데이터베이스 스키마 생성 완료!';
    RAISE NOTICE '   - portfolio_items 테이블';
    RAISE NOTICE '   - site_settings 테이블';
    RAISE NOTICE '   - contact_submissions 테이블';
    RAISE NOTICE '   - 인덱스 및 Trigger 설정 완료';
END $$;
