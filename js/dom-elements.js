const localStorageTheme = localStorage.getItem('theme');
const localStorageUserID = localStorage.getItem('userID');

// course-category.js - blogs.js
const categoryTitle = document.querySelector('.category-title');

// Element for Changing Theme
const colorPlateBtn = document.querySelector('.color-plate-btn');
const colorPlate = document.querySelector('.color-plate');
const changeThemeButtons = document.querySelectorAll('.change-theme-btn');
const darkThemeBtn = document.querySelector('.change-theme-btn--dark');
const favIcon = document.querySelector('#favicon');
const heroLightSVG = document.querySelector('.hero-light-svg');
const heroDarkSVG = document.querySelector('.hero-dark-svg');

// Elements of Header
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
const headerSearchToggleBtn = document.querySelector('.header__search-btn');
const searchBarInput = document.querySelector('.search-bar__input');
const searchBarSearchBtn = document.querySelector('.search-bar__search-btn');
const mobileSearchInput = document.querySelector('.mobile-search-input');
const mobileSearchBtn = document.querySelector('.mobile-search-btn');
const loginButtons = document.querySelectorAll('.login-btn');
const headerCartCoursesNumberElements = document.querySelectorAll('.header__cart-courses-number');
const headerCartCoursesWrappers = document.querySelectorAll('.header__cart-courses');
const headerCartPayButtons = document.querySelectorAll('.header__cart-pay-btn');
const headerCartTotalPriceElements = document.querySelectorAll('.header__cart-total-price');

// Elements of index.html
const latestCoursesWrapperElement = document.querySelector('.latest-courses-wrapper');
const popularCoursesWrapperElement = document.querySelector('.popular-courses-wrapper');
const lastBlogsWrapperElement = document.querySelector('.last-blogs-wrapper');

// Elements of course-category.html
const courseFilterButtons = document.querySelectorAll('.course-filter-btn');
const courseSortButtons = document.querySelectorAll('.course-sort-btn');
const coursesWrapperElement = document.querySelector('.courses-wrapper');
const searchCourseInput = document.querySelector('#search-course-input');
const titleIcon = document.querySelector('.title-icon');
const searchResultWrapper = document.querySelector('.no-result-wrapper');

// Elements of course.js
const breadcrumbCourseCategory = document.querySelector('.breadcrumb__course-category');
const breadcrumbCourseName = document.querySelector('.breadcrumb__course-name');
const courseInfoWrapper = document.querySelector('#course-info');
const courseDataWrapper = document.querySelector('#course-data-wrapper');
const courseDescriptionElem = document.querySelector('.course-description');
const headlinesWrapper = document.querySelector('#headlines-wrapper');
const descriptionShadow = document.querySelector('.course-description-shadow');
const showAllDescriptionBtn = document.querySelector('#course-show-all-description-btn');

// Elements of blogs.js
const blogsWrapperElement = document.querySelector('.blogs-wrapper');
const blogsSortButtons = document.querySelectorAll('.blog-sort-btn');
const searchBlogInput = document.querySelector('#search-blog-input');

// Elements of blog.js
const breadcrumbBlogCategory = document.querySelector('.breadcrumb__blog-category');
const breadcrumbBlogName = document.querySelector('.breadcrumb__blog-name');
const blogWrapper = document.querySelector('.blog__wrapper');
const recentBlogsWrapper = document.querySelector('.recent-blogs-wrapper');

// comments section - course.js - blog.js
const commentsWrapper = document.querySelector('.comments-wrapper');
const addNewCommentBtn = document.querySelector('.new-comment-btn');
const newCommentWrapper = document.querySelector('.new-comment-wrapper');
const newCommentTextarea = document.querySelector('#new-comment-textarea');
const newCommentSubmitBtn = document.querySelector('#new-comment-submit-btn');
const newCommentCloseBtn = document.querySelector('#new-comment-cancel-btn');

// auth.js
const authFormHeader = document.querySelector('.auth__form-header');
const form = document.querySelector('form');
const inputElements = document.querySelectorAll('input');
const formSubmitBtn = document.querySelector('.form__submit-btn');
const usernameInput = document.querySelector('#username-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const displayPasswordBtn = document.querySelector('#display-password-btn');

// cart.js
const cartCourseNumberElement = document.querySelector('.cart__courses-number');
const cartNoCourseWrapper = document.querySelector('.cart__no-course-wrapper');
const cartDetailWrapper = document.querySelector('.cart__detail-wrapper');
const cartCoursesWrapper = document.querySelector('.cart__courses-wrapper');
const cartTotalPrice = document.querySelector('.cart__total-price');
const cartPayBtn = document.querySelector('.cart__pay-btn');

export {
  localStorageTheme,
  localStorageUserID,
  latestCoursesWrapperElement,
  popularCoursesWrapperElement,
  lastBlogsWrapperElement,
  courseFilterButtons,
  courseSortButtons,
  coursesWrapperElement,
  searchCourseInput,
  categoryTitle,
  titleIcon,
  searchResultWrapper,
  breadcrumbCourseCategory,
  breadcrumbCourseName,
  courseInfoWrapper,
  courseDataWrapper,
  courseDescriptionElem,
  headlinesWrapper,
  descriptionShadow,
  commentsWrapper,
  showAllDescriptionBtn,
  addNewCommentBtn,
  newCommentWrapper,
  newCommentTextarea,
  newCommentSubmitBtn,
  newCommentCloseBtn,
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
  colorPlateBtn,
  colorPlate,
  changeThemeButtons,
  darkThemeBtn,
  favIcon,
  heroLightSVG,
  heroDarkSVG,
  blogsWrapperElement,
  blogsSortButtons,
  searchBlogInput,
  breadcrumbBlogCategory,
  breadcrumbBlogName,
  blogWrapper,
  recentBlogsWrapper,
  form,
  inputElements,
  formSubmitBtn,
  usernameInput,
  emailInput,
  passwordInput,
  authFormHeader,
  displayPasswordBtn,
  headerCartCoursesNumberElements,
  headerCartCoursesWrappers,
  headerCartPayButtons,
  headerCartTotalPriceElements,
  cartCourseNumberElement,
  cartNoCourseWrapper,
  cartDetailWrapper,
  cartCoursesWrapper,
  cartTotalPrice,
  cartPayBtn,
};
