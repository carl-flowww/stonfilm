-- ==========================================
-- STONFILM Landing Page - RLS Policies
-- Row Level Security 정책 설정
-- ==========================================

-- ==========================================
-- 1. portfolio_items 테이블 RLS
-- ==========================================

-- RLS 활성화
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- 정책 1: 모든 사용자 읽기 가능 (공개)
CREATE POLICY "portfolio_items_public_read"
ON portfolio_items FOR SELECT
TO public
USING (true);

-- 정책 2: 인증된 사용자만 추가 가능
CREATE POLICY "portfolio_items_authenticated_insert"
ON portfolio_items FOR INSERT
TO authenticated
WITH CHECK (true);

-- 정책 3: 인증된 사용자만 수정 가능
CREATE POLICY "portfolio_items_authenticated_update"
ON portfolio_items FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 정책 4: 인증된 사용자만 삭제 가능
CREATE POLICY "portfolio_items_authenticated_delete"
ON portfolio_items FOR DELETE
TO authenticated
USING (true);


-- ==========================================
-- 2. site_settings 테이블 RLS
-- ==========================================

-- RLS 활성화
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 정책 1: 모든 사용자 읽기 가능 (Hero 이미지 경로 조회)
CREATE POLICY "site_settings_public_read"
ON site_settings FOR SELECT
TO public
USING (true);

-- 정책 2: 인증된 사용자만 수정 가능 (Hero 이미지 교체)
CREATE POLICY "site_settings_authenticated_update"
ON site_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);


-- ==========================================
-- 3. contact_submissions 테이블 RLS
-- ==========================================

-- RLS 활성화
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 정책 1: 누구나 Contact 폼 제출 가능
CREATE POLICY "contact_submissions_public_insert"
ON contact_submissions FOR INSERT
TO public
WITH CHECK (true);

-- 정책 2: 인증된 사용자만 제출 내역 조회 가능 (관리자)
CREATE POLICY "contact_submissions_authenticated_read"
ON contact_submissions FOR SELECT
TO authenticated
USING (true);


-- ==========================================
-- 4. Storage 버킷 RLS 정책
-- ==========================================

-- portfolio-images 버킷 정책
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 정책 1: 모든 사용자 이미지 읽기 가능
CREATE POLICY "portfolio_images_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

-- 정책 2: 인증된 사용자만 이미지 업로드 가능
CREATE POLICY "portfolio_images_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

-- 정책 3: 인증된 사용자만 이미지 수정 가능
CREATE POLICY "portfolio_images_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

-- 정책 4: 인증된 사용자만 이미지 삭제 가능
CREATE POLICY "portfolio_images_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');


-- hero-images 버킷 정책
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-images', 'hero-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 정책 1: 모든 사용자 Hero 이미지 읽기 가능
CREATE POLICY "hero_images_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'hero-images');

-- 정책 2: 인증된 사용자만 Hero 이미지 업로드 가능
CREATE POLICY "hero_images_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'hero-images');

-- 정책 3: 인증된 사용자만 Hero 이미지 수정 가능
CREATE POLICY "hero_images_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'hero-images');

-- 정책 4: 인증된 사용자만 Hero 이미지 삭제 가능
CREATE POLICY "hero_images_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'hero-images');


-- ==========================================
-- 완료 메시지
-- ==========================================
DO $$
BEGIN
    RAISE NOTICE '✅ RLS 정책 설정 완료!';
    RAISE NOTICE '   📖 공개 읽기:';
    RAISE NOTICE '      - portfolio_items (모든 사용자)';
    RAISE NOTICE '      - site_settings (모든 사용자)';
    RAISE NOTICE '      - Storage 이미지 (모든 사용자)';
    RAISE NOTICE '   ✍️  공개 쓰기:';
    RAISE NOTICE '      - contact_submissions 제출 (방문자)';
    RAISE NOTICE '   🔒 인증 필요:';
    RAISE NOTICE '      - portfolio_items 추가/수정/삭제 (관리자)';
    RAISE NOTICE '      - site_settings 수정 (관리자)';
    RAISE NOTICE '      - contact_submissions 조회 (관리자)';
    RAISE NOTICE '      - Storage 업로드/삭제 (관리자)';
END $$;
