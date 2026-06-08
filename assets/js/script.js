'use strict';

/* ==================== PRELOADER ==================== */
const preloader = document.querySelector('[data-preload]');

if (preloader) {
  window.addEventListener('load', () => {
    // Small timeout to ensure the animation is seen for at least a split second
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.add('loaded');
    }, 500); // 500ms delay for smoothness
  });
}
/* ==================== HELPER FUNCTION ==================== */
const addEventOnElements = (elements, eventType, callback) => {
  if (!elements || !elements.length) return;
  elements.forEach(el => el.addEventListener(eventType, callback));
};

/* ==================== NAVBAR ==================== */
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

if (navbar && overlay && navTogglers.length) {
  const toggleNavbar = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
  };
  addEventOnElements(navTogglers, 'click', toggleNavbar);
}

/* ==================== HEADER & BACK TO TOP ==================== */
const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

if (header && backTopBtn) {
  let lastScrollPos = 0;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('active');
      backTopBtn.classList.add('active');

      if (lastScrollPos < window.scrollY) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }

      lastScrollPos = window.scrollY;
    } else {
      header.classList.remove('active', 'hide');
      backTopBtn.classList.remove('active');
    }
  });
}

/* ==================== HERO SLIDER ==================== */
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');

if (heroSliderItems.length && heroSliderPrevBtn && heroSliderNextBtn) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = () => {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSlidePos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  };

  heroSliderNextBtn.addEventListener('click', () => {
    currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
    updateSliderPos();
  });

  heroSliderPrevBtn.addEventListener('click', () => {
    currentSlidePos =
      (currentSlidePos - 1 + heroSliderItems.length) %
      heroSliderItems.length;
    updateSliderPos();
  });

  let autoSlideInterval = setInterval(() => {
    heroSliderNextBtn.click();
  }, 7000);

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    'mouseover',
    () => clearInterval(autoSlideInterval)
  );

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    'mouseout',
    () => {
      autoSlideInterval = setInterval(() => {
        heroSliderNextBtn.click();
      }, 7000);
    }
  );
}

/* ==================== PARALLAX ==================== */
const parallaxItems = document.querySelectorAll('[data-parallax-item]');
if (parallaxItems.length) {
  window.addEventListener('mousemove', event => {
    let x = (event.clientX / window.innerWidth * 10) - 5;
    let y = (event.clientY / window.innerHeight * 10) - 5;

    x = -x;
    y = -y;

    parallaxItems.forEach(item => {
      const speed = Number(item.dataset.parallaxSpeed || 1);
      item.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
    });
  });
}

/* ==================== VIDEO ==================== */
const videoFile = document.getElementById('video-file');
const videoButton = document.getElementById('video-button');
const videoIcon = document.getElementById('video-icon');

if (videoFile && videoButton && videoIcon) {
  const playPause = () => {
    if (videoFile.paused) {
      videoFile.play();
      videoIcon.classList.add('ri-pause-line');
      videoIcon.classList.remove('ri-play-line');
    } else {
      videoFile.pause();
      videoIcon.classList.remove('ri-pause-line');
      videoIcon.classList.add('ri-play-line');
    }
  };

  videoButton.addEventListener('click', playPause);
  videoFile.addEventListener('ended', () => {
    videoIcon.classList.remove('ri-pause-line');
    videoIcon.classList.add('ri-play-line');
  });
}

/* ==================== SWIPER ==================== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper === 'undefined') return;

  if (document.querySelector('.brand-slider')) {
    new Swiper('.brand-slider', {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      breakpoints: {
        450: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 4 },
        1200: { slidesPerView: 5 }
      }
    });
  }

  if (document.querySelector('.test-swiper')) {
    new Swiper('.test-swiper', {
      loop: true,
      autoplay: { delay: 2000 }
    });
  }
});


/* ==================== TYPEWRITER EFFECT ==================== */
const typewriterElement = document.getElementById('typewriter');
const descriptionElement = document.getElementById('hero-description');

