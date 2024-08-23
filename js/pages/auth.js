import '../initializers/aos.initialize.js';
import { sweetAlert } from '../initializers/sweet-alert-initialize.js';
import { insertToDOM } from '../dom/dom-handlers.js';
import { authFormHeaderTemplate } from '../template/template.js';
import { submitLoginForm, submitSignupForm } from '../database/database-handlers.js';
import { getQueryParameters, getThemeFromLocalStorage, removeLoader } from '../utils/utils.js';
import { moveInLabelElement, moveOutLabelElement, displayPasswordHandler } from '../ui/ui-handlers.js';
import { favIcon, form, inputElements, formSubmitBtn, usernameInput, authFormHeader, displayPasswordBtn, localStorageUserID, passwordInput } from '../dom/dom-elements.js';

const operationParam = getQueryParameters('operation');

const themes = getThemeFromLocalStorage();

if (themes) {
  document.documentElement.className = `scroll-smooth ${themes.mainTheme} ${themes.colorTheme}`;
  favIcon.href = `images/favIcons/${themes.colorTheme}-favicon-64x64.png`;
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
