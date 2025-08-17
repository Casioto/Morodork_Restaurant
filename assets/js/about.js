// Reusable function approach
function createTextAnimation(selector, words, options = {}) {
    const textEl = document.querySelector(selector);

    if (!textEl) return;

    const config = {
        typingSpeed: 150,
        deletingSpeed: 100,
        pauseTime: 1000,
        ...options
    };

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = config.typingSpeed;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        textEl.textContent = currentWord.slice(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = config.deletingSpeed;
            setTimeout(typeEffect, config.pauseTime);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = config.typingSpeed;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const restaurantNames = ["មរតក", "ភោជនីយដ្ឋាន"];

    // Different locations with same or different settings
    createTextAnimation('.Restaurant_Name', restaurantNames);
    createTextAnimation('.header_title', restaurantNames, { typingSpeed: 200 });

    // Auto-animate all elements with .text-animation class
    const textAnimationElements = document.querySelectorAll('.text-animation');
    textAnimationElements.forEach((element, index) => {
        setTimeout(() => {
            createTextAnimation(`.text-animation:nth-of-type(${index + 3})`, restaurantNames, {
                typingSpeed: 100 + (index * 50)
            });
        }, index * 1000);
    });
});