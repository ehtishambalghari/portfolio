function initTypedRole() {
  const el = document.getElementById("typed-role");
  if (!el) return;

  const raw = el.getAttribute("data-roles") ?? "";
  const roles = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (!roles.length) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 70;
  const deleteSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseEnd);
        return;
      }
      setTimeout(tick, typeSpeed);
      return;
    }

    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, pauseStart);
      return;
    }
    setTimeout(tick, deleteSpeed);
  }

  tick();
}
