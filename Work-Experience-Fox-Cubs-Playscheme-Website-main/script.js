
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("primary-navigation");

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");
  const themeLabel = themeToggle?.querySelector(".theme-label");

  const currentYear = document.getElementById("current-year");

  // -----------------------------------------
  // Copyright year
  // -----------------------------------------

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // -----------------------------------------
  // Dark mode
  // -----------------------------------------

  const getSavedTheme = () => {
    try {
      const savedTheme = localStorage.getItem("foxcubs-theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch {
      // Storage may be unavailable in private browsing.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";

    root.dataset.theme = isDark ? "dark" : "light";
    root.style.colorScheme = isDark ? "dark" : "light";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        isDark ? "#111725" : "#f28c00"
      );
    }
  };

  applyTheme(getSavedTheme());

  themeToggle?.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("foxcubs-theme", nextTheme);
    } catch {
      // Theme still works for this page view without storage.
    }
  });

  // -----------------------------------------
  // Mobile navigation
  // -----------------------------------------

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    navigation.classList.add("is-open");
    document.body.classList.add("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu after a visitor selects a link.
  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close if a visitor taps outside the mobile menu.
  document.addEventListener("click", (event) => {
    if (
      navigation?.classList.contains("is-open") &&
      !navigation.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close when moving back to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      closeMenu();
    }
  });

  // -----------------------------------------
  // Smooth scroll reveal animations
  // -----------------------------------------

  const revealElements = document.querySelectorAll(".reveal");
  if (
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  "IntersectionObserver" in window
) {
  document.documentElement.classList.add("js-motion");
}

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // -----------------------------------------
  // Smooth section navigation
  // -----------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      closeMenu();

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });

      // Update the URL hash without causing another jump.
      if (window.location.hash !== targetId) {
        history.pushState(null, "", targetId);
      }
    });
  });
});
