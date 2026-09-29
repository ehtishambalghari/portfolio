function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el, i) => {
    el.style.setProperty("--reveal-delay", `${Math.min(i * 60, 360)}ms`);
    observer.observe(el);
  });
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initMarquee() {
  const track = document.getElementById("marquee-track");
  const config = window.PORTFOLIO_CONFIG ?? {};
  const items = config.techStack ?? [];
  if (!track || !items.length) return;

  const chips = items
    .map((name) => `<span class="marquee__item">${escapeHtml(name)}</span>`)
    .join("");

  track.innerHTML = chips + chips;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function initStats() {
  const grid = document.getElementById("stats-grid");
  const stats = window.PORTFOLIO_CONFIG?.stats ?? [];
  if (!grid || !stats.length) return;

  grid.innerHTML = stats
    .map(
      (stat, i) => `
    <div class="stat-card" data-reveal style="--reveal-delay: ${i * 80}ms">
      <span class="stat-card__value">${escapeHtml(stat.value)}</span>
      <span class="stat-card__label">${escapeHtml(stat.label)}</span>
    </div>`
    )
    .join("");
}

function initTimeline() {
  const list = document.getElementById("timeline");
  const items = window.PORTFOLIO_CONFIG?.timeline ?? [];
  if (!list || !items.length) return;

  list.innerHTML = items
    .map(
      (item, i) => `
    <li class="timeline__item" data-reveal style="--reveal-delay: ${i * 100}ms">
      <span class="timeline__year">${escapeHtml(item.year)}</span>
      <div class="timeline__body">
        <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
        <p class="timeline__detail">${escapeHtml(item.detail)}</p>
      </div>
    </li>`
    )
    .join("");
}

function initImages() {
  const images = window.PORTFOLIO_CONFIG?.images ?? {};
  const profile = document.getElementById("profile-image");
  const about = document.getElementById("about-image");

  if (profile && images.profile) {
    profile.src = images.profile;
  }
  if (about && images.about) {
    about.src = images.about;
  }
}

function initContactInfo() {
  const contact = window.PORTFOLIO_CONFIG?.contact ?? {};
  const emailEl = document.getElementById("contact-email");
  const locationEl = document.getElementById("contact-location");
  const availEl = document.getElementById("contact-availability");

  if (emailEl && contact.email) {
    emailEl.textContent = contact.email;
    emailEl.href = `mailto:${contact.email}`;
  }
  if (locationEl && contact.location) locationEl.textContent = contact.location;
  if (availEl && contact.availability) availEl.textContent = contact.availability;
}
