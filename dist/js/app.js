"use sctrict";

// Функция для плавной прокрутки к указанному блоку по его ID
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const offset = element.getBoundingClientRect().top + window.pageYOffset;
    window.scroll({
      top: offset,
      behavior: "smooth", // Добавляем свойство behavior со значением "smooth" для плавной прокрутки
    });
  }
}

// Обрабатываем клик на ссылку
document.addEventListener("click", function (event) {
  const link = event.target.closest("a"); // Находим ближайшую ссылку, на которую кликнули
  if (link && link.hash) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки
    const target = link.hash; // Получаем значение атрибута "hash" (например, "#section1")
    smoothScroll(target); // Вызываем функцию плавной прокрутки к блоку с указанным ID
  }
});

// Header
// const header = docuemtn.querySelector('.header');

// Menu
const iconMenu = document.querySelector(".icon-menu");
// const page = document.querySelector('.page');
const menu = document.querySelector(".menu");
// const menuClose = document.querySelector('.menu__close');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    iconMenu.classList.add("active");
    document.body.classList.add("lock");
    menu.classList.add("active");
    // page.classList.add('active_bg');
  });
  // menuClose.addEventListener('click', () => {
  // 	document.body.classList.remove('lock');
  // 	menu.classList.remove('active');
  // 	page.classList.remove('active_bg');
  // });
  // page.addEventListener('click', () => {
  // 	document.body.classList.remove('lock');
  // 	menu.classList.remove('active');
  // 	page.classList.remove('active_bg');
  // });
}

// Replace header btn
document.addEventListener("DOMContentLoaded", () => {
  const headerBtn = document.querySelector(".header__btn");
  const headerInner = document.querySelector(".header__inner");
  if (headerBtn) {
    function replaceBtn() {
      if (document.documentElement.offsetWidth <= 768) {
        menu.append(headerBtn);
      } else {
        headerInner.append(headerBtn);
      }
    }
    window.addEventListener("resize", () => {
      replaceBtn();
    });
    replaceBtn();
  }
});

// Masonry with grid
const gridStyles = getComputedStyle(
  document.querySelector(".quiz__body", null)
);
const rowHeight = parseInt(gridStyles.gridAutoRows);
const gap = parseInt(gridStyles.gridGap);

let makeGrid = function () {
  let items = document.querySelectorAll(".quiz__item");
  for (let i = 0, item; (item = items[i]); i++) {
    item.classList.remove("quiz__item-ready");
    let height = item.offsetHeight;
    let rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
    item.style.gridRowEnd = "span " + rowSpan;
    item.classList.add("quiz__item-ready");
  }
};
makeGrid();
window.addEventListener("load", makeGrid);
window.addEventListener("resize", () => {
  clearTimeout(makeGrid.resizeTimer);
  makeGrid.resizeTimer = setTimeout(makeGrid, 50);
});
