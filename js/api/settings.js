// ==========================================
// Site Settings API Functions
// Supabase site_settings 테이블 관리
// ==========================================

/**
 * Hero 이미지 경로 조회
 * @returns {Promise<{data: string|null, error: Object}>}
 */
async function getHeroImagePath() {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'hero_image_path')
        .single();

    if (error) return { data: null, error };
    return { data: data.value, error: null };
}

/**
 * Hero 이미지 경로 업데이트 (관리자용)
 * @param {string} newPath - 새 이미지 경로
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function updateHeroImagePath(newPath) {
    const { data, error } = await supabase
        .from('site_settings')
        .update({ value: newPath })
        .eq('key', 'hero_image_path')
        .select()
        .single();

    return { data, error };
}

/**
 * 특정 설정 값 조회
 * @param {string} key - 설정 키
 * @returns {Promise<{data: string|null, error: Object}>}
 */
async function getSetting(key) {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error) return { data: null, error };
    return { data: data.value, error: null };
}

/**
 * 설정 값 업데이트 (관리자용)
 * @param {string} key - 설정 키
 * @param {string} value - 새 값
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function updateSetting(key, value) {
    const { data, error } = await supabase
        .from('site_settings')
        .update({ value: value })
        .eq('key', key)
        .select()
        .single();

    return { data, error };
}

/**
 * Supabase Storage에서 Hero 이미지 URL 생성
 * @param {string} path - Storage 경로 (예: 'hero-images/hero.jpg')
 * @returns {string} - 공개 URL
 */
function getHeroImageUrl(path) {
    const { data } = supabase.storage
        .from('hero-images')
        .getPublicUrl(path);

    return data.publicUrl;
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     getHeroImagePath,
//     updateHeroImagePath,
//     getSetting,
//     updateSetting,
//     getHeroImageUrl
// };
