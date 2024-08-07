import './change-theme.js';
import { accountChangeDetailSubmitBtn, accountChangePasswordSubmitBtn, accountMenuItemElements, localStorageUserID, mobileMenuCloseBtn, mobileMenuOpenBtn, overlay, accountDisplayPasswordButtons, accountChangeProfilePictureBtn } from './dom-elements.js';
import { removeLoader } from './utils.js';
import { displayChosenAccountSection } from './dom-handlers.js';
import { fetchAndDisplayAccountCourses, fetchAndDisplayAccountUserDetail, submitAccountDetailChanges, submitAccountUPasswordChanges } from './database-handlers.js';
import { openMobileAccountMenu, closeMobileAccountMenu, displayPasswordHandler } from './ui-handlers.js';
import { sweetAlert } from './sweet-alert-initialize.js';

if (!localStorageUserID) location.replace('./auth.html?operation=signup');

fetchAndDisplayAccountUserDetail();
fetchAndDisplayAccountCourses();

window.addEventListener('load', removeLoader);
accountMenuItemElements.forEach((element) => element.addEventListener('click', () => displayChosenAccountSection(element)));
mobileMenuOpenBtn.addEventListener('click', openMobileAccountMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileAccountMenu);
overlay.addEventListener('click', closeMobileAccountMenu);
accountChangeDetailSubmitBtn.addEventListener('click', submitAccountDetailChanges);
accountChangePasswordSubmitBtn.addEventListener('click', submitAccountUPasswordChanges);
accountDisplayPasswordButtons.forEach((btn) => btn.addEventListener('click', () => displayPasswordHandler(btn, btn.previousElementSibling)));
accountChangeProfilePictureBtn.addEventListener('click', () => sweetAlert('در حال حاضر امکان تغییر تصویر پروفایل وجود ندارد.', 'info'));
