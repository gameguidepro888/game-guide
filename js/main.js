/* ============================================
   Game Guide Pro - Main JavaScript
   Mobile menu, search, tabs, FAQ accordion, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* === Mobile Menu Toggle === */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('mobile-open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      });
    });
  }

  /* === Search Overlay === */
  const searchTrigger = document.querySelector('.search-trigger');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-overlay input');

  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) setTimeout(() => searchInput.focus(), 100);
      document.body.style.overflow = 'hidden';
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Close search on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* === Tab Switching === */
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panels = tabGroup.parentElement.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-tab');
        panels.forEach(panel => {
          panel.classList.toggle('active', panel.getAttribute('data-tab') === target);
        });
      });
    });
  });

  /* === FAQ Accordion === */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all others in same list
      const list = item.parentElement;
      if (list) {
        list.querySelectorAll('.faq-item.open').forEach(openItem => {
          if (openItem !== item) openItem.classList.remove('open');
        });
      }

      item.classList.toggle('open', !isOpen);
    });
  });

  /* === Back to Top Button === */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          backToTop.classList.toggle('visible', window.scrollY > 500);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* === Highlight Active Nav Link === */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#' && currentPath.includes(href.replace(/^\//, ''))) {
      link.classList.add('active');
    }
  });

  /* === Premium Lock Click Handler === */
  document.querySelectorAll('.premium-lock-section .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.closest('a')?.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        window.location.href = '../pages/membership.html';
      }
    });
  });

  /* === Form Submit Handler === */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = contactForm.querySelector('.form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
      }
    });
  }

  /* === Smooth scroll for anchor links === */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* === Copy share link === */
  document.querySelectorAll('.share-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }).catch(() => {});
    });
  });

});
