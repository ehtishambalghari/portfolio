const STORAGE_KEY = "portfolio-theme";

function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";

  applyTheme(initial);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    applyTheme(e.matches ? "dark" : "light");
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  const isDark = theme === "dark";
  toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}
