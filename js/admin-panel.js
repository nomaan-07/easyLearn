import './change-theme.js';
import { accountChangeDetailSubmitBtn, accountChangePasswordSubmitBtn, accountChangeProfilePictureBtn, accountDisplayPasswordButtons, accountMenuItemElements, adminCommentsFilterButtons, adminPanelCommentsWrapper, mobileMenuCloseBtn, mobileMenuOpenBtn, overlay } from './dom-elements.js';
import { addAdminPanelCommentsToDOM, displayChosenAccountSection } from './dom-handlers.js';
import { activeSortBtn, closeMobileAccountMenu, displayPasswordHandler, openMobileAccountMenu, removeSortButtonsClasses } from './ui-handlers.js';
import { removeLoader } from './utils.js';
import { confirmSweetAlert, sweetAlert } from './sweet-alert-initialize.js';
import { fetchAdmin, fetchAndDisplayAccountUserDetail, submitAccountDetailChanges, submitAccountUPasswordChanges } from './database-handlers.js';
import { deleteFromDatabase, getAllFromDatabase, updateInDatabase } from './database-api.js';
import { fetchAndDisplaySellAndExpenseData } from './database-handlers.js';

let commentFilterType = 'all';
let allComments = null;
let adminPanelCommentsEventListenerAdded = false;

fetchAndDisplayAccountUserDetail();
fetchAndDisplaySellAndExpenseData();

const fetchAndDisplayAdminPanelComments = async (filterType) => {
  const dbComments = await getAllFromDatabase('comments');
  allComments = dbComments;

  addAdminPanelCommentsToDOM(dbComments, filterType);
  if (!adminPanelCommentsEventListenerAdded) {
    adminPanelCommentsWrapper.addEventListener('click', (event) => adminPanelCommentDeleteAndConfirmHandler(event, dbComments));
    adminPanelCommentsEventListenerAdded = true;
  }
};

fetchAndDisplayAdminPanelComments(commentFilterType);

const adminDeleteComment = async (commentParentID, commentID, comments) => {
  try {
    const response = await confirmSweetAlert('آیا مطمئن هستید؟');
    if (response) {
      if (commentParentID) {
        const commentParent = comments.find((comment) => comment.id === commentParentID);
        const filteredComments = commentParent.replies.filter((commentReply) => commentReply.id !== commentID);
        await updateInDatabase('comments', { replies: filteredComments }, commentParentID);
      } else {
        await deleteFromDatabase('comments', commentID);
      }
      await fetchAndDisplayAdminPanelComments(commentFilterType);
      sweetAlert('کامنت حذف شد.', 'success');
    }
  } catch (error) {
    console.error('Failed to delete comment', error);
    sweetAlert('حذف کامنت با خطا مواجه شد.', 'failed');
  }
};

const adminCommentConfirmation = async (commentParentID, commentID, comments) => {
  try {
    let comment = null;
    if (commentParentID) {
      const commentParent = comments.find((comment) => comment.id === commentParentID);
      comment = commentParent.replies.find((commentReply) => commentReply.id === commentID);
      comment.confirmed = !comment.confirmed;

      await updateInDatabase('comments', { replies: commentParent.replies }, commentParentID);
    } else {
      comment = comments.find((comment) => comment.id === commentID);
      comment.confirmed = !comment.confirmed;

      await updateInDatabase('comments', { confirmed: comment.confirmed }, commentID);
    }
    await fetchAndDisplayAdminPanelComments(commentFilterType);
    sweetAlert('وضعیت کامنت تغییر کرد.', 'success');
  } catch (error) {
    console.error('Failed to change comment confirmation', error);
    sweetAlert('تایید کامنت با خطا مواجه شد.', 'failed');
  }
};

const adminPanelCommentDeleteAndConfirmHandler = (event, comments) => {
  let element = event.target;
  let commentID = element.closest('.comment__buttons') ? element.closest('.comment__buttons').dataset.comment_id : null;
  let commentParentID = element.closest('.comment__buttons') ? element.closest('.comment__buttons').dataset.comment_parent_id : null;

  if (element.closest('.comment__delete-btn')) {
    adminDeleteComment(commentParentID, commentID, comments);
  } else if (element.closest('.comment__confirm-btn')) {
    adminCommentConfirmation(commentParentID, commentID, comments);
  }
};

const filterCommentsHandler = (btn, comments) => {
  const filterType = btn.dataset.filter;

  commentFilterType = filterType;
  removeSortButtonsClasses(adminCommentsFilterButtons);
  activeSortBtn(btn);

  addAdminPanelCommentsToDOM(comments, filterType);
};

window.addEventListener('load', () => {
  fetchAdmin();
  setTimeout(() => {
    removeLoader();
  }, 500);
});
accountMenuItemElements.forEach((element) => element.addEventListener('click', () => displayChosenAccountSection(element)));
mobileMenuOpenBtn.addEventListener('click', openMobileAccountMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileAccountMenu);
overlay.addEventListener('click', closeMobileAccountMenu);
accountChangeDetailSubmitBtn.addEventListener('click', submitAccountDetailChanges);
accountChangePasswordSubmitBtn.addEventListener('click', submitAccountUPasswordChanges);
accountDisplayPasswordButtons.forEach((btn) => btn.addEventListener('click', () => displayPasswordHandler(btn, btn.previousElementSibling)));
accountChangeProfilePictureBtn.addEventListener('click', () => sweetAlert('در حال حاضر امکان تغییر تصویر پروفایل وجود ندارد.', 'info'));
adminCommentsFilterButtons.forEach((btn) => {
  btn.addEventListener('click', () => filterCommentsHandler(btn, allComments));
});
