// Starts reloads at the top, but honors a deep-link hash like /#projects.
export function initScrollRestore() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const hash = window.location.hash;
  if (hash.length > 1) {
    const target = document.querySelector(hash);
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      });
      return;
    }
  }
  window.scrollTo(0, 0);
}
