import { getAllFromDatabase, getOneFromDatabase, updateInDatabase, addToDatabase, deleteFromDatabase } from './database-api.js';
import { toggleTextarea } from './ui-handlers.js';
import { confirmSweetAlert, sweetAlert } from './sweet-alert-initialize.js';
import { generateRandomID, sortArray, commentSectionTemplateHandler, getLocalCourses, removeLoader } from './utils.js';
import { insertToDOM, addCourseCardsToDOM, addBlogCardsToDOM, addRecentBlogsToDom, addCourseToCartHandler, updateCartPageDetail, updateHederCartDetail, addAccountCourseToDOM, addUserAccountDetailToDOM, addAdminPanelCommentsToDOM, adminPanelCommentDeleteAndConfirmHandler } from './dom-handlers.js';
import { latestCoursesWrapperElement, popularCoursesWrapperElement, lastBlogsWrapperElement, recentBlogsWrapper, usernameInput, emailInput, passwordInput, localStorageUserID, currentPasswordInputElem, newPasswordInputElem, adminPanelCommentsWrapper, overlay } from './dom-elements.js';
import { signupFormValidation, loginFormValidation, accountChangeDetailFormValidation, accountChangePasswordFormValidation } from './validation.js';

// index.js
async function fetchAndDisplayMainPageCourses() {
  try {
    const allCourses = await getAllFromDatabase('courses');
    const lastTenCourse = sortArray(allCourses, 'create', true).slice(0, 10);
    const twelveMostPopularCourse = sortArray(allCourses, 'students', true).slice(0, 12);
    addCourseCardsToDOM(lastTenCourse, latestCoursesWrapperElement);
    addCourseCardsToDOM(twelveMostPopularCourse, popularCoursesWrapperElement, true);
    latestCoursesWrapperElement.addEventListener('click', (event) => addCourseToCartHandler(event, lastTenCourse));
    popularCoursesWrapperElement.addEventListener('click', (event) => addCourseToCartHandler(event, twelveMostPopularCourse));
  } catch (error) {
    console.error('Failed to Fetch courses', error);
  }
}
// index.js
async function fetchAndDisplayMainPageBlogs() {
  try {
    const allBlogs = await getAllFromDatabase('blogs');
    const lastFiveBlog = sortArray(allBlogs, 'create', true).slice(0, 5);
    addBlogCardsToDOM(lastFiveBlog, lastBlogsWrapperElement);
  } catch (error) {
    console.error('Failed to fetch blogs', error);
  }
}

// course.js - blog.js
async function fetchAndDisplayComments(commentsWrapper, pageID) {
  try {
    const comments = await getAllFromDatabase('comments');
    let commentsElements = '';
    let FilteredComments = comments.filter((comment) => {
      return comment.page_id === pageID && comment.confirmed;
    });
    if (FilteredComments.length) {
      FilteredComments = sortArray(FilteredComments, 'create', true);
      FilteredComments.forEach((comment) => {
        commentsElements += commentSectionTemplateHandler(comment);
      });
      insertToDOM(commentsWrapper, commentsElements);
    } else {
      commentsWrapper.innerHTML = `<p class="p-4 font-VazirMedium sm:text-lg xl:text-xl">هنوز نظری برای این بخش ثبت نشده است.</p>`;
    }
  } catch (error) {
    console.error('Failed to fetch comments');
  }
}

// comments section - course.js - blog.js
const submitNewComment = (newCommentWrapper, newCommentTextarea, pageType, pageID, pageName, pageSlug, user) => {
  const message = newCommentTextarea.value.trim();
  let newComment = {
    id: generateRandomID(),
    message,
    page_id: pageID,
    page_name: pageName,
    writer: user.username,
    image_src: user.image_src,
    page_slug: pageSlug,
    page_type: pageType,
  };

  if (message) {
    addToDatabase('comments', newComment);
    sweetAlert('نظر شما ثبت شد و پس از بازبینی منتشر می‌شود.', 'success');
    toggleTextarea(newCommentWrapper, newCommentTextarea);
  } else {
    sweetAlert();
    sweetAlert('نظر نمی‌تواند خالی باشد.', 'info');
  }
};

