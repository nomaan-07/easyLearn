import { favIcon } from './dom-elements.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { localStorageTheme, form, inputElements, formSubmitBtn, usernameInput, emailInput, passwordInput } from './dom-elements.js';

if (localStorageTheme) {
  document.documentElement.className = `scroll-smooth ${localStorageTheme}`;
  favIcon.href = `images/favIcons/${localStorageTheme}-favicon-64x64.png`;
}

const moveOutLabelElement = (event) => {
  if (event.target.matches('input')) {
    event.target.previousElementSibling.classList.add('animate-move-right-up');
    event.target.previousElementSibling.classList.remove('animate-move-right-down');
  }
};

const moveInLabelElement = (input) => {
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.previousElementSibling.classList.remove('animate-move-right-up');
      input.previousElementSibling.classList.add('animate-move-right-down');
    }
  });
};
// FIXME: better validation
const signupFormValidation = (username, email, password) => {
  if (!username && !email && !password) {
    sweetAlert('لطفا نام کاربری،‌ ایمیل و رمز عبور را وارد کنید.', 'failed');
  } else if (!username && !email) {
    sweetAlert('لطفا نام کاربری و ایمیل را وارد کنید.', 'failed');
  } else if (!username && !password) {
    sweetAlert('لطفا نام کاربری و رمز عبور را وارد کنید.', 'failed');
  } else if (!email && !password) {
    sweetAlert('لطفا ایمیل و رمز عبور را وارد کنید.', 'failed');
  } else if (!username) {
    sweetAlert('لطفا نام کاربری را وارد کنید.', 'failed');
  } else if (!email) {
    sweetAlert('لطفا ایمیل را وارد کنید.', 'failed');
  } else if (!password) {
    sweetAlert('لطفا رمز عبور را وارد کنید.', 'failed');
  } else {
    sweetAlert('ثبت نام با موفقیت انجام شد.', 'success');
  }
};

const submitSignupForm = (event) => {
  event.preventDefault();
  const usernameInputValue = usernameInput.value.trim();
  const emailInputValue = emailInput.value.trim();
  const passwordInputValue = passwordInput.value.trim();
  signupFormValidation(usernameInputValue, emailInputValue, passwordInputValue);
};

form.addEventListener('click', moveOutLabelElement);
inputElements.forEach((input) => moveInLabelElement(input));
formSubmitBtn.addEventListener('click', submitSignupForm);
