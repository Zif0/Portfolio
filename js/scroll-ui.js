/**
 * Section fade-in on scroll + bottom "scroll for more" hint.
 */
export function initScrollUi() {
  const sections = document.querySelectorAll("section");
  const scrollHint = document.getElementById("scrollHint");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sectionVisible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => {
    if (!section.classList.contains("intro")) {
      section.classList.add("sectionHidden");
      observer.observe(section);
    }
  });

  if (!scrollHint) return;

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

  window.addEventListener("scroll", hideHintTemporarily);
}
