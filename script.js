
document.addEventListener("DOMContentLoaded", () => {

  // smooth scroll for nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // pic slideshow
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

  //scroll reveal
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
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

    sections.forEach(section => {
    if (!section.classList.contains("intro")) {
      section.classList.add("sectionHidden");
      observer.observe(section);
    }
  });

  //hamburger menu for mobile
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.querySelector(".mobileOverlay");

  function toggleMobileMenu() {
    navMenu.classList.toggle("showMenu");
    overlay.classList.toggle("showOverlay");
  }

  hamburger.addEventListener("click", toggleMobileMenu);
  overlay.addEventListener("click", toggleMobileMenu);

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("showMenu");
      overlay.classList.remove("showOverlay");
    });
  });

  function toggleMobileMenu() {
  navMenu.classList.toggle("showMenu");
  overlay.classList.toggle("showOverlay");
  hamburger.classList.toggle("active");
}

});

