import './change-theme.js';
import { accountMenuItemElements, accountUsernameElement, localStorageUserID, mobileMenuCloseBtn, mobileMenuOpenBtn, overlay } from './dom-elements.js';
import { removeLoader } from './utils.js';
import { displayChosenAccountSection, insertToDOM } from './dom-handlers.js';
import { fetchAndDisplayAccountCourses } from './database-handlers.js';
import { getOneFromDatabase } from './database-api.js';
import { openMobileAccountMenu, closeMobileAccountMenu } from './ui-handlers.js';
let user = null;
const fetchUser = async () => {
  user = await getOneFromDatabase('users', 'id', localStorageUserID);
  insertToDOM(accountUsernameElement, `<span class="theme-text-color">${user.username}</span> عزیز خوش آمدی :)`);
};

fetchUser();

fetchAndDisplayAccountCourses();

window.addEventListener('load', removeLoader);
accountMenuItemElements.forEach((element) => element.addEventListener('click', () => displayChosenAccountSection(element)));
mobileMenuOpenBtn.addEventListener('click', openMobileAccountMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileAccountMenu);
overlay.addEventListener('click', closeMobileAccountMenu);
