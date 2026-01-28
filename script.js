// ========================================
// MODERN PORTFOLIO - INTERACTIVE JAVASCRIPT
// ========================================

// ========================================
// NAVIGATION
// ========================================

// Navbar scroll effect
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll(".section, .hero");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// ========================================
// SMOOTH SCROLL
// ========================================

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars when they come into view
      if (entry.target.classList.contains("skill-category")) {
        animateSkillBars(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll(".fade-in");
fadeElements.forEach((element) => {
  observer.observe(element);
});

// ========================================
// SKILL BARS ANIMATION
// ========================================

function animateSkillBars(skillCategory) {
  const skillBars = skillCategory.querySelectorAll(".skill-progress");

  skillBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.width = targetWidth;
    }, index * 100);
  });
}

// ========================================
// TYPING EFFECT (Optional Enhancement)
// ========================================

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Uncomment to enable typing effect on hero subtitle
// const heroSubtitle = document.getElementById('typedRole');
// if (heroSubtitle) {
//   const originalText = heroSubtitle.textContent;
//   setTimeout(() => {
//     typeWriter(heroSubtitle, originalText, 80);
//   }, 1000);
// }

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Here you would typically send the data to a server
  // For now, we'll just show a success message
  console.log("Form submitted:", formData);

  // Show success message
  showNotification(
    "Pesan berhasil dikirim! Terima kasih telah menghubungi saya.",
    "success",
  );

  // Reset form
  contactForm.reset();
});

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg) var(--spacing-xl);
    color: var(--color-text-primary);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-tooltip);
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;

  // Add icon based on type
  const icon = type === "success" ? "✓" : "ℹ";
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--spacing-md);">
      <span style="font-size: var(--font-size-2xl); color: var(--color-accent-primary);">${icon}</span>
      <span>${message}</span>
    </div>
  `;

  // Add to body
  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// PARALLAX EFFECT (Optional Enhancement)
// ========================================

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector(".hero-content");

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / window.innerHeight;
  }
});

// ========================================
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website loaded successfully! 🚀");

  // Set initial active nav link
  updateActiveNavLink();

  // Update copyright year automatically
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }

  // Add smooth reveal to elements already in view
  setTimeout(() => {
    const viewportHeight = window.innerHeight;
    fadeElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight) {
        element.classList.add("visible");
      }
    });
  }, 100);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use debounced scroll handler for better performance
const debouncedScroll = debounce(() => {
  updateActiveNavLink();
}, 10);

window.addEventListener("scroll", debouncedScroll);
