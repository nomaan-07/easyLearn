const searchBoxBtn = document.querySelector('.nav-bar__search-btn, .nav-bar__shopping-cart-btn');
const searchBox = document.querySelector('.nav-bar__search-box');
const searchInput = document.querySelector('.nav-bar__search-input');
const navBar = document.querySelector('.nav-bar');
const navBarLogoWrapper = document.querySelector('.nav-bar__logo-wrapper');
const navBarSubmenuElements = document.querySelectorAll('.nav-bar__submenu-wrapper');
const mobileNavBarLogoWrapper = document.querySelector('.mobile-nav__logo-wrapper');

let previousScrollPoint = 0;

const searchBoxDisplayToggle = () => {
  searchBox.classList.toggle('nav-bar__search-box--open');
  searchInput.value = '';
  searchInput.focus();
};

const navBarScrollHandler = () => {
  let currentScrollPoint = window.scrollY;
  if (currentScrollPoint > previousScrollPoint) {
    navBar.classList.add('nav-bar--scroll');
    navBarLogoWrapper.classList.add('nav-bar__logo-wrapper--scroll');
    searchBox.classList.add('nav-bar__search-box--scroll');
    navBarSubmenuElements.forEach((submenu) => submenu.classList.add('nav-bar__submenu-wrapper--scroll'));
    mobileNavBarLogoWrapper.classList.add('mobile-nav__logo-wrapper--scroll');
  } else {
    navBar.classList.remove('nav-bar--scroll');
    navBarLogoWrapper.classList.remove('nav-bar__logo-wrapper--scroll');
    searchBox.classList.remove('nav-bar__search-box--scroll');
    navBarSubmenuElements.forEach((submenu) => submenu.classList.remove('nav-bar__submenu-wrapper--scroll'));
    mobileNavBarLogoWrapper.classList.remove('mobile-nav__logo-wrapper--scroll');
  }
};

searchBoxBtn.addEventListener('click', searchBoxDisplayToggle);
window.addEventListener('scroll', navBarScrollHandler);
