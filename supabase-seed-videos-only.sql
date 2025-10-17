-- ==========================================
-- STONFILM Landing Page - Initial Data Seeding
-- 영상 데이터만 삽입 (22개)
-- ==========================================

-- portfolio_items 테이블에 영상 데이터 삽입

INSERT INTO portfolio_items (type, video_url, video_id, start_time, title, description, year, category, aspect_ratio, display_order) VALUES

-- CF (광고) - 9개
('video', 'https://www.youtube.com/watch?v=OuRGKnMJpaI', 'OuRGKnMJpaI', 0, '컴투스 이수지 1', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 1),
('video', 'https://www.youtube.com/watch?v=Yye2ar9sHsg', 'Yye2ar9sHsg', 0, '컴투스 이수지 2', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 2),
('video', 'https://www.youtube.com/watch?v=kv0zuvwUqeU', 'kv0zuvwUqeU', 0, '컴투스 이수지 3', '컴투스 서머너즈 워 광고 영상', 2025, 'CF', '16:9', 3),
('video', 'https://www.youtube.com/watch?v=4Z0G-WoPeIA', '4Z0G-WoPeIA', 0, 'Lotteria Chun Woo-hee CF 1', '롯데리아 천우희 광고 캠페인', 2024, 'CF', '16:9', 16),
('video', 'https://www.youtube.com/watch?v=bwzsX4bmbWg', 'bwzsX4bmbWg', 0, 'Lotteria Chun Woo-hee CF 2', '롯데리아 천우희 광고 캠페인 (세로형)', 2024, 'CF', '9:16', 17),
('video', 'https://www.youtube.com/watch?v=_RCl0Bki2PE', '_RCl0Bki2PE', 0, 'Lotteria Chun Woo-hee CF 3', '롯데리아 천우희 광고 캠페인', 2024, 'CF', '16:9', 18),
('video', 'https://www.youtube.com/watch?v=tNbeYN4g3y8', 'tNbeYN4g3y8', 0, 'Lotteria Chun Woo-hee CF 4', '롯데리아 천우희 광고 캠페인 (정사각형)', 2024, 'CF', '1:1', 19),
('video', 'https://www.youtube.com/watch?v=KaNG5M0YetY', 'KaNG5M0YetY', 0, 'World Vision Kim Hye-ja', '월드비전 김혜자 홍보 영상', 2024, 'CF', '16:9', 20),
('video', 'https://www.youtube.com/watch?v=sXJvf8NEGQA', 'sXJvf8NEGQA', 0, 'E-Mart Tae Live Clip', '이마트 태연 라이브 클립', 2024, 'CF', '16:9', 15),

-- MUSICVIDEO (뮤직비디오) - 3개
('video', 'https://www.youtube.com/watch?v=1MHuqesCz3s', '1MHuqesCz3s', 0, '뱀파이어호텔 - KillSwitch', '뱀파이어호텔 뮤직비디오', 2024, 'MUSICVIDEO', '16:9', 4),
('video', 'https://www.youtube.com/watch?v=6NILzQ0hMF0', '6NILzQ0hMF0', 0, '뱀파이어호텔 - The Sewing Machine', '뱀파이어호텔 뮤직비디오', 2024, 'MUSICVIDEO', '16:9', 5),
('video', 'https://www.youtube.com/watch?v=5pmctvN0euM', '5pmctvN0euM', 0, 'Celestia music video', 'Celestia 뮤직비디오', 2024, 'MUSICVIDEO', '16:9', 8),

-- ENT (예능/브랜드필름) - 3개
('video', 'https://www.youtube.com/watch?v=XhAAvD_bmo4', 'XhAAvD_bmo4', 0, 'Ministry of Patriots and Veterans Affairs', '국가보훈부 홍보 영상', 2024, 'ENT', '16:9', 6),
('video', 'https://www.youtube.com/watch?v=ANRk61jJfAQ', 'ANRk61jJfAQ', 0, 'Zero Base One Trailer', '제로베이스원 트레일러', 2024, 'ENT', '16:9', 7),
('video', 'https://www.youtube.com/watch?v=_KlHfMHJEuY', '_KlHfMHJEuY', 0, 'Gyeonggi Contents', '경기콘텐츠진흥원 영상', 2024, 'ENT', '16:9', 21),

