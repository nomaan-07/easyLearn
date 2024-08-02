import { favIcon, localStorageTheme, form, inputElements, formSubmitBtn, usernameInput, authFormHeader } from './dom-elements.js';
import { signupFormValidation, loginFormValidation } from './validation.js';
import { addToDatabase, getAllFromDatabase } from './database-api.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { generateRandomID, getQueryParameters } from './utils.js';
import { moveInLabelElement, moveOutLabelElement } from './ui-handlers.js';
import { submitLoginForm, submitSignupForm } from './database-handlers.js';
import { authFormHeaderTemplate } from './template.js';
import { insertToDOM } from './dom-handlers.js';

const operationParam = getQueryParameters('operation');

if (localStorageTheme) {
  document.documentElement.className = `scroll-smooth ${localStorageTheme}`;
  favIcon.href = `images/favIcons/${localStorageTheme}-favicon-64x64.png`;
}
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

form.addEventListener('click', moveOutLabelElement);
inputElements.forEach((input) => moveInLabelElement(input));
