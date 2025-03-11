var swiper = new Swiper(".swiper-reviews", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    // when window width is >= 1280px
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
