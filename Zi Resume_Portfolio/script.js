document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio site loaded");

    //smooth scroll
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
  