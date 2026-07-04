import { initScrollRestore } from "./scroll-restore.js";
import { initNav } from "./nav.js";
import { initScrollSpy } from "./scroll-spy.js";
import { initReveal } from "./reveal.js";
import { initSliders } from "./slider.js";
import { initMediaSwitch } from "./media-switch.js";
import { initCursor } from "./cursor.js";

function ready(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else {
    fn();
  }
}

ready(() => {
  initScrollRestore();
  initNav();
  initScrollSpy();
  initReveal();
  initSliders();
  initMediaSwitch();
  initCursor();
});
