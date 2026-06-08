document.addEventListener("DOMContentLoaded", () => {
  /**
   * PRELOADER
   * Hide preloader after page is fully loaded
   */
  const preloader = document.querySelector("[data-preaload]");

  window.addEventListener("load", () => {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });

  /**
   * NAVBAR TOGGLE (Mobile)
   */
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  navTogglers.forEach((toggler) => {
    toggler.addEventListener("click", toggleNavbar);
  });

  /**
   * HEADER STICKY EFFECT
   */
  const header = document.querySelector("[data-header]");

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
});
