function initProjects(projects) {
  const grid = document.getElementById("projects-grid");
  if (!grid || !projects.length) return;

  grid.innerHTML = projects
    .map(
      (project, i) => `
    <li class="project-card ${project.featured ? "project-card--featured" : ""}" data-reveal style="--reveal-delay: ${i * 90}ms">
      <article class="project-card__inner">
        <div class="project-card__media">
          <img src="${escapeAttr(project.image)}" alt="${escapeAttr(project.title)}" loading="lazy" width="640" height="360" />
          <div class="project-card__overlay"></div>
          <span class="project-card__status">${escapeHtml(project.status)}</span>
        </div>
        <div class="project-card__content">
          <ul class="project-card__tags">
            ${(project.tags ?? [])
              .map((tag) => `<li>${escapeHtml(tag)}</li>`)
              .join("")}
          </ul>
          <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
          <p class="project-card__desc">${escapeHtml(project.description)}</p>
          <a class="project-card__cta" href="${escapeAttr(project.href)}" ${project.href === "#" ? 'tabindex="-1" aria-disabled="true"' : ""}>
            <span>View project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        </div>
      </article>
    </li>`
    )
    .join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return String(text).replace(/"/g, "&quot;");
}
