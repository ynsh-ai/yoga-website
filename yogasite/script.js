document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------------------------
     1. Mobile Navigation Menu
     -------------------------------------------------------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const menuText = menuToggle?.querySelector(".menu-text");

  function closeMenu() {
    if (nav?.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuText) menuText.textContent = "Menu";
    }
  }

  function toggleMenu() {
    const isExpanded = menuToggle?.getAttribute("aria-expanded") === "true";
    const nextState = !isExpanded;
    
    nav?.classList.toggle("open", nextState);
    menuToggle?.setAttribute("aria-expanded", String(nextState));
    if (menuText) {
      menuText.textContent = nextState ? "Close" : "Menu";
    }
  }

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (e) => {
    if (nav?.classList.contains("open") && !nav.contains(e.target) && !menuToggle?.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("open")) {
      closeMenu();
      menuToggle?.focus();
    }
  });

  /* --------------------------------------------------------------------------
     2. Interactive WhatsApp Visual Tile Customizer (with Event Delegation)
     -------------------------------------------------------------------------- */
  const customizerState = {
    format: "1-on-1 Private Sessions",
    goal: "Weight Loss & Metabolic Toning",
    time: "Morning (6:30 - 8:30 AM)",
    phone: "917668467896"
  };

  const previewEl = document.getElementById("whatsapp-preview-text");
  const whatsappBtn = document.getElementById("customizer-whatsapp-btn");

  function updateWhatsAppPreview() {
    const message = `Namaste Hansika! I would love to join your ${customizerState.format}. My primary focus is ${customizerState.goal}, and my preferred timing is ${customizerState.time}. Could you please share the details?`;
    
    if (previewEl) {
      previewEl.textContent = `\"${message}\"`;
    }

    if (whatsappBtn) {
      const encodedMessage = encodeURIComponent(message);
      whatsappBtn.href = `https://wa.me/${customizerState.phone}?text=${encodedMessage}`;
    }
  }

  function setupTileGroup(groupId, stateKey) {
    const container = document.getElementById(groupId);
    if (!container) return;

    container.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile-card, .pill");
      if (!tile || !container.contains(tile)) return;

      container.querySelectorAll(".tile-card, .pill").forEach((t) => t.classList.remove("active"));
      tile.classList.add("active");
      customizerState[stateKey] = tile.getAttribute("data-val") || tile.textContent.trim();
      updateWhatsAppPreview();
    });
  }

  setupTileGroup("format-options", "format");
  setupTileGroup("goal-options", "goal");
  setupTileGroup("time-options", "time");

  // Run initial preview setup
  updateWhatsAppPreview();

  /* --------------------------------------------------------------------------
     3. Interactive FAQ Accordion
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");

    trigger?.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      const willExpand = !isExpanded;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector(".faq-trigger");
          const otherContent = otherItem.querySelector(".faq-content");
          otherTrigger?.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.hidden = true;
        }
      });

      trigger.setAttribute("aria-expanded", String(willExpand));
      if (content) {
        content.hidden = !willExpand;
      }
    });
  });
});
