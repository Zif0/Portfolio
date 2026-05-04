/**
 * Soft glowing halo that follows the pointer (fine pointers only).
 * Brightens when hovering interactive targets.
 */
const INTERACTIVE_SELECTOR = [
  'a[href]',
  "button:not([disabled])",
  'input:not([type="hidden"]):not([disabled])',
  "textarea:not([disabled])",
  "select:not([disabled])",
  "label",
  "summary",
  '[role="button"]',
  '[role="link"]',
  '[role="switch"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[contenteditable="true"]',
].join(",");

export function initCursorHalo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const halo = document.createElement("div");
  halo.className = "cursor-halo";
  halo.setAttribute("aria-hidden", "true");
  document.body.appendChild(halo);

  document.documentElement.classList.add("cursor-halo-active");
  document.body.classList.add("cursor-halo-active");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  const ease = 0.14;
  const interactiveEase = 0.22;
  let visible = false;
  let interactiveTarget = 0;
  let interactiveBlend = 0;

  function onMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!visible) {
      visible = true;
      halo.classList.add("cursor-halo--visible");
    }

    const t = e.target;
    interactiveTarget = t && t.closest && t.closest(INTERACTIVE_SELECTOR) ? 1 : 0;
  }

  function onLeave() {
    visible = false;
    interactiveTarget = 0;
    halo.classList.remove("cursor-halo--visible", "cursor-halo--bright");
    interactiveBlend = 0;
  }

  function tick() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    interactiveBlend += (interactiveTarget - interactiveBlend) * interactiveEase;

    const scale = 1 + interactiveBlend * 0.18;
    halo.style.setProperty("--halo-interactive", String(interactiveBlend));
    halo.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${scale})`;

    halo.classList.toggle("cursor-halo--bright", interactiveBlend > 0.42);

    requestAnimationFrame(tick);
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);

  requestAnimationFrame(tick);
}
