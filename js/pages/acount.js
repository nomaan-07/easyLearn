import '../theme/change-theme.js';
import { sweetAlert } from '../initializers/sweet-alert-initialize.js';
import { removeLoader } from '../utils/utils.js';
import { departmentSelectionHandler, displayChosenAccountSection, toggleNewTicketWrapper } from '../dom/dom-handlers.js';
import { openMobileAccountMenu, closeMobileAccountMenu, displayPasswordHandler, toggleNewTicketOptionsWrapper, textareaAutoResize } from '../ui/ui-handlers.js';
import { fetchAndDisplayAccountCourses, fetchAndDisplayAccountQuestions, fetchAndDisplayAccountUserDetail, fetchAndDisplayUserTickets, submitAccountDetailChanges, submitAccountPasswordChanges } from '../database/database-handlers.js';
import {
  accountChangeDetailSubmitBtn,
  accountChangePasswordSubmitBtn,
  accountMenuItemElements,
  mobileMenuCloseBtn,
  mobileMenuOpenBtn,
  overlay,
  accountDisplayPasswordButtons,
  accountChangeProfilePictureBtn,
  localStorageUserID,
  ticketBtn,
  newTicketChosenDepartmentWrapper,
  newTicketDepartmentOptionElements,
  ticketTextareaElement,
} from '../dom/dom-elements.js';

if (!localStorageUserID) {
  location.replace('./auth.html?operation=signup');
}

fetchAndDisplayAccountUserDetail();
fetchAndDisplayAccountCourses();
fetchAndDisplayAccountQuestions();
fetchAndDisplayUserTickets();

window.addEventListener('load', removeLoader);
accountMenuItemElements.forEach((element) => element.addEventListener('click', () => displayChosenAccountSection(element)));
mobileMenuOpenBtn.addEventListener('click', openMobileAccountMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileAccountMenu);
overlay.addEventListener('click', closeMobileAccountMenu);
accountChangeDetailSubmitBtn.addEventListener('click', submitAccountDetailChanges);
accountChangePasswordSubmitBtn.addEventListener('click', submitAccountPasswordChanges);
accountDisplayPasswordButtons.forEach((btn) => btn.addEventListener('click', () => displayPasswordHandler(btn, btn.previousElementSibling)));
accountChangeProfilePictureBtn.addEventListener('click', () => sweetAlert('در حال حاضر امکان تغییر تصویر پروفایل وجود ندارد.', 'info'));
ticketBtn.addEventListener('click', () => toggleNewTicketWrapper(ticketBtn));
newTicketChosenDepartmentWrapper.addEventListener('click', toggleNewTicketOptionsWrapper);
newTicketDepartmentOptionElements.forEach((element) => element.addEventListener('click', departmentSelectionHandler));
ticketTextareaElement.addEventListener('input', textareaAutoResize);
