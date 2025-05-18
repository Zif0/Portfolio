
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

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  setTimeout(() => {
    welcomeContainer.classList.add("reveal");
  }, 100);

  setTimeout(() => {
    msg1.classList.add("reveal");
  }, 250);

  setTimeout(() => {
    msg1.classList.remove("reveal");
    msg1.classList.add("hide"); 
  }, 1200);

  setTimeout(() => {
    msg2.classList.add("reveal");
  }, 1900);

  setTimeout(() => {
    main.classList.add("reveal");
    nav.classList.add("reveal");
    
    msg2.classList.add("hide"); 
    msg3.classList.add("reveal");
    msg4.classList.add("reveal");
  }, 3000);

  let animationSkipped = false;

  function skipWelcomeAnimation() {
    if (animationSkipped) return; 
    animationSkipped = true;

    msg1.classList.remove("reveal");
    msg1.classList.add("hide");
    msg2.classList.remove("reveal");
    msg2.classList.add("hide");
    msg3.classList.add("reveal");
    msg4.classList.add("reveal");
    welcomeContainer.classList.add("reveal");
    main.classList.add("reveal");
    nav.classList.add("reveal");
  }

  window.addEventListener("scroll", () => {
  const welcomeBottom = welcomeContainer.offsetTop + welcomeContainer.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition > welcomeBottom + 800) {
    skipWelcomeAnimation();
  }
  });

  document.querySelectorAll(".navLinks a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      skipWelcomeAnimation();

      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 800);
    });
  });
});

