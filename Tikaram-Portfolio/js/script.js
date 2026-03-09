/* =====================================================
   1. MOBILE MENU TOGGLE
===================================================== */
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

/* =====================================================
   2. DARK / LIGHT MODE TOGGLE
===================================================== */
const themeToggles = document.querySelectorAll(".theme-toggle");
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
} else {
    body.classList.remove("dark");
}

// Add event listeners to both toggles
themeToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

/* =====================================================
   3. SCROLL REVEAL FOR SECTIONS
===================================================== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();