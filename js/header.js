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

// h-20 lg:h-24
// w-24 lg:w-28

const headerScrollHandler = () => {
  if (window.scrollY > 0) {
    header.classList.add('lg:h-20');
    header.classList.add('h-16');
    header.classList.remove('lg:h-24');
    header.classList.remove('h-20');
    headerLogoWrapper.classList.add('w-20');
    headerLogoWrapper.classList.remove('w-24');
  } else {
    header.classList.remove('lg:h-20');
    header.classList.remove('h-16');
    header.classList.add('lg:h-24');
    header.classList.add('h-20');
    headerLogoWrapper.classList.remove('w-20');
    headerLogoWrapper.classList.add('w-24');
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

mobileMenuItems.forEach((menu) => {
  menu.addEventListener('click', () => mobileSubmenuMenuToggle(menu));
});

mobileMenuOpenBtn.addEventListener('click', () => openMenu(mobileMenu, 'right'));
mobileCartOpenBtn.addEventListener('click', () => openMenu(mobileCart, 'left'));
mobileMenuCloseBtn.addEventListener('click', closeMenus);
mobileCartCloseBtn.addEventListener('click', closeMenus);
overlay.addEventListener('click', closeMenus);
window.addEventListener('scroll', headerScrollHandler);
