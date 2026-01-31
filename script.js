// ========================================
// WARUNG TOKO GAS BU SITI
// JavaScript Functionality
// ========================================

// ========================================
// MOBILE MENU - SIMPLIFIED & FIXED
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Get elements
  const menuBtn = document.getElementById("mobileMenuBtn");
  const menuPanel = document.getElementById("mobileMenuPanel");
  const menuOverlay = document.getElementById("mobileMenuOverlay");
  const menuClose = document.getElementById("mobileMenuClose");
  const menuLinks = document.querySelectorAll(".mobile-nav-link");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  // Check if elements exist - silently skip if not present
  if (!menuBtn || !menuPanel || !menuOverlay) {
    return;
  }

  // Open menu function
  function openMenu() {
    menuOverlay.classList.remove("hidden");
    document.body.classList.add("mobile-menu-open");

    // Toggle icons
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }

    // Force reflow
    menuOverlay.offsetHeight;

    // Animate
    menuOverlay.style.opacity = "1";
    menuPanel.style.transform = "translateY(0)";
    menuBtn.setAttribute("aria-expanded", "true");
  }

  // Close menu function
  function closeMenu() {
    menuOverlay.style.opacity = "0";
    menuPanel.style.transform = "translateY(100%)";
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mobile-menu-open");

    // Toggle icons back
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }

    // Remove from DOM after animation
    setTimeout(function () {
      menuOverlay.classList.add("hidden");
    }, 300);
  }

  // Toggle menu function
  function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Event listeners
  menuBtn.addEventListener("click", toggleMenu);

  if (menuClose) {
    menuClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
  }

  menuOverlay.addEventListener("click", function (e) {
    e.preventDefault();
    closeMenu();
  });

  // Close menu when clicking links
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setTimeout(closeMenu, 150);
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuPanel.style.transform === "translateY(0px)") {
      closeMenu();
    }
  });

  // Close on window resize to desktop
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    }, 250);
  });
});

// ========================================
// ORIGINAL FUNCTIONALITY
// ========================================

// Initialize AOS Animation
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
  disable: function () {
    return window.innerWidth < 768;
  },
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if href is just "#"
    if (href === "#") {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = window.innerWidth < 768 ? 70 : 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Image Lazy Loading
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img);
  });
} else {
  // Fallback for older browsers
  document.querySelectorAll("img").forEach((img) => {
    img.classList.add("loaded");
  });
}

// Add Loading State
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ========================================
// ENHANCED WHATSAPP BUTTON FUNCTIONALITY
// ========================================

// WhatsApp button click event for analytics
document.addEventListener("DOMContentLoaded", function () {
  const waButton = document.querySelector(".wa-main-button");

  if (waButton) {
    waButton.addEventListener("click", function () {
      console.log("WhatsApp button clicked");
      // Add analytics tracking here if needed
    });
  }

  // Show tooltip on first visit (optional)
  const tooltip = document.querySelector(".wa-tooltip");
  if (tooltip) {
    setTimeout(() => {
      tooltip.style.opacity = "1";
      tooltip.style.right = "80px";
      setTimeout(() => {
        tooltip.style.opacity = "0";
        tooltip.style.right = "75px";
      }, 3000);
    }, 1000);
  }
});

// Console Message
console.log(
  "%cðŸ”¥ Warung Toko Gas Bu Siti",
  "color: #2563eb; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cGas LPG & Air Galon Terpercaya di Binong Permai Curug",
  "color: #10b981; font-size: 14px;"
);

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-initialize AOS on resize if needed
    if (window.innerWidth >= 768) {
      AOS.refresh();
    }
  }, 250);
});

// Prevent zoom on double-tap for better mobile UX
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
