/* ================================
   SITE SEARCH LOGIC
================================ */

const searchInput = document.getElementById("siteSearch");
const resultsBox = document.getElementById("searchResults");

/*
 * SEARCH INDEX
 * Expand this over time (or generate automatically later)
 */
const SEARCH_INDEX = [
  {
    title: "Home",
    url: "/",
    keywords: "highvalue solutions applied intelligence software company",
    summary: "HighValue Solutions builds applied intelligence software that automates complexity and improves decision-making for businesses."
  },
  {
    title: "Solutions",
    url: "/services.html",
    keywords: "custom software ai machine learning saas enterprise ar vr",
    summary: "Explore our custom software solutions, AI, machine learning, and SaaS offerings to transform your business digitally."
  },
  {
    title: "Company",
    url: "/about.html",
    keywords: "about mission vision leadership values highvalue",
    summary: "Learn about HighValue Solutions' mission, vision, leadership team, and core values."
  },
  {
    title: "Start a Project",
    url: "/contact.html",
    keywords: "contact project build software request",
    summary: "Contact us to start your software project, request a quote, or discuss business solutions."
  },
  {
    title: "Case Studies",
    url: "/case-studies.html",
    keywords: "case studies real projects systems built",
    summary: "See examples of complex systems we've built across industries and the results delivered."
  },
  {
    title: "Technology Stack",
    url: "/technology.html",
    keywords: "technology stack tools frameworks infrastructure",
    summary: "Discover the tools, frameworks, and infrastructure that power our custom software solutions."
  },
  {
    title: "Insights / Blog",
    url: "/insights.html",
    keywords: "blog insights articles software ai strategy",
    summary: "Read our articles and insights on AI, software strategy, and digital transformation."
  }
];


function normalize(text) {
  return text.toLowerCase();
}

function searchSite(query) {
  const q = query.toLowerCase();

  // Find relevant pages
  const matches = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.keywords.toLowerCase().includes(q) ||
    item.summary.toLowerCase().includes(q)
  );

  // If no matches, return friendly message
  if (!matches.length) {
    return [{
      title: "No results found",
      url: "#",
      summary: "Sorry! We couldn't find anything matching your search. Try different keywords."
    }];
  }

  // Generate "chatgpt-like" summaries
  return matches.map(item => {
    return {
      title: item.title,
      url: item.url,
      summary: item.summary
    };
  });
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

/* ===================================
   MOBILE SEARCH HANDLER (FINAL)
=================================== */

const openSearchBtn = document.getElementById("openSearch");
const closeSearchBtn = document.getElementById("closeSearch");
const mobileSearch = document.getElementById("mobileSearch");
const mobileForm = document.getElementById("mobileSearchForm");
const mobileInput = document.getElementById("mobileSearchInput");
const mobileResults = document.getElementById("mobileSearchResults");

/* Open overlay */
openSearchBtn.addEventListener("click", () => {
  mobileSearch.classList.add("active");
  document.body.classList.add("search-open");
  setTimeout(() => mobileInput.focus(), 150);
});

/* Close overlay */
closeSearchBtn.addEventListener("click", closeMobileSearch);

function closeMobileSearch() {
  mobileSearch.classList.remove("active");
  document.body.classList.remove("search-open");
  mobileInput.value = "";
  mobileResults.innerHTML = "";
}

/* Core search logic */
function runMobileSearch() {
  const query = mobileInput.value.trim().toLowerCase();
  mobileResults.innerHTML = "";

  if (!query) return;

  const results = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.keywords.toLowerCase().includes(query)
  );

  if (!results.length) {
    mobileResults.innerHTML =
      `<p style="padding:1rem;color:#8a90a2;">No results found</p>`;
    return;
  }

  mobileResults.innerHTML = results
    .map(r => `<a href="${r.url}">${r.title}</a>`)
    .join("");
}

/* Run search live as user types */
mobileInput.addEventListener("input", runMobileSearch);

/* Handle form submit */
mobileForm.addEventListener("submit", e => {
  e.preventDefault(); // prevent page reload
  runMobileSearch();
});

/* ESC key closes search */
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && mobileSearch.classList.contains("active")) {
    closeMobileSearch();
  }
});

const mobileSearchBtn = document.querySelector("#mobileSearchForm button[type='submit']");

mobileSearchBtn.addEventListener("click", e => {
  e.preventDefault();
  runMobileSearch();
}); 

function renderResults(results, container) {
  container.innerHTML = results
    .map(item => `
      <a href="${item.url}" style="display:block;padding:1rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <strong>${item.title}</strong>
        <p style="margin-top:0.3rem;color:#b3b8c5;font-size:0.95rem;">${item.summary}</p>
      </a>
    `)
    .join("");
  container.classList.add("active");
}

/* Desktop search */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (!query) {
    resultsBox.classList.remove("active");
    resultsBox.innerHTML = "";
    return;
  }
  const results = searchSite(query);
  renderResults(results, resultsBox);
});

/* Mobile search */
function runMobileSearch() {
  const query = mobileInput.value.trim();
  if (!query) {
    mobileResults.innerHTML = "";
    return;
  }
  const results = searchSite(query);
  renderResults(results, mobileResults);
}

mobileInput.addEventListener("input", runMobileSearch);
mobileForm.addEventListener("submit", e => {
  e.preventDefault();
  runMobileSearch();
});



