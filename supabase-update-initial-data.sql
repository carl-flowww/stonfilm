-- ==========================================
-- STONFILM Landing Page - Update Initial Data
-- 제목을 영어로, 설명을 더 길고 상세하게 수정
-- ==========================================

-- 제목: The Bold Font는 영어만 지원
-- 설명: 대표 영상 표시용으로 2문장 이상의 영문 설명

-- CF (광고) - 9개
UPDATE portfolio_items SET
    title = 'Com2uS Lee Suji Campaign Vol.1',
    description = 'A dynamic advertising campaign featuring Lee Suji for Com2uS Summoners War. This commercial showcases high-energy action sequences with stunning visual effects.'
WHERE video_id = 'OuRGKnMJpaI';

UPDATE portfolio_items SET
    title = 'Com2uS Lee Suji Campaign Vol.2',
    description = 'The second installment of the Com2uS Summoners War series with Lee Suji. Features epic battle scenes and immersive gaming atmosphere with cutting-edge CGI.'
WHERE video_id = 'Yye2ar9sHsg';

UPDATE portfolio_items SET
    title = 'Com2uS Lee Suji Campaign Vol.3',
    description = 'Final chapter of the Lee Suji trilogy for Com2uS Summoners War. Delivers powerful storytelling combined with breathtaking cinematography and special effects.'
WHERE video_id = 'kv0zuvwUqeU';

UPDATE portfolio_items SET
    title = 'Lotteria x Chun Woo-hee CF',
    description = 'Lotteria brand campaign featuring actress Chun Woo-hee in a warm and inviting setting. The commercial emphasizes authentic emotions and delicious food moments.'
WHERE video_id = '4Z0G-WoPeIA';

UPDATE portfolio_items SET
    title = 'Lotteria x Chun Woo-hee Vertical',
    description = 'Vertical format version of Lotteria campaign optimized for mobile platforms. Captures intimate moments with Chun Woo-hee in a contemporary lifestyle setting.'
WHERE video_id = 'bwzsX4bmbWg';

UPDATE portfolio_items SET
    title = 'Lotteria x Chun Woo-hee Social Cut',
    description = 'Social media optimized version of the Lotteria campaign with Chun Woo-hee. Designed to engage younger audiences with fresh and vibrant visual language.'
WHERE video_id = '_RCl0Bki2PE';

UPDATE portfolio_items SET
    title = 'Lotteria x Chun Woo-hee Square',
    description = 'Square format social media content featuring Chun Woo-hee for Lotteria. Perfect for Instagram feed with bold colors and appetizing food shots.'
WHERE video_id = 'tNbeYN4g3y8';

UPDATE portfolio_items SET
    title = 'World Vision x Kim Hye-ja',
    description = 'Heartfelt charity campaign for World Vision featuring legendary actress Kim Hye-ja. A touching narrative that inspires hope and encourages humanitarian support.'
WHERE video_id = 'KaNG5M0YetY';

UPDATE portfolio_items SET
    title = 'E-Mart x Taeyeon Live Clip',
    description = 'Live performance clip for E-Mart featuring K-pop star Taeyeon. Combines retail brand messaging with authentic musical performance in an innovative format.'
WHERE video_id = 'sXJvf8NEGQA';


-- MUSICVIDEO (뮤직비디오) - 3개
UPDATE portfolio_items SET
    title = 'Vampire Hotel - KillSwitch',
    description = 'Dark and atmospheric music video for Korean rock band Vampire Hotel. Features moody cinematography and powerful performance sequences with dramatic lighting.'
WHERE video_id = '1MHuqesCz3s';

UPDATE portfolio_items SET
    title = 'Vampire Hotel - The Sewing Machine',
    description = 'Cinematic music video exploring themes of industrial aesthetics for Vampire Hotel. Shot with meticulous attention to detail and surreal visual metaphors.'
WHERE video_id = '6NILzQ0hMF0';

