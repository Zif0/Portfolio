// Drives every [data-slider]: prev/next, dots, arrow keys, and swipe.
export function initSliders() {
  document.querySelectorAll("[data-slider]").forEach(setupSlider);
}

function setupSlider(slider) {
  const track = slider.querySelector(".slides");
  const slides = [...slider.querySelectorAll(".slide")];
  const prevBtn = slider.querySelector(".slidePrev");
  const nextBtn = slider.querySelector(".slideNext");
  const dotsWrap = slider.querySelector(".slider__dots");
  if (!track || slides.length === 0) return;

  let index = 0;

  /* single image: strip the controls and stop */
  if (slides.length <= 1) {
    prevBtn?.remove();
    nextBtn?.remove();
    dotsWrap?.remove();
    return;
  }

  const dots = [];
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1} of ${slides.length}`);
      dot.addEventListener("click", () => go(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    slides.forEach((s, i) =>
      s.setAttribute("aria-hidden", i === index ? "false" : "true")
    );
  }
  function go(i) {
    index = (i + slides.length) % slides.length;
    render();
  }
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);

  slider.setAttribute("tabindex", "0");
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  });

  let startX = 0;
  let dx = 0;
  let dragging = false;

  slider.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    dragging = true;
    startX = e.clientX;
    dx = 0;
    track.style.transition = "none";
    slider.setPointerCapture?.(e.pointerId);
  });
  slider.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    track.style.transform = `translateX(calc(-${index * 100}% + ${dx}px))`;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = "";
    if (Math.abs(dx) > 45) {
      dx < 0 ? next() : prev();
    } else {
      render();
    }
    dx = 0;
  }
  slider.addEventListener("pointerup", endDrag);
  slider.addEventListener("pointercancel", endDrag);
  slider.addEventListener("pointerleave", endDrag);

  render();
}
