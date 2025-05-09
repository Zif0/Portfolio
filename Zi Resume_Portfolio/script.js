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
  }, 600);

  setTimeout(() => {
    msg1.classList.remove("reveal");
    msg1.classList.add("hide"); 
  }, 2200);

  setTimeout(() => {
    msg2.classList.add("reveal");
  }, 3500);

  setTimeout(() => {
    main.classList.add("reveal");
    nav.classList.add("reveal");
    document.body.classList.remove("preload");
  }, 4800);
});

//photos
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".slide-btn.next");
  const prevBtn = document.querySelector(".slide-btn.prev");

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
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
