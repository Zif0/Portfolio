//nav
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio site loaded");

    document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });

//welcome animation
window.addEventListener("load", () => {
  const welcomeContainer = document.getElementById("welcomeMessage");
  const msg1 = document.getElementById("welcome1");
  const msg2 = document.getElementById("welcome2");
  const msg3 = document.getElementById("welcome3");
  const msg4 = document.getElementById("welcome4");
  const main = document.querySelector("main");
  const nav = document.querySelector("nav");

  window.scrollTo(0, 0);
  document.body.classList.add("lockScroll");
  nav.classList.add("locked");

  setTimeout(() => {
    welcomeContainer.classList.add("reveal");
  }, 100);

  setTimeout(() => {
    msg1.classList.add("reveal");
  }, 400);

  setTimeout(() => {
    msg1.classList.remove("reveal");
    msg1.classList.add("hide"); 
  }, 1600);

  setTimeout(() => {
    msg2.classList.add("reveal");
  }, 2500);

  setTimeout(() => {
    main.classList.add("reveal");
    nav.classList.add("reveal");
    document.body.classList.remove("preload");
    msg2.classList.add("hide"); 
    msg3.classList.add("reveal");
    msg4.classList.add("reveal");
  }, 4000);
});

//photos
document.addEventListener("DOMContentLoaded", () => {
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
});

//scrolling
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
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
      section.classList.add("section-hidden");
      observer.observe(section);
    }
  });
});
