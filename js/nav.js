// Sidebar collapse/expand (desktop) and drawer (mobile) behavior.
const COLLAPSE_KEY = "zf-nav-collapsed";
const MOBILE = "(max-width: 960px)";

export function initNav() {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const collapseBtn = document.getElementById("collapseBtn");
  const drawerToggle = document.getElementById("drawerToggle");
  const scrim = document.getElementById("scrim");
  const isMobile = () => window.matchMedia(MOBILE).matches;

  function applyCollapseLabel(collapsed) {
    if (!collapseBtn) return;
    collapseBtn.setAttribute(
      "aria-label",
      collapsed ? "Expand navigation" : "Collapse navigation"
    );
  }

  // Non-animatable layout snaps wait for this transitionend to avoid a jump.
  let settleListener = null;
  function settleAfterTransition() {
    if (settleListener) sidebar?.removeEventListener("transitionend", settleListener);
    settleListener = (e) => {
      if (e.target === sidebar && e.propertyName === "width") {
        body.classList.add("is-collapsed-settled");
      }
    };
    sidebar?.addEventListener("transitionend", settleListener);
  }

  if (localStorage.getItem(COLLAPSE_KEY) === "1") {
    body.classList.add("is-collapsed", "is-collapsed-settled");
    applyCollapseLabel(true);
  }

  collapseBtn?.addEventListener("click", () => {
    const collapsing = !body.classList.contains("is-collapsed");
    body.classList.toggle("is-collapsed", collapsing);
    localStorage.setItem(COLLAPSE_KEY, collapsing ? "1" : "0");
    applyCollapseLabel(collapsing);

    if (collapsing) {
      settleAfterTransition();
    } else {
      body.classList.remove("is-collapsed-settled");
    }
  });

  function openDrawer() {
    body.classList.add("drawer-open");
    drawerToggle?.setAttribute("aria-expanded", "true");
    drawerToggle?.setAttribute("aria-label", "Close navigation");
  }
  function closeDrawer() {
    body.classList.remove("drawer-open");
    drawerToggle?.setAttribute("aria-expanded", "false");
    drawerToggle?.setAttribute("aria-label", "Open navigation");
  }
  function toggleDrawer() {
    body.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
  }

  drawerToggle?.addEventListener("click", toggleDrawer);
  scrim?.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  sidebar?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobile()) closeDrawer();
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) closeDrawer();
  });
}
