import './aos.initialize.js';
import { favIcon, localStorageTheme, form, inputElements, formSubmitBtn, usernameInput, authFormHeader, displayPasswordBtn, localStorageUserID, passwordInput } from './dom-elements.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { getQueryParameters, removeLoader } from './utils.js';
import { moveInLabelElement, moveOutLabelElement, displayPasswordHandler } from './ui-handlers.js';
import { submitLoginForm, submitSignupForm } from './database-handlers.js';
import { authFormHeaderTemplate } from './template.js';
import { insertToDOM } from './dom-handlers.js';

const operationParam = getQueryParameters('operation');

if (localStorageTheme) {
  document.documentElement.className = `scroll-smooth ${localStorageTheme}`;
  favIcon.href = `images/favIcons/${localStorageTheme}-favicon-64x64.png`;
}

if (localStorageUserID) location.replace('./index.html');

const switchForms = () => {
  insertToDOM(authFormHeader, authFormHeaderTemplate(operationParam));

  if (operationParam === 'signup') {
    usernameInput.parentElement.classList.remove('hidden');
    document.title = 'ایزی‌لرن | ثبت نام';
    sweetAlert('لطفا از نام کاربری و رمز عبور واقعی خود استفاده نکنید.', 'info');
    formSubmitBtn.addEventListener('click', submitSignupForm);
  } else if (operationParam === 'login') {
    document.title = 'ایزی‌لرن |  ورود';
    usernameInput.parentElement.classList.add('hidden');
    formSubmitBtn.addEventListener('click', submitLoginForm);
  } else {
    location.replace('./404.html');
  }
};

switchForms();

form.addEventListener('click', moveOutLabelElement);
inputElements.forEach((input) => moveInLabelElement(input));
displayPasswordBtn.addEventListener('click', () => displayPasswordHandler(displayPasswordBtn, passwordInput));
window.addEventListener('load', removeLoader);
