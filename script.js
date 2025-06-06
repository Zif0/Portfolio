document.addEventListener("DOMContentLoaded", () => {
  // Force top of page on reload
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  // Image slideshow
  document.querySelectorAll(".slider").forEach((slider) => {
    const slidesContainer = slider.querySelector(".slides");
    const slides = slider.querySelectorAll(".slide");
    const nextBtn = slider.querySelector(".slideNext");
    const prevBtn = slider.querySelector(".slidePrev");

    let currentIndex = 0;

    function updateSlidePosition() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
    });

    updateSlidePosition();
  });

  // Project carousel
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".project-card");
  const leftBtn = document.querySelector(".slidePrev");
  const rightBtn = document.querySelector(".slideNext");

  if (track && cards.length > 0 && leftBtn && rightBtn) {
    let visibleCards = getVisibleCards();
    let cardWidth = 0;
    let currentIndex = visibleCards;

    let clones = { start: [], end: [] };

    function getVisibleCards() {
      return window.innerWidth <= 768 ? 1 : 3;
    }

    function updateCardWidth() {
      const cardStyle = window.getComputedStyle(cards[0]);
      const gap = parseInt(getComputedStyle(track).gap) || 0;
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

    window.addEventListener("resize", () => {
      rebuildCarousel();
    });
  }

  //scroll reveal
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sectionVisible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  //scroll reminder
  sections.forEach((section) => {
    if (!section.classList.contains("intro")) {
      section.classList.add("sectionHidden");
      observer.observe(section);
    }
  });

  const scrollHint = document.getElementById("scrollHint");
  let hideHintTimeout;

  function checkRevealableSections() {
    const hiddenSections = [...document.querySelectorAll(".sectionHidden")];
    const scrollBottom = window.scrollY + window.innerHeight;

    return hiddenSections.some(
      (section) =>
        section.getBoundingClientRect().top + window.scrollY > scrollBottom
    );
  }

  function showHintIfNeeded() {
    if (checkRevealableSections()) {
      scrollHint.classList.add("visible");
    }
  }

  function hideHintTemporarily() {
    scrollHint.classList.remove("visible");

    clearTimeout(hideHintTimeout);
    hideHintTimeout = setTimeout(() => {
      if (checkRevealableSections()) {
        scrollHint.classList.add("visible");
      }
    }, 5000);
  }

  setTimeout(() => {
    if (checkRevealableSections()) {
      scrollHint.classList.add("visible");
    }
  }, 1500);

  window.addEventListener("scroll", () => {
    hideHintTemporarily();
  });

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.querySelector(".mobileOverlay");

  function toggleMobileMenu() {
    navMenu.classList.toggle("showMenu");
    overlay.classList.toggle("showOverlay");
    hamburger.classList.toggle("active");
  }

  hamburger.addEventListener("click", toggleMobileMenu);
  overlay.addEventListener("click", toggleMobileMenu);

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("showMenu");
      overlay.classList.remove("showOverlay");
      hamburger.classList.remove("active");
    });
  });
});
