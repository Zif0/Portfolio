// Highlights the active nav link, swaps --accent per section, and drives
// the top progress bar and scroll cue as the visitor scrolls.
export function initScrollSpy() {
  const root = document.documentElement;
  const navLinks = new Map();
  document
    .querySelectorAll("[data-nav]")
    .forEach((link) => navLinks.set(link.dataset.nav, link));

  const bandEls = [...document.querySelectorAll("[data-accent]")];

  function setActiveNav(sectionId) {
    navLinks.forEach((link, key) =>
      link.classList.toggle("is-active", key === sectionId)
    );
    navLinks.forEach((link, key) => {
      if (key === sectionId) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && bandEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.accent) {
            root.style.setProperty("--accent", `var(--${el.dataset.accent})`);
          }
          if (el.dataset.section) setActiveNav(el.dataset.section);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    bandEls.forEach((el) => observer.observe(el));
  }

  const scrollBarFill = document.getElementById("scrollBarFill");
  const scrollCue = document.querySelector(".scroll-cue");
  let ticking = false;

  function update() {
    const scrollable = root.scrollHeight - root.clientHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    const pct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    if (scrollBarFill) scrollBarFill.style.width = pct + "%";
    if (scrollCue) scrollCue.classList.toggle("is-scrolled", window.scrollY > 24);
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}