if (typewriterElement && descriptionElement) {
    const texts = [
        {
            title: "Web & Application Development",
            description: "We help U.S. businesses modernize applications, improve system performance, and streamline operations through ERP, CRM, and secure web & application development."
        },
        {
            title: "Staffing Services",
            description: "From IT professionals to compliance-ready healthcare staff, we deliver skilled talent through contract, contract-to-hire, and direct hire models—when and where you need them."
        },
        {
            title: "Process & BPO Support",
            description: "Our SLA-driven managed IT support and service desk solutions keep your systems running with L1-L3 support, 24x5 or 24x7 coverage, and predictable performance."
        }
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        const titleWithoutTags = currentText.title.replace(/<br>/g, '\n');
        
        if (!isDeleting && charIndex <= titleWithoutTags.length) {
            // Typing
            let displayText = titleWithoutTags.substring(0, charIndex);
            displayText = displayText.replace(/\n/g, '<br>');
            typewriterElement.innerHTML = displayText;
            charIndex++;
            
            if (charIndex > titleWithoutTags.length) {
                // Finished typing, show description
                descriptionElement.textContent = currentText.description;
                descriptionElement.style.opacity = '1';
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeWriter();
                }, 3000); // Pause for 3 seconds
                return;
            }
            setTimeout(typeWriter, 100); // Typing speed
            
        } else if (isDeleting && charIndex >= 0) {
            // Deleting
            let displayText = titleWithoutTags.substring(0, charIndex);
            displayText = displayText.replace(/\n/g, '<br>');
            typewriterElement.innerHTML = displayText;
            charIndex--;
            
            if (charIndex < 0) {
                // Finished deleting, move to next text
                isDeleting = false;
                descriptionElement.style.opacity = '0';
                textIndex = (textIndex + 1) % texts.length;
                charIndex = 0;
                setTimeout(typeWriter, 500); // Pause before next text
                return;
            }
            setTimeout(typeWriter, 50); // Deleting speed (faster)
        }
    }

    // Add transition for description
    descriptionElement.style.transition = 'opacity 0.5s ease';
    descriptionElement.style.opacity = '0';

    // Start typewriter effect
    typeWriter();
}


