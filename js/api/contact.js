// ==========================================
// Contact Form API Functions
// Supabase contact_submissions 테이블 관리
// ==========================================

/**
 * Contact 폼 제출
 * @param {Object} formData - 폼 데이터
 * @param {string} formData.company - 회사명 (선택)
 * @param {string} formData.full_name - 이름
 * @param {string} formData.email - 이메일
 * @param {string} formData.phone - 전화번호 (선택)
 * @param {string} formData.message - 메시지
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function submitContactForm(formData) {
    const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
            company: formData.company || null,
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message
        })
        .select()
        .single();

    return { data, error };
}

/**
 * 모든 Contact 제출 내역 조회 (관리자용)
 * @returns {Promise<{data: Array, error: Object}>}
 */
async function getAllContactSubmissions() {
    const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

    return { data, error };
}

/**
 * 특정 Contact 제출 조회 (관리자용)
 * @param {string} id - UUID
 * @returns {Promise<{data: Object, error: Object}>}
 */
async function getContactSubmissionById(id) {
    const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('id', id)
        .single();

    return { data, error };
}

/**
 * 이메일 형식 검증
 * @param {string} email - 이메일 주소
 * @returns {boolean}
 */
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Contact 폼 검증
 * @param {Object} formData - 폼 데이터
 * @returns {{valid: boolean, errors: Object}}
 */
function validateContactForm(formData) {
    const errors = {};

    // 필수 필드 검증
    if (!formData.full_name || formData.full_name.trim() === '') {
        errors.full_name = 'Name is required';
    }

    if (!formData.email || formData.email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }

    if (!formData.message || formData.message.trim() === '') {
        errors.message = 'Message is required';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     submitContactForm,
//     getAllContactSubmissions,
//     getContactSubmissionById,
//     validateEmail,
//     validateContactForm
// };
