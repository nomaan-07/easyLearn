import {
  mobileMenuOpenBtn,
  mobileMenuCloseBtn,
  mobileMenu,
  overlay,
  mobileCartOpenBtn,
  mobileCartCloseBtn,
  mobileCart,
  header,
  headerLogoWrapper,
  mobileMenuItems,
  mobileSubmenus,
  searchBar,
  headerSearchToggleBtn,
  searchBarInput,
  searchBarSearchBtn,
  mobileSearchInput,
  mobileSearchBtn,
  loginButtons,
  localStorageUserID,
} from './dom-elements.js';
import { addLoginBtnToDOM, updateHederCartDetail } from './dom-handlers.js';

updateHederCartDetail();
addLoginBtnToDOM(loginButtons, localStorageUserID);

const openMobileMenu = (menu, directionClass) => {
  menu.classList.add(`${directionClass}-0`);
  menu.classList.remove(`${directionClass}-[-280px]`);
  overlay.classList.add('show');
  overlay.classList.remove('hide');
};

const closeMobileHeaderMenus = () => {
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
  menu.children[1].classList.toggle('rotate-180');
  menu.classList.toggle('theme-text-color');
  mobileSubmenus.forEach((submenu) => {
    if (submenu !== menu.nextElementSibling) {
      submenu.previousElementSibling.children[1].classList.remove('rotate-180');
      submenu.previousElementSibling.classList.remove('theme-text-color');
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

const overallSearchHandler = (value) => {
  if (value) {
    location.href = `./course-category.html?search=${value}`;
  }
};

searchBarSearchBtn.addEventListener('click', () => {
  let inputValue = searchBarInput.value.trim();
  overallSearchHandler(inputValue);
});

mobileSearchBtn.addEventListener('click', () => {
  let inputValue = mobileSearchInput.value.trim();
  overallSearchHandler(inputValue);
});

searchBarInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    overallSearchHandler(event.target.value.trim());
  }
});

mobileSearchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    overallSearchHandler(event.target.value.trim());
  }
});

mobileMenuOpenBtn.addEventListener('click', () => openMobileMenu(mobileMenu, 'right'));
mobileCartOpenBtn.addEventListener('click', () => openMobileMenu(mobileCart, 'left'));
mobileMenuCloseBtn.addEventListener('click', closeMobileHeaderMenus);
mobileCartCloseBtn.addEventListener('click', closeMobileHeaderMenus);
overlay.addEventListener('click', closeMobileHeaderMenus);
window.addEventListener('scroll', headerScrollHandler);
headerSearchToggleBtn.addEventListener('click', headerSearchBarToggle);
