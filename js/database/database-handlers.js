import { confirmSweetAlert, sweetAlert } from '../initializers/sweet-alert-initialize.js';
import { textareaAutoResize, toggleTextarea } from '../ui/ui-handlers.js';
import { getAllFromDatabase, getOneFromDatabase, updateInDatabase, addToDatabase } from './database-api.js';
import { signupFormValidation, loginFormValidation, accountChangeDetailFormValidation, accountChangePasswordFormValidation } from '../validation/validation.js';
import { persianMonths, generateRandomID, sortArray, commentSectionTemplateHandler, getLocalCourses, applyDiscountToPrice, convertPersianNumbersToEnglish, getQueryParameters, createCourseObject } from '../utils/utils.js';
import { latestCoursesWrapperElement, popularCoursesWrapperElement, lastBlogsWrapperElement, recentBlogsWrapper, usernameInput, emailInput, passwordInput, localStorageUserID, currentPasswordInputElem, newPasswordInputElem, newQuestionTextareaElement } from '../dom/dom-elements.js';
import {
  insertToDOM,
  addCourseCardsToDOM,
  addBlogCardsToDOM,
  addRecentBlogsToDom,
  addCourseToCartHandler,
  addAccountCourseToDOM,
  addUserAccountDetailToDOM,
  addSellAndExpenseDataToDOM,
  updateCartPageDetail,
  updateHederCartDetail,
  addSessionToDOM,
  addSessionQuestionsToDOM,
  addAdminPanelQuestionToDOM,
  addAdminPanelViewedQuestionToDOM,
} from '../dom/dom-handlers.js';

// index.js
const fetchAndDisplayMainPageCourses = async () => {
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
};
// index.js
const fetchAndDisplayMainPageBlogs = async () => {
  try {
    const allBlogs = await getAllFromDatabase('blogs');
    const lastFiveBlog = sortArray(allBlogs, 'create', true).slice(0, 5);
    addBlogCardsToDOM(lastFiveBlog, lastBlogsWrapperElement);
  } catch (error) {
    console.error('Failed to fetch blogs', error);
  }
};

// course.js - blog.js
const fetchAndDisplayComments = async (commentsWrapper, pageID) => {
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
      document.querySelectorAll('.reply-comment-textarea').forEach((textarea) => textarea.addEventListener('input', textareaAutoResize));
    } else {
      commentsWrapper.innerHTML = `<p class="p-4 font-VazirMedium sm:text-lg xl:text-xl">هنوز نظری برای این بخش ثبت نشده است.</p>`;
    }
  } catch (error) {
    console.error('Failed to fetch comments');
  }
};

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
const fetchAndDisplayRecantBlogs = async () => {
  try {
    const allBlogs = await getAllFromDatabase('blogs');
    const lastFourBlog = sortArray(allBlogs, 'create', true).slice(0, 4);
    addRecentBlogsToDom(lastFourBlog, recentBlogsWrapper);
  } catch (error) {
    console.error('Failed to fetch recent blogs', error);
  }
};

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
    localStorage.removeItem('isAdmin');

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
    user.role === 'admin' ? localStorage.setItem('isAdmin', 'true') : localStorage.removeItem('isAdmin');
    localStorage.setItem('userID', user.id);
    emailInput.value = '';
    passwordInput.value = '';
    setTimeout(() => {
      location.replace('./index.html');
    }, 2000);
  }
};

const addSellDataToDatabase = async (courses) => {
  const databaseTableName = 'sell_expense';

  // calculate purchase total price
  let purchaseTotalPrice = 0;
  courses.forEach((course) => {
    purchaseTotalPrice += applyDiscountToPrice(course.price, course.discount);
  });

  if (purchaseTotalPrice === 0) return;

  // this month and year
  const dateArray = new Date().toLocaleDateString('fa').split('/');
  const year = convertPersianNumbersToEnglish(dateArray[0]);
  const monthNumber = convertPersianNumbersToEnglish(dateArray[1]);
  const month = persianMonths[monthNumber - 1];

  // Check if this month exist in database
  const dbSellData = await getAllFromDatabase(databaseTableName);
  const thisMonthData = dbSellData.find((data) => data.month === month && data.year === year);

  // add purchase data to database
  if (thisMonthData) {
    let previousSellAmount = thisMonthData.sell;
    const newSellAmount = previousSellAmount + purchaseTotalPrice;
    updateInDatabase(databaseTableName, { sell: newSellAmount }, thisMonthData.id);
  } else {
    addToDatabase(databaseTableName, { year, month, sell: purchaseTotalPrice });
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

    await addSellDataToDatabase(filteredCourses);

    localStorage.removeItem('courses');
    sweetAlert('خرید با موفقیت انجام شد.', 'success');
    updateCartPageDetail();
    updateHederCartDetail();
    setTimeout(() => {
      location.href = './index.html';
    }, 3000);
  } catch (error) {
    console.error('Failed to purchase courses', error);
    sweetAlert('متاسفانه خرید انجام نشد، لطفا بعدا تلاش کنید.', 'failed');
  }
};

// account.js
const fetchAndDisplayAccountCourses = async () => {
  const dbCourses = await getAllFromDatabase('courses');

  let filteredCourses = dbCourses.filter((course) => course.students_id && course.students_id.some((id) => id === localStorageUserID));
  addAccountCourseToDOM(filteredCourses);
};

