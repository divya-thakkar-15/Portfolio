/* =========================
   script.js — interactions
   - menu toggle
   - overlay
   - section navigation + smooth scroll
   - theme toggle (persist)
   - contact form via EmailJS
   - footer year
   ========================= */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const menuBtn = document.getElementById("menu-btn");
  const sideMenu = document.getElementById("side-menu");
  const overlay = document.querySelector(".side-menu-overlay");
  const menuLinks = document.querySelectorAll(".menu-link");
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");
  const formNote = document.querySelector(".form-note");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Open/close menu
  function openMenu() {
    sideMenu?.classList.add("active");
    overlay?.classList.add("active");
    sideMenu?.setAttribute("aria-hidden", "false");
  }
  function closeMenu() {
    sideMenu?.classList.remove("active");
    overlay?.classList.remove("active");
    sideMenu?.setAttribute("aria-hidden", "true");
  }
  menuBtn?.addEventListener("click", function () {
    if (sideMenu.classList.contains("active")) closeMenu();
    else openMenu();
  });
  overlay?.addEventListener("click", closeMenu);

  // Smooth navigation & section activation
  function activateSectionById(id) {
    const target = document.getElementById(id);
    if (!target) return;
    // hide all sections then show target (keeps URL hash behavior)
    document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
    target.classList.add("active");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      activateSectionById(id);
      closeMenu();
      // update hash without jumping
      history.replaceState(null, "", `#${id}`);
    });
  });

  // Intersection observer to auto-activate sections while scrolling
  const allSections = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window && allSections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
          entry.target.classList.add("active");
          history.replaceState(null, "", `#${entry.target.id}`);
        }
      });
    }, { threshold: 0.6 });

    allSections.forEach((s) => obs.observe(s));
  }

  // Theme toggle + persist
  const THEME_KEY = "dt_portfolio_theme";
  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light") document.body.classList.add("light-mode");
  }
  loadTheme();
  themeToggle?.addEventListener("click", function () {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
  });

  // Contact form: EmailJS send
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic client-side validation
      const name = this.name?.value?.trim();
      const email = this.email?.value?.trim();
      const message = this.message?.value?.trim();

      if (!name || !email || !message) {
        if (formNote) formNote.textContent = "Please complete all fields.";
        return;
      }

      const submitBtn = contactForm.querySelector("button[type='submit']");
      const prevText = submitBtn ? submitBtn.textContent : "Send Message";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
      if (formNote) formNote.textContent = "";

      // Replace the placeholders with your EmailJS values:
      // - YOUR_SERVICE_ID
      // - YOUR_TEMPLATE_ID
      // EmailJS init should also be replaced in the HTML above (YOUR_USER_ID)
      if (window.emailjs && typeof emailjs.sendForm === "function") {
        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
          .then((res) => {
            if (formNote) formNote.textContent = "Message sent — thank you!";
            this.reset();
          })
          .catch((err) => {
            console.error("EmailJS error:", err);
            if (formNote) formNote.textContent = "Failed to send. Please try again later.";
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = prevText;
            }
          });
      } else {
        // EmailJS not configured or loaded
        if (formNote) formNote.textContent = "Email service not configured. Replace your EmailJS IDs.";
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = prevText;
        }
        console.warn("EmailJS is not initialized. Make sure you set your user/service/template IDs.");
      }
    });
  }

  // If the page loads with a hash, activate that section
  (function handleInitialHash() {
    const hash = location.hash?.replace("#", "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        // Wait a tick to allow layout
        setTimeout(() => { activateSectionById(hash); }, 120);
      }
    }
  })();
});
