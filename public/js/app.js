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


async function showVisitorLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("Location error");

    const data = await res.json();
    document.getElementById("visitorCity").textContent = data.city || "Your City";
    document.getElementById("visitorCountry").textContent = data.country_name || "Your Country";
  } catch {
    document.getElementById("visitorCity").textContent = "Your City";
    document.getElementById("visitorCountry").textContent = "Your Country";
  }
}

showVisitorLocation();

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      autoDisplay: false
    },
    'google_translate_element'
  );
}
src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("langToggle");
  const menu = document.getElementById("langMenu");

  toggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  document.querySelectorAll(".lang-menu li").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      applyLanguage(lang);
      localStorage.setItem("site_lang", lang);
      menu.style.display = "none";
    });
  });

  function applyLanguage(lang) {
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      if (!select) return;

      select.value = lang;
      select.dispatchEvent(new Event("change"));
      clearInterval(interval);
    }, 300);
  }

  // Restore language
  const savedLang = localStorage.getItem("site_lang");
  if (savedLang) {
    applyLanguage(savedLang);
  }

  // Close on outside click
  document.addEventListener("click", e => {
    if (!e.target.closest(".lang-switcher")) {
      menu.style.display = "none";
    }
  });
});
</script>
