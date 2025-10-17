-- ==========================================
-- STONFILM Landing Page - Initial Data Seeding
-- 기존 프로토타입 포트폴리오 데이터 삽입
-- ==========================================

-- portfolio_items 테이블에 초기 데이터 삽입
-- 영상 + 이미지 (총 52개 항목)

INSERT INTO portfolio_items (type, video_url, video_id, start_time, title, description, year, category, aspect_ratio, display_order) VALUES
-- CF (광고) 영상
('video', 'https://www.youtube.com/watch?v=OuRGKnMJpaI', 'OuRGKnMJpaI', 0, '컴투스 이수지 1', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 1),
('video', 'https://www.youtube.com/watch?v=Yye2ar9sHsg', 'Yye2ar9sHsg', 0, '컴투스 이수지 2', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 2),
('video', 'https://www.youtube.com/watch?v=kv0zuvwUqeU', 'kv0zuvwUqeU', 0, '컴투스 이수지 3', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 3),
('video', 'https://www.youtube.com/watch?v=4Z0G-WoPeIA', '4Z0G-WoPeIA', 0, 'Lotteria Chun Woo-hee CF 1', '롯데리아 천우희 광고 캠페인', 2024, 'CF', '16:9', 16),
('video', 'https://www.youtube.com/watch?v=bwzsX4bmbWg', 'bwzsX4bmbWg', 0, 'Lotteria Chun Woo-hee CF 2', '롯데리아 천우희 광고 캠페인', 2024, 'CF', '9:16', 17),
('video', 'https://www.youtube.com/watch?v=_RCl0Bki2PE', '_RCl0Bki2PE', 0, 'Lotteria Chun Woo-hee CF 3', '롯데리아 천우희 광고 캠페인', 2024, 'CF', '16:9', 18),
('video', 'https://www.youtube.com/watch?v=tNbeYN4g3y8', 'tNbeYN4g3y8', 0, 'Lotteria Chun Woo-hee CF 4', '롯데리아 천우희 광고 캠페인', 2024, 'CF', '1:1', 19),
('video', 'https://www.youtube.com/watch?v=KaNG5M0YetY', 'KaNG5M0YetY', 0, 'World Vision Kim Hye-ja', '월드비전 김혜자 홍보 영상', 2024, 'CF', '16:9', 20),
('video', 'https://www.youtube.com/watch?v=sXJvf8NEGQA', 'sXJvf8NEGQA', 0, 'E-Mart Tae Live Clip', '이마트 태연 라이브 클립', 2024, 'CF', '16:9', 15),

-- MUSICVIDEO (뮤직비디오)
('video', 'https://www.youtube.com/watch?v=1MHuqesCz3s', '1MHuqesCz3s', 0, '뱀파이어호텔 - KillSwitch', '뱀파이어호텔 뮤직비디오', 2024, 'MUSICVIDEO', '16:9', 4),
('video', 'https://www.youtube.com/watch?v=6NILzQ0hMF0', '6NILzQ0hMF0', 0, '뱀파이어호텔 - The Sewing Machine', '뱀파이어호텔 뮤직비디오', 2024, 'MUSICVIDEO', '16:9', 5),
('video', 'https://www.youtube.com/watch?v=5pmctvN0euM', '5pmctvN0euM', 0, 'Celestia music video', 'Celestia 뮤직비디오', 2024, 'MUSICVIDEO', '16:9', 8),

-- ENT (예능/브랜드필름)
('video', 'https://www.youtube.com/watch?v=XhAAvD_bmo4', 'XhAAvD_bmo4', 0, 'Ministry of Patriots and Veterans Affairs', '국가보훈부 홍보 영상', 2024, 'ENT', '16:9', 6),
('video', 'https://www.youtube.com/watch?v=ANRk61jJfAQ', 'ANRk61jJfAQ', 0, 'Zero Base One Trailer', '제로베이스원 트레일러', 2024, 'ENT', '16:9', 7),
('video', 'https://www.youtube.com/watch?v=_KlHfMHJEuY', '_KlHfMHJEuY', 0, 'Gyeonggi Contents', '경기콘텐츠진흥원 영상', 2024, 'ENT', '16:9', 21),

-- MOVIE (영화 트레일러)
('video', 'https://www.youtube.com/watch?v=Ud2rJE1mx-Y', 'Ud2rJE1mx-Y', 0, 'Say My Name Trailer 1', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 9),
('video', 'https://www.youtube.com/watch?v=9gWpUwcJYFg', '9gWpUwcJYFg', 0, 'Say My Name Trailer 2', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '9:16', 10),
('video', 'https://www.youtube.com/watch?v=NIWc0ApWb00', 'NIWc0ApWb00', 0, 'Say My Name Trailer 3', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 11),
('video', 'https://www.youtube.com/watch?v=uHpgaKvk8ds', 'uHpgaKvk8ds', 0, 'Say My Name Trailer 4', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 12),
('video', 'https://www.youtube.com/watch?v=D57wuQkSzRU', 'D57wuQkSzRU', 0, 'Say My Name Trailer 5', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '1:1', 13),
('video', 'https://www.youtube.com/watch?v=PaZlwnIRRcM', 'PaZlwnIRRcM', 0, 'Say My Name Trailer 6', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '9:16', 14);

