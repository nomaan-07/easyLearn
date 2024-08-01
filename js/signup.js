import { favIcon, localStorageTheme, form, inputElements, formSubmitBtn, usernameInput, emailInput, passwordInput } from './dom-elements.js';
import { signupFormValidation } from './validation.js';
import { addToDatabase, getAllFromDatabase } from './database-api.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { generateRandomID } from './utils.js';
import { moveInLabelElement, moveOutLabelElement } from './ui-handlers.js';

sweetAlert('لطفا از نام کاربری و رمز عبور واقعی خود استفاده نکنید.', 'info');

let allUsers = null;

getAllFromDatabase('users')
  .then((users) => {
    allUsers = users;
  })
  .catch((error) => {
    console.error('Failed to fetch users', error);
  });

if (localStorageTheme) {
  document.documentElement.className = `scroll-smooth ${localStorageTheme}`;
  favIcon.href = `images/favIcons/${localStorageTheme}-favicon-64x64.png`;
}

const submitSignupForm = (event) => {
  event.preventDefault();
  const usernameInputValue = usernameInput.value.trim();
  const emailInputValue = emailInput.value.trim();
  const passwordInputValue = passwordInput.value.trim();

  if (signupFormValidation(usernameInputValue, emailInputValue, passwordInputValue, allUsers)) {
    let newUser = {
      id: generateRandomID(),
      created_at: new Date(),
      username: usernameInputValue,
      email: emailInputValue,
      password: passwordInputValue,
    };
    addToDatabase('users', newUser);
    localStorage.setItem('userID', newUser.id);
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    setTimeout(() => {
      location.replace('./index.html');
    }, 2000);
  }
};

form.addEventListener('click', moveOutLabelElement);
inputElements.forEach((input) => moveInLabelElement(input));
formSubmitBtn.addEventListener('click', submitSignupForm);
