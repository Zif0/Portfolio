/**
 * Infinite-scroll style carousel for home page project cards.
 * Scoped to #project-carousel so gallery arrows are never mistaken for carousel controls.
 */
export function initProjectCarousel() {
  const section = document.querySelector("#project-carousel");
  if (!section) return;

  const track = section.querySelector(".carousel-track");
  const cards = section.querySelectorAll(".project-card");
  const leftBtn = section.querySelector(".slidePrev");
  const rightBtn = section.querySelector(".slideNext");

  if (!track || cards.length === 0 || !leftBtn || !rightBtn) return;

  let visibleCards = getVisibleCards();
  let cardWidth = 0;
  let currentIndex = visibleCards;

  let clones = { start: [], end: [] };

  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function updateCardWidth() {
    const gap = parseInt(getComputedStyle(track).gap, 10) || 0;
    cardWidth = cards[0].offsetWidth + gap;
  }

  function clearClones() {
    clones.start.forEach((clone) => clone.remove());
    clones.end.forEach((clone) => clone.remove());
    clones = { start: [], end: [] };
  }

  function addClones() {
    clones.start = Array.from(cards)
      .slice(-visibleCards)
      .map((card) => card.cloneNode(true));
    clones.start.forEach((clone) => track.prepend(clone));

    clones.end = Array.from(cards)
      .slice(0, visibleCards)
      .map((card) => card.cloneNode(true));
    clones.end.forEach((clone) => track.appendChild(clone));
  }

  function setTransform(instant = false) {
    track.style.transition = instant ? "none" : "transform 0.4s ease-in-out";
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
  }

  function handleTransitionEnd(edgeIndex, resetIndex) {
    return function handler() {
      if (currentIndex === edgeIndex) {
        currentIndex = resetIndex;
        setTransform(true);
      }
      track.removeEventListener("transitionend", handler);
    };
  }

  function rebuildCarousel() {
    visibleCards = getVisibleCards();
    clearClones();
    addClones();
    currentIndex = visibleCards;
    updateCardWidth();
    setTransform(true);
  }

  rebuildCarousel();

  rightBtn.addEventListener("click", () => {
    const allCards = track.querySelectorAll(".project-card");
    const totalCards = allCards.length;
    if (currentIndex >= totalCards - visibleCards) return;
    currentIndex++;
    setTransform();
    track.addEventListener(
      "transitionend",
      handleTransitionEnd(totalCards - visibleCards, visibleCards)
    );
  });

  leftBtn.addEventListener("click", () => {
    const allCards = track.querySelectorAll(".project-card");
    const totalCards = allCards.length;
    if (currentIndex <= 0) return;
    currentIndex--;
    setTransform();
    track.addEventListener(
      "transitionend",
      handleTransitionEnd(0, totalCards - visibleCards * 2)
    );
  });

  window.addEventListener("resize", rebuildCarousel);
}
