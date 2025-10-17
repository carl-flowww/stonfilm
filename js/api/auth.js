// ==========================================
// Authentication API Functions
// Supabase Authentication 관리
// ==========================================

/**
 * 로그인 (관리자용)
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    return { data, error };
}

/**
 * 로그아웃
 * @returns {Promise<{error: Object}>}
 */
async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

/**
 * 현재 로그인된 사용자 정보 가져오기
 * @returns {Promise<{data: Object|null, error: Object}>}
 */
async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { data: user, error };
}

/**
 * 현재 세션 가져오기
 * @returns {Promise<{data: Object|null, error: Object}>}
 */
async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { data: session, error };
}

/**
 * 로그인 상태 확인
 * @returns {Promise<boolean>}
 */
async function isAuthenticated() {
    const { data: session } = await getSession();
    return session !== null;
}

/**
 * 인증 상태 변경 리스너 설정
 * @param {Function} callback - 인증 상태 변경 시 호출될 함수
 * @returns {Object} - Subscription object
 */
function onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });

    return subscription;
}

/**
 * 비밀번호 재설정 요청
 * @param {string} email - 이메일
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
}

/**
 * 비밀번호 업데이트
 * @param {string} newPassword - 새 비밀번호
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    return { data, error };
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     signIn,
//     signOut,
//     getCurrentUser,
//     getSession,
//     isAuthenticated,
//     onAuthStateChange,
//     resetPassword,
//     updatePassword
// };
