document.addEventListener("DOMContentLoaded", () => {
  console.log("HighValue Solutions Web App Loaded");
});
// ===============================
// SCROLL REVEAL (PERFORMANCE SAFE)
// ===============================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));
