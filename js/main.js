"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // === FAQ Accordion ===
  const headers = document.querySelectorAll(".accordion__button");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const currentItem = header.parentElement;
      const currentContent = currentItem.querySelector(".accordion__content");
      const isActive = currentItem.classList.contains("active");

      document.querySelectorAll(".accordion__item.active").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".accordion__content").style.maxHeight = null;
      });

      if (!isActive) {
        currentItem.classList.add("active");
        requestAnimationFrame(() => {
          currentContent.style.maxHeight = currentContent.scrollHeight + "px";
        });
      }
    });
  });

  // === Theme Toggle ===
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    const savedTheme = localStorage.getItem("theme");
    document.body.classList.toggle("dark-theme", savedTheme === "dark");
    toggleButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    toggleButton.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleButton.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // === Swiper Reviews (1 instance only) ===
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper-reviews", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 8 },
        1280: { slidesPerView: 2, spaceBetween: 18 },
      },
    });
  }

  // === Scroll-Up Button ===
  const scrollUp = document.querySelector(".scroll-up");
  const scrollUpSvgPath = document.querySelector(".scroll-up-svg-path");
  const offset = 100;

  if (scrollUp && scrollUpSvgPath) {
    const pathLength = scrollUpSvgPath.getTotalLength();
    scrollUpSvgPath.style.strokeDasharray = `${pathLength}`;
    scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";

    const updateDashoffset = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const dashoffset = pathLength - (scrollTop * pathLength) / height;
      scrollUpSvgPath.style.strokeDashoffset = dashoffset;
      scrollUp.classList.toggle("scroll-up-active", scrollTop > offset);
    };

    window.addEventListener("scroll", updateDashoffset);

    scrollUp.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Load More Projects ===
  const loadMoreButton = document.getElementById("load-more");
  const projectItems = document.querySelectorAll(".projects__item");
  let visibleItems = 3;

  if (loadMoreButton && projectItems.length > visibleItems) {
    projectItems.forEach((item, index) => {
      item.style.display = index < visibleItems ? "block" : "none";
    });

    loadMoreButton.addEventListener("click", () => {
      const hiddenItems = Array.from(projectItems).slice(visibleItems, visibleItems + 3);
      hiddenItems.forEach(item => item.style.display = "block");
      visibleItems += hiddenItems.length;

      if (visibleItems >= projectItems.length) {
        loadMoreButton.style.display = "none";
      }
    });
  }
});

// === Global Click Handler for Menu ===
document.addEventListener("click", e => {
  if (e.target.closest(".icon-menu") || e.target.closest(".menu__link")) {
    document.documentElement.classList.toggle("menu-open");
  }
});