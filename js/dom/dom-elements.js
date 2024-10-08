const localStorageUserID = localStorage.getItem('userID');
const localStorageUsername = localStorage.getItem('username');

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
const topBannerElement = document.querySelector('.top-banner');
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
const headerCartBadgeNumberElements = document.querySelectorAll('.header__courses-number-badge');

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

// account.js
const accountMenuItemElements = document.querySelectorAll('.account__menu-item');
const accountSectionWrappers = document.querySelectorAll('.account__section-wrapper');
const accountCoursesWrapper = document.querySelector('.account__courses-wrapper');
const accountUsernameElement = document.querySelector('.account__username');
const accountMenuWrapper = document.querySelector('.account__menu-wrapper');
const accountDetailWrapper = document.querySelector('.account__detail-wrapper');
const accountSectionNameElement = document.querySelector('.account__section-name');
const userAccountProfilePictureWrapper = document.querySelector('.account__user-profile-picture');
const accountChangeDetailSubmitBtn = document.querySelector('.account__detail-submit-btn');
const accountChangePasswordSubmitBtn = document.querySelector('.account__password-submit-btn');
const currentPasswordInputElem = document.querySelector('#current-password-input');
const newPasswordInputElem = document.querySelector('#new-password-input');
const accountDisplayPasswordButtons = document.querySelectorAll('.account__display-password-btn');
const accountChangeProfilePictureBtn = document.querySelector('.change-profile-picture-btn');
const accountQuestionsWrapper = document.querySelector('.account__questions-wrapper');
const ticketBtn = document.querySelector('#ticket-btn');
const ticketsWrapper = document.querySelector('.tickets__wrapper');
const newTicketWrapper = document.querySelector('.new-ticket__wrapper');
const newTicketChosenDepartmentWrapper = document.querySelector('.new-ticket__chosen-department-wrapper');
const newTicketChosenDepartmentElement = document.querySelector('.new-ticket__chosen-department');
const newTicketDepartmentIconElement = document.querySelector('.new-ticket__department-icon');
const newTicketDepartmentOptionsWrapper = document.querySelector('.new-ticket__department-options-wrapper');
const newTicketDepartmentOptionElements = document.querySelectorAll('.new-ticket__department-option');
const subjectInputElement = document.querySelector('#subject-input');
const ticketTextareaElement = document.querySelector('#ticket-textarea');
const newTicketSubmitBtn = document.querySelector('.new-ticket__submit-btn');
const viewedTicketWrapper = document.querySelector('.viewed-ticket__wrapper');

// admin-panel.js
const adminPanelCommentsWrapper = document.querySelector('.admin__comments-wrapper');
const adminCommentsFilterButtons = document.querySelectorAll('.comment-filter-btn');
const adminNotConfirmedCommentsNumberBadge = document.querySelector('.admin-not-confirmed-comments-number-badge');
const overallSellElement = document.querySelector('.overall-sell');
const overallExpenseElement = document.querySelector('.overall-expense');
const overallProfitElement = document.querySelector('.overall-profit');
const adminPanelQuestionsWrapper = document.querySelector('.admin__questions-wrapper');
const allUsersWrapper = document.querySelector('.users__wrapper');
const userWrapper = document.querySelector('.user__wrapper');
const adminPanelUsersBackBtn = document.querySelector('.users__back-btn');
const adminPanelUserInfoWrapper = document.querySelector('.user__info-wrapper');
const adminPanelUserStatsWrapper = document.querySelector('.user__stats-wrapper');
const adminPanelUserCoursesWrapper = document.querySelector('.user__courses-wrapper');

// session.js
const sessionVideoElement = document.querySelector('.session__video');
const sessionCourseNameElements = document.querySelectorAll('.session__course-name');
const sessionNameElements = document.querySelectorAll('.session__name');
const sessionNumberElements = document.querySelectorAll('.session__number');
const sessionDownloadButtons = document.querySelectorAll('.session__download-btn');
const questionsSectionWrapper = document.querySelector('#questions-section-wrapper');
const newQuestionTextareaElement = document.querySelector('#new-question-textarea');
const newQuestionSubmitBtn = document.querySelector('#new-question-submit-btn');
const questionsWrapperElement = document.querySelector('#questions__wrapper');

export {
  localStorageUserID,
  localStorageUsername,
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
  topBannerElement,
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
  headerCartBadgeNumberElements,
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
  accountMenuItemElements,
  accountSectionWrappers,
  accountCoursesWrapper,
  accountUsernameElement,
  accountMenuWrapper,
  accountDetailWrapper,
  accountSectionNameElement,
  userAccountProfilePictureWrapper,
  accountChangeDetailSubmitBtn,
  accountChangePasswordSubmitBtn,
  currentPasswordInputElem,
  newPasswordInputElem,
  accountDisplayPasswordButtons,
  accountChangeProfilePictureBtn,
  accountQuestionsWrapper,
  ticketBtn,
  ticketsWrapper,
  newTicketWrapper,
  newTicketChosenDepartmentWrapper,
  newTicketChosenDepartmentElement,
  newTicketDepartmentIconElement,
  newTicketDepartmentOptionsWrapper,
  newTicketDepartmentOptionElements,
  subjectInputElement,
  ticketTextareaElement,
  newTicketSubmitBtn,
  viewedTicketWrapper,
  adminPanelCommentsWrapper,
  adminCommentsFilterButtons,
  adminNotConfirmedCommentsNumberBadge,
  overallSellElement,
  overallExpenseElement,
  overallProfitElement,
  adminPanelQuestionsWrapper,
  allUsersWrapper,
  userWrapper,
  adminPanelUsersBackBtn,
  adminPanelUserInfoWrapper,
  adminPanelUserStatsWrapper,
  adminPanelUserCoursesWrapper,
  sessionVideoElement,
  sessionCourseNameElements,
  sessionNameElements,
  sessionNumberElements,
  sessionDownloadButtons,
  questionsSectionWrapper,
  newQuestionTextareaElement,
  newQuestionSubmitBtn,
  questionsWrapperElement,
};