// Menu Navigation services dropdown (Desktop + Mobile)
/* ==================== MEGA MENU TABS JS ==================== */
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".mega-tab");
  const contents = document.querySelectorAll(".mega-content");

  tabs.forEach(tab => {
    tab.addEventListener("mouseenter", () => {
      // 1. Remove active class from all tabs & contents
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // 2. Add active class to hovered tab
      tab.classList.add("active");

      // 3. Show corresponding content
      const targetId = tab.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
});
// About Us Section Interactions


(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const section  = document.querySelector('.tiq-about');
    if (!section) return;

    const pHost    = section.querySelector('.tiq-particles');
    const tabs     = section.querySelectorAll('.tiq-tab');
    const panels   = section.querySelectorAll('.tiq-panel');
    const statNums = section.querySelectorAll('.tiq-stat-num');
    const scrollBar = section.querySelector('.tiq-scroll-bar');

    // ── scroll progress ─────────────────────────────────
    window.addEventListener('scroll', () => {
      if (!scrollBar) return;
      const sh = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.width = (sh > 0 ? (window.scrollY / sh) * 100 : 0) + '%';
    }, { passive: true });

    // ── vertical tab switching ───────────────────────────
    function activateTab(index) {
      tabs.forEach((t, i) => {
        const active = i === index;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach((p, i) => {
        p.classList.toggle('active', i === index);
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activateTab(i));
      // keyboard: arrow keys
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          activateTab((i + 1) % tabs.length);
          tabs[(i + 1) % tabs.length].focus();
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = (i - 1 + tabs.length) % tabs.length;
          activateTab(prev);
          tabs[prev].focus();
        }
      });
    });

    // ── animated counters (IntersectionObserver) ─────────
    let counted = false;
    const statsIO = new IntersectionObserver((entries) => {
      if (counted) return;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        counted = true;
        statNums.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1800;
          const step     = target / (duration / 16);
          let cur = 0;
          const tick = () => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.floor(cur);
            if (cur < target) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      });
    }, { threshold: 0.3 });

    const statsGrid = section.querySelector('.tiq-stats');
    if (statsGrid) statsIO.observe(statsGrid);

    // ── mouse-trail particles ────────────────────────────
    let pThrottle = null;
    section.addEventListener('mousemove', (e) => {
      if (pThrottle) return;
      pThrottle = setTimeout(() => { pThrottle = null; }, 90);
      spawnP(e.clientX, e.clientY);
    }, { passive: true });

    function spawnP(cx, cy, burst, col) {
      if (!pHost) return;
      const r  = section.getBoundingClientRect();
      const el = document.createElement('div');
      el.className = 'tiq-p';
      el.style.left = (cx - r.left) + 'px';
      el.style.top  = (cy - r.top) + 'px';
      const a = Math.random() * Math.PI * 2;
      const d = burst ? 60 + Math.random() * 50 : 28 + Math.random() * 35;
      el.style.setProperty('--tx', Math.cos(a) * d + 'px');
      el.style.setProperty('--ty', Math.sin(a) * d + 'px');
      el.style.background = col
        || (Math.random() > .5 ? 'rgba(37,77,129,.5)' : 'rgba(245,147,49,.5)');
      const sz = burst ? 5 : 3;
      el.style.width = el.style.height = sz + 'px';
      pHost.appendChild(el);
      setTimeout(() => el.remove(), 1800);
    }

    // burst on stat hover
    section.querySelectorAll('.tiq-stat').forEach(s => {
      s.addEventListener('mouseenter', (e) => {
        const r  = s.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top  + r.height / 2;
        const isBlue = s.classList.contains('tiq-stat--blue');
        for (let i = 0; i < 8; i++) {
          spawnP(cx, cy, true,
            isBlue ? 'rgba(37,77,129,.7)' : 'rgba(245,147,49,.7)');
        }
      });
    });

    // ── parallax orbs ────────────────────────────────────
    const orbs = section.querySelectorAll('.tiq-orb');
    section.addEventListener('mousemove', (e) => {
      const r  = section.getBoundingClientRect();
      const xn = (e.clientX - r.left) / r.width  - .5;
      const yn = (e.clientY - r.top)  / r.height - .5;
      orbs.forEach((o, i) => {
        const sp = (i + 1) * 22;
        o.style.transform = `translate(${xn * sp}px, ${yn * sp}px)`;
      });
    }, { passive: true });
  });
})();

// New Honeycomb Section Interactions


