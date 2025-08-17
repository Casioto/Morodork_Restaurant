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