// comments section - course.js - blog.js
const submitCommentReply = (textarea, wrapper, commentID, pageType, pageName, pageSlug, user) => {
  const message = textarea.value.trim();
  let dbReplies = null;
  let newReply = null;
  getOneFromDatabase('comments', 'id', commentID).then((comment) => {
    newReply = {
      id: generateRandomID(),
      created_at: new Date(),
      message,
      confirmed: false,
      writer: user.username,
      image_src: user.image_src,
      page_type: pageType,
      page_name: pageName,
      page_slug: pageSlug,
      comment_id: commentID,
    };
    dbReplies = comment.replies ? comment.replies : [];
    dbReplies.push(newReply);

    if (message) {
      updateInDatabase('comments', { replies: dbReplies }, commentID);
      sweetAlert('نظر شما ثبت شد و پس از بازبینی منتشر می‌شود.', 'success');
      toggleTextarea(wrapper, textarea);
    } else {
      sweetAlert('نظر نمی‌تواند خالی باشد.', 'info');
    }
  });
};

// blog.js
async function fetchAndDisplayRecantBlogs() {
  try {
    const allBlogs = await getAllFromDatabase('blogs');
    const lastFourBlog = sortArray(allBlogs, 'create', true).slice(0, 4);
    addRecentBlogsToDom(lastFourBlog, recentBlogsWrapper);
  } catch (error) {
    console.error('Failed to fetch recent blogs', error);
  }
}

// auth.js
const submitSignupForm = async (event) => {
  event.preventDefault();
  const usernameInputValue = usernameInput.value.trim();
  const emailInputValue = emailInput.value.trim();
  const passwordInputValue = passwordInput.value.trim();

  const allUsers = await getAllFromDatabase('users');

  if (signupFormValidation(usernameInputValue, emailInputValue, passwordInputValue, allUsers)) {
    let newUser = {
      id: generateRandomID(),
      created_at: new Date(),
      username: usernameInputValue,
      email: emailInputValue,
      password: passwordInputValue,
    };
    await addToDatabase('users', newUser);
    localStorage.setItem('userID', newUser.id);

    emailInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
    setTimeout(() => {
      location.replace('./index.html');
    }, 2000);
  }
};

// auth.js
const submitLoginForm = async (event) => {
  event.preventDefault();

  const emailInputValue = emailInput.value.trim();
  const passwordInputValue = passwordInput.value.trim();

  const users = await getAllFromDatabase('users');

  let user = users.find((user) => user.email === emailInputValue);
  if (loginFormValidation(emailInputValue, passwordInputValue, user)) {
    localStorage.setItem('userID', user.id);
    emailInput.value = '';
    passwordInput.value = '';
    setTimeout(() => {
      location.replace('./index.html');
    }, 2000);
  }
};

const purchaseCourses = async () => {
  try {
    let courseStudentCount = null;

    const userPurchasedCourses = getLocalCourses();
    const dbCourses = await getAllFromDatabase('courses');

    let filteredCourses = dbCourses.filter((course) => userPurchasedCourses.some((purchasedCourse) => purchasedCourse.id === course.id));

    for (let course of filteredCourses) {
      const courseStudentsID = course.students_id || [];
      courseStudentCount = course.students;

      courseStudentsID.push(localStorageUserID);
      courseStudentCount++;
      await updateInDatabase('courses', { students_id: courseStudentsID, students: courseStudentCount }, course.id);
    }

    localStorage.removeItem('courses');
    sweetAlert('خرید با موفقیت انجام شد.', 'success');
    updateCartPageDetail();
    updateHederCartDetail();
    setTimeout(() => {
      location.href = './index.html';
    }, 3000);
  } catch (error) {
    console.log('Failed to purchase courses', error);
    sweetAlert('متاسفانه خرید انجام نشد، لطفا بعدا تلاش کنید.', 'failed');
  }
};

