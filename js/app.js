import { initScrollRestore } from "./scroll-restore.js";
import { initSliders } from "./slider.js";
import { initProjectCarousel } from "./project-carousel.js";
import { initScrollUi } from "./scroll-ui.js";
import { initMobileNav } from "./mobile-nav.js";
import { initCursorHalo } from "./cursor-halo.js";

document.addEventListener("DOMContentLoaded", () => {
  initScrollRestore();
  initSliders();
  initProjectCarousel();
  initScrollUi();
  initMobileNav();
  initCursorHalo();
});
