function initSkills(skills) {
  const list = document.getElementById("skills-list");
  if (!list || !skills.length) return;

  list.innerHTML = skills
    .map(
      (skill, i) => `
    <li class="skill-card" data-reveal style="--reveal-delay: ${i * 70}ms">
      <div class="skill-card__top">
        <span class="skill-card__category">${escapeHtml(skill.category ?? "Skill")}</span>
        <span class="skill-card__pct">${skill.level}%</span>
      </div>
      <h3 class="skill-card__name">${escapeHtml(skill.name)}</h3>
      <div class="skill-card__track" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
        <div class="skill-card__fill" data-level="${skill.level}"></div>
      </div>
    </li>`
    )
    .join("");

  const fills = list.querySelectorAll(".skill-card__fill");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const fill = entry.target;
        fill.style.setProperty("--level", `${fill.getAttribute("data-level")}%`);
        fill.classList.add("is-animated");
        io.unobserve(fill);
      });
    },
    { threshold: 0.35 }
  );

  fills.forEach((fill) => io.observe(fill));
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
