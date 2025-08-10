const toggleButton = document.getElementById("theme-toggle");

// Проверка сохранённой темы при загрузке
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  toggleButton.textContent = "☀️";
} else {
  toggleButton.textContent = "🌙";
}

// Обработчик переключения темы
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  // Сохраняем тему и меняем иконку
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    toggleButton.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleButton.textContent = "🌙";
  }
});
