/* =====================================================
   1. MOBILE MENU TOGGLE
===================================================== */
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {
    const setMenu = open => {
        navLinks.classList.toggle("show", open);
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open);
    };

    toggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("show")));

    // Close the menu after picking a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });
}

/* =====================================================
   2. DARK / LIGHT MODE TOGGLE
   (saved theme is applied early by the inline script in <head>)
===================================================== */
const root = document.documentElement;

document.querySelectorAll(".theme-toggle").forEach(themeToggle => {
    themeToggle.addEventListener("click", () => {
        const isDark = root.classList.toggle("dark");
        try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (e) {}
    });

    themeToggle.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            themeToggle.click();
        }
    });
});

/* =====================================================
   3. HEADER SHADOW ON SCROLL
===================================================== */
const header = document.querySelector("header");

if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

/* =====================================================
   4. SCROLL REVEAL FOR SECTIONS
===================================================== */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    reveals.forEach(section => observer.observe(section));
} else {
    reveals.forEach(section => section.classList.add("active"));
}
