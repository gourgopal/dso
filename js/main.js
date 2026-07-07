// ============================================================
// Dynamic Solutions — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Header Scroll Effect ---
  const header = document.getElementById('mainHeader');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
    document.body.style.overflow = navLinks?.classList.contains('open') ? 'hidden' : '';
  });

  // Close nav on link click (mobile)
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Auto-add reveal class to major sections ---
  const autoRevealSelectors = [
    '.product-card',
    '.why-card',
    '.sector-card',
    '.testimonial-card',
    '.pos-card',
    '.about-stat-box',
    '.contact-method',
    '.product-detail-card',
  ];

  autoRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
      revealObserver.observe(el);
    });
  });

  // --- Product Filter Tabs (Products Page) ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productDetailCards = document.querySelectorAll('.product-detail-card');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        productDetailCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value;
    const phone = document.getElementById('contactPhone')?.value;
    const product = document.getElementById('contactProduct')?.value;
    const message = document.getElementById('contactMessage')?.value;

    const waText = encodeURIComponent(
      `Hello Dynamic Solutions!\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${product}\nMessage: ${message}`
    );

    window.open(`https://wa.me/918917241615?text=${waText}`, '_blank');
  });

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => countObserver.observe(counter));

  // --- Active nav link based on current page ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Desktop nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile bottom nav active state
  const mobileNavMap = {
    'index.html': 'mobNavHome',
    '': 'mobNavHome',
    'products.html': 'mobNavProducts',
    'pos.html': 'mobNavPOS',
    'about.html': null,       // no dedicated tab — dimmed
    'contact.html': null,     // no dedicated tab — dimmed
  };

  document.querySelectorAll('.mob-nav-item').forEach(item => {
    item.classList.remove('active');
  });

  const activeTabId = mobileNavMap[currentPage];
  if (activeTabId) {
    const activeTab = document.getElementById(activeTabId);
    if (activeTab) activeTab.classList.add('active');
  }

  // --- Touch ripple feedback on mobile buttons ---
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    document.querySelectorAll('.btn, .mob-nav-item, .product-card').forEach(el => {
      el.addEventListener('touchstart', () => { el.style.opacity = '0.85'; }, { passive: true });
      el.addEventListener('touchend', () => { setTimeout(() => { el.style.opacity = ''; }, 150); }, { passive: true });
    });
  }

});


// Lightbox Feature
document.addEventListener('DOMContentLoaded', () => {
  // Create lightbox HTML
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.id = 'lightbox-img';
  
  const lightboxClose = document.createElement('span');
  lightboxClose.id = 'lightbox-close';
  lightboxClose.innerHTML = '&times;';
  
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxClose);
  document.body.appendChild(lightbox);
  
  // Close lightbox event
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300);
    }
  });
  
  // Attach click event to all relevant images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Skip tiny icons if necessary, but we can bind to all
    // Or skip if it's the logo
    if (img.closest('.logo')) return;
    
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      // Trigger reflow
      void lightbox.offsetWidth;
      lightbox.classList.add('show');
    });
  });
});
