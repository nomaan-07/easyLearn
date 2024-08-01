import { favIcon, localStorageTheme, form, inputElements, formSubmitBtn, emailInput, passwordInput } from './dom-elements.js';
import { moveInLabelElement, moveOutLabelElement } from './ui-handlers.js';
import { getAllFromDatabase } from './database-api.js';
import { loginFormValidation } from './validation.js';

if (localStorageTheme) {
  document.documentElement.className = `scroll-smooth ${localStorageTheme}`;
  favIcon.href = `images/favIcons/${localStorageTheme}-favicon-64x64.png`;
}

const submitLoginForm = async (event) => {
  event.preventDefault();

  const emailInputValue = emailInput.value.trim();
  const passwordInputValue = passwordInput.value.trim();

  let users = await getAllFromDatabase('users');
  let user = users.find((user) => user.email === emailInputValue);
  if (loginFormValidation(emailInputValue, passwordInputValue, user)) {
    localStorage.setItem('userID', user.id);
    setTimeout(() => {
      location.replace('./index.html');
    }, 2000);
  }
};

form.addEventListener('click', moveOutLabelElement);
inputElements.forEach((input) => moveInLabelElement(input));
formSubmitBtn.addEventListener('click', submitLoginForm);
