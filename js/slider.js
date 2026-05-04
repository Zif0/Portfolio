/**
 * Horizontal image sliders (gallery + project screenshots).
 */
export function initSliders() {
  document.querySelectorAll(".slider").forEach((slider) => {
    const slidesContainer = slider.querySelector(".slides");
    const slides = slider.querySelectorAll(".slide");
    const nextBtn = slider.querySelector(".slideNext");
    const prevBtn = slider.querySelector(".slidePrev");

    if (!slidesContainer || slides.length === 0) return;

    let currentIndex = 0;

    function updateSlidePosition() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
      });
    }

    updateSlidePosition();
  });
}
