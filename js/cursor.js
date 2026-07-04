// Halo that trails the pointer and brightens over interactive targets.
const INTERACTIVE = [
  "a[href]",
  "button:not([disabled])",
  'input:not([type="hidden"]):not([disabled])',
  "textarea:not([disabled])",
  "select:not([disabled])",
  "label",
  "[role='button']",
  "[tabindex]",
].join(",");

export function initCursor() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const halo = document.createElement("div");
  halo.className = "cursor-halo";
  halo.setAttribute("aria-hidden", "true");
  document.body.appendChild(halo);
  document.documentElement.classList.add("cursor-halo-active");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;
  let visible = false;
  let interactive = 0;
  let blend = 0;

  window.addEventListener(
    "mousemove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        halo.classList.add("cursor-halo--visible");
      }
      const t = e.target;
      interactive = t && t.closest && t.closest(INTERACTIVE) ? 1 : 0;
    },
    { passive: true }
  );

  document.documentElement.addEventListener("mouseleave", () => {
    visible = false;
    interactive = 0;
    halo.classList.remove("cursor-halo--visible", "cursor-halo--bright");
  });

  function tick() {
    x += (targetX - x) * 0.16;
    y += (targetY - y) * 0.16;
    blend += (interactive - blend) * 0.2;
    const scale = 1 + blend * 0.9;
    halo.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
    halo.classList.toggle("cursor-halo--bright", blend > 0.4);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
