const mobileMenuOpenBtn = document.querySelector('.mobile-menu-open-btn');
const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const mobileCartOpenBtn = document.querySelector('.mobile-shopping-cart-open-btn');
const mobileCartCloseBtn = document.querySelector('.mobile-shopping-cart-close-btn');
const mobileCart = document.querySelector('.mobile-shopping-cart');
const header = document.querySelector('.header');
const headerLogoWrapper = document.querySelector('.header__logo');
const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
const mobileSubmenus = document.querySelectorAll('.mobile-menu-submenu');
const searchBar = document.querySelector('.search-bar');
const headerSearchBtn = document.querySelector('.header__search-btn');
const searchBarInput = document.querySelector('.search-bar__input');
const main = document.querySelector('.main');

const openMenu = (menu, directionClass) => {
  menu.classList.add(`${directionClass}-0`);
  menu.classList.remove(`${directionClass}-[-280px]`);
  overlay.classList.add('show');
  overlay.classList.remove('hide');
};

const closeMenus = () => {
  mobileMenu.classList.remove('right-0');
  mobileMenu.classList.add('right-[-280px]');
  mobileCart.classList.remove('left-0');
  mobileCart.classList.add('left-[-280px]');
  overlay.classList.remove('show');
  overlay.classList.add('hide');
};

const headerScrollHandler = () => {
  if (window.scrollY > 0) {
    header.classList.add('h-16');
    header.classList.remove('lg:h-24');
    header.classList.remove('h-20');
    headerLogoWrapper.classList.add('w-20');
    headerLogoWrapper.classList.remove('w-24');
    searchBar.classList.add('top-16');
    searchBar.classList.remove('top-24');
  } else {
    header.classList.remove('h-16');
    header.classList.add('lg:h-24');
    header.classList.add('h-20');
    headerLogoWrapper.classList.remove('w-20');
    headerLogoWrapper.classList.add('w-24');
    searchBar.classList.remove('top-16');
    searchBar.classList.add('top-24');
  }
};

const mobileSubmenuMenuToggle = (menu) => {
  menu.children[0].classList.toggle('rotate-180');
  menu.classList.toggle('text-fuchsia-600');
  mobileSubmenus.forEach((submenu) => {
    if (submenu !== menu.nextElementSibling) {
      submenu.previousElementSibling.children[0].classList.remove('rotate-180');
      submenu.previousElementSibling.classList.remove('text-fuchsia-600');
      submenu.classList.remove('mobile-menu-submenu-open');
      submenu.classList.add('h-0');
    }
  });

  menu.nextElementSibling.classList.toggle('mobile-menu-submenu-open');
  menu.nextElementSibling.classList.toggle('h-0');
};

const headerSearchBarToggle = () => {
  searchBar.classList.toggle('right-0');
  searchBar.classList.toggle('right-[-100vw]');
  searchBarInput.value = '';
  searchBarInput.focus();
};

mobileMenuItems.forEach((menu) => {
  menu.addEventListener('click', () => mobileSubmenuMenuToggle(menu));
});

mobileMenuOpenBtn.addEventListener('click', () => openMenu(mobileMenu, 'right'));
mobileCartOpenBtn.addEventListener('click', () => openMenu(mobileCart, 'left'));
mobileMenuCloseBtn.addEventListener('click', closeMenus);
mobileCartCloseBtn.addEventListener('click', closeMenus);
overlay.addEventListener('click', closeMenus);
window.addEventListener('scroll', headerScrollHandler);
headerSearchBtn.addEventListener('click', headerSearchBarToggle);
