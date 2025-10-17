// ==========================================
// Portfolio API Functions
// Supabase portfolio_items 테이블 CRUD
// ==========================================

/**
 * 모든 포트폴리오 조회
 * @returns {Promise<{data: Array, error: Object}>}
 */
async function getAllPortfolio() {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true });

    return { data, error };
}

/**
 * 카테고리별 포트폴리오 조회
 * @param {string} category - 'CF', 'ENT', 'MOVIE', 'MUSICVIDEO', 'SNAPSHOT', 'VFX', 'ETC' 또는 'ALL'
 * @returns {Promise<{data: Array, error: Object}>}
 */
async function getPortfolioByCategory(category) {
    // ALL 선택 시 전체 조회
    if (category === 'ALL') {
        return getAllPortfolio();
    }

    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true });

    return { data, error };
}

/**
 * 16:9 비율의 영상만 조회 (대표 영상용)
 * @returns {Promise<{data: Array, error: Object}>}
 */
async function getWideVideos() {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('type', 'video')
        .eq('aspect_ratio', '16:9');

    return { data, error };
}

/**
 * 특정 포트폴리오 항목 조회 (ID로)
 * @param {string} id - UUID
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function getPortfolioById(id) {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('id', id)
        .single();

    return { data, error };
}

/**
 * 새 포트폴리오 항목 추가 (관리자용)
 * @param {Object} portfolioData - 포트폴리오 데이터
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function addPortfolio(portfolioData) {
    const { data, error } = await supabase
        .from('portfolio_items')
        .insert(portfolioData)
        .select()
        .single();

    return { data, error };
}

/**
 * 포트폴리오 항목 수정 (관리자용)
 * @param {string} id - UUID
 * @param {Object} updates - 업데이트할 필드
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function updatePortfolio(id, updates) {
    const { data, error } = await supabase
        .from('portfolio_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    return { data, error };
}

/**
 * 포트폴리오 항목 삭제 (관리자용)
 * @param {string} id - UUID
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function deletePortfolio(id) {
    const { data, error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

    return { data, error };
}

/**
 * YouTube URL에서 video ID 추출
 * @param {string} url - YouTube URL
 * @returns {string|null} - video ID
 */
function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }

    return null;
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     getAllPortfolio,
//     getPortfolioByCategory,
//     getWideVideos,
//     getPortfolioById,
//     addPortfolio,
//     updatePortfolio,
//     deletePortfolio,
//     extractYouTubeVideoId
// };
