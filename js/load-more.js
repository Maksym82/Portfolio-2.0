const loadMoreButton = document.getElementById("load-more");
const projectItems = document.querySelectorAll(".projects__item");
let visibleItems = 3; // Начальное количество видимых элементов

// Скрываем все элементы, кроме первых трех
projectItems.forEach((item, index) => {
  if (index >= visibleItems) {
    item.style.display = "none";
  }
});

// Добавляем обработчик события на кнопку
loadMoreButton.addEventListener("click", () => {
  let newlyVisible = 0;
  for (let i = visibleItems; i < projectItems.length && newlyVisible < 3; i++) {
    projectItems[i].style.display = "block";
    newlyVisible++;
  }
  visibleItems += newlyVisible;

  // Если все элементы видимы, скрываем кнопку
  if (visibleItems >= projectItems.length) {
    loadMoreButton.style.display = "none";
  }
});
