function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  const links = document.querySelectorAll(".nav__link");

  const closeMenu = () => {
    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtn?.setAttribute("aria-label", "Open menu");
    menu?.classList.remove("is-open");
  };

  menuBtn?.addEventListener("click", () => {
    const open = menu?.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(Boolean(open)));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  const sections = [...document.querySelectorAll("section[id]")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
    },
    { passive: true }
  );
}
