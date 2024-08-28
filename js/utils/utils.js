import { courseHeadlineSessionTemplate, headlineTemplate, commentReplyTemplate, commentTemplate } from './../template/template.js';
import { getAllFromDatabase } from './../database/database-api.js';
import { localStorageUserID } from './../dom/dom-elements.js';

const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

const getThemeFromLocalStorage = () => {
  const localStorageTheme = localStorage.getItem('themes');
  const theme = localStorageTheme && JSON.parse(localStorageTheme);
  return theme;
};

const generateRandomID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const randomStringLength = Math.floor(Math.random() * (78 - 7)) + 6;
  const timestamp = new Date().getTime();
  let result = `${timestamp.toString(36).substring(2)}`;
  for (let i = 0; i < randomStringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  for (let i = 0; i < 5; i++) {
    result += Math.random().toString(36).substring(2);
  }
  result += timestamp.toString(36);
  return result;
};

// index.js - course.js - courses.js
const removeLoader = () => {
  document.body.classList.remove('h-0');
  document.body.classList.remove('overflow-y-hidden');
  document.querySelector('.loader-wrapper').classList.add('hide');
};

// course-category.js - course.js
const getQueryParameters = (paramName) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
};

// course.js
const getParentID = (el, parentClass) => {
  const parent = el.closest(`.${parentClass}`);
  const parentID = parent.getAttribute('id');
  return parentID;
};

// shared.js - course-category.js - course.js
const applyDiscountToPrice = (price, discount) => {
  return discount === 100 ? 0 : (price * (100 - discount)) / 100;
};

// index.js - course.js
const formatDate = (date) => {
  const dateList = new Date(date).toLocaleDateString('fa-IR').split('/');
  const year = dateList[0];
  const month = dateList[1].padStart(2, '۰');
  const day = dateList[2].padStart(2, '۰');
  return `${year}/${month}/${day}`;
};

const formatTime = (date) => {
  const timeList = new Date(date).toLocaleTimeString('fa-IR').split(':');
  const hour = timeList[0].padStart(2, '۰');
  const minute = timeList[1];
  return `${hour}:${minute}`;
};

// course-category.js - course.js - blog.js
const categoryInPersian = (category) => {
  let categoryPersian = null;
  switch (category) {
    case 'python':
      categoryPersian = 'پایتون';
      break;
    case 'hack':
      categoryPersian = 'امنیت';
      break;
    case 'front-end':
      categoryPersian = 'فرانت اند';
      break;
    case 'soft-skill':
      categoryPersian = 'مهارت های نرم';
      break;
    case 'all-courses':
      categoryPersian = 'دوره ها';
      break;
    case 'popular-courses':
      categoryPersian = 'دوره های محبوب';
      break;
    case 'programming-basics':
      categoryPersian = 'مبانی برنامه نویسی';
      break;
    case 'management':
      categoryPersian = 'مدیریت';
      break;
    case 'support':
      categoryPersian = 'پشتیبانی';
      break;
    case 'finance':
      categoryPersian = 'مالی';
      break;
  }
  return categoryPersian;
};

// course.js
const getReplyCommentWrapper = (id) => {
  return document.querySelector(`#reply-wrapper-comment-${id}`);
};
// course.js
const getReplyCommentTextarea = (id) => {
  return document.querySelector(`#reply-textarea-comment-${id}`);
};

const emptyDomElemContent = (domElem) => {
  domElem.innerHTML = '';
};

// course.js - blog.js
const breadCrumbLinksHandler = (categoryElement, nameElement, name, slug, category, categoryName, page) => {
  if (page === 'blog') {
    categoryElement.href = `./${page}s.html?category=${category}`;
  } else if (page === 'course') {
    categoryElement.href = `./${page}-category.html?category=${category}`;
  }

  categoryElement.innerText = categoryName;
  nameElement.innerText = name;
  nameElement.href = `./${page}.html?${page}=${slug}`;
};

// course.js
const CourseHeadlineSectionHandler = (headline, isPurchased, courseSlug, headlineID, sessionID) => {
  let sessions = headline.sessions;
  let sessionsTemplate = '';
  if (sessions.length) {
    sessions.forEach((session, index) => {
      sessionsTemplate += courseHeadlineSessionTemplate(session, index + 1, isPurchased, courseSlug, sessionID);
    });
  }
  return headlineTemplate(headline, sessionsTemplate, sessions.length, headlineID);
};

// database-handler.js
const commentSectionTemplateHandler = (comment) => {
  let replies = comment.replies;
  let repliesTemplate = '';
  if (replies) {
    replies = sortArray(replies, 'create');
    replies.forEach((reply) => {
      if (reply.confirmed) {
        repliesTemplate += commentReplyTemplate(reply);
      }
    });
  }
  return commentTemplate(comment, repliesTemplate);
};

// index.js - course-category.js
const sortArray = (array, sortField, isAscending = false) => {
  let sortedArray = [...array];

  switch (sortField) {
    case 'create':
      sortedArray.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'update':
      sortedArray.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
      break;
    case 'students':
      sortedArray.sort((a, b) => new Date(a.students) - new Date(b.students));
      break;
    case 'seen':
      sortedArray.sort((a, b) => new Date(a.seen) - new Date(b.seen));
      break;
    case 'price':
      sortedArray.sort((a, b) => applyDiscountToPrice(a.price, a.discount) - applyDiscountToPrice(b.price, b.discount));
      break;
    case 'comments':
      sortedArray.sort((a, b) => new Date(a.comments) - new Date(b.comments));
      break;
    case 'reading_time':
      sortedArray.sort((a, b) => new Date(a.reading_time) - new Date(b.reading_time));
      break;
    case 'id':
      sortedArray.sort((a, b) => a.id - b.id);
      break;
  }
  isAscending && sortedArray.reverse();
  return sortedArray;
};

