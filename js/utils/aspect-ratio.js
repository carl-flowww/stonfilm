// ==========================================
// Aspect Ratio Utility Functions
// 비율 계산 및 변환
// ==========================================

/**
 * 비율 문자열을 padding-bottom 퍼센트로 변환
 * @param {string} ratio - 비율 문자열 (예: '16:9', '814:470')
 * @returns {number} - padding-bottom 퍼센트 값
 * @example
 * aspectRatioToPercent('16:9') // returns 56.25
 * aspectRatioToPercent('814:470') // returns 57.74
 */
function aspectRatioToPercent(ratio) {
    const [width, height] = ratio.split(':').map(Number);
    return parseFloat((height / width * 100).toFixed(2));
}

/**
 * 비율 문자열을 소수로 변환
 * @param {string} ratio - 비율 문자열 (예: '16:9')
 * @returns {number} - 소수 값
 * @example
 * aspectRatioToDecimal('16:9') // returns 1.778
 */
function aspectRatioToDecimal(ratio) {
    const [width, height] = ratio.split(':').map(Number);
    return parseFloat((width / height).toFixed(3));
}

/**
 * 너비에서 비율에 맞는 높이 계산
 * @param {number} width - 너비 (px)
 * @param {string} ratio - 비율 문자열 (예: '16:9')
 * @returns {number} - 계산된 높이 (px)
 * @example
 * calculateHeight(1920, '16:9') // returns 1080
 */
function calculateHeight(width, ratio) {
    const [ratioWidth, ratioHeight] = ratio.split(':').map(Number);
    return Math.round(width * (ratioHeight / ratioWidth));
}

/**
 * 높이에서 비율에 맞는 너비 계산
 * @param {number} height - 높이 (px)
 * @param {string} ratio - 비율 문자열 (예: '16:9')
 * @returns {number} - 계산된 너비 (px)
 * @example
 * calculateWidth(1080, '16:9') // returns 1920
 */
function calculateWidth(height, ratio) {
    const [ratioWidth, ratioHeight] = ratio.split(':').map(Number);
    return Math.round(height * (ratioWidth / ratioHeight));
}

/**
 * 비율이 가로형인지 확인
 * @param {string} ratio - 비율 문자열 (예: '16:9')
 * @returns {boolean}
 */
function isLandscape(ratio) {
    const [width, height] = ratio.split(':').map(Number);
    return width > height;
}

/**
 * 비율이 세로형인지 확인
 * @param {string} ratio - 비율 문자열 (예: '9:16')
 * @returns {boolean}
 */
function isPortrait(ratio) {
    const [width, height] = ratio.split(':').map(Number);
    return width < height;
}

/**
 * 비율이 정사각형인지 확인
 * @param {string} ratio - 비율 문자열 (예: '1:1')
 * @returns {boolean}
 */
function isSquare(ratio) {
    const [width, height] = ratio.split(':').map(Number);
    return width === height;
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     aspectRatioToPercent,
//     aspectRatioToDecimal,
//     calculateHeight,
//     calculateWidth,
//     isLandscape,
//     isPortrait,
//     isSquare
// };
