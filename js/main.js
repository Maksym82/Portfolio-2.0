"use strict";

document.addEventListener('DOMContentLoaded', () => {
  // === FAQ Accordion ===
  const headers = document.querySelectorAll('.accordion__button');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const currentContent = currentItem.querySelector('.accordion__content');
      const isActive = currentItem.classList.contains('active');

      document.querySelectorAll('.accordion__item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion__content').style.maxHeight = '0';
      });

      if (!isActive) {
        currentItem.classList.add('active');
        currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
      }
    });
  });

  // === Theme Toggle ===
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      toggleButton.textContent = "☀️";
    } else {
      toggleButton.textContent = "🌙";
    }

    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");

      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙";
      }
    });
  }

  // === Swiper Reviews ===
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper-reviews", {
      direction: "horizontal",
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        1280: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } else {
    console.warn("Swiper is not loaded.");
  }

  // === Scroll-Up Button ===
  const offset = 100;
  const scrollUp = document.querySelector(".scroll-up");
  const scrollUpSvgPath = document.querySelector(".scroll-up-svg-path");

  if (scrollUp && scrollUpSvgPath) {
    const pathLength = scrollUpSvgPath.getTotalLength();

    scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";

    const getTop = () => window.scrollY || document.documentElement.scrollTop;

    const updateDashoffset = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const dashoffset = pathLength - (getTop() * pathLength) / height;
      scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    };

    window.addEventListener("scroll", () => {
      updateDashoffset();
      if (getTop() > offset) {
        scrollUp.classList.add("scroll-up-active");
      } else {
        scrollUp.classList.remove("scroll-up-active");
      }
    });

    scrollUp.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // === Load More Projects ===
  const loadMoreButton = document.getElementById("load-more");
  const projectItems = document.querySelectorAll(".projects__item");
  let visibleItems = 3;

  if (loadMoreButton && projectItems.length > 0) {
    projectItems.forEach((item, index) => {
      if (index >= visibleItems) {
        item.style.display = "none";
      }
    });

    loadMoreButton.addEventListener("click", () => {
      let newlyVisible = 0;
      for (let i = visibleItems; i < projectItems.length && newlyVisible < 3; i++) {
        projectItems[i].style.display = "block";
        newlyVisible++;
      }
      visibleItems += newlyVisible;

      if (visibleItems >= projectItems.length) {
        loadMoreButton.style.display = "none";
      }
    });
  }
});

// === Global Click Handler for Menu ===
document.addEventListener("click", function(e) {
  const targetItem = e.target;
  if (targetItem.closest(".icon-menu") || targetItem.closest(".menu__link")) {
    document.documentElement.classList.toggle("menu-open");
  }
});