UPDATE portfolio_items SET
    title = 'Celestia Music Video',
    description = 'Dreamy and ethereal music video with celestial imagery and soft color palettes. Creates an otherworldly atmosphere through careful art direction and visual effects.'
WHERE video_id = '5pmctvN0euM';


-- ENT (예능/브랜드필름) - 3개
UPDATE portfolio_items SET
    title = 'Ministry of Patriots Campaign',
    description = 'Government campaign for the Ministry of Patriots and Veterans Affairs. A respectful tribute honoring those who served the nation with moving storytelling.'
WHERE video_id = 'XhAAvD_bmo4';

UPDATE portfolio_items SET
    title = 'ZEROBASEONE Official Trailer',
    description = 'High-energy promotional trailer for K-pop group ZEROBASEONE. Features dynamic choreography and cinematic production values showcasing the group''s unique identity.'
WHERE video_id = 'ANRk61jJfAQ';

UPDATE portfolio_items SET
    title = 'Gyeonggi Contents Agency',
    description = 'Corporate video for Gyeonggi Content Agency highlighting creative industries in the region. Showcases innovation and cultural diversity through compelling visual narrative.'
WHERE video_id = '_KlHfMHJEuY';


-- MOVIE (영화 트레일러) - 7개
UPDATE portfolio_items SET
    title = 'Say My Name - Official Trailer',
    description = 'Cinematic trailer for the feature film "Say My Name". A gripping narrative with powerful performances and stunning visuals that draw audiences into the story.'
WHERE video_id = 'Ud2rJE1mx-Y';

UPDATE portfolio_items SET
    title = 'Say My Name - Vertical Teaser',
    description = 'Mobile-optimized vertical teaser for "Say My Name" designed for social platforms. Captures key emotional beats with impactful editing and sound design.'
WHERE video_id = '9gWpUwcJYFg';

UPDATE portfolio_items SET
    title = 'Say My Name - Character Spotlight',
    description = 'Character-focused promotional content for "Say My Name" highlighting lead performances. Builds intrigue through carefully selected dramatic moments.'
WHERE video_id = 'NIWc0ApWb00';

UPDATE portfolio_items SET
    title = 'Say My Name - Story Teaser',
    description = 'Story-driven teaser revealing plot elements of "Say My Name" to generate audience interest. Balances mystery with compelling visual storytelling.'
WHERE video_id = 'uHpgaKvk8ds';

UPDATE portfolio_items SET
    title = 'Say My Name - Social Cut',
    description = 'Square format social media content for "Say My Name" optimized for Instagram and Facebook. Designed for maximum engagement with bold typography and striking imagery.'
WHERE video_id = 'D57wuQkSzRU';

UPDATE portfolio_items SET
    title = 'Say My Name - Mobile Exclusive',
    description = 'Vertical format exclusive content for "Say My Name" targeting mobile-first audiences. Features behind-the-scenes moments mixed with trailer footage.'
WHERE video_id = 'PaZlwnIRRcM';

UPDATE portfolio_items SET
    title = 'Say My Name - Final Trailer',
    description = 'Final theatrical trailer for "Say My Name" showcasing the complete story arc. Epic in scope with emotional depth and technical excellence in every frame.'
WHERE video_id = 'mb4m3-Rze9w';


-- ==========================================
-- 완료 메시지
-- ==========================================
DO $$
BEGIN
    RAISE NOTICE '✅ 초기 데이터 업데이트 완료!';
    RAISE NOTICE '';
    RAISE NOTICE '📝 변경 사항:';
    RAISE NOTICE '   - 모든 제목을 영어로 변경 (The Bold Font 호환)';
    RAISE NOTICE '   - 모든 설명을 2문장 이상의 영문으로 확장';
    RAISE NOTICE '   - 대표 영상 표시에 적합한 길이로 조정';
    RAISE NOTICE '';
    RAISE NOTICE '🎬 총 22개 영상 데이터 업데이트 완료';
END $$;
