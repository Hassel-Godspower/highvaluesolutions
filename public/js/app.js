document.addEventListener("DOMContentLoaded", () => {
  console.log("HighValue Solutions Web App Loaded");
});

/* ================================
   SITE SEARCH LOGIC
================================ */

const searchInput = document.getElementById("siteSearch");
const resultsBox = document.getElementById("searchResults");

/**
 * SEARCH INDEX
 * Expand this over time (or generate automatically later)
 */
const SEARCH_INDEX = [
  {
    title: "Home",
    url: "/",
    keywords: "highvalue solutions applied intelligence software company"
  },
  {
    title: "Solutions",
    url: "/services.html",
    keywords: "custom software ai machine learning saas enterprise ar vr"
  },
  {
    title: "Company",
    url: "/about.html",
    keywords: "about mission vision leadership values highvalue"
  },
  {
    title: "Start a Project",
    url: "/contact.html",
    keywords: "contact project build software request"
  },
  {
    title: "Case Studies",
    url: "/case-studies.html",
    keywords: "case studies real projects systems built"
  },
  {
    title: "Technology Stack",
    url: "/technology.html",
    keywords: "technology stack tools frameworks infrastructure"
  },
  {
    title: "Insights / Blog",
    url: "/insights.html",
    keywords: "blog insights articles software ai strategy"
  }
];

function normalize(text) {
  return text.toLowerCase();
}

function searchSite(query) {
  const q = normalize(query);

  return SEARCH_INDEX.filter(item =>
    normalize(item.title).includes(q) ||
    normalize(item.keywords).includes(q)
  );
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (!query) {
    resultsBox.classList.remove("active");
    resultsBox.innerHTML = "";
    return;
  }

  const results = searchSite(query);

  if (!results.length) {
    resultsBox.innerHTML = `<span style="display:block;padding:1rem;color:#8a90a2;">No results found</span>`;
    resultsBox.classList.add("active");
    return;
  }

  resultsBox.innerHTML = results
    .map(
      r => `<a href="${r.url}">
              <strong>${r.title}</strong>
            </a>`
    )
    .join("");

  resultsBox.classList.add("active");
});

/* Close results on outside click */
document.addEventListener("click", e => {
  if (!e.target.closest(".search-container")) {
    resultsBox.classList.remove("active");
  }
});