// account.js - admin-panel.js
const fetchAndDisplayAccountUserDetail = async (isAdmin = false) => {
  if (isAdmin) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!localStorageUserID || !isAdmin) {
      location.replace('./404.html');
    }

    const admin = await getOneFromDatabase('users', 'id', localStorageUserID);
    if (admin.role !== 'admin') {
      location.replace('./404.html');
    }

    addUserAccountDetailToDOM(admin);
    localStorage.setItem('admin-name', admin.username);

    return admin;
  }

  const user = await getOneFromDatabase('users', 'id', localStorageUserID);
  addUserAccountDetailToDOM(user);
};

// account.js - admin-panel.js
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

// account.js - admin-panel.js
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

// admin-panel.js
const fetchAdmin = async () => {};

const fetchAndDisplayAdminQuestions = async () => {
  try {
    const data = await getAllFromDatabase('question_answer');
    addAdminPanelQuestionToDOM(data);
  } catch (error) {
    console.error('Failed to fetch questions', error);
  }
};

// admin-panel.js
const fetchAndDisplaySellAndExpenseData = async () => {
  try {
    const data = await getAllFromDatabase('sell_expense');
    addSellAndExpenseDataToDOM(data);
  } catch (error) {
    console.error('Failed to fetch chart data', error);
  }
};

// session.js
const fetchAndDisplaySession = async () => {
  const sessionID = Number(getQueryParameters('id'));
  const courseSlug = getQueryParameters('course');

  if (!sessionID || !courseSlug) {
    location.replace('./404.html');
  }

  const dbCourse = await getOneFromDatabase('courses', 'slug', courseSlug);

  const course = createCourseObject(dbCourse);

  addSessionToDOM(course, sessionID);
};

// session.js
const fetchAndDisplaySessionQuestions = async () => {
  const pageID = `${getQueryParameters('course')}_${getQueryParameters('id')}_${localStorageUserID}`;

  const response = await getOneFromDatabase('question_answer', 'id', pageID);

  if (!response) {
    addSessionQuestionsToDOM(false);
  } else {
    const questions = response.questions;

    addSessionQuestionsToDOM(pageID, questions);
  }
};

// session.js
const submitSessionNewQuestion = async (course_name, course_slug, session_id, session_name) => {
  const questionContent = newQuestionTextareaElement.value.trim();

  if (!questionContent) {
    sweetAlert('سوال نمی‌تواند خالی باشد.', 'info');
    return;
  }

  try {
    const tableName = 'question_answer';

    const newQuestion = {
      id: generateRandomID(),
      createdAt: new Date(),
      content: questionContent,
      isAnswered: false,
      isClosed: false,
      answers: [],
    };

    const pageID = `${course_slug}_${session_id}_${localStorageUserID}`;

    // get current session user questions
    let userSessionQuestions = await getOneFromDatabase(tableName, 'id', pageID);

    if (userSessionQuestions) {
      let userPreviousQuestions = userSessionQuestions.questions;
      userPreviousQuestions.push(newQuestion);
      await updateInDatabase(tableName, { questions: userPreviousQuestions }, pageID);
    } else {
      userSessionQuestions = {
        id: pageID,
        course_name,
        course_slug,
        session_name,
        session_id,
        user_id: localStorageUserID,
        questions: [newQuestion],
      };

      await addToDatabase(tableName, userSessionQuestions);
    }

    sweetAlert('سوال شما با موفقیت ارسال شد.', 'success');
    newQuestionTextareaElement.value = '';
    addSessionQuestionsToDOM(pageID, userSessionQuestions.questions);
  } catch (error) {
    sweetAlert('ارسال سوال با خطا مواجه شد،‌ لطفا بعدا تلاش کنید.', 'failed');
    console.error('Failed to submit question', error);
  }
};

const submitQuestionAnswer = (btn, pageID, questions, adminName = false, data = false, page = false) => {
  const questionID = btn.parentElement.dataset.question_id;
  const textarea = document.querySelector(`#textarea-${questionID}`);

  btn.addEventListener('click', async () => {
    const content = textarea.value.trim();
    if (!content) {
      sweetAlert('پاسخ نمی‌تواند خالی باشد.', 'info');
      textarea.focus();
      return;
    }

    const question = questions.find((question) => question.id === questionID);
    const answers = question.answers;

    const newAnswer = {
      id: answers.length + 1,
      createdAt: new Date(),
      content,
      writerRole: adminName ? 'teacher' : 'user',
      writerName: adminName ? adminName : 'null',
    };

    answers.push(newAnswer);
    question.isAnswered = adminName ? true : false;

    await updateInDatabase('question_answer', { questions }, pageID);
    sweetAlert('پاسخ شما با موفقیت ارسال شد.', 'success');

    adminName ? addAdminPanelViewedQuestionToDOM(data, page, question, adminName) : addSessionQuestionsToDOM(pageID, questions);
  });
};

const closeQuestion = (btn, pageID, questions, adminName, data, page) => {
  btn.addEventListener('click', async () => {
    const isConfirmed = await confirmSweetAlert('آیا مطمئن هستید؟', 'بله');
    if (!isConfirmed) return;

    const questionID = btn.dataset.question_id;
    const question = questions.find((question) => question.id === questionID);
    question.isClosed = true;
    await updateInDatabase('question_answer', { questions }, pageID);
    addAdminPanelViewedQuestionToDOM(data, page, question, adminName);
  });
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
  fetchAdmin,
  fetchAndDisplayAdminQuestions,
  fetchAndDisplaySellAndExpenseData,
  fetchAndDisplaySession,
  fetchAndDisplaySessionQuestions,
  submitSessionNewQuestion,
  submitQuestionAnswer,
  closeQuestion,
};
