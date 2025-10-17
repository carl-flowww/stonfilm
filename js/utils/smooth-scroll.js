// ==========================================
// Smooth Scroll Utility Functions
// 부드러운 스크롤 네비게이션
// ==========================================

/**
 * 특정 요소로 부드럽게 스크롤
 * @param {string|HTMLElement} target - CSS 선택자 또는 DOM 요소
 * @param {Object} options - 스크롤 옵션
 * @param {number} options.offset - 상단 오프셋 (px), 기본값: 0
 * @param {string} options.behavior - 스크롤 동작, 기본값: 'smooth'
 * @example
 * scrollToElement('#about-section')
 * scrollToElement(document.getElementById('projects'), { offset: 64 })
 */
function scrollToElement(target, options = {}) {
    const {
        offset = 0,
        behavior = 'smooth'
    } = options;

    // target이 문자열이면 querySelector로 찾기
    const element = typeof target === 'string'
        ? document.querySelector(target)
        : target;

    if (!element) {
        console.warn(`Element not found: ${target}`);
        return;
    }

    // 요소의 위치 계산
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: behavior
    });
}

/**
 * 페이지 상단으로 부드럽게 스크롤
 * @param {string} behavior - 스크롤 동작, 기본값: 'smooth'
 */
function scrollToTop(behavior = 'smooth') {
    window.scrollTo({
        top: 0,
        behavior: behavior
    });
}

/**
 * 현재 스크롤 위치 가져오기
 * @returns {number} - 스크롤 Y 위치 (px)
 */
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * 특정 위치까지 스크롤했는지 확인
 * @param {number} threshold - 기준 위치 (px)
 * @returns {boolean}
 */
function hasScrolledPast(threshold) {
    return getScrollPosition() > threshold;
}

/**
 * 네비게이션 링크에 smooth scroll 이벤트 바인딩
 * @param {string} linkSelector - 네비게이션 링크 CSS 선택자
 * @param {number} offset - 상단 오프셋 (예: 고정 헤더 높이)
 * @example
 * bindSmoothScrollLinks('nav a[href^="#"]', 64)
 */
function bindSmoothScrollLinks(linkSelector, offset = 0) {
    const links = document.querySelectorAll(linkSelector);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // # 으로 시작하는 링크만 처리
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    scrollToElement(targetElement, { offset });

                    // URL 업데이트 (히스토리 추가)
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
}

/**
 * 스크롤 이벤트 리스너 추가 (쓰로틀링 포함)
 * @param {Function} callback - 스크롤 시 호출할 함수
 * @param {number} delay - 쓰로틀 딜레이 (ms), 기본값: 100
 * @returns {Function} - 리스너 제거 함수
 */
function onScroll(callback, delay = 100) {
    let timeout;

    const throttledCallback = () => {
        if (timeout) return;

        timeout = setTimeout(() => {
            callback(getScrollPosition());
            timeout = null;
        }, delay);
    };

    window.addEventListener('scroll', throttledCallback, { passive: true });

    // 리스너 제거 함수 반환
    return () => {
        window.removeEventListener('scroll', throttledCallback);
    };
}

// Export functions (ES6 모듈로 사용할 경우)
// export {
//     scrollToElement,
//     scrollToTop,
//     getScrollPosition,
//     hasScrolledPast,
//     bindSmoothScrollLinks,
//     onScroll
// };
