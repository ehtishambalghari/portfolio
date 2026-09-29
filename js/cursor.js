function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  const fine = window.matchMedia("(pointer: fine)").matches;
  if (!fine) return;

  document.body.classList.add("is-pointer-fine");
  glow.classList.add("is-active");

  let raf = 0;
  let x = 0;
  let y = 0;

  const move = (clientX, clientY) => {
    x = clientX;
    y = clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = 0;
    });
  };

  window.addEventListener(
    "mousemove",
    (e) => move(e.clientX, e.clientY),
    { passive: true }
  );
}