// index.js
const deleteUserIDFromLocal = async (userID) => {
  let users = await getAllFromDatabase('users');
  let user = users.find((user) => user.id === userID);

  !user && localStorage.removeItem('userID');
};

const calculateFutureTime = (days, hour = 0, minute = 0, second = 0) => {
  let now = new Date();
  now.setDate(now.getDate() + days);
  let goalDate = new Date(now.getTime());
  goalDate.setHours(hour, minute, second);
  let timestamp = goalDate.getTime();

  return timestamp;
};

// dom-handlers.js
const calculateRemainingTime = (timestamp) => {
  let now = new Date();
  let futureTime = new Date(timestamp);
  let differenceInMilliseconds = futureTime - now;

  let days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  let hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

// dom-handlers.js
const createCartCourseObject = (dbCourse) => ({
  id: dbCourse.id,
  name: dbCourse.name,
  finalPriceInt: dbCourse.discount != 100 ? applyDiscountToPrice(dbCourse.price, dbCourse.discount) : 0,
  finalPrice: dbCourse.discount !== 100 ? applyDiscountToPrice(dbCourse.price, dbCourse.discount).toLocaleString('fa-IR') : 'رایــــــگان!',
  discount: dbCourse.discount,
  imageSrc: dbCourse.image_src,
  slug: dbCourse.slug,
  price: dbCourse.price,
  caption: dbCourse.caption,
  timestamp: dbCourse.discount_timestamp,
});

// course.js
const createCourseObject = (dbCourse) => ({
  finalPrice: dbCourse.discount !== 100 ? applyDiscountToPrice(dbCourse.price, dbCourse.discount).toLocaleString('fa-IR') : 'رایگان!',
  id: dbCourse.id,
  name: dbCourse.name,
  caption: dbCourse.caption,
  image_src: dbCourse.image_src,
  teacher: dbCourse.teacher,
  students: dbCourse.students.toLocaleString('fa-IR'),
  ratePercent: Math.floor((dbCourse.rate * 100) / 5),
  discount: dbCourse.discount,
  price: dbCourse.price,
  description: dbCourse.description,
  category: dbCourse.category[0],
  categoryName: categoryInPersian(dbCourse.category[0]),
  slug: dbCourse.slug,
  headlines: dbCourse.headlines,
  sessionsCount: dbCourse.sessions_count,
  videosLength: dbCourse.videos_length,
  situation: dbCourse.complete ? 'تکمیل' : 'درحال برگزاری',
  timestamp: dbCourse.discount_timestamp,
  isPurchased: dbCourse.students_id && dbCourse.students_id.includes(localStorageUserID),
  // FIXME: updated_at instead of created_at
  date: formatDate(dbCourse.created_at),
});

// dom-handlers.js
const getLocalCourses = () => localStorage.getItem('courses') && JSON.parse(localStorage.getItem('courses'));

// dom-handlers.js
const filterComments = (comments, filterType) => {
  let filteredComments = null;
  if (filterType === 'all') {
    filteredComments = comments;
  } else if (filterType === 'confirmed') {
    filteredComments = comments.filter((comment) => comment.confirmed);
  } else if (filterType === 'review') {
    filteredComments = comments.filter((comment) => !comment.confirmed);
  }
  return filteredComments;
};

const convertPersianNumbersToEnglish = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return number.replace(/[۰-۹]/g, (match) => {
    return englishNumbers[persianNumbers.indexOf(match)];
  });
};

const createPanelQuestionObject = (session, question) => ({
  pageID: session.id,
  courseName: session.course_name,
  courseSlug: session.course_slug,
  sessionID: session.session_id,
  sessionName: session.session_name,
  userID: session.user_id,
  id: question.id,
  content: question.content,
  answers: question.answers,
  created_at: question.created_at,
  is_answered: question.is_answered,
  is_closed: question.is_closed,
  updated_at: question.answers.length ? question.answers[question.answers.length - 1].created_at : question.created_at,
});

const questionsExtraction = (data) => {
  const questions = data.flatMap((session) => session.questions.map((question) => createPanelQuestionObject(session, question)));
  questions.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  return questions;
};

const filterPanelsQuestions = (data, isTicket = false) => {
  const questions = isTicket ? data : questionsExtraction(data);

  questions.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const closedQuestions = questions.filter((question) => question.is_closed);
  const answeredQuestions = questions.filter((question) => question.is_answered && !question.is_closed);
  const notAnsweredQuestions = questions.filter((question) => !question.is_answered && !question.is_closed);

  notAnsweredQuestions.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());

  return [...notAnsweredQuestions, ...answeredQuestions, ...closedQuestions];
};

const scrollToAboveOfElement = (element, margin) => {
  const rect = element.getBoundingClientRect();
  window.scrollTo(window.scrollX, rect.top - margin);
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

export {
  persianMonths,
  getThemeFromLocalStorage,
  removeLoader,
  generateRandomID,
  getQueryParameters,
  getParentID,
  applyDiscountToPrice,
  formatDate,
  formatTime,
  categoryInPersian,
  getReplyCommentWrapper,
  getReplyCommentTextarea,
  emptyDomElemContent,
  breadCrumbLinksHandler,
  CourseHeadlineSectionHandler,
  commentSectionTemplateHandler,
  sortArray,
  deleteUserIDFromLocal,
  calculateFutureTime,
  calculateRemainingTime,
  createCartCourseObject,
  createCourseObject,
  getLocalCourses,
  filterComments,
  convertPersianNumbersToEnglish,
  createPanelQuestionObject,
  filterPanelsQuestions,
  scrollToAboveOfElement,
  scrollToTop,
};
