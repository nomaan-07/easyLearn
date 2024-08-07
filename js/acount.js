import './change-theme.js';
import { accountMenuItemElements, localStorageUserID, mobileMenuCloseBtn, mobileMenuOpenBtn, overlay } from './dom-elements.js';
import { removeLoader } from './utils.js';
import { displayChosenAccountSection } from './dom-handlers.js';
import { fetchAndDisplayAccountCourses, fetchAndDisplayAccountUserDetail } from './database-handlers.js';
import { openMobileAccountMenu, closeMobileAccountMenu } from './ui-handlers.js';

if (!localStorageUserID) location.replace('./auth.html?operation=signup');

fetchAndDisplayAccountUserDetail();
fetchAndDisplayAccountCourses();

window.addEventListener('load', removeLoader);
accountMenuItemElements.forEach((element) => element.addEventListener('click', () => displayChosenAccountSection(element)));
mobileMenuOpenBtn.addEventListener('click', openMobileAccountMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileAccountMenu);
overlay.addEventListener('click', closeMobileAccountMenu);