// account.js
const fetchAndDisplayAccountCourses = async () => {
  const dbCourses = await getAllFromDatabase('courses');

  let filteredCourses = dbCourses.filter((course) => course.students_id && course.students_id.some((id) => id === localStorageUserID));
  addAccountCourseToDOM(filteredCourses);
};

// account.js
const fetchAndDisplayAccountUserDetail = async () => {
  const user = await getOneFromDatabase('users', 'id', localStorageUserID);
  addUserAccountDetailToDOM(user);
};

// account.js
const submitAccountDetailChanges = async (event) => {
  event.preventDefault();

  const usernameInputValue = usernameInput.value.trim();
  const emailInputValue = emailInput.value.trim();

  const allUsers = (usernameInputValue || emailInputValue) && (await getAllFromDatabase('users'));

  if (allUsers && accountChangeDetailFormValidation(usernameInputValue, emailInputValue, allUsers)) {
    let username = usernameInputValue || usernameInput.placeholder;
    let email = emailInputValue || emailInput.placeholder;
    updateInDatabase('users', { username, email }, localStorageUserID);
    addUserAccountDetailToDOM({ username, email });
    usernameInput.value = '';
    emailInput.value = '';
  }
};

// account.js
const submitAccountUPasswordChanges = async (event) => {
  event.preventDefault();

  const currentPasswordInputValue = currentPasswordInputElem.value.trim();
  const newPasswordInputValue = newPasswordInputElem.value.trim();

  const user = (currentPasswordInputValue || newPasswordInputValue) && (await getOneFromDatabase('users', 'id', localStorageUserID));

  if (user && accountChangePasswordFormValidation(currentPasswordInputValue, newPasswordInputValue, user)) {
    updateInDatabase('users', { password: newPasswordInputValue }, localStorageUserID);
    currentPasswordInputElem.value = '';
    newPasswordInputElem.value = '';
  }
};

// account.js
const fetchAccountUser = async () => {
  if (!localStorageUserID) {
    location.replace('./auth.html?operation=signup');
  }

  const user = await getOneFromDatabase('users', 'id', localStorageUserID);
  if (user.role === 'admin') {
    location.replace('./admin-panel.html?role=admin');
  }
  setTimeout(() => {
    removeLoader();
  }, 500);
};

//admin-panel.js
let adminPanelCommentsEventListenerAdded = false;
const fetchAndDisplayAdminPanelComments = async () => {
  const dbComments = await getAllFromDatabase('comments');
  addAdminPanelCommentsToDOM(dbComments);
  if (!adminPanelCommentsEventListenerAdded) {
    adminPanelCommentsWrapper.addEventListener('click', (event) => adminPanelCommentDeleteAndConfirmHandler(event, dbComments));
    adminPanelCommentsEventListenerAdded = true;
  }
};

// dom-handler.js
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
      await fetchAndDisplayAdminPanelComments();
      sweetAlert('کامنت حذف شد.', 'success');
    }
  } catch (error) {
    console.error('Failed to delete comment', error);
    sweetAlert('حذف کامنت با خطا مواجه شد.', 'failed');
  }
};

// dom-handler.js
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
    await fetchAndDisplayAdminPanelComments();
    sweetAlert('وضعیت کامنت تغییر کرد.', 'success');
  } catch (error) {
    console.error('Failed to change comment confirmation', error);
    sweetAlert('تایید کامنت با خطا مواجه شد.', 'failed');
  }
};

export {
  fetchAndDisplayMainPageCourses,
  fetchAndDisplayMainPageBlogs,
  submitCommentReply,
  submitNewComment,
  fetchAndDisplayComments,
  fetchAndDisplayRecantBlogs,
  submitSignupForm,
  submitLoginForm,
  purchaseCourses,
  fetchAndDisplayAccountCourses,
  fetchAndDisplayAccountUserDetail,
  submitAccountDetailChanges,
  submitAccountUPasswordChanges,
  fetchAccountUser,
  fetchAndDisplayAdminPanelComments,
  adminDeleteComment,
  adminCommentConfirmation,
};
