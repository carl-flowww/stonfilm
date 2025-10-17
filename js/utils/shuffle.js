// ==========================================
// Array Shuffle Utility Functions
// 배열 랜덤 섞기
// ==========================================

/**
 * Fisher-Yates Shuffle 알고리즘을 사용한 배열 섞기
 * 원본 배열을 변경하지 않고 새로운 섞인 배열을 반환
 * @param {Array} array - 섞을 배열
 * @returns {Array} - 섞인 새 배열
 * @example
 * shuffleArray([1, 2, 3, 4, 5]) // returns [3, 1, 5, 2, 4] (랜덤)
 */
function shuffleArray(array) {
    const shuffled = [...array]; // 원본 배열 복사

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 스왑
    }

    return shuffled;
}

/**
 * 배열에서 랜덤으로 하나의 요소 선택
 * @param {Array} array - 배열
 * @returns {*} - 선택된 요소
 * @example
 * getRandomItem(['a', 'b', 'c']) // returns 'b' (랜덤)
 */
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * 배열에서 랜덤으로 N개의 요소 선택
 * @param {Array} array - 배열
 * @param {number} count - 선택할 개수
 * @returns {Array} - 선택된 요소들의 배열
 * @example
 * getRandomItems([1, 2, 3, 4, 5], 3) // returns [2, 5, 1] (랜덤)
 */
function getRandomItems(array, count) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 배열을 원본 그대로 랜덤하게 섞기 (원본 변경)
 * @param {Array} array - 섞을 배열 (원본 변경됨)
 * @returns {Array} - 섞인 원본 배열
 */
function shuffleArrayInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     shuffleArray,
//     getRandomItem,
//     getRandomItems,
//     shuffleArrayInPlace
// };
