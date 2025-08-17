// ========== count number experience ==========
let hasRunExperience = false;
let hasRunChef = false;

function runCounter(id, target) {
    let count = 0;
    const speed = 2000;
    const stepTime = speed / target;
    const element = document.getElementById(id);

    const interval = setInterval(() => {
        count++;
        element.innerText = count;
        if (count >= target) {
            clearInterval(interval);
        }
    }, stepTime);
}

function isInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

window.addEventListener("scroll", () => {
    const experienceEl = document.getElementById("experience");
    const chefEl = document.getElementById("popular_chef");

    if (!hasRunExperience && isInView(experienceEl)) {
        hasRunExperience = true;
        runCounter("experience", 10); // Count to 10
    }

    if (!hasRunChef && isInView(chefEl)) {
        hasRunChef = true;
        runCounter("popular_chef", 15); // Count to 15
    }
});
// ================ counter by click ======================
// Select all food items
const foodItems = document.querySelectorAll(".food_item");

foodItems.forEach(item => {
    const upBtn = item.querySelector(".btn_increase");
    const downBtn = item.querySelector(".btn_decrease");
    const counter = item.querySelector(".text_counter");

    upBtn.addEventListener("click", () => {
        counter.value = parseInt(counter.value) + 1;
    });

    downBtn.addEventListener("click", () => {
        let current = parseInt(counter.value);
        if (current > 0) {
            counter.value = current - 1;
        }
    });
});
// ================== border select ====================
const labels = document.querySelectorAll(".category");
const foodLists = document.querySelectorAll(".cambodia_food_list");
const inputs = document.querySelectorAll(".option");

function updateView() {
    // Remove active classes
    labels.forEach(label => label.classList.remove("active"));
    foodLists.forEach(div => div.classList.remove("active"));

    // Find checked radio
    const checked = document.querySelector(".option:checked");
    const selectedId = checked.id;

    // Activate matching label and food list
    const label = document.querySelector(`label[for="${selectedId}"]`);
    const foodList = document.querySelector(`.cambodia_food_list[data-target="${selectedId}"]`);

    if (label) label.classList.add("active");
    if (foodList) foodList.classList.add("active");
}

// Run on load
updateView();

// Run on change
inputs.forEach(input => input.addEventListener("change", updateView));
// ============== animation menu ================
document.querySelectorAll('input[name="choice"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        // show/hide content here (optional logic)

        // Refresh AOS so animations apply to newly visible elements
        AOS.refresh();
    });
});
// =============== number country ====================
window.onload = function () {
    const phoneInputs = document.querySelectorAll(".phone");

    phoneInputs.forEach(function (phoneInput) {
        const iti = window.intlTelInput(phoneInput, {
            initialCountry: "kh",
            nationalMode: false,
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js"
        });

        function updatePlaceholder() {
            const countryCode = iti.getSelectedCountryData().iso2;
            const exampleNumber = iti.getExampleNumber(countryCode, true, intlTelInputUtils.numberFormat.INTERNATIONAL);
            phoneInput.placeholder = exampleNumber || "+855 12 345 678";
        }

        phoneInput.addEventListener("keypress", function (event) {
            const char = String.fromCharCode(event.which);
            if (!/[0-9+\-\s()]/.test(char)) {
                event.preventDefault();
            }
        });

        updatePlaceholder();

        phoneInput.addEventListener('countrychange', updatePlaceholder);
    });
};
// =============== link page ==================
fetch('nav.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('nav-placeholder').innerHTML = html;
    });
// ================== text animation ==================
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
    createTextAnimation('.restaurant_name', restaurantNames);
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
// ==================== card hover ========================
function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
