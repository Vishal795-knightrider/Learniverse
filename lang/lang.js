let translations = {};
let currentLang = "en"; // default language

async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    translations = await response.json();
    currentLang = lang;
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[key]) {
            el.innerText = translations[key];
        }
    });
}

// Load default language on page load
document.addEventListener("DOMContentLoaded", () => {
    loadLanguage(currentLang);
});
