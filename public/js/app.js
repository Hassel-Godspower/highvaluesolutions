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


/* ================================
   VISITOR LOCATION
================================ */
async function showVisitorLocation() {
  const cityEl = document.getElementById("visitorCity");
  const countryEl = document.getElementById("visitorCountry");

  if (!cityEl || !countryEl) return;

  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Location fetch failed");

    const data = await response.json();
    cityEl.textContent = data.city || "Your City";
    countryEl.textContent = data.country_name || "Your Country";
  } catch (err) {
    cityEl.textContent = "Your City";
    countryEl.textContent = "Your Country";
  }
}

showVisitorLocation();


/* ================================
   GOOGLE TRANSLATE INIT
================================ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      autoDisplay: false
    },
    "google_translate_element"
  );
}


/* ================================
   CUSTOM LANGUAGE SWITCHER
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("langToggle");
  const menu = document.getElementById("langMenu");

  if (!toggle || !menu) return;

  // Toggle menu visibility
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Language selection
  menu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      if (!lang) return;

      applyLanguage(lang);
      localStorage.setItem("site_lang", lang);
      menu.style.display = "none";
    });
  });

  // Apply language via Google Translate
  function applyLanguage(lang) {
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      if (!select) return;

      select.value = lang;
      select.dispatchEvent(new Event("change"));
      clearInterval(interval);
    }, 300);
  }

  // Restore saved language
  const savedLang = localStorage.getItem("site_lang");
  if (savedLang) {
    applyLanguage(savedLang);
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-switcher")) {
      menu.style.display = "none";
    }
  });
}); 

document.addEventListener("DOMContentLoaded", () => {
  const innovations = document.querySelectorAll(".innovation");

  innovations.forEach(item => {
    const btn = item.querySelector(".expand-btn");

    btn.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // Scroll fade-in animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  innovations.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.8s ease";
    observer.observe(section);
  });
});
