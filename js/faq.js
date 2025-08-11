// const items = document.querySelectorAll(".accordion__item");

// items.forEach((item) => {
//   const button = item.querySelector(".accordion__button");
//   button.addEventListener("click", () => {
//     const isActive = item.classList.contains("active");
//     items.forEach((i) => i.classList.remove("active"));
//     if (!isActive) {
//       item.classList.add("active");
//     }
//   });
// });

const headers = document.querySelectorAll('.accordion__button');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const currentItem = header.parentElement;
        const currentContent = currentItem.querySelector('.accordion__content');
        const isActive = currentItem.classList.contains('active');

        // Закрыть все
        document.querySelectorAll('.accordion__item').forEach(item => {
          item.classList.remove('active');
          item.querySelector('.accordion__content').style.maxHeight = '0';
        });

        // Открыть текущий, если он был закрыт
        if (!isActive) {
          currentItem.classList.add('active');
          currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
        }
      });
    });
