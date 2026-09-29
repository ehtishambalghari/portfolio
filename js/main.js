(function () {
  const config = window.PORTFOLIO_CONFIG ?? {};

  initTheme();
  initNavigation();
  initStats();
  initTimeline();
  initContactInfo();
  initImages();
  initSkills(config.skills ?? []);
  initProjects(config.projects ?? []);
  initContactForm();
  initTypedRole();
  initReveal();
  initScrollProgress();

  document.querySelectorAll("[data-social]").forEach((anchor) => {
    const key = anchor.getAttribute("data-social");
    const url = config.social?.[key];
    if (url && url !== "#") anchor.setAttribute("href", url);
  });
})();
