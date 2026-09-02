document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. Mobile Navigation Menu
     -------------------------------------------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const menuText = menuToggle?.querySelector('.menu-text');

  function closeMenu() {
    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      if (menuText) menuText.textContent = 'Menu';
    }
  }

  function toggleMenu() {
    const isExpanded = menuToggle?.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    
    nav?.classList.toggle('open', nextState);
    menuToggle?.setAttribute('aria-expanded', String(nextState));
    if (menuText) {
      menuText.textContent = nextState ? 'Close' : 'Menu';
    }
  }

  // Toggle button click
  menuToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking nav links
  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav?.classList.contains('open') && !nav.contains(e.target) && !menuToggle?.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) {
      closeMenu();
      menuToggle?.focus();
    }
  });

  /* --------------------------------------------------------------------------
     2. Interactive WhatsApp Customizer Widget
     -------------------------------------------------------------------------- */
  const customizerState = {
    format: '1-on-1 Private Sessions',
    goal: 'Release Stress & Anxiety',
    time: 'Morning (6:30 - 8:30 AM)',
    phone: '919876543210'
  };

  const previewEl = document.getElementById('whatsapp-preview-text');
  const whatsappBtn = document.getElementById('customizer-whatsapp-btn');

  function updateWhatsAppPreview() {
    const message = `Namaste Hansika! I would love to join your ${customizerState.format}. My primary focus is to ${customizerState.goal}, and my preferred timing is ${customizerState.time}. Could you please share the details?`;
    
    if (previewEl) {
      previewEl.textContent = `"${message}"`;
    }

    if (whatsappBtn) {
      const encodedMessage = encodeURIComponent(message);
      whatsappBtn.href = `https://wa.me/${customizerState.phone}?text=${encodedMessage}`;
    }
  }

  function setupPillGroup(groupId, stateKey) {
    const container = document.getElementById(groupId);
    if (!container) return;

    const pills = container.querySelectorAll('.pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        customizerState[stateKey] = pill.getAttribute('data-val') || pill.textContent.trim();
        updateWhatsAppPreview();
      });
    });
  }

  setupPillGroup('format-options', 'format');
  setupPillGroup('goal-options', 'goal');
  setupPillGroup('time-options', 'time');

  // Initialize preview on page load
  updateWhatsAppPreview();

  /* --------------------------------------------------------------------------
     3. Interactive FAQ Accordion
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const willExpand = !isExpanded;

      // Optional: Close other open FAQs for a clean accordion effect
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          otherTrigger?.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.hidden = true;
        }
      });

      trigger.setAttribute('aria-expanded', String(willExpand));
      if (content) {
        content.hidden = !willExpand;
      }
    });
  });
});


