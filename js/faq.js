const items = document.querySelectorAll(".accordion__item");

items.forEach((item) => {
  const button = item.querySelector(".accordion__button");
  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    items.forEach((i) => i.classList.remove("active"));
    if (!isActive) {
      item.classList.add("active");
    }
  });
});