(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const section  = document.querySelector('.what-we-do-modern');
    const pHost    = document.querySelector('.honeycomb-particles');
    const hexagons = document.querySelectorAll('.hexagon-modern');
    if (!section) return;

    // ── parallax blobs ──────────────────────────────────────────────
    const blobs = section.querySelectorAll('.float-shape');
    section.addEventListener('mousemove', (e) => {
      const r  = section.getBoundingClientRect();
      const xn = (e.clientX - r.left) / r.width  - .5;
      const yn = (e.clientY - r.top)  / r.height - .5;
      blobs.forEach((b, i) => {
        const sp = (i + 1) * 18;
        b.style.transform = `translate(${xn*sp}px,${yn*sp}px)`;
      });
    });

    // ── mouse-trail particles ───────────────────────────────────────
    let pThrottle = null;
    section.addEventListener('mousemove', (e) => {
      if (pThrottle) return;
      pThrottle = setTimeout(() => { pThrottle = null; }, 80);
      spawn(e.clientX, e.clientY, false);
    });

    function spawn(cx, cy, burst, col) {
      if (!pHost) return;
      const r  = section.getBoundingClientRect();
      const el = document.createElement('div');
      el.className = 'hcp';
      el.style.left = (cx - r.left) + 'px';
      el.style.top  = (cy - r.top)  + 'px';
      const a  = Math.random() * Math.PI * 2;
      const d  = burst ? 65 + Math.random()*55 : 30 + Math.random()*38;
      el.style.setProperty('--tx', Math.cos(a)*d + 'px');
      el.style.setProperty('--ty', Math.sin(a)*d + 'px');
      el.style.background = col || (Math.random()>.5
        ? 'rgba(37,77,129,.75)' : 'rgba(245,147,49,.75)');
      el.style.width = el.style.height = (burst ? 5 : 3) + 'px';
      pHost.appendChild(el);
      setTimeout(() => el.remove(), 1800);
    }

    // ── per-hexagon interactions ────────────────────────────────────
    hexagons.forEach(hex => {
      // 3-D tilt
      hex.addEventListener('mousemove', e => {
        const r  = hex.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  - r.height/2) / 9;
        const ry = (r.width/2 - (e.clientX - r.left))  / 9;
        hex.style.transform =
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.06) translateZ(0)`;
      });
      hex.addEventListener('mouseleave', () => {
        hex.style.transform =
          'perspective(800px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
      });

      // burst on click
      hex.addEventListener('click', () => {
        const r = hex.getBoundingClientRect();
        const cx = r.left + r.width/2, cy = r.top + r.height/2;
        for (let i = 0; i < 14; i++) {
          spawn(cx, cy, true, i%2===0
            ? 'rgba(37,77,129,.9)' : 'rgba(245,147,49,.9)');
        }
      });
    });

    // ── scroll-reveal ───────────────────────────────────────────────
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.style.animationPlayState = 'running';
      });
    }, { threshold:.1, rootMargin:'0px 0px -80px 0px' });

    hexagons.forEach(h => {
      h.style.animationPlayState = 'paused';
      io.observe(h);
    });
  });
})();


// abut us 

(function() {
    'use strict';
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger number counter animation for stats
                if (entry.target.classList.contains('stat-box-about')) {
                    const numberElement = entry.target.querySelector('.stat-number-about');
                    animateNumber(numberElement);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.content-card-about, .stat-box-about').forEach(el => {
        observer.observe(el);
    });

    // Number counter animation
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + (element.nextElementSibling.textContent.includes('Rate') ? '%' : '+');
            }
        };

        updateNumber();
    }

    // 3D Tilt effect on cards
    document.querySelectorAll('[data-tilt-about]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress-about');
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
    });

    // Particle effect on mouse move within section
    const aboutSection = document.querySelector('.modern-about-section');
    const particlesContainer = document.querySelector('.particles-about');
    let particleTimeout;

    if (aboutSection && particlesContainer) {
        aboutSection.addEventListener('mousemove', (e) => {
            clearTimeout(particleTimeout);
            
            particleTimeout = setTimeout(() => {
                createParticle(e.clientX, e.clientY);
            }, 50);
        });
    }

    function createParticle(x, y) {
        const particlesContainer = document.querySelector('.particles-about');
        if (!particlesContainer) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const particle = document.createElement('div');
        particle.className = 'particle-about';
        particle.style.left = (x - rect.left) + 'px';
        particle.style.top = (y - rect.top) + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    // Button ripple effect
    const btnPrimary = document.querySelector('.btn-primary-about');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function(e) {
            // Allow normal link behavior
        });
    }

    // Parallax effect for floating shapes
    if (aboutSection) {
        aboutSection.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape-about');
            const rect = aboutSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const xMove = (x - 0.5) * speed;
                const yMove = (y - 0.5) * speed;
                
                shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });
    }
})();

// OUR TEAM PAGE JS
    /* ==================== TEAM DEPARTMENT TABS ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const deptTabs = document.querySelectorAll('.dept-tab');
  const deptPanes = document.querySelectorAll('.dept-pane');

  if (deptTabs.length > 0) {
    deptTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 1. Remove active from all
        deptTabs.forEach(t => t.classList.remove('active'));
        deptPanes.forEach(p => p.classList.remove('active'));

        // 2. Add active to clicked
        tab.classList.add('active');

        // 3. Show content
        const target = tab.getAttribute('data-dept');
        document.getElementById(target).classList.add('active');
      });
    });
  }
});