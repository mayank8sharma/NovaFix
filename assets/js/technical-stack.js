/* -----------------------------------
   Tech Stack Scroll Animation
   ----------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  const techSection = document.querySelector('.tech-stack-section');
  const techCards = document.querySelectorAll('.tech-card');
  const techVisual = document.querySelector('.tech-image-card');

  // Intersection Observer options
  const observerOptions = {
    threshold: 0.2, // Trigger when 20% of the section is visible
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate Visual
        if(techVisual) {
            techVisual.style.opacity = "1";
            techVisual.style.transform = "rotate(-5deg) scale(1)";
        }
        
        // Animate Cards Staggered
        techCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 100); // 100ms delay between each card
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (techSection) {
    // Set initial states for animation
    if(techVisual) {
        techVisual.style.opacity = "0";
        techVisual.style.transition = "all 0.8s ease-out";
        techVisual.style.transform = "translateX(-50px) rotate(-5deg)";
    }
    
    techCards.forEach(card => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease-out";
    });

    observer.observe(techSection);
  }
});