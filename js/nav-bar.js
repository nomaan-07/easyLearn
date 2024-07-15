const searchBoxBtn = document.querySelector('.nav-bar__search-btn, .nav-bar__shopping-cart-btn');
const searchBox = document.querySelector('.nav-bar__search-box');
const searchInput = document.querySelector('.nav-bar__search-input');
const navBar = document.querySelector('.nav-bar');
const navBarLogo = document.querySelector('.nav-bar__logo-wrapper');

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
    navBarLogo.classList.add('nav-bar__logo-wrapper--scroll');
    searchBox.classList.add('nav-bar__search-box--scroll');
  } else {
    navBar.classList.remove('nav-bar--scroll');
    navBarLogo.classList.remove('nav-bar__logo-wrapper--scroll');
    searchBox.classList.remove('nav-bar__search-box--scroll');
  }
};

searchBoxBtn.addEventListener('click', searchBoxDisplayToggle);
window.addEventListener('scroll', navBarScrollHandler);
