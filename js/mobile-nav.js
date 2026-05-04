/**
 * Hamburger menu + overlay for small viewports.
 */
export function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.querySelector(".mobileOverlay");

  if (!hamburger || !navMenu) return;

  function setExpanded(open) {
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function toggleMobileMenu() {
    navMenu.classList.toggle("showMenu");
    overlay?.classList.toggle("showOverlay");
    hamburger.classList.toggle("active");
    setExpanded(navMenu.classList.contains("showMenu"));
  }

  function closeMenu() {
    navMenu.classList.remove("showMenu");
    overlay?.classList.remove("showOverlay");
    hamburger.classList.remove("active");
    setExpanded(false);
  }

  hamburger.addEventListener("click", toggleMobileMenu);
  overlay?.addEventListener("click", closeMenu);

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
