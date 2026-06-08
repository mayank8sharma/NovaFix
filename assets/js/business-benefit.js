/* -----------------------------------
   Business Benefits Animation
   ----------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const benefitSection = document.querySelector(".benefits-section");
  const benefitItems = document.querySelectorAll(".benefit-item");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Staggered fade-in for items
          benefitItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 100);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  if (benefitSection) {
    // Initial hidden state
    benefitItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)"; // Start slightly lower
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    observer.observe(benefitSection);
  }
});