-- ==========================================
-- 이미지 항목 (SNAPSHOT)
-- 주의: image_path는 나중에 실제 이미지 업로드 후 UPDATE 필요
-- 현재는 Unsplash URL을 임시로 description에 저장
-- ==========================================

INSERT INTO portfolio_items (type, image_path, title, description, year, category, aspect_ratio, display_order) VALUES
('image', 'temp/studio-portrait.jpg', 'Studio Portrait', 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200', 2024, 'SNAPSHOT', '814:470', 101),
('image', 'temp/music-video.jpg', 'Music Video', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200', 2024, 'SNAPSHOT', '811:470', 102),
('image', 'temp/cinematic.jpg', 'Cinematic', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 2024, 'SNAPSHOT', '317:470', 103),
('image', 'temp/film-production.jpg', 'Film Production', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800', 2024, 'SNAPSHOT', '317:470', 104),
('image', 'temp/movie-scene.jpg', 'Movie Scene', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400', 2024, 'SNAPSHOT', '951:470', 105),
('image', 'temp/fashion.jpg', 'Fashion', 'https://images.unsplash.com/photo-1509902967141-f5c0bb2b7417?w=900', 2024, 'SNAPSHOT', '394:470', 106),
('image', 'temp/studio.jpg', 'Studio', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', 2024, 'SNAPSHOT', '595:470', 107),
('image', 'temp/commercial.jpg', 'Commercial', 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=1200', 2024, 'SNAPSHOT', '595:470', 108),
('image', 'temp/cinematic-wide.jpg', 'Cinematic Wide', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600', 2024, 'SNAPSHOT', '1219:470', 109),
('image', 'temp/model.jpg', 'Model', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900', 2024, 'SNAPSHOT', '406:470', 110),
('image', 'temp/vfx.jpg', 'VFX', 'https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=1100', 2024, 'VFX', '522:470', 111),
('image', 'temp/band.jpg', 'Band', 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1200', 2024, 'SNAPSHOT', '539:470', 112),
('image', 'temp/artist.jpg', 'Artist', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=1100', 2024, 'SNAPSHOT', '524:470', 113),
('image', 'temp/concert.jpg', 'Concert', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900', 2024, 'SNAPSHOT', '357:470', 114),
('image', 'temp/director.jpg', 'Director', 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600', 2024, 'SNAPSHOT', '1268:470', 115),
('image', 'temp/product.jpg', 'Product', 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=1400', 2024, 'SNAPSHOT', '793:470', 116),
('image', 'temp/actor.jpg', 'Actor', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900', 2024, 'SNAPSHOT', '396:470', 117),
('image', 'temp/dramatic.jpg', 'Dramatic', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900', 2024, 'SNAPSHOT', '396:470', 118),
('image', 'temp/bts.jpg', 'BTS', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400', 2024, 'SNAPSHOT', '951:470', 119),
('image', 'temp/editorial.jpg', 'Editorial', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800', 2024, 'SNAPSHOT', '317:470', 120),
('image', 'temp/model-shoot.jpg', 'Model Shoot', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800', 2024, 'SNAPSHOT', '317:470', 121),
('image', 'temp/tech.jpg', 'Tech', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200', 2024, 'SNAPSHOT', '595:470', 122),
('image', 'temp/team.jpg', 'Team', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200', 2024, 'SNAPSHOT', '595:470', 123),
('image', 'temp/creative.jpg', 'Creative', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900', 2024, 'SNAPSHOT', '394:470', 124),
('image', 'temp/beauty.jpg', 'Beauty', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200', 2024, 'SNAPSHOT', '814:470', 125),
('image', 'temp/male-model.jpg', 'Male Model', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200', 2024, 'SNAPSHOT', '811:470', 126),
('image', 'temp/dance.jpg', 'Dance', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000', 2024, 'SNAPSHOT', '476:470', 127),
('image', 'temp/crew.jpg', 'Crew', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000', 2024, 'SNAPSHOT', '476:470', 128),
('image', 'temp/session.jpg', 'Session', 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1300', 2024, 'SNAPSHOT', '634:470', 129),
('image', 'temp/lighting.jpg', 'Lighting', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600', 2024, 'SNAPSHOT', '1219:470', 130),
('image', 'temp/editorial-2.jpg', 'Editorial 2', 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900', 2024, 'SNAPSHOT', '406:470', 131);


-- ==========================================
-- 완료 메시지
-- ==========================================
DO $$
DECLARE
    video_count INTEGER;
    image_count INTEGER;
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO video_count FROM portfolio_items WHERE type = 'video';
    SELECT COUNT(*) INTO image_count FROM portfolio_items WHERE type = 'image';
    SELECT COUNT(*) INTO total_count FROM portfolio_items;

    RAISE NOTICE '✅ 초기 데이터 시딩 완료!';
    RAISE NOTICE '   📹 영상: % 개', video_count;
    RAISE NOTICE '   🖼️  이미지: % 개', image_count;
    RAISE NOTICE '   📊 총계: % 개', total_count;
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  이미지 항목 안내:';
    RAISE NOTICE '   - 현재 image_path는 임시 경로입니다';
    RAISE NOTICE '   - Unsplash URL은 description 필드에 임시 저장되어 있습니다';
    RAISE NOTICE '   - 관리자 페이지에서 실제 이미지 업로드 후 경로를 업데이트하세요';
END $$;
