import { courseHeadlineSessionTemplate, headlineTemplate, commentReplyTemplate, commentTemplate } from './template.js';

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

// course-category.js - course.js
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

// course.js - dom-handlers.js
const insertToDom = (domElem, content) => {
  emptyDomElemContent(domElem);
  domElem.insertAdjacentHTML('beforeend', content);
};

// course.js
const breadCrumbLinksHandler = (categoryElement, nameElement, name, slug, category, page) => {
  const categoryName = categoryInPersian(category);
  categoryElement.innerText = categoryName;
  categoryElement.href = `./${page}-category.html?category=${category}`;
  nameElement.innerText = name;
  nameElement.href = `./${page}.html?${page}=${slug}`;
};

// course.js
const CourseHeadlineSectionHandler = (headline) => {
  let sessions = headline.sessions;
  let sessionsTemplate = '';
  if (sessions.length) {
    sessions.forEach((session, index) => {
      sessionsTemplate += courseHeadlineSessionTemplate(session, index + 1);
    });
  }
  return headlineTemplate(headline, sessionsTemplate, sessions.length);
};

// course.js
const CourseCommentSectionHandler = (comment) => {
  let replies = comment.replies;
  let repliesTemplate = '';
  if (replies) {
    replies.forEach((reply) => {
      if (reply.confirmed) {
        repliesTemplate += commentReplyTemplate(reply);
      }
    });
  }
  return commentTemplate(comment, repliesTemplate);
};

export { removeLoader, generateRandomID, getQueryParameters, getParentID, applyDiscountToPrice, formatDate, categoryInPersian, getReplyCommentWrapper, getReplyCommentTextarea, emptyDomElemContent, insertToDom, breadCrumbLinksHandler, CourseHeadlineSectionHandler, CourseCommentSectionHandler };
