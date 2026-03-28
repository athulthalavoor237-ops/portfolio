// Smooth scroll with small offset to account for sticky nav
function smoothScrollTo(targetId) {
  const el = document.querySelector(targetId);
  if (!el) return;

  const navHeight = document.querySelector(".nav")?.offsetHeight || 0;
  const rect = el.getBoundingClientRect();
  const offset = rect.top + window.scrollY - navHeight - 12;

  window.scrollTo({
    top: offset < 0 ? 0 : offset,
    behavior: "smooth",
  });
}

// Handle clicks on internal anchor links
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const link = target.closest("a[href^='#']");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href === "#") return;

  event.preventDefault();
  smoothScrollTo(href);

  // Close mobile nav after clicking
  const navLinks = document.querySelector(".nav-links");
  if (navLinks?.classList.contains("open")) {
    navLinks.classList.remove("open");
  }
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Intersection Observer for reveal animations and progress bars
const revealElements = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-bar");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("progress-bar")) {
          const level = entry.target.getAttribute("data-level");
          const width = level ? `${level}%` : "70%";
          entry.target.style.width = width;
        }

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((el) => observer.observe(el));
progressBars.forEach((bar) => observer.observe(bar));

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Prevent actual form submission in this demo
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.classList.add("submitted");
    const button = contactForm.querySelector("button[type='submit']");
    if (button) {
      button.textContent = "Message Sent (Demo)";
    }
  });
}

// Splash Screen Removal
const splashScreen = document.getElementById("splash-screen");
if (splashScreen) {
  // Remove from DOM completely after animation finishes (3000ms timeline)
  setTimeout(() => {
    splashScreen.remove();
  }, 3200);
}