-- MOVIE (영화 트레일러) - 7개
('video', 'https://www.youtube.com/watch?v=Ud2rJE1mx-Y', 'Ud2rJE1mx-Y', 0, 'Say My Name Trailer 1', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 9),
('video', 'https://www.youtube.com/watch?v=9gWpUwcJYFg', '9gWpUwcJYFg', 0, 'Say My Name Trailer 2', 'Say My Name 영화 트레일러 (세로형)', 2024, 'MOVIE', '9:16', 10),
('video', 'https://www.youtube.com/watch?v=NIWc0ApWb00', 'NIWc0ApWb00', 0, 'Say My Name Trailer 3', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 11),
('video', 'https://www.youtube.com/watch?v=uHpgaKvk8ds', 'uHpgaKvk8ds', 0, 'Say My Name Trailer 4', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 12),
('video', 'https://www.youtube.com/watch?v=D57wuQkSzRU', 'D57wuQkSzRU', 0, 'Say My Name Trailer 5', 'Say My Name 영화 트레일러 (정사각형)', 2024, 'MOVIE', '1:1', 13),
('video', 'https://www.youtube.com/watch?v=PaZlwnIRRcM', 'PaZlwnIRRcM', 0, 'Say My Name Trailer 6', 'Say My Name 영화 트레일러 (세로형)', 2024, 'MOVIE', '9:16', 14),
('video', 'https://www.youtube.com/watch?v=mb4m3-Rze9w', 'mb4m3-Rze9w', 0, 'Say My Name Trailer 7', 'Say My Name 영화 트레일러', 2024, 'MOVIE', '16:9', 22);


-- ==========================================
-- 완료 메시지
-- ==========================================
DO $$
DECLARE
    video_count INTEGER;
    cf_count INTEGER;
    mv_count INTEGER;
    ent_count INTEGER;
    movie_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO video_count FROM portfolio_items WHERE type = 'video';
    SELECT COUNT(*) INTO cf_count FROM portfolio_items WHERE type = 'video' AND category = 'CF';
    SELECT COUNT(*) INTO mv_count FROM portfolio_items WHERE type = 'video' AND category = 'MUSICVIDEO';
    SELECT COUNT(*) INTO ent_count FROM portfolio_items WHERE type = 'video' AND category = 'ENT';
    SELECT COUNT(*) INTO movie_count FROM portfolio_items WHERE type = 'video' AND category = 'MOVIE';

    RAISE NOTICE '✅ 영상 데이터 시딩 완료!';
    RAISE NOTICE '';
    RAISE NOTICE '📹 총 영상: % 개', video_count;
    RAISE NOTICE '   - CF (광고): % 개', cf_count;
    RAISE NOTICE '   - MUSICVIDEO: % 개', mv_count;
    RAISE NOTICE '   - ENT: % 개', ent_count;
    RAISE NOTICE '   - MOVIE: % 개', movie_count;
    RAISE NOTICE '';
    RAISE NOTICE '📊 비율 분포:';
    RAISE NOTICE '   - 16:9 (와이드): % 개', (SELECT COUNT(*) FROM portfolio_items WHERE aspect_ratio = '16:9');
    RAISE NOTICE '   - 9:16 (세로): % 개', (SELECT COUNT(*) FROM portfolio_items WHERE aspect_ratio = '9:16');
    RAISE NOTICE '   - 1:1 (정사각): % 개', (SELECT COUNT(*) FROM portfolio_items WHERE aspect_ratio = '1:1');
    RAISE NOTICE '';
    RAISE NOTICE '💡 이미지 데이터는 나중에 추가 가능합니다!';
END $$;
