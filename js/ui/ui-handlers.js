import { sweetAlert } from './../initializers/sweet-alert-initialize.js';
import { displayPasswordBtn, accountMenuWrapper, overlay } from './../dom/dom-elements.js';

// course.js - dom-handlers.js
const textareaAutoResize = (event) => {
  event.target.style.height = '160px';
  event.target.style.height = `${event.target.scrollHeight}px`;
};

// course.js - domHandler.js
const toggleTextarea = (wrapper, textarea, user = true, openTextarea = false) => {
  if (user && openTextarea) {
    wrapper.classList.remove('max-h-0');
    wrapper.classList.remove('overflow-hidden');
    textarea.focus();
  } else if (!user) {
    sweetAlert('برای ثبت نظر باید در سایت ثبت نام کنید.', 'info');
  } else {
    textarea.value = '';
    textarea.style.height = '160px';
    wrapper.classList.add('max-h-0');
    wrapper.classList.add('overflow-hidden');
  }
};

// course.js - session.js
const headlineLockSessionAlert = (event) => {
  event.target.closest('.headline__lock-session') && sweetAlert('برای مشاهده‌ی این قسمت باید دوره را تهیه کنید.', 'info');
};

// course.js - session.js
const toggleHeadLine = (event) => {
  if (event.target.matches('.headline__title') || event.target.closest('.headline__title')) {
    let titleElem = event.target;
    if (!event.target.matches('.headline__title')) {
      titleElem = event.target.closest('.headline__title');
    }

    let titleELemToggleClasses = ['theme-bg-color', 'text-white', 'bg-slate-100', 'dark:bg-slate-700', 'md:hover:theme-text-color'];
    let totalHeadlineBodyHeight = 0;

    const headlineBody = titleElem.nextElementSibling;
    const headLineChildren = headlineBody.children;

    titleELemToggleClasses.forEach((toggleClass) => titleElem.classList.toggle(toggleClass));

    // Headline Chevron left icon
    titleElem.children[1].children[1].classList.toggle('-rotate-90');

    for (const child of headLineChildren) {
      totalHeadlineBodyHeight += child.offsetHeight;
    }

    if (headlineBody.offsetHeight === 0) {
      headlineBody.style.maxHeight = `${totalHeadlineBodyHeight}px`;
    } else {
      headlineBody.style.maxHeight = '0px';
    }
  }
};

// course-category.js - blogs.js
const activeFilterBtn = (btn) => {
  btn.classList.add('theme-bg-color-10');
  btn.classList.add('theme-text-color');
  btn.children[0].classList.add('theme-bg-color');
  btn.children[0].classList.remove('bg-slate-200');
  btn.children[0].classList.remove('dark:bg-slate-500');
};

// course-category.js - blogs.js
const removeFilterButtonsClasses = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.remove('theme-bg-color-10');
    btn.classList.remove('theme-text-color');
    btn.children[0].classList.remove('theme-bg-color');
    btn.children[0].classList.add('bg-slate-200');
    btn.children[0].classList.add('dark:bg-slate-500');
  });
};

// course-category.js
const removeSortButtonsClasses = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.remove('theme-bg-color-10');
    btn.classList.remove('theme-text-color');
  });
};

// course-category.js
const activeSortBtn = (btn) => {
  btn.classList.add('theme-bg-color-10');
  btn.classList.add('theme-text-color');
};

// auth.js
const moveOutLabelElement = (event) => {
  if (event.target.matches('input')) {
    event.target.previousElementSibling.classList.add('animate-move-right-up');
    event.target.previousElementSibling.classList.remove('animate-move-right-down');

    if (event.target.id === 'password-input') {
      setTimeout(() => {
        displayPasswordBtn.classList.remove('hide');
      }, 400);
    }
  }
};

// auth.js
const moveInLabelElement = (input) => {
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.previousElementSibling.classList.remove('animate-move-right-up');
      input.previousElementSibling.classList.add('animate-move-right-down');

      if (input.id === 'password-input') {
        displayPasswordBtn.classList.add('hide');
      }
    }
  });
};

const showPassword = (displayPasswordBtn, passwordInput) => {
  displayPasswordBtn.children[0].classList.add('hidden');
  displayPasswordBtn.children[1].classList.remove('hidden');
  passwordInput.type = 'text';
};

// auth.js
const hidePassword = (displayPasswordBtn, passwordInput) => {
  displayPasswordBtn.children[0].classList.remove('hidden');
  displayPasswordBtn.children[1].classList.add('hidden');
  passwordInput.type = 'password';
};

const displayPasswordHandler = (displayPasswordBtn, passwordInput) => {
  if (passwordInput.type === 'password') {
    showPassword(displayPasswordBtn, passwordInput);
  } else {
    hidePassword(displayPasswordBtn, passwordInput);
  }
};

//account.js
const openMobileAccountMenu = () => {
  accountMenuWrapper.classList.remove('-right-64');
  accountMenuWrapper.classList.add('right-0');
  overlay.classList.remove('hide');
};

//account.js
const closeMobileAccountMenu = () => {
  accountMenuWrapper.classList.add('-right-64');
  accountMenuWrapper.classList.remove('right-0');
  overlay.classList.add('hide');
};

export { textareaAutoResize, toggleTextarea, headlineLockSessionAlert, activeFilterBtn, removeFilterButtonsClasses, removeSortButtonsClasses, activeSortBtn, toggleHeadLine, moveInLabelElement, moveOutLabelElement, displayPasswordHandler, openMobileAccountMenu, closeMobileAccountMenu };
