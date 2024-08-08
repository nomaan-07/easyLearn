import './change-theme.js';
import { accountChangeDetailSubmitBtn, accountChangePasswordSubmitBtn, accountChangeProfilePictureBtn, accountDisplayPasswordButtons, accountMenuItemElements, mobileMenuCloseBtn, mobileMenuOpenBtn, overlay } from './dom-elements.js';
import { displayChosenAccountSection } from './dom-handlers.js';
import { closeMobileAccountMenu, displayPasswordHandler, openMobileAccountMenu } from './ui-handlers.js';
import { removeLoader } from './utils.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { fetchAndDisplayAccountUserDetail, submitAccountDetailChanges, submitAccountUPasswordChanges, fetchAndDisplayAdminPanelComments } from './database-handlers.js';

fetchAndDisplayAccountUserDetail();
fetchAndDisplayAdminPanelComments();

window.addEventListener('load', removeLoader);
accountMenuItemElements.forEach((element) => element.addEventListener('click', () => displayChosenAccountSection(element)));
mobileMenuOpenBtn.addEventListener('click', openMobileAccountMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileAccountMenu);
overlay.addEventListener('click', closeMobileAccountMenu);
accountChangeDetailSubmitBtn.addEventListener('click', submitAccountDetailChanges);
accountChangePasswordSubmitBtn.addEventListener('click', submitAccountUPasswordChanges);
accountDisplayPasswordButtons.forEach((btn) => btn.addEventListener('click', () => displayPasswordHandler(btn, btn.previousElementSibling)));
accountChangeProfilePictureBtn.addEventListener('click', () => sweetAlert('در حال حاضر امکان تغییر تصویر پروفایل وجود ندارد.', 'info'));